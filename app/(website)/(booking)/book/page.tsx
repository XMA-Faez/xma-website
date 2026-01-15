"use client";

import React from "react";
import { motion } from "framer-motion";
import BookingIframe from "./_components/BookingIframe";
import { useBookingTracking } from "@/hooks/useBookingTracking";

export default function BookPage() {
  useBookingTracking({ bookingType: "strategy" });
  return (
    <div className="min-h-screen w-full relative bg-white dark:bg-black">
      {/* Light mode background */}
      <div
        className="absolute inset-0 z-0 dark:hidden"
        style={{
          background:
            "radial-gradient(ellipse 80% 60% at 50% 0%, oklch(0.6 0.15 250 / 0.15), transparent 70%), oklch(0.98 0.01 250)",
        }}
      />
      {/* Dark mode background */}
      <div
        className="absolute inset-0 z-0 hidden dark:block"
        style={{
          background:
            "linear-gradient(35deg, oklch(0 0 0) 0%, oklch(0.15 0.05 250) 50%, oklch(0 0 0) 100%)",
        }}
      />

      {/* Header Section */}
      <section className="relative pt-32 pb-16 px-4">
        <div className="relative max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-4xl md:text-6xl font-bold mb-6 text-slate-900 dark:text-white">
              Book Your Discovery Call
            </h1>
            <p className="text-xl text-slate-600 dark:text-gray-400 max-w-2xl mx-auto mb-8">
              Ready to transform your business? Schedule a free consultation with our experts and discover how we can accelerate your growth.
            </p>
            <div className="flex items-center justify-center gap-4 text-sm text-slate-500 dark:text-gray-500 mb-12">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                <span>30-minute call</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-emerald-400 rounded-full"></div>
                <span>Free consultation</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-purple-400 rounded-full"></div>
                <span>Custom strategy</span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Booking Widget Section */}
      <section className="relative pb-24 px-4">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="bg-slate-50/50 dark:bg-zinc-900/50 backdrop-blur-sm border border-slate-200 dark:border-zinc-800 rounded-2xl p-8"
          >
            <div className="mb-6 text-center">
              <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">Choose Your Preferred Time</h3>
              <p className="text-slate-600 dark:text-gray-400">Select a time that works best for you from our available slots</p>
            </div>

            <BookingIframe className="rounded-lg overflow-hidden" />
          </motion.div>
        </div>
      </section>

      {/* What to Expect Section */}
      <section className="relative py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-4">What to Expect</h2>
            <p className="text-slate-600 dark:text-gray-400">Here's what we'll cover during your discovery call</p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: "Business Analysis",
                description: "We'll analyze your current situation, challenges, and growth opportunities.",
                icon: "📊"
              },
              {
                title: "Custom Strategy",
                description: "Get a tailored roadmap designed specifically for your business needs.",
                icon: "🎯"
              },
              {
                title: "Next Steps",
                description: "Leave with clear action items and a path forward to achieve your goals.",
                icon: "🚀"
              }
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.5 + index * 0.1 }}
                className="text-center p-6 bg-slate-50/50 dark:bg-zinc-900/30 backdrop-blur-sm border border-slate-200 dark:border-zinc-800 rounded-xl"
              >
                <div className="text-4xl mb-4">{item.icon}</div>
                <h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-2">{item.title}</h3>
                <p className="text-slate-600 dark:text-gray-400">{item.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
