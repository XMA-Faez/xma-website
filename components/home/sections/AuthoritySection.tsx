"use client";

import React from "react";
import { motion } from "framer-motion";
import { Timer, WhatsappLogo, ChartLineUp } from "phosphor-react";
import Section from "./Section";

const differentiators = [
  {
    icon: Timer,
    title: "Short Rental Windows",
    description:
      "We understand urgency and price sensitivity in the luxury car rental market.",
    color: "text-blue-400",
    bgColor: "bg-blue-500/10",
  },
  {
    icon: WhatsappLogo,
    title: "WhatsApp-First Design",
    description:
      "Everything we build is optimized for how your customers actually communicate.",
    color: "text-emerald-400",
    bgColor: "bg-emerald-500/10",
  },
  {
    icon: ChartLineUp,
    title: "Booking Flow Focus",
    description:
      "We build systems around actual bookings—not vanity metrics like impressions or clicks.",
    color: "text-purple-400",
    bgColor: "bg-purple-500/10",
  },
];

const AuthoritySection = () => {
  return (
    <Section size="xl">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="text-center mb-16"
      >
        <span className="text-sm uppercase tracking-wider text-blue-500 font-semibold mb-4 block">
          Specialization
        </span>
        <h2 className="text-4xl md:text-5xl font-bold text-slate-900 dark:text-white mb-4">
          We Only Work With{" "}
          <span className="text-blue-500">Car Rental Companies</span>
        </h2>
        <p className="text-lg text-slate-600 dark:text-gray-400 max-w-2xl mx-auto">
          That means everything we do is purpose-built for your industry.
        </p>
      </motion.div>

      <div className="grid md:grid-cols-3 gap-6 mb-12">
        {differentiators.map((item, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 * index }}
            viewport={{ once: true }}
            className="group relative p-8 rounded-2xl bg-slate-50/80 dark:bg-white/5 backdrop-blur-sm border border-slate-200 dark:border-white/10 hover:border-blue-500/30 transition-all duration-300"
          >
            <div
              className={`w-14 h-14 rounded-xl ${item.bgColor} flex items-center justify-center mb-6`}
            >
              <item.icon
                className={`w-7 h-7 ${item.color}`}
                weight="duotone"
              />
            </div>

            <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3">
              {item.title}
            </h3>

            <p className="text-slate-600 dark:text-gray-400 leading-relaxed">
              {item.description}
            </p>
          </motion.div>
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.4 }}
        viewport={{ once: true }}
        className="text-center"
      >
        <p className="text-lg font-medium text-slate-700 dark:text-gray-300">
          This isn&apos;t theory.{" "}
          <span className="text-blue-500">It&apos;s operational experience.</span>
        </p>
      </motion.div>
    </Section>
  );
};

export default AuthoritySection;
