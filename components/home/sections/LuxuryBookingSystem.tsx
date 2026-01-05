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
import Section from "./Section";

const systemComponents = [
  {
    number: "01",
    icon: Globe,
    title: "Conversion-Optimized Website",
    description: "Built to push visitors toward action, not just look good.",
    color: "text-blue-400",
    bgColor: "bg-blue-500/10",
    borderColor: "border-blue-500/20",
  },
  {
    number: "02",
    icon: FilmStrip,
    title: "High-End Ad Creatives",
    description:
      "Video, graphics, and photography aligned with luxury perception.",
    color: "text-purple-400",
    bgColor: "bg-purple-500/10",
    borderColor: "border-purple-500/20",
  },
  {
    number: "03",
    icon: Target,
    title: "Paid Ads That Actually Qualify Leads",
    description: "No cheap clicks. No random traffic.",
    color: "text-emerald-400",
    bgColor: "bg-emerald-500/10",
    borderColor: "border-emerald-500/20",
  },
  {
    number: "04",
    icon: WhatsappLogo,
    title: "WhatsApp Automation That Feels Human",
    description: "Instant replies, follow-ups, and lead routing—without sounding robotic.",
    color: "text-green-400",
    bgColor: "bg-green-500/10",
    borderColor: "border-green-500/20",
  },
  {
    number: "05",
    icon: Database,
    title: "Custom CRM Built for Rentals",
    description: "Every inquiry tracked. Every opportunity followed.",
    color: "text-orange-400",
    bgColor: "bg-orange-500/10",
    borderColor: "border-orange-500/20",
  },
];

const LuxuryBookingSystem = () => {
  return (
    <Section id="luxury-booking-system" size="xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="text-sm uppercase tracking-wider text-blue-500 font-semibold mb-4 block">
            The System
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-slate-900 dark:text-white mb-4">
            The Luxury <span className="text-blue-500">Booking System</span>
          </h2>
          <p className="text-lg text-slate-600 dark:text-gray-400 max-w-2xl mx-auto">
            Everything we do is designed to increase your booking rate.
          </p>
        </motion.div>

        {/* System flow visualization */}
        <div className="relative">
          {/* Connection line - visible on larger screens */}
          <div className="hidden lg:block absolute top-1/2 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-blue-500/30 to-transparent -translate-y-1/2 z-0" />

          <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-6 relative z-10">
            {systemComponents.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 * index }}
                viewport={{ once: true }}
                className="group relative"
              >
                <div
                  className={`h-full p-6 rounded-2xl bg-white dark:bg-white/5 backdrop-blur-sm border ${item.borderColor} hover:border-blue-500/40 transition-all duration-300`}
                >
                  {/* Number badge */}
                  <div
                    className={`absolute -top-3 -right-3 w-8 h-8 rounded-full ${item.bgColor} flex items-center justify-center border ${item.borderColor}`}
                  >
                    <span className={`text-xs font-bold ${item.color}`}>
                      {item.number}
                    </span>
                  </div>

                  <div
                    className={`w-12 h-12 rounded-xl ${item.bgColor} flex items-center justify-center mb-4`}
                  >
                    <item.icon
                      className={`w-6 h-6 ${item.color}`}
                      weight="duotone"
                    />
                  </div>

                  <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2 leading-tight">
                    {item.title}
                  </h3>

                  <p className="text-sm text-slate-600 dark:text-gray-400 leading-relaxed">
                    {item.description}
                  </p>
                </div>

                {/* Arrow connector - visible between items on large screens */}
                {index < systemComponents.length - 1 && (
                  <div className="hidden lg:block absolute top-1/2 -right-3 transform -translate-y-1/2 z-20">
                    <div className="w-6 h-6 rounded-full bg-white dark:bg-black border border-slate-200 dark:border-white/10 flex items-center justify-center">
                      <svg
                        className="w-3 h-3 text-blue-500"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9 5l7 7-7 7"
                        />
                      </svg>
                    </div>
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          viewport={{ once: true }}
          className="text-center mt-16"
        >
          <div className="inline-block px-8 py-4 rounded-2xl bg-slate-50/80 dark:bg-white/5 backdrop-blur-sm border border-slate-200 dark:border-white/10">
            <p className="text-slate-600 dark:text-gray-400 mb-1">
              This is not a list of services.
            </p>
            <p className="text-xl font-bold text-slate-900 dark:text-white">
              It&apos;s <span className="text-blue-500">one system</span>.
            </p>
          </div>
        </motion.div>
    </Section>
  );
};

export default LuxuryBookingSystem;
