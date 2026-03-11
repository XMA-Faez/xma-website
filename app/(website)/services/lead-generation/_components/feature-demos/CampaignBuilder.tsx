"use client";

import React from "react";
import { motion } from "framer-motion";
import {
  Search,
  Users,
  PenTool,
  Rocket,
  Check,
  ArrowRight,
} from "lucide-react";

interface BuilderStep {
  number: number;
  title: string;
  description: string;
  icon: React.ReactNode;
  isComplete: boolean;
  isActive: boolean;
}

const campaignSteps: BuilderStep[] = [
  {
    number: 1,
    title: "Keyword Research",
    description: "High-intent keywords identified",
    icon: <Search className="w-5 h-5" />,
    isComplete: true,
    isActive: false,
  },
  {
    number: 2,
    title: "Audience Setup",
    description: "3 segments configured",
    icon: <Users className="w-5 h-5" />,
    isComplete: true,
    isActive: false,
  },
  {
    number: 3,
    title: "Ad Creatives",
    description: "6 variations ready",
    icon: <PenTool className="w-5 h-5" />,
    isComplete: false,
    isActive: true,
  },
  {
    number: 4,
    title: "Launch",
    description: "Ready to go live",
    icon: <Rocket className="w-5 h-5" />,
    isComplete: false,
    isActive: false,
  },
];

const CampaignBuilder: React.FC = () => {
  return (
    <div className="w-full bg-gradient-to-br from-zinc-900 to-zinc-800 rounded-xl p-4 sm:p-6 md:p-8">
      <div className="mb-6 sm:mb-8">
        <h3 className="text-lg sm:text-xl font-bold text-white">
          Campaign Setup Progress
        </h3>
        <p className="text-zinc-400 text-sm">
          Dubai Real Estate Lead Gen Campaign
        </p>
      </div>

      <div className="relative">
        <div className="hidden md:block absolute top-8 left-0 right-0 h-0.5 bg-zinc-700 z-0" />
        <div
          className="hidden md:block absolute top-8 left-0 h-0.5 bg-gradient-to-r from-amber-500 to-amber-400 z-10 transition-all duration-700"
          style={{ width: "62%" }}
        />

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 sm:gap-6 relative z-20">
          {campaignSteps.map((step, index) => (
            <motion.div
              key={step.number}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.15 }}
              viewport={{ once: true }}
              className="flex flex-col items-center text-center"
            >
              <div
                className={`w-14 h-14 sm:w-16 sm:h-16 rounded-full flex items-center justify-center mb-3 sm:mb-4 border-2 transition-all ${
                  step.isComplete
                    ? "bg-amber-500 border-amber-500 text-white"
                    : step.isActive
                      ? "bg-amber-500/10 border-amber-500 text-amber-400"
                      : "bg-zinc-800 border-zinc-600 text-zinc-500"
                }`}
              >
                {step.isComplete ? (
                  <Check className="w-6 h-6" />
                ) : (
                  step.icon
                )}
              </div>

              <h4
                className={`font-semibold text-sm sm:text-base mb-1 ${
                  step.isComplete || step.isActive
                    ? "text-white"
                    : "text-zinc-500"
                }`}
              >
                {step.title}
              </h4>
              <p
                className={`text-xs sm:text-sm ${
                  step.isComplete
                    ? "text-amber-500"
                    : step.isActive
                      ? "text-amber-400"
                      : "text-zinc-500"
                }`}
              >
                {step.description}
              </p>

              {step.isActive && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.5 }}
                  className="mt-3 px-3 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 text-xs font-medium flex items-center gap-1"
                >
                  In Progress
                  <motion.div
                    animate={{ x: [0, 4, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                  >
                    <ArrowRight className="w-3 h-3" />
                  </motion.div>
                </motion.div>
              )}
            </motion.div>
          ))}
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.6 }}
        viewport={{ once: true }}
        className="mt-6 sm:mt-8 p-4 sm:p-5 rounded-xl bg-zinc-800 border border-zinc-700"
      >
        <div className="flex items-center justify-between mb-3">
          <h4 className="font-semibold text-white text-sm">
            Campaign Details
          </h4>
          <span className="text-xs px-2 py-1 rounded-full bg-amber-500/10 text-amber-400 border border-amber-500/20">
            Step 3 of 4
          </span>
        </div>
        <div className="grid grid-cols-2 gap-3 text-sm">
          <div className="flex justify-between">
            <span className="text-zinc-400">Platform</span>
            <span className="font-medium text-white">
              Google + Meta
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-zinc-400">Budget</span>
            <span className="font-medium text-white">
              15,000 AED/mo
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-zinc-400">Keywords</span>
            <span className="font-medium text-amber-400">148 selected</span>
          </div>
          <div className="flex justify-between">
            <span className="text-zinc-400">
              Audiences
            </span>
            <span className="font-medium text-amber-400">3 segments</span>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default CampaignBuilder;
