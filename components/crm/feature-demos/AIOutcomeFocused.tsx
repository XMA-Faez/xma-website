"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Brain, MessageSquare, Clock, Calendar, Zap, CheckCircle, TrendingUp } from "lucide-react";

interface MessagePair {
  customer: string;
  ai: string;
  outcome: string;
}

const conversations: MessagePair[] = [
  {
    customer: "Hi, what services do you offer?",
    ai: "We offer CRM solutions, WhatsApp integration, and business automation. Based on your inquiry, I'd recommend our Restaurant CRM package. Would you like to see a demo?",
    outcome: "Qualified lead in 30 seconds"
  },
  {
    customer: "Can you help with appointment booking?",
    ai: "Absolutely! I can book appointments instantly. I have Thursday 2 PM or Friday 10 AM available. Which works better for you?",
    outcome: "Appointment booked automatically"
  },
  {
    customer: "What's your pricing for small business?",
    ai: "Our Small Business package starts at AED 299/month and includes everything you need. I'm scheduling a personalized quote call with Sarah for tomorrow at 3 PM.",
    outcome: "Demo scheduled + pricing provided"
  }
];

export const AIOutcomeFocused: React.FC = () => {
  const [currentConversation, setCurrentConversation] = useState(0);
  const [showMessage, setShowMessage] = useState<"none" | "customer" | "ai" | "outcome">("none");

  useEffect(() => {
    const conversationCycle = () => {
      setShowMessage("none");
      
      // Show customer message
      setTimeout(() => setShowMessage("customer"), 500);
      
      // Show AI response  
      setTimeout(() => setShowMessage("ai"), 2000);
      
      // Show outcome
      setTimeout(() => setShowMessage("outcome"), 4000);
      
      // Reset and move to next conversation
      setTimeout(() => {
        setCurrentConversation((prev) => (prev + 1) % conversations.length);
      }, 7000);
    };

    conversationCycle();
    const interval = setInterval(conversationCycle, 8000);
    return () => clearInterval(interval);
  }, []);

  const current = conversations[currentConversation];

  return (
    <div className="bg-white dark:bg-zinc-900 rounded-xl min-h-[400px] flex flex-col overflow-hidden">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-500 to-cyan-500 text-white p-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Brain className="w-8 h-8" />
            <div>
              <h3 className="text-2xl font-bold">Smart AI Assistant</h3>
              <p className="text-blue-100">24/7 intelligent customer support</p>
            </div>
          </div>
          
          <div className="text-right">
            <div className="text-3xl font-bold">&lt;2s</div>
            <div className="text-sm text-blue-100">Response Time</div>
          </div>
        </div>
      </div>

      {/* Main Demo Area */}
      <div className="flex-1 p-8">
        <div className="max-w-4xl mx-auto">
          {/* Conversation Display */}
          <div className="space-y-6 mb-12">
            {/* Customer Message */}
            <div className="flex justify-start">
              <motion.div
                initial={{ opacity: 0, scale: 0.8, x: -20 }}
                animate={{ 
                  opacity: showMessage === "none" ? 0 : 1,
                  scale: showMessage === "none" ? 0.8 : 1,
                  x: showMessage === "none" ? -20 : 0
                }}
                transition={{ duration: 0.5 }}
                className="max-w-md bg-slate-100 dark:bg-zinc-800 text-slate-900 dark:text-white rounded-2xl rounded-bl-md p-4"
              >
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-6 h-6 bg-slate-400 rounded-full flex items-center justify-center text-white text-xs font-semibold">
                    C
                  </div>
                  <span className="text-sm text-slate-500 dark:text-zinc-400">Customer</span>
                </div>
                <p>{current?.customer}</p>
              </motion.div>
            </div>

            {/* AI Response */}
            <div className="flex justify-end">
              <motion.div
                initial={{ opacity: 0, scale: 0.8, x: 20 }}
                animate={{ 
                  opacity: showMessage === "ai" || showMessage === "outcome" ? 1 : 0,
                  scale: showMessage === "ai" || showMessage === "outcome" ? 1 : 0.8,
                  x: showMessage === "ai" || showMessage === "outcome" ? 0 : 20
                }}
                transition={{ duration: 0.5, delay: showMessage === "ai" ? 0 : 0 }}
                className="max-w-md bg-gradient-to-r from-blue-500 to-cyan-500 text-white rounded-2xl rounded-br-md p-4"
              >
                <div className="flex items-center gap-2 mb-2">
                  <Brain className="w-5 h-5" />
                  <span className="text-sm text-blue-100">AI Assistant</span>
                  <div className="ml-auto flex items-center gap-1">
                    <Zap className="w-3 h-3" />
                    <span className="text-xs">Instant</span>
                  </div>
                </div>
                <p>{current?.ai}</p>
              </motion.div>
            </div>
          </div>

          {/* Outcome Display */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ 
              opacity: showMessage === "outcome" ? 1 : 0,
              y: showMessage === "outcome" ? 0 : 20
            }}
            transition={{ duration: 0.5 }}
            className="text-center"
          >
            <div className="bg-emerald-50 dark:bg-emerald-900/20 border border-emerald-200 dark:border-emerald-800 rounded-2xl p-6 max-w-md mx-auto">
              <div className="flex items-center justify-center gap-2 mb-3">
                <CheckCircle className="w-6 h-6 text-emerald-500" />
                <span className="text-lg font-semibold text-emerald-700 dark:text-emerald-300">
                  Result
                </span>
              </div>
              <p className="text-emerald-800 dark:text-emerald-200 font-medium">
                {current?.outcome}
              </p>
            </div>
          </motion.div>

          {/* Benefits Summary */}
          <div className="grid md:grid-cols-3 gap-6 mt-12">
            <div className="text-center p-4">
              <div className="w-12 h-12 mx-auto mb-3 bg-blue-100 dark:bg-blue-900/40 rounded-full flex items-center justify-center">
                <Clock className="w-6 h-6 text-blue-500" />
              </div>
              <h5 className="font-semibold text-slate-900 dark:text-white mb-1">Instant Response</h5>
              <p className="text-sm text-slate-600 dark:text-zinc-400">Responds in under 2 seconds, 24/7</p>
            </div>

            <div className="text-center p-4">
              <div className="w-12 h-12 mx-auto mb-3 bg-purple-100 dark:bg-purple-900/40 rounded-full flex items-center justify-center">
                <Brain className="w-6 h-6 text-purple-500" />
              </div>
              <h5 className="font-semibold text-slate-900 dark:text-white mb-1">Smart Qualification</h5>
              <p className="text-sm text-slate-600 dark:text-zinc-400">Identifies high-value leads instantly</p>
            </div>

            <div className="text-center p-4">
              <div className="w-12 h-12 mx-auto mb-3 bg-emerald-100 dark:bg-emerald-900/40 rounded-full flex items-center justify-center">
                <Calendar className="w-6 h-6 text-emerald-500" />
              </div>
              <h5 className="font-semibold text-slate-900 dark:text-white mb-1">Auto Booking</h5>
              <p className="text-sm text-slate-600 dark:text-zinc-400">Schedules demos without human input</p>
            </div>
          </div>

          {/* Progress Indicator */}
          <div className="flex justify-center mt-8">
            <div className="flex gap-2">
              {conversations.map((_, index) => (
                <div
                  key={index}
                  className={`w-2 h-2 rounded-full transition-colors ${
                    index === currentConversation
                      ? "bg-blue-500"
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

export default AIOutcomeFocused;