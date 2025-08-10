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
} from "@/components/crm/feature-demos";

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
    id: "whatsapp",
    title: "WhatsApp Team Inbox",
    description: "Transform scattered WhatsApp chaos into an organized system where every message gets handled instantly and no lead ever falls through the cracks.",
    icon: <MessageCircle className="w-8 h-8" />,
    color: {
      bg: "from-emerald-500/10 to-green-400/5",
      text: "text-emerald-400",
      border: "border-emerald-500/20",
      gradient: "from-emerald-400 to-green-400",
    },
    details: [
      "Shared team inbox with full conversation history",
      "Smart routing to the right team member",
      "Quick replies with templates and media",
      "Real-time customer context and history",
      "Team performance analytics",
    ],
    screenshot: {
      placeholder: "WhatsApp Team Inbox Interface - Shows unified conversation view with team assignments, customer details, and message history",
      aspectRatio: "16/9"
    },
    demoComponent: WhatsAppInboxDemo
  },
  {
    id: "ai",
    title: "Smart AI Assistant",
    description: "Watch your AI assistant instantly qualify leads, book appointments, and provide perfect responses while you sleep - converting inquiries into revenue 24/7.",
    icon: <Brain className="w-8 h-8" />,
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
    icon: <BarChart3 className="w-8 h-8" />,
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
    icon: <Activity className="w-8 h-8" />,
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
    <section className="relative py-24">
      {/* Header */}
      <div className="relative z-10 text-center px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto"
        >
          <Badge variant="success" size="lg" className="mb-8">
            <Zap className="w-4 h-4" />
            Core Features
          </Badge>
        </motion.div>
      </div>

      {/* Full Width Layout */}
      <div className="relative z-10 px-4">
        {features.map((feature, index) => (
          <motion.div
            key={feature.id}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="mb-24 last:mb-0"
          >
            <div className="max-w-7xl mx-auto">
              {/* Feature Introduction */}
              <div className="text-center mb-16">
                <div className="flex items-center justify-center mb-6">
                  <div className={`p-4 rounded-2xl bg-gradient-to-br ${feature.color.bg} ${feature.color.text}`}>
                    {feature.icon}
                  </div>
                  <div className={`ml-4 w-20 h-1 bg-gradient-to-r ${feature.color.gradient} rounded-full`}></div>
                  <div className={`ml-4 w-8 h-8 rounded-full bg-gradient-to-br ${feature.color.gradient} flex items-center justify-center text-white font-bold`}>
                    {index + 1}
                  </div>
                </div>
                <h3 className="text-4xl md:text-5xl font-bold text-slate-900 dark:text-white mb-4">
                  {feature.title}
                </h3>
                <p className="text-xl text-slate-600 dark:text-zinc-300 max-w-3xl mx-auto">
                  {feature.description}
                </p>
              </div>

              {/* Demo Container - Now Full Width */}
              <div className={`rounded-3xl overflow-hidden bg-gradient-to-br ${feature.color.bg} backdrop-blur-xl border ${feature.color.border} p-2 mb-12`}>
                <div className="rounded-2xl overflow-hidden bg-white/80 dark:bg-zinc-900/80 backdrop-blur-sm">
                  {feature.demoComponent ? (
                    <div className="w-full">
                      {React.createElement(feature.demoComponent!)}
                    </div>
                  ) : (
                    <div className="aspect-[16/9] flex items-center justify-center p-12">
                      <div className="text-center space-y-6">
                        <div className={`inline-flex p-6 rounded-2xl bg-slate-200/50 dark:bg-white/5 ${feature.color.text}`}>
                          {feature.icon}
                        </div>
                        <p className="text-slate-500 dark:text-zinc-400 max-w-md mx-auto">
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
