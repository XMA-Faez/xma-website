"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { CaretDown, CurrencyDollar, Clock, Package, Handshake } from "phosphor-react";
import { ScanningButton } from "@/components/ui/ScanningButton";
import BookingIframe from "@/components/vsl/BookingIframe";

const faqCategories = [
  {
    id: "timeline",
    name: "Timeline & Process",
    icon: Clock,
    questions: [
      {
        q: "How long does it take to launch my campaigns?",
        a: "Our typical timeline is 4 weeks: Week 1 for kickoff and content strategy, Weeks 2-3 for production and CRM setup, and Week 4 for launch preparation. We can expedite this process if needed."
      },
      {
        q: "What's involved in the onboarding process?",
        a: "We have 4 key meetings: 90-minute kickoff for brand deep-dive, 60-minute content strategy session, 45-minute production review, and 60-minute launch preparation. Each includes specific deliverables to ensure success."
      },
      {
        q: "How quickly can I expect to see results?",
        a: "With our automated CRM and instant lead response system, you'll start capturing leads immediately upon campaign launch. Conversion optimization typically shows significant results within the first 2-4 weeks."
      }
    ]
  },
  {
    id: "deliverables",
    name: "Deliverables & Support",
    icon: Package,
    questions: [
      {
        q: "What's included in monthly subscriptions?",
        a: "Depending on your tier, you get CRM subscription, ad management, monthly graphics (1-8), WhatsApp marketing, AI chatbot, and video content. All plans include performance monitoring and optimization."
      },
      {
        q: "Do you provide training for the CRM system?",
        a: "Yes! Training and support are included with all CRM setups. We provide hands-on walkthroughs, documentation, and ongoing support to ensure your team can effectively use all features."
      }
    ]
  },
  {
    id: "working",
    name: "Working Together",
    icon: Handshake,
    questions: [
      {
        q: "What makes your agency different from others?",
        a: "We're a full in-house team of 15 professionals including videographers, editors, developers, designers, and marketing experts. We've generated 30K+ leads and managed 3M+ AED in ad spend for 50+ clients."
      },
      {
        q: "How do you ensure my ads will perform?",
        a: "We focus on what works: attention-grabbing hooks (80% of success), clear value propositions, and strong CTAs. We test multiple variations and continuously optimize based on real performance data."
      },
      {
        q: "Can you integrate with my existing Meta ads?",
        a: "Absolutely! Our CRM seamlessly integrates with Facebook and Instagram ads, automatically capturing leads, triggering instant responses via chatbot, and organizing everything in one central system."
      }
    ]
  },
  {
    id: "pricing",
    name: "Pricing & Budget",
    icon: CurrencyDollar,
    questions: [
      {
        q: "How do you determine project costs?",
        a: "Every business has unique needs. We offer flexible packages and will provide a detailed, transparent quote after understanding your specific goals during our consultation. Book a call to discuss your budget and requirements."
      }
    ]
  }
];

export default function FAQ() {
  const [activeCategory, setActiveCategory] = useState("timeline");
  const [openQuestions, setOpenQuestions] = useState<string[]>([]);

  const toggleQuestion = (questionId: string) => {
    setOpenQuestions(prev =>
      prev.includes(questionId)
        ? prev.filter(id => id !== questionId)
        : [...prev, questionId]
    );
  };

  const currentCategory = faqCategories.find(cat => cat.id === activeCategory);

  return (
    <section className="relative min-h-screen py-24 px-4 overflow-hidden">
      <div className="relative max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="rounded-3xl p-8 md:p-12 backdrop-blur-3xl">
            <h2 className="text-5xl md:text-6xl/[1.3] font-bold mb-4 bg-gradient-to-r from-slate-900 to-blue-600 dark:from-white dark:to-blue-400 bg-clip-text text-transparent drop-shadow-lg">
              Frequently Asked Questions
            </h2>
            <p className="text-xl text-slate-700 dark:text-white/90 max-w-2xl mx-auto drop-shadow-sm">
              Everything you need to know about working with us
            </p>
          </div>
        </motion.div>

        {/* Category tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          viewport={{ once: true }}
          className="flex flex-wrap justify-center gap-4 mb-12"
        >
          {faqCategories.map((category) => (
            <motion.button
              key={category.id}
              onClick={() => setActiveCategory(category.id)}
              className={`px-6 py-3 rounded-2xl font-medium transition-all duration-300 flex items-center gap-2 ${
                activeCategory === category.id
                  ? "glass-button-primary electric-glow text-black"
                  : "glass-tertiary text-slate-600 dark:text-gray-400 transition-colors hover:glass-secondary hover:text-slate-900 dark:hover:text-white"
              }`}
            >
              <category.icon className="w-5 h-5" />
              <span>{category.name}</span>
            </motion.button>
          ))}
        </motion.div>

        {/* Questions */}
        <motion.div
          key={activeCategory}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3 }}
          className="max-w-3xl mx-auto space-y-4"
        >
          {currentCategory?.questions.map((item, index) => {
            const questionId = `${activeCategory}-${index}`;
            const isOpen = openQuestions.includes(questionId);

            return (
              <motion.div
                key={questionId}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                className="group"
              >
                <motion.button
                  whileHover={{ scale: 1.01 }}
                  onClick={() => toggleQuestion(questionId)}
                  className={`w-full text-left p-6 rounded-2xl transition-all duration-300 ${
                    isOpen
                      ? "bg-white/80 dark:bg-zinc-800/80 shadow-lg"
                      : "bg-white/50 dark:bg-zinc-900/50 hover:bg-white/70 dark:hover:bg-zinc-800/50"
                  } backdrop-blur-sm border ${
                    isOpen ? "border-blue-500/30" : "border-slate-300 dark:border-zinc-800"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-semibold text-slate-900 dark:text-white pr-4">
                      {item.q}
                    </h3>
                    <motion.div
                      animate={{ rotate: isOpen ? 180 : 0 }}
                      transition={{ duration: 0.3 }}
                      className={`flex-shrink-0 ${
                        isOpen ? "text-blue-400" : "text-slate-600 dark:text-gray-400"
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
                        <p className="mt-4 text-slate-700 dark:text-gray-300 leading-relaxed">
                          {item.a}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.button>
              </motion.div>
            );
          })}
        </motion.div>

        <motion.div
          id="booking-widget"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
          className="mt-16"
        >
          <div className="text-center mb-8">
            <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">
              Still have questions?
            </h3>
            <p className="text-lg text-slate-600 dark:text-gray-400 mb-2">
              Let's discuss your project in detail.  
            </p>
            <p className="text-slate-500 dark:text-gray-500">
              Book a free consultation call with our experts.
            </p>
          </div>
          
          <div className="bg-white/50 dark:bg-zinc-900/50 backdrop-blur-sm border border-slate-300 dark:border-zinc-800 rounded-2xl p-6">
            <BookingIframe className="rounded-lg overflow-hidden" />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
