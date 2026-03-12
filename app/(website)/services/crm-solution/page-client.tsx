"use client";

import React from "react";
import { motion } from "framer-motion";
import { Shield, Calculator, ClipboardCheck, ArrowRight } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

import StreamlinedFeatures from "./_components/StreamlinedFeatures";
import ProgressiveCTA from "./_components/ProgressiveCTA";
import ModularFAQ from "./_components/ModularFAQ";
import CRMErrorBoundary from "./_components/ErrorBoundary";
import WebVitalsReporter from "@/components/providers/WebVitalsReporter";
import { ScanningButton } from "@/components/ui/ScanningButton";
import { Badge } from "@/components/ui/Badge";
import Section from "@/components/ui/section";
import SocialProofStrip from "@/app/(website)/(main)/_components/SocialProofStrip";
import CaseStudiesPreview from "@/app/(website)/(main)/_components/CaseStudiesPreview";

const ACCENT = "oklch(0.7 0.19 160)";

const CRMPageClient = () => {
  return (
    <div className="relative w-full">
      <WebVitalsReporter />

      <div className="relative min-h-[90vh] flex items-center overflow-x-clip">
        <div
          className="absolute inset-0"
          style={{
            background: `
              radial-gradient(ellipse 80% 60% at 50% 0%, oklch(0.7 0.19 160 / 0.2), transparent 70%),
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
                variant="success"
                role="img"
                aria-label="Trust indicator"
              >
                <Shield className="w-4 h-4" aria-hidden="true" />
                Trusted by 500+ UAE Businesses
              </Badge>
            </motion.div>

            <motion.h1
              id="hero-heading"
              className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight text-white"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              Stop Losing WhatsApp Leads to
              <span
                className="bg-clip-text text-transparent"
                style={{
                  backgroundImage: `linear-gradient(to right, ${ACCENT}, oklch(0.75 0.19 145))`,
                }}
              >
                {" "}
                Poor Follow-Up
              </span>
            </motion.h1>

            <motion.p
              className="text-lg md:text-xl text-zinc-400 max-w-3xl mx-auto mb-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              The AI-powered CRM with advanced chatbot that connects WhatsApp,
              automates conversations, and turns more inquiries into paying
              customers for UAE service businesses
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <Link href="/book-crm">
                <ScanningButton color="emerald" variant="primary" size="lg">
                  Book a Demo
                </ScanningButton>
              </Link>
            </motion.div>

            <motion.div
              className="mt-12 relative"
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
            >
              <div
                className="relative rounded-2xl overflow-hidden border"
                style={{
                  borderColor: "oklch(0.7 0.19 160 / 0.2)",
                  boxShadow: "0 25px 50px -12px oklch(0.7 0.19 160 / 0.15)",
                }}
              >
                <Image
                  src="/crm-screenshot.png"
                  alt="XMA CRM dashboard showing opportunities pipeline with lead management, sales tracking, and multi-channel communication features"
                  width={1920}
                  height={1080}
                  className="w-full h-auto"
                  priority
                  quality={90}
                />
              </div>
            </motion.div>
          </div>
        </Section>
      </div>

      <SocialProofStrip />

      <CRMErrorBoundary>
        <StreamlinedFeatures />
      </CRMErrorBoundary>

      <Section size="xl" padding="md">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Link
            href="/services/crm-solution/roi-calculator"
            className="group glass-primary rounded-2xl p-8 md:p-10 transition-all duration-300 hover:border-emerald-500/30 hover:bg-white/[0.04] block"
          >
            <div className="flex items-start gap-4 mb-4">
              <div
                className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0 border"
                style={{
                  backgroundColor: "oklch(0.7 0.19 160 / 0.12)",
                  borderColor: "oklch(0.7 0.19 160 / 0.25)",
                }}
              >
                <Calculator
                  className="w-5 h-5"
                  style={{ color: ACCENT }}
                />
              </div>
              <ArrowRight className="w-5 h-5 text-zinc-600 group-hover:text-emerald-400 transition-all group-hover:translate-x-1 shrink-0 mt-3.5 ml-auto" />
            </div>
            <h3 className="text-xl font-semibold text-white group-hover:text-emerald-400 transition-colors mb-2">
              ROI Calculator
            </h3>
            <p className="text-zinc-400">
              Calculate how much revenue you could recover by automating your
              lead follow-up. Input your numbers and see projected returns.
            </p>
          </Link>

          <Link
            href="/services/crm-solution/assessment"
            className="group glass-primary rounded-2xl p-8 md:p-10 transition-all duration-300 hover:border-emerald-500/30 hover:bg-white/[0.04] block"
          >
            <div className="flex items-start gap-4 mb-4">
              <div
                className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0 border"
                style={{
                  backgroundColor: "oklch(0.7 0.19 160 / 0.12)",
                  borderColor: "oklch(0.7 0.19 160 / 0.25)",
                }}
              >
                <ClipboardCheck
                  className="w-5 h-5"
                  style={{ color: ACCENT }}
                />
              </div>
              <ArrowRight className="w-5 h-5 text-zinc-600 group-hover:text-emerald-400 transition-all group-hover:translate-x-1 shrink-0 mt-3.5 ml-auto" />
            </div>
            <h3 className="text-xl font-semibold text-white group-hover:text-emerald-400 transition-colors mb-2">
              CRM Readiness Assessment
            </h3>
            <p className="text-zinc-400">
              Answer a few questions to discover where your business is losing
              leads and get a personalized CRM recommendation.
            </p>
          </Link>
        </div>
      </Section>

      <Section size="md" padding="sm">
        <CRMErrorBoundary>
          <ProgressiveCTA position="testimonials" />
        </CRMErrorBoundary>
      </Section>

      <CaseStudiesPreview />

      <CRMErrorBoundary>
        <ModularFAQ />
      </CRMErrorBoundary>

      <Section size="md" padding="sm">
        <CRMErrorBoundary>
          <ProgressiveCTA position="final" />
        </CRMErrorBoundary>
      </Section>
    </div>
  );
};

export default CRMPageClient;
