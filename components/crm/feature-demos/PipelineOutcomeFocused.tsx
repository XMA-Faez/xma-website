"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { BarChart3, TrendingUp, DollarSign, Target, CheckCircle, ArrowRight } from "lucide-react";

interface DealProgress {
  dealName: string;
  value: string;
  stages: {
    name: string;
    status: "completed" | "current" | "upcoming";
    color: string;
  }[];
}

const dealProgressData: DealProgress[] = [
  {
    dealName: "Dubai Restaurant Chain",
    value: "$25,000",
    stages: [
      { name: "Lead", status: "completed", color: "text-blue-500" },
      { name: "Qualified", status: "completed", color: "text-purple-500" },
      { name: "Proposal", status: "current", color: "text-amber-500" },
      { name: "Closed", status: "upcoming", color: "text-emerald-500" }
    ]
  },
  {
    dealName: "Abu Dhabi Clinic",
    value: "$18,000", 
    stages: [
      { name: "Lead", status: "completed", color: "text-blue-500" },
      { name: "Qualified", status: "completed", color: "text-purple-500" },
      { name: "Proposal", status: "completed", color: "text-amber-500" },
      { name: "Closed", status: "current", color: "text-emerald-500" }
    ]
  }
];

export const PipelineOutcomeFocused: React.FC = () => {
  const [currentDeal, setCurrentDeal] = useState(0);
  const [animationStep, setAnimationStep] = useState(0);

  useEffect(() => {
    const cycleDeal = () => {
      setAnimationStep(0);
      
      // Show deal progression animation
      const progressTimer = setInterval(() => {
        setAnimationStep(prev => {
          if (prev < 4) return prev + 1;
          clearInterval(progressTimer);
          
          // Switch to next deal after completion
          setTimeout(() => {
            setCurrentDeal(prev => (prev + 1) % dealProgressData.length);
          }, 2000);
          
          return prev;
        });
      }, 1000);
    };

    cycleDeal();
    const mainInterval = setInterval(cycleDeal, 8000);
    return () => clearInterval(mainInterval);
  }, []);

  const deal = dealProgressData[currentDeal];

  return (
    <div className="bg-white dark:bg-zinc-900 rounded-xl min-h-[400px] flex flex-col overflow-hidden">
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-500 to-pink-500 text-white p-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <BarChart3 className="w-8 h-8" />
            <div>
              <h3 className="text-2xl font-bold">Visual Sales Pipeline</h3>
              <p className="text-purple-100">Track every deal from lead to close</p>
            </div>
          </div>
          
          <div className="text-right">
            <div className="text-3xl font-bold">89%</div>
            <div className="text-sm text-purple-100">Close Rate</div>
          </div>
        </div>
      </div>

      {/* Main Demo Area */}
      <div className="flex-1 p-8">
        <div className="max-w-5xl mx-auto">
          {/* Deal Header */}
          <motion.div
            key={currentDeal}
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center mb-12"
          >
            <h4 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">
              {deal.dealName}
            </h4>
            <div className="flex items-center justify-center gap-3">
              <span className="text-lg text-slate-600 dark:text-zinc-400">Deal Value:</span>
              <span className="text-2xl font-bold text-emerald-600">{deal.value}</span>
            </div>
          </motion.div>

          {/* Pipeline Visualization */}
          <div className="relative">
            {/* Connection Lines */}
            <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-slate-200 dark:bg-zinc-700 transform -translate-y-1/2 z-0"></div>
            
            {/* Active Progress Line */}
            <motion.div
              className="absolute top-1/2 left-0 h-0.5 bg-gradient-to-r from-purple-500 to-pink-500 transform -translate-y-1/2 z-10"
              initial={{ width: "0%" }}
              animate={{ 
                width: animationStep === 0 ? "0%" : `${(animationStep / (deal.stages.length - 1)) * 100}%`
              }}
              transition={{ duration: 1, ease: "easeInOut" }}
            ></motion.div>

            {/* Stages */}
            <div className="relative z-20 flex justify-between items-center">
              {deal.stages.map((stage, index) => {
                const isCompleted = stage.status === "completed" || (animationStep > index);
                const isCurrent = stage.status === "current" || (animationStep === index + 1);
                
                return (
                  <motion.div
                    key={stage.name}
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ 
                      scale: isCurrent ? 1.2 : 1,
                      opacity: 1
                    }}
                    transition={{ 
                      duration: 0.5,
                      delay: index * 0.2
                    }}
                    className="flex flex-col items-center"
                  >
                    {/* Stage Circle */}
                    <div className={`w-16 h-16 rounded-full flex items-center justify-center transition-all duration-500 ${
                      isCompleted
                        ? "bg-gradient-to-r from-emerald-500 to-green-500 text-white"
                        : isCurrent
                        ? "bg-gradient-to-r from-purple-500 to-pink-500 text-white animate-pulse"
                        : "bg-slate-200 dark:bg-zinc-700 text-slate-400 dark:text-zinc-500"
                    }`}>
                      {isCompleted ? (
                        <CheckCircle className="w-8 h-8" />
                      ) : isCurrent ? (
                        <Target className="w-8 h-8" />
                      ) : (
                        <div className="w-4 h-4 rounded-full bg-current"></div>
                      )}
                    </div>

                    {/* Stage Label */}
                    <div className="mt-4 text-center">
                      <h5 className={`font-semibold mb-1 ${
                        isCompleted || isCurrent
                          ? "text-slate-900 dark:text-white"
                          : "text-slate-500 dark:text-zinc-500"
                      }`}>
                        {stage.name}
                      </h5>
                      
                      {/* Stage Status */}
                      <div className={`text-xs px-2 py-1 rounded-full ${
                        isCompleted
                          ? "bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-300"
                          : isCurrent
                          ? "bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300"
                          : "bg-slate-100 dark:bg-zinc-800 text-slate-500 dark:text-zinc-500"
                      }`}>
                        {isCompleted ? "Complete" : isCurrent ? "In Progress" : "Upcoming"}
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>

          {/* Outcome Message */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ 
              opacity: animationStep >= 4 ? 1 : 0,
              y: animationStep >= 4 ? 0 : 20
            }}
            transition={{ duration: 0.5 }}
            className="text-center mt-12"
          >
            <div className="bg-emerald-50 dark:bg-emerald-900/20 border border-emerald-200 dark:border-emerald-800 rounded-2xl p-6 max-w-md mx-auto">
              <div className="flex items-center justify-center gap-2 mb-3">
                <CheckCircle className="w-6 h-6 text-emerald-500" />
                <span className="text-lg font-semibold text-emerald-700 dark:text-emerald-300">
                  Deal Closed!
                </span>
              </div>
              <p className="text-emerald-800 dark:text-emerald-200 font-medium">
                {deal.value} revenue added to this month
              </p>
            </div>
          </motion.div>

          {/* Key Benefits */}
          <div className="grid md:grid-cols-3 gap-6 mt-12">
            <div className="text-center p-4">
              <div className="w-12 h-12 mx-auto mb-3 bg-purple-100 dark:bg-purple-900/40 rounded-full flex items-center justify-center">
                <Target className="w-6 h-6 text-purple-500" />
              </div>
              <h5 className="font-semibold text-slate-900 dark:text-white mb-1">Visual Tracking</h5>
              <p className="text-sm text-slate-600 dark:text-zinc-400">See exactly where each deal stands</p>
            </div>

            <div className="text-center p-4">
              <div className="w-12 h-12 mx-auto mb-3 bg-blue-100 dark:bg-blue-900/40 rounded-full flex items-center justify-center">
                <ArrowRight className="w-6 h-6 text-blue-500" />
              </div>
              <h5 className="font-semibold text-slate-900 dark:text-white mb-1">Auto Progression</h5>
              <p className="text-sm text-slate-600 dark:text-zinc-400">Deals move automatically when tasks complete</p>
            </div>

            <div className="text-center p-4">
              <div className="w-12 h-12 mx-auto mb-3 bg-emerald-100 dark:bg-emerald-900/40 rounded-full flex items-center justify-center">
                <TrendingUp className="w-6 h-6 text-emerald-500" />
              </div>
              <h5 className="font-semibold text-slate-900 dark:text-white mb-1">Higher Close Rate</h5>
              <p className="text-sm text-slate-600 dark:text-zinc-400">89% vs industry average of 27%</p>
            </div>
          </div>

          {/* Deal Indicator */}
          <div className="flex justify-center mt-8">
            <div className="flex gap-2">
              {dealProgressData.map((_, index) => (
                <div
                  key={index}
                  className={`w-2 h-2 rounded-full transition-colors ${
                    index === currentDeal
                      ? "bg-purple-500"
                      : "bg-slate-300 dark:bg-zinc-700"
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PipelineOutcomeFocused;