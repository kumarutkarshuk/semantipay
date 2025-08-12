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
import { Edit } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { JSX, useState } from "react";
import { PayrollResult } from "@/lib/types";
import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { rectifyViolation } from "@/lib/next-api";
import { toast } from "sonner";

const formSchema = z.object({
  hourly_rate: z.coerce
    .number({ invalid_type_error: "Hourly rate can not be empty" })
    .gt(0, { message: "Hourly rate must be greater than 0" }),
  hours_worked: z.coerce.number().optional(),
  overtime_hours: z.coerce.number().optional(),
});

export default function RectifyPayrollViolation({
  result,
}: {
  result: PayrollResult;
}): JSX.Element {
  const [open, setOpen] = useState(false);
  const queryClient = useQueryClient()
  const router = useRouter()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      hourly_rate: result.hourly_rate,
      hours_worked: result.hours_worked,
      overtime_hours: result.overtime_hours,
    },
  });

  const {mutateAsync, isPending} = useMutation({
    mutationFn: rectifyViolation,
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ['workRecords'] })
      await queryClient.invalidateQueries({ queryKey: ['payrollResults'] })
      toast("Success!", {
          description: "Updated successfully!",
          action: {
            label: "Reprocess payroll",
            onClick: () => router.push("/dashboard/payroll"),
          },
        })
    },
    onError: (e) => {
      toast("Records updation unsuccessful: " + e.message)
    }
  })

  async function onSubmit(values: z.infer<typeof formSchema>) {
    if(values.hourly_rate === result.hourly_rate && 
        values.hours_worked === result.hours_worked &&
        values.overtime_hours === result.overtime_hours
    ){
        setOpen(false);
        return;
    }

    await mutateAsync({
        ...values,
        record_id: result.record_id,
        employee_id: result.employee_id
    })
    setOpen(false)
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
          <Button variant="outline" size="sm" className="w-full sm:w-fit">
            <Edit className="h-4 w-4 mr-1" />
            Rectify
          </Button>
        </motion.div>
      </DialogTrigger>
      <DialogContent className="w-[95%]">
        <DialogHeader>
          <DialogTitle className="text-left">
            Rectify Payroll Violation
          </DialogTitle>
          <DialogDescription className="flex flex-col text-left">
            <p>Name: {result.name}</p>
            <p>Code: {result.employee_code}</p>
            <p>Violation: {result.violation_reason}</p>
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="space-y-4">
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
            <Button type="submit" className="mt-4">{isPending ? "Saving..." : "Save Changes"}</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
