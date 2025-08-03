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
import { PayrollTableSkeleton } from "@/components/loading-skeletons";
import { useUser } from "@clerk/nextjs";

// Mock data
const employees = [
  { id: "1", name: "John Doe", code: "E001", hourlyRate: 50 },
  { id: "2", name: "Jane Smith", code: "E002", hourlyRate: 45 },
  { id: "3", name: "Mike Johnson", code: "E003", hourlyRate: 40 },
  { id: "4", name: "Sarah Wilson", code: "E004", hourlyRate: 48 },
];

const mockPayrollData = [
  {
    id: "1",
    employeeId: "1",
    employeeName: "John Doe",
    hoursWorked: 160,
    hourlyRate: 50,
    grossPay: 8000,
    netPay: 6400,
    violations: "Overtime rate calculation error",
    status: "violation",
  },
  {
    id: "2",
    employeeId: "2",
    employeeName: "Jane Smith",
    hoursWorked: 160,
    hourlyRate: 45,
    grossPay: 7200,
    netPay: 5760,
    violations: null,
    status: "processed",
  },
];

const months = [
  // "January",
  // "February",
  // "March",
  // "April",
  // "May",
  // "June",
  "July",
  // "August",
  // "September",
  // "October",
  // "November",
  // "December",
];

export default function PayrollPage() {
  const [selectedEmployees, setSelectedEmployees] = useState<string[]>([]);
  const [selectedMonth, setSelectedMonth] = useState<string>("");
  const [selectedYear, setSelectedYear] = useState<string>("2025");
  const [payrollData, setPayrollData] = useState(mockPayrollData);
  const [isProcessing, setIsProcessing] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [editingRecord, setEditingRecord] = useState<any>(null);
  const [editForm, setEditForm] = useState({ hourlyRate: "", hoursWorked: "" });

  const {isLoaded, user} = useUser();

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1200);
    return () => clearTimeout(timer);
  }, []);

  const handleEmployeeSelection = (employeeId: string, checked: boolean) => {
    setSelectedEmployees((prev) =>
      checked ? [...prev, employeeId] : prev.filter((id) => id !== employeeId)
    );
  };

  const handleSelectAll = () => {
    const allEmployeeIds = employees.map((emp) => emp.id);
    const isAllSelected = selectedEmployees.length === employees.length;

    if (isAllSelected) {
      setSelectedEmployees([]);
    } else {
      setSelectedEmployees(allEmployeeIds);
    }
  };

  const processPayroll = async () => {
    setIsProcessing(true);
    await new Promise((resolve) => setTimeout(resolve, 2000));
    setIsProcessing(false);
  };

  const openEditDialog = (record: any) => {
    setEditingRecord(record);
    setEditForm({
      hourlyRate: record.hourlyRate.toString(),
      hoursWorked: record.hoursWorked.toString(),
    });
  };

  const saveChanges = () => {
    setPayrollData((prev) =>
      prev.map((record) =>
        record.id === editingRecord.id
          ? {
              ...record,
              hourlyRate: Number.parseFloat(editForm.hourlyRate),
              hoursWorked: Number.parseFloat(editForm.hoursWorked),
              grossPay:
                Number.parseFloat(editForm.hourlyRate) *
                Number.parseFloat(editForm.hoursWorked),
              violations: null,
              status: "processed",
            }
          : record
      )
    );
    setEditingRecord(null);
  };

  const isAllSelected = selectedEmployees.length === employees.length;
  const isPartialSelected =
    selectedEmployees.length > 0 && selectedEmployees.length < employees.length;

  if (isLoading || !isLoaded) {
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
          <Card>
            <CardHeader className="pb-4 flex flex-row justify-between">
              <div>
                <div className="h-5 w-40 bg-muted animate-pulse rounded mb-2" />
                <div className="h-4 w-64 bg-muted animate-pulse rounded" />
              </div>
              <div className="h-9 w-[25%] bg-muted animate-pulse rounded" />
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
                <div className="h-4 w-32 bg-muted animate-pulse rounded" />
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
          <PayrollTableSkeleton />
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
        <h1 className="text-lg font-semibold">Process Payroll</h1>
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
                      onClick={processPayroll}
                      disabled={
                        !selectedMonth ||
                        selectedEmployees.length === 0 ||
                        isProcessing
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
                      {isProcessing ? "Processing..." : "Process Payroll"}
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
                        {months.map((month) => (
                          <SelectItem key={month} value={month}>
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
                        : `Select All (${employees.length})`}
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
                      {selectedEmployees.length} of {employees.length} employees
                      selected
                    </p>
                  </motion.div>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {employees.map((employee, index) => (
                    <motion.div
                      key={employee.id}
                      className="flex items-center space-x-3 p-3 border rounded-lg hover:bg-muted/50 transition-colors cursor-pointer"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 + 0.8, duration: 0.4 }}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <motion.div
                        animate={{
                          scale: selectedEmployees.includes(employee.id)
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
                          id={employee.id}
                          checked={selectedEmployees.includes(employee.id)}
                          onCheckedChange={(checked) =>
                            handleEmployeeSelection(
                              employee.id,
                              checked as boolean
                            )
                          }
                        />
                      </motion.div>
                      <div className="flex-1 min-w-0">
                        <label
                          htmlFor={employee.id}
                          className="text-sm font-medium cursor-pointer"
                        >
                          {employee.name}
                        </label>
                        <p className="text-xs text-muted-foreground">
                          {employee.code}
                        </p>
                      </div>
                      {selectedEmployees.includes(employee.id) && (
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
                </div>
              </motion.div>
            </CardContent>
          </Card>
        </motion.div>

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
                Review processed payroll and handle any violations
              </CardDescription>
            </CardHeader>
            <CardContent>
              {/* Mobile-friendly table */}
              <div className="space-y-4 sm:hidden">
                {payrollData.map((record, index) => (
                  <motion.div
                    key={record.id}
                    className="border rounded-lg p-4 space-y-3 hover:shadow-sm transition-shadow"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 + 1.2, duration: 0.5 }}
                    whileHover={{ scale: 1.01 }}
                  >
                    <div className="flex items-center justify-between">
                      <h3 className="font-medium">{record.employeeName}</h3>
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
                        {record.violations ? (
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
                      <div>
                        <span className="text-muted-foreground">Hours:</span>{" "}
                        {record.hoursWorked}
                      </div>
                      <div>
                        <span className="text-muted-foreground">Rate:</span> $
                        {record.hourlyRate}
                      </div>
                      <div>
                        <span className="text-muted-foreground">Gross:</span> $
                        {record.grossPay.toLocaleString()}
                      </div>
                      <div>
                        <span className="text-muted-foreground">Net:</span> $
                        {record.netPay.toLocaleString()}
                      </div>
                    </motion.div>
                    {record.violations && (
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
                    )}
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
                        <TableHead>Employee</TableHead>
                        <TableHead>Hours</TableHead>
                        <TableHead>Rate</TableHead>
                        <TableHead>Gross Pay</TableHead>
                        <TableHead>Net Pay</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {payrollData.map((record, index) => (
                        <motion.tr
                          key={record.id}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{
                            delay: index * 0.1 + 1.4,
                            duration: 0.5,
                          }}
                          className="hover:bg-muted/50 transition-colors"
                        >
                          <TableCell className="font-medium">
                            {record.employeeName}
                          </TableCell>
                          <TableCell>{record.hoursWorked}</TableCell>
                          <TableCell>${record.hourlyRate}</TableCell>
                          <TableCell>
                            ${record.grossPay.toLocaleString()}
                          </TableCell>
                          <TableCell>
                            ${record.netPay.toLocaleString()}
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
                              {record.violations ? (
                                <Badge variant="destructive" className="gap-1">
                                  <AlertTriangle className="h-3 w-3" />
                                  Violation
                                </Badge>
                              ) : (
                                <Badge variant="default">Processed</Badge>
                              )}
                            </motion.div>
                          </TableCell>
                          <TableCell>
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
                          </TableCell>
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
