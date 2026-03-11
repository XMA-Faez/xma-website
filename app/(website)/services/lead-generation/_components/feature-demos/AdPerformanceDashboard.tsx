"use client";

import React from "react";
import { motion } from "framer-motion";
import { TrendingUp, TrendingDown, MousePointerClick, Eye, Users, DollarSign } from "lucide-react";

interface MetricCard {
  label: string;
  value: string;
  change: string;
  isPositive: boolean;
  icon: React.ReactNode;
}

const metrics: MetricCard[] = [
  {
    label: "Click-Through Rate",
    value: "4.8%",
    change: "+1.2%",
    isPositive: true,
    icon: <MousePointerClick className="w-5 h-5" />,
  },
  {
    label: "Cost Per Click",
    value: "3.20 AED",
    change: "-0.85",
    isPositive: true,
    icon: <DollarSign className="w-5 h-5" />,
  },
  {
    label: "Conversions",
    value: "342",
    change: "+28%",
    isPositive: true,
    icon: <Users className="w-5 h-5" />,
  },
  {
    label: "ROAS",
    value: "4.2x",
    change: "+0.8x",
    isPositive: true,
    icon: <TrendingUp className="w-5 h-5" />,
  },
];

const weeklyData = [
  { day: "Mon", impressions: 4200, clicks: 189, conversions: 12 },
  { day: "Tue", impressions: 5100, clicks: 228, conversions: 18 },
  { day: "Wed", impressions: 4800, clicks: 215, conversions: 15 },
  { day: "Thu", impressions: 6200, clicks: 302, conversions: 24 },
  { day: "Fri", impressions: 5600, clicks: 267, conversions: 21 },
  { day: "Sat", impressions: 3800, clicks: 165, conversions: 10 },
  { day: "Sun", impressions: 3200, clicks: 142, conversions: 8 },
];

const maxImpressions = Math.max(...weeklyData.map((d) => d.impressions));

const AdPerformanceDashboard: React.FC = () => {
  return (
    <div className="w-full bg-gradient-to-br from-zinc-900 to-zinc-800 rounded-xl p-4 sm:p-6 md:p-8">
      <div className="mb-6">
        <h3 className="text-lg sm:text-xl font-bold text-white">
          Campaign Performance
        </h3>
        <p className="text-zinc-400 text-sm">
          Last 7 days across all active campaigns
        </p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 mb-6 sm:mb-8">
        {metrics.map((metric, index) => (
          <motion.div
            key={metric.label}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: index * 0.1 }}
            viewport={{ once: true }}
            className="p-3 sm:p-4 rounded-xl bg-zinc-800 border border-zinc-700"
          >
            <div className="flex items-center justify-between mb-2">
              <span className="text-amber-400">{metric.icon}</span>
              <div
                className={`flex items-center gap-1 text-xs font-medium ${
                  metric.isPositive ? "text-emerald-500" : "text-red-500"
                }`}
              >
                {metric.isPositive ? (
                  <TrendingUp className="w-3 h-3" />
                ) : (
                  <TrendingDown className="w-3 h-3" />
                )}
                {metric.change}
              </div>
            </div>
            <div className="text-xl sm:text-2xl font-bold text-white mb-1">
              {metric.value}
            </div>
            <div className="text-xs text-zinc-400">
              {metric.label}
            </div>
          </motion.div>
        ))}
      </div>

      <div className="p-4 sm:p-6 rounded-xl bg-zinc-800 border border-zinc-700">
        <div className="flex items-center justify-between mb-4">
          <h4 className="font-semibold text-white text-sm sm:text-base">
            Weekly Impressions
          </h4>
          <div className="flex items-center gap-1">
            <Eye className="w-4 h-4 text-amber-400" />
            <span className="text-xs text-zinc-400">
              32.9K total
            </span>
          </div>
        </div>

        <div className="flex items-end gap-2 sm:gap-3 h-32 sm:h-40">
          {weeklyData.map((data, index) => {
            const heightPercent = (data.impressions / maxImpressions) * 100;
            return (
              <motion.div
                key={data.day}
                initial={{ height: 0 }}
                whileInView={{ height: `${heightPercent}%` }}
                transition={{ duration: 0.5, delay: index * 0.08 }}
                viewport={{ once: true }}
                className="flex-1 flex flex-col items-center gap-1"
              >
                <div
                  className="w-full rounded-t-md bg-gradient-to-t from-amber-500 to-amber-300 relative group"
                  style={{ height: "100%" }}
                >
                  <div className="absolute -top-6 left-1/2 -translate-x-1/2 text-[10px] text-zinc-400 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                    {data.impressions.toLocaleString()}
                  </div>
                </div>
                <span className="text-[10px] sm:text-xs text-zinc-400">
                  {data.day}
                </span>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default AdPerformanceDashboard;
