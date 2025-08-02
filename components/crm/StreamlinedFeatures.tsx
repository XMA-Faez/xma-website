"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  MessageSquare,
  Brain,
  BarChart3,
  Workflow,
  ArrowRight,
  ChevronDown,
  Check,
  Zap,
} from "lucide-react";
import { ScanningButton } from "@/components/ui/ScanningButton";

interface Feature {
  id: string;
  title: string;
  problem: string;
  solution: string;
  benefit: string;
  stat: {
    value: string;
    label: string;
  };
  icon: React.ReactNode;
  color: {
    bg: string;
    text: string;
    border: string;
    gradient: string;
  };
  details: string[];
}

const features: Feature[] = [
  {
    id: "whatsapp",
    title: "WhatsApp Team Inbox",
    problem: "Missing messages, confused customers, lost sales",
    solution: "All WhatsApp conversations in one organized place",
    benefit: "Never miss a customer message again",
    stat: {
      value: "90%",
      label: "of UAE businesses use WhatsApp",
    },
    icon: <MessageSquare className="w-8 h-8" />,
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
      "Real-time customer context",
    ],
  },
  {
    id: "ai",
    title: "Smart AI Assistant",
    problem: "Can't respond instantly, losing leads overnight",
    solution: "AI trained on your business handles inquiries 24/7",
    benefit: "Capture leads even while you sleep",
    stat: {
      value: "95%",
      label: "accurate responses",
    },
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
    ],
  },
  {
    id: "pipeline",
    title: "Visual Sales Pipeline",
    problem: "Deals falling through cracks, no visibility",
    solution: "Visual pipeline shows exactly where each deal stands",
    benefit: "Close 67% more deals with clear visibility",
    stat: {
      value: "67%",
      label: "more deals closed",
    },
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
    ],
  },
  {
    id: "automation",
    title: "Smart Automation",
    problem: "Manual follow-ups, missed opportunities",
    solution: "Smart workflows capture and nurture every lead",
    benefit: "3x faster response time to leads",
    stat: {
      value: "3x",
      label: "faster response",
    },
    icon: <Workflow className="w-8 h-8" />,
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
      "Zero leads missed guarantee",
    ],
  },
];

const StreamlinedFeatures: React.FC = () => {
  const [expandedCards, setExpandedCards] = useState<string[]>([]);

  const toggleCard = (id: string) => {
    setExpandedCards((prev) =>
      prev.includes(id) ? prev.filter((cardId) => cardId !== id) : [...prev, id]
    );
  };

  return (
    <section className="relative text-white py-24 overflow-hidden">
      {/* Header */}
      <div className="relative z-10 text-center mb-16 px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto"
        >
          <div className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-sm font-medium mb-8">
            <Zap className="w-4 h-4" />
            Core Features
          </div>
          <h2 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
            <span className="bg-gradient-to-r from-emerald-400 to-green-300 bg-clip-text text-transparent">
              Never Miss Another Lead
            </span>
          </h2>
          <p className="text-xl md:text-2xl text-zinc-400 leading-relaxed max-w-3xl mx-auto">
            Four powerful features that work together
          </p>
        </motion.div>
      </div>

      {/* Feature Cards Grid */}
      <div className="relative z-10 max-w-7xl mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={feature.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="group relative"
            >
              <div
                className={`relative overflow-hidden rounded-3xl bg-gradient-to-br ${feature.color.bg} backdrop-blur-xl border ${feature.color.border} p-8 h-full transition-all duration-300 hover:border-opacity-50`}
              >
                {/* Icon and Title */}
                <div className="flex items-start gap-4 mb-6">
                  <div className={`p-3 rounded-2xl bg-white/5 ${feature.color.text}`}>
                    {feature.icon}
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-white mb-2">
                      {feature.title}
                    </h3>
                    <div className={`w-16 h-1 bg-gradient-to-r ${feature.color.gradient} rounded-full`}></div>
                  </div>
                </div>

                {/* Problem → Solution → Benefit */}
                <div className="space-y-4 mb-6">
                  <div>
                    <p className="text-sm text-zinc-500 uppercase tracking-wider mb-1">Problem</p>
                    <p className="text-zinc-300">{feature.problem}</p>
                  </div>
                  <div>
                    <p className="text-sm text-zinc-500 uppercase tracking-wider mb-1">Solution</p>
                    <p className="text-white font-medium">{feature.solution}</p>
                  </div>
                  <div className={`p-4 rounded-xl bg-gradient-to-r ${feature.color.bg} border ${feature.color.border}`}>
                    <p className={`${feature.color.text} font-semibold text-lg`}>
                      {feature.benefit}
                    </p>
                  </div>
                </div>

                {/* Stat */}
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-3">
                    <div className={`text-3xl font-bold ${feature.color.text}`}>
                      {feature.stat.value}
                    </div>
                    <div className="text-sm text-zinc-400">{feature.stat.label}</div>
                  </div>
                  <button
                    onClick={() => toggleCard(feature.id)}
                    className="flex items-center gap-2 text-sm text-zinc-400 hover:text-white transition-colors"
                  >
                    More details
                    <ChevronDown
                      className={`w-4 h-4 transition-transform duration-300 ${
                        expandedCards.includes(feature.id) ? "rotate-180" : ""
                      }`}
                    />
                  </button>
                </div>

                {/* Expandable Details */}
                <AnimatePresence>
                  {expandedCards.includes(feature.id) && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.3 }}
                      className="border-t border-white/10 pt-6"
                    >
                      <div className="space-y-3">
                        {feature.details.map((detail, idx) => (
                          <div key={idx} className="flex items-start gap-3">
                            <Check className={`w-5 h-5 ${feature.color.text} flex-shrink-0 mt-0.5`} />
                            <p className="text-sm text-zinc-300">{detail}</p>
                          </div>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StreamlinedFeatures;
