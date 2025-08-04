"use client";

import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import {
  MessageSquare,
  Brain,
  BarChart3,
  Workflow,
  Check,
  Zap,
} from "lucide-react";

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
}

const features: Feature[] = [
  {
    id: "whatsapp",
    title: "WhatsApp Team Inbox",
    description: "Centralize all WhatsApp conversations in one organized team inbox. Never miss a customer message again with smart routing and real-time collaboration.",
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
      "Real-time customer context and history",
      "Team performance analytics",
    ],
    screenshot: {
      placeholder: "WhatsApp Team Inbox Interface - Shows unified conversation view with team assignments, customer details, and message history",
      aspectRatio: "16/9"
    }
  },
  {
    id: "ai",
    title: "Smart AI Assistant",
    description: "24/7 AI-powered chatbot that handles customer inquiries, books appointments, and qualifies leads automatically. Trained on your business data for accurate responses.",
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
    }
  },
  {
    id: "pipeline",
    title: "Visual Sales Pipeline",
    description: "Track every deal from inquiry to close with a visual pipeline. Drag-and-drop interface makes it easy to manage opportunities and forecast revenue.",
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
    }
  },
  {
    id: "automation",
    title: "Smart Automation",
    description: "Automate repetitive tasks and follow-ups with intelligent workflows. Capture leads from all channels and nurture them automatically.",
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
      "Automated follow-up campaigns",
      "Performance tracking and optimization",
    ],
    screenshot: {
      placeholder: "Automation Workflow Builder - Shows visual workflow creation with triggers, conditions, and actions",
      aspectRatio: "16/10"
    }
  },
];

// Feature Section Component
const FeatureSection: React.FC<{
  feature: Feature;
  index: number;
  setActiveFeature: (index: number) => void;
}> = ({ feature, index, setActiveFeature }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, {
    margin: "-20% 0px -20% 0px",
    amount: 0.3
  });

  console.log('test')

  useEffect(() => {
    if (isInView) {
      setActiveFeature(index);
    }
  }, [isInView, index, setActiveFeature]);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      viewport={{ once: true, margin: "-100px" }}
      className="relative flex items-center"
    >
      {/* Feature Content */}
      <div className="space-y-6">
        {/* Icon and Title */}
        <div className="flex items-start gap-4">
          <div className={`p-3 rounded-2xl bg-gradient-to-br ${feature.color.bg} ${feature.color.text} shrink-0`}>
            {feature.icon}
          </div>
          <div>
            <h3 className="text-3xl font-bold text-white mb-2">
              {feature.title}
            </h3>
            <div className={`w-20 h-1 bg-gradient-to-r ${feature.color.gradient} rounded-full`}></div>
          </div>
        </div>

        {/* Description */}
        <p className="text-lg text-zinc-300 leading-relaxed">
          {feature.description}
        </p>

        {/* Bullet Points */}
        <div className="space-y-3 pt-2">
          {feature.details.map((detail, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.2, delay: idx * 0.05 }}
              viewport={{ once: true }}
              className="flex items-start gap-3"
            >
              <Check className={`w-5 h-5 ${feature.color.text} flex-shrink-0 mt-0.5`} />
              <p className="text-zinc-300">{detail}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

const StreamlinedFeatures: React.FC = () => {
  const [activeFeature, setActiveFeature] = useState(0);

  return (
    <section className="relative text-white py-24">
      {/* Header */}
      <div className="relative z-10 text-center mb-16 px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto"
        >
          <div className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-sm font-medium mb-8">
            <Zap className="w-4 h-4" />
            Core Features
          </div>
          <h2 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
            <span className="">
              Everything You Need to Win
            </span>
          </h2>
          <p className="text-xl md:text-2xl text-zinc-400 leading-relaxed max-w-3xl mx-auto">
            Four powerful features that work together to transform your customer relationships
          </p>
        </motion.div>
      </div>

      {/* Two Column Layout */}
      <div className="relative z-10 max-w-7xl mx-auto px-4">
        <div className="grid py-20 lg:grid-cols-2 gap-12 lg:gap-20">
          
          {/* Left Column - Scrolling Features */}
          <div className="space-y-80">
            {features.map((feature, index) => (
              <FeatureSection
                key={feature.id}
                feature={feature}
                index={index}
                setActiveFeature={setActiveFeature}
              />
            ))}
          </div>

          {/* Right Column - Sticky Image */}
          <div className="hidden lg:block relative">
            <div className="sticky top-80 flex items-center">
              <div className="w-full">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={features[activeFeature].id}
                    initial={{ opacity: 0, scale: 0.98 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.98 }}
                    transition={{ duration: 0.2 }}
                    className="relative"
                  >
                  {/* Image Container */}
                  <div className={`rounded-2xl overflow-hidden bg-gradient-to-br ${features[activeFeature].color.bg} backdrop-blur-xl border ${features[activeFeature].color.border} p-1`}>
                    <div className="rounded-xl overflow-hidden bg-zinc-900/80 aspect-[16/10]">
                      <div className="w-full h-full flex items-center justify-center p-8">
                        <div className="text-center space-y-4">
                          <div className={`inline-flex p-4 rounded-2xl bg-white/5 ${features[activeFeature].color.text}`}>
                            {features[activeFeature].icon}
                          </div>
                          <p className="text-zinc-400 text-sm max-w-md mx-auto">
                            {features[activeFeature].screenshot.placeholder}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Progress Indicators */}
                  <div className="absolute -left-8 top-1/2 -translate-y-1/2 space-y-4">
                    {features.map((_, index) => (
                      <motion.div
                        key={index}
                        className={`w-1 h-12 rounded-full transition-all duration-300 ${
                          index === activeFeature 
                            ? `bg-gradient-to-b ${features[activeFeature].color.gradient} opacity-100` 
                            : 'bg-zinc-700 opacity-40'
                        }`}
                        animate={{
                          scaleY: index === activeFeature ? 1 : 0.5,
                        }}
                        transition={{ duration: 0.15 }}
                      />
                    ))}
                  </div>

                  {/* Feature Number */}
                  <div className={`absolute -top-4 -right-4 w-12 h-12 rounded-full bg-gradient-to-br ${features[activeFeature].color.gradient} flex items-center justify-center text-black font-bold text-lg`}>
                    {activeFeature + 1}
                  </div>
                  
                  {/* Debug - remove this later */}
                  <div className="absolute top-4 left-4 bg-black/50 text-white px-2 py-1 rounded text-sm">
                    Active: {activeFeature}
                  </div>
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>
          </div>

          {/* Mobile Image - Shows inline */}
          <div className="lg:hidden">
            {features.map((feature, index) => (
              <motion.div
                key={feature.id}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}
                className={`rounded-2xl overflow-hidden bg-gradient-to-br ${feature.color.bg} backdrop-blur-xl border ${feature.color.border} p-1 mb-32`}
              >
                <div className="rounded-xl overflow-hidden bg-zinc-900/80 aspect-[16/10]">
                  <div className="w-full h-full flex items-center justify-center p-8">
                    <div className="text-center space-y-4">
                      <div className={`inline-flex p-4 rounded-2xl bg-white/5 ${feature.color.text}`}>
                        {feature.icon}
                      </div>
                      <p className="text-zinc-400 text-sm">
                        {feature.screenshot.placeholder}
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default StreamlinedFeatures;
