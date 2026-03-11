"use client";

import React from "react";
import { motion } from "framer-motion";
import { Check, Search, Instagram } from "lucide-react";
import { Badge } from "@/components/ui/Badge";

interface PlatformPanel {
  title: string;
  icon: React.ReactNode;
  capabilities: string[];
  accentColor: string;
}

const platforms: PlatformPanel[] = [
  {
    title: "Google Ads",
    icon: <Search className="w-8 h-8" />,
    capabilities: [
      "Search Ads",
      "Display Network",
      "YouTube Ads",
      "Shopping Ads",
      "Performance Max",
    ],
    accentColor: "amber",
  },
  {
    title: "Meta Ads",
    icon: <Instagram className="w-8 h-8" />,
    capabilities: [
      "Facebook Ads",
      "Instagram Ads",
      "Lookalike Audiences",
      "Retargeting",
      "Lead Forms",
    ],
    accentColor: "amber",
  },
];

const PlatformShowcase: React.FC = () => {
  return (
    <section className="relative py-12 sm:py-16 md:py-20 lg:py-24">
      <div className="relative z-10 text-center px-4 mb-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto"
        >
          <Badge variant="warning" size="lg" className="mb-6 md:mb-8">
            <Search className="w-3 h-3 sm:w-4 sm:h-4" />
            <span className="text-xs sm:text-sm">Platforms We Master</span>
          </Badge>

          <h2 className="text-3xl md:text-5xl font-bold mb-4 text-white">
            Dominate Every
            <span className="bg-gradient-to-r from-amber-400 to-amber-600 bg-clip-text text-transparent">
              {" "}
              Ad Platform
            </span>
          </h2>
          <p className="text-lg md:text-xl text-zinc-300 max-w-3xl mx-auto">
            We run high-performing campaigns across both major advertising
            platforms to maximize your reach and ROI
          </p>
        </motion.div>
      </div>

      <div className="relative z-10 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
          {platforms.map((platform, index) => (
            <motion.div
              key={platform.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.15 }}
              viewport={{ once: true }}
              className="p-6 sm:p-8 rounded-2xl sm:rounded-3xl glass-primary border border-amber-500/20 bg-gradient-to-br from-amber-500/5 to-yellow-400/5"
            >
              <div className="flex items-center gap-4 mb-6">
                <div className="p-3 sm:p-4 rounded-xl sm:rounded-2xl bg-gradient-to-br from-amber-500/10 to-yellow-400/5 text-amber-400">
                  {platform.icon}
                </div>
                <h3 className="text-2xl sm:text-3xl font-bold text-white">
                  {platform.title}
                </h3>
              </div>

              <ul className="space-y-3 sm:space-y-4">
                {platform.capabilities.map((capability, capIndex) => (
                  <motion.li
                    key={capability}
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{
                      duration: 0.3,
                      delay: index * 0.15 + capIndex * 0.08,
                    }}
                    viewport={{ once: true }}
                    className="flex items-center gap-3"
                  >
                    <div className="flex-shrink-0 w-6 h-6 rounded-full bg-amber-500/20 flex items-center justify-center">
                      <Check className="w-3.5 h-3.5 text-amber-400" />
                    </div>
                    <span className="text-base sm:text-lg text-zinc-300">
                      {capability}
                    </span>
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PlatformShowcase;
