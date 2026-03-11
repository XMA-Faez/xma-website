"use client";

import { motion } from "framer-motion";
import Section from "@/components/ui/section";
import { Search, PenTool, Rocket, BarChart3 } from "lucide-react";

const steps = [
  {
    icon: Search,
    number: "01",
    title: "Diagnose",
    description:
      "Audit the current marketing, sales, and funnel performance.",
  },
  {
    icon: PenTool,
    number: "02",
    title: "Architect",
    description: "Design the growth system required to scale.",
  },
  {
    icon: Rocket,
    number: "03",
    title: "Implement",
    description:
      "Deploy campaigns, funnels, CRM systems, and infrastructure.",
  },
  {
    icon: BarChart3,
    number: "04",
    title: "Optimize",
    description: "Continuously refine performance and scale revenue.",
  },
];

export default function MethodSection() {
  return (
    <Section size="xl" padding="md">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="text-center mb-16"
      >
        <h2 className="heading-section text-white">Our Approach</h2>
      </motion.div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {steps.map((step, index) => {
          const Icon = step.icon;
          return (
            <motion.div
              key={step.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="glass-primary rounded-2xl p-8 relative"
            >
              <span className="text-5xl font-bold text-white/5 absolute top-4 right-6">
                {step.number}
              </span>
              <div className="w-12 h-12 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center mb-6">
                <Icon className="w-6 h-6 text-blue-400" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-3">
                {step.title}
              </h3>
              <p className="text-zinc-400">{step.description}</p>
            </motion.div>
          );
        })}
      </div>
    </Section>
  );
}
