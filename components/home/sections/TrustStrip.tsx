"use client";

import React from "react";
import { motion } from "framer-motion";
import { PhoneSlash, TrendUp, Crown } from "phosphor-react";
import Section from "./Section";

const trustPoints = [
  {
    icon: PhoneSlash,
    text: "Fewer missed inquiries",
  },
  {
    icon: TrendUp,
    text: "Higher booking rates from the same traffic",
  },
  {
    icon: Crown,
    text: "A brand that looks as premium as your fleet",
  },
];

const TrustStrip = () => {
  return (
    <Section size="lg" padding="sm">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="text-center mb-10"
      >
        <h2 className="text-2xl md:text-3xl font-bold text-slate-900 dark:text-white mb-3">
          Built exclusively for luxury car rental businesses.
        </h2>
        <p className="text-slate-500 dark:text-gray-500">
          Not e-commerce. Not SaaS. Not &quot;one-size-fits-all&quot; marketing.
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.1 }}
        viewport={{ once: true }}
        className="bg-slate-50/80 dark:bg-white/5 backdrop-blur-sm rounded-2xl border border-slate-200 dark:border-white/10 p-8"
      >
        <p className="text-center text-slate-600 dark:text-gray-400 mb-6 font-medium">
          We work with owners who want:
        </p>

        <div className="grid md:grid-cols-3 gap-6">
          {trustPoints.map((point, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.1 * index }}
              viewport={{ once: true }}
              className="flex items-center gap-4 p-4 rounded-xl bg-white dark:bg-white/5 border border-slate-100 dark:border-white/5"
            >
              <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-blue-500/10 flex items-center justify-center">
                <point.icon
                  className="w-5 h-5 text-blue-500"
                  weight="duotone"
                />
              </div>
              <p className="text-slate-700 dark:text-gray-300 font-medium text-sm">
                {point.text}
              </p>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </Section>
  );
};

export default TrustStrip;
