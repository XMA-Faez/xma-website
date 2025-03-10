// components/Solutions.jsx
"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Target, FileVideo, Bot, BarChart3, Check, ArrowRight } from 'lucide-react';

const steps = [
  {
    id: 1,
    title: "Strategy Development",
    description: "We deep dive into your business, understand your ideal customers, and craft a tailored marketing strategy that guarantees results.",
    icon: <Target size={32} className="text-red-500" />,
    benefits: [
      "In-depth business analysis",
      "Customer research & targeting",
      "Competitive analysis"
    ],
    solutionFor: [
      "No results from advertising",
      "Unclear marketing direction",
      "Wasted ad spend"
    ]
  },
  {
    id: 2,
    title: "Content Creation",
    description: "Our in-house team creates eye-catching graphics and high-quality videos that speak directly to your ideal prospects.",
    icon: <FileVideo size={32} className="text-red-500" />,
    benefits: [
      "Professional video production",
      "Custom graphic design",
      "Conversion-focused scripting"
    ],
    solutionFor: [
      "Bad production quality",
      "Ineffective content",
      "Low engagement"
    ]
  },
  {
    id: 3,
    title: "CRM & AI Integration",
    description: "We set up a custom CRM and AI WhatsApp chatbot to capture, organize, and nurture leads automatically.",
    icon: <Bot size={32} className="text-red-500" />,
    benefits: [
      "Custom CRM setup",
      "AI WhatsApp chatbot",
      "Automated lead nurturing"
    ],
    solutionFor: [
      "Lead management challenges",
      "Missed follow-ups",
      "Lack of marketing funnel"
    ]
  },
  {
    id: 4,
    title: "Campaign Management",
    description: "Our expert team handles everything from launching, managing, and optimizing your ad campaigns for maximum results.",
    icon: <BarChart3 size={32} className="text-red-500" />,
    benefits: [
      "Full campaign management",
      "Data analysis & optimization",
      "Regular performance reporting"
    ],
    solutionFor: [
      "No results from advertising",
      "Wasted marketing budget",
      "Overwhelming marketing complexity"
    ]
  }
];

const Solutions = () => {
  const [activeStep, setActiveStep] = useState(1);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
      {/* Step Navigator */}
      <div className="order-2 lg:order-1">
        <div className="space-y-6">
          {steps.map((step) => (
            <motion.div
              key={step.id}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: step.id * 0.1 }}
              viewport={{ once: true }}
              className={`cursor-pointer rounded-xl p-4 backdrop-blur-sm border transition-all duration-300 ${
                activeStep === step.id
                  ? "bg-zinc-800/70 border-red-600/50 shadow-lg shadow-red-900/10"
                  : "bg-zinc-900/30 border-zinc-800 hover:border-red-600/30"
              }`}
              onClick={() => setActiveStep(step.id)}
            >
              <div className="flex items-start gap-4">
                <div
                  className={`rounded-lg p-3 transition-colors ${
                    activeStep === step.id ? "bg-red-600/20" : "bg-zinc-800/50"
                  }`}
                >
                  {step.icon}
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-1 flex items-center gap-2">
                    {step.title}
                    {activeStep === step.id && (
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ duration: 0.3 }}
                      >
                        <ArrowRight size={16} className="text-red-500" />
                      </motion.div>
                    )}
                  </h3>
                  <p className="text-zinc-400 text-sm">{step.description}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Step Details */}
      <div className="order-1 lg:order-2 relative min-h-[400px]">
        <AnimatePresence mode="wait">
          {steps.map((step) => (
            activeStep === step.id && (
              <motion.div
                key={step.id}
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                transition={{ 
                  type: "spring", 
                  stiffness: 300, 
                  damping: 30,
                  duration: 0.2 
                }}
                className="bg-zinc-900/50 rounded-xl p-6 backdrop-blur-sm border border-zinc-800 absolute inset-0"
              >
                <div className="flex items-center gap-3 mb-6">
                  <motion.div 
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.3, delay: 0.2 }}
                    className="bg-red-600/20 text-red-500 rounded-lg p-3"
                  >
                    {step.icon}
                  </motion.div>
                  <motion.h3 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: 0.3 }}
                    className="text-2xl font-bold"
                  >
                    Step {step.id}: {step.title}
                  </motion.h3>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: 0.4 }}
                  >
                    <h4 className="text-lg font-semibold mb-3 flex items-center gap-2">
                      <Check size={18} className="text-green-500" />
                      Key Benefits
                    </h4>
                    <ul className="space-y-2">
                      {step.benefits.map((benefit, index) => (
                        <motion.li
                          key={index}
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ duration: 0.2, delay: 0.5 + (index * 0.1) }}
                          className="flex items-center gap-2 text-zinc-300"
                        >
                          <div className="w-1.5 h-1.5 rounded-full bg-red-500"></div>
                          {benefit}
                        </motion.li>
                      ))}
                    </ul>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: 0.5 }}
                  >
                    <h4 className="text-lg font-semibold mb-3 flex items-center gap-2">
                      <Check size={18} className="text-green-500" />
                      Solves These Challenges
                    </h4>
                    <ul className="space-y-2">
                      {step.solutionFor.map((solution, index) => (
                        <motion.li
                          key={index}
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ duration: 0.2, delay: 0.6 + (index * 0.1) }}
                          className="flex items-center gap-2 text-zinc-300"
                        >
                          <div className="w-1.5 h-1.5 rounded-full bg-red-500"></div>
                          {solution}
                        </motion.li>
                      ))}
                    </ul>
                  </motion.div>
                </div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: 0.7 }}
                  className="p-4 rounded-lg bg-zinc-800/50 border border-zinc-700"
                >
                  <p className="text-zinc-300 italic">
                    "This step is critical because it{" "}
                    {step.id === 1
                      ? "sets the foundation for your entire marketing strategy."
                      : step.id === 2
                        ? "creates the engaging content that will capture your audience's attention."
                        : step.id === 3
                          ? "ensures no lead falls through the cracks and every prospect is nurtured."
                          : "maximizes your ROI and consistently brings in quality leads."}
                    "
                  </p>
                </motion.div>
              </motion.div>
            )
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default Solutions;
