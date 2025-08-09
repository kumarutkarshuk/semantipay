"use client";

import { motion } from "framer-motion";
import { SidebarInset, SidebarTrigger } from "@/components/ui/sidebar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Separator } from "@/components/ui/separator";
import { ThemeToggle } from "@/components/theme-toggle";
import { Employee } from "@/lib/types";
import { EmployeeTableSkeleton } from "@/components/loading-skeletons";
import { getCurrency } from "@/lib/utils";
import { useQuery } from "@tanstack/react-query";
import { fetchEmployees } from "@/lib/next-api";

const employees: Employee[] = [
  {
    employee_id: 1,
    name: "John Doe",
    employee_code: "EMP001",
    country_code: "IN",
    region: "Asia",
    hourly_rate: 500,
  },
  {
    employee_id: 2,
    name: "Jane Smith",
    employee_code: "EMP002",
    country_code: "AE",
    region: "Dubai",
    hourly_rate: 600,
  },
];

const isLoading = false;

export default function EmployeesPage() {
  // const [searchTerm, setSearchTerm] = useState("")

  const {
    data: employees,
    isLoading,
  } = useQuery<Employee[]>({
    queryKey: ["employees"],
    queryFn: fetchEmployees,
  });

  // const filteredEmployees = employees.filter(
  //   (employee) =>
  //     employee.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
  //     employee.department.toLowerCase().includes(searchTerm.toLowerCase()) ||
  //     employee.position.toLowerCase().includes(searchTerm.toLowerCase()),
  // )

  if (isLoading) {
    return (
      <SidebarInset>
        <header className="flex h-14 sm:h-16 shrink-0 items-center gap-2 border-b px-4">
          <SidebarTrigger className="-ml-1" />
          <Separator orientation="vertical" className="mr-2 h-4" />
          <div className="h-5 w-20 bg-muted animate-pulse rounded" />
          <div className="ml-auto">
            <ThemeToggle />
          </div>
        </header>
        <div className="flex-1 space-y-6 p-4 sm:p-6">
          <EmployeeTableSkeleton />
        </div>
      </SidebarInset>
    );
  }

  return (
    <SidebarInset>
      <header className="flex h-14 sm:h-16 shrink-0 items-center gap-2 border-b px-4">
        <SidebarTrigger className="-ml-1" />
        <Separator orientation="vertical" className="mr-2 h-4" />
        <h1 className="text-lg font-semibold">Employees</h1>
        <div className="ml-auto">
          <ThemeToggle />
        </div>
      </header>

      <motion.div
        className="flex-1 space-y-6 p-4 sm:p-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.6 }}
        >
          {/*Mobile cards*/}
          <div className="space-y-4 sm:hidden">
            {employees?.map((e, index) => (
              <motion.div
                key={e.employee_id}
                className="border rounded-lg p-4 space-y-3 hover:shadow-sm transition-shadow"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 + 1.2, duration: 0.5 }}
                whileHover={{ scale: 1.01 }}
              >
                <div className="flex items-center justify-between">
                  <h3 className="font-medium">{e.name}</h3>
                </div>
                <motion.div
                  className="grid grid-cols-2 gap-2 text-sm"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: index * 0.1 + 1.5, duration: 0.4 }}
                >
                  <div>
                    <span className="text-muted-foreground">Code:</span>
                    {e.employee_code}
                  </div>
                  <div>
                    <span className="text-muted-foreground">Country Code:</span>
                    {e.country_code}
                  </div>
                  <div>
                    <span className="text-muted-foreground">Currency:</span>
                    {getCurrency(e.country_code)}
                  </div>
                  <div>
                    <span className="text-muted-foreground">Region:</span>
                    {e.region}
                  </div>
                  <div>
                    <span className="text-muted-foreground">Hourly Rate:</span>
                    {e.hourly_rate}
                  </div>
                </motion.div>
              </motion.div>
            ))}
          </div>
          {/*Desktop card*/}
          <Card className="hover:shadow-md transition-shadow duration-300 hidden sm:block">
            <CardHeader>
              <div className="flex items-center justify-between">
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2, duration: 0.5 }}
                >
                  <CardTitle className="text-base sm:text-lg">
                    Employee Directory
                  </CardTitle>
                  {/* <CardDescription className="text-sm">
                    Manage employee information and payroll settings
                  </CardDescription> */}
                </motion.div>
                {/* <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.3, duration: 0.5 }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Button>
                    <Plus className="mr-2 h-4 w-4" />
                    Add Employee
                  </Button>
                </motion.div> */}
              </div>
            </CardHeader>
            <CardContent>
              {/* <motion.div
                className="flex items-center space-x-2 mb-4"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.5 }}
              >
                <div className="relative flex-1 max-w-sm">
                  <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search employees..."
                    className="pl-8"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
              </motion.div> */}

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5, duration: 0.6 }}
              >
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Name</TableHead>
                      <TableHead>Employee Code</TableHead>
                      <TableHead>Country Code</TableHead>
                      <TableHead>Currency</TableHead>
                      <TableHead>Region</TableHead>
                      <TableHead>Hourly Rate</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {employees?.map((employee: Employee, index: number) => (
                      <motion.tr
                        key={employee.employee_id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 + 0.6, duration: 0.5 }}
                        className="hover:bg-muted/50 transition-colors"
                      >
                        <TableCell>{employee.name}</TableCell>
                        <TableCell>{employee.employee_code}</TableCell>
                        <TableCell>{employee.country_code}</TableCell>
                        <TableCell>
                          {getCurrency(employee.country_code)}
                        </TableCell>
                        <TableCell>{employee.region}</TableCell>
                        <TableCell>{employee.hourly_rate}</TableCell>
                        {/* <TableCell>
                          <div className="flex items-center gap-2">
                            <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                              <Button variant="ghost" size="sm">
                                <Edit className="h-4 w-4" />
                              </Button>
                            </motion.div>
                            <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                              <Button variant="ghost" size="sm">
                                <MoreHorizontal className="h-4 w-4" />
                              </Button>
                            </motion.div>
                          </div>
                        </TableCell> */}
                      </motion.tr>
                    ))}
                  </TableBody>
                </Table>
              </motion.div>
            </CardContent>
          </Card>
        </motion.div>
      </motion.div>
    </SidebarInset>
  );
}
