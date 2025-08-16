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
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { addWorkRecord, fetchEmployeeSelect } from "@/lib/next-api";
import { toast } from "sonner";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Employee, EmployeeSelect, WorkRecord } from "@/lib/types";

const formSchema = z.object({
  employee_id: z.coerce.number().default(-1),
  hours_worked: z.coerce.number().gte(0).default(0),
  overtime_hours: z.coerce.number().gte(0).default(0),
});

export default function AddWorkRecord({
  userID,
  workMonth,
}: {
  userID: string;
  workMonth: string;
}): JSX.Element {
  const [open, setOpen] = useState(false);
  const queryClient = useQueryClient();
  const { data: employeeSelect, isLoading, error, isError } = useQuery<EmployeeSelect[]>({
    queryKey: ["employeeSelect"],
    queryFn: async () => {
      return await fetchEmployeeSelect({
        work_month: workMonth,
      });
    },
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
    setError
  } = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      employee_id: undefined,
      hours_worked: 0,
      overtime_hours: 0,
    },
  });

  const { mutateAsync, isPending } = useMutation({
    mutationFn: addWorkRecord,
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["workRecords"] });
      toast("Success!", {
        description: "Work Record added successfully!",
      });
    },
    onError: (e) => {
      toast("Error adding work record: " + e.message);
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values)
    if(values.employee_id === -1){
      setError("employee_id", {
        type: "manual",
        message: "Please select employee!"
      });
      return;
    }

    // await mutateAsync({
    //   ...values,
    //   work_month: workMonth,
    //   created_by: userID,
    // });
    // setOpen(false);
  }

  if(isError){
    toast("Error fetching compliance rule: " + error.message);
  }

  return (
    <Dialog open={open} onOpenChange={isLoading ? () => {} : setOpen}>
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
          <DialogTitle className="text-left">Add Work Record</DialogTitle>
          <DialogDescription className="flex flex-col text-left">
            <p>
              Work Month: <span className="text-white">{workMonth}</span>
            </p>
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="employeeId">Employee<span className="text-red-500">*</span></Label>
              <Controller
                name="employee_id"
                control={control}
                render={({ field }) => (
                  <Select
                    onValueChange={field.onChange}
                    value={
                      field.value === undefined
                        ? undefined
                        : String(field.value)
                    }
                    disabled={isLoading || isError}
                  >
                    <SelectTrigger id="employeeId">
                      <SelectValue
                        placeholder={
                          isLoading ? "Loading..." : "Select employee"
                        }
                      />
                    </SelectTrigger>
                    <SelectContent>
                      {employeeSelect?.map((e) => (
                        <SelectItem
                          key={e.employee_id}
                          value={String(e.employee_id)}
                        >{`${e.name} (${e.employee_code})`}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                )}
              />
               {errors.employee_id && (
                <p className="text-red-500 text-sm">
                  {errors.employee_id.message}
                </p>
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="hoursWorked">Hours Worked</Label>
              <Input
                id="hoursWorked"
                type="number"
                {...register("hours_worked")}
              />
              {errors.hours_worked && (
                <p className="text-red-500 text-sm">
                  {errors.hours_worked.message}
                </p>
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="overtimeHours">Overtime Hours</Label>
              <Input
                id="overtimeHours"
                type="number"
                {...register("overtime_hours")}
              />
              {errors.overtime_hours && (
                <p className="text-red-500 text-sm">
                  {errors.overtime_hours.message}
                </p>
              )}
            </div>
          </div>
          <DialogFooter>
            <Button type="submit" className="mt-4" disabled={isLoading}>
              {isPending ? "Adding..." : "Add"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
