"use client";

import { useEffect, useRef } from "react";
import {
  motion,
  useMotionValue,
  useTransform,
  useInView,
  animate,
} from "framer-motion";
import Section from "@/components/ui/section";
import type { LandingPageStat } from "@/data/landing-pages/types";
import type { AccentTokens } from "./accent-utils";
import { resolveIcon } from "./icon-map";

interface StatsStripProps {
  stats: LandingPageStat[];
  accentTokens: AccentTokens;
}

function parseStatValue(value: string): { numericPart: number; prefix: string; suffix: string } {
  const match = value.match(/^([^0-9]*)(\d+(?:\.\d+)?)(.*)$/);
  if (!match) return { numericPart: 0, prefix: "", suffix: value };
  return {
    prefix: match[1],
    numericPart: parseFloat(match[2]),
    suffix: match[3],
  };
}

function ProgressRing({
  progress,
  accentColor,
  isInView,
}: {
  progress: number;
  accentColor: string;
  isInView: boolean;
}) {
  const radius = 36;
  const circumference = 2 * Math.PI * radius;
  const motionOffset = useMotionValue(circumference);
  const strokeDashoffset = useTransform(motionOffset, (v) => v);

  useEffect(() => {
    if (!isInView) return;
    const targetOffset = circumference - (progress / 100) * circumference;
    const controls = animate(motionOffset, targetOffset, {
      type: "spring",
      stiffness: 40,
      damping: 15,
      duration: 2,
    });
    return controls.stop;
  }, [isInView, motionOffset, circumference, progress]);

  return (
    <svg width="88" height="88" viewBox="0 0 88 88" className="shrink-0">
      <circle
        cx="44"
        cy="44"
        r={radius}
        fill="none"
        stroke="oklch(0.2 0 0)"
        strokeWidth="3"
      />
      <motion.circle
        cx="44"
        cy="44"
        r={radius}
        fill="none"
        stroke={accentColor}
        strokeWidth="3"
        strokeLinecap="round"
        strokeDasharray={circumference}
        style={{ strokeDashoffset }}
        transform="rotate(-90 44 44)"
      />
    </svg>
  );
}

function AnimatedStatNumber({
  value,
  accentTokens,
}: {
  value: string;
  accentTokens: AccentTokens;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  const { numericPart, prefix, suffix } = parseStatValue(value);
  const motionVal = useMotionValue(0);
  const displayValue = useTransform(motionVal, (latest) => {
    const isDecimal = numericPart % 1 !== 0;
    return isDecimal ? latest.toFixed(1) : Math.round(latest).toString();
  });

  useEffect(() => {
    if (!isInView) return;
    const controls = animate(motionVal, numericPart, {
      type: "spring",
      stiffness: 50,
      damping: 20,
      duration: 2,
    });
    return controls.stop;
  }, [isInView, motionVal, numericPart]);

  return (
    <span ref={ref} className="text-3xl md:text-4xl font-bold tracking-tighter text-white">
      {prefix}
      <motion.span style={{ color: accentTokens.solid }}>
        {displayValue}
      </motion.span>
      {suffix}
    </span>
  );
}

function StatItem({
  stat,
  accentTokens,
  showDivider,
}: {
  stat: LandingPageStat;
  accentTokens: AccentTokens;
  showDivider: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  const Icon = stat.icon ? resolveIcon(stat.icon) : null;
  const hasRing = stat.progress !== undefined && stat.progress > 0;

  return (
    <div ref={ref} className="flex flex-col items-center text-center relative">
      {showDivider && (
        <div
          className="hidden md:block absolute left-0 top-1/2 -translate-y-1/2 w-px h-12"
          style={{ backgroundColor: "oklch(0.3 0 0 / 0.5)" }}
        />
      )}

      {hasRing ? (
        <div className="relative mb-3">
          <ProgressRing
            progress={stat.progress!}
            accentColor={accentTokens.solid}
            isInView={isInView}
          />
          {Icon && (
            <div className="absolute inset-0 flex items-center justify-center">
              <Icon className="w-6 h-6" style={{ color: accentTokens.solid }} />
            </div>
          )}
        </div>
      ) : Icon ? (
        <div
          className="w-12 h-12 rounded-xl flex items-center justify-center mb-3 border"
          style={{
            backgroundColor: accentTokens.bg,
            borderColor: accentTokens.border,
          }}
        >
          <Icon className="w-5 h-5" style={{ color: accentTokens.solid }} />
        </div>
      ) : null}

      <AnimatedStatNumber value={stat.value} accentTokens={accentTokens} />
      <span className="text-xs text-zinc-500 uppercase tracking-widest mt-2">
        {stat.label}
      </span>
    </div>
  );
}

export default function StatsStrip({ stats, accentTokens }: StatsStripProps) {
  return (
    <div className="relative border-y" style={{ borderColor: "oklch(0.3 0 0 / 0.5)" }}>
      <Section size="xl" padding="sm">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-0">
          {stats.map((stat, index) => (
            <StatItem
              key={stat.label}
              stat={stat}
              accentTokens={accentTokens}
              showDivider={index > 0}
            />
          ))}
        </div>
      </Section>
    </div>
  );
}
