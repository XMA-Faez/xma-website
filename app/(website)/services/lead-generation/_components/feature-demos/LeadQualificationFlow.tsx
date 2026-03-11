"use client";

import React from "react";
import { motion } from "framer-motion";
import {
  Eye,
  MousePointerClick,
  UserPlus,
  ShieldCheck,
  Handshake,
  ArrowDown,
} from "lucide-react";

interface FunnelStage {
  label: string;
  count: string;
  percentage: string;
  icon: React.ReactNode;
  widthPercent: number;
  color: string;
  bgColor: string;
}

const funnelStages: FunnelStage[] = [
  {
    label: "Impressions",
    count: "125,000",
    percentage: "100%",
    icon: <Eye className="w-5 h-5" />,
    widthPercent: 100,
    color: "text-zinc-400",
    bgColor: "bg-zinc-600",
  },
  {
    label: "Clicks",
    count: "6,250",
    percentage: "5.0% CTR",
    icon: <MousePointerClick className="w-5 h-5" />,
    widthPercent: 75,
    color: "text-blue-500",
    bgColor: "bg-blue-400",
  },
  {
    label: "Leads",
    count: "625",
    percentage: "10.0% Conv.",
    icon: <UserPlus className="w-5 h-5" />,
    widthPercent: 50,
    color: "text-amber-500",
    bgColor: "bg-amber-400",
  },
  {
    label: "Qualified",
    count: "312",
    percentage: "49.9% Qual.",
    icon: <ShieldCheck className="w-5 h-5" />,
    widthPercent: 35,
    color: "text-amber-400",
    bgColor: "bg-gradient-to-r from-amber-400 to-yellow-400",
  },
  {
    label: "Customers",
    count: "94",
    percentage: "30.1% Close",
    icon: <Handshake className="w-5 h-5" />,
    widthPercent: 20,
    color: "text-emerald-500",
    bgColor: "bg-gradient-to-r from-emerald-400 to-green-400",
  },
];

const LeadQualificationFlow: React.FC = () => {
  return (
    <div className="w-full bg-gradient-to-br from-zinc-900 to-zinc-800 rounded-xl p-4 sm:p-6 md:p-8">
      <div className="mb-6 sm:mb-8">
        <h3 className="text-lg sm:text-xl font-bold text-white">
          Lead Qualification Funnel
        </h3>
        <p className="text-zinc-400 text-sm">
          From impression to paying customer
        </p>
      </div>

      <div className="flex flex-col items-center gap-2 sm:gap-3">
        {funnelStages.map((stage, index) => (
          <React.Fragment key={stage.label}>
            <motion.div
              initial={{ opacity: 0, scaleX: 0 }}
              whileInView={{ opacity: 1, scaleX: 1 }}
              transition={{ duration: 0.5, delay: index * 0.15 }}
              viewport={{ once: true }}
              className="w-full flex items-center gap-3 sm:gap-4"
              style={{ maxWidth: `${stage.widthPercent}%` }}
            >
              <div
                className={`flex-shrink-0 w-8 h-8 sm:w-10 sm:h-10 rounded-lg flex items-center justify-center ${stage.color} bg-zinc-800 border border-zinc-700`}
              >
                {stage.icon}
              </div>

              <div className="flex-1">
                <div
                  className={`h-10 sm:h-12 ${stage.bgColor} rounded-lg flex items-center justify-between px-3 sm:px-4`}
                >
                  <span className="font-semibold text-white text-xs sm:text-sm">
                    {stage.label}
                  </span>
                  <div className="flex items-center gap-2 sm:gap-3">
                    <span className="font-bold text-white text-xs sm:text-sm">
                      {stage.count}
                    </span>
                    <span className="text-white/80 text-[10px] sm:text-xs hidden sm:inline">
                      {stage.percentage}
                    </span>
                  </div>
                </div>
              </div>
            </motion.div>

            {index < funnelStages.length - 1 && (
              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 0.3, delay: index * 0.15 + 0.1 }}
                viewport={{ once: true }}
                className="text-zinc-600"
              >
                <ArrowDown className="w-4 h-4" />
              </motion.div>
            )}
          </React.Fragment>
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.8 }}
        viewport={{ once: true }}
        className="mt-6 sm:mt-8 grid grid-cols-3 gap-3 sm:gap-4"
      >
        <div className="p-3 sm:p-4 rounded-xl bg-zinc-800 border border-zinc-700 text-center">
          <div className="text-lg sm:text-2xl font-bold text-amber-400">
            5.0 AED
          </div>
          <div className="text-xs text-zinc-400">
            Cost Per Click
          </div>
        </div>
        <div className="p-3 sm:p-4 rounded-xl bg-zinc-800 border border-zinc-700 text-center">
          <div className="text-lg sm:text-2xl font-bold text-amber-400">
            50 AED
          </div>
          <div className="text-xs text-zinc-400">
            Cost Per Lead
          </div>
        </div>
        <div className="p-3 sm:p-4 rounded-xl bg-zinc-800 border border-zinc-700 text-center">
          <div className="text-lg sm:text-2xl font-bold text-emerald-400">
            4.2x
          </div>
          <div className="text-xs text-zinc-400">ROAS</div>
        </div>
      </motion.div>
    </div>
  );
};

export default LeadQualificationFlow;
