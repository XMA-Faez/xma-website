"use client";

import React from "react";
import { motion } from "framer-motion";
import Section from "./Section";

const placeholderLogos = [
  { name: "Client 1", width: 120 },
  { name: "Client 2", width: 100 },
  { name: "Client 3", width: 130 },
  { name: "Client 4", width: 110 },
  { name: "Client 5", width: 120 },
  { name: "Client 6", width: 100 },
];

const ClientLogos = () => {
  return (
    <Section size="lg" padding="sm">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-10"
        >
          <p className="text-slate-500 dark:text-gray-500 font-medium">
            Trusted by luxury car rental businesses across the UAE
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          viewport={{ once: true }}
          className="flex flex-wrap items-center justify-center gap-8 md:gap-12"
        >
          {placeholderLogos.map((logo, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.05 * index }}
              viewport={{ once: true }}
              className="group"
            >
              {/* Placeholder logo - replace with actual client logos */}
              <div
                className="h-10 flex items-center justify-center px-6 rounded-lg bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 grayscale opacity-60 hover:grayscale-0 hover:opacity-100 transition-all duration-300"
                style={{ minWidth: logo.width }}
              >
                <span className="text-slate-400 dark:text-gray-600 text-sm font-medium">
                  {logo.name}
                </span>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Subtle guarantee mention integrated here */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true }}
          className="text-center mt-12 pt-12 border-t border-slate-200 dark:border-white/10"
        >
          <p className="text-sm text-slate-500 dark:text-gray-500">
            <span className="font-medium text-slate-700 dark:text-gray-300">
              Performance-Driven, Not Hope-Driven.
            </span>{" "}
            If agreed KPIs are not met, we continue optimizing at no additional
            cost.
          </p>
          <p className="text-xs text-slate-400 dark:text-gray-600 mt-2">
            No long-term lock-ins. No excuses.
          </p>
        </motion.div>
    </Section>
  );
};

export default ClientLogos;
