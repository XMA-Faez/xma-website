"use client";

import React from "react";
import { motion } from "framer-motion";
import LeadForm from "./_components/LeadForm";

export default function BookPage() {
  return (
    <div className="min-h-screen w-full relative bg-white dark:bg-black">
      <div
        className="absolute inset-0 z-0 dark:hidden"
        style={{
          background:
            "radial-gradient(ellipse 80% 60% at 50% 0%, oklch(0.6 0.15 250 / 0.15), transparent 70%), oklch(0.98 0.01 250)",
        }}
      />
      <div
        className="absolute inset-0 z-0 hidden dark:block"
        style={{
          background:
            "linear-gradient(35deg, oklch(0 0 0) 0%, oklch(0.15 0.05 250) 50%, oklch(0 0 0) 100%)",
        }}
      />

      <section className="relative pt-32 pb-16 px-4">
        <div className="relative max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-4xl md:text-6xl font-bold mb-6 text-slate-900 dark:text-white">
              Get in Touch
            </h1>
            <p className="text-xl text-slate-600 dark:text-gray-400 max-w-2xl mx-auto mb-8">
              Ready to transform your business? Fill out the form below and our
              team will get back to you within 24 hours to discuss how we can
              help.
            </p>
            <div className="flex items-center justify-center gap-4 text-sm text-slate-500 dark:text-gray-500 mb-12">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                <span>Quick response</span>
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

      <section className="relative pb-24 px-4">
        <div className="max-w-2xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="bg-slate-50/50 dark:bg-zinc-900/50 backdrop-blur-sm border border-slate-200 dark:border-zinc-800 rounded-2xl p-8"
          >
            <div className="mb-8 text-center">
              <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">
                Tell Us About Your Project
              </h3>
              <p className="text-slate-600 dark:text-gray-400">
                Share your goals and we&apos;ll show you how we can help
              </p>
            </div>

            <LeadForm source="book_page" />
          </motion.div>
        </div>
      </section>
    </div>
  );
}
