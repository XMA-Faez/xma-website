"use client";

import { motion } from "framer-motion";
import Section from "@/components/ui/section";
import type { AccentTokens } from "./accent-utils";
import { resolveIcon } from "./icon-map";

interface ProcessStep {
  label: string;
  description: string;
  icon?: string;
}

interface ProcessTimelineProps {
  title: string;
  steps: ProcessStep[];
  accentTokens: AccentTokens;
}

const stepVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: "spring", stiffness: 100, damping: 20 },
  },
};

function StepCircle({
  index,
  icon,
  accentTokens,
}: {
  index: number;
  icon?: string;
  accentTokens: AccentTokens;
}) {
  const Icon = resolveIcon(icon);

  return (
    <div
      className="w-14 h-14 rounded-full flex items-center justify-center text-sm font-bold border z-10 shrink-0 backdrop-blur-md"
      style={{
        backgroundColor: accentTokens.bg,
        borderColor: accentTokens.border,
        color: accentTokens.solid,
      }}
    >
      {Icon ? (
        <Icon className="w-6 h-6" style={{ color: accentTokens.solid }} />
      ) : (
        String(index + 1).padStart(2, "0")
      )}
    </div>
  );
}

export default function ProcessTimeline({
  title,
  steps,
  accentTokens,
}: ProcessTimelineProps) {
  return (
    <Section size="xl" padding="md">
      <motion.h2
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        viewport={{ once: true }}
        className="text-3xl md:text-4xl font-bold tracking-tighter text-white text-center mb-16"
      >
        {title}
      </motion.h2>

      <div className="relative max-w-4xl mx-auto">
        <div
          className="hidden md:block absolute left-1/2 top-0 bottom-0 w-px -translate-x-1/2"
          style={{ backgroundColor: "oklch(0.3 0 0 / 0.5)" }}
        />
        <div
          className="md:hidden absolute left-7 top-0 bottom-0 w-px"
          style={{ backgroundColor: "oklch(0.3 0 0 / 0.5)" }}
        />

        <div className="flex flex-col gap-12">
          {steps.map((step, index) => {
            const isLeft = index % 2 === 0;

            return (
              <motion.div
                key={step.label}
                variants={stepVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-60px" }}
                className="relative"
              >
                <div className="hidden md:grid md:grid-cols-[1fr_auto_1fr] md:items-center md:gap-10">
                  <div className={isLeft ? "" : "order-3"}>
                    <div
                      className={`glass-tertiary rounded-xl p-5 ${isLeft ? "text-right" : ""}`}
                    >
                      <h3 className="text-lg font-semibold text-white mb-2">
                        {step.label}
                      </h3>
                      <p className="text-sm text-zinc-400 leading-relaxed">
                        {step.description}
                      </p>
                    </div>
                  </div>
                  <div className="order-2">
                    <StepCircle
                      index={index}
                      icon={step.icon}
                      accentTokens={accentTokens}
                    />
                  </div>
                  <div className={isLeft ? "order-3" : ""} />
                </div>

                <div className="md:hidden flex items-start gap-5">
                  <StepCircle
                    index={index}
                    icon={step.icon}
                    accentTokens={accentTokens}
                  />
                  <div className="flex-1 glass-tertiary rounded-xl p-5">
                    <h3 className="text-lg font-semibold text-white mb-1">
                      {step.label}
                    </h3>
                    <p className="text-sm text-zinc-400 leading-relaxed">
                      {step.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </Section>
  );
}
