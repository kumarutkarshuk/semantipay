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
import { Button } from "./ui/button";
import { Flag } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { JSX, useState } from "react";
import { PayrollResult } from "@/lib/types";
import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { flagIncorrectPayroll } from "@/lib/next-api";
import { toast } from "sonner";

const formSchema = z.object({
  reason: z.string().nonempty({ message: "Reason can't be empty!" }),
});

export default function FlagIncorrectPayroll({
  result,
  userID,
}: {
  result: PayrollResult;
  userID: string;
}): JSX.Element {
  const [open, setOpen] = useState(false);
  const queryClient = useQueryClient();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      reason: "",
    },
  });

  const { mutateAsync, isPending } = useMutation({
    mutationFn: flagIncorrectPayroll,
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["payrollResults"] });
      toast("Success!", {
        description: "Payroll flagged successfully!",
      });
    },
    onError: (e) => {
      toast("Error flagging payroll: " + e.message);
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    await mutateAsync({
      ...values,
      record_id: result.record_id,
      flagged_by: userID,
    });
    setOpen(false);
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
          <Button variant="destructive" size="sm" className="w-full sm:w-fit">
            <Flag className="h-4 w-4 mr-1" />
            Flag
          </Button>
        </motion.div>
      </DialogTrigger>
      <DialogContent className="w-[95%]">
        <DialogHeader>
          <DialogTitle className="text-left text-red-500">
            <div className="flex gap-2 items-center">
              <Flag size={20} />
              <p>Flag Incorrect Payroll</p>
            </div>
          </DialogTitle>
          <DialogDescription className="flex flex-col text-left">
            <p>
              Name: <span className="text-white">{result.name}</span>
            </p>
            <p>
              Code: <span className="text-white">{result.employee_code}</span>
            </p>
            <p>
              Gross Pay: <span className="text-white">{result.gross_pay}</span>
            </p>
            <p>
              Net Pay: <span className="text-white">{result.net_pay}</span>
            </p>
            <div className="flex gap-2">
              <p>Deductions:</p>
              <div className="flex gap-2 flex-wrap">
                {Object.values(JSON.parse(result.deductions || "{}")).length ===
                0
                  ? "-"
                  : Object.entries(JSON.parse(result.deductions || "{}")).map(
                      (d) => {
                        const [key, value] = d;
                        return (
                          <div key={key} className="text-white">
                            {key}: {value as number};
                          </div>
                        );
                      }
                    )}
              </div>
            </div>
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="reason">Reason</Label>
              <Input id="reason" type="text" {...register("reason")} />
              {errors.reason && (
                <p className="text-red-500 text-sm">{errors.reason.message}</p>
              )}
            </div>
          </div>
          <DialogFooter>
            <Button type="submit" className="mt-4">
              {isPending ? "Flagging..." : "Flag"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
