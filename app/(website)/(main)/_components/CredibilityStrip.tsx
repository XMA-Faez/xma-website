"use client";

import { motion } from "framer-motion";
import Section from "@/components/ui/section";
import { LogoMarquee, type Logo } from "@/components/ui/LogoMarquee";

const clientLogos: Logo[] = [
  { src: "/logos/4MAticlogo.png", alt: "4Matic", height: 40 },
  { src: "/logos/ASUS-logo.png", alt: "ASUS", height: 30 },
  { src: "/logos/DXtreme.png", alt: "DXtreme", height: 40 },
  { src: "/logos/Tick.webp", alt: "Tick", height: 45 },
  { src: "/logos/packman_Logo.png", alt: "Packman", height: 60 },
  { src: "/logos/dreamdrives-logo.svg", alt: "Dream Drives", height: 50 },
  { src: "/logos/baggagetaxi.webp", alt: "Baggage Taxi", height: 50 },
  { src: "/logos/nbf-logo.png", alt: "NBF", height: 50 },
];

const stats = [
  { value: "50+", label: "Campaigns Managed" },
  { value: "$2M+", label: "Revenue Generated" },
  { value: "30+", label: "Clients Served" },
];

export default function CredibilityStrip() {
  return (
    <Section size="xl" padding="sm">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="border-y border-white/10 py-12"
      >
        <p className="text-center text-sm uppercase tracking-widest text-zinc-500 mb-10">
          Trusted by growth-focused companies
        </p>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          viewport={{ once: true }}
          className="mb-12"
        >
          <LogoMarquee logos={clientLogos} speed="normal" />
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 max-w-3xl mx-auto">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="text-center"
            >
              <div className="text-3xl md:text-4xl font-bold text-white mb-2">
                {stat.value}
              </div>
              <div className="text-sm text-zinc-500">{stat.label}</div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </Section>
  );
}
