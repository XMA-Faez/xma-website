"use client";

import React from "react";
import { motion } from "framer-motion";
import { Gauge } from "lucide-react";
import Link from "next/link";

import WebFeatures from "./_components/WebFeatures";
import ProcessTimeline from "./_components/ProcessTimeline";
import TechStackShowcase from "./_components/TechStackShowcase";
import PerformanceCalculator from "./_components/PerformanceCalculator";
import WebCreationCTA from "./_components/WebCreationCTA";
import WebCreationAssessment from "./_components/WebCreationAssessment";
import WebCreationFAQ from "./_components/WebCreationFAQ";
import WebErrorBoundary from "./_components/ErrorBoundary";
import WebVitalsReporter from "@/components/providers/WebVitalsReporter";
import { ScanningButton } from "@/components/ui/ScanningButton";
import { Badge } from "@/components/ui/Badge";
import Section from "@/components/ui/section";
import SocialProofStrip from "@/app/(website)/(main)/_components/SocialProofStrip";
import CaseStudiesPreview from "@/app/(website)/(main)/_components/CaseStudiesPreview";

const ACCENT = "oklch(0.65 0.2 260)";

const WebCreationPageClient = () => {
  return (
    <div className="relative w-full">
      <WebVitalsReporter />

      <div className="relative min-h-[90vh] flex items-center overflow-x-clip">
        <div
          className="absolute inset-0"
          style={{
            background: `
              radial-gradient(ellipse 80% 60% at 50% 0%, oklch(0.65 0.2 260 / 0.2), transparent 70%),
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
                variant="primary"
                role="img"
                aria-label="Performance guarantee"
              >
                <Gauge className="w-4 h-4" aria-hidden="true" />
                90+ PageSpeed Guaranteed
              </Badge>
            </motion.div>

            <motion.h1
              id="hero-heading"
              className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight text-white"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              Your Website Is Costing You
              <span
                className="bg-clip-text text-transparent"
                style={{
                  backgroundImage: `linear-gradient(to right, ${ACCENT}, oklch(0.7 0.2 240))`,
                }}
              >
                {" "}
                Customers
              </span>
            </motion.h1>

            <motion.p
              className="text-lg md:text-xl text-zinc-400 max-w-3xl mx-auto mb-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              Premium, high-performance Next.js websites that turn your traffic
              into bookings. Sub-2-second load times, conversion-focused design,
              and a CMS you can actually use.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <Link href="/book">
                <ScanningButton color="blue" variant="primary" size="lg">
                  Book a Free Strategy Call
                </ScanningButton>
              </Link>
            </motion.div>
          </div>
        </Section>
      </div>

      <SocialProofStrip />

      <WebErrorBoundary>
        <WebFeatures />
      </WebErrorBoundary>

      <WebErrorBoundary>
        <ProcessTimeline />
      </WebErrorBoundary>

      <WebErrorBoundary>
        <TechStackShowcase />
      </WebErrorBoundary>

      <WebErrorBoundary>
        <PerformanceCalculator />
      </WebErrorBoundary>

      <Section size="md" padding="sm">
        <WebErrorBoundary>
          <WebCreationCTA position="testimonials" />
        </WebErrorBoundary>
      </Section>

      <WebErrorBoundary>
        <WebCreationAssessment />
      </WebErrorBoundary>

      <CaseStudiesPreview />

      <WebErrorBoundary>
        <WebCreationFAQ />
      </WebErrorBoundary>

      <Section size="md" padding="sm">
        <WebErrorBoundary>
          <WebCreationCTA position="final" />
        </WebErrorBoundary>
      </Section>
    </div>
  );
};

export default WebCreationPageClient;
