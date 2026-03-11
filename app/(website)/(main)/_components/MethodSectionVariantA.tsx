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
  iconColor: string;
  iconBgColor: string;
};

const steps: Step[] = [
  {
    icon: Search,
    number: "01",
    title: "Diagnose",
    description:
      "Audit the current marketing, sales, and funnel performance.",
    iconColor: "oklch(0.75 0.18 220)",
    iconBgColor: "oklch(0.75 0.18 220 / 0.12)",
  },
  {
    icon: PenTool,
    number: "02",
    title: "Architect",
    description: "Design the growth system required to scale.",
    iconColor: "oklch(0.72 0.2 300)",
    iconBgColor: "oklch(0.72 0.2 300 / 0.12)",
  },
  {
    icon: Rocket,
    number: "03",
    title: "Implement",
    description:
      "Deploy campaigns, funnels, CRM systems, and infrastructure.",
    iconColor: "oklch(0.78 0.2 145)",
    iconBgColor: "oklch(0.78 0.2 145 / 0.12)",
  },
  {
    icon: BarChart3,
    number: "04",
    title: "Optimize",
    description: "Continuously refine performance and scale revenue.",
    iconColor: "oklch(0.78 0.16 65)",
    iconBgColor: "oklch(0.78 0.16 65 / 0.12)",
  },
];

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: (index: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      delay: index * 0.1,
      ease: "easeOut",
    },
  }),
};

const COLUMNS = 4;

const CornerDot = ({ position }: { position: string }) => (
  <div
    className={`absolute w-1.5 h-1.5 rounded-full bg-primary-500/60 ${position}`}
  />
);

export default function MethodSectionVariantA() {
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

      <div className="relative">
        <CornerDot position="-top-1 -left-1" />
        <CornerDot position="-top-1 -right-1" />
        <CornerDot position="-bottom-1 -left-1" />
        <CornerDot position="-bottom-1 -right-1" />

        <div className="bg-zinc-900/50 border border-white/10 rounded-2xl">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
            {steps.map((step, index) => {
              const Icon = step.icon;
              const isLastColumn = (index + 1) % COLUMNS === 0;

              return (
                <motion.div
                  key={step.title}
                  custom={index}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, margin: "-50px" }}
                  variants={cardVariants}
                  className={`relative p-6 md:p-8 group hover:bg-white/5 transition-colors duration-300 ${
                    !isLastColumn
                      ? "lg:border-r lg:border-white/5"
                      : ""
                  } ${
                    index < 2
                      ? "sm:border-b sm:border-white/5 lg:border-b-0"
                      : ""
                  }`}
                >
                  <span className="text-5xl font-bold text-white/[0.03] absolute top-4 right-6 select-none">
                    {step.number}
                  </span>

                  <div
                    className="w-12 h-12 rounded-xl flex items-center justify-center mb-5 transition-all duration-300 group-hover:scale-110"
                    style={{ backgroundColor: step.iconBgColor }}
                  >
                    <Icon
                      className="w-6 h-6"
                      style={{ color: step.iconColor }}
                    />
                  </div>

                  <h3 className="text-lg font-semibold text-white mb-2">
                    {step.title}
                  </h3>

                  <p className="text-sm text-neutral-400 leading-relaxed">
                    {step.description}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </Section>
  );
}
