"use client";

import { motion } from "framer-motion";
import Section from "@/components/ui/section";
import BenefitCard from "./BenefitCard";
import { benefits } from "./benefitsData";

const CornerDot = ({ position }: { position: string }) => (
  <div
    className={`absolute w-1.5 h-1.5 rounded-full bg-primary-500/60 ${position}`}
  />
);

const BenefitsSection = () => {
  const columns = 3;

  return (
    <Section id="benefits" size="xl" padding="md">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="text-center mb-12 md:mb-16"
      >
        <span className="text-sm uppercase tracking-wider text-blue-500 font-semibold mb-4 block">
          Benefits
        </span>
        <h2 className="heading-section text-white">
          Websites that{" "}
          <span className="text-primary-400">convert visitors</span>
          <br />
          into <span className="text-primary-400">paying customers</span>.
        </h2>
      </motion.div>

      <div className="relative">
        <CornerDot position="-top-1 -left-1" />
        <CornerDot position="-top-1 -right-1" />
        <CornerDot position="-bottom-1 -left-1" />
        <CornerDot position="-bottom-1 -right-1" />

        <div className="bg-zinc-900/50 border border-white/10 rounded-2xl overflow-hidden">
          <div className="grid grid-cols-1 md:grid-cols-3">
            {benefits.map((benefit, index) => {
              const isLastColumn = (index + 1) % columns === 0;
              const isLastRow = index >= benefits.length - columns;

              return (
                <BenefitCard
                  key={benefit.title}
                  benefit={benefit}
                  index={index}
                  isLastColumn={isLastColumn}
                  isLastRow={isLastRow}
                />
              );
            })}
          </div>
        </div>
      </div>
    </Section>
  );
};

export default BenefitsSection;
