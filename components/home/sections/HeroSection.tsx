"use client";

import React from "react";
import { motion } from "framer-motion";
import { ScanningButton } from "@/components/ui/ScanningButton";
import Link from "next/link";
import { CaretDown } from "phosphor-react";
import Image from "next/image";

const HeroSection = () => {
  const scrollToSystem = () => {
    const systemSection = document.getElementById("luxury-booking-system");
    if (systemSection) {
      systemSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section className="relative min-h-screen flex items-center pt-20 pb-16 md:pb-24 px-4">
      {/* Background Image */}
      <div className="absolute inset-0 z-10">
        <Image
          src="/porsche.png"
          alt="Luxury Porsche"
          fill
          className="object-contain object-bottom z-10 relative bottom-0 w-full h-auto -scale-x-100 pointer-events-none"
          priority
        />
        {/* Diagonal Fade Grid Background - Top Right */}
        <div
          className="absolute inset-0 z-0 dark:hidden block"
          style={{
            backgroundImage: `
linear-gradient(to right, hsl(200deg,30%, 80%) 1px, transparent 1px),
linear-gradient(to bottom, hsl(200deg,30%, 80%) 1px, transparent 1px)
`,
            backgroundSize: "32px 32px",
            WebkitMaskImage:
              "radial-gradient(ellipse 80% 80% at 100% 0%, #000 50%, transparent 90%)",
            maskImage:
              "radial-gradient(ellipse 80% 80% at 100% 0%, #000 50%, transparent 90%)",
          }}
        />
        <div
          className="absolute inset-0 z-0 hidden dark:block"
          style={{
            backgroundImage: `
linear-gradient(to right, #222222 1px, transparent 1px),
linear-gradient(to bottom, #222222 1px, transparent 1px)
`,
            backgroundSize: "32px 32px",
            WebkitMaskImage:
              "radial-gradient(ellipse 80% 80% at 100% 0%, #000 50%, transparent 90%)",
            maskImage:
              "radial-gradient(ellipse 80% 80% at 100% 0%, #000 50%, transparent 90%)",
          }}
        />
      </div>

      <div className="max-w-6xl xl:max-w-7xl mx-auto w-full relative z-10">
        <div className="max-w-2xl sm:mb-64">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-slate-900 dark:text-white leading-tight"
            >
              Turn Luxury Car Inquiries Into{" "}
              <span className="text-blue-500">Confirmed Bookings</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-lg md:text-xl text-slate-600 dark:text-gray-400 mb-8 leading-relaxed"
            >
              We help UAE luxury car rental companies increase their booking
              rate by fixing what most agencies ignore: conversion, follow-up,
              and WhatsApp response speed.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="flex flex-col sm:flex-row gap-4"
            >
              <ScanningButton
                variant="primary"
                size="lg"
                color="blue"
                trackingLocation="hero"
                trackingProps={{
                  page: "home",
                  section: "hero",
                }}
              >
                <Link href="/book">Book a Strategy Call</Link>
              </ScanningButton>

              <button
                onClick={scrollToSystem}
                className="group flex items-center justify-center gap-2 px-6 py-4 text-slate-700 dark:text-gray-300 hover:text-blue-500 dark:hover:text-blue-400 transition-colors font-medium bg-white/50 dark:bg-black/30 backdrop-blur-sm rounded-lg"
              >
                See How It Works
                <CaretDown
                  className="w-4 h-4 group-hover:translate-y-1 transition-transform"
                  weight="bold"
                />
              </button>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
