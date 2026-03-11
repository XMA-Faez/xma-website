"use client";

import { motion } from "framer-motion";
import Section from "@/components/ui/section";
import { Search, PenTool, Rocket, BarChart3 } from "lucide-react";
import type { LucideIcon } from "lucide-react";

type Step = {
  icon: LucideIcon;
  number: string;
  title: string;
  description: string;
};

const steps: Step[] = [
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

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: (index: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      delay: index * 0.15,
      ease: "easeOut",
    },
  }),
};

export default function MethodSectionVariantB() {
  return (
    <Section size="xl" padding="md">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="text-center mb-16"
      >
        <span className="text-sm uppercase tracking-wider text-primary-500 font-semibold mb-4 block">
          Our Process
        </span>
        <h2 className="heading-section text-white">Our Approach</h2>
      </motion.div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {steps.map((step, index) => {
          const Icon = step.icon;
          return (
            <motion.div
              key={step.title}
              custom={index}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-50px" }}
              variants={cardVariants}
              whileHover={{ y: -8, transition: { duration: 0.3 } }}
              className="group relative p-8 rounded-2xl bg-zinc-900/50 border border-zinc-800 hover:border-primary-500/30 transition-colors duration-300"
            >
              <span className="text-6xl font-bold text-white/[0.03] absolute top-4 right-6 select-none">
                {step.number}
              </span>

              <div className="flex flex-col">
                <motion.div
                  className="w-14 h-14 mb-6 rounded-xl bg-primary-500/10 border border-primary-500/20 flex items-center justify-center group-hover:bg-primary-500/20 transition-colors duration-300"
                  whileHover={{ scale: 1.05 }}
                >
                  <Icon className="w-7 h-7 text-primary-500" />
                </motion.div>

                <h3 className="text-xl font-semibold text-white mb-3 leading-tight">
                  {step.title}
                </h3>

                <p className="text-base text-zinc-400 leading-relaxed">
                  {step.description}
                </p>
              </div>

              <div className="absolute inset-0 rounded-2xl bg-gradient-to-b from-primary-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
            </motion.div>
          );
        })}
      </div>
    </Section>
  );
}
