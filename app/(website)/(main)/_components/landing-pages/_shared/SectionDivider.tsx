"use client";

import { motion } from "framer-motion";
import type { AccentTokens } from "./accent-utils";

interface SectionDividerProps {
  label?: string;
  accentTokens: AccentTokens;
}

export default function SectionDivider({ label, accentTokens }: SectionDividerProps) {
  return (
    <div className="relative py-12 md:py-16">
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `radial-gradient(ellipse 50% 100% at 50% 50%, ${accentTokens.bgSubtle}, transparent 70%)`,
        }}
      />
      <motion.div
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        viewport={{ once: true }}
        className="relative max-w-5xl mx-auto px-4"
      >
        <div
          className="h-px w-full"
          style={{
            background: `linear-gradient(90deg, transparent, ${accentTokens.border}, transparent)`,
          }}
        />
        {label && (
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 px-4 bg-zinc-950">
            <span
              className="text-xs uppercase tracking-widest font-semibold"
              style={{ color: accentTokens.solid }}
            >
              {label}
            </span>
          </div>
        )}
      </motion.div>
    </div>
  );
}
