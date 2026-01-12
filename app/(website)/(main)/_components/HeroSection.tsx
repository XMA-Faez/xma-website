"use client";

import React from "react";
import { motion } from "framer-motion";
import { ScanningButton } from "@/components/ui/ScanningButton";
import Link from "next/link";
import { CaretDown } from "phosphor-react";
import Image from "next/image";
import BlackGradient from "@/public/black-gradient.jpg";

const HeroSection = () => {
  const scrollToSystem = () => {
    const systemSection = document.getElementById("luxury-booking-system");
    if (systemSection) {
      systemSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section className="relative md:min-h-screen flex items-center pt-20 pb-8 md:pb-24 px-4 min-h-[720px]">
      {/* Premium Black Gradient Background */}
      <div className="absolute inset-0 z-0">
        <Image
          src={BlackGradient}
          alt=""
          fill
          className="object-cover pointer-events-none select-none"
          priority
        />
      </div>

      {/* Background Image */}
      <div className="absolute inset-0 z-10">
        <Image
          src="/porsche.png"
          alt="Luxury Porsche"
          className="object-contain absolute bottom-0 right-0 w-full max-w-[103rem] object-bottom -scale-x-100 pointer-events-none select-none"
          priority
          width={1000}
          height={1000}
        />
      </div>

      <div className="max-w-6xl xl:max-w-7xl mx-auto w-full relative z-10">
        <div className="max-w-2xl mb-16 sm:mb-64">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="heading-hero pb-2"
            >
              Turn Luxury Car Inquiries Into Confirmed Bookings
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
              className="flex flex-col items-start sm:flex-row gap-4"
            >
              <ScanningButton
                variant="primary"
                size="sm"
                color="white"
                trackingLocation="hero"
                trackingProps={{
                  page: "home",
                  section: "hero",
                }}
              >
                <Link href="/book">Book a Strategy Call</Link>
              </ScanningButton>

              <ScanningButton
                onClick={scrollToSystem}
                variant="outline"
                color="white"
                size="sm"
                className="flex"
              >
                See How It Works
              </ScanningButton>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
