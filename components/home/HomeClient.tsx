"use client";

import React from "react";
import HeroSection from "./sections/HeroSection";
import TrustStrip from "./sections/TrustStrip";
import ProblemSection from "./sections/ProblemSection";
import AuthoritySection from "./sections/AuthoritySection";
import LuxuryBookingSystem from "./sections/LuxuryBookingSystem";
import VisualProof from "./sections/VisualProof";
import ClientLogos from "./sections/ClientLogos";
import QualificationSection from "./sections/QualificationSection";
import FAQSection from "./sections/FAQSection";
import FinalCTA from "./sections/FinalCTA";
import WhatsAppWidget from "@/components/real-estate/WhatsAppWidget";

const HomeClient = () => {
  return (
    <div className="min-h-screen w-full relative bg-white dark:bg-black">
      {/* Light mode background */}
      <div
        className="absolute inset-0 z-0 dark:hidden"
        style={{
          background:
            "radial-gradient(ellipse 80% 60% at 50% 0%, oklch(0.6 0.15 250 / 0.15), transparent 70%), oklch(0.98 0.01 250)",
        }}
      />
      {/* Dark mode background */}
      <div
        className="absolute inset-0 z-0 hidden dark:block"
        style={{
          background:
            "linear-gradient(35deg, oklch(0 0 0) 0%, oklch(0.15 0.05 250) 50%, oklch(0 0 0) 100%)",
        }}
      />

      <HeroSection />
      <TrustStrip />
      <ProblemSection />
      <AuthoritySection />
      <LuxuryBookingSystem />
      <VisualProof />
      <ClientLogos />
      <QualificationSection />
      <FAQSection />
      <FinalCTA />

      <WhatsAppWidget />
    </div>
  );
};

export default HomeClient;
