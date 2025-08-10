"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { 
  Workflow, 
  MessageCircle, 
  Mail, 
  Calendar, 
  CheckCircle, 
  ArrowRight,
  Play,
  Zap
} from "lucide-react";

interface FlowStep {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  status: "pending" | "active" | "completed";
  color: string;
  delay: number;
}

const workflowSteps: FlowStep[] = [
  {
    id: "trigger",
    title: "WhatsApp Message",
    description: "Customer sends inquiry",
    icon: <MessageCircle className="w-5 h-5" />,
    status: "pending",
    color: "from-emerald-500 to-green-500",
    delay: 0
  },
  {
    id: "qualify",
    title: "AI Qualification", 
    description: "Analyze lead quality",
    icon: <Zap className="w-5 h-5" />,
    status: "pending",
    color: "from-blue-500 to-cyan-500", 
    delay: 2000
  },
  {
    id: "route",
    title: "Smart Routing",
    description: "Assign to best agent",
    icon: <ArrowRight className="w-5 h-5" />,
    status: "pending",
    color: "from-purple-500 to-pink-500",
    delay: 4000
  },
  {
    id: "followup",
    title: "Auto Follow-up",
    description: "Send personalized email",
    icon: <Mail className="w-5 h-5" />,
    status: "pending", 
    color: "from-amber-500 to-yellow-500",
    delay: 6000
  },
  {
    id: "book",
    title: "Book Meeting",
    description: "Schedule demo call",
    icon: <Calendar className="w-5 h-5" />,
    status: "pending",
    color: "from-indigo-500 to-purple-500",
    delay: 8000
  }
];

const automationTriggers = [
  { name: "WhatsApp", count: 24, icon: MessageCircle, color: "text-emerald-500" },
  { name: "Website", count: 18, icon: CheckCircle, color: "text-blue-500" },
  { name: "Email", count: 12, icon: Mail, color: "text-purple-500" },
  { name: "Social", count: 8, icon: Zap, color: "text-amber-500" }
];

export const AutomationSimplified: React.FC = () => {
  const [steps, setSteps] = useState(workflowSteps);
  const [currentStep, setCurrentStep] = useState(-1);
  const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {
    if (!isRunning) {
      const startTimer = setTimeout(() => {
        setIsRunning(true);
        setCurrentStep(0);
      }, 1000);
      return () => clearTimeout(startTimer);
    }

    if (currentStep >= 0 && currentStep < steps.length) {
      const timer = setTimeout(() => {
        setSteps(prev => prev.map((step, index) => ({
          ...step,
          status: index <= currentStep ? "completed" : 
                 index === currentStep + 1 ? "active" : "pending"
        })));
        
        if (currentStep < steps.length - 1) {
          setCurrentStep(prev => prev + 1);
        } else {
          // Reset after completion
          setTimeout(() => {
            setSteps(workflowSteps);
            setCurrentStep(-1);
            setIsRunning(false);
          }, 3000);
        }
      }, 2000);

      return () => clearTimeout(timer);
    }
  }, [currentStep, isRunning, steps.length]);

  return (
    <div className="bg-white dark:bg-zinc-900 rounded-xl min-h-[500px] flex flex-col">
      {/* Header */}
      <div className="bg-gradient-to-r from-amber-600 to-yellow-600 text-white p-6 rounded-t-xl">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center">
              <Workflow className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-xl font-semibold">Smart Automation</h3>
              <p className="text-amber-100">Workflow in action</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Play className="w-5 h-5" />
            <span className="text-sm">Live Demo</span>
          </div>
        </div>
      </div>

      {/* Trigger Sources */}
      <div className="p-6 border-b border-slate-200 dark:border-zinc-700">
        <h4 className="font-semibold text-slate-900 dark:text-white mb-4">Lead Sources (Today)</h4>
        <div className="grid grid-cols-4 gap-4">
          {automationTriggers.map((trigger, index) => (
            <motion.div
              key={trigger.name}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.1 }}
              className="text-center p-3 rounded-lg bg-slate-50 dark:bg-zinc-800"
            >
              <div className={`${trigger.color} mb-2 flex justify-center`}>
                <trigger.icon className="w-5 h-5" />
              </div>
              <div className="text-lg font-bold text-slate-900 dark:text-white">{trigger.count}</div>
              <div className="text-xs text-slate-600 dark:text-zinc-400">{trigger.name}</div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Workflow Steps */}
      <div className="flex-1 p-6">
        <div className="max-w-4xl mx-auto">
          <h4 className="font-semibold text-slate-900 dark:text-white mb-6 text-center">
            Automation Workflow
          </h4>
          
          <div className="relative">
            {/* Connection Lines */}
            <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-slate-200 dark:bg-zinc-700 -translate-y-0.5" />
            
            {/* Steps */}
            <div className="grid grid-cols-5 gap-4 relative">
              {steps.map((step, index) => (
                <motion.div
                  key={step.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.2 }}
                  className="text-center relative"
                >
                  {/* Step Circle */}
                  <motion.div
                    animate={{
                      scale: step.status === "active" ? [1, 1.1, 1] : 1,
                      boxShadow: step.status === "active" 
                        ? ["0 0 0 0 rgba(59, 130, 246, 0.4)", "0 0 0 8px rgba(59, 130, 246, 0)", "0 0 0 0 rgba(59, 130, 246, 0)"]
                        : "none"
                    }}
                    transition={{ 
                      scale: { repeat: step.status === "active" ? Infinity : 0, duration: 1.5 },
                      boxShadow: { repeat: step.status === "active" ? Infinity : 0, duration: 1.5 }
                    }}
                    className={`w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-3 transition-all duration-500 ${
                      step.status === "completed" 
                        ? `bg-gradient-to-br ${step.color} text-white shadow-lg`
                        : step.status === "active"
                        ? "bg-blue-500 text-white shadow-lg ring-4 ring-blue-200 dark:ring-blue-800"
                        : "bg-slate-200 dark:bg-zinc-700 text-slate-500 dark:text-zinc-400"
                    }`}
                  >
                    {step.status === "completed" ? (
                      <CheckCircle className="w-6 h-6" />
                    ) : (
                      step.icon
                    )}
                  </motion.div>

                  {/* Step Content */}
                  <motion.div
                    animate={{
                      scale: step.status === "active" ? 1.05 : 1,
                      y: step.status === "active" ? -2 : 0
                    }}
                    transition={{ duration: 0.3 }}
                    className={`p-3 rounded-lg transition-all ${
                      step.status === "active" 
                        ? "bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800"
                        : "bg-slate-50 dark:bg-zinc-800"
                    }`}
                  >
                    <h5 className={`font-semibold text-sm mb-1 ${
                      step.status === "active" 
                        ? "text-blue-900 dark:text-blue-100" 
                        : "text-slate-900 dark:text-white"
                    }`}>
                      {step.title}
                    </h5>
                    <p className={`text-xs ${
                      step.status === "active"
                        ? "text-blue-700 dark:text-blue-300"
                        : "text-slate-600 dark:text-zinc-400"
                    }`}>
                      {step.description}
                    </p>
                  </motion.div>

                  {/* Active Indicator */}
                  {step.status === "active" && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="absolute -top-2 -right-2 w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center shadow-lg"
                    >
                      <Play className="w-3 h-3 text-white" />
                    </motion.div>
                  )}
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Footer Stats */}
      <div className="p-4 border-t border-slate-200 dark:border-zinc-700 bg-slate-50 dark:bg-zinc-800 rounded-b-xl">
        <div className="flex items-center justify-center gap-8 text-sm">
          <div className="text-center">
            <div className="text-lg font-bold text-emerald-600">89%</div>
            <div className="text-slate-600 dark:text-zinc-400">Automation Rate</div>
          </div>
          <div className="text-center">
            <div className="text-lg font-bold text-blue-600">3.2s</div>
            <div className="text-slate-600 dark:text-zinc-400">Avg Response</div>
          </div>
          <div className="text-center">
            <div className="text-lg font-bold text-purple-600">24/7</div>
            <div className="text-slate-600 dark:text-zinc-400">Always Active</div>
          </div>
          <div className="text-center">
            <div className="text-lg font-bold text-amber-600">67%</div>
            <div className="text-slate-600 dark:text-zinc-400">Lead Conversion</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AutomationSimplified;
