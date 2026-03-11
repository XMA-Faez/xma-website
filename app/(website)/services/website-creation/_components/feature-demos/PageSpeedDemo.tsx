"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Zap, ArrowRight } from "lucide-react";

interface WebVital {
  name: string;
  label: string;
  beforeValue: string;
  afterValue: string;
  unit: string;
  status: "good" | "needs-improvement" | "poor";
}

const webVitals: WebVital[] = [
  {
    name: "LCP",
    label: "Largest Contentful Paint",
    beforeValue: "4.2",
    afterValue: "1.1",
    unit: "s",
    status: "good",
  },
  {
    name: "FID",
    label: "First Input Delay",
    beforeValue: "180",
    afterValue: "12",
    unit: "ms",
    status: "good",
  },
  {
    name: "CLS",
    label: "Cumulative Layout Shift",
    beforeValue: "0.32",
    afterValue: "0.02",
    unit: "",
    status: "good",
  },
  {
    name: "TTFB",
    label: "Time to First Byte",
    beforeValue: "820",
    afterValue: "95",
    unit: "ms",
    status: "good",
  },
];

const GaugeCircle: React.FC<{
  score: number;
  label: string;
  color: string;
  delay: number;
}> = ({ score, label, color, delay }) => {
  const [animatedScore, setAnimatedScore] = useState(0);
  const circumference = 2 * Math.PI * 54;
  const strokeDashoffset = circumference - (animatedScore / 100) * circumference;

  useEffect(() => {
    const timer = setTimeout(() => {
      let current = 0;
      const interval = setInterval(() => {
        current += 1;
        if (current >= score) {
          setAnimatedScore(score);
          clearInterval(interval);
        } else {
          setAnimatedScore(current);
        }
      }, 20);
      return () => clearInterval(interval);
    }, delay);
    return () => clearTimeout(timer);
  }, [score, delay]);

  return (
    <div className="flex flex-col items-center">
      <div className="relative w-28 h-28 sm:w-32 sm:h-32">
        <svg className="w-full h-full transform -rotate-90" viewBox="0 0 120 120">
          <circle
            cx="60"
            cy="60"
            r="54"
            fill="none"
            stroke="currentColor"
            strokeWidth="8"
            className="text-zinc-800"
          />
          <motion.circle
            cx="60"
            cy="60"
            r="54"
            fill="none"
            stroke={color}
            strokeWidth="8"
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            initial={{ strokeDashoffset: circumference }}
            animate={{ strokeDashoffset }}
            transition={{ duration: 1.5, delay: delay / 1000, ease: "easeOut" }}
          />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-2xl sm:text-3xl font-bold text-white">
            {animatedScore}
          </span>
        </div>
      </div>
      <span className="mt-2 text-sm font-medium text-zinc-400">
        {label}
      </span>
    </div>
  );
};

const PageSpeedDemo: React.FC = () => {
  const [showAfter, setShowAfter] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setShowAfter(true), 2000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="w-full bg-gradient-to-br from-zinc-900 to-zinc-800 p-4 sm:p-6 md:p-8">
      <div className="flex items-center gap-2 mb-6">
        <Zap className="w-5 h-5 text-blue-400" />
        <h3 className="text-lg font-bold text-white">
          PageSpeed Performance
        </h3>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 mb-8">
        <div className="text-center">
          <div className="text-sm font-medium text-red-400 mb-4 uppercase tracking-wider">
            Before
          </div>
          <GaugeCircle score={45} label="Overall Score" color="oklch(0.65 0.2 25)" delay={500} />
        </div>

        <div className="text-center relative">
          <div className="hidden md:flex absolute -left-4 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-blue-500/20 items-center justify-center">
            <ArrowRight className="w-4 h-4 text-blue-400" />
          </div>
          <div className="text-sm font-medium text-blue-400 mb-4 uppercase tracking-wider">
            After
          </div>
          <GaugeCircle score={showAfter ? 98 : 0} label="Overall Score" color="oklch(0.62 0.19 260)" delay={1000} />
        </div>
      </div>

      <div className="space-y-3">
        <div className="text-sm font-medium text-zinc-400 uppercase tracking-wider mb-3">
          Core Web Vitals
        </div>
        {webVitals.map((vital, index) => (
          <motion.div
            key={vital.name}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3, delay: 0.5 + index * 0.1 }}
            className="flex items-center justify-between p-3 rounded-xl bg-zinc-800/50 border border-zinc-700"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-blue-500/10 flex items-center justify-center">
                <span className="text-xs font-bold text-blue-400">{vital.name}</span>
              </div>
              <div>
                <div className="text-sm font-medium text-white">
                  {vital.label}
                </div>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-sm text-red-400 line-through">
                {vital.beforeValue}{vital.unit}
              </span>
              <ArrowRight className="w-3 h-3 text-zinc-400" />
              <span className="text-sm font-bold text-blue-400">
                {vital.afterValue}{vital.unit}
              </span>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default PageSpeedDemo;
