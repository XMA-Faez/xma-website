"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { Brain, User, Zap } from "lucide-react";

interface ChatMessage {
  id: string;
  text: string;
  sender: "user" | "ai";
  timestamp: string;
  typing?: boolean;
  actions?: Array<{
    type: "book" | "schedule" | "quote";
    data: any;
  }>;
}

const mockConversations = [
  {
    user: "Hi, I need help with CRM for my restaurant business",
    ai: "Hello! I'd be happy to help you with CRM solutions for your restaurant. Can you tell me how many locations you have?",
    actions: []
  },
  {
    user: "We have 3 locations and struggle with tracking repeat customers",
    ai: "Perfect! For restaurants with multiple locations, I recommend our CRM with integrated reservation system. Would you like me to schedule a demo?",
    actions: [{ type: "book", data: { service: "Restaurant CRM Demo" } }]
  },
  {
    user: "Yes, can we do it this Thursday afternoon?",
    ai: "I've checked your calendar and can book you for Thursday at 2:00 PM. Shall I confirm this appointment?",
    actions: [{ type: "schedule", data: { date: "Thursday 2:00 PM", service: "CRM Demo" } }]
  },
  {
    user: "That sounds perfect! What's the pricing?",
    ai: "For 3 restaurant locations, our Restaurant CRM package starts at $299/month. Would you like a detailed quote?",
    actions: [{ type: "quote", data: { package: "Restaurant CRM", price: "$299/month" } }]
  }
];

const AIMessage: React.FC<{ message: ChatMessage; showActions?: boolean }> = ({ 
  message, 
  showActions = false 
}) => {
  const isAI = message.sender === "ai";

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className={`flex gap-2 sm:gap-3 mb-4 sm:mb-6 ${isAI ? "" : "flex-row-reverse"}`}
    >
      {/* Avatar */}
      <div className={`w-6 h-6 sm:w-8 sm:h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
        isAI 
          ? "bg-gradient-to-br from-blue-500 to-cyan-500 text-white" 
          : "bg-gradient-to-br from-slate-500 to-slate-600 text-white"
      }`}>
        {isAI ? <Brain className="w-3 h-3 sm:w-4 sm:h-4" /> : <User className="w-3 h-3 sm:w-4 sm:h-4" />}
      </div>

      <div className={`flex-1 ${isAI ? "" : "flex flex-col items-end"}`}>
        {/* Message Bubble */}
        <motion.div
          initial={{ scale: 0.95 }}
          animate={{ scale: 1 }}
          className={`inline-block max-w-[80%] sm:max-w-sm p-2 sm:p-3 rounded-xl sm:rounded-2xl ${
            isAI 
              ? "bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-blue-900/30 dark:to-cyan-900/30 text-slate-900 dark:text-white rounded-tl-md border border-blue-200 dark:border-blue-800"
              : "bg-gradient-to-br from-slate-100 to-slate-50 dark:from-zinc-800 dark:to-zinc-700 text-slate-900 dark:text-white rounded-tr-md"
          }`}
        >
          {message.typing ? (
            <div className="flex items-center gap-2">
              <div className="flex gap-0.5 sm:gap-1">
                <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-blue-500 rounded-full animate-bounce" />
                <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-blue-500 rounded-full animate-bounce delay-100" />
                <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-blue-500 rounded-full animate-bounce delay-200" />
              </div>
              <span className="text-xs sm:text-sm text-blue-600 dark:text-blue-400">AI thinking...</span>
            </div>
          ) : (
            <>
              <p className="text-xs sm:text-sm leading-relaxed">{message.text}</p>
              
              {/* Action Buttons */}
              {showActions && message.actions && message.actions.length > 0 && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                  className="mt-2 sm:mt-3 flex flex-wrap gap-1.5 sm:gap-2"
                >
                  {message.actions.map((action, index) => (
                    <motion.button
                      key={index}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className={`px-2 sm:px-3 py-0.5 sm:py-1 rounded-md sm:rounded-lg text-[10px] sm:text-xs font-medium transition-all ${
                        action.type === "book" 
                          ? "bg-blue-500 hover:bg-blue-600 text-white"
                          : action.type === "schedule"
                          ? "bg-purple-500 hover:bg-purple-600 text-white"
                          : "bg-emerald-500 hover:bg-emerald-600 text-white"
                      }`}
                    >
                      {action.type === "book" && "📅 Book Demo"}
                      {action.type === "schedule" && "⏰ Confirm"}
                      {action.type === "quote" && "💰 Quote"}
                    </motion.button>
                  ))}
                </motion.div>
              )}
            </>
          )}
        </motion.div>

        {/* Timestamp */}
        <div className={`text-[10px] sm:text-xs text-slate-500 dark:text-zinc-400 mt-0.5 sm:mt-1 ${
          isAI ? "text-left" : "text-right"
        }`}>
          {message.timestamp}
          {isAI && (
            <span className="ml-1 sm:ml-2 inline-flex items-center gap-0.5 sm:gap-1">
              <Zap className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-blue-500" />
              <span className="text-blue-500">AI</span>
            </span>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export const AIAssistantDemo: React.FC = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [currentStep, setCurrentStep] = useState(0);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const playConversation = async () => {
      if (currentStep >= mockConversations.length) {
        // Reset and start over
        setTimeout(() => {
          setMessages([]);
          setCurrentStep(0);
        }, 3000);
        return;
      }

      const conversation = mockConversations[currentStep];
      
      // Add user message
      const userMessage: ChatMessage = {
        id: `user-${currentStep}`,
        text: conversation.user,
        sender: "user",
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      
      setMessages(prev => [...prev, userMessage]);
      
      // Show AI typing
      setTimeout(() => {
        const typingMessage: ChatMessage = {
          id: `typing-${currentStep}`,
          text: "",
          sender: "ai",
          timestamp: "",
          typing: true
        };
        setMessages(prev => [...prev, typingMessage]);
      }, 1000);

      // Add AI response
      setTimeout(() => {
        setMessages(prev => prev.filter(msg => !msg.typing));
        
        const aiMessage: ChatMessage = {
          id: `ai-${currentStep}`,
          text: conversation.ai,
          sender: "ai",
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          actions: conversation.actions
        };
        
        setMessages(prev => [...prev, aiMessage]);
        setCurrentStep(prev => prev + 1);
      }, 3000 + Math.random() * 1000);
    };

    const timer = setTimeout(playConversation, currentStep === 0 ? 1000 : 4000);
    return () => clearTimeout(timer);
  }, [currentStep]);

  return (
    <div className="w-full h-full bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/20 rounded-lg sm:rounded-xl overflow-hidden flex flex-col">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-cyan-600 text-white p-3 sm:p-4">
        <div className="flex items-center gap-2 sm:gap-3">
          <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-white/20 flex items-center justify-center">
            <Brain className="w-4 h-4 sm:w-5 sm:h-5" />
          </div>
          <div>
            <h2 className="text-base sm:text-lg font-semibold">AI Assistant</h2>
            <div className="flex items-center gap-1.5 sm:gap-2 text-blue-100">
              <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-green-400 rounded-full animate-pulse" />
              <span className="text-xs sm:text-sm">Online 24/7</span>
            </div>
          </div>
        </div>
      </div>

      {/* Chat Messages */}
      <div className="flex-1 overflow-y-auto p-3 sm:p-4 min-h-[900px]">
        {messages.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-8 sm:py-12"
          >
            <div className="w-10 h-10 sm:w-12 sm:h-12 mx-auto mb-3 sm:mb-4 rounded-full bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center text-white">
              <Brain className="w-5 h-5 sm:w-6 sm:h-6" />
            </div>
            <h3 className="text-base sm:text-lg font-semibold text-slate-900 dark:text-white mb-1.5 sm:mb-2">
              AI Assistant Ready
            </h3>
            <p className="text-slate-600 dark:text-zinc-400 text-xs sm:text-sm px-4">
              Watch how our AI handles inquiries and books appointments
            </p>
          </motion.div>
        )}

        {messages.map(message => (
          <AIMessage 
            key={message.id} 
            message={message} 
            showActions={message.sender === "ai" && !message.typing}
          />
        ))}

        <div ref={messagesEndRef} />
      </div>
    </div>
  );
};

export default AIAssistantDemo;
