"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { BarChart3, TrendingUp, Users, DollarSign } from "lucide-react";

interface Deal {
  id: string;
  client: string;
  value: string;
  stage: "leads" | "qualified" | "proposal" | "closed";
  priority: "high" | "medium" | "low";
}

const stages = [
  { id: "leads", name: "New Leads", color: "from-blue-500 to-blue-600", count: 12 },
  { id: "qualified", name: "Qualified", color: "from-purple-500 to-purple-600", count: 8 },
  { id: "proposal", name: "Proposal", color: "from-amber-500 to-amber-600", count: 5 },
  { id: "closed", name: "Closed Won", color: "from-emerald-500 to-emerald-600", count: 3 }
];

const initialDeals: Deal[] = [
  { id: "1", client: "Ahmed's Restaurant", value: "$15,000", stage: "leads", priority: "high" },
  { id: "2", client: "Fatima Clinic", value: "$25,000", stage: "leads", priority: "medium" },
  { id: "3", client: "Dubai Motors", value: "$40,000", stage: "qualified", priority: "high" },
  { id: "4", client: "Al-Maktoum Retail", value: "$18,000", stage: "qualified", priority: "medium" },
  { id: "5", client: "Emirates Services", value: "$32,000", stage: "proposal", priority: "high" },
  { id: "6", client: "Abu Dhabi Tech", value: "$28,000", stage: "closed", priority: "high" }
];

export const PipelineSimplified: React.FC = () => {
  const [deals, setDeals] = useState(initialDeals);
  const [animatingDeal, setAnimatingDeal] = useState<string | null>(null);

  useEffect(() => {
    const interval = setInterval(() => {
      // Randomly move a deal to next stage
      setDeals(prevDeals => {
        const movableDeals = prevDeals.filter(d => d.stage !== "closed" && !animatingDeal);
        if (movableDeals.length === 0) return prevDeals;

        const randomDeal = movableDeals[Math.floor(Math.random() * movableDeals.length)];
        const stageOrder = ["leads", "qualified", "proposal", "closed"];
        const currentIndex = stageOrder.indexOf(randomDeal.stage);
        const nextStage = stageOrder[currentIndex + 1];

        if (nextStage) {
          setAnimatingDeal(randomDeal.id);
          
          setTimeout(() => {
            setAnimatingDeal(null);
          }, 1000);

          return prevDeals.map(deal => 
            deal.id === randomDeal.id 
              ? { ...deal, stage: nextStage as Deal["stage"] }
              : deal
          );
        }
        return prevDeals;
      });
    }, 4000);

    return () => clearInterval(interval);
  }, [animatingDeal]);

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high": return "border-red-400 bg-red-50 dark:bg-red-900/20";
      case "medium": return "border-yellow-400 bg-yellow-50 dark:bg-yellow-900/20";
      case "low": return "border-green-400 bg-green-50 dark:bg-green-900/20";
      default: return "border-gray-400 bg-gray-50 dark:bg-gray-900/20";
    }
  };

  const totalValue = deals
    .filter(d => d.stage === "closed")
    .reduce((sum, deal) => sum + parseInt(deal.value.replace(/[$,]/g, "")), 0);

  return (
    <div className="bg-white dark:bg-zinc-900 rounded-xl min-h-[500px] flex flex-col">
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-600 to-pink-600 text-white p-6 rounded-t-xl">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center">
              <BarChart3 className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-xl font-semibold">Sales Pipeline</h3>
              <p className="text-purple-100">Visual deal tracking</p>
            </div>
          </div>
          <div className="text-right">
            <div className="text-2xl font-bold">${totalValue.toLocaleString()}</div>
            <div className="text-sm text-purple-100">Closed This Month</div>
          </div>
        </div>
      </div>

      {/* Stats Row */}
      <div className="p-6 border-b border-slate-200 dark:border-zinc-700">
        <div className="grid grid-cols-4 gap-4">
          {[
            { label: "Total Deals", value: deals.length, icon: Users, color: "text-blue-500" },
            { label: "Avg Deal Size", value: "$24k", icon: DollarSign, color: "text-emerald-500" },
            { label: "Win Rate", value: "67%", icon: TrendingUp, color: "text-purple-500" },
            { label: "Pipeline", value: "$158k", icon: BarChart3, color: "text-amber-500" }
          ].map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="text-center p-3 rounded-lg bg-slate-50 dark:bg-zinc-800"
            >
              <div className={`${stat.color} mb-2 flex justify-center`}>
                <stat.icon className="w-5 h-5" />
              </div>
              <div className="text-lg font-bold text-slate-900 dark:text-white">{stat.value}</div>
              <div className="text-xs text-slate-600 dark:text-zinc-400">{stat.label}</div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Pipeline Stages */}
      <div className="flex-1 p-6">
        <div className="grid grid-cols-4 gap-4 h-full">
          {stages.map((stage) => (
            <div key={stage.id} className="space-y-4">
              {/* Stage Header */}
              <div className="text-center">
                <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r ${stage.color} text-white text-sm font-medium`}>
                  <span>{stage.name}</span>
                  <span className="bg-white/20 px-2 py-1 rounded-full text-xs">
                    {stage.count}
                  </span>
                </div>
              </div>

              {/* Deals */}
              <div className="space-y-3 min-h-[300px]">
                {deals
                  .filter(deal => deal.stage === stage.id)
                  .map((deal, index) => (
                    <motion.div
                      key={deal.id}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ 
                        opacity: 1, 
                        scale: 1,
                        x: animatingDeal === deal.id ? [0, 20, 0] : 0
                      }}
                      transition={{ 
                        duration: 0.3, 
                        delay: index * 0.1,
                        x: { duration: 1, ease: "easeInOut" }
                      }}
                      className={`p-3 rounded-lg border-l-4 cursor-grab hover:shadow-md transition-all ${
                        getPriorityColor(deal.priority)
                      } ${animatingDeal === deal.id ? 'ring-2 ring-purple-400 shadow-lg' : ''}`}
                    >
                      <h4 className="font-semibold text-slate-900 dark:text-white text-sm mb-1">
                        {deal.client}
                      </h4>
                      <div className="flex items-center justify-between">
                        <span className="text-lg font-bold text-emerald-600">
                          {deal.value}
                        </span>
                        <div className={`w-2 h-2 rounded-full ${
                          deal.priority === "high" ? "bg-red-500" :
                          deal.priority === "medium" ? "bg-yellow-500" : "bg-green-500"
                        }`} />
                      </div>
                      <div className="text-xs text-slate-500 dark:text-zinc-400 mt-1 capitalize">
                        {deal.priority} Priority
                      </div>
                    </motion.div>
                  ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Footer */}
      <div className="p-4 border-t border-slate-200 dark:border-zinc-700 bg-slate-50 dark:bg-zinc-800 rounded-b-xl">
        <div className="flex items-center justify-center gap-6 text-sm text-slate-600 dark:text-zinc-400">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-red-500 rounded-full" />
            <span>High Priority</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-yellow-500 rounded-full" />
            <span>Medium Priority</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-green-500 rounded-full" />
            <span>Low Priority</span>
          </div>
          <div className="flex items-center gap-2">
            <TrendingUp className="w-4 h-4 text-purple-500" />
            <span>AI-Powered Insights</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PipelineSimplified;