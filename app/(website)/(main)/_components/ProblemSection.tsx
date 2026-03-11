"use client";

import { motion } from "framer-motion";
import Section from "@/components/ui/section";
import { Zap, TrendingDown, EyeOff } from "lucide-react";

const problems = [
  {
    icon: Zap,
    title: "Marketing Chaos",
    description:
      "Companies run ads without a structured acquisition strategy.",
  },
  {
    icon: TrendingDown,
    title: "Sales Leakage",
    description:
      "Leads come in but are not properly followed up or converted.",
  },
  {
    icon: EyeOff,
    title: "No Infrastructure",
    description:
      "No CRM, no automation, and no visibility into the pipeline.",
  },
];

export default function ProblemSection() {
  return (
    <Section size="xl" padding="md">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="text-center mb-16"
      >
        <h2 className="heading-section text-white mb-4">
          Most Businesses Don&apos;t Have a Growth System
        </h2>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        {problems.map((problem, index) => {
          const Icon = problem.icon;
          return (
            <motion.div
              key={problem.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="glass-primary rounded-2xl p-8 text-center"
            >
              <div className="w-12 h-12 rounded-xl bg-red-500/10 border border-red-500/20 flex items-center justify-center mx-auto mb-6">
                <Icon className="w-6 h-6 text-red-400" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-3">
                {problem.title}
              </h3>
              <p className="text-zinc-400">{problem.description}</p>
            </motion.div>
          );
        })}
      </div>

      <motion.p
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.4 }}
        viewport={{ once: true }}
        className="text-center text-lg text-zinc-500 max-w-xl mx-auto"
      >
        Without systems, growth becomes unpredictable.
      </motion.p>
    </Section>
  );
}
