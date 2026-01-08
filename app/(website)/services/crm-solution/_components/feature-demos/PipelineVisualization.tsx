"use client";

import React, { useState, useEffect } from "react";
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

const DealCard: React.FC<{ deal: Deal; isMobile?: boolean }> = ({ deal, isMobile = false }) => {
  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high": return "text-red-600";
      case "medium": return "text-yellow-600";
      case "low": return "text-green-600";
      default: return "text-gray-600";
    }
  };

  if (isMobile) {
    // Simplified mobile card
    return (
      <div className="bg-white dark:bg-zinc-800 rounded-lg p-2 border border-slate-200 dark:border-zinc-700">
        <div className="flex items-center gap-2 mb-1">
          <div className="w-6 h-6 rounded-full bg-slate-600 flex items-center justify-center text-white font-semibold text-[10px]">
            {deal.avatar}
          </div>
          <div className="flex-1 min-w-0">
            <h4 className="font-semibold text-slate-900 dark:text-white text-xs truncate">
              {deal.name}
            </h4>
          </div>
          <div className={`${getPriorityColor(deal.priority)}`}>
            <div className="w-2 h-2 rounded-full bg-current" />
          </div>
        </div>
        
        <div className="flex items-center justify-between">
          <span className="font-bold text-slate-900 dark:text-white text-xs">
            ${(deal.value / 1000).toFixed(0)}k
          </span>
          <span className="text-[10px] text-blue-500 font-medium">
            {deal.probability}%
          </span>
        </div>
        
        <div className="w-full bg-slate-200 dark:bg-zinc-700 rounded-full h-1 mt-1">
          <div
            className="bg-blue-500 h-1 rounded-full transition-all duration-300"
            style={{ width: `${deal.probability}%` }}
          />
        </div>
      </div>
    );
  }

  // Desktop card
  return (
    <div className="bg-white dark:bg-zinc-800 rounded-xl p-3 border border-slate-200 dark:border-zinc-700">
      <div className="flex items-start justify-between mb-2">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-slate-600 flex items-center justify-center text-white font-semibold text-xs">
            {deal.avatar}
          </div>
          <div className="min-w-0 flex-1">
            <h4 className="font-semibold text-slate-900 dark:text-white text-sm truncate">
              {deal.name}
            </h4>
            <p className="text-xs text-slate-500 dark:text-zinc-400 truncate">
              {deal.company}
            </p>
          </div>
        </div>
        <div className={`px-2 py-1 rounded-full text-xs font-medium border ${getPriorityColor(deal.priority).replace('text-', 'border-').replace('600', '200')} ${getPriorityColor(deal.priority).replace('600', '700')} ${getPriorityColor(deal.priority).replace('text-', 'bg-').replace('600', '100')}`}>
          {deal.priority}
        </div>
      </div>

      <div className="flex items-center gap-2 mb-2">
        <DollarSign className="w-3 h-3 text-green-500 flex-shrink-0" />
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
          className="bg-blue-500 h-1.5 rounded-full transition-all duration-300"
          style={{ width: `${deal.probability}%` }}
        />
      </div>
    </div>
  );
};

const StageColumn: React.FC<{ stage: Stage; isMobile?: boolean }> = ({ stage, isMobile = false }) => {
  if (isMobile) {
    // Mobile: Simplified vertical layout
    return (
      <div className="w-full">
        <div className={`bg-gradient-to-r ${stage.color} rounded-t-lg p-2`}>
          <div className="flex items-center justify-between text-white">
            <h3 className="font-semibold text-xs">{stage.name}</h3>
            <div className="flex items-center gap-2">
              <span className="text-xs opacity-90">{stage.deals.length}</span>
              <span className="text-[10px] opacity-75">
                ${(stage.deals.reduce((sum, deal) => sum + deal.value, 0) / 1000).toFixed(0)}k
              </span>
            </div>
          </div>
        </div>

        <div className="bg-slate-50 dark:bg-zinc-900/50 p-2 rounded-b-lg border-2 border-t-0 border-slate-200 dark:border-zinc-700">
          <div className="space-y-2">
            {stage.deals.map((deal) => (
              <DealCard key={deal.id} deal={deal} isMobile={true} />
            ))}
          </div>
        </div>
      </div>
    );
  }

  // Desktop/Tablet layout
  return (
    <div className="flex-1 min-w-[280px] sm:min-w-[320px] md:min-w-[360px] lg:min-w-[400px]">
      <div className={`bg-gradient-to-r ${stage.color} rounded-t-xl p-3`}>
        <div className="flex items-center justify-between text-white">
          <h3 className="font-semibold text-sm">{stage.name}</h3>
          <span className="text-sm opacity-90">{stage.deals.length}</span>
        </div>
        <div className="text-white/90 text-xs mt-1">
          ${stage.deals.reduce((sum, deal) => sum + deal.value, 0).toLocaleString()}
        </div>
      </div>

      <div className="bg-slate-50 dark:bg-zinc-900/50 min-h-[400px] p-3 rounded-b-xl border-2 border-t-0 border-slate-200 dark:border-zinc-700">
        <div className="space-y-3">
          {stage.deals.map((deal) => (
            <DealCard key={deal.id} deal={deal} isMobile={false} />
          ))}
        </div>
      </div>
    </div>
  );
};

const PipelineVisualization: React.FC = () => {
  const [stages, setStages] = useState(initialStages);
  const [isMobile, setIsMobile] = useState(false);
  const [selectedStage, setSelectedStage] = useState(0);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 640);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  if (isMobile) {
    // Mobile: Show one stage at a time with navigation
    return (
      <div className="w-full h-full bg-gradient-to-br from-slate-50 to-white dark:from-zinc-900 dark:to-zinc-800 rounded-lg p-3">
        {/* Header */}
        <div className="mb-3">
          <h3 className="text-base font-bold text-slate-900 dark:text-white">
            Sales Pipeline
          </h3>
          <p className="text-slate-600 dark:text-zinc-400 text-xs">
            Swipe to navigate stages
          </p>
        </div>

        {/* Stage Navigation */}
        <div className="flex gap-1 mb-3 overflow-x-auto pb-2">
          {stages.map((stage, index) => (
            <button
              key={stage.id}
              onClick={() => setSelectedStage(index)}
              className={`px-3 py-1 rounded-full text-xs font-medium whitespace-nowrap transition-all ${
                selectedStage === index
                  ? 'bg-blue-500 text-white'
                  : 'bg-slate-200 dark:bg-zinc-700 text-slate-600 dark:text-zinc-300'
              }`}
            >
              {stage.name} ({stage.deals.length})
            </button>
          ))}
        </div>

        {/* Current Stage */}
        <div className="overflow-y-auto max-h-[400px]">
          <StageColumn stage={stages[selectedStage]} isMobile={true} />
        </div>
      </div>
    );
  }

  // Desktop layout
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
          <StageColumn key={stage.id} stage={stage} isMobile={false} />
        ))}
      </div>
    </div>
  );
};

export default PipelineVisualization;