"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Workflow, Clock, Zap, CheckCircle, MessageCircle, Mail, Calendar, User, TrendingUp } from "lucide-react";

interface AutomationStep {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  time: string;
  status: "pending" | "active" | "completed";
  result?: string;
}

const automationFlow: AutomationStep[] = [
  {
    id: "trigger",
    title: "WhatsApp Message Received",
    description: "Customer inquiry comes in",
    icon: <MessageCircle className="w-5 h-5" />,
    time: "0s",
    status: "pending"
  },
  {
    id: "qualify",
    title: "AI Lead Qualification",
    description: "Analyze intent and budget",
    icon: <Zap className="w-5 h-5" />,
    time: "1s",
    status: "pending",
    result: "High-value lead detected"
  },
  {
    id: "route",
    title: "Smart Team Assignment",
    description: "Route to best available agent",
    icon: <User className="w-5 h-5" />,
    time: "2s", 
    status: "pending",
    result: "Assigned to Sarah (Restaurant Expert)"
  },
  {
    id: "followup",
    title: "Personalized Follow-up",
    description: "Send tailored email sequence",
    icon: <Mail className="w-5 h-5" />,
    time: "5s",
    status: "pending",
    result: "Custom restaurant CRM email sent"
  },
  {
    id: "schedule",
    title: "Demo Booking",
    description: "Schedule meeting automatically",
    icon: <Calendar className="w-5 h-5" />,
    time: "8s",
    status: "pending",
    result: "Thursday 2 PM demo booked"
  }
];

export const AutomationOutcomeFocused: React.FC = () => {
  const [steps, setSteps] = useState(automationFlow);
  const [currentStep, setCurrentStep] = useState(-1);
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    const runAutomation = () => {
      // Reset
      setSteps(automationFlow.map(step => ({ ...step, status: "pending" })));
      setCurrentStep(-1);
      setIsComplete(false);

      // Start automation sequence
      setTimeout(() => {
        setCurrentStep(0);
        
        // Process each step
        automationFlow.forEach((_, index) => {
          setTimeout(() => {
            setSteps(prevSteps => 
              prevSteps.map((step, stepIndex) => ({
                ...step,
                status: stepIndex < index ? "completed" : 
                       stepIndex === index ? "active" :
                       "pending"
              }))
            );
            
            setCurrentStep(index);

            // Mark as completed after processing
            setTimeout(() => {
              setSteps(prevSteps => 
                prevSteps.map((step, stepIndex) => ({
                  ...step,
                  status: stepIndex <= index ? "completed" : "pending"
                }))
              );

              if (index === automationFlow.length - 1) {
                setTimeout(() => setIsComplete(true), 500);
              }
            }, 800);
          }, index * 1500);
        });
      }, 1000);
    };

    runAutomation();
    const interval = setInterval(runAutomation, 12000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="bg-white dark:bg-zinc-900 rounded-xl min-h-[400px] flex flex-col overflow-hidden">
      {/* Header */}
      <div className="bg-gradient-to-r from-amber-500 to-orange-500 text-white p-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Workflow className="w-8 h-8" />
            <div>
              <h3 className="text-2xl font-bold">Smart Automation</h3>
              <p className="text-amber-100">Turn every inquiry into opportunity</p>
            </div>
          </div>
          
          <div className="text-right">
            <div className="text-3xl font-bold">8s</div>
            <div className="text-sm text-amber-100">Lead to Demo</div>
          </div>
        </div>
      </div>

      {/* Main Demo Area */}
      <div className="flex-1 p-8">
        <div className="max-w-4xl mx-auto">
          {/* Automation Flow */}
          <div className="space-y-6 mb-8">
            {steps.map((step, index) => (
              <motion.div
                key={step.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ 
                  opacity: step.status !== "pending" ? 1 : 0.3,
                  x: 0,
                  scale: step.status === "active" ? 1.02 : 1
                }}
                transition={{ duration: 0.5 }}
                className="relative"
              >
                {/* Connection Line */}
                {index < steps.length - 1 && (
                  <div className="absolute left-6 top-16 w-0.5 h-8 bg-slate-200 dark:bg-zinc-700"></div>
                )}
                
                {/* Active Connection Line */}
                {index < steps.length - 1 && step.status === "completed" && (
                  <motion.div
                    className="absolute left-6 top-16 w-0.5 bg-gradient-to-b from-amber-500 to-orange-500"
                    initial={{ height: 0 }}
                    animate={{ height: "2rem" }}
                    transition={{ duration: 0.5 }}
                  ></motion.div>
                )}

                <div className={`flex items-start gap-4 p-4 rounded-2xl transition-all ${
                  step.status === "active" 
                    ? "bg-amber-50 dark:bg-amber-900/20 border-2 border-amber-200 dark:border-amber-800"
                    : step.status === "completed"
                    ? "bg-emerald-50 dark:bg-emerald-900/20 border border-emerald-200 dark:border-emerald-800"
                    : "bg-slate-50 dark:bg-zinc-800 border border-slate-200 dark:border-zinc-700"
                }`}>
                  {/* Step Icon */}
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0 ${
                    step.status === "active"
                      ? "bg-gradient-to-r from-amber-500 to-orange-500 text-white animate-pulse"
                      : step.status === "completed"
                      ? "bg-gradient-to-r from-emerald-500 to-green-500 text-white"
                      : "bg-slate-200 dark:bg-zinc-700 text-slate-400 dark:text-zinc-500"
                  }`}>
                    {step.status === "completed" ? <CheckCircle className="w-6 h-6" /> : step.icon}
                  </div>

                  {/* Step Content */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-3 mb-2">
                      <h4 className={`font-semibold ${
                        step.status !== "pending" 
                          ? "text-slate-900 dark:text-white" 
                          : "text-slate-500 dark:text-zinc-500"
                      }`}>
                        {step.title}
                      </h4>
                      <div className={`flex items-center gap-1 text-sm ${
                        step.status === "active"
                          ? "text-amber-600 dark:text-amber-400"
                          : step.status === "completed"
                          ? "text-emerald-600 dark:text-emerald-400"
                          : "text-slate-400 dark:text-zinc-600"
                      }`}>
                        <Clock className="w-3 h-3" />
                        <span>{step.time}</span>
                      </div>
                    </div>
                    
                    <p className={`text-sm mb-2 ${
                      step.status !== "pending"
                        ? "text-slate-600 dark:text-zinc-300"
                        : "text-slate-400 dark:text-zinc-500"
                    }`}>
                      {step.description}
                    </p>

                    {/* Step Result */}
                    {step.result && step.status === "completed" && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3 }}
                        className="bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-300 text-sm px-3 py-1 rounded-lg inline-block"
                      >
                        ✓ {step.result}
                      </motion.div>
                    )}

                    {/* Active Indicator */}
                    {step.status === "active" && (
                      <div className="flex items-center gap-2 text-amber-600 dark:text-amber-400 text-sm">
                        <div className="flex gap-1">
                          <div className="w-1 h-1 bg-current rounded-full animate-bounce"></div>
                          <div className="w-1 h-1 bg-current rounded-full animate-bounce delay-100"></div>
                          <div className="w-1 h-1 bg-current rounded-full animate-bounce delay-200"></div>
                        </div>
                        <span>Processing...</span>
                      </div>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Final Result */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ 
              opacity: isComplete ? 1 : 0,
              y: isComplete ? 0 : 20
            }}
            transition={{ duration: 0.5 }}
            className="text-center"
          >
            <div className="bg-gradient-to-r from-emerald-500 to-green-500 text-white rounded-2xl p-6 max-w-md mx-auto">
              <div className="flex items-center justify-center gap-2 mb-3">
                <CheckCircle className="w-6 h-6" />
                <span className="text-lg font-semibold">Automation Complete!</span>
              </div>
              <p className="mb-4">
                Lead qualified, assigned, followed up, and demo scheduled
              </p>
              <div className="text-2xl font-bold">8 seconds total</div>
              <div className="text-sm text-emerald-100">vs 4-6 hours manually</div>
            </div>
          </motion.div>

          {/* Benefits */}
          <div className="grid md:grid-cols-3 gap-6 mt-12">
            <div className="text-center p-4">
              <div className="w-12 h-12 mx-auto mb-3 bg-amber-100 dark:bg-amber-900/40 rounded-full flex items-center justify-center">
                <Clock className="w-6 h-6 text-amber-500" />
              </div>
              <h5 className="font-semibold text-slate-900 dark:text-white mb-1">Lightning Fast</h5>
              <p className="text-sm text-slate-600 dark:text-zinc-400">Complete lead process in under 10 seconds</p>
            </div>

            <div className="text-center p-4">
              <div className="w-12 h-12 mx-auto mb-3 bg-blue-100 dark:bg-blue-900/40 rounded-full flex items-center justify-center">
                <Workflow className="w-6 h-6 text-blue-500" />
              </div>
              <h5 className="font-semibold text-slate-900 dark:text-white mb-1">Zero Manual Work</h5>
              <p className="text-sm text-slate-600 dark:text-zinc-400">Fully automated lead qualification and routing</p>
            </div>

            <div className="text-center p-4">
              <div className="w-12 h-12 mx-auto mb-3 bg-emerald-100 dark:bg-emerald-900/40 rounded-full flex items-center justify-center">
                <TrendingUp className="w-6 h-6 text-emerald-500" />
              </div>
              <h5 className="font-semibold text-slate-900 dark:text-white mb-1">Higher Conversion</h5>
              <p className="text-sm text-slate-600 dark:text-zinc-400">Instant response increases close rate by 67%</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AutomationOutcomeFocused;
