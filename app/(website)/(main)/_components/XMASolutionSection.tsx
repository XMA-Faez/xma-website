"use client";

import { motion, useReducedMotion } from "motion/react";
import Link from "next/link";
import Section from "@/components/ui/section";
import {
  Megaphone,
  Target,
  Database,
  Settings,
  DollarSign,
  ChevronRight,
  type LucideIcon,
} from "lucide-react";

interface SystemStep {
  icon: LucideIcon;
  label: string;
  description: string;
  detail: string;
  href: string;
  accentColor: string;
  accentBgColor: string;
  accentBorderColor: string;
}

const systemSteps: SystemStep[] = [
  {
    icon: Megaphone,
    label: "Acquisition",
    description: "Drive targeted traffic",
    detail:
      "Google & Meta campaigns engineered to attract high-intent buyers, not just clicks.",
    href: "/solutions/b2b-lead-generation",
    accentColor: "oklch(0.75 0.18 220)",
    accentBgColor: "oklch(0.75 0.18 220 / 0.12)",
    accentBorderColor: "oklch(0.75 0.18 220 / 0.25)",
  },
  {
    icon: Target,
    label: "Conversion",
    description: "Capture and qualify leads",
    detail:
      "Landing pages, forms, and funnels designed to turn visitors into qualified pipeline.",
    href: "/solutions/conversion-acceleration",
    accentColor: "oklch(0.72 0.2 300)",
    accentBgColor: "oklch(0.72 0.2 300 / 0.12)",
    accentBorderColor: "oklch(0.72 0.2 300 / 0.25)",
  },
  {
    icon: Database,
    label: "CRM",
    description: "Automate follow-ups",
    detail:
      "Every lead tracked, scored, and nurtured automatically so nothing falls through the cracks.",
    href: "/solutions/crm-system",
    accentColor: "oklch(0.70 0.22 250)",
    accentBgColor: "oklch(0.70 0.22 250 / 0.12)",
    accentBorderColor: "oklch(0.70 0.22 250 / 0.25)",
  },
  {
    icon: Settings,
    label: "Optimization",
    description: "Refine performance",
    detail:
      "Continuous A/B testing, funnel analysis, and budget reallocation to maximize ROI.",
    href: "/solutions/ecommerce-revenue-engine",
    accentColor: "oklch(0.78 0.16 65)",
    accentBgColor: "oklch(0.78 0.16 65 / 0.12)",
    accentBorderColor: "oklch(0.78 0.16 65 / 0.25)",
  },
  {
    icon: DollarSign,
    label: "Revenue",
    description: "Scale predictably",
    detail:
      "A compounding engine where every dollar invested drives measurable, repeatable growth.",
    href: "/solutions/growth-launch-system",
    accentColor: "oklch(0.78 0.2 145)",
    accentBgColor: "oklch(0.78 0.2 145 / 0.12)",
    accentBorderColor: "oklch(0.78 0.2 145 / 0.25)",
  },
];

function StepCard({
  step,
  index,
  reducedMotion,
}: {
  step: SystemStep;
  index: number;
  reducedMotion: boolean;
}) {
  const Icon = step.icon;

  return (
    <Link href={step.href}>
    <motion.div
      initial={reducedMotion ? false : { opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.2 + index * 0.1 }}
      viewport={{ once: true }}
      className="group flex flex-row md:flex-col items-start md:items-center gap-4 md:gap-0 md:text-center flex-1 px-3 py-4 md:px-4 md:py-6 rounded-xl hover:bg-white/[0.03] transition-colors duration-300 cursor-pointer"
    >
      <div
        className="w-12 h-12 shrink-0 rounded-xl flex items-center justify-center md:mb-4 border transition-transform duration-300 group-hover:scale-110"
        style={{
          backgroundColor: step.accentBgColor,
          borderColor: step.accentBorderColor,
        }}
      >
        <Icon className="w-5 h-5" style={{ color: step.accentColor }} />
      </div>

      <div className="flex flex-col md:items-center">
        <span className="text-base font-semibold text-white mb-1">
          {step.label}
        </span>
        <span className="text-sm text-zinc-400 mb-2 font-medium">
          {step.description}
        </span>
        <span className="text-xs text-zinc-500 leading-relaxed max-w-48">
          {step.detail}
        </span>
      </div>
    </motion.div>
    </Link>
  );
}

function StepConnector({
  index,
  reducedMotion,
}: {
  index: number;
  reducedMotion: boolean;
}) {
  return (
    <motion.div
      initial={reducedMotion ? false : { opacity: 0, scale: 0.5 }}
      whileInView={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3, delay: 0.3 + index * 0.1 }}
      viewport={{ once: true }}
      className="hidden md:flex items-center shrink-0"
    >
      <ChevronRight className="w-4 h-4 text-zinc-700" />
    </motion.div>
  );
}

export default function XMASolutionSection() {
  const reducedMotion = useReducedMotion() ?? false;

  return (
    <Section size="xl" padding="md">
      <motion.div
        initial={reducedMotion ? false : { opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="text-center mb-12"
      >
        <h2
          className="heading-section text-white mb-4"
          style={{ textWrap: "balance" }}
        >
          We Build Growth Systems
        </h2>
        <p className="text-lg text-zinc-400 max-w-2xl mx-auto">
          Instead of selling isolated services, XMA designs integrated systems
          that connect marketing, sales, and conversion infrastructure into one
          revenue engine.
        </p>
      </motion.div>

      <motion.div
        initial={reducedMotion ? false : { opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        viewport={{ once: true }}
        className="glass-primary rounded-2xl md:rounded-3xl relative"
      >
        <div
          className="absolute inset-0 bg-dot-thick-zinc-700/20 rounded-2xl md:rounded-3xl pointer-events-none"
          style={{
            maskImage:
              "radial-gradient(ellipse at center, black 30%, transparent 75%)",
          }}
        />

        <div className="relative px-4 py-6 md:px-6 md:py-10 lg:px-8 lg:py-12">
          <div className="flex flex-col md:flex-row items-stretch justify-center">
            {systemSteps.map((step, index) => (
              <div key={step.label} className="flex items-center">
                <StepCard
                  step={step}
                  index={index}
                  reducedMotion={reducedMotion}
                />
                {index < systemSteps.length - 1 && (
                  <StepConnector
                    index={index}
                    reducedMotion={reducedMotion}
                  />
                )}
              </div>
            ))}
          </div>
        </div>
      </motion.div>
    </Section>
  );
}
