"use client"

import { cubicBezier, motion } from "framer-motion"
import Link from "next/link"
import { ArrowRight } from "lucide-react"

import { ScrollReveal } from "@/components/scroll-reveal"
import { GradientButton } from "@/components/ui-library/buttons/gradient-button"
import { AnimatedBackground } from "../ui/animated-background"
import { MagneticButton } from "../ui/magnetic-button"
import { SpotlightCard } from "../ui/spotlight-card"
import Workflow from "../react-flow/workflow"

// Animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.3,
    },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: cubicBezier(0.22, 1, 0.36, 1) },
  },
}

export function HeroSection() {
  return (
    <section id="home" className="relative w-full py-16 md:py-24 lg:py-32 xl:py-36 overflow-hidden">
      <AnimatedBackground variant="gradient" color="rgba(220, 38, 38, 0.08)" secondaryColor="rgba(75, 85, 99, 0.08)" />

      <div className="container px-4 sm:px-6 md:px-8 mx-auto">
        <div className="grid gap-8 lg:grid-cols-[1fr_400px] lg:gap-16 xl:grid-cols-1 items-center">
          <ScrollReveal>
            <motion.div
              className="flex flex-col justify-center space-y-6 text-center lg:text-left items-center"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              <motion.div className="space-y-4" variants={itemVariants}>
                <h1 className="text-3xl font-heading font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl/none text-center">
                  <span className="gradient-text">Globally Compliant</span>
                  <br />
                  <span className="text-foreground">Agentic Payroll</span>
                </h1>
                <p className="max-w-[700px] mx-auto lg:mx-0 text-gray-500 text-base sm:text-lg md:text-xl dark:text-gray-400 opacity-70 leading-relaxed text-center">
                  An AI-powered system that automates payroll processing while meeting compliance rules worldwide.
                </p>
              </motion.div>

              <motion.div
                className="flex flex-col gap-4 sm:flex-row sm:justify-center lg:justify-start sm:items-center"
                variants={itemVariants}
              >
                <GradientButton
                  glowAmount={5}
                  className="px-6 py-3 text-base w-full sm:w-auto"
                  gradientFrom="from-red-500"
                  gradientTo="to-red-700"
                  asChild
                >
                  <Link href="/dashboard/payroll" className="flex items-center justify-center">
                    Get Started
                    <motion.span
                      className="ml-2 inline-block"
                      animate={{ x: [0, 4, 0] }}
                      transition={{ repeat: Number.POSITIVE_INFINITY, repeatDelay: 2, duration: 1 }}
                    >
                      <ArrowRight className="h-4 w-4" />
                    </motion.span>
                  </Link>
                </GradientButton>

                <MagneticButton className="neumorphic-button w-full sm:w-auto">
                  <Link href="#features" className="px-6 py-3 block text-center">
                    View Features
                  </Link>
                </MagneticButton>
              </motion.div>

              <motion.div variants={itemVariants} className="pt-4">
                <p className="text-sm text-muted-foreground flex items-center justify-center lg:justify-start">
                  <span className="inline-block w-2 h-2 rounded-full bg-green-500 mr-2"></span>
                  MVP Released!
                </p>
              </motion.div>
            </motion.div>
          </ScrollReveal>

          <ScrollReveal delay={0.3}>
            {/* <SpotlightCard className="relative h-[350px] sm:h-[400px] lg:h-[450px] w-full overflow-hidden rounded-xl border glassmorphic-card p-1 border-glow-red">
              <div className="absolute inset-0 bg-gradient-to-br from-red-900/20 via-transparent to-gray-900/20 z-10"></div>
              <div className="relative z-20 h-full w-full rounded-xl bg-gradient-to-br from-red-950/50 to-gray-950/50 p-4 sm:p-6 flex items-center justify-center">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 w-full max-w-md">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.6 }}
                    className="col-span-1 sm:col-span-2 h-20 sm:h-24 rounded-xl bg-red-800/20 border border-red-800/30 flex items-center justify-center glassmorphic-inner-card"
                    whileHover={{ scale: 1.03, boxShadow: "0 0 15px rgba(220, 38, 38, 0.3)" }}
                  >
                    <span className="font-heading text-lg sm:text-xl text-white tracking-tight text-center">
                      Premium Components
                    </span>
                  </motion.div>
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.8 }}
                    className="h-24 sm:h-32 rounded-xl bg-gray-800/20 border border-gray-800/30 flex items-center justify-center glassmorphic-inner-card"
                    whileHover={{ scale: 1.03, boxShadow: "0 0 15px rgba(75, 85, 99, 0.3)" }}
                  >
                    <span className="font-heading text-sm sm:text-base text-white tracking-tight">Tailwind</span>
                  </motion.div>
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 1.0 }}
                    className="h-24 sm:h-32 rounded-xl bg-red-900/20 border border-red-900/30 flex items-center justify-center glassmorphic-inner-card"
                    whileHover={{ scale: 1.03, boxShadow: "0 0 15px rgba(220, 38, 38, 0.3)" }}
                  >
                    <span className="font-heading text-sm sm:text-base text-white tracking-tight">TypeScript</span>
                  </motion.div>
                </div>
              </div>
            </SpotlightCard> */}
              <div className="relative h-[350px] sm:h-[400px] lg:h-[600px] w-full overflow-hidden rounded-xl border border-glow-red">
                <Workflow/>
              </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  )
}
