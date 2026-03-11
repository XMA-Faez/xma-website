"use client";

import React from "react";
import { motion } from "framer-motion";
import { Code, Layers } from "lucide-react";
import { Badge } from "@/components/ui/Badge";

interface Technology {
  id: string;
  name: string;
  description: string;
  icon: string;
  color: {
    bg: string;
    border: string;
    text: string;
  };
}

const technologies: Technology[] = [
  {
    id: "nextjs",
    name: "Next.js",
    description:
      "React framework for production-grade performance and SEO",
    icon: "N",
    color: {
      bg: "from-zinc-500/10 to-zinc-400/5",
      border: "border-zinc-500/20",
      text: "text-white",
    },
  },
  {
    id: "react",
    name: "React 19",
    description:
      "Component-based UI with the latest concurrent features",
    icon: "R",
    color: {
      bg: "from-sky-500/10 to-cyan-400/5",
      border: "border-sky-500/20",
      text: "text-sky-400",
    },
  },
  {
    id: "typescript",
    name: "TypeScript",
    description:
      "Type-safe development for fewer bugs and better DX",
    icon: "TS",
    color: {
      bg: "from-blue-500/10 to-blue-400/5",
      border: "border-blue-500/20",
      text: "text-blue-400",
    },
  },
  {
    id: "tailwind",
    name: "Tailwind CSS",
    description:
      "Utility-first styling for rapid, consistent design",
    icon: "TW",
    color: {
      bg: "from-teal-500/10 to-cyan-400/5",
      border: "border-teal-500/20",
      text: "text-teal-400",
    },
  },
  {
    id: "sanity",
    name: "Sanity CMS",
    description:
      "Flexible headless CMS for real-time content management",
    icon: "S",
    color: {
      bg: "from-red-500/10 to-orange-400/5",
      border: "border-red-500/20",
      text: "text-red-400",
    },
  },
  {
    id: "vercel",
    name: "Vercel",
    description:
      "Edge deployment for global performance and zero-downtime deploys",
    icon: "V",
    color: {
      bg: "from-purple-500/10 to-violet-400/5",
      border: "border-purple-500/20",
      text: "text-purple-400",
    },
  },
];

const TechStackShowcase: React.FC = () => {
  return (
    <section className="relative py-16 sm:py-20 md:py-24 lg:py-32">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center mb-12 md:mb-16"
        >
          <Badge variant="primary" className="mb-6">
            <Code className="w-4 h-4" />
            Tech Stack
          </Badge>
          <h2 className="text-3xl md:text-5xl font-bold mb-4 text-white">
            Built With the
            <span className="bg-gradient-to-r from-blue-400 to-blue-600 bg-clip-text text-transparent">
              {" "}
              Best Tools
            </span>
          </h2>
          <p className="text-xl text-zinc-400 max-w-2xl mx-auto">
            The same architecture powering Nike, Twitch, and Netflix - tailored
            for your business
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {technologies.map((tech, index) => (
            <motion.div
              key={tech.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              viewport={{ once: true }}
              className={`group relative p-6 rounded-2xl bg-gradient-to-br ${tech.color.bg} backdrop-blur-xl border ${tech.color.border} hover:border-blue-500/40 transition-all duration-300`}
            >
              <div className="flex items-start gap-4">
                <div
                  className={`flex-shrink-0 w-12 h-12 rounded-xl bg-gradient-to-br ${tech.color.bg} border ${tech.color.border} flex items-center justify-center font-bold text-lg ${tech.color.text}`}
                >
                  {tech.icon}
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="text-lg font-bold text-white mb-1 flex items-center gap-2">
                    {tech.name}
                    <Layers className="w-4 h-4 text-blue-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </h3>
                  <p className="text-sm text-zinc-400 leading-relaxed">
                    {tech.description}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TechStackShowcase;
