"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Section from "@/components/ui/section";
import { ScanningButton } from "@/components/ui/ScanningButton";
import type { LandingPageCta } from "@/data/landing-pages/types";
import type { AccentTokens, ButtonColor } from "./accent-utils";

interface LandingCTAProps {
  cta: LandingPageCta;
  accentTokens: AccentTokens;
  buttonColor: ButtonColor;
}

export default function LandingCTA({
  cta,
  accentTokens,
  buttonColor,
}: LandingCTAProps) {
  return (
    <div className="relative overflow-x-clip">
      <div
        className="absolute inset-0"
        style={{
          background: `
            radial-gradient(ellipse 80% 50% at 50% 100%, ${accentTokens.bg}, transparent 60%),
            radial-gradient(ellipse 40% 30% at 20% 80%, ${accentTokens.bgSubtle}, transparent 50%),
            linear-gradient(180deg, oklch(0.05 0 0), oklch(0.07 0 0))
          `,
        }}
      />

      <div
        className="absolute inset-0 bg-dot-thick-zinc-700/20 pointer-events-none"
        style={{
          maskImage: "radial-gradient(ellipse at 50% 100%, black 10%, transparent 60%)",
        }}
      />

      <Section size="md" padding="lg" className="relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-[3fr_2fr] gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ type: "spring", stiffness: 80, damping: 20 }}
            viewport={{ once: true }}
            className="text-center lg:text-left"
          >
            <h2 className="text-3xl md:text-5xl font-bold tracking-tighter text-white mb-6 leading-[1.05]">
              {cta.headline}
            </h2>
            <p className="text-lg text-zinc-400 max-w-xl mb-10 leading-relaxed lg:mx-0 mx-auto">
              {cta.subtext}
            </p>
            <Link href="/apply">
              <ScanningButton variant="primary" size="lg" color={buttonColor}>
                Apply Now
              </ScanningButton>
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ type: "spring", stiffness: 60, damping: 20, delay: 0.2 }}
            viewport={{ once: true }}
            className="hidden lg:flex items-center justify-center relative h-[200px]"
          >
            <div
              className="absolute w-32 h-32 rounded-full"
              style={{
                background: `radial-gradient(circle, ${accentTokens.border}, transparent 70%)`,
              }}
            />
            <div
              className="absolute w-48 h-48 rounded-3xl rotate-12 border"
              style={{
                borderColor: accentTokens.border,
                background: `linear-gradient(135deg, ${accentTokens.bgSubtle}, transparent)`,
              }}
            />
            <div
              className="absolute w-24 h-24 rounded-2xl -rotate-12 border"
              style={{
                borderColor: accentTokens.border,
                background: accentTokens.bgSubtle,
              }}
            />
          </motion.div>
        </div>
      </Section>
    </div>
  );
}
