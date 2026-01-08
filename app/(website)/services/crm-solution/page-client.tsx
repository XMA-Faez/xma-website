"use client";

import React from "react";
import { motion } from "framer-motion";
import { Shield } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

import ROICalculator from "./_components/ROICalculator";
import BusinessAssessment from "./_components/BusinessAssessment";
import StreamlinedFeatures from "./_components/StreamlinedFeatures";
import UAESuccessStories from "./_components/UAESuccessStories";
import ProgressiveCTA from "./_components/ProgressiveCTA";
import ModularFAQ from "./_components/ModularFAQ";
import CRMErrorBoundary from "./_components/ErrorBoundary";
import WebVitalsReporter from "@/components/providers/WebVitalsReporter";
import { ScanningButton } from "@/components/ui/ScanningButton";
import { Badge } from "@/components/ui/Badge";

const CRMPageClient = () => {
  return (
    <div className="min-h-screen w-full relative bg-white dark:bg-black">
      <WebVitalsReporter />

      {/* Light mode background */}
      <div
        className="absolute inset-0 z-0 dark:hidden"
        style={{
          background:
            "radial-gradient(ellipse 80% 60% at 50% 0%, rgba(16, 185, 129, 0.15), transparent 70%), rgb(255, 255, 255)",
        }}
      />
      
      {/* Dark mode background */}
      <div
        className="absolute inset-0 z-0 hidden dark:block"
        style={{
          background:
            "radial-gradient(ellipse 80% 60% at 50% 0%, rgba(16, 185, 129, 0.25), transparent 70%), #000000",
        }}
      />

      <section
        className="relative pt-32 pb-20 px-4 min-h-[90vh] flex items-center"
        aria-labelledby="hero-heading"
        role="banner"
      >
        <div className="max-w-6xl mx-auto text-center relative z-20">
          {/* Trust Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
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
            className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight text-slate-900 dark:text-white"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            Stop Losing WhatsApp Leads to
            <span className="bg-gradient-to-r from-emerald-400 to-emerald-600 bg-clip-text text-transparent">
              {" "}
              Poor Follow-Up
            </span>
          </motion.h1>

          <motion.p
            className="text-xl md:text-2xl text-slate-600 dark:text-zinc-300 max-w-3xl mx-auto mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            role="text"
            aria-describedby="hero-heading"
          >
            The AI-powered CRM with advanced chatbot that connects WhatsApp,
            automates conversations, and turns more inquiries into paying
            customers for UAE service businesses
          </motion.p>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <Link href="/book-crm">
              <ScanningButton color="emerald" variant="primary" size="lg">
                Book a Demo
              </ScanningButton>
            </Link>
          </motion.div>

          {/* Hero Image/Screenshot */}
          <motion.div
            className="mt-12 relative"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
          >
            <div className="relative rounded-2xl overflow-hidden shadow-2xl shadow-emerald-500/20 border border-emerald-500/20">
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
      </section>

      <CRMErrorBoundary>
        <StreamlinedFeatures />
      </CRMErrorBoundary>

      <CRMErrorBoundary>
        <ROICalculator />
      </CRMErrorBoundary>

      {/* <CRMErrorBoundary> */}
      {/*   <UAESuccessStories /> */}
      {/* </CRMErrorBoundary> */}

      <div className="max-w-4xl mx-auto px-4 pt-8">
        <CRMErrorBoundary>
          <ProgressiveCTA position="testimonials" />
        </CRMErrorBoundary>
      </div>

      <CRMErrorBoundary>
        <BusinessAssessment />
      </CRMErrorBoundary>

      <CRMErrorBoundary>
        <ModularFAQ />
      </CRMErrorBoundary>

      <div className="max-w-4xl mx-auto px-4 py-8">
        <CRMErrorBoundary>
          <ProgressiveCTA position="final" />
        </CRMErrorBoundary>
      </div>
    </div>
  );
};

export default CRMPageClient;
