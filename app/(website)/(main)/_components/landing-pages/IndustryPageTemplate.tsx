"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import Section from "@/components/ui/section";
import SocialProofStrip from "@/app/(website)/(main)/_components/SocialProofStrip";
import type { IndustryPageData } from "@/data/landing-pages/types";
import { deriveAccentTokens, mapAccentToButtonColor } from "./_shared/accent-utils";
import type { AccentTokens } from "./_shared/accent-utils";
import { resolveIcon } from "./_shared/icon-map";
import LandingHero from "./_shared/LandingHero";
import StatsStrip from "./_shared/StatsStrip";
import PainPointBento from "./_shared/PainPointBento";
import FAQAccordion from "./_shared/FAQAccordion";
import LandingCTA from "./_shared/LandingCTA";
import CrossLinkGrid from "./_shared/CrossLinkGrid";
import TestimonialCard from "./_shared/TestimonialCard";
import SectionDivider from "./_shared/SectionDivider";

interface IndustryPageTemplateProps {
  data: IndustryPageData;
  crossLinkItems?: { name: string; description: string; href: string }[];
}

const staggerContainer = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.08 },
  },
};

const staggerItem = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: "spring", stiffness: 100, damping: 20 },
  },
};

export default function IndustryPageTemplate({
  data,
  crossLinkItems,
}: IndustryPageTemplateProps) {
  const accentTokens = deriveAccentTokens(data.accentColor);
  const buttonColor = mapAccentToButtonColor(data.accentColor);

  return (
    <div className="relative w-full">
      <LandingHero
        badge={data.hero.badge}
        title={data.hero.title}
        subtitle={data.hero.subtitle}
        image={data.hero.image}
        imageAlt={data.hero.imageAlt}
        accentTokens={accentTokens}
        buttonColor={buttonColor}
      />
      <SocialProofStrip />
      <StatsStrip stats={data.stats} accentTokens={accentTokens} />
      <PainPointBento
        headline="Industry Challenges"
        painPoints={data.painPoints}
        accentTokens={accentTokens}
      />
      <SectionDivider label="How We Help" accentTokens={accentTokens} />
      <RelevantServicesSection
        services={data.relevantServices}
        accentTokens={accentTokens}
      />
      <ExpertiseSection
        expertise={data.expertise}
        accentTokens={accentTokens}
      />
      {data.caseStudy && (
        <Section size="xl" padding="md">
          <TestimonialCard
            company={data.caseStudy.company}
            challenge={data.caseStudy.challenge}
            solution={data.caseStudy.solution}
            result={data.caseStudy.result}
            logo={data.caseStudy.logo}
            accentTokens={accentTokens}
          />
        </Section>
      )}
      <SectionDivider label="The Results" accentTokens={accentTokens} />
      <StatsStrip stats={data.results} accentTokens={accentTokens} />
      <FAQAccordion items={data.faq} accentTokens={accentTokens} />
      {crossLinkItems && crossLinkItems.length > 0 && (
        <CrossLinkGrid
          title="Related Services"
          items={crossLinkItems}
          accentTokens={accentTokens}
        />
      )}
      <LandingCTA
        cta={data.cta}
        accentTokens={accentTokens}
        buttonColor={buttonColor}
      />
    </div>
  );
}

function RelevantServicesSection({
  services,
  accentTokens,
}: {
  services: IndustryPageData["relevantServices"];
  accentTokens: AccentTokens;
}) {
  return (
    <div
      className="relative"
      style={{
        background: `radial-gradient(ellipse 70% 50% at 80% 50%, ${accentTokens.bgSubtle}, transparent 70%)`,
      }}
    >
      <Section size="xl" padding="md">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ type: "spring", stiffness: 100, damping: 20 }}
          viewport={{ once: true }}
          className="text-3xl md:text-4xl font-bold tracking-tighter text-white mb-12"
        >
          Our Services for Your Industry
        </motion.h2>
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {services.map((service) => {
            const Icon = resolveIcon(service.icon);
            return (
              <motion.div key={service.slug} variants={staggerItem}>
                <Link
                  href={`/${service.slug}`}
                  className="group glass-secondary rounded-2xl p-8 border border-zinc-800/50 hover:border-transparent flex flex-col h-full transition-colors duration-300"
                  style={{
                    // @ts-expect-error CSS custom property for hover state
                    "--hover-border": accentTokens.border,
                  }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLElement).style.borderColor =
                      accentTokens.border;
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLElement).style.borderColor =
                      "oklch(0.27 0 0 / 0.5)";
                  }}
                >
                  {Icon && (
                    <div
                      className="w-12 h-12 rounded-xl flex items-center justify-center mb-5 border"
                      style={{
                        backgroundColor: accentTokens.bg,
                        borderColor: accentTokens.border,
                      }}
                    >
                      <Icon
                        className="w-5 h-5"
                        style={{ color: accentTokens.solid }}
                      />
                    </div>
                  )}
                  <h3 className="text-lg font-semibold text-white mb-2">
                    {service.name}
                  </h3>
                  <p className="text-zinc-400 leading-relaxed mb-4 flex-1">
                    {service.description}
                  </p>
                  <span
                    className="inline-flex items-center gap-1.5 text-sm font-medium group-hover:gap-2.5 transition-all duration-300"
                    style={{ color: accentTokens.solid }}
                  >
                    Learn more
                    <ArrowRight className="w-4 h-4" />
                  </span>
                </Link>
              </motion.div>
            );
          })}
        </motion.div>
      </Section>
    </div>
  );
}

function ExpertiseSection({
  expertise,
  accentTokens,
}: {
  expertise: IndustryPageData["expertise"];
  accentTokens: AccentTokens;
}) {
  return (
    <Section size="xl" padding="md">
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ type: "spring", stiffness: 100, damping: 20 }}
        viewport={{ once: true }}
        className="text-3xl md:text-4xl font-bold tracking-tighter text-white mb-12"
      >
        {expertise.title}
      </motion.h2>
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="grid grid-cols-1 md:grid-cols-[3fr_2fr] gap-y-0"
      >
        {expertise.points.map((point, index) => (
          <motion.div
            key={point.title}
            variants={staggerItem}
            className={`flex items-start gap-5 py-8 ${index < expertise.points.length - 1 ? "border-b border-zinc-800/50" : ""} ${index % 2 !== 0 ? "md:col-start-2" : "md:col-start-1"}`}
          >
            <span
              className="text-3xl font-bold leading-none shrink-0 tabular-nums"
              style={{ color: accentTokens.solid }}
            >
              {String(index + 1).padStart(2, "0")}
            </span>
            <div>
              <h3 className="text-lg font-semibold text-white mb-2">
                {point.title}
              </h3>
              <p className="text-zinc-400 leading-relaxed">
                {point.description}
              </p>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </Section>
  );
}
