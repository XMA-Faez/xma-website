"use client";

import React from "react";
import { motion } from "framer-motion";
import { Shield } from "lucide-react";

import ROICalculator from "@/components/crm/ROICalculator";
import BusinessAssessment from "@/components/crm/BusinessAssessment";
import StreamlinedFeatures from "@/components/crm/StreamlinedFeatures";
import UAESuccessStories from "@/components/crm/UAESuccessStories";
import ProgressiveCTA from "@/components/crm/ProgressiveCTA";
import ModularFAQ from "@/components/crm/ModularFAQ";
import CRMErrorBoundary from "@/components/crm/ErrorBoundary";
import WebVitalsReporter from "@/components/performance/WebVitalsReporter";
import { ScanningButton } from "@/components/ui/ScanningButton";

const CRMPageClient = () => {
  return (
    <div className="min-h-screen w-full relative bg-black">
      <WebVitalsReporter />

      <div
        className="absolute inset-0 z-0"
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
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-sm font-medium mb-6"
            role="img"
            aria-label="Trust indicator"
          >
            <Shield className="w-4 h-4" aria-hidden="true" />
            Trusted by 500+ UAE Businesses
          </motion.div>

          <motion.h1
            id="hero-heading"
            className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            Stop Losing WhatsApp Leads to
            <span className="bg-gradient-to-r from-emerald-400 to-green-300 bg-clip-text text-transparent">
              {" "}
              Poor Follow-Up
            </span>
          </motion.h1>

          <motion.p
            className="text-xl md:text-2xl text-zinc-300 max-w-3xl mx-auto mb-8"
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
            <ScanningButton color="emerald" variant="primary" size="lg">
              Book a Demo
            </ScanningButton>
          </motion.div>

          {/* Hero Image/Screenshot */}
          <motion.div
            className="mt-12 relative"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
          >
            <div className="relative rounded-2xl overflow-hidden shadow-2xl shadow-emerald-500/20 border border-emerald-500/20">
              <div
                className="aspect-[16/9] bg-zinc-800 flex items-center justify-center"
                role="img"
                aria-label="CRM dashboard preview showing WhatsApp integration, customer management, and sales pipeline features"
              >
                <p className="text-zinc-400 text-center p-8" aria-hidden="true">
                  IMAGE PLACEHOLDER: CRM dashboard screenshot showing:
                  <br />
                  - WhatsApp conversation panel on the left
                  <br />
                  - Customer details in the center
                  <br />
                  - Sales pipeline on the right
                  <br />- Clean, modern interface with emerald green accents
                </p>
              </div>
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

      <CRMErrorBoundary>
        <UAESuccessStories />
      </CRMErrorBoundary>

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
