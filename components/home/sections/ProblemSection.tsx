"use client";

import React from "react";
import { motion } from "framer-motion";
import { Clock, UserMinus, Plugs, Tag } from "phosphor-react";
import Section from "./Section";

const painPoints = [
  {
    icon: Clock,
    text: "WhatsApp inquiries are answered too slowly",
    color: "text-red-400",
    bgColor: "bg-red-500/10",
  },
  {
    icon: UserMinus,
    text: "Leads aren't followed up properly",
    color: "text-orange-400",
    bgColor: "bg-orange-500/10",
  },
  {
    icon: Plugs,
    text: "Ads, website, and messaging don't work as one system",
    color: "text-yellow-400",
    bgColor: "bg-yellow-500/10",
  },
  {
    icon: Tag,
    text: "Your brand doesn't feel premium enough to justify your prices",
    color: "text-purple-400",
    bgColor: "bg-purple-500/10",
  },
];

const ProblemSection = () => {
  return (
    <Section size="lg">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="text-center mb-12"
      >
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-slate-900 dark:text-white mb-4 leading-tight">
          Most luxury car rental companies don&apos;t have a traffic problem.
        </h2>
        <p className="text-2xl md:text-3xl font-bold text-blue-500">
          They have a conversion problem.
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.1 }}
        viewport={{ once: true }}
        className="mb-12"
      >
        <p className="text-center text-lg text-slate-600 dark:text-gray-400 mb-8">
          You&apos;re losing bookings because:
        </p>

        <div className="grid md:grid-cols-2 gap-4">
          {painPoints.map((point, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.1 * index }}
              viewport={{ once: true }}
              className="flex items-center gap-4 p-5 rounded-xl bg-slate-50/80 dark:bg-white/5 backdrop-blur-sm border border-slate-200 dark:border-white/10 hover:border-slate-300 dark:hover:border-white/20 transition-colors"
            >
              <div
                className={`flex-shrink-0 w-12 h-12 rounded-xl ${point.bgColor} flex items-center justify-center`}
              >
                <point.icon
                  className={`w-6 h-6 ${point.color}`}
                  weight="duotone"
                />
              </div>
              <p className="text-slate-700 dark:text-gray-300 font-medium">
                {point.text}
              </p>
            </motion.div>
          ))}
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.3 }}
        viewport={{ once: true }}
        className="text-center"
      >
        <div className="inline-block px-8 py-4 rounded-2xl bg-blue-500/5 dark:bg-blue-500/10 border border-blue-500/20">
          <p className="text-slate-600 dark:text-gray-400">
            Most agencies stop at{" "}
            <span className="text-slate-400 dark:text-gray-500 line-through">
              &quot;leads.&quot;
            </span>
          </p>
          <p className="text-xl font-bold text-blue-500 mt-1">
            We optimize for bookings.
          </p>
        </div>
      </motion.div>
    </Section>
  );
};

export default ProblemSection;
