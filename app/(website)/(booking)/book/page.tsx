"use client";

import React from "react";
import { motion } from "motion/react";

export default function BookPage() {
  React.useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://link.xmaboost.com/js/form_embed.js";
    script.type = "text/javascript";
    script.async = true;
    document.body.appendChild(script);

    return () => {
      if (script.parentNode) {
        script.parentNode.removeChild(script);
      }
    };
  }, []);

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
              Book a Call
            </h1>
            <p className="text-xl text-slate-600 dark:text-gray-400 max-w-2xl mx-auto mb-8">
              Pick a time that works for you. We&apos;ll discuss your growth
              goals and show you how XMA can help you get there.
            </p>
            <div className="flex items-center justify-center gap-4 text-sm text-slate-500 dark:text-gray-500 mb-12">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-blue-400 rounded-full" />
                <span>30-minute call</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-emerald-400 rounded-full" />
                <span>Free consultation</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-purple-400 rounded-full" />
                <span>Custom strategy</span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="relative pb-24 px-4">
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="bg-slate-50/50 dark:bg-zinc-900/50 backdrop-blur-sm border border-slate-200 dark:border-zinc-800 rounded-2xl p-8"
          >
            <div className="mb-6 text-center">
              <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">
                Schedule Your Strategy Call
              </h3>
              <p className="text-slate-600 dark:text-gray-400">
                Choose a time and we&apos;ll walk you through how XMA builds
                growth systems for businesses like yours
              </p>
            </div>

            <div className="w-full" style={{ minHeight: "700px" }}>
              <iframe
                src="https://link.xmaboost.com/widget/booking/Tj3i8x3FyT8sQOayn89T"
                style={{
                  width: "100%",
                  height: "700px",
                  border: "none",
                  overflow: "hidden",
                }}
                scrolling="no"
                id="a3mOsZixFuC2B0xuDyJz_1773221535385"
              />
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
