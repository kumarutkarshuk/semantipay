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
import { PayrollSkeleton } from "@/components/loading-skeletons";
import { useUser } from "@clerk/nextjs";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Employee, WorkRecord } from "@/lib/types";
import {
  fetchEmployees,
  fetchWorkRecords,
  processPayroll,
} from "@/lib/next-api";
import { getCurrency, getDateFromSelectedMonthYear, months } from "@/lib/utils";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import AddWorkRecord from "@/components/forms/add-work-record";

// Mock data
const workRecords: WorkRecord[] = [
  {
    employee_id: 1,
    name: "John Doe",
    employee_code: "EMP001",
    country_code: "IN",
    record_id: 1,
    hourly_rate: 500.0,
    work_month: "2025-07-01",
    hours_worked: 160.0,
    overtime_hours: 10.0,
    is_flagged: "FALSE",
  },
  {
    employee_id: 2,
    name: "Don Joe",
    employee_code: "EMP001",
    country_code: "AE",
    record_id: 2,
    hourly_rate: 1000.0,
    work_month: "2025-07-01",
    hours_worked: 100.0,
    overtime_hours: 5.0,
    is_flagged: "TRUE",
  },
];

const isLoading = false;

export default function PayrollPage() {
  const [selectedEmployees, setSelectedEmployees] = useState<number[]>([]);
  const [selectedMonth, setSelectedMonth] = useState<string>("6");
  const [selectedYear, setSelectedYear] = useState<string>("2025");
  // const [isProcessing, setIsProcessing] = useState(false);

  const queryClient = useQueryClient();
  const router = useRouter();

  const { data: workRecords, isLoading, error, isError } = useQuery<WorkRecord[]>({
    queryKey: ["workRecords", selectedMonth, selectedYear],
    queryFn: async () => {
      return await fetchWorkRecords({
        work_month: getDateFromSelectedMonthYear(selectedMonth, selectedYear),
      });
    },
  });

  const { mutateAsync, isPending } = useMutation({
    mutationFn: processPayroll,
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["workRecords"] });
      await queryClient.invalidateQueries({ queryKey: ["payrollResults"] });
      toast("Success!", {
        description: "Payroll processed successfully!",
        action: {
          label: "View Details",
          onClick: () => router.push("/dashboard/payroll-results"),
        },
      });
    },
    onError: (e) => {
      toast("Payroll processing unsuccessful: " + e.message);
    },
  });

  const { user, isLoaded } = useUser();

  const handleEmployeeSelection = (employeeId: number) => {
    setSelectedEmployees((prev) =>
      prev.indexOf(employeeId) === -1
        ? [...prev, employeeId]
        : prev.filter((id) => id !== employeeId)
    );
  };

  const handleSelectAll = () => {
    const allEmployeeIds = workRecords
      ? workRecords.map((w) => w.employee_id)
      : [];
    const isAllSelected =
      workRecords && selectedEmployees.length === workRecords.length;

    if (isAllSelected) {
      setSelectedEmployees([]);
    } else {
      setSelectedEmployees(allEmployeeIds);
    }
  };

  const handleProcessPayroll = async () => {
    const payrollDataReq = {
      employee_ids: selectedEmployees,
      work_month: getDateFromSelectedMonthYear(selectedMonth, selectedYear),
      email: user?.emailAddresses[0]?.emailAddress,
    };

    const reqBody = {
      inputs: {
        payrollDataReq: JSON.stringify(payrollDataReq),
      },
      response_mode: "blocking",
      user: user?.fullName,
    };

    // console.log("reqBody",reqBody)
    await mutateAsync(reqBody);
    setSelectedEmployees([]);
  };

  const isAllSelected =
    workRecords && selectedEmployees.length === workRecords.length;
  // const isPartialSelected =
  //   workRecords &&
  //   selectedEmployees.length > 0 &&
  //   selectedEmployees.length < workRecords.length;

  if (isLoading || !isLoaded) {
    return (
      <SidebarInset>
        <header className="flex h-14 sm:h-16 shrink-0 items-center gap-2 border-b px-4">
          <SidebarTrigger className="-ml-1" />
          <Separator orientation="vertical" className="mr-2 h-4" />
          <div className="h-5 w-28 bg-muted animate-pulse rounded" />
          <div className="ml-auto">{/* <ThemeToggle /> */}</div>
        </header>
        <div className="flex-1 space-y-4 sm:space-y-6 p-4 sm:p-6">
          <Card>
            <CardHeader className="pb-4 flex sm:justify-between flex-col sm:flex-row gap-2 sm:gap-0">
              <div>
                <div className="h-5 w-40 bg-muted animate-pulse rounded mb-2" />
                <div className="h-4 w-64 bg-muted animate-pulse rounded" />
              </div>
              <div className="h-9 sm:w-[25%] bg-muted animate-pulse rounded" />
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {Array.from({ length: 2 }).map((_, i) => (
                  <div key={i} className="space-y-2">
                    <div className="h-4 w-16 bg-muted animate-pulse rounded" />
                    <div className="h-9 w-full bg-muted animate-pulse rounded" />
                  </div>
                ))}
              </div>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <div className="h-4 w-32 bg-muted animate-pulse rounded" />
                  <div className="h-6 w-32 bg-muted animate-pulse rounded" />
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {Array.from({ length: 4 }).map((_, i) => (
                    <div
                      key={i}
                      className="h-16 bg-muted animate-pulse rounded-lg"
                    />
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
          <PayrollSkeleton />
        </div>
      </SidebarInset>
    );
  }

  if(isError){
    toast("Error processing payroll: " + error.message);
  }

  return (
    <SidebarInset>
      <header className="flex h-14 sm:h-16 shrink-0 items-center gap-2 border-b px-4">
        <SidebarTrigger className="-ml-1" />
        <Separator orientation="vertical" className="mr-2 h-4" />
        <h1 className="text-lg font-semibold">Process Payroll</h1>
        <div className="ml-auto">{/* <ThemeToggle /> */}</div>
      </header>

      <motion.div
        className="flex-1 space-y-4 sm:space-y-6 p-4 sm:p-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        {/* Selection Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.6 }}
        >
          <Card className="hover:shadow-md transition-shadow duration-300">
            <CardHeader className="pb-4">
              <div className="flex items-center justify-between flex-col sm:flex-row">
                <div>
                  <CardTitle className="text-base sm:text-lg">
                    Payroll Processing
                  </CardTitle>
                  <CardDescription className="text-sm">
                    Select employees and time period to process payroll
                  </CardDescription>
                </div>
                <div
                  key="processButton"
                  className="flex items-end sm:w-[25%] w-full sm:mt-0 mt-4"
                >
                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full"
                  >
                    <Button
                      onClick={handleProcessPayroll}
                      disabled={
                        !selectedMonth ||
                        selectedEmployees.length === 0 ||
                        isPending
                      }
                      className="w-full"
                      size="sm"
                    >
                      {/* <motion.div
                        animate={isProcessing ? { rotate: 360 } : { rotate: 0 }}
                        transition={{
                          duration: 1,
                          repeat: isProcessing ? Number.POSITIVE_INFINITY : 0,
                          ease: "linear",
                        }}
                      > */}
                      <Play className="mr-2 h-4 w-4" />
                      {/* </motion.div> */}
                      {isPending ? "Processing..." : "Process Payroll"}
                    </Button>
                  </motion.div>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <motion.div
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3, duration: 0.6 }}
              >
                {/* Month, Year, and Process button with staggered animation */}
                {[
                  <div key="month" className="space-y-2">
                    <Label className="text-sm font-medium">Month</Label>
                    <Select
                      value={selectedMonth}
                      onValueChange={setSelectedMonth}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select month" />
                      </SelectTrigger>
                      <SelectContent>
                        {months.map((month, index) => (
                          <SelectItem key={index} value={String(index)}>
                            {month}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>,
                  <div key="year" className="space-y-2">
                    <Label className="text-sm font-medium">Year</Label>
                    <Select
                      value={selectedYear}
                      onValueChange={setSelectedYear}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select year" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="2025">2025</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>,
                ].map((element, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 + 0.4, duration: 0.5 }}
                  >
                    {element}
                  </motion.div>
                ))}
              </motion.div>

              {/* Employee Selection */}
              <motion.div
                className="space-y-3"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7, duration: 0.6 }}
              >
                <div className="flex items-center justify-between">
                  <Label className="text-sm font-medium">
                    Select Employees
                  </Label>
                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={handleSelectAll}
                      className="gap-2 bg-transparent"
                      disabled={workRecords?.length === 0}
                    >
                      <motion.div
                        animate={{ rotate: isAllSelected ? 360 : 0 }}
                        transition={{ duration: 0.3 }}
                      >
                        {isAllSelected ? (
                          <UserCheck className="h-4 w-4" />
                        ) : (
                          <Users className="h-4 w-4" />
                        )}
                      </motion.div>
                      {isAllSelected
                        ? "Deselect All"
                        : `Select All (${workRecords?.length})`}
                    </Button>
                  </motion.div>
                </div>

                {/* Selection Summary */}
                {selectedEmployees.length > 0 && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="bg-primary/10 border border-primary/20 rounded-lg p-3"
                  >
                    <p className="text-sm text-primary font-medium">
                      {selectedEmployees.length} of {workRecords?.length}{" "}
                      employees selected
                    </p>
                  </motion.div>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {workRecords?.map((record, index) => (
                    <motion.div
                      key={record.employee_id}
                      className="flex items-center space-x-3 p-3 border rounded-lg hover:bg-muted/50 transition-colors cursor-pointer"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 + 0.8, duration: 0.4 }}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => {
                        handleEmployeeSelection(record.employee_id);
                      }}
                    >
                      <motion.div
                        animate={{
                          scale: selectedEmployees.includes(record.employee_id)
                            ? 1.1
                            : 1,
                        }}
                        transition={{
                          type: "spring",
                          stiffness: 500,
                          damping: 30,
                        }}
                      >
                        <Checkbox
                          id={String(record.employee_id)}
                          checked={selectedEmployees.includes(
                            record.employee_id
                          )}
                        />
                      </motion.div>
                      <div className="flex-1 min-w-0">
                        <label
                          htmlFor={String(record.employee_id)}
                          className="text-sm font-medium cursor-pointer"
                        >
                          {record.name}
                        </label>
                        <p className="text-xs text-muted-foreground">
                          {record.employee_code}
                        </p>
                      </div>
                      {selectedEmployees.includes(record.employee_id) && (
                        <motion.div
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          transition={{
                            type: "spring",
                            stiffness: 500,
                            damping: 30,
                          }}
                        >
                          <Badge variant="default" className="text-xs">
                            Selected
                          </Badge>
                        </motion.div>
                      )}
                    </motion.div>
                  ))}
                  {workRecords?.length === 0 ? (
                    <p className="text-sm text-muted-foreground">
                      No employees to select
                    </p>
                  ) : (
                    ""
                  )}
                </div>
              </motion.div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Work Records */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
        >
          <Card className="hover:shadow-md transition-shadow duration-300">
            <CardHeader className="pb-4">
              <div className="flex justify-between items-center">
                <div>
                  <CardTitle className="text-base sm:text-lg">
                    Work Records
                  </CardTitle>
                  <CardDescription className="text-sm max-w-48 sm:max-w-full">
                    Note: By default, overtime is paid at 2× hourly rate.
                  </CardDescription>
                </div>
                <AddWorkRecord
                  userID={user?.id!}
                  workMonth={getDateFromSelectedMonthYear(
                    selectedMonth,
                    selectedYear
                  )}
                />
              </div>
            </CardHeader>
            <CardContent>
              {/* Mobile-friendly table */}
              <div className="space-y-4 sm:hidden">
                {workRecords?.map((record, index) => (
                  <motion.div
                    key={record.record_id}
                    className="border rounded-lg p-4 space-y-3 hover:shadow-sm transition-shadow"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 + 1.2, duration: 0.5 }}
                    whileHover={{ scale: 1.01 }}
                  >
                    <div className="flex items-center justify-between">
                      <h3 className="font-medium">{record.name}</h3>
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{
                          delay: index * 0.1 + 1.4,
                          type: "spring",
                          stiffness: 500,
                          damping: 30,
                        }}
                      ></motion.div>
                    </div>
                    <motion.div
                      className="grid grid-cols-2 gap-2 text-sm"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: index * 0.1 + 1.5, duration: 0.4 }}
                    >
                      <div>
                        <span className="text-muted-foreground">Code:</span>
                        {record.employee_code}
                      </div>
                      <div>
                        <span className="text-muted-foreground">Currency:</span>
                        {getCurrency(record.country_code)}
                      </div>
                      <div>
                        <span className="text-muted-foreground">
                          Hourly Rate:
                        </span>
                        {record.hourly_rate}
                      </div>
                      <div>
                        <span className="text-muted-foreground">
                          Hours Worked:
                        </span>
                        {record.hours_worked}
                      </div>
                      <div>
                        <span className="text-muted-foreground">
                          Overtime Hours:
                        </span>
                        {record.overtime_hours}
                      </div>
                    </motion.div>
                  </motion.div>
                ))}
              </div>

              {/* Desktop table */}
              {workRecords?.length !== 0 ? (
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
                          <TableHead>Hourly Rate</TableHead>
                          <TableHead>Hours Worked</TableHead>
                          <TableHead>Overtime Hours</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {workRecords?.map((record, index) => (
                          <motion.tr
                            key={record.employee_id}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{
                              delay: index * 0.1 + 1.4,
                              duration: 0.5,
                            }}
                            className="hover:bg-muted/50 transition-colors"
                          >
                            <TableCell className="font-medium">
                              {record.employee_code}
                            </TableCell>
                            <TableCell>{record.name}</TableCell>
                            <TableCell>{`${record.hourly_rate} (${getCurrency(
                              record.country_code
                            )})`}</TableCell>
                            <TableCell>{record.hours_worked}</TableCell>
                            <TableCell>{record.overtime_hours}</TableCell>
                          </motion.tr>
                        ))}
                      </TableBody>
                    </Table>
                  </motion.div>
                </div>
              ) : (
                <p className="text-sm text-muted-foreground">
                  No work records found
                </p>
              )}
            </CardContent>
          </Card>
        </motion.div>
      </motion.div>
    </SidebarInset>
  );
}
