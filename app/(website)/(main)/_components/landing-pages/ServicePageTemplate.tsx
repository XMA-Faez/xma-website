"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Section from "@/components/ui/section";
import SocialProofStrip from "@/app/(website)/(main)/_components/SocialProofStrip";
import type { ServicePageData } from "@/data/landing-pages/types";
import { deriveAccentTokens, mapAccentToButtonColor } from "./_shared/accent-utils";
import type { AccentTokens } from "./_shared/accent-utils";
import { resolveIcon } from "./_shared/icon-map";
import LandingHero from "./_shared/LandingHero";
import StatsStrip from "./_shared/StatsStrip";
import PainPointBento from "./_shared/PainPointBento";
import ProcessTimeline from "./_shared/ProcessTimeline";
import FAQAccordion from "./_shared/FAQAccordion";
import LandingCTA from "./_shared/LandingCTA";
import CrossLinkGrid from "./_shared/CrossLinkGrid";
import SectionDivider from "./_shared/SectionDivider";

interface ServicePageTemplateProps {
  data: ServicePageData;
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

export default function ServicePageTemplate({
  data,
  crossLinkItems,
}: ServicePageTemplateProps) {
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
        headline="The Problem"
        painPoints={data.painPoints}
        accentTokens={accentTokens}
      />
      <SectionDivider label="Our Approach" accentTokens={accentTokens} />
      <ProcessTimeline
        title={data.approach.title}
        steps={data.approach.steps}
        accentTokens={accentTokens}
      />
      <DeliverablesSection
        deliverables={data.deliverables}
        accentTokens={accentTokens}
      />
      <WhyXMASection
        differentiators={data.differentiators}
        accentTokens={accentTokens}
      />
      <SectionDivider label="The Results" accentTokens={accentTokens} />
      <StatsStrip stats={data.results} accentTokens={accentTokens} />
      <FAQAccordion items={data.faq} accentTokens={accentTokens} />
      {crossLinkItems && crossLinkItems.length > 0 && (
        <CrossLinkGrid
          title="Industries We Serve"
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

function DeliverablesSection({
  deliverables,
  accentTokens,
}: {
  deliverables: ServicePageData["deliverables"];
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
        {deliverables.title}
      </motion.h2>
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="grid grid-cols-1 md:grid-cols-2 gap-6"
      >
        {deliverables.items.map((item) => {
          const Icon = resolveIcon(item.icon);
          return (
            <motion.div
              key={item.title}
              variants={staggerItem}
              className="glass-secondary rounded-2xl p-8 border border-zinc-800/50"
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
                {item.title}
              </h3>
              <p className="text-zinc-400 leading-relaxed">
                {item.description}
              </p>
            </motion.div>
          );
        })}
      </motion.div>
    </Section>
  );
}

function WhyXMASection({
  differentiators,
  accentTokens,
}: {
  differentiators: ServicePageData["differentiators"];
  accentTokens: AccentTokens;
}) {
  return (
    <div
      className="relative"
      style={{
        background: `radial-gradient(ellipse 80% 60% at 20% 50%, ${accentTokens.bgSubtle}, transparent 70%)`,
      }}
    >
      <Section size="xl" padding="md">
        <div className="grid grid-cols-1 md:grid-cols-[2fr_3fr] gap-12 md:gap-16">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ type: "spring", stiffness: 100, damping: 20 }}
            viewport={{ once: true }}
            className="flex flex-col justify-center"
          >
            <h2 className="text-4xl md:text-5xl font-bold tracking-tighter text-white leading-[1.1]">
              Why
              <br />
              <span style={{ color: accentTokens.solid }}>XMA</span>
            </h2>
          </motion.div>

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="flex flex-col"
          >
            {differentiators.map((diff, index) => {
              const Icon = resolveIcon(diff.icon);
              const isLastItem = index === differentiators.length - 1;
              return (
                <motion.div
                  key={diff.title}
                  variants={staggerItem}
                  className={`flex items-start gap-5 py-6 ${!isLastItem ? "border-b border-zinc-800/50" : ""}`}
                >
                  {Icon && (
                    <div
                      className="w-10 h-10 rounded-lg flex items-center justify-center shrink-0 border"
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
                  <div>
                    <h3 className="text-lg font-semibold text-white mb-1">
                      {diff.title}
                    </h3>
                    <p className="text-zinc-400 leading-relaxed">
                      {diff.description}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </Section>
    </div>
  );
}
