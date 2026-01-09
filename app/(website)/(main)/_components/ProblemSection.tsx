"use client";

import React from "react";
import { motion } from "framer-motion";
import Section from "@/components/ui/section";

const painPoints = [
  "WhatsApp inquiries are answered too slowly",
  "Leads aren't followed up properly",
  "Ads, website, and messaging don't work as one system",
  "Your brand doesn't feel premium enough to justify your prices",
];

const ProblemSection = () => {
  return (
    <Section size="xl">
      <div className="max-w-3xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mb-12"
        >
          <h2 className="text-4xl md:text-5xl lg:text-6xl/[1.2] font-semibold text-slate-900 dark:text-white mb-4">
            Most luxury car rental companies don&apos;t have a traffic problem.
          </h2>
          <p className="text-3xl md:text-4xl font-semibold text-blue-500">
            They have a conversion problem.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.15 }}
          viewport={{ once: true }}
          className="mb-12"
        >
          <p className="text-lg text-slate-600 dark:text-gray-400 mb-8">
            You&apos;re losing bookings because:
          </p>

          <ul className="space-y-4">
            {painPoints.map((point, index) => (
              <motion.li
                key={index}
                initial={{ opacity: 0, x: -10 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4, delay: 0.1 * index }}
                viewport={{ once: true }}
                className="flex items-start gap-4 text-lg text-slate-700 dark:text-gray-300"
              >
                <span className="flex-shrink-0 w-2 h-2 mt-2.5 rounded-full bg-blue-500" />
                {point}
              </motion.li>
            ))}
          </ul>
        </motion.div>

        <motion.blockquote
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true }}
          className="border-l-4 border-blue-500 pl-6 py-2"
        >
          <p className="text-xl md:text-2xl text-slate-700 dark:text-gray-300 italic">
            &ldquo;Most agencies stop at leads. We optimize for bookings.&rdquo;
          </p>
        </motion.blockquote>
      </div>
    </Section>
  );
};

export default ProblemSection;
