"use client";

import React from "react";
import { motion } from "framer-motion";
import { Check } from "phosphor-react";
import Section from "./Section";

const qualifications = [
  "You own or manage a luxury car rental company in the UAE",
  "You want more confirmed bookings—not more \"leads\"",
  "You care about brand, speed, and operational efficiency",
];

const QualificationSection = () => {
  return (
    <Section size="sm">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-slate-900 dark:text-white mb-4">
            Who This Is <span className="text-blue-500">For</span>
          </h2>
          <p className="text-lg text-slate-600 dark:text-gray-400">
            This is for you if:
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          viewport={{ once: true }}
          className="space-y-4"
        >
          {qualifications.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.1 * index }}
              viewport={{ once: true }}
              className="flex items-start gap-4 p-5 rounded-xl bg-slate-50/80 dark:bg-white/5 backdrop-blur-sm border border-slate-200 dark:border-white/10"
            >
              <div className="flex-shrink-0 w-8 h-8 rounded-full bg-blue-500/10 flex items-center justify-center mt-0.5">
                <Check className="w-4 h-4 text-blue-500" weight="bold" />
              </div>
              <p className="text-lg text-slate-700 dark:text-gray-300 font-medium">
                {item}
              </p>
            </motion.div>
          ))}
        </motion.div>
    </Section>
  );
};

export default QualificationSection;
