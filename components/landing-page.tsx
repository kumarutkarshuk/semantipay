"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ThemeToggle } from "@/components/theme-toggle";
import {
  Calculator,
  Shield,
  Zap,
  Globe,
  Users,
  BarChart3,
  CheckCircle,
  ArrowRight,
  Menu,
  X,
  Building2,
  Sparkles,
  Clock,
  AlertTriangle,
} from "lucide-react";

const features = [
  {
    icon: Calculator,
    title: "Smart Payroll Processing",
    description:
      "AI-powered payroll calculations with automatic error detection and compliance checking.",
  },
  {
    icon: Shield,
    title: "Violation Management",
    description:
      "Instantly identify and resolve payroll violations with intelligent suggestions.",
  },
  {
    icon: Globe,
    title: "Global Compliance",
    description:
      "Stay compliant with international labor laws and tax regulations across all regions.",
  },
  {
    icon: Zap,
    title: "Real-time Processing",
    description:
      "Process payroll in minutes, not hours, with our lightning-fast calculation engine.",
  },
  {
    icon: Users,
    title: "Employee Management",
    description:
      "Comprehensive employee directory with role-based access and permissions.",
  },
  {
    icon: BarChart3,
    title: "Advanced Analytics",
    description:
      "Deep insights into payroll trends, costs, and compliance metrics.",
  },
];

const stats = [
  { label: "Companies Trust Us", value: "10,000+" },
  { label: "Employees Managed", value: "2M+" },
  { label: "Countries Supported", value: "50+" },
  { label: "Uptime Guarantee", value: "99.9%" },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: "easeOut",
    },
  },
};

export function LandingPage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const featuresRef = useRef(null);
  const benefitsRef = useRef(null);
  const featuresInView = useInView(featuresRef, {
    once: true,
    margin: "-100px",
  });
  const benefitsInView = useInView(benefitsRef, {
    once: true,
    margin: "-100px",
  });

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60"
      >
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            <motion.div
              className="flex items-center gap-2"
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
            >
              <Building2 className="h-8 w-8 text-primary" />
              <span className="text-xl font-bold">Agentic Payroll</span>
            </motion.div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              {["Features"].map((item, index) => (
                <motion.div
                  key={item}
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 + 0.3 }}
                >
                  <Link
                    href={`#${item.toLowerCase()}`}
                    className="text-sm font-medium hover:text-primary transition-colors"
                  >
                    {item}
                  </Link>
                </motion.div>
              ))}
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.6 }}
              >
                <ThemeToggle />
              </motion.div>
              {/* <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.7 }}
              >
                <Button asChild variant="outline" size="sm">
                  <Link href="/dashboard">Sign In</Link>
                </Button>
              </motion.div> */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.8 }}
              >
                <Button asChild size="sm">
                  <Link href="/dashboard/payroll">Dashboard</Link>
                </Button>
              </motion.div>
            </div>

            {/* Mobile menu button */}
            <div className="flex items-center gap-2 md:hidden">
              <ThemeToggle />
              <motion.div whileTap={{ scale: 0.95 }}>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                >
                  <motion.div
                    animate={{ rotate: mobileMenuOpen ? 180 : 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    {mobileMenuOpen ? (
                      <X className="h-5 w-5" />
                    ) : (
                      <Menu className="h-5 w-5" />
                    )}
                  </motion.div>
                </Button>
              </motion.div>
            </div>
          </div>

          {/* Mobile Navigation */}
          <motion.div
            initial={false}
            animate={{
              height: mobileMenuOpen ? "auto" : 0,
              opacity: mobileMenuOpen ? 1 : 0,
            }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="md:hidden overflow-hidden border-t bg-background/95 backdrop-blur"
          >
            <div className="px-2 pt-2 pb-3 space-y-1">
              {["Features"].map((item, index) => (
                <motion.div
                  key={item}
                  initial={{ x: -20, opacity: 0 }}
                  animate={{
                    x: mobileMenuOpen ? 0 : -20,
                    opacity: mobileMenuOpen ? 1 : 0,
                  }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Link
                    href={`#${item.toLowerCase()}`}
                    className="block px-3 py-2 text-base font-medium hover:text-primary transition-colors"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {item}
                  </Link>
                </motion.div>
              ))}
              <motion.div
                className="px-3 py-2 space-y-2"
                initial={{ y: 20, opacity: 0 }}
                animate={{
                  y: mobileMenuOpen ? 0 : 20,
                  opacity: mobileMenuOpen ? 1 : 0,
                }}
                transition={{ delay: 0.3 }}
              >
                {/* <Button
                  asChild
                  variant="outline"
                  className="w-full bg-transparent"
                >
                  <Link href="/dashboard">Sign In</Link>
                </Button> */}
                <Button asChild className="w-full">
                  <Link href="/dashboard/payroll">Dashboard</Link>
                </Button>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </motion.nav>

      {/* Hero Section */}
      <section className="relative overflow-hidden py-12 sm:py-20 lg:py-32">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-secondary/5" />
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative">
          <motion.div
            className="text-center max-w-4xl mx-auto"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2, duration: 0.6 }}
            >
              <Badge variant="secondary" className="mb-4 sm:mb-6">
                <Sparkles className="w-3 h-3 mr-1" />
                AI-Powered Payroll Management
              </Badge>
            </motion.div>

            <motion.h1
              className="text-3xl sm:text-4xl lg:text-6xl font-bold tracking-tight mb-4 sm:mb-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.8 }}
            >
              Global Payroll Made <span className="text-primary">Simple</span>
            </motion.h1>

            <motion.p
              className="text-lg sm:text-xl text-muted-foreground mb-6 sm:mb-8 max-w-2xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.8 }}
            >
              Streamline your payroll operations with AI-powered processing,
              automatic compliance checking, and intelligent violation
              management across all global markets.
            </motion.p>

            <motion.div
              className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.8 }}
            >
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button asChild size="lg" className="w-full sm:w-auto">
                  <Link href="/dashboard/payroll">
                    Get Started
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </motion.div>
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button
                  asChild
                  variant="outline"
                  size="lg"
                  className="w-full sm:w-auto bg-transparent"
                >
                  <Link href="#features">Learn More</Link>
                </Button>
              </motion.div>
            </motion.div>
          </motion.div>

          {/* Hero Image */}
          <motion.div
            className="mt-12 sm:mt-16 relative"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1, duration: 0.8 }}
          >
            <div className="relative mx-auto max-w-4xl">
              <motion.div
                className="relative overflow-hidden rounded-2xl shadow-2xl"
                whileHover={{ scale: 1.02 }}
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
              >
                {/* <img
                  src="/images/hero-dashboard.png"
                  alt="PayrollAgent Dashboard Preview"
                  className="w-full h-auto object-cover"
                  style={{ aspectRatio: "16/10" }}
                /> */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                <motion.div
                  className="absolute bottom-4 left-4 right-4"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1.4, duration: 0.6 }}
                >
                  <div className="bg-white/90 backdrop-blur-sm rounded-lg p-4">
                    <p className="text-sm font-medium text-gray-900">
                      ✨ AI-powered payroll processing with real-time analytics
                    </p>
                  </div>
                </motion.div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section
        id="features"
        className="py-12 sm:py-20 lg:py-32 bg-muted/30"
        ref={featuresRef}
      >
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="text-center mb-12 sm:mb-16"
            initial={{ opacity: 0, y: 30 }}
            animate={
              featuresInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }
            }
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-3 sm:mb-4">
              Everything you need for global payroll
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Comprehensive payroll management with AI-powered insights and
              automated compliance.
            </p>
          </motion.div>

          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8"
            variants={containerVariants}
            initial="hidden"
            animate={featuresInView ? "visible" : "hidden"}
          >
            {features.map((feature, index) => (
              <motion.div key={index} variants={itemVariants}>
                <Card className="border-0 shadow-sm hover:shadow-md transition-all duration-300 h-full group">
                  <CardHeader className="pb-4">
                    <motion.div
                      className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-3 sm:mb-4 group-hover:bg-primary/20 transition-colors duration-300"
                      whileHover={{ scale: 1.1, rotate: 5 }}
                      transition={{
                        type: "spring",
                        stiffness: 400,
                        damping: 10,
                      }}
                    >
                      <feature.icon className="w-5 h-5 sm:w-6 sm:h-6 text-primary" />
                    </motion.div>
                    <CardTitle className="text-lg sm:text-xl">
                      {feature.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-sm sm:text-base">
                      {feature.description}
                    </CardDescription>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-12 sm:py-20 lg:py-32" ref={benefitsRef}>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 lg:gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={
                benefitsInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }
              }
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-4 sm:mb-6">
                Why choose Agentic Payroll?
              </h2>
              <div className="space-y-4 sm:space-y-6">
                {[
                  {
                    icon: CheckCircle,
                    color: "text-green-500",
                    title: "Reduce Processing Time by 90%",
                    description:
                      "Automate complex calculations and eliminate manual errors with AI-powered processing.",
                  },
                  {
                    icon: Clock,
                    color: "text-blue-500",
                    title: "Real-time Compliance Monitoring",
                    description:
                      "Stay ahead of regulatory changes with automatic compliance updates across all regions.",
                  },
                  {
                    icon: AlertTriangle,
                    color: "text-orange-500",
                    title: "Intelligent Violation Detection",
                    description:
                      "Identify and resolve payroll issues before they become costly compliance problems.",
                  },
                ].map((benefit, index) => (
                  <motion.div
                    key={index}
                    className="flex gap-3 sm:gap-4"
                    initial={{ opacity: 0, x: -30 }}
                    animate={
                      benefitsInView
                        ? { opacity: 1, x: 0 }
                        : { opacity: 0, x: -30 }
                    }
                    transition={{ delay: index * 0.2 + 0.3, duration: 0.6 }}
                  >
                    <motion.div
                      whileHover={{ scale: 1.2, rotate: 10 }}
                      transition={{
                        type: "spring",
                        stiffness: 400,
                        damping: 10,
                      }}
                    >
                      <benefit.icon
                        className={`w-5 h-5 sm:w-6 sm:h-6 ${benefit.color} mt-0.5 flex-shrink-0`}
                      />
                    </motion.div>
                    <div>
                      <h3 className="font-semibold mb-1 sm:mb-2">
                        {benefit.title}
                      </h3>
                      <p className="text-sm sm:text-base text-muted-foreground">
                        {benefit.description}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            <motion.div
              className="relative"
              initial={{ opacity: 0, x: 50 }}
              animate={
                benefitsInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 50 }
              }
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <motion.div
                className="aspect-square rounded-2xl bg-gradient-to-br from-primary/20 to-secondary/20 p-6 sm:p-8"
                whileHover={{ scale: 1.02 }}
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
              >
                <div className="h-full w-full rounded-xl bg-background/80 backdrop-blur flex items-center justify-center">
                  <div className="text-center">
                    <motion.div
                      animate={{
                        rotate: [0, 5, -5, 0],
                        scale: [1, 1.1, 1],
                      }}
                      transition={{
                        duration: 4,
                        repeat: Number.POSITIVE_INFINITY,
                        repeatType: "reverse",
                      }}
                    >
                      <BarChart3 className="w-16 h-16 sm:w-20 sm:h-20 text-primary mx-auto mb-4" />
                    </motion.div>
                    <h3 className="text-lg sm:text-xl font-semibold mb-2">
                      Dashboard Preview
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      Comprehensive analytics and insights
                    </p>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <motion.section
        className="py-12 sm:py-20 lg:py-32 bg-primary text-primary-foreground"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.h2
            className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-3 sm:mb-4"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            Ready to transform your payroll?
          </motion.h2>
          <motion.p
            className="text-lg sm:text-xl opacity-90 mb-6 sm:mb-8 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            viewport={{ once: true }}
          >
            Join thousands of companies already using Agentic Payroll to streamline
            their global payroll operations.
          </motion.p>
          <motion.div
            className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            viewport={{ once: true }}
          >
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button
                asChild
                size="lg"
                variant="secondary"
                className="w-full sm:w-auto"
              >
                <Link href="/dashboard/payroll">
                  Demo
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </motion.div>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="w-full sm:w-auto border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary bg-transparent"
              >
                <Link href="#contact">Contact Sales</Link>
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </motion.section>

      {/* Footer */}
      <motion.footer
        className="border-t bg-background py-8 sm:py-12"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <motion.div
              className="col-span-1 sm:col-span-2 lg:col-span-1"
              variants={itemVariants}
            >
              <div className="flex items-center gap-2 mb-3 sm:mb-4">
                <Building2 className="h-6 w-6 text-primary" />
                <span className="text-lg font-bold">Agentic Payroll</span>
              </div>
              <p className="text-sm text-muted-foreground mb-4">
                AI-powered global payroll management for modern businesses.
              </p>
            </motion.div>

            {[
              {
                title: "Product",
                links: ["Features", "Pricing", "Integrations"],
              },
              {
                title: "Company",
                links: ["About", "Careers", "Contact"],
              },
              {
                title: "Support",
                links: ["Help Center", "Documentation", "Status"],
              },
            ].map((section, index) => (
              <motion.div key={section.title} variants={itemVariants}>
                <h3 className="font-semibold mb-3 sm:mb-4">{section.title}</h3>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  {section.links.map((link) => (
                    <li key={link}>
                      <Link
                        href={`#${link.toLowerCase().replace(" ", "")}`}
                        className="hover:text-foreground transition-colors"
                      >
                        {link}
                      </Link>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </motion.div>
          <motion.div
            className="border-t mt-6 sm:mt-8 pt-6 sm:pt-8 text-center"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.6 }}
            viewport={{ once: true }}
          >
            <p className="text-sm text-muted-foreground">
              © 2025 Agentic Payroll. All rights reserved.
            </p>
          </motion.div>
        </div>
      </motion.footer>
    </div>
  );
}
