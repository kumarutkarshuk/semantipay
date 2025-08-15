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
import { addCompliance } from "@/lib/next-api";
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
  country_code: z.string(),
  region: z.string().max(50).optional(),
  rule_name: z
    .string()
    .max(100)
    .nonempty({ message: "Rule name can't be empty!" }),
  rule_type: z
    .string()
    .max(50)
    .nonempty({ message: "Rule type can't be empty!" }),
  description: z.string().nonempty({message: "Description can't be empty!"}),
  effective_date: z.date(),
  threshold_value: z.coerce.number().max(9999999999.99).default(0),
  formula: z.string().max(255).optional(),
});

export default function AddComplianceDialog({
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
      country_code: "IN",
      region: "",
      rule_name: "",
      rule_type: "",
      description: "",
      effective_date: new Date(),
      threshold_value: 0,
      formula: "",
    },
  });

  const { mutateAsync, isPending } = useMutation({
    mutationFn: addCompliance,
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["compliance"] });
      toast("Success!", {
        description: "Compliance rule added successfully!",
      });
    },
    onError: (e) => {
      toast("Error adding compliance rule: " + e.message);
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    await mutateAsync({
      ...values,
      effective_date: format(values.effective_date, "yyyy-MM-dd"),
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
          <DialogTitle className="text-left">Add Compliance Rule</DialogTitle>
          <DialogDescription className="flex flex-col text-left"></DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className=" grid grid-cols-2 gap-2">
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
                        <SelectItem value={c.code} key={c.code}>{c.name}</SelectItem>
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
              <Label htmlFor="ruleName" >Rule Name<span className="text-red-500">*</span></Label>
              <Input id="ruleName" type="text" {...register("rule_name")} />
              {errors.rule_name && (
                <p className="text-red-500 text-sm">
                  {errors.rule_name.message}
                </p>
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="ruleType">Rule Type<span className="text-red-500">*</span></Label>
              <Input id="ruleType" type="text" {...register("rule_type")} />
              {errors.rule_type && (
                <p className="text-red-500 text-sm">
                  {errors.rule_type.message}
                </p>
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="description">Description<span className="text-red-500">*</span></Label>
              <Input id="description" type="text" {...register("description")} />
              {errors.description && (
                <p className="text-red-500 text-sm">
                  {errors.description.message}
                </p>
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="effectiveDate">Effective Date</Label>
              <Controller
                name="effective_date"
                control={control}
                render={({ field }) => (
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        id="date"
                        className="w-full justify-start text-left font-normal"
                      >
                        {field.value
                          ? format(field.value, "PPP")
                          : "Pick a date"}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0 scale-90 sm:scale-100">
                        <Calendar
                        mode="single"
                        selected={field.value}
                        onSelect={field.onChange}
                      />
                    </PopoverContent>
                  </Popover>
                )}
              />
              {/* {errors.effective_date && (
                <p className="text-red-500 text-sm">
                  {errors.effective_date.message}
                </p>
              )} */}
            </div>
            <div className="space-y-2">
              <Label htmlFor="threshold">Threshold Value</Label>
              <Input
                id="threshold"
                type="number"
                {...register("threshold_value")}
              />
              {errors.threshold_value && (
                <p className="text-red-500 text-sm">
                  {errors.threshold_value.message}
                </p>
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="formula">Formula</Label>
              <Input id="formula" type="text" {...register("formula")} />
              {errors.formula && (
                <p className="text-red-500 text-sm">{errors.formula.message}</p>
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
