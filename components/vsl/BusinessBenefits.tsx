// components/BusinessBenefits.jsx
"use client";

import React from "react";
import { motion } from "framer-motion";
import {
  TrendingUp,
  Clock,
  BrainCircuit,
  Lightbulb,
  BarChart4,
  CreditCard,
} from "lucide-react";

const benefits = [
  {
    icon: <TrendingUp className="w-10 h-10 text-red-500" />,
    title: "Consistent Growth",
    description:
      "Stop the feast-famine cycle with a steady flow of qualified leads every month",
  },
  {
    icon: <Clock className="w-10 h-10 text-red-500" />,
    title: "Save Time",
    description:
      "Free yourself from day-to-day marketing tasks while your business grows",
  },
  {
    icon: <BrainCircuit className="w-10 h-10 text-red-500" />,
    title: "AI-Powered",
    description: "Leverage cutting-edge AI technology to engage leads 24/7",
  },
  {
    icon: <Lightbulb className="w-10 h-10 text-red-500" />,
    title: "Expert Strategy",
    description: "Benefit from our proven system developed over 5+ years",
  },
  {
    icon: <BarChart4 className="w-10 h-10 text-red-500" />,
    title: "Measurable Results",
    description: "Track every lead and conversion with comprehensive analytics",
  },
  {
    icon: <CreditCard className="w-10 h-10 text-red-500" />,
    title: "Risk-Free",
    description:
      "Full satisfaction guarantee means zero risk for your business",
  },
];

const BusinessBenefits = () => {
  return (
    <div className="py-16">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl font-bold bg-gradient-to-r from-red-600 to-red-500 bg-clip-text text-transparent mb-4">
            Why Choose Our System?
          </h2>
          <p className="text-xl text-zinc-400 max-w-2xl mx-auto">
            Transform your business with our proven marketing approach
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {benefits.map((benefit, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="bg-zinc-900/30 rounded-xl p-6 backdrop-blur-sm border border-zinc-800 hover:border-red-600/50 transition-all duration-300"
            >
              <div className="flex flex-col items-center text-center">
                <div className="mb-4 bg-zinc-800/50 p-4 rounded-full">
                  {benefit.icon}
                </div>
                <h3 className="text-xl font-semibold mb-2">{benefit.title}</h3>
                <p className="text-zinc-400">{benefit.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BusinessBenefits;
