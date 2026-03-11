"use client";

import React from "react";
import { motion } from "framer-motion";
import { Search, Map, Palette, Code, Rocket } from "lucide-react";
import { Badge } from "@/components/ui/Badge";

interface ProcessStep {
  id: string;
  stepNumber: string;
  title: string;
  description: string;
  icon: React.ReactNode;
}

const processSteps: ProcessStep[] = [
  {
    id: "discovery",
    stepNumber: "01",
    title: "Discovery & Research",
    description:
      "We learn your business, your customers, and your competitors. No assumptions.",
    icon: <Search className="w-6 h-6" />,
  },
  {
    id: "strategy",
    stepNumber: "02",
    title: "Strategy & Planning",
    description:
      "Sitemap, wireframes, and a clear roadmap. You'll know exactly what's coming.",
    icon: <Map className="w-6 h-6" />,
  },
  {
    id: "design",
    stepNumber: "03",
    title: "Design & Feedback",
    description:
      "Custom designs presented for your input. We iterate until it's right.",
    icon: <Palette className="w-6 h-6" />,
  },
  {
    id: "development",
    stepNumber: "04",
    title: "Development & QA",
    description:
      "Built on Next.js & Sanity CMS. Fast, secure, and easy for you to update.",
    icon: <Code className="w-6 h-6" />,
  },
  {
    id: "launch",
    stepNumber: "05",
    title: "Launch & Support",
    description:
      "We don't disappear after launch. SEO, performance monitoring, and ongoing optimization.",
    icon: <Rocket className="w-6 h-6" />,
  },
];

const ProcessTimeline: React.FC = () => {
  return (
    <section className="relative py-16 sm:py-20 md:py-24 lg:py-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center mb-12 md:mb-20"
        >
          <Badge variant="primary" className="mb-6">
            <Rocket className="w-4 h-4" />
            Our Process
          </Badge>
          <h2 className="text-3xl md:text-5xl font-bold mb-4 text-white">
            From Concept to Launch
            <span className="bg-gradient-to-r from-blue-400 to-blue-600 bg-clip-text text-transparent">
              {" "}
              and Beyond
            </span>
          </h2>
          <p className="text-xl text-zinc-400 max-w-2xl mx-auto">
            A structured, collaborative process designed to get you live without
            the headaches
          </p>
        </motion.div>

        <div className="hidden md:block relative">
          <div className="flex items-start justify-between relative">
            <div className="absolute top-12 left-[10%] right-[10%] h-0.5 bg-gradient-to-r from-blue-500/20 via-blue-500/40 to-blue-500/20" />

            {processSteps.map((step, index) => (
              <motion.div
                key={step.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.15 }}
                viewport={{ once: true }}
                className="flex flex-col items-center text-center relative z-10 w-1/5 px-2"
              >
                <div className="relative mb-6">
                  <div className="w-24 h-24 rounded-2xl bg-gradient-to-br from-blue-500/10 to-sky-400/5 border border-blue-500/20 flex items-center justify-center backdrop-blur-sm">
                    <span className="text-blue-400">{step.icon}</span>
                  </div>
                  <div className="absolute -top-2 -right-2 w-8 h-8 rounded-full bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center text-white text-xs font-bold shadow-lg shadow-blue-500/30">
                    {step.stepNumber}
                  </div>
                </div>
                <h3 className="text-lg font-bold text-white mb-2">
                  {step.title}
                </h3>
                <p className="text-sm text-zinc-400 leading-relaxed">
                  {step.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>

        <div className="md:hidden relative">
          <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-blue-500/20 via-blue-500/40 to-blue-500/20" />

          <div className="space-y-8">
            {processSteps.map((step, index) => (
              <motion.div
                key={step.id}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="flex gap-6 relative"
              >
                <div className="relative z-10 flex-shrink-0">
                  <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-blue-500/10 to-sky-400/5 border border-blue-500/20 flex items-center justify-center backdrop-blur-sm">
                    <span className="text-blue-400">{step.icon}</span>
                  </div>
                  <div className="absolute -top-1 -right-1 w-6 h-6 rounded-full bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center text-white text-[10px] font-bold shadow-lg shadow-blue-500/30">
                    {step.stepNumber}
                  </div>
                </div>

                <div className="flex-1 pt-2">
                  <h3 className="text-lg font-bold text-white mb-1">
                    {step.title}
                  </h3>
                  <p className="text-sm text-zinc-400 leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProcessTimeline;
