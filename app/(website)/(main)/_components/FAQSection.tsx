"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CaretDown } from "phosphor-react";
import Section from "@/components/ui/section";

const faqData = [
  {
    id: "1",
    question: "How quickly will I start seeing more bookings?",
    answer:
      "Most clients see their first qualified inquiries within 7-14 days of campaign launch. Booking rates typically improve over the first month as we optimize targeting and refine the messaging based on real conversion data.",
  },
  {
    id: "2",
    question: "What if I've tried marketing agencies before and it didn't work?",
    answer:
      "Most agencies fail in this space because they don't understand the luxury car rental market. They generate clicks, not bookings. We focus specifically on conversion optimization—WhatsApp response speed, follow-up sequences, and qualifying leads before they reach you.",
  },
  {
    id: "3",
    question: "How involved do I need to be?",
    answer:
      "Completely hands-off. We handle everything from strategy to creative to optimization. You'll receive weekly reports and have regular check-ins, but the day-to-day execution is entirely on us.",
  },
  {
    id: "4",
    question: "Do you handle WhatsApp automation?",
    answer:
      "Absolutely. WhatsApp is the primary communication channel for luxury car rentals in the UAE. We set up automated instant replies, follow-up sequences, and lead routing—all designed to feel human and premium, not robotic.",
  },
];

const FAQSection = () => {
  const [openItems, setOpenItems] = useState<string[]>([]);

  const toggleItem = (id: string) => {
    setOpenItems((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  return (
    <Section id="faq" size="md" padding="lg">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="text-center mb-12"
      >
        <span className="text-sm uppercase tracking-wider text-blue-500 font-semibold mb-4 block">
          FAQ
        </span>
        <h2 className="text-4xl md:text-5xl font-semibold text-slate-900 dark:text-white mb-4 leading-[1.1]">
          Common <span className="text-blue-500">Questions</span>
        </h2>
        <p className="text-lg text-slate-600 dark:text-gray-400 max-w-2xl mx-auto">
          Everything you need to know about working with us
        </p>
      </motion.div>

      <div className="space-y-4 max-w-3xl mx-auto">
        {faqData.map((item, index) => {
          const isOpen = openItems.includes(item.id);

          return (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.05 }}
              viewport={{ once: true }}
            >
              <button
                onClick={() => toggleItem(item.id)}
                className={`w-full text-left p-6 rounded-2xl transition-colors ${
                  isOpen
                    ? "bg-slate-100 dark:bg-white/10 border-blue-500/50"
                    : "bg-slate-50 dark:bg-white/5 hover:bg-slate-100 dark:hover:bg-white/[0.07]"
                } border border-slate-200 dark:border-white/10`}
              >
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold text-slate-900 dark:text-white pr-4">
                    {item.question}
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
                        {item.answer}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </button>
            </motion.div>
          );
        })}
      </div>
    </Section>
  );
};

export default FAQSection;
