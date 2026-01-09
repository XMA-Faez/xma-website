"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CaretDown } from "phosphor-react";
import { ScanningButton } from "@/components/ui/ScanningButton";
import Link from "next/link";

const faqData = [
  {
    id: "1",
    q: "How quickly will I start seeing more bookings?",
    a: "Most clients see their first qualified inquiries within 7-14 days of campaign launch. Booking rates typically improve over the first month as we optimize targeting and refine the messaging based on real conversion data.",
  },
  {
    id: "2",
    q: "What if I've tried marketing agencies before and it didn't work?",
    a: "Most agencies fail in this space because they don't understand the luxury car rental market. They generate clicks, not bookings. We focus specifically on conversion optimization—WhatsApp response speed, follow-up sequences, and qualifying leads before they reach you.",
  },
  {
    id: "3",
    q: "Do you work with all types of luxury vehicles?",
    a: "Yes. We've worked with exotic sports cars, luxury SUVs, classic cars, and premium sedans. Our targeting and creative approach adapts to your specific fleet and ideal customer profile.",
  },
  {
    id: "4",
    q: "What's the minimum investment?",
    a: "Management fees are customized based on your goals and fleet size. We recommend a minimum ad spend of AED 5,000/month to generate meaningful results. Book a strategy call to get a custom proposal.",
  },
  {
    id: "5",
    q: "How involved do I need to be?",
    a: "Completely hands-off. We handle everything from strategy to creative to optimization. You'll receive weekly reports and have regular check-ins, but the day-to-day execution is entirely on us.",
  },
  {
    id: "6",
    q: "Do you handle WhatsApp automation?",
    a: "Absolutely. WhatsApp is the primary communication channel for luxury car rentals in the UAE. We set up automated instant replies, follow-up sequences, and lead routing—all designed to feel human and premium, not robotic.",
  },
];

const FAQPage = () => {
  const [openFAQ, setOpenFAQ] = useState<string[]>([]);

  const toggleFAQ = (id: string) => {
    setOpenFAQ((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

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

      <section className="relative z-10 pt-32 pb-20 px-4">
        <div className="max-w-3xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-12"
          >
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-semibold text-slate-900 dark:text-white mb-4 leading-[1.1]">
              Frequently Asked{" "}
              <span className="text-blue-500">Questions</span>
            </h1>
            <p className="text-lg text-slate-600 dark:text-gray-400">
              Everything you need to know about working with us
            </p>
          </motion.div>

          <div className="space-y-4">
            {faqData.map((item, index) => {
              const isOpen = openFAQ.includes(item.id);

              return (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                >
                  <motion.button
                    onClick={() => toggleFAQ(item.id)}
                    className={`w-full text-left p-6 rounded-2xl transition-colors ${
                      isOpen
                        ? "bg-slate-100 dark:bg-white/10 border-blue-500/50"
                        : "bg-slate-50 dark:bg-white/5 hover:bg-slate-100 dark:hover:bg-white/7"
                    } border border-slate-200 dark:border-white/10`}
                  >
                    <div className="flex items-center justify-between">
                      <h3 className="text-lg font-semibold text-slate-900 dark:text-white pr-4">
                        {item.q}
                      </h3>
                      <motion.div
                        animate={{ rotate: isOpen ? 180 : 0 }}
                        transition={{ duration: 0.3 }}
                        className={`flex-shrink-0 ${
                          isOpen
                            ? "text-blue-500"
                            : "text-slate-400 dark:text-gray-400"
                        }`}
                      >
                        <CaretDown className="w-5 h-5" />
                      </motion.div>
                    </div>

                    <AnimatePresence>
                      {isOpen && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.3 }}
                          className="overflow-hidden"
                        >
                          <p className="mt-4 text-slate-600 dark:text-gray-300 leading-relaxed">
                            {item.a}
                          </p>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.button>
                </motion.div>
              );
            })}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mt-16 p-8 rounded-2xl bg-blue-500/5 dark:bg-blue-500/10 border border-blue-500/20 text-center"
          >
            <p className="text-slate-600 dark:text-gray-400 mb-4">
              Still have questions?
            </p>
            <ScanningButton
              variant="primary"
              size="md"
              color="blue"
              trackingLocation="faq-page"
              trackingProps={{
                page: "faq",
                section: "bottom-cta",
              }}
            >
              <Link href="/book">Book a Strategy Call</Link>
            </ScanningButton>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default FAQPage;
