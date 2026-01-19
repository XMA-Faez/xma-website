"use client";

import React from "react";
import { motion } from "framer-motion";
import Section from "@/components/ui/section";
import LeadForm from "@/app/(website)/(booking)/book/_components/LeadForm";

const CTASection = () => {
  return (
    <div className="relative min-h-svh md:min-h-[70vh] flex items-center overflow-x-clip">
      <div
        className="absolute inset-0"
        style={{
          background: `
            radial-gradient(ellipse 80% 50% at 50% 0%, oklch(0.35 0.15 250 / 0.6), transparent 50%),
            radial-gradient(ellipse 60% 60% at 20% 80%, oklch(0.3 0.12 220 / 0.5), transparent 50%),
            radial-gradient(ellipse 50% 50% at 80% 60%, oklch(0.25 0.1 280 / 0.4), transparent 50%),
            linear-gradient(180deg, oklch(0.08 0.02 250), oklch(0.05 0.01 240))
          `,
        }}
      />

      <div className="absolute inset-0 pointer-events-none overflow-clip">
        <motion.div
          className="absolute w-64 h-64 rounded-full will-change-transform"
          style={{
            background: `radial-gradient(circle, oklch(0.5 0.18 250), transparent 70%)`,
            top: "10%",
            right: "15%",
          }}
          animate={{
            scale: [1, 1.1, 1],
            opacity: [0.15, 0.25, 0.15],
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute w-96 h-96 rounded-full will-change-transform hidden md:block"
          style={{
            background: `radial-gradient(circle, oklch(0.4 0.15 220), transparent 70%)`,
            bottom: "5%",
            left: "10%",
          }}
          animate={{
            scale: [1, 1.05, 1],
            opacity: [0.12, 0.22, 0.12],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2,
          }}
        />
        <motion.div
          className="absolute w-48 h-48 rounded-full will-change-transform hidden md:block"
          style={{
            background: `radial-gradient(circle, oklch(0.45 0.2 280), transparent 70%)`,
            top: "50%",
            left: "60%",
          }}
          animate={{
            scale: [1, 1.08, 1],
            opacity: [0.1, 0.2, 0.1],
          }}
          transition={{
            duration: 7,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1,
          }}
        />
      </div>

      <div
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: `
            linear-gradient(to right, oklch(1 0 0) 1px, transparent 1px),
            linear-gradient(to bottom, oklch(1 0 0) 1px, transparent 1px)
          `,
          backgroundSize: "60px 60px",
        }}
      />

      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          boxShadow: "inset 0 0 100px oklch(0 0 0 / 0.4)",
        }}
      />

      <Section size="xl" padding="lg" className="relative z-10 w-full">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center lg:text-left"
          >
            <h2 className="heading-section lg:text-6xl text-white mb-6">
              Ready to Turn Inquiries Into Bookings?
            </h2>

            <p className="text-lg md:text-xl text-white/80 mb-8 max-w-xl mx-auto lg:mx-0">
              Share your goals with us and we&apos;ll show you exactly where
              bookings are leaking and how to fix them.
            </p>

            <div className="flex flex-wrap justify-center lg:justify-start gap-4 text-sm text-white/60">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-emerald-400 rounded-full"></div>
                <span>Free consultation</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                <span>24hr response</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-purple-400 rounded-full"></div>
                <span>No commitment</span>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 md:p-8 min-h-[520px] md:min-h-[480px]"
          >
            <div className="mb-6 text-center">
              <h3 className="text-xl font-semibold text-white mb-2">
                Get Started Today
              </h3>
              <p className="text-white/60 text-sm">
                Fill out the form and we&apos;ll be in touch within 24 hours
              </p>
            </div>

            <LeadForm variant="compact" source="cta_section" />
          </motion.div>
        </div>
      </Section>
    </div>
  );
};

export default CTASection;
