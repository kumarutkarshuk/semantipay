"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { DashboardSkeleton } from "@/components/loading-skeletons"
import { SidebarInset, SidebarTrigger } from "@/components/ui/sidebar"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Separator } from "@/components/ui/separator"
import { ThemeToggle } from "@/components/theme-toggle"
import { Users, DollarSign, AlertTriangle, CheckCircle, TrendingUp, Calendar } from "lucide-react"

const stats = [
  {
    title: "Total Employees",
    value: "1,234",
    change: "+12%",
    icon: Users,
    color: "text-blue-600",
  },
  {
    title: "Monthly Payroll",
    value: "$2.4M",
    change: "+8%",
    icon: DollarSign,
    color: "text-green-600",
  },
  {
    title: "Violations",
    value: "23",
    change: "-15%",
    icon: AlertTriangle,
    color: "text-red-600",
  },
  {
    title: "Processed",
    value: "98.2%",
    change: "+2%",
    icon: CheckCircle,
    color: "text-emerald-600",
  },
]

const recentPayrolls = [
  {
    id: "1",
    period: "December 2024",
    employees: 1234,
    amount: "$2,400,000",
    status: "completed",
    violations: 5,
  },
  {
    id: "2",
    period: "November 2024",
    employees: 1230,
    amount: "$2,350,000",
    status: "completed",
    violations: 12,
  },
  {
    id: "3",
    period: "October 2024",
    employees: 1225,
    amount: "$2,300,000",
    status: "completed",
    violations: 8,
  },
]

export default function DashboardPage() {
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Simulate loading time
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 1500)

    return () => clearTimeout(timer)
  }, [])

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
        <DashboardSkeleton />
      </SidebarInset>
    )
  }

  return (
    <SidebarInset>
      <header className="flex h-14 sm:h-16 shrink-0 items-center gap-2 border-b px-4">
        <SidebarTrigger className="-ml-1" />
        <Separator orientation="vertical" className="mr-2 h-4" />
        <h1 className="text-lg font-semibold">Dashboard</h1>
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
        {/* Stats Grid - Mobile First */}
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.6 }}
        >
          {stats.map((stat, index) => (
            <motion.div
              key={stat.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 + 0.3, duration: 0.5 }}
              whileHover={{ scale: 1.02 }}
            >
              <Card className="p-4 sm:p-6 hover:shadow-md transition-shadow duration-300">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 p-0">
                  <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
                  <motion.div
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    transition={{ type: "spring", stiffness: 400, damping: 10 }}
                  >
                    <stat.icon className={`h-4 w-4 ${stat.color}`} />
                  </motion.div>
                </CardHeader>
                <CardContent className="p-0 pt-2">
                  <div className="text-xl sm:text-2xl font-bold">{stat.value}</div>
                  <p className="text-xs text-muted-foreground">
                    <span className="text-green-600">{stat.change}</span> from last month
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.6 }}
        >
          {/* Recent Payrolls */}
          <motion.div whileHover={{ scale: 1.01 }} transition={{ type: "spring", stiffness: 300, damping: 30 }}>
            <Card className="hover:shadow-md transition-shadow duration-300">
              <CardHeader className="pb-3">
                <CardTitle className="text-base sm:text-lg">Recent Payroll Runs</CardTitle>
                <CardDescription className="text-sm">Latest payroll processing results</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3 sm:space-y-4">
                {recentPayrolls.map((payroll, index) => (
                  <motion.div
                    key={payroll.id}
                    className="flex items-center justify-between p-2 rounded-lg hover:bg-muted/50 transition-colors"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 + 0.8, duration: 0.4 }}
                  >
                    <div className="space-y-1">
                      <p className="text-sm font-medium">{payroll.period}</p>
                      <p className="text-xs text-muted-foreground">
                        {payroll.employees} employees • {payroll.amount}
                      </p>
                    </div>
                    <div className="flex flex-col sm:flex-row items-end sm:items-center gap-1 sm:gap-2">
                      {payroll.violations > 0 && (
                        <Badge variant="destructive" className="text-xs">
                          {payroll.violations} violations
                        </Badge>
                      )}
                      <Badge variant="default" className="text-xs">
                        {payroll.status}
                      </Badge>
                    </div>
                  </motion.div>
                ))}
              </CardContent>
            </Card>
          </motion.div>

          {/* Processing Status */}
          <motion.div whileHover={{ scale: 1.01 }} transition={{ type: "spring", stiffness: 300, damping: 30 }}>
            <Card className="hover:shadow-md transition-shadow duration-300">
              <CardHeader className="pb-3">
                <CardTitle className="text-base sm:text-lg">Processing Overview</CardTitle>
                <CardDescription className="text-sm">Current month payroll status</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <motion.div
                  className="space-y-2"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1, duration: 0.6 }}
                >
                  <div className="flex justify-between text-sm">
                    <span>Employees Processed</span>
                    <span>1,210 / 1,234</span>
                  </div>
                  <Progress value={98} className="h-2" />
                </motion.div>

                <motion.div
                  className="space-y-2"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1.2, duration: 0.6 }}
                >
                  <div className="flex justify-between text-sm">
                    <span>Violations Resolved</span>
                    <span>18 / 23</span>
                  </div>
                  <Progress value={78} className="h-2" />
                </motion.div>

                <motion.div
                  className="pt-4 space-y-2"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1.4, duration: 0.6 }}
                >
                  <div className="flex items-center gap-2 text-sm">
                    <Calendar className="h-4 w-4 text-muted-foreground flex-shrink-0" />
                    <span>Next payroll: January 31, 2025</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <TrendingUp className="h-4 w-4 text-green-600 flex-shrink-0" />
                    <span>Processing efficiency up 12%</span>
                  </div>
                </motion.div>
              </CardContent>
            </Card>
          </motion.div>
        </motion.div>

        {/* Violations Summary */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.6 }}
          whileHover={{ scale: 1.005 }}
        >
          <Card className="hover:shadow-md transition-shadow duration-300">
            <CardHeader className="pb-3">
              <CardTitle className="text-base sm:text-lg">Active Violations</CardTitle>
              <CardDescription className="text-sm">Payroll violations requiring attention</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              {[
                {
                  title: "Overtime Rate Calculation",
                  employees: 5,
                  priority: "High Priority",
                  variant: "destructive" as const,
                },
                {
                  title: "Missing Time Entries",
                  employees: 3,
                  priority: "Medium Priority",
                  variant: "secondary" as const,
                },
                {
                  title: "Tax Calculation Discrepancy",
                  employees: 2,
                  priority: "Low Priority",
                  variant: "outline" as const,
                },
              ].map((violation, index) => (
                <motion.div
                  key={index}
                  className="flex flex-col sm:flex-row sm:items-center justify-between p-3 border rounded-lg gap-2 hover:bg-muted/30 transition-colors"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 + 1, duration: 0.4 }}
                  whileHover={{ x: 5 }}
                >
                  <div className="space-y-1">
                    <p className="text-sm font-medium">{violation.title}</p>
                    <p className="text-xs text-muted-foreground">{violation.employees} employees affected</p>
                  </div>
                  <Badge variant={violation.variant} className="self-start sm:self-center">
                    {violation.priority}
                  </Badge>
                </motion.div>
              ))}
            </CardContent>
          </Card>
        </motion.div>
      </motion.div>
    </SidebarInset>
  )
}
