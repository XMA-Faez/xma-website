"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { CaretDown, CurrencyDollar, Clock, Package, Handshake } from "phosphor-react";
import { ScanningButton } from "@/components/ui/ScanningButton";

const faqCategories = [
  {
    id: "pricing",
    name: "Pricing & Budget",
    icon: CurrencyDollar,
    questions: [
      {
        q: "How much does a typical project cost?",
        a: "Project costs vary based on scope and complexity. We offer flexible packages starting from $5,000 for small businesses to $50,000+ for enterprise solutions. We'll provide a detailed quote after our initial consultation."
      },
      {
        q: "Do you offer payment plans?",
        a: "Yes! We typically work with a 50% upfront payment and 50% upon completion. For larger projects, we can arrange monthly milestones to make budgeting easier."
      },
      {
        q: "Are there any hidden fees?",
        a: "Never. Our quotes are comprehensive and include all discussed features, revisions, and support. Any additional requests will be clearly communicated and approved before proceeding."
      }
    ]
  },
  {
    id: "timeline",
    name: "Timeline & Process",
    icon: Clock,
    questions: [
      {
        q: "How long does a typical project take?",
        a: "Most projects take 6-12 weeks from kickoff to launch. Simple websites can be completed in 4-6 weeks, while complex applications may take 3-4 months. We'll provide a detailed timeline during planning."
      },
      {
        q: "What if I need something urgently?",
        a: "We offer expedited services for urgent projects. Rush delivery typically adds 25-50% to the project cost but can reduce timelines by up to 40%."
      },
      {
        q: "How involved do I need to be during the project?",
        a: "We believe in collaborative development. Expect 1-2 hours per week for reviews and feedback. We handle the heavy lifting while keeping you informed at every milestone."
      }
    ]
  },
  {
    id: "deliverables",
    name: "Deliverables & Support",
    icon: Package,
    questions: [
      {
        q: "What do I get at the end of the project?",
        a: "You receive full ownership of all code, designs, and assets. We provide documentation, training materials, and 30 days of post-launch support included in every project."
      },
      {
        q: "Do you provide ongoing maintenance?",
        a: "Yes! We offer monthly maintenance packages starting at $500/month, including updates, backups, security monitoring, and priority support."
      },
      {
        q: "Can I make changes myself after launch?",
        a: "Absolutely. We build with user-friendly CMSs and provide training. For custom applications, we ensure clean, documented code that any developer can work with."
      }
    ]
  },
  {
    id: "working",
    name: "Working Together",
    icon: Handshake,
    questions: [
      {
        q: "What if I don't like the initial designs?",
        a: "No worries! Our process includes multiple revision rounds. We'll work closely with you to refine the designs until they perfectly match your vision. Major pivots may affect timeline and budget."
      },
      {
        q: "Do you work with international clients?",
        a: "Yes! We work with clients globally. We're flexible with time zones and use tools like Slack, Zoom, and Loom for seamless communication across borders."
      },
      {
        q: "What technologies do you work with?",
        a: "We're technology agnostic and choose the best tools for your project. Our expertise includes React, Next.js, Node.js, Python, and various CMS platforms. We'll recommend the ideal stack for your needs."
      }
    ]
  }
];

export default function FAQ() {
  const [activeCategory, setActiveCategory] = useState("pricing");
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
      <div className="absolute inset-0 bg-gradient-to-b from-zinc-950 via-zinc-900 to-zinc-950" />
      
      {/* Background decoration */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-to-r from-blue-600/10 to-indigo-600/10 rounded-full blur-3xl" />
      
      <div className="relative max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-5xl md:text-6xl font-bold mb-4 bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
            Frequently Asked Questions
          </h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Everything you need to know about working with us
          </p>
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
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setActiveCategory(category.id)}
              className={`px-6 py-3 rounded-xl font-medium transition-all duration-300 flex items-center gap-2 ${
                activeCategory === category.id
                  ? "bg-gradient-to-r from-blue-600 to-blue-500 text-white shadow-lg shadow-blue-500/25"
                  : "bg-zinc-800/50 text-gray-400 hover:bg-zinc-700/50 hover:text-white"
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
                      ? "bg-zinc-800/80 shadow-lg"
                      : "bg-zinc-900/50 hover:bg-zinc-800/50"
                  } backdrop-blur-sm border ${
                    isOpen ? "border-blue-500/30" : "border-zinc-800"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-semibold text-white pr-4">
                      {item.q}
                    </h3>
                    <motion.div
                      animate={{ rotate: isOpen ? 180 : 0 }}
                      transition={{ duration: 0.3 }}
                      className={`flex-shrink-0 ${
                        isOpen ? "text-blue-400" : "text-gray-400"
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
                        <p className="mt-4 text-gray-300 leading-relaxed">
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
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
          className="text-center mt-16"
        >
          <p className="text-lg text-gray-400 mb-2">
            Still have questions?
          </p>
          <p className="text-gray-500 mb-6">
            We're here to help. Let's talk about your project.
          </p>
          <ScanningButton variant="primary" size="md">
            Schedule a Consultation
          </ScanningButton>
        </motion.div>
      </div>
    </section>
  );
}