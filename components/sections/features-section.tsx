"use client"
import { Code, Layers, Palette, Sparkles, Zap, Shield, Timer, MessageCircleWarning, DollarSign } from "lucide-react"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ScrollReveal } from "@/components/scroll-reveal"
import { AnimatedText } from "@/components/ui/animated-text"
import { AnimatedBackground } from "../ui/animated-background"
import { ParallaxScroll } from "../ui/parallax-scroll"
import { GlowingTiltCard } from "../ui/glowing-tilt-card"
import { ProgressCard } from "../ui-library/cards/progress-card"
import { FeaturesWobble } from "../features-wobble"

export function FeaturesSection() {
  const features = [
    {
      icon: <Timer className="h-8 w-8 sm:h-10 sm:w-10 text-red-500" />,
      title: "Stay Ahead of Compliance Changes",
      description: "Adapt instantly to new rules without weeks of expensive rework.",
      progress: 100,
      borderClass: "border-glow-red",
    },
    {
      icon: <MessageCircleWarning className="h-8 w-8 sm:h-10 sm:w-10 text-blue-500" />,
      title: "Reduce Payroll Errors by 80%",
      description: "Minimize mistakes and improve accuracy with intelligent, compliance-aware processing.",
      progress: 80,
      borderClass: "border-glow-blue",
    },
    {
      icon: <DollarSign className="h-8 w-8 sm:h-10 sm:w-10 text-yellow-500" />,
      title: "Avoid Costly Penalties",
      description: "Prevent errors that lead to fines—33% of employers face $7B in annual penalties, according to IRS studies.",
      progress: 95,
      borderClass: "border-glow-yellow",
    }
  ]

  return (
    <section id="features" className="relative w-full pt-16 md:py-24 lg:pt-36 bg-muted/30 overflow-hidden">
      <AnimatedBackground variant="dots" color="rgba(220, 38, 38, 0.05)" />

      <div className="container px-4 sm:px-6 md:px-8 mx-auto">
        <ScrollReveal>
          <div className="flex flex-col items-center justify-center space-y-4 sm:space-y-6 text-center mb-8 sm:mb-12">
            <div className="space-y-3 sm:space-y-4">
              <AnimatedText
                text="Powerful Features, Smarter Payroll"
                variant="heading"
                className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-heading font-bold tracking-tighter gradient-text px-4"
                animation="slide"
              />
              <AnimatedText
                text="Everything you need to process payroll faster, efficiently, and fully compliant."
                variant="paragraph"
                className="mx-auto max-w-[900px] text-gray-500 text-base sm:text-lg md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400 opacity-70 px-4"
                animation="fade"
                delay={0.3}
              />
            </div>
          </div>
        </ScrollReveal>

        {/* <FeaturesWobble/> */}

        <ParallaxScroll baseVelocity={0.1} direction="up" className="py-8 sm:py-12">
          <div className="mx-auto grid max-w-6xl grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 h-full">
            {features.map((feature, index) => (
              <ScrollReveal key={index} delay={index * 0.1}>
                <GlowingTiltCard className="h-full">
                  <Card
                    className={`h-full glassmorphic-card border-none overflow-hidden group soft-glow ${feature.borderClass}`}
                  >
                    <CardHeader className="pb-3 sm:pb-4">
                      <div className="p-2 sm:p-3 rounded-xl w-fit bg-muted/50 transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3">
                        {feature.icon}
                      </div>
                      <CardTitle className="mt-3 sm:mt-4 tracking-tight relative text-lg sm:text-xl">
                        {feature.title}
                        <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-red-500 transition-all duration-300 group-hover:w-full"></span>
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3 sm:space-y-4 pt-0 h-full">
                      <CardDescription className="text-sm sm:text-base opacity-70 transition-opacity duration-300 group-hover:opacity-100 leading-relaxed">
                        {feature.description}
                      </CardDescription>

                      {/* <ProgressCard
                        title=""
                        progress={feature.progress}
                        total={100}
                        status={feature.progress === 100 ? "success" : "default"}
                        showPercentage
                        variant="minimal"
                        progressColor={feature.progress === 100 ? "bg-green-500" : "bg-red-500"}
                      /> */}
                    </CardContent>
                  </Card>
                </GlowingTiltCard>
              </ScrollReveal>
            ))}
          </div>
        </ParallaxScroll>
      </div>
    </section>
  )
}
