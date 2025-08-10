"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { MessageCircle, CheckCircle, Clock, Users, TrendingUp } from "lucide-react";

export const WhatsAppOutcomeFocused: React.FC = () => {
  const [activeTab, setActiveTab] = useState<"before" | "after">("before");

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveTab(prev => prev === "before" ? "after" : "before");
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="bg-white dark:bg-zinc-900 rounded-xl min-h-[400px] flex flex-col overflow-hidden">
      {/* Header with Toggle */}
      <div className="bg-gradient-to-r from-emerald-500 to-green-500 text-white p-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <MessageCircle className="w-8 h-8" />
            <div>
              <h3 className="text-2xl font-bold">WhatsApp Team Inbox</h3>
              <p className="text-emerald-100">Never miss another customer message</p>
            </div>
          </div>
          
          {/* Before/After Toggle */}
          <div className="bg-white/20 rounded-full p-1 flex">
            <button
              onClick={() => setActiveTab("before")}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                activeTab === "before"
                  ? "bg-white text-emerald-600"
                  : "text-white hover:bg-white/10"
              }`}
            >
              Before
            </button>
            <button
              onClick={() => setActiveTab("after")}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                activeTab === "after"
                  ? "bg-white text-emerald-600"
                  : "text-white hover:bg-white/10"
              }`}
            >
              After
            </button>
          </div>
        </div>
      </div>

      {/* Content Area */}
      <div className="flex-1 p-8">
        {activeTab === "before" ? (
          <motion.div
            key="before"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center space-y-8"
          >
            <div className="max-w-2xl mx-auto">
              <h4 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">
                Without Team Inbox
              </h4>
              <p className="text-lg text-slate-600 dark:text-zinc-300 mb-8">
                Messages scattered across personal phones, missed inquiries, and confused customers
              </p>
            </div>

            {/* Problem Visualization */}
            <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
              <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-2xl p-6">
                <div className="w-12 h-12 mx-auto mb-4 bg-red-100 dark:bg-red-900/40 rounded-full flex items-center justify-center">
                  <Clock className="w-6 h-6 text-red-500" />
                </div>
                <h5 className="font-semibold text-slate-900 dark:text-white mb-2">Delayed Responses</h5>
                <p className="text-sm text-slate-600 dark:text-zinc-400">Average response time: 4-6 hours</p>
              </div>

              <div className="bg-orange-50 dark:bg-orange-900/20 border border-orange-200 dark:border-orange-800 rounded-2xl p-6">
                <div className="w-12 h-12 mx-auto mb-4 bg-orange-100 dark:bg-orange-900/40 rounded-full flex items-center justify-center">
                  <MessageCircle className="w-6 h-6 text-orange-500" />
                </div>
                <h5 className="font-semibold text-slate-900 dark:text-white mb-2">Missed Messages</h5>
                <p className="text-sm text-slate-600 dark:text-zinc-400">30% of inquiries go unanswered</p>
              </div>

              <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-2xl p-6">
                <div className="w-12 h-12 mx-auto mb-4 bg-red-100 dark:bg-red-900/40 rounded-full flex items-center justify-center">
                  <TrendingUp className="w-6 h-6 text-red-500 rotate-180" />
                </div>
                <h5 className="font-semibold text-slate-900 dark:text-white mb-2">Lost Revenue</h5>
                <p className="text-sm text-slate-600 dark:text-zinc-400">67% of leads never convert</p>
              </div>
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="after"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center space-y-8"
          >
            <div className="max-w-2xl mx-auto">
              <h4 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">
                With WhatsApp Team Inbox
              </h4>
              <p className="text-lg text-slate-600 dark:text-zinc-300 mb-8">
                All conversations centralized, instant notifications, and happy customers
              </p>
            </div>

            {/* Solution Visualization */}
            <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
              <div className="bg-emerald-50 dark:bg-emerald-900/20 border border-emerald-200 dark:border-emerald-800 rounded-2xl p-6">
                <div className="w-12 h-12 mx-auto mb-4 bg-emerald-100 dark:bg-emerald-900/40 rounded-full flex items-center justify-center">
                  <Clock className="w-6 h-6 text-emerald-500" />
                </div>
                <h5 className="font-semibold text-slate-900 dark:text-white mb-2">Instant Responses</h5>
                <p className="text-sm text-slate-600 dark:text-zinc-400">Average response time: &lt;2 minutes</p>
                <div className="mt-2">
                  <span className="text-emerald-600 font-semibold">+400% faster</span>
                </div>
              </div>

              <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-2xl p-6">
                <div className="w-12 h-12 mx-auto mb-4 bg-blue-100 dark:bg-blue-900/40 rounded-full flex items-center justify-center">
                  <CheckCircle className="w-6 h-6 text-blue-500" />
                </div>
                <h5 className="font-semibold text-slate-900 dark:text-white mb-2">Zero Missed Messages</h5>
                <p className="text-sm text-slate-600 dark:text-zinc-400">100% message tracking & routing</p>
                <div className="mt-2">
                  <span className="text-blue-600 font-semibold">Perfect record</span>
                </div>
              </div>

              <div className="bg-emerald-50 dark:bg-emerald-900/20 border border-emerald-200 dark:border-emerald-800 rounded-2xl p-6">
                <div className="w-12 h-12 mx-auto mb-4 bg-emerald-100 dark:bg-emerald-900/40 rounded-full flex items-center justify-center">
                  <TrendingUp className="w-6 h-6 text-emerald-500" />
                </div>
                <h5 className="font-semibold text-slate-900 dark:text-white mb-2">Higher Conversions</h5>
                <p className="text-sm text-slate-600 dark:text-zinc-400">89% of leads now convert</p>
                <div className="mt-2">
                  <span className="text-emerald-600 font-semibold">+67% increase</span>
                </div>
              </div>
            </div>

            {/* Success Indicator */}
            <div className="max-w-md mx-auto mt-8 p-4 bg-emerald-50 dark:bg-emerald-900/20 rounded-xl border border-emerald-200 dark:border-emerald-800">
              <div className="flex items-center justify-center gap-2">
                <CheckCircle className="w-5 h-5 text-emerald-500" />
                <span className="text-emerald-700 dark:text-emerald-300 font-medium">
                  All messages handled • No leads lost • Team working efficiently
                </span>
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default WhatsAppOutcomeFocused;
