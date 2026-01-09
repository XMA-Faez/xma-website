"use client";

import React from "react";
import { motion } from "framer-motion";
import { ScanningButton } from "@/components/ui/ScanningButton";
import Link from "next/link";
import Image from "next/image";
import Section from "@/components/ui/section";

const CTASection = () => {
  return (
    <div className="relative min-h-[70vh] flex items-center">
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/cta-car-night.jpg"
          alt="Luxury car at night"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-black/70" />
      </div>

      <Section size="lg" padding="lg" className="relative z-10 w-full">
        <div className="text-center">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl lg:text-6xl font-semibold text-white mb-6 leading-[1.1]"
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
