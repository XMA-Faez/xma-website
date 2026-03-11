"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Section from "@/components/ui/section";
import { ScanningButton } from "@/components/ui/ScanningButton";
import { ArrowRight } from "lucide-react";

const diagramSteps = [
  { label: "Traffic", color: "oklch(0.55 0.18 250)" },
  { label: "Conversion", color: "oklch(0.55 0.18 250)" },
  { label: "CRM", color: "oklch(0.55 0.18 250)" },
  { label: "Revenue", color: "oklch(0.6 0.2 145)" },
];

export default function NewHeroSection() {
  return (
    <div className="relative min-h-svh flex items-center overflow-x-clip">
      <div
        className="absolute inset-0"
        style={{
          background: `
            radial-gradient(ellipse 80% 50% at 50% 0%, oklch(0.2 0.08 250 / 0.5), transparent 60%),
            radial-gradient(ellipse 60% 40% at 80% 80%, oklch(0.15 0.06 250 / 0.3), transparent 50%),
            linear-gradient(180deg, oklch(0.07 0 0), oklch(0.05 0 0))
          `,
        }}
      />

      <div
        className="absolute inset-0 opacity-[0.02] pointer-events-none"
        style={{
          backgroundImage: `
            linear-gradient(to right, oklch(1 0 0) 1px, transparent 1px),
            linear-gradient(to bottom, oklch(1 0 0) 1px, transparent 1px)
          `,
          backgroundSize: "80px 80px",
        }}
      />

      <Section size="xl" padding="lg" className="relative z-10">
        <div className="flex flex-col items-center text-center max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-block px-4 py-1.5 rounded-full text-sm font-medium border border-blue-500/30 text-blue-400 bg-blue-500/10 mb-8">
              Growth Systems Agency
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-5xl md:text-7xl font-bold tracking-tight text-white mb-6 leading-[1.07]"
          >
            Growth Systems Built to{" "}
            <span className="heading-gradient">Scale Revenue</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-lg md:text-xl text-zinc-400 max-w-2xl mb-10"
          >
            XMA designs and implements the marketing, sales, and conversion
            systems companies need to generate leads, acquire customers, and
            grow revenue predictably.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-col sm:flex-row gap-4 mb-16"
          >
            <Link href="/apply">
              <ScanningButton variant="primary" size="lg" color="blue">
                Book a Call
              </ScanningButton>
            </Link>
            <Link href="#solutions">
              <ScanningButton variant="outline" size="lg">
                Explore Solutions
              </ScanningButton>
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="flex items-center gap-2 md:gap-4 flex-wrap justify-center"
          >
            {diagramSteps.map((step, index) => (
              <div key={step.label} className="flex items-center gap-2 md:gap-4">
                <div
                  className="px-4 md:px-6 py-3 rounded-xl border border-white/10 bg-white/5 backdrop-blur-sm"
                  style={{ boxShadow: `0 0 20px ${step.color.replace(")", " / 0.15)")}` }}
                >
                  <span className="text-sm md:text-base font-medium text-white">
                    {step.label}
                  </span>
                </div>
                {index < diagramSteps.length - 1 && (
                  <ArrowRight className="w-4 h-4 text-zinc-600" />
                )}
              </div>
            ))}
          </motion.div>
        </div>
      </Section>
    </div>
  );
}
