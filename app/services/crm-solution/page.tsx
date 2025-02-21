"use client";

import React from "react";
import { motion } from "framer-motion";
import {
  Bot,
  Users,
  MessageSquare,
  GitBranch,
  CheckCircle,
  Settings,
} from "lucide-react";
import Link from "next/link";

const CRMSolutionsPage = () => {
  const features = [
    {
      icon: <MessageSquare className="w-6 h-6" />,
      title: "WhatsApp Integration",
      description: "Seamless communication with automated responses",
    },
    {
      icon: <Bot className="w-6 h-6" />,
      title: "AI Chatbot",
      description: "Intelligent automated customer interactions",
    },
    {
      icon: <GitBranch className="w-6 h-6" />,
      title: "Sales Pipeline",
      description: "Customized sales funnels and workflows",
    },
    {
      icon: <Users className="w-6 h-6" />,
      title: "Lead Management",
      description: "Comprehensive lead tracking and nurturing",
    },
  ];

  const benefits = [
    {
      title: "Lead Capture",
      description: "Automated collection and organization of leads",
      items: [
        "Form Integration",
        "Social Media Lead Capture",
        "WhatsApp Lead Collection",
        "Multi-channel Tracking",
      ],
    },
    {
      title: "Lead Qualification",
      description: "Smart scoring and prioritization system",
      items: [
        "Automated Scoring",
        "Behavior Tracking",
        "Engagement Metrics",
        "Priority Assignment",
      ],
    },
    {
      title: "Communication",
      description: "Integrated messaging and follow-up",
      items: [
        "Automated Responses",
        "Template Management",
        "Multi-channel Engagement",
        "Response Tracking",
      ],
    },
    {
      title: "Conversion",
      description: "Tools to convert leads into customers",
      items: [
        "Sales Pipeline",
        "Follow-up Automation",
        "Performance Analytics",
        "Conversion Tracking",
      ],
    },
  ];

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Hero Section */}
      <div className="relative h-[70vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-black to-transparent z-10" />
        <div className="absolute inset-0">
          <div className="w-full h-full bg-[url('/api/placeholder/1920/1080')] bg-cover bg-center" />
        </div>
        <div className="relative z-20 text-center px-4">
          <motion.h1
            className="font-bold bg-gradient-to-r from-red-600 to-red-500 bg-clip-text text-transparent mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            CRM Solutions
          </motion.h1>
          <motion.p
            className="text-xl md:text-2xl text-zinc-300 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            Transform your lead management with intelligent automation
          </motion.p>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-20 bg-zinc-900/50">
        <div className="max-w-6xl mx-auto px-4">
          <motion.h2
            className="text-3xl font-bold text-center text-white mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            Key Features
          </motion.h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                className="bg-black/40 backdrop-blur-sm border border-zinc-800/60 rounded-lg p-6 hover:border-red-600/50 transition-colors"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <div className="text-red-500 mb-4">{feature.icon}</div>
                <h3 className="text-xl font-semibold text-white mb-2">
                  {feature.title}
                </h3>
                <p className="text-zinc-400">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* System Integration Section */}
      <div className="py-20">
        <div className="max-w-6xl mx-auto px-4">
          <motion.h2
            className="text-3xl font-bold text-center text-white mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            Complete Lead Management
          </motion.h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {benefits.map((benefit, index) => (
              <motion.div
                key={index}
                className="bg-zinc-900/50 rounded-lg p-6 border border-zinc-800/60"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <h3 className="text-xl font-semibold text-white mb-2">
                  {benefit.title}
                </h3>
                <p className="text-zinc-400 mb-4">{benefit.description}</p>
                <ul className="grid grid-cols-2 gap-2">
                  {benefit.items.map((item, itemIndex) => (
                    <li
                      key={itemIndex}
                      className="flex items-center gap-2 text-zinc-300"
                    >
                      <CheckCircle className="w-4 h-4 text-red-500" />
                      {item}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Integration Timeline */}
      <div className="py-20 bg-zinc-900/50">
        <div className="max-w-4xl mx-auto px-4">
          <motion.h2
            className="text-3xl font-bold text-center text-white mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            Implementation Process
          </motion.h2>
          <div className="space-y-8">
            <motion.div
              className="flex items-start gap-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0 }}
            >
              <div className="bg-red-500/10 rounded-full p-2">
                <Settings className="w-6 h-6 text-red-500" />
              </div>
              <div>
                <h3 className="text-xl font-semibold text-white">
                  System Integration
                </h3>
                <p className="text-zinc-400">
                  Setting up and customizing your CRM environment
                </p>
              </div>
            </motion.div>
            <motion.div
              className="flex items-start gap-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <div className="bg-red-500/10 rounded-full p-2">
                <MessageSquare className="w-6 h-6 text-red-500" />
              </div>
              <div>
                <h3 className="text-xl font-semibold text-white">
                  WhatsApp Integration
                </h3>
                <p className="text-zinc-400">
                  Connecting messaging systems for automated responses
                </p>
              </div>
            </motion.div>
            <motion.div
              className="flex items-start gap-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <div className="bg-red-500/10 rounded-full p-2">
                <Bot className="w-6 h-6 text-red-500" />
              </div>
              <div>
                <h3 className="text-xl font-semibold text-white">
                  Chatbot Configuration
                </h3>
                <p className="text-zinc-400">
                  Setting up AI-powered customer interactions
                </p>
              </div>
            </motion.div>
            <motion.div
              className="flex items-start gap-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <div className="bg-red-500/10 rounded-full p-2">
                <GitBranch className="w-6 h-6 text-red-500" />
              </div>
              <div>
                <h3 className="text-xl font-semibold text-white">
                  Pipeline Setup
                </h3>
                <p className="text-zinc-400">
                  Creating customized sales funnels and workflows
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="py-20">
        <motion.div
          className="max-w-3xl mx-auto px-4 text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl font-bold text-white mb-6">
            Ready to Streamline Your Business?
          </h2>
          <p className="text-xl text-zinc-400 mb-8">
            Let's set up your automated CRM solution today
          </p>
          <Link href="/proposal">
            <button className="bg-red-600 hover:bg-red-700 text-white px-8 py-3 rounded-lg font-semibold transition-colors">
              Get Started
            </button>
          </Link>
        </motion.div>
      </div>
    </div>
  );
};

export default CRMSolutionsPage;
