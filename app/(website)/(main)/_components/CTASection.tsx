"use client";

import React from "react";
import { motion } from "framer-motion";
import { ScanningButton } from "@/components/ui/ScanningButton";
import Link from "next/link";
import Section from "@/components/ui/section";

const CTASection = () => {
  return (
    <div className="relative min-h-[70vh] flex items-center overflow-hidden">
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

      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute w-64 h-64 rounded-full"
          style={{
            background: `radial-gradient(circle, oklch(0.5 0.18 250), transparent 70%)`,
            top: "10%",
            right: "15%",
          }}
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.15, 0.25, 0.15],
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute w-96 h-96 rounded-full"
          style={{
            background: `radial-gradient(circle, oklch(0.4 0.15 220), transparent 70%)`,
            bottom: "5%",
            left: "10%",
          }}
          animate={{
            scale: [1.1, 1, 1.1],
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
          className="absolute w-48 h-48 rounded-full"
          style={{
            background: `radial-gradient(circle, oklch(0.45 0.2 280), transparent 70%)`,
            top: "50%",
            left: "60%",
          }}
          animate={{
            scale: [1, 1.15, 1],
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
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `
            linear-gradient(to right, oklch(1 0 0) 1px, transparent 1px),
            linear-gradient(to bottom, oklch(1 0 0) 1px, transparent 1px)
          `,
          backgroundSize: "60px 60px",
        }}
      />

      <div
        className="absolute inset-0"
        style={{
          boxShadow: "inset 0 0 100px oklch(0 0 0 / 0.4)",
        }}
      />

      <Section size="lg" padding="lg" className="relative z-10 w-full">
        <div className="text-center">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="heading-section lg:text-6xl text-white mb-6"
          >
            Ready to Turn Inquiries Into Bookings?
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            viewport={{ once: true }}
            className="text-lg md:text-xl text-white/80 mb-10 max-w-2xl mx-auto"
          >
            Book a strategy call. We&apos;ll review your current setup and show
            you exactly where bookings are leaking.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <ScanningButton
              variant="primary"
              size="lg"
              color="white"
              trackingLocation="cta-section"
              trackingProps={{
                page: "home",
                section: "cta",
              }}
            >
              <Link href="/book">Book a Strategy Call</Link>
            </ScanningButton>
          </motion.div>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            viewport={{ once: true }}
            className="text-white/50 text-sm mt-8"
          >
            No commitment required. See if we&apos;re a good fit.
          </motion.p>
        </div>
      </Section>
    </div>
  );
};

export default CTASection;
