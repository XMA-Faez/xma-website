"use client";

import React, { useState } from "react";
import { DollarSign, TrendingUp } from "lucide-react";

interface Deal {
  id: string;
  name: string;
  company: string;
  value: number;
  probability: number;
  avatar: string;
  priority: "high" | "medium" | "low";
}

interface Stage {
  id: string;
  name: string;
  deals: Deal[];
  color: string;
}

const initialStages: Stage[] = [
  {
    id: "prospecting",
    name: "Prospecting",
    color: "from-slate-600 to-slate-700",
    deals: [
      {
        id: "deal-1",
        name: "Ahmed Hassan",
        company: "Dubai Tech Solutions",
        value: 25000,
        probability: 20,
        avatar: "AH",
        priority: "high"
      },
      {
        id: "deal-2",
        name: "Sarah Al-Mansoori",
        company: "Emirates Digital",
        value: 18000,
        probability: 15,
        avatar: "SA",
        priority: "medium"
      }
    ]
  },
  {
    id: "qualification",
    name: "Qualification",
    color: "from-slate-600 to-slate-700",
    deals: [
      {
        id: "deal-3",
        name: "Mohammed Rashid",
        company: "Abu Dhabi Holdings",
        value: 45000,
        probability: 40,
        avatar: "MR",
        priority: "high"
      }
    ]
  },
  {
    id: "proposal",
    name: "Proposal",
    color: "from-slate-600 to-slate-700",
    deals: [
      {
        id: "deal-4",
        name: "Fatima Al-Zahra",
        company: "Sharjah Enterprises",
        value: 32000,
        probability: 65,
        avatar: "FA",
        priority: "high"
      },
      {
        id: "deal-5",
        name: "Omar Abdullah",
        company: "Al Ain Industries",
        value: 28000,
        probability: 50,
        avatar: "OA",
        priority: "medium"
      }
    ]
  },
  {
    id: "closed",
    name: "Closed Won",
    color: "from-slate-600 to-slate-700",
    deals: [
      {
        id: "deal-6",
        name: "Khalid Al-Maktoum",
        company: "Dubai Investments",
        value: 75000,
        probability: 100,
        avatar: "KA",
        priority: "high"
      }
    ]
  }
];

const DealCard: React.FC<{ deal: Deal }> = ({ deal }) => {
  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high": return "bg-red-100 text-red-700 border-red-200";
      case "medium": return "bg-yellow-100 text-yellow-700 border-yellow-200";
      case "low": return "bg-green-100 text-green-700 border-green-200";
      default: return "bg-gray-100 text-gray-700 border-gray-200";
    }
  };

  return (
    <div className="bg-white dark:bg-zinc-800 rounded-xl p-3 border border-slate-200 dark:border-zinc-700">
    
      <div className="flex items-start justify-between mb-2">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-slate-600 flex items-center justify-center text-white font-semibold text-xs">
            {deal.avatar}
          </div>
          <div>
            <h4 className="font-semibold text-slate-900 dark:text-white text-sm">
              {deal.name}
            </h4>
            <p className="text-xs text-slate-500 dark:text-zinc-400">
              {deal.company}
            </p>
          </div>
        </div>
        <div className={`px-2 py-1 rounded-full text-xs font-medium border ${getPriorityColor(deal.priority)}`}>
          {deal.priority}
        </div>
      </div>

      <div className="flex items-center gap-2 mb-2">
        <DollarSign className="w-3 h-3 text-green-500" />
        <span className="font-bold text-slate-900 dark:text-white text-sm">
          ${deal.value.toLocaleString()}
        </span>
        <div className="flex items-center gap-1 ml-auto">
          <TrendingUp className="w-3 h-3 text-blue-500" />
          <span className="text-xs text-blue-500 font-medium">
            {deal.probability}%
          </span>
        </div>
      </div>

      <div className="w-full bg-slate-200 dark:bg-zinc-700 rounded-full h-1.5">
        <div
          className="bg-blue-500 h-1.5 rounded-full"
          style={{ width: `${deal.probability}%` }}
        />
      </div>
    </div>
  );
};

const StageColumn: React.FC<{ stage: Stage }> = ({ stage }) => {
  return (
    <div className="flex-1 min-w-[200px]">
      <div className={`bg-gradient-to-r ${stage.color} rounded-t-xl p-3`}>
        <div className="flex items-center justify-between text-white">
          <h3 className="font-semibold text-sm">{stage.name}</h3>
          <span className="text-sm opacity-90">{stage.deals.length}</span>
        </div>
        <div className="text-white/90 text-xs mt-1">
          ${stage.deals.reduce((sum, deal) => sum + deal.value, 0).toLocaleString()}
        </div>
      </div>

      <div className="bg-slate-50 dark:bg-zinc-900/50 min-h-[400px] p-3 rounded-b-xl border-2 border-slate-200 dark:border-zinc-700">
        <div className="space-y-3">
          {stage.deals.map((deal) => (
            <div key={deal.id}>
              <DealCard deal={deal} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export const PipelineVisualization: React.FC = () => {
  const [stages, setStages] = useState(initialStages);

  // Remove animation - show static pipeline

  return (
    <div className="w-full h-full bg-gradient-to-br from-slate-50 to-white dark:from-zinc-900 dark:to-zinc-800 rounded-xl p-4 overflow-hidden">
      {/* Header */}
      <div className="mb-4">
        <h3 className="text-xl font-bold text-slate-900 dark:text-white">
          Sales Pipeline
        </h3>
        <p className="text-slate-600 dark:text-zinc-400 text-sm">
          Visual sales pipeline with deal tracking
        </p>
      </div>

      {/* Pipeline Stages */}
      <div className="flex gap-4 overflow-x-auto pb-4">
        {stages.map(stage => (
          <StageColumn key={stage.id} stage={stage} />
        ))}
      </div>
    </div>
  );
};

export default PipelineVisualization;