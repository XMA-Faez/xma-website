"use client";

import React from "react";
import { motion } from "framer-motion";
import {
  Globe,
  FilmStrip,
  Target,
  WhatsappLogo,
  Database,
} from "phosphor-react";
import Section from "@/components/ui/section";

const systemComponents = [
  {
    icon: Globe,
    title: "Conversion-Optimized Website",
    description: "Built to push visitors toward action, not just look good.",
  },
  {
    icon: FilmStrip,
    title: "High-End Ad Creatives",
    description:
      "Video, graphics, and photography aligned with luxury perception.",
  },
  {
    icon: Target,
    title: "Paid Ads That Qualify Leads",
    description: "No cheap clicks. No random traffic.",
  },
  {
    icon: WhatsappLogo,
    title: "WhatsApp Automation That Feels Human",
    description: "Instant replies without sounding robotic.",
  },
  {
    icon: Database,
    title: "Custom CRM Built for Rentals",
    description: "Every inquiry tracked. Every opportunity followed.",
  },
];

const SolutionSection = () => {
  return (
    <Section id="luxury-booking-system" size="xl">
      <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-start">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <span className="text-sm uppercase tracking-wider text-blue-500 font-semibold mb-4 block">
            The System
          </span>
          <h2 className="text-4xl md:text-5xl font-semibold text-slate-900 dark:text-white mb-6 leading-[1.1]">
            The Luxury Booking System
          </h2>
          <p className="text-lg text-slate-600 dark:text-gray-400 mb-8">
            Everything we do is designed to increase your booking rate.
          </p>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            viewport={{ once: true }}
            className="text-slate-500 dark:text-gray-500 border-t border-slate-200 dark:border-white/10 pt-6 mt-8"
          >
            This is not a list of services.{" "}
            <span className="text-slate-900 dark:text-white font-semibold">
              It&apos;s one system.
            </span>
          </motion.p>
        </motion.div>

        <div className="space-y-8">
          {systemComponents.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.1 * index }}
              viewport={{ once: true }}
              className="flex gap-5"
            >
              <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-blue-500/10 flex items-center justify-center">
                <item.icon className="w-6 h-6 text-blue-500" weight="duotone" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-1">
                  {item.title}
                </h3>
                <p className="text-slate-600 dark:text-gray-400">
                  {item.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </Section>
  );
};

export default SolutionSection;
