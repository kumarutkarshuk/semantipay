"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { SidebarInset, SidebarTrigger } from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { ThemeToggle } from "@/components/theme-toggle";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { AlertTriangle, Play, Edit, Users, UserCheck } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { PayrollResultSkeleton } from "@/components/loading-skeletons";
import { useUser } from "@clerk/nextjs";
import { useQuery } from "@tanstack/react-query";
import { Employee, PayrollResult } from "@/lib/types";
import { fetchEmployees, fetchPayrollResults } from "@/lib/next-api";
import { getCurrency } from "@/lib/utils";

const payrollResults: PayrollResult[] = [
  {
    employee_id: 1,
    name: "John Doe",
    employee_code: "EMP001",
    country_code: "IN",
    record_id: 1,
    hourly_rate: 20.0,
    work_month: "2025-07-01",
    hours_worked: 160.0,
    overtime_hours: 10.0,
    gross_pay: 3400.0,
    deductions: '{"PF": 400, "ESI": 100}',
    net_pay: 2900.0,
    status: "DONE",
    violation_reason: undefined,
  },
  {
    employee_id: 2,
    name: "Jane Smith",
    employee_code: "EMP002",
    country_code: "IN",
    record_id: 2,
    hourly_rate: 25.0,
    work_month: "2025-07-01",
    hours_worked: 170.0,
    overtime_hours: 5.0,
    gross_pay: 4250.0,
    deductions: '{"PF": 500}',
    net_pay: 3750.0,
    status: "DONE",
    violation_reason: "Hourly rate below minimum wage",
  },
];

const isLoading = false;

export default function PayrollPage() {
  const [selectedEmployees, setSelectedEmployees] = useState<number[]>([]);
  const [selectedMonth, setSelectedMonth] = useState<string>("July");
  const [selectedYear, setSelectedYear] = useState<string>("2025");
  // const [payrollData, setPayrollData] = useState(mockPayrollResults);
  const [isProcessing, setIsProcessing] = useState(false);
  // const [editingRecord, setEditingRecord] = useState<any>(null);
  const [editForm, setEditForm] = useState({ hourlyRate: "", hoursWorked: "" });

  // const {
  //   data: payrollResults,
  //   isLoading,
  // } = useQuery<PayrollResult[]>({
  //   queryKey: ["payrollResults"],
  //   queryFn: fetchPayrollResults,
  // });

  // const openEditDialog = (record: any) => {
  //   setEditingRecord(record);
  //   setEditForm({
  //     hourlyRate: record.hourlyRate.toString(),
  //     hoursWorked: record.hoursWorked.toString(),
  //   });
  // };

  // const saveChanges = () => {
  //   setPayrollData((prev) =>
  //     prev.map((record) =>
  //       record.id === editingRecord.id
  //         ? {
  //             ...record,
  //             hourlyRate: Number.parseFloat(editForm.hourlyRate),
  //             hoursWorked: Number.parseFloat(editForm.hoursWorked),
  //             grossPay:
  //               Number.parseFloat(editForm.hourlyRate) *
  //               Number.parseFloat(editForm.hoursWorked),
  //             violations: null,
  //             status: "processed",
  //           }
  //         : record
  //     )
  //   );
  //   setEditingRecord(null);
  // };

  if (isLoading) {
    return (
      <SidebarInset>
        <header className="flex h-14 sm:h-16 shrink-0 items-center gap-2 border-b px-4">
          <SidebarTrigger className="-ml-1" />
          <Separator orientation="vertical" className="mr-2 h-4" />
          <div className="h-5 w-28 bg-muted animate-pulse rounded" />
          <div className="ml-auto">
            <ThemeToggle />
          </div>
        </header>
        <div className="flex-1 space-y-4 sm:space-y-6 p-4 sm:p-6">
          <PayrollResultSkeleton />
        </div>
      </SidebarInset>
    );
  }

  // console.log("email:", user?.emailAddresses[0]?.emailAddress);

  return (
    <SidebarInset>
      <header className="flex h-14 sm:h-16 shrink-0 items-center gap-2 border-b px-4">
        <SidebarTrigger className="-ml-1" />
        <Separator orientation="vertical" className="mr-2 h-4" />
        <h1 className="text-lg font-semibold">Payroll Results</h1>
        <div className="ml-auto">
          <ThemeToggle />
        </div>
      </header>

      <motion.div
        className="flex-1 space-y-4 sm:space-y-6 p-4 sm:p-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        {/* Payroll Results */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
        >
          <Card className="hover:shadow-md transition-shadow duration-300">
            <CardHeader className="pb-4">
              <CardTitle className="text-base sm:text-lg">
                Payroll Results
              </CardTitle>
              <CardDescription className="text-sm">
                Review processed payroll
              </CardDescription>
            </CardHeader>
            <CardContent>
              {/* Mobile-friendly table */}
              <div className="space-y-4 sm:hidden">
                {payrollResults?.map((result, index) => (
                  <motion.div
                    key={result.record_id}
                    className="border rounded-lg p-4 space-y-3 hover:shadow-sm transition-shadow"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 + 1.2, duration: 0.5 }}
                    whileHover={{ scale: 1.01 }}
                  >
                    <div className="flex items-center justify-between">
                      <h3 className="font-medium">{result.name}</h3>
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{
                          delay: index * 0.1 + 1.4,
                          type: "spring",
                          stiffness: 500,
                          damping: 30,
                        }}
                      >
                        {result.violation_reason ? (
                          <Badge variant="destructive" className="gap-1">
                            <AlertTriangle className="h-3 w-3" />
                            Violation
                          </Badge>
                        ) : (
                          <Badge variant="default">Processed</Badge>
                        )}
                      </motion.div>
                    </div>
                    <motion.div
                      className="grid grid-cols-2 gap-2 text-sm"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: index * 0.1 + 1.5, duration: 0.4 }}
                    >
                      <span className="text-muted-foreground">Code:</span>
                      <div>{result.employee_code}</div>
                      <span className="text-muted-foreground">Currency:</span>
                      <div>{getCurrency(result.country_code)}</div>
                      <span className="text-muted-foreground">Hourly Rate:</span>
                      <div>{result.hourly_rate}</div>
                      <span className="text-muted-foreground">Hrs:</span>
                      <div>{result.hours_worked}</div>
                      <span className="text-muted-foreground">
                        Overtime Hrs:
                      </span>
                      <div>{result.overtime_hours}</div>
                      <span className="text-muted-foreground">Gross:</span>
                      <div>{result.gross_pay}</div>
                      <span className="text-muted-foreground">Net:</span>
                      <div>{result.net_pay}</div>
                      <span className="text-muted-foreground">Deductions:</span>
                      <div>
                        {Object.entries(
                          JSON.parse(result.deductions || "{}")
                        ).map((d) => {
                          const [key, value] = d;
                          return (
                            <div key={key}>
                              {key}: {value as number}
                            </div>
                          );
                        })}
                      </div>
                      <span className="text-muted-foreground">Violation:</span>
                      <div>{`${result.violation_reason || "-"}`}</div>
                    </motion.div>
                    {/* {result.violation_reason && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 + 1.6, duration: 0.4 }}
                      >
                        <Dialog>
                          <DialogTrigger asChild>
                            <motion.div
                              whileHover={{ scale: 1.02 }}
                              whileTap={{ scale: 0.98 }}
                            >
                              <Button
                                variant="outline"
                                size="sm"
                                className="w-full bg-transparent"
                                onClick={() => openEditDialog(record)}
                              >
                                <Edit className="h-4 w-4 mr-1" />
                                Rectify Violation
                              </Button>
                            </motion.div>
                          </DialogTrigger>
                          <DialogContent className="sm:max-w-md">
                            <DialogHeader>
                              <DialogTitle>
                                Rectify Payroll Violation
                              </DialogTitle>
                              <DialogDescription>
                                Violation: {record.violations}
                              </DialogDescription>
                            </DialogHeader>
                            <div className="space-y-4">
                              <div className="space-y-2">
                                <Label htmlFor="hourlyRate">Hourly Rate</Label>
                                <Input
                                  id="hourlyRate"
                                  type="number"
                                  value={editForm.hourlyRate}
                                  onChange={(e) =>
                                    setEditForm((prev) => ({
                                      ...prev,
                                      hourlyRate: e.target.value,
                                    }))
                                  }
                                />
                              </div>
                              <div className="space-y-2">
                                <Label htmlFor="hoursWorked">
                                  Hours Worked
                                </Label>
                                <Input
                                  id="hoursWorked"
                                  type="number"
                                  value={editForm.hoursWorked}
                                  onChange={(e) =>
                                    setEditForm((prev) => ({
                                      ...prev,
                                      hoursWorked: e.target.value,
                                    }))
                                  }
                                />
                              </div>
                            </div>
                            <DialogFooter>
                              <Button onClick={saveChanges} className="w-full">
                                Save Changes
                              </Button>
                            </DialogFooter>
                          </DialogContent>
                        </Dialog>
                      </motion.div>
                    )} */}
                  </motion.div>
                ))}
              </div>

              {/* Desktop table */}
              <div className="hidden sm:block overflow-x-auto">
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1.2, duration: 0.6 }}
                >
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Employee Code</TableHead>
                        <TableHead>Name</TableHead>
                        <TableHead>Currency</TableHead>
                        <TableHead>Hourly Rate</TableHead>
                        <TableHead>Hours Worked</TableHead>
                        <TableHead>Overtime Hours</TableHead>
                        <TableHead>Gross Pay</TableHead>
                        <TableHead>Net Pay</TableHead>
                        <TableHead>Deductions</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Violation Reason</TableHead>
                        {/* <TableHead>Actions</TableHead> */}
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {payrollResults?.map((result, index) => (
                        <motion.tr
                          key={result.record_id}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{
                            delay: index * 0.1 + 1.4,
                            duration: 0.5,
                          }}
                          className="hover:bg-muted/50 transition-colors"
                        >
                          <TableCell className="font-medium">
                            {result.employee_code}
                          </TableCell>
                          <TableCell>{result.name}</TableCell>
                          <TableCell>{getCurrency(result.country_code)}</TableCell>
                          <TableCell>{result.hourly_rate}</TableCell>
                          <TableCell>{result.hours_worked}</TableCell>
                          <TableCell>{result.overtime_hours}</TableCell>
                          <TableCell>{result.gross_pay}</TableCell>
                          <TableCell>{result.net_pay}</TableCell>
                          <TableCell className="flex flex-col gap-2">
                            {Object.entries(
                              JSON.parse(result.deductions || "{}")
                            ).map((d) => {
                              const [key, value] = d;
                              return (
                                <div key={key}>
                                  {key}: {value as number}
                                </div>
                              );
                            })}
                          </TableCell>
                          <TableCell>
                            <motion.div
                              initial={{ scale: 0 }}
                              animate={{ scale: 1 }}
                              transition={{
                                delay: index * 0.1 + 1.6,
                                type: "spring",
                                stiffness: 500,
                                damping: 30,
                              }}
                            >
                              {result.violation_reason ? (
                                <Badge variant="destructive" className="gap-1">
                                  <AlertTriangle className="h-3 w-3" />
                                  Violation
                                </Badge>
                              ) : (
                                <Badge variant="default">Done</Badge>
                              )}
                            </motion.div>
                          </TableCell>
                          <TableCell>
                            {result.violation_reason || "-"}
                          </TableCell>
                          {/* <TableCell>
                            {record.violations && (
                              <Dialog>
                                <DialogTrigger asChild>
                                  <motion.div
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                  >
                                    <Button
                                      variant="outline"
                                      size="sm"
                                      onClick={() => openEditDialog(record)}
                                    >
                                      <Edit className="h-4 w-4 mr-1" />
                                      Rectify
                                    </Button>
                                  </motion.div>
                                </DialogTrigger>
                                <DialogContent>
                                  <DialogHeader>
                                    <DialogTitle>
                                      Rectify Payroll Violation
                                    </DialogTitle>
                                    <DialogDescription>
                                      Violation: {record.violations}
                                    </DialogDescription>
                                  </DialogHeader>
                                  <div className="space-y-4">
                                    <div className="space-y-2">
                                      <Label htmlFor="hourlyRate">
                                        Hourly Rate
                                      </Label>
                                      <Input
                                        id="hourlyRate"
                                        type="number"
                                        value={editForm.hourlyRate}
                                        onChange={(e) =>
                                          setEditForm((prev) => ({
                                            ...prev,
                                            hourlyRate: e.target.value,
                                          }))
                                        }
                                      />
                                    </div>
                                    <div className="space-y-2">
                                      <Label htmlFor="hoursWorked">
                                        Hours Worked
                                      </Label>
                                      <Input
                                        id="hoursWorked"
                                        type="number"
                                        value={editForm.hoursWorked}
                                        onChange={(e) =>
                                          setEditForm((prev) => ({
                                            ...prev,
                                            hoursWorked: e.target.value,
                                          }))
                                        }
                                      />
                                    </div>
                                  </div>
                                  <DialogFooter>
                                    <Button onClick={saveChanges}>
                                      Save Changes
                                    </Button>
                                  </DialogFooter>
                                </DialogContent>
                              </Dialog>
                            )}
                          </TableCell> */}
                        </motion.tr>
                      ))}
                    </TableBody>
                  </Table>
                </motion.div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </motion.div>
    </SidebarInset>
  );
}
