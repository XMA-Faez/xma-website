"use client";

import React from "react";
import { motion } from "framer-motion";
import { LogoMarquee, type Logo } from "@/components/ui/LogoMarquee";

const clientLogos: Logo[] = [
  { src: "/logos/4MAticlogo.png", alt: "4Matic", height: 40 },
  { src: "/logos/ASUS-logo.png", alt: "ASUS", height: 30 },
  { src: "/logos/DXtreme.png", alt: "DXtreme", height: 40 },
  { src: "/logos/Tick.webp", alt: "Tick", height: 45 },
  { src: "/logos/packman_Logo.png", alt: "Packman", height: 60 },
  { src: "/logos/dreamdrives-logo.svg", alt: "Dream Drives", height: 50 },
  { src: "/logos/baggagetaxi.webp", alt: "Dream Drives", height: 50 },
  { src: "/logos/nbf-logo.png", alt: "Dream Drives", height: 50 },
];

const SocialProofStrip = () => {
  return (
    <section className="relative w-full py-8 px-4">
      <div className="max-w-7xl mx-auto">
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center text-sm text-slate-500 dark:text-gray-500 mb-6"
        >
          Trusted by businesses across the UAE
        </motion.p>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          viewport={{ once: true }}
        >
          <LogoMarquee logos={clientLogos} speed="normal" />
        </motion.div>
      </div>
    </section>
  );
};

export default SocialProofStrip;
