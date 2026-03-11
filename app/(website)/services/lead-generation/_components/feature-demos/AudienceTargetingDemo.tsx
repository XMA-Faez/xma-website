"use client";

import React from "react";
import { motion } from "framer-motion";
import { Globe, Users, UserCheck, Target } from "lucide-react";

interface TargetingLayer {
  label: string;
  size: string;
  reach: string;
  icon: React.ReactNode;
  ringSize: string;
  ringColor: string;
  delay: number;
}

const targetingLayers: TargetingLayer[] = [
  {
    label: "Broad Audience",
    size: "w-64 h-64 sm:w-72 sm:h-72 md:w-80 md:h-80",
    reach: "2.4M people",
    icon: <Globe className="w-4 h-4" />,
    ringSize: "w-64 h-64 sm:w-72 sm:h-72 md:w-80 md:h-80",
    ringColor: "border-blue-500/20 bg-blue-500/5",
    delay: 0,
  },
  {
    label: "Interest Targeting",
    size: "w-48 h-48 sm:w-56 sm:h-56 md:w-60 md:h-60",
    reach: "850K people",
    icon: <Users className="w-4 h-4" />,
    ringSize: "w-48 h-48 sm:w-56 sm:h-56 md:w-60 md:h-60",
    ringColor: "border-purple-500/30 bg-purple-500/5",
    delay: 0.2,
  },
  {
    label: "Lookalike Audience",
    size: "w-32 h-32 sm:w-40 sm:h-40 md:w-44 md:h-44",
    reach: "320K people",
    icon: <UserCheck className="w-4 h-4" />,
    ringSize: "w-32 h-32 sm:w-40 sm:h-40 md:w-44 md:h-44",
    ringColor: "border-amber-500/40 bg-amber-500/5",
    delay: 0.4,
  },
  {
    label: "High-Intent",
    size: "w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28",
    reach: "45K people",
    icon: <Target className="w-4 h-4" />,
    ringSize: "w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28",
    ringColor: "border-amber-400/60 bg-amber-400/10",
    delay: 0.6,
  },
];

const AudienceTargetingDemo: React.FC = () => {
  return (
    <div className="w-full bg-gradient-to-br from-zinc-900 to-zinc-800 rounded-xl p-4 sm:p-6 md:p-8">
      <div className="mb-6">
        <h3 className="text-lg sm:text-xl font-bold text-white">
          Audience Targeting Layers
        </h3>
        <p className="text-zinc-400 text-sm">
          Narrowing down to your ideal customer
        </p>
      </div>

      <div className="flex flex-col md:flex-row items-center gap-8 md:gap-12">
        <div className="relative flex items-center justify-center min-h-[280px] sm:min-h-[320px] md:min-h-[360px] flex-1">
          {targetingLayers.map((layer, index) => (
            <motion.div
              key={layer.label}
              initial={{ scale: 0, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              transition={{
                duration: 0.5,
                delay: layer.delay,
                type: "spring",
                stiffness: 200,
                damping: 20,
              }}
              viewport={{ once: true }}
              className={`absolute rounded-full border-2 ${layer.ringColor} ${layer.ringSize} flex items-center justify-center`}
            >
              {index === targetingLayers.length - 1 && (
                <motion.div
                  animate={{ scale: [1, 1.1, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="flex flex-col items-center gap-1"
                >
                  <Target className="w-6 h-6 sm:w-8 sm:h-8 text-amber-400" />
                  <span className="text-[10px] sm:text-xs font-semibold text-amber-400">
                    IDEAL
                  </span>
                </motion.div>
              )}
            </motion.div>
          ))}
        </div>

        <div className="flex flex-col gap-3 sm:gap-4 w-full md:w-auto md:min-w-[200px]">
          {targetingLayers.map((layer, index) => (
            <motion.div
              key={layer.label}
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4, delay: layer.delay + 0.3 }}
              viewport={{ once: true }}
              className="flex items-center gap-3 p-3 rounded-xl bg-zinc-800 border border-zinc-700"
            >
              <div
                className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${
                  index === targetingLayers.length - 1
                    ? "bg-amber-500/20 text-amber-400"
                    : index === targetingLayers.length - 2
                      ? "bg-amber-500/10 text-amber-400"
                      : index === 1
                        ? "bg-purple-500/10 text-purple-400"
                        : "bg-blue-500/10 text-blue-400"
                }`}
              >
                {layer.icon}
              </div>
              <div className="flex-1 min-w-0">
                <div className="font-medium text-sm text-white truncate">
                  {layer.label}
                </div>
                <div className="text-xs text-zinc-400">
                  {layer.reach}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AudienceTargetingDemo;
