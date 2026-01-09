"use client";

import React from "react";
import { motion } from "framer-motion";
import { LogoMarquee, type Logo } from "@/components/ui/LogoMarquee";

const clientLogos: Logo[] = [
  { src: "/logos/4Matic.jpg", alt: "4Matic", width: 100 },
  { src: "/logos/ASUS.png", alt: "ASUS", width: 90 },
  { src: "/logos/Casapons.png", alt: "Casapons", width: 120 },
  { src: "/logos/DXtreme.svg", alt: "DXtreme", width: 110 },
  { src: "/logos/TFG.png", alt: "TFG", width: 80 },
  { src: "/logos/Tick.webp", alt: "Tick", width: 90 },
  { src: "/logos/wyz-logo.png", alt: "WYZ", width: 100 },
  { src: "/logos/packman_Logo.png", alt: "Packman", width: 110 },
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
          Trusted by luxury car rental businesses across the UAE
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
