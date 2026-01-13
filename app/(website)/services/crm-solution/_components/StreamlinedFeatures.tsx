"use client";

import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import {
  MessageCircle,
  Brain,
  BarChart3,
  Workflow,
  Check,
  Zap,
  Activity,
} from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import {
  PipelineVisualization,
  WhatsAppInboxDemo,
  AIAssistantDemo,
  AutomationFlowDemo,
} from "./feature-demos";

interface Feature {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  color: {
    bg: string;
    text: string;
    border: string;
    gradient: string;
  };
  details: string[];
  screenshot: {
    placeholder: string;
    aspectRatio: string;
  };
  demoComponent?: React.ComponentType;
}

const features: Feature[] = [
  {
    id: "omnichannel",
    title: "Omni-Channel Inbox",
    description: "Unite all customer conversations from WhatsApp, Instagram, SMS, and Email into one powerful inbox where every message gets handled instantly.",
    icon: <MessageCircle />,
    color: {
      bg: "from-emerald-500/10 to-green-400/5",
      text: "text-emerald-400",
      border: "border-emerald-500/20",
      gradient: "from-emerald-400 to-green-400",
    },
    details: [
      "Unified inbox for all channels",
      "Smart routing to the right team member",
      "Quick replies with templates and media",
      "Real-time customer context and history",
      "Channel-specific performance analytics",
    ],
    screenshot: {
      placeholder: "Omni-Channel Inbox Interface - Shows unified conversation view across WhatsApp, Instagram, SMS, and Email with team assignments",
      aspectRatio: "16/9"
    },
    demoComponent: WhatsAppInboxDemo
  },
  {
    id: "ai",
    title: "Smart AI Assistant",
    description: "Watch your AI assistant instantly qualify leads, book appointments, and provide perfect responses while you sleep - converting inquiries into revenue 24/7.",
    icon: <Brain />,
    color: {
      bg: "from-blue-500/10 to-cyan-400/5",
      text: "text-blue-400",
      border: "border-blue-500/20",
      gradient: "from-blue-400 to-cyan-400",
    },
    details: [
      "Learns your services, pricing, and policies",
      "Books appointments automatically",
      "Smooth handoff to humans when needed",
      "Identifies and scores high-value leads",
      "Multilingual support (Arabic & English)",
    ],
    screenshot: {
      placeholder: "AI Assistant Chat Interface - Shows natural conversation flow, appointment booking, and automated responses",
      aspectRatio: "9/16"
    },
    demoComponent: AIAssistantDemo
  },
  {
    id: "pipeline",
    title: "Visual Sales Pipeline",
    description: "See exactly which deals will close this month and watch your revenue grow as opportunities automatically progress from lead to paying customer.",
    icon: <BarChart3 />,
    color: {
      bg: "from-purple-500/10 to-pink-400/5",
      text: "text-purple-400",
      border: "border-purple-500/20",
      gradient: "from-purple-400 to-pink-400",
    },
    details: [
      "Drag & drop deal management",
      "AI-powered lead prioritization",
      "Revenue forecasting and insights",
      "Automated deal stage updates",
      "Team collaboration tools",
    ],
    screenshot: {
      placeholder: "Sales Pipeline Dashboard - Shows deals in different stages, revenue metrics, and upcoming actions",
      aspectRatio: "16/9"
    },
    demoComponent: PipelineVisualization
  },
  {
    id: "automation",
    title: "Smart Automation",
    description: "Turn hours of manual follow-up work into seconds of automated perfection. Watch leads get qualified, routed, and scheduled without touching your keyboard.",
    icon: <Activity />,
    color: {
      bg: "from-amber-500/10 to-yellow-400/5",
      text: "text-amber-400",
      border: "border-amber-500/20",
      gradient: "from-amber-400 to-yellow-400",
    },
    details: [
      "Multi-channel lead capture",
      "Behavioral trigger sequences",
      "Smart team notifications",
      "Automated follow-up campaigns",
      "Performance tracking and optimization",
    ],
    screenshot: {
      placeholder: "Automation Workflow Builder - Shows visual workflow creation with triggers, conditions, and actions",
      aspectRatio: "16/10"
    },
    demoComponent: AutomationFlowDemo
  },
];


const StreamlinedFeatures: React.FC = () => {
  return (
    <section className="relative py-12 sm:py-16 md:py-20 lg:py-24">
      {/* Header */}
      <div className="relative z-10 text-center px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto"
        >
          <Badge variant="success" size="lg" className="mb-6 md:mb-8">
            <Zap className="w-3 h-3 sm:w-4 sm:h-4" />
            <span className="text-xs sm:text-sm">Core Features</span>
          </Badge>
        </motion.div>
      </div>

      {/* Full Width Layout */}
      <div className="relative z-10 px-4 sm:px-6 lg:px-8">
        {features.map((feature, index) => (
          <motion.div
            key={feature.id}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="mb-12 sm:mb-16 md:mb-20 lg:mb-24 last:mb-0"
          >
            <div className="max-w-7xl mx-auto">
              {/* Feature Introduction */}
              <div className="text-center mb-8 sm:mb-12 md:mb-16">
                <div className="flex items-center justify-center mb-4 sm:mb-6">
                  <div className={`p-3 sm:p-4 rounded-xl sm:rounded-2xl bg-gradient-to-br ${feature.color.bg} ${feature.color.text}`}>
                    <div className="w-6 h-6 sm:w-8 sm:h-8">
                      {React.cloneElement(feature.icon as React.ReactElement, { className: "w-full h-full" })}
                    </div>
                  </div>
                  <div className={`ml-2 sm:ml-4 w-12 sm:w-16 md:w-20 h-0.5 sm:h-1 bg-gradient-to-r ${feature.color.gradient} rounded-full`}></div>
                  <div className={`ml-2 sm:ml-4 w-6 h-6 sm:w-8 sm:h-8 rounded-full bg-gradient-to-br ${feature.color.gradient} flex items-center justify-center text-white font-bold text-xs sm:text-sm`}>
                    {index + 1}
                  </div>
                </div>
                <h3 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-slate-900 dark:text-white mb-3 sm:mb-4 px-2">
                  {feature.title}
                </h3>
                <p className="text-base sm:text-lg md:text-xl text-slate-600 dark:text-zinc-300 max-w-3xl mx-auto px-2">
                  {feature.description}
                </p>
              </div>

              {/* Demo Container - Now Full Width */}
              <div className={`rounded-xl sm:rounded-2xl md:rounded-3xl overflow-hidden bg-gradient-to-br ${feature.color.bg} backdrop-blur-xl border ${feature.color.border} p-1 sm:p-1.5 md:p-2 mb-6 sm:mb-8 md:mb-12`}>
                <div className="rounded-lg sm:rounded-xl md:rounded-2xl overflow-hidden bg-white/80 dark:bg-zinc-900/80 backdrop-blur-sm">
                  {feature.demoComponent ? (
                    <div className="w-full">
                      {React.createElement(feature.demoComponent!)}
                    </div>
                  ) : (
                    <div className="aspect-[16/9] flex items-center justify-center p-6 sm:p-8 md:p-12">
                      <div className="text-center space-y-4 sm:space-y-6">
                        <div className={`inline-flex p-4 sm:p-5 md:p-6 rounded-xl sm:rounded-2xl bg-slate-200/50 dark:bg-white/5 ${feature.color.text}`}>
                          <div className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12">
                            {React.cloneElement(feature.icon as React.ReactElement, { className: "w-full h-full" })}
                          </div>
                        </div>
                        <p className="text-sm sm:text-base text-slate-500 dark:text-zinc-400 max-w-md mx-auto px-4">
                          {feature.screenshot.placeholder}
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Feature Benefits */}
              {/* <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"> */}
              {/*   {feature.details.map((detail, idx) => ( */}
              {/*     <motion.div */}
              {/*       key={idx} */}
              {/*       initial={{ opacity: 0, y: 20 }} */}
              {/*       whileInView={{ opacity: 1, y: 0 }} */}
              {/*       transition={{ duration: 0.4, delay: idx * 0.1 }} */}
              {/*       viewport={{ once: true }} */}
              {/*       className="flex items-start gap-3 p-4 rounded-xl bg-slate-50/50 dark:bg-zinc-800/50" */}
              {/*     > */}
              {/*       <Check className={`w-5 h-5 ${feature.color.text} flex-shrink-0 mt-0.5`} /> */}
              {/*       <p className="text-slate-700 dark:text-zinc-300">{detail}</p> */}
              {/*     </motion.div> */}
              {/*   ))} */}
              {/* </div> */}
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default StreamlinedFeatures;
