"use client";

import { motion } from "framer-motion";
import Section from "@/components/ui/section";
import type { LandingPagePainPoint } from "@/data/landing-pages/types";
import type { AccentTokens } from "./accent-utils";
import { resolveIcon } from "./icon-map";

interface PainPointBentoProps {
  headline: string;
  painPoints: LandingPagePainPoint[];
  accentTokens: AccentTokens;
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
};

const tileVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: "spring", stiffness: 100, damping: 20 },
  },
};

export default function PainPointBento({
  headline,
  painPoints,
  accentTokens,
}: PainPointBentoProps) {
  return (
    <Section size="xl" padding="md">
      <motion.h2
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        viewport={{ once: true }}
        className="text-3xl md:text-4xl font-bold tracking-tighter text-white mb-12"
      >
        {headline}
      </motion.h2>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-80px" }}
        className="grid grid-cols-1 md:grid-cols-[2fr_1fr] gap-5"
      >
        {painPoints.map((point, index) => {
          const Icon = resolveIcon(point.icon);
          const isFeaturedTile = index === 0;
          const isTallTile = index === 1;

          return (
            <motion.div
              key={point.title}
              variants={tileVariants}
              className={`
                glass-secondary rounded-2xl p-8 border border-zinc-800/50 relative group
                transition-all duration-300 hover:border-zinc-700/80
                ${isTallTile ? "md:row-span-2" : ""}
              `}
              style={isFeaturedTile ? {
                background: `radial-gradient(ellipse 80% 60% at 20% 80%, ${accentTokens.bgSubtle}, transparent 70%)`,
              } : undefined}
            >
              <div
                className="absolute top-0 left-0 right-0 h-[3px] rounded-t-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                style={{
                  background: `linear-gradient(90deg, ${accentTokens.solid}, transparent)`,
                }}
              />

              {isFeaturedTile && (
                <div
                  className="absolute inset-0 bg-dot-thick-zinc-700/20 rounded-2xl pointer-events-none"
                  style={{
                    maskImage: "radial-gradient(ellipse at 30% 70%, black 10%, transparent 60%)",
                  }}
                />
              )}

              <div className="relative flex flex-col gap-5">
                {Icon && (
                  <div
                    className="w-14 h-14 rounded-2xl flex items-center justify-center border"
                    style={{
                      backgroundColor: accentTokens.bg,
                      borderColor: accentTokens.border,
                    }}
                  >
                    <Icon
                      className="w-7 h-7"
                      style={{ color: accentTokens.solid }}
                    />
                  </div>
                )}
                <h3 className="text-xl font-semibold text-white">
                  {point.title}
                </h3>
                <p className="text-zinc-400 leading-relaxed max-w-[65ch]">
                  {point.description}
                </p>
              </div>
            </motion.div>
          );
        })}
      </motion.div>
    </Section>
  );
}
