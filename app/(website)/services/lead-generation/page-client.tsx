"use client";

import React from "react";
import { motion } from "framer-motion";
import { Shield } from "lucide-react";
import Link from "next/link";

import PlatformShowcase from "./_components/PlatformShowcase";
import LeadGenFeatures from "./_components/LeadGenFeatures";
import CampaignROICalculator from "./_components/CampaignROICalculator";
import LeadGenCTA from "./_components/LeadGenCTA";
import LeadGenAssessment from "./_components/LeadGenAssessment";
import LeadGenFAQ from "./_components/LeadGenFAQ";
import LeadGenErrorBoundary from "./_components/ErrorBoundary";
import WebVitalsReporter from "@/components/providers/WebVitalsReporter";
import { ScanningButton } from "@/components/ui/ScanningButton";
import { Badge } from "@/components/ui/Badge";
import Section from "@/components/ui/section";
import SocialProofStrip from "@/app/(website)/(main)/_components/SocialProofStrip";
import ProofSection from "@/app/(website)/(main)/_components/ProofSection";

const ACCENT = "oklch(0.75 0.16 65)";

const LeadGenPageClient = () => {
  return (
    <div className="relative w-full">
      <WebVitalsReporter />

      <div className="relative min-h-[90vh] flex items-center overflow-x-clip">
        <div
          className="absolute inset-0"
          style={{
            background: `
              radial-gradient(ellipse 80% 60% at 50% 0%, oklch(0.75 0.16 65 / 0.2), transparent 70%),
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
          <div className="text-center">
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="mb-6"
            >
              <Badge
                variant="warning"
                role="img"
                aria-label="Trust indicator"
              >
                <Shield className="w-4 h-4" aria-hidden="true" />
                Trusted by 200+ UAE Businesses
              </Badge>
            </motion.div>

            <motion.h1
              id="hero-heading"
              className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight text-white"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              Stop Wasting Ad Spend on
              <span
                className="bg-clip-text text-transparent"
                style={{
                  backgroundImage: `linear-gradient(to right, ${ACCENT}, oklch(0.8 0.16 50))`,
                }}
              >
                {" "}
                Unqualified Leads
              </span>
            </motion.h1>

            <motion.p
              className="text-lg md:text-xl text-zinc-400 max-w-3xl mx-auto mb-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              Precision-targeted Google Ads and Meta Ads campaigns that generate
              qualified leads and turn ad spend into predictable revenue for UAE
              businesses
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <Link href="/book">
                <ScanningButton color="amber" variant="primary" size="lg">
                  Book Your Free Ad Audit
                </ScanningButton>
              </Link>
            </motion.div>
          </div>
        </Section>
      </div>

      <SocialProofStrip />

      <LeadGenErrorBoundary>
        <PlatformShowcase />
      </LeadGenErrorBoundary>

      <LeadGenErrorBoundary>
        <LeadGenFeatures />
      </LeadGenErrorBoundary>

      <LeadGenErrorBoundary>
        <CampaignROICalculator />
      </LeadGenErrorBoundary>

      <Section size="md" padding="sm">
        <LeadGenErrorBoundary>
          <LeadGenCTA position="testimonials" />
        </LeadGenErrorBoundary>
      </Section>

      <LeadGenErrorBoundary>
        <LeadGenAssessment />
      </LeadGenErrorBoundary>

      <ProofSection />

      <LeadGenErrorBoundary>
        <LeadGenFAQ />
      </LeadGenErrorBoundary>

      <Section size="md" padding="sm">
        <LeadGenErrorBoundary>
          <LeadGenCTA position="final" />
        </LeadGenErrorBoundary>
      </Section>
    </div>
  );
};

export default LeadGenPageClient;
