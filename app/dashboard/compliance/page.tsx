"use client";

import { motion } from "framer-motion";
import { SidebarInset, SidebarTrigger } from "@/components/ui/sidebar";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Separator } from "@/components/ui/separator";
import { ComplianceTableSkeleton } from "@/components/loading-skeletons";
import { ThemeToggle } from "@/components/theme-toggle";
import { Compliance } from "@/lib/types";
import { useQuery } from "@tanstack/react-query";
import { fetchCompliance } from "@/lib/next-api";
import { getCurrency } from "@/lib/utils";

const compliance: Compliance[] = [
  {
    rule_id: 1,
    country_code: "IN",
    region: "Karnataka",
    rule_name: "Minimum Wage",
    description: "Minimum wage for unskilled workers",
    effective_date: "2023-01-01",
    threshold_value: 500,
    formula: "base_rate * hours_worked",
  },
  {
    rule_id: 2,
    country_code: "IN",
    region: "Maharashtra",
    rule_name: "Overtime Pay",
    description: "lorem ipsum dolor sit amet consectetur adipiscing elit sed do eiusmod tempor incididunt ut labore et dolore magna aliqua ut enim ad minim veniam",
    effective_date:" 2023-02-01",
    threshold_value: 200,
    formula: "hourly_rate * 1.5 * overtime_hours",
  },
];

const isLoading = false;

export default function CompliancePage() {
  // const {
  //   data: compliance,
  //   isLoading,
  // } = useQuery<Compliance[]>({
  //   queryKey: ["compliance"],
  //   queryFn: fetchCompliance,
  // });

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
          <ComplianceTableSkeleton />
        </div>
      </SidebarInset>
    );
  }

  return (
    <SidebarInset>
      <header className="flex h-14 sm:h-16 shrink-0 items-center gap-2 border-b px-4">
        <SidebarTrigger className="-ml-1" />
        <Separator orientation="vertical" className="mr-2 h-4" />
        <h1 className="text-lg font-semibold">Compliance</h1>
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
                      {compliance?.map((c, index) => (
                        <motion.div
                          key={c.rule_id}
                          className="border rounded-lg p-4 space-y-3 hover:shadow-sm transition-shadow"
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: index * 0.1 + 1.2, duration: 0.5 }}
                          whileHover={{ scale: 1.01 }}
                        >
                          <div className="flex items-center justify-between">
                            <h3 className="font-medium">{c.rule_name}</h3>
                          </div>
                          <motion.div
                            className="grid grid-cols-2 gap-2 text-sm"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: index * 0.1 + 1.5, duration: 0.4 }}
                          >
                              <span className="text-muted-foreground">Country Code:</span>
                            <div>
                              {c.country_code}
                            </div>
                              <span className="text-muted-foreground">Region:</span>
                            <div>
                              {c.region || "-"}
                            </div>
                              <span className="text-muted-foreground">Effective Date:</span>
                            <div>
                              {c.effective_date}
                            </div>
                              <span className="text-muted-foreground">Threshold Value:</span>
                            <div>
                              {`${c.threshold_value} (${getCurrency(c.country_code)})`}
                            </div>
                              <span className="text-muted-foreground">Description:</span>
                            <div>
                              {c.description}
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
                    Compliance Rules
                  </CardTitle>
                </motion.div>
              </div>
            </CardHeader>
            <CardContent>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5, duration: 0.6 }}
              >
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Country Code</TableHead>
                      <TableHead>Region</TableHead>
                      <TableHead>Rule Name</TableHead>
                      <TableHead className="w-[50%]">Description</TableHead>
                      <TableHead>Effective Date</TableHead>
                      <TableHead>Threshold Value</TableHead>
                      {/* <TableHead>Formula</TableHead> */}
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {compliance?.map((c: Compliance, index: number) => (
                      <motion.tr
                        key={c.rule_id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 + 0.6, duration: 0.5 }}
                        className="hover:bg-muted/50 transition-colors"
                      >
                        <TableCell>{c.country_code}</TableCell>
                        <TableCell>{c.region ? c.region : "-"}</TableCell>
                        <TableCell>{c.rule_name}</TableCell>
                        <TableCell className="line-c">{c.description}</TableCell>
                        <TableCell>
                          {c.effective_date}
                        </TableCell>
                        <TableCell>{`${c.threshold_value} (${getCurrency(c.country_code)})`}</TableCell>
                        {/* <TableCell>{c.formula}</TableCell> */}
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
