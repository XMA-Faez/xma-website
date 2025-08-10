"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Brain, User, Calendar, Send, Zap } from "lucide-react";

interface ChatMessage {
  id: string;
  text: string;
  sender: "user" | "ai";
  timestamp: string;
  isTyping?: boolean;
}

const conversation = [
  {
    user: "Hi, I need a CRM for my restaurant business",
    ai: "Hello! I'd love to help you with restaurant CRM solutions. How many locations do you have?"
  },
  {
    user: "We have 3 locations and need better customer tracking",
    ai: "Perfect! For 3 locations, I recommend our Restaurant CRM with reservation management and loyalty programs. Would you like me to schedule a demo?"
  },
  {
    user: "Yes, can we do Thursday 2 PM?",
    ai: "✅ Demo scheduled for Thursday at 2:00 PM! You'll see customer segmentation, automated marketing, and loyalty integration. I'll send you a calendar invite."
  }
];

export const AISimplified: React.FC = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [currentPair, setCurrentPair] = useState(0);
  const [isTyping, setIsTyping] = useState(false);

  useEffect(() => {
    const playConversation = async () => {
      if (currentPair >= conversation.length) {
        // Reset conversation
        setTimeout(() => {
          setMessages([]);
          setCurrentPair(0);
        }, 5000);
        return;
      }

      const pair = conversation[currentPair];
      
      // Add user message
      const userMessage: ChatMessage = {
        id: `user-${currentPair}`,
        text: pair.user,
        sender: "user", 
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      
      setMessages(prev => [...prev, userMessage]);

      // Show AI typing after delay
      setTimeout(() => {
        setIsTyping(true);
        const typingMessage: ChatMessage = {
          id: `typing-${currentPair}`,
          text: "AI is thinking...",
          sender: "ai",
          timestamp: "",
          isTyping: true
        };
        setMessages(prev => [...prev, typingMessage]);
      }, 1500);

      // Add AI response
      setTimeout(() => {
        setMessages(prev => prev.filter(m => !m.isTyping));
        setIsTyping(false);
        
        const aiMessage: ChatMessage = {
          id: `ai-${currentPair}`,
          text: pair.ai,
          sender: "ai",
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        };
        
        setMessages(prev => [...prev, aiMessage]);
        setCurrentPair(prev => prev + 1);
      }, 3500);
    };

    const timer = setTimeout(playConversation, currentPair === 0 ? 1000 : 2000);
    return () => clearTimeout(timer);
  }, [currentPair]);

  return (
    <div className="bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/20 rounded-xl min-h-[500px] flex flex-col">
      {/* AI Header */}
      <div className="bg-gradient-to-r from-blue-600 to-cyan-600 text-white p-6 rounded-t-xl">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center">
              <Brain className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-xl font-semibold">AI Assistant</h3>
              <div className="flex items-center gap-2 text-blue-100">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                <span className="text-sm">Available 24/7</span>
              </div>
            </div>
          </div>
          <div className="text-right">
            <div className="text-2xl font-bold">&lt;2s</div>
            <div className="text-sm text-blue-100">Response Time</div>
          </div>
        </div>
      </div>

      {/* Chat Area */}
      <div className="flex-1 p-6 overflow-y-auto">
        <div className="space-y-4 max-w-3xl mx-auto">
          {messages.length === 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-8"
            >
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center text-white">
                <Brain className="w-8 h-8" />
              </div>
              <h4 className="text-lg font-semibold text-slate-900 dark:text-white mb-2">
                AI Assistant Ready
              </h4>
              <p className="text-slate-600 dark:text-zinc-400">
                Watch how our AI handles inquiries and books appointments automatically
              </p>
            </motion.div>
          )}

          {messages.map((message) => (
            <motion.div
              key={message.id}
              initial={{ opacity: 0, y: 20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.4 }}
              className={`flex gap-3 ${message.sender === "user" ? "flex-row-reverse" : ""}`}
            >
              {/* Avatar */}
              <div className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ${
                message.sender === "ai"
                  ? "bg-gradient-to-br from-blue-500 to-cyan-500 text-white"
                  : "bg-gradient-to-br from-slate-500 to-slate-600 text-white"
              }`}>
                {message.sender === "ai" ? <Brain className="w-5 h-5" /> : <User className="w-5 h-5" />}
              </div>

              {/* Message */}
              <div className={`flex-1 max-w-lg ${message.sender === "user" ? "flex justify-end" : ""}`}>
                <div className={`inline-block p-4 rounded-2xl ${
                  message.sender === "ai"
                    ? "bg-white dark:bg-zinc-800 text-slate-900 dark:text-white border border-blue-200 dark:border-blue-800 rounded-tl-md"
                    : "bg-slate-200 dark:bg-zinc-700 text-slate-900 dark:text-white rounded-tr-md"
                }`}>
                  {message.isTyping ? (
                    <div className="flex items-center gap-2">
                      <div className="flex gap-1">
                        <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce" />
                        <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce delay-100" />
                        <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce delay-200" />
                      </div>
                      <span className="text-sm text-blue-600 dark:text-blue-400">AI is thinking...</span>
                    </div>
                  ) : (
                    <>
                      <p className="text-sm leading-relaxed">{message.text}</p>
                      <div className={`flex items-center justify-between mt-2 text-xs ${
                        message.sender === "ai" ? "text-slate-500" : "text-slate-600"
                      }`}>
                        <span>{message.timestamp}</span>
                        {message.sender === "ai" && (
                          <div className="flex items-center gap-1 text-blue-500">
                            <Zap className="w-3 h-3" />
                            <span>AI</span>
                          </div>
                        )}
                      </div>
                    </>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Input Area */}
      <div className="p-6 border-t border-blue-200 dark:border-blue-800 bg-white/50 dark:bg-zinc-900/50 rounded-b-xl">
        <div className="max-w-3xl mx-auto">
          <div className="flex items-center gap-3 bg-white dark:bg-zinc-800 rounded-2xl px-4 py-3 border border-blue-200 dark:border-blue-800">
            <input
              type="text"
              placeholder="Ask the AI about your business needs..."
              className="flex-1 bg-transparent outline-none text-slate-900 dark:text-white placeholder-slate-500"
              readOnly
            />
            <button className="bg-blue-500 text-white p-2 rounded-xl">
              <Send className="w-4 h-4" />
            </button>
          </div>
          
          <div className="flex items-center justify-center gap-6 mt-4 text-sm text-slate-600 dark:text-zinc-400">
            <div className="flex items-center gap-1">
              <Zap className="w-4 h-4 text-blue-500" />
              <span>Instant Responses</span>
            </div>
            <div className="flex items-center gap-1">
              <Brain className="w-4 h-4 text-purple-500" />
              <span>Learns Your Business</span>
            </div>
            <div className="flex items-center gap-1">
              <Calendar className="w-4 h-4 text-emerald-500" />
              <span>Books Appointments</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AISimplified;