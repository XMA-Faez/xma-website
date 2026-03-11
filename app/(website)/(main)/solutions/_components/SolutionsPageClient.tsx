"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Section from "@/components/ui/section";
import { ScanningButton } from "@/components/ui/ScanningButton";
import { ArrowUpRight } from "lucide-react";
import { solutions } from "@/data/navigation";

const solutionDetails: Record<
  string,
  { description: string; highlights: string[] }
> = {
  "Growth Launch System": {
    description:
      "Build the complete brand, website, and infrastructure required before scaling marketing.",
    highlights: [
      "Brand strategy & positioning",
      "Conversion website",
      "Marketing infrastructure",
    ],
  },
  "E-Commerce Revenue Engine": {
    description:
      "Acquire customers and scale revenue for e-commerce brands through paid and organic channels.",
    highlights: [
      "Multi-channel acquisition",
      "Conversion optimization",
      "Retention automation",
    ],
  },
  "B2B Lead Generation": {
    description:
      "Generate qualified leads and build predictable sales pipelines for B2B companies.",
    highlights: [
      "Targeted campaigns",
      "Funnel architecture",
      "CRM automation",
    ],
  },
  "CRM & Revenue System": {
    description:
      "Organize leads, automate follow-ups, and manage the sales pipeline for predictable revenue.",
    highlights: [
      "CRM implementation",
      "Workflow automation",
      "Pipeline analytics",
    ],
  },
  "Conversion Acceleration": {
    description:
      "Increase revenue by improving how traffic and leads convert into paying customers.",
    highlights: [
      "Conversion audit",
      "A/B testing program",
      "Funnel optimization",
    ],
  },
};

export default function SolutionsPageClient() {
  return (
    <div className="relative w-full">
      <div className="relative min-h-[50vh] flex items-center overflow-x-clip">
        <div
          className="absolute inset-0"
          style={{
            background: `
              radial-gradient(ellipse 70% 50% at 50% 0%, oklch(0.2 0.08 250 / 0.5), transparent 60%),
              linear-gradient(180deg, oklch(0.07 0 0), oklch(0.05 0 0))
            `,
          }}
        />
        <Section size="xl" padding="lg" className="relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-3xl mx-auto"
          >
            <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-white mb-6 leading-[1.1]">
              Growth Systems for Businesses Ready to Scale
            </h1>
            <p className="text-lg md:text-xl text-zinc-400">
              XMA offers structured growth solutions designed to help companies
              generate leads, convert customers, and scale revenue. Solutions
              are built as complete systems rather than individual services.
            </p>
          </motion.div>
        </Section>
      </div>

      <Section size="xl" padding="md">
        <div className="space-y-6">
          {solutions.map((solution, index) => {
            const details = solutionDetails[solution.name];
            return (
              <motion.div
                key={solution.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.08 }}
                viewport={{ once: true }}
              >
                <Link href={solution.href} className="group block">
                  <div className="glass-primary rounded-2xl p-8 md:p-10 transition-all duration-300 hover:border-blue-500/30 hover:bg-white/[0.04]">
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
                      <div className="flex-1">
                        <div className="flex items-start gap-3 mb-3">
                          <h2 className="text-2xl font-semibold text-white group-hover:text-blue-400 transition-colors">
                            {solution.name}
                          </h2>
                          <ArrowUpRight className="w-5 h-5 text-zinc-600 group-hover:text-blue-400 transition-all group-hover:translate-x-0.5 group-hover:-translate-y-0.5 shrink-0 mt-1" />
                        </div>
                        <p className="text-zinc-400 mb-4 max-w-2xl">
                          {details?.description}
                        </p>
                        <div className="flex flex-wrap gap-2">
                          {details?.highlights.map((highlight) => (
                            <span
                              key={highlight}
                              className="px-3 py-1 text-xs rounded-full border border-zinc-800 text-zinc-500"
                            >
                              {highlight}
                            </span>
                          ))}
                        </div>
                      </div>
                      <div className="shrink-0">
                        <ScanningButton
                          variant="outline"
                          size="sm"
                          className="pointer-events-none"
                        >
                          View Solution
                        </ScanningButton>
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </div>
      </Section>

      <div className="relative overflow-x-clip">
        <div
          className="absolute inset-0"
          style={{
            background: `
              radial-gradient(ellipse 80% 50% at 50% 100%, oklch(0.2 0.08 250 / 0.4), transparent 60%),
              linear-gradient(180deg, oklch(0.05 0 0), oklch(0.07 0 0))
            `,
          }}
        />
        <Section size="md" padding="lg" className="relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <h2 className="heading-section text-white mb-6">
              Not Sure Which Solution Fits?
            </h2>
            <p className="text-lg text-zinc-400 max-w-xl mx-auto mb-10">
              Apply and we&apos;ll recommend the right system based on your
              business goals and current infrastructure.
            </p>
            <Link href="/apply">
              <ScanningButton variant="primary" size="lg" color="blue">
                Apply Now
              </ScanningButton>
            </Link>
          </motion.div>
        </Section>
      </div>
    </div>
  );
}
