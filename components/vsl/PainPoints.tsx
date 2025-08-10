// components/PainPoints.jsx
"use client";

import React from "react";
import { motion } from "framer-motion";
import {
  Target,
  MessageCircle,
  ArrowRight,
  Clock,
  Film,
  LayersIcon,
} from "lucide-react";

const painPoints = [
  {
    id: 1,
    title: "Getting No Results From Advertising",
    description:
      "Despite spending thousands on ads, you're not seeing the qualified leads or ROI you expect.",
    icon: <Target className="w-8 h-8 text-red-500" />,
  },
  {
    id: 2,
    title: "Organic Content Isn't Working",
    description:
      "Creating content regularly but not seeing engagement or conversions from your efforts.",
    icon: <MessageCircle className="w-8 h-8 text-red-500" />,
  },
  {
    id: 3,
    title: "Lack of Proper Marketing Funnel",
    description:
      "Missing the systems to capture, nurture, and convert leads efficiently.",
    icon: <ArrowRight className="w-8 h-8 text-red-500" />,
  },
  {
    id: 4,
    title: "Struggling with Lead Management",
    description:
      "Leads come in but fall through the cracks without proper follow-up systems.",
    icon: <Clock className="w-8 h-8 text-red-500" />,
  },
  {
    id: 5,
    title: "Bad Production Quality",
    description:
      "Your marketing content doesn't match the quality and professionalism of your brand.",
    icon: <Film className="w-8 h-8 text-red-500" />,
  },
  {
    id: 6,
    title: "Overwhelming Marketing Complexity",
    description:
      "Trying to manage multiple platforms, tools, and strategies without a unified approach or expertise.",
    icon: <LayersIcon className="w-8 h-8 text-red-500" />,
  },
];

const PainPoints = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {painPoints.map((point, index) => (
        <motion.div
          key={point.id}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.5,
            type: "tween",
            ease: "easeInOut",
            delay: index * 0.1,
          }}
          viewport={{ once: true }}
          className="bg-zinc-900/50 rounded-xl p-6 backdrop-blur-sm border border-zinc-800 hover:border-red-600/30 transition-colors duration-300 hover:shadow-lg hover:shadow-red-900/10"
        >
          <div className="flex flex-col h-full">
            <div className="bg-zinc-800/50 rounded-lg p-4 w-16 h-16 flex items-center justify-center mb-4">
              {point.icon}
            </div>
            <h3 className="text-xl font-semibold mb-2">{point.title}</h3>
            <p className="text-zinc-400 flex-grow">{point.description}</p>
          </div>
        </motion.div>
      ))}
    </div>
  );
};

export default PainPoints;
