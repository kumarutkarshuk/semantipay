"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { motion } from "framer-motion";
import { Button } from "../ui/button";
import { Plus } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { JSX, useState } from "react";
import * as z from "zod";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addCompliance, addEmployee } from "@/lib/next-api";
import { toast } from "sonner";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { countries } from "@/lib/utils";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Calendar } from "../ui/calendar";
import { format } from "date-fns";

const formSchema = z.object({
  employee_code: z
    .string()
    .max(20)
    .nonempty({ message: "Employee code can't be empty!" }),
  name: z
    .string()
    .max(100)
    .nonempty({ message: "Name can't be empty!" }),
  country_code: z.string(),
  region: z.string().max(50).optional(),
  hourly_rate: z.coerce
    .number({ invalid_type_error: "Hourly rate can not be empty" })
    .gt(0, { message: "Hourly rate must be greater than 0" }),
});

export default function AddEmployeeDialog({
  userID,
}: {
  userID: string;
}): JSX.Element {
  const [open, setOpen] = useState(false);
  const queryClient = useQueryClient();

  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
  } = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      employee_code: "",
      name: "",
      country_code: "IN",
      region: "",
      hourly_rate: 0,
    },
  });

  const { mutateAsync, isPending } = useMutation({
    mutationFn: addEmployee,
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["employees"] });
      toast("Success!", {
        description: "Employee added successfully!",
      });
    },
    onError: (e) => {
      toast("Error adding employee: " + e.message);
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    await mutateAsync({
      ...values,
      created_by: userID,
    });
    setOpen(false);
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
          <Button variant="default" size="sm" className="w-full sm:w-fit">
            <Plus className="h-4 w-4 mr-1" />
            Add
          </Button>
        </motion.div>
      </DialogTrigger>
      <DialogContent className="w-[95%]">
        <DialogHeader>
          <DialogTitle className="text-left">Add Employee</DialogTitle>
          <DialogDescription className="flex flex-col text-left"></DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div>
            <div className="space-y-2">
              <Label htmlFor="employeeCode">Employee Code</Label>
              <Input
                id="employeeCode"
                type="text"
                {...register("employee_code")}
              />
              {errors.employee_code && (
                <p className="text-red-500 text-sm">
                  {errors.employee_code.message}
                </p>
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="name">Name</Label>
              <Input id="name" type="text" {...register("name")} />
              {errors.name && (
                <p className="text-red-500 text-sm">{errors.name.message}</p>
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="countryCode">Country Code</Label>
              <Controller
                name="country_code"
                control={control}
                render={({ field }) => (
                  <Select onValueChange={field.onChange} value={field.value}>
                    <SelectTrigger id="country">
                      <SelectValue placeholder="Select country" />
                    </SelectTrigger>
                    <SelectContent>
                      {countries.map((c) => (
                        <SelectItem value={c.code} key={c.code}>
                          {c.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                )}
              />
              {/* {errors.country_code && (
                <p className="text-red-500 text-sm">{errors.country_code.message}</p>
              )} */}
            </div>

            <div className="space-y-2">
              <Label htmlFor="region">Region</Label>
              <Input id="region" type="text" {...register("region")} />
              {errors.region && (
                <p className="text-red-500 text-sm">{errors.region.message}</p>
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="hourlyRate">Hourly Rate</Label>
              <Input
                id="hourlyRate"
                type="number"
                {...register("hourly_rate")}
              />
              {errors.hourly_rate && (
                <p className="text-red-500 text-sm">
                  {errors.hourly_rate.message}
                </p>
              )}
            </div>
          </div>
          <DialogFooter>
            <Button type="submit" className="mt-4">
              {isPending ? "Adding..." : "Add"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
