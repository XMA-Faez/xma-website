"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { MessageCircle, Check, Clock } from "lucide-react";

interface SimpleMessage {
  id: string;
  text: string;
  sender: "customer" | "agent";
  time: string;
  avatar: string;
  name: string;
}

const messages: SimpleMessage[] = [
  {
    id: "1",
    text: "Hi! I'm interested in your services. Can you help me?",
    sender: "customer",
    time: "10:30",
    avatar: "AR",
    name: "Ahmed"
  },
  {
    id: "2",
    text: "Of course! I'd be happy to help. What specific service are you looking for?",
    sender: "agent",
    time: "10:32",
    avatar: "SJ",
    name: "Sarah"
  },
  {
    id: "3",
    text: "I need CRM setup for my restaurant chain",
    sender: "customer",
    time: "10:35",
    avatar: "AR",
    name: "Ahmed"
  },
  {
    id: "4",
    text: "Perfect! Our restaurant CRM includes reservation management, customer profiles, and automated marketing. Would you like to schedule a demo?",
    sender: "agent",
    time: "10:37",
    avatar: "SJ", 
    name: "Sarah"
  }
];

const customers = [
  { name: "Ahmed Al-Rashid", unread: 3, time: "2m", priority: "high" },
  { name: "Fatima Hassan", unread: 1, time: "5m", priority: "medium" },
  { name: "Mohammed Khalil", unread: 0, time: "1h", priority: "low" },
  { name: "Layla Al-Maktoum", unread: 2, time: "3h", priority: "high" }
];

export const WhatsAppSimplified: React.FC = () => {
  const [visibleMessages, setVisibleMessages] = useState<SimpleMessage[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      if (currentIndex < messages.length) {
        setVisibleMessages(prev => [...prev, messages[currentIndex]]);
        setCurrentIndex(prev => prev + 1);
      } else {
        // Reset after showing all messages
        setTimeout(() => {
          setVisibleMessages([]);
          setCurrentIndex(0);
        }, 3000);
      }
    }, 2000);

    return () => clearInterval(timer);
  }, [currentIndex]);

  return (
    <div className="bg-white dark:bg-zinc-900 rounded-xl overflow-hidden min-h-[500px] flex">
      {/* Customer List Sidebar */}
      <div className="w-80 border-r border-slate-200 dark:border-zinc-700">
        {/* Header */}
        <div className="bg-emerald-600 text-white p-4">
          <div className="flex items-center gap-3">
            <MessageCircle className="w-6 h-6" />
            <div>
              <h3 className="font-semibold">Team Inbox</h3>
              <p className="text-sm text-emerald-100">6 conversations</p>
            </div>
          </div>
        </div>

        {/* Customer List */}
        <div>
          {customers.map((customer, index) => (
            <motion.div
              key={customer.name}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className={`p-4 border-b border-slate-100 dark:border-zinc-800 cursor-pointer hover:bg-slate-50 dark:hover:bg-zinc-800 ${
                index === 0 ? "bg-emerald-50 dark:bg-emerald-900/20 border-r-2 border-r-emerald-500" : ""
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <h4 className="font-medium text-slate-900 dark:text-white">{customer.name}</h4>
                <span className="text-xs text-slate-500">{customer.time}</span>
              </div>
              <div className="flex items-center justify-between">
                <p className="text-sm text-slate-600 dark:text-zinc-400 truncate">
                  Latest message preview...
                </p>
                {customer.unread > 0 && (
                  <div className="bg-emerald-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                    {customer.unread}
                  </div>
                )}
              </div>
              <div className="flex items-center mt-2">
                <div className={`w-2 h-2 rounded-full mr-2 ${
                  customer.priority === "high" ? "bg-red-500" :
                  customer.priority === "medium" ? "bg-yellow-500" : "bg-green-500"
                }`} />
                <span className="text-xs text-emerald-600 dark:text-emerald-400">Sarah Johnson</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Chat Area */}
      <div className="flex-1 flex flex-col">
        {/* Chat Header */}
        <div className="bg-slate-50 dark:bg-zinc-800 p-4 border-b border-slate-200 dark:border-zinc-700">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-emerald-500 to-green-600 flex items-center justify-center text-white font-semibold">
              AR
            </div>
            <div>
              <h3 className="font-semibold text-slate-900 dark:text-white">Ahmed Al-Rashid</h3>
              <p className="text-sm text-emerald-600">Online now</p>
            </div>
          </div>
        </div>

        {/* Messages */}
        <div className="flex-1 p-6 space-y-4 bg-slate-50/30 dark:bg-zinc-900/30">
          {visibleMessages.map((message, index) => (
            <motion.div
              key={message.id}
              initial={{ opacity: 0, y: 20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.4 }}
              className={`flex ${message.sender === "agent" ? "justify-end" : "justify-start"}`}
            >
              <div className={`max-w-md px-4 py-3 rounded-2xl ${
                message.sender === "agent"
                  ? "bg-emerald-500 text-white rounded-br-md"
                  : "bg-white dark:bg-zinc-800 text-slate-900 dark:text-white rounded-bl-md shadow-sm"
              }`}>
                <p className="text-sm">{message.text}</p>
                <div className={`flex items-center gap-1 mt-2 ${
                  message.sender === "agent" ? "justify-end text-emerald-100" : "justify-end text-slate-500"
                }`}>
                  <Clock className="w-3 h-3" />
                  <span className="text-xs">{message.time}</span>
                  {message.sender === "agent" && <Check className="w-3 h-3" />}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Input Area */}
        <div className="p-4 border-t border-slate-200 dark:border-zinc-700">
          <div className="flex items-center gap-3 bg-slate-100 dark:bg-zinc-800 rounded-2xl px-4 py-3">
            <input
              type="text"
              placeholder="Type your message..."
              className="flex-1 bg-transparent outline-none text-slate-900 dark:text-white placeholder-slate-500"
              readOnly
            />
            <button className="bg-emerald-500 text-white p-2 rounded-xl">
              <MessageCircle className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WhatsAppSimplified;
