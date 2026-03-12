"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import Section from "@/components/ui/section";
import { ScanningButton } from "@/components/ui/ScanningButton";
import {
  ArrowRight,
  Check,
  X,
  Palette,
  Globe,
  Wrench,
  Compass,
  Monitor,
  Settings,
  Rocket,
  Search,
  Lightbulb,
  Hammer,
  FlaskConical,
  TrendingUp,
  BarChart3,
  UserMinus,
  Megaphone,
  Paintbrush,
  MousePointerClick,
  Mail,
  ClipboardCheck,
  Map,
  Play,
  SlidersHorizontal,
  ArrowUpRight,
  Activity,
  UserX,
  Clock,
  Target,
  Layers,
  BarChart2,
  Database,
  Filter,
  DollarSign,
  SearchCheck,
  LayoutTemplate,
  Split,
  GitBranch,
  ListOrdered,
  CheckCircle2,
  RefreshCw,
  type LucideIcon,
} from "lucide-react";
import type { SolutionPageData } from "../_types/solution";
import SocialProofStrip from "@/app/(website)/(main)/_components/SocialProofStrip";
import CaseStudiesPreview from "@/app/(website)/(main)/_components/CaseStudiesPreview";

const ICON_MAP: Record<string, LucideIcon> = {
  Palette,
  Globe,
  Wrench,
  Compass,
  Monitor,
  Settings,
  Rocket,
  Search,
  Lightbulb,
  Hammer,
  FlaskConical,
  TrendingUp,
  BarChart3,
  UserMinus,
  Megaphone,
  Paintbrush,
  MousePointerClick,
  Mail,
  ClipboardCheck,
  Map,
  Play,
  SlidersHorizontal,
  ArrowUpRight,
  Activity,
  UserX,
  Clock,
  Target,
  Layers,
  BarChart2,
  Database,
  Filter,
  DollarSign,
  SearchCheck,
  LayoutTemplate,
  Split,
  GitBranch,
  ListOrdered,
  CheckCircle2,
  RefreshCw,
};

function resolveIcon(name?: string): LucideIcon | undefined {
  if (!name) return undefined;
  return ICON_MAP[name];
}

interface AccentTokens {
  solid: string;
  bg: string;
  border: string;
  bgSubtle: string;
}

function deriveAccentTokens(accentColor?: string): AccentTokens {
  const fallback = "oklch(0.6 0.15 250";
  const base = accentColor
    ? accentColor.replace(/\)$/, "")
    : fallback;
  return {
    solid: `${base})`,
    bg: `${base} / 0.12)`,
    border: `${base} / 0.25)`,
    bgSubtle: `${base} / 0.06)`,
  };
}

function mapAccentToButtonColor(
  accentColor?: string,
): "blue" | "cyan" | "emerald" | "purple" | "pink" | "amber" {
  if (!accentColor) return "blue";
  const hueMatch = accentColor.match(
    /oklch\(\s*[\d.]+\s+[\d.]+\s+([\d.]+)/,
  );
  if (!hueMatch) return "blue";
  const hue = parseFloat(hueMatch[1]);
  if (hue >= 270 && hue <= 330) return "purple";
  if (hue >= 40 && hue <= 90) return "amber";
  if (hue >= 170 && hue <= 210) return "cyan";
  if (hue >= 120 && hue < 170) return "emerald";
  if (hue > 210 && hue < 270) return "blue";
  if (hue > 330 || hue < 20) return "pink";
  return "blue";
}

interface SolutionPageTemplateProps {
  data: SolutionPageData;
}

export default function SolutionPageTemplate({
  data,
}: SolutionPageTemplateProps) {
  const accent = deriveAccentTokens(data.accentColor);
  const buttonColor = mapAccentToButtonColor(data.accentColor);

  return (
    <div className="relative w-full">
      <SolutionHero hero={data.hero} accent={accent} buttonColor={buttonColor} />
      <SocialProofStrip />
      <SolutionProblem problem={data.problem} />
      <SolutionQualification qualification={data.qualification} />
      <SolutionSystem system={data.system} accent={accent} />
      <SolutionIncluded included={data.included} accent={accent} />
      <SolutionProcess process={data.process} accent={accent} />
      <SolutionOutcomes outcomes={data.outcomes} />
      <SolutionCTA cta={data.cta} accent={accent} buttonColor={buttonColor} />
    </div>
  );
}

function SolutionHero({
  hero,
  accent,
  buttonColor,
}: {
  hero: SolutionPageData["hero"];
  accent: AccentTokens;
  buttonColor: "blue" | "cyan" | "emerald" | "purple" | "pink" | "amber";
}) {
  return (
    <div className="relative min-h-[70vh] flex items-center overflow-x-clip">
      <div
        className="absolute inset-0"
        style={{
          background: `
            radial-gradient(ellipse 70% 50% at 50% 0%, ${accent.bg}, transparent 60%),
            linear-gradient(180deg, oklch(0.07 0 0), oklch(0.05 0 0))
          `,
        }}
      />
      <div
        className="absolute inset-0 bg-dot-thick-zinc-700/20 pointer-events-none"
        style={{
          maskImage:
            "radial-gradient(ellipse 60% 80% at 80% 50%, black 10%, transparent 70%)",
        }}
      />
      <Section size="xl" padding="lg" className="relative z-10">
        <div className="max-w-4xl flex flex-col items-center mx-auto text-center">
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-block px-4 py-1.5 rounded-full text-sm font-medium mb-6"
            style={{
              border: `1px solid ${accent.border}`,
              color: accent.solid,
              backgroundColor: accent.bg,
            }}
          >
            {hero.badge}
          </motion.span>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl md:text-6xl font-bold tracking-tight text-white mb-6 leading-[1.1]"
          >
            {hero.title}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-lg md:text-xl text-zinc-400 mb-8"
          >
            {hero.subtitle}
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <Link href="/apply">
              <ScanningButton variant="primary" size="lg" color={buttonColor}>
                Apply Now
              </ScanningButton>
            </Link>
          </motion.div>
        </div>

        {(hero.image || hero.mobileImage) && (
          <motion.div
            className="mt-12 relative"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
          >
            <div
              className="relative rounded-2xl overflow-hidden border"
              style={{
                borderColor: `${accent.border}`,
                boxShadow: `0 25px 50px -12px ${accent.bg}`,
              }}
            >
              {hero.mobileImage && (
                <Image
                  src={hero.mobileImage}
                  alt={`${hero.title} visualization`}
                  width={750}
                  height={1334}
                  className="w-full h-auto md:hidden"
                  priority
                  quality={90}
                />
              )}
              {hero.image && (
                <Image
                  src={hero.image}
                  alt={`${hero.title} visualization`}
                  width={1920}
                  height={1080}
                  className={`w-full h-auto ${hero.mobileImage ? "hidden md:block" : ""}`}
                  priority
                  quality={90}
                />
              )}
            </div>
          </motion.div>
        )}
      </Section>
    </div>
  );
}

function SolutionProblem({
  problem,
}: {
  problem: SolutionPageData["problem"];
}) {
  const redAccent = "oklch(0.65 0.2 25)";

  return (
    <Section size="xl" padding="md">
      <h2 className="heading-section text-white mb-12">
        {problem.headline}
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {problem.painPoints.map((point, index) => {
          const Icon = resolveIcon(point.icon);
          return (
            <div
              key={point.title}
              className="glass-primary rounded-2xl p-8"
              style={{ borderLeft: `4px solid ${redAccent}` }}
            >
              <div className="flex items-start gap-4">
                {Icon ? (
                  <div
                    className="w-10 h-10 rounded-lg flex items-center justify-center shrink-0"
                    style={{
                      backgroundColor: "oklch(0.65 0.2 25 / 0.12)",
                      border: "1px solid oklch(0.65 0.2 25 / 0.25)",
                    }}
                  >
                    <Icon className="w-5 h-5" style={{ color: redAccent }} />
                  </div>
                ) : (
                  <span className="text-5xl font-bold text-white/[0.06] leading-none shrink-0">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                )}
                <div>
                  <h3 className="text-xl font-semibold text-white mb-3">
                    {point.title}
                  </h3>
                  <p className="text-zinc-400">{point.description}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </Section>
  );
}

function SolutionSystem({
  system,
  accent,
}: {
  system: SolutionPageData["system"];
  accent: AccentTokens;
}) {
  return (
    <Section size="xl" padding="md">
      <div className="text-center mb-10">
        <h2 className="heading-section text-white mb-4">{system.title}</h2>
        <p className="text-lg text-zinc-400 max-w-2xl mx-auto">
          {system.description}
        </p>
      </div>

      <div className="glass-primary rounded-2xl md:rounded-3xl relative">
        <div
          className="absolute inset-0 bg-dot-thick-zinc-700/20 rounded-2xl md:rounded-3xl pointer-events-none"
          style={{
            maskImage:
              "radial-gradient(ellipse at center, black 30%, transparent 75%)",
          }}
        />

        <div className="relative px-4 py-8 md:px-8 md:py-12">
          {/* Desktop: horizontal pipeline */}
          <div className="hidden md:flex items-start justify-center gap-0">
            {system.steps.map((step, index) => (
              <div key={step.label} className="flex items-start">
                <div className="flex flex-col items-center text-center flex-1 px-4">
                  <div
                    className="w-12 h-12 rounded-full flex items-center justify-center text-sm font-bold text-white mb-4 border"
                    style={{
                      backgroundColor: accent.bg,
                      borderColor: accent.border,
                      color: accent.solid,
                    }}
                  >
                    {String(index + 1).padStart(2, "0")}
                  </div>
                  <span className="text-base font-semibold text-white mb-1">
                    {step.label}
                  </span>
                  <span className="text-sm text-zinc-500 max-w-36">
                    {step.description}
                  </span>
                </div>
                {index < system.steps.length - 1 && (
                  <div className="flex items-center pt-6 shrink-0">
                    <div
                      className="w-12 h-px"
                      style={{ backgroundColor: accent.border }}
                    />
                    <ArrowRight
                      className="w-4 h-4 shrink-0"
                      style={{ color: accent.solid }}
                    />
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Mobile: vertical pipeline */}
          <div className="flex md:hidden">
            <div className="flex flex-col items-center mr-4">
              {system.steps.map((_, index) => (
                <div key={index} className="flex flex-col items-center">
                  <div
                    className="w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold text-white border shrink-0"
                    style={{
                      backgroundColor: accent.bg,
                      borderColor: accent.border,
                      color: accent.solid,
                    }}
                  >
                    {String(index + 1).padStart(2, "0")}
                  </div>
                  {index < system.steps.length - 1 && (
                    <div
                      className="w-px h-12"
                      style={{ backgroundColor: accent.border }}
                    />
                  )}
                </div>
              ))}
            </div>
            <div className="flex flex-col gap-[2.15rem]">
              {system.steps.map((step) => (
                <div key={step.label} className="pt-1.5">
                  <span className="text-base font-semibold text-white">
                    {step.label}
                  </span>
                  <p className="text-sm text-zinc-500">{step.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </Section>
  );
}

function SolutionIncluded({
  included,
  accent,
}: {
  included: SolutionPageData["included"];
  accent: AccentTokens;
}) {
  return (
    <Section size="xl" padding="md">
      <h2 className="heading-section text-white text-center mb-12">
        {included.title}
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {included.items.map((item, index) => {
          const Icon = resolveIcon(item.icon);
          return (
            <div
              key={item.title}
              className={`glass-primary rounded-2xl p-8`}
            >
              {Icon && (
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center mb-5 border"
                  style={{
                    backgroundColor: accent.bg,
                    borderColor: accent.border,
                  }}
                >
                  <Icon
                    className="w-5 h-5"
                    style={{ color: accent.solid }}
                  />
                </div>
              )}
              <h3 className="text-lg font-semibold text-white mb-2">
                {item.title}
              </h3>
              <p className="text-zinc-400">{item.description}</p>
            </div>
          );
        })}
      </div>
    </Section>
  );
}

function SolutionProcess({
  process,
  accent,
}: {
  process: SolutionPageData["process"];
  accent: AccentTokens;
}) {
  return (
    <Section size="xl" padding="md">
      <h2 className="heading-section text-white text-center mb-12">
        Implementation Process
      </h2>

      <div className="relative max-w-4xl mx-auto">
        <div className="hidden md:block absolute left-1/2 top-2 bottom-2 w-px -translate-x-1/2 bg-zinc-800" />
        <div className="md:hidden absolute left-6 top-0 bottom-0 w-px bg-zinc-800" />

        <div className="flex flex-col gap-12">
          {process.steps.map((step, index) => {
            const isLeft = index % 2 === 0;
            return (
              <div
                key={step.title}
                className="relative"
              >
                {/* Desktop layout */}
                <div className="hidden md:grid md:grid-cols-[1fr_auto_1fr] md:items-center md:gap-8">
                  <div className={isLeft ? "" : "order-3"}>
                    <div className={isLeft ? "text-right" : ""}>
                      <h3 className="text-lg font-semibold text-white mb-1">
                        {step.title}
                      </h3>
                      <p className="text-sm text-zinc-500">
                        {step.description}
                      </p>
                    </div>
                  </div>
                  <div
                    className="w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold text-white border z-10 order-2 shrink-0 backdrop-blur-md"
                    style={{
                      backgroundColor: accent.bg,
                      borderColor: accent.border,
                      color: accent.solid,
                    }}
                  >
                    {String(index + 1).padStart(2, "0")}
                  </div>
                  <div className={isLeft ? "order-3" : ""} />
                </div>

                {/* Mobile layout */}
                <div className="md:hidden flex items-start gap-5">
                  <div
                    className="w-12 h-12 rounded-full flex items-center justify-center text-sm font-bold text-white border z-10 shrink-0"
                    style={{
                      backgroundColor: accent.bg,
                      borderColor: accent.border,
                      color: accent.solid,
                    }}
                  >
                    {String(index + 1).padStart(2, "0")}
                  </div>
                  <div className="flex-1 pt-2.5">
                    <h3 className="text-lg font-semibold text-white mb-1">
                      {step.title}
                    </h3>
                    <p className="text-sm text-zinc-500">
                      {step.description}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </Section>
  );
}

function SolutionOutcomes({
  outcomes,
}: {
  outcomes: SolutionPageData["outcomes"];
}) {
  return (
    <Section size="lg" padding="md">
      <h2 className="heading-section text-white text-center mb-12">
        Expected Outcomes
      </h2>
      <div className="max-w-3xl mx-auto">
        <div className="flex flex-wrap gap-3 justify-center">
          {outcomes.metrics.map((metric) => (
            <span
              key={metric}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-zinc-800"
            >
              <Check className="w-4 h-4 text-emerald-400 shrink-0" />
              <span className="text-sm text-zinc-300">{metric}</span>
            </span>
          ))}
        </div>
      </div>
    </Section>
  );
}

function SolutionQualification({
  qualification,
}: {
  qualification: SolutionPageData["qualification"];
}) {
  return (
    <Section size="lg" padding="md">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16">
        <div>
          <div
            className="text-xs uppercase tracking-widest font-semibold mb-6"
            style={{ color: "oklch(0.78 0.2 145)" }}
          >
            Who This Is For
          </div>
          <ul className="space-y-5">
            {qualification.forWho.map((item) => (
              <li key={item} className="flex items-start gap-3">
                <Check
                  className="w-5 h-5 shrink-0 mt-0.5"
                  style={{ color: "oklch(0.78 0.2 145)" }}
                />
                <span className="text-zinc-300 text-lg">{item}</span>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <div
            className="text-xs uppercase tracking-widest font-semibold mb-6"
            style={{ color: "oklch(0.65 0.2 25)" }}
          >
            Who This Is Not For
          </div>
          <ul className="space-y-5">
            {qualification.notForWho.map((item) => (
              <li key={item} className="flex items-start gap-3">
                <X
                  className="w-5 h-5 shrink-0 mt-0.5"
                  style={{ color: "oklch(0.65 0.2 25)" }}
                />
                <span className="text-zinc-500 text-lg">{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </Section>
  );
}

function SolutionCTA({
  cta,
  accent,
  buttonColor,
}: {
  cta: SolutionPageData["cta"];
  accent: AccentTokens;
  buttonColor: "blue" | "cyan" | "emerald" | "purple" | "pink" | "amber";
}) {
  return (
    <div className="relative overflow-x-clip">
      <div
        className="absolute inset-0"
        style={{
          background: `
            radial-gradient(ellipse 80% 50% at 50% 100%, ${accent.bg}, transparent 60%),
            linear-gradient(180deg, oklch(0.05 0 0), oklch(0.07 0 0))
          `,
        }}
      />
      <Section size="md" padding="lg" className="relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <h2 className="heading-section text-white mb-6">{cta.headline}</h2>
          <p className="text-lg text-zinc-400 max-w-xl mx-auto mb-10">
            {cta.subtext}
          </p>
          <Link href="/book">
            <ScanningButton variant="primary" size="lg" color={buttonColor}>
              Book a Call
            </ScanningButton>
          </Link>
        </motion.div>
      </Section>
    </div>
  );
}
