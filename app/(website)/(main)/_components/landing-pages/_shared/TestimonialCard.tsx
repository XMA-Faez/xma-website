"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import type { AccentTokens } from "./accent-utils";

interface TestimonialCardProps {
  company: string;
  challenge: string;
  solution: string;
  result: string;
  logo?: string;
  accentTokens: AccentTokens;
}

export default function TestimonialCard({
  company,
  challenge,
  solution,
  result,
  logo,
  accentTokens,
}: TestimonialCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ type: "spring", stiffness: 80, damping: 20 }}
      viewport={{ once: true }}
      className="glass-secondary rounded-2xl p-8 md:p-12 relative border"
      style={{ borderColor: accentTokens.border }}
    >
      <div
        className="absolute inset-0 rounded-2xl bg-dot-thick-zinc-700/20 pointer-events-none"
        style={{
          maskImage: "radial-gradient(ellipse at 80% 20%, black 5%, transparent 50%)",
        }}
      />

      <span
        className="absolute top-6 right-8 md:right-12 text-8xl md:text-9xl font-serif leading-none select-none pointer-events-none"
        style={{ color: accentTokens.bgSubtle }}
        aria-hidden="true"
      >
        &rdquo;
      </span>

      <div className="relative z-10">
        <div className="flex items-center gap-5 mb-8">
          {logo ? (
            <Image
              src={logo}
              alt={`${company} logo`}
              width={120}
              height={40}
              className="h-8 w-auto object-contain brightness-0 invert opacity-80"
            />
          ) : (
            <span
              className="text-2xl font-bold tracking-tight"
              style={{ color: accentTokens.solid }}
            >
              {company}
            </span>
          )}
          {logo && (
            <span className="text-xs uppercase tracking-widest font-medium text-zinc-500">
              {company}
            </span>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
          <div>
            <span
              className="block text-sm uppercase tracking-wider mb-3 font-semibold"
              style={{ color: "oklch(0.65 0.2 25)" }}
            >
              Challenge
            </span>
            <p className="text-zinc-300 leading-relaxed">{challenge}</p>
          </div>
          <div className="relative">
            <div
              className="hidden md:block absolute -left-6 top-0 bottom-0 w-px"
              style={{ backgroundColor: accentTokens.border }}
            />
            <span
              className="block text-sm uppercase tracking-wider mb-3 font-semibold"
              style={{ color: accentTokens.solid }}
            >
              Solution
            </span>
            <p className="text-zinc-300 leading-relaxed">{solution}</p>
          </div>
          <div className="relative">
            <div
              className="hidden md:block absolute -left-6 top-0 bottom-0 w-px"
              style={{ backgroundColor: accentTokens.border }}
            />
            <span
              className="block text-sm uppercase tracking-wider mb-3 font-semibold"
              style={{ color: "oklch(0.78 0.2 145)" }}
            >
              Result
            </span>
            <p className="text-white font-medium leading-relaxed">{result}</p>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
