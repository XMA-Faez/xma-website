"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ChevronDown,
  MessageCircle,
  Settings,
  Shield,
  CreditCard,
  HelpCircle,
  Search,
  Users,
  Zap,
  X,
} from "lucide-react";
import { Badge } from "@/components/ui/Badge";

interface FAQ {
  id: string;
  question: string;
  answer: string;
  category: string;
  tags: string[];
  popularity: number;
}

interface FAQCategory {
  id: string;
  name: string;
  icon: React.ReactNode;
  color: string;
  description: string;
}

const ModularFAQ: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<string>("all");
  const [openFAQ, setOpenFAQ] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");

  const categories: FAQCategory[] = [
    {
      id: "all",
      name: "All Questions",
      icon: <HelpCircle className="w-5 h-5" />,
      color: "emerald",
      description: "Browse all frequently asked questions",
    },
    {
      id: "whatsapp",
      name: "WhatsApp Integration",
      icon: <MessageCircle className="w-5 h-5" />,
      color: "green",
      description: "WhatsApp Business setup and features",
    },
    {
      id: "ai-chatbot",
      name: "AI Chatbot",
      icon: <Zap className="w-5 h-5" />,
      color: "blue",
      description: "AI chatbot training and capabilities",
    },
    {
      id: "setup",
      name: "Setup & Training",
      icon: <Settings className="w-5 h-5" />,
      color: "purple",
      description: "Getting started and onboarding",
    },
    {
      id: "security",
      name: "Security & Privacy",
      icon: <Shield className="w-5 h-5" />,
      color: "orange",
      description: "Data protection and compliance",
    },
    {
      id: "pricing",
      name: "Pricing & Plans",
      icon: <CreditCard className="w-5 h-5" />,
      color: "pink",
      description: "Costs, billing, and plan options",
    },
    {
      id: "team",
      name: "Team & Collaboration",
      icon: <Users className="w-5 h-5" />,
      color: "cyan",
      description: "Multiple users and permissions",
    },
  ];

  const faqs: FAQ[] = [
    // WhatsApp Integration
    {
      id: "whatsapp-setup-time",
      question: "How quickly can I set up WhatsApp integration?",
      answer:
        "WhatsApp Business integration takes just 5-10 minutes. Simply scan a QR code to connect your WhatsApp Business account, and you're ready to start receiving and managing leads directly in the CRM. Our setup wizard guides you through each step.",
      category: "whatsapp",
      tags: ["setup", "quick", "integration"],
      popularity: 95,
    },
    {
      id: "existing-whatsapp",
      question: "Will this work with my existing WhatsApp Business number?",
      answer:
        "Yes! The CRM connects directly to your existing WhatsApp Business account. You keep your current number, and all your contacts remain intact. The system simply adds powerful automation and management features on top of your existing setup.",
      category: "whatsapp",
      tags: ["existing", "number", "contacts"],
      popularity: 90,
    },
    {
      id: "whatsapp-difference",
      question: "What makes this different from regular WhatsApp Business?",
      answer:
        "While WhatsApp Business is great for basic messaging, our CRM adds lead tracking, automated responses, pipeline management, team collaboration, analytics, and integration with other marketing channels - all in one place. Think of it as WhatsApp Business on steroids.",
      category: "whatsapp",
      tags: ["features", "comparison", "benefits"],
      popularity: 85,
    },
    {
      id: "multiple-numbers",
      question: "Can I connect multiple WhatsApp Business numbers?",
      answer:
        "Yes, you can connect multiple WhatsApp Business numbers to the same CRM account. This is perfect for businesses with different departments or locations. Each number appears as a separate inbox with unified contact management.",
      category: "whatsapp",
      tags: ["multiple", "numbers", "departments"],
      popularity: 70,
    },

    // AI Chatbot
    {
      id: "ai-accuracy",
      question: "How accurate is the AI chatbot?",
      answer:
        "Our AI chatbot achieves 95% accuracy in customer responses after proper training. It's built on advanced language models specifically trained for UAE business contexts, including Arabic and English conversations. The accuracy improves over time as it learns from your specific business interactions.",
      category: "ai-chatbot",
      tags: ["accuracy", "training", "languages"],
      popularity: 92,
    },
    {
      id: "ai-training",
      question: "How do I train the AI on my business?",
      answer:
        "Training is simple and guided. Upload your website content, FAQs, service descriptions, and pricing information. The AI learns your business tone, offerings, and common customer questions. You can also train it by reviewing and correcting responses in the first few weeks.",
      category: "ai-chatbot",
      tags: ["training", "setup", "customization"],
      popularity: 88,
    },
    {
      id: "ai-handoff",
      question: "When does the AI hand off to human agents?",
      answer:
        "The AI automatically hands off when it detects complex queries it can't handle, when customers specifically request human support, or when you set custom triggers (like high-value leads). The handoff includes full conversation context so your team can continue seamlessly.",
      category: "ai-chatbot",
      tags: ["handoff", "human", "complex"],
      popularity: 80,
    },
    {
      id: "ai-languages",
      question: "Does the AI chatbot support Arabic?",
      answer:
        "Yes! Our AI chatbot is fully trained in both Arabic and English, understanding UAE dialects and business contexts. It can detect the customer's preferred language and respond accordingly, making it perfect for local UAE businesses.",
      category: "ai-chatbot",
      tags: ["arabic", "languages", "uae"],
      popularity: 87,
    },

    // Setup & Training
    {
      id: "setup-time",
      question: "How long does the complete setup take?",
      answer:
        "Complete setup typically takes 24-48 hours. This includes WhatsApp integration (5 minutes), AI training (few hours), team onboarding (1 day), and customization. We provide dedicated support throughout the process to ensure everything works perfectly for your business.",
      category: "setup",
      tags: ["timeline", "onboarding", "support"],
      popularity: 93,
    },
    {
      id: "training-provided",
      question: "Do you provide training for my team?",
      answer:
        "Yes! We provide comprehensive training including live video sessions, recorded tutorials in Arabic and English, written guides, and ongoing support. Your team will be fully confident using the system within the first week.",
      category: "setup",
      tags: ["training", "team", "support"],
      popularity: 89,
    },
    {
      id: "technical-requirements",
      question: "What are the technical requirements?",
      answer:
        "Minimal technical requirements! You need an active WhatsApp Business account, internet connection, and any modern web browser. No special hardware or software installation required. It works on desktop, tablet, and mobile devices.",
      category: "setup",
      tags: ["requirements", "technical", "devices"],
      popularity: 75,
    },

    // Security & Privacy
    {
      id: "data-security",
      question: "Is my customer data secure?",
      answer:
        "Absolutely. We use bank-level encryption (256-bit SSL), comply with UAE data protection regulations, and store data in secure UAE-based servers. Your data is never shared with third parties, and you have full control over data access and permissions.",
      category: "security",
      tags: ["security", "encryption", "compliance"],
      popularity: 91,
    },
    {
      id: "data-ownership",
      question: "Who owns the customer data?",
      answer:
        "You own all your customer data. We're simply the secure platform that stores and processes it for you. You can export your data at any time, and if you ever leave, you take all your data with you. We never claim ownership of your business information.",
      category: "security",
      tags: ["ownership", "export", "data"],
      popularity: 82,
    },
    {
      id: "gdpr-compliance",
      question: "Are you GDPR and UAE law compliant?",
      answer:
        "Yes, we fully comply with GDPR, UAE Data Protection Law, and international privacy standards. We have proper data processing agreements, privacy controls, and audit trails. Regular compliance audits ensure we maintain the highest standards.",
      category: "security",
      tags: ["gdpr", "compliance", "privacy"],
      popularity: 78,
    },

    // Pricing & Plans
    {
      id: "pricing-cost",
      question: "How much does the CRM cost?",
      answer:
        "Plans start from AED 299/month for small businesses, with enterprise options available. We offer 14-day free trials, no setup fees, and month-to-month billing. The ROI typically pays for itself within the first month through increased lead conversion.",
      category: "pricing",
      tags: ["cost", "plans", "trial"],
      popularity: 96,
    },
    {
      id: "free-trial",
      question: "Is there a free trial?",
      answer:
        "Yes! We offer a 14-day free trial with full access to all features. No credit card required to start. During the trial, you get full setup support, training, and can process unlimited leads to see the real impact on your business.",
      category: "pricing",
      tags: ["trial", "free", "features"],
      popularity: 90,
    },
    {
      id: "contract-terms",
      question: "Do I need to sign a long-term contract?",
      answer:
        "No long-term contracts required! We offer month-to-month billing because we're confident you'll love the results. You can cancel anytime with 30 days' notice. Many clients choose annual billing for discounts, but it's completely optional.",
      category: "pricing",
      tags: ["contract", "billing", "cancel"],
      popularity: 85,
    },

    // Team & Collaboration
    {
      id: "team-members",
      question: "Can multiple team members use the system?",
      answer:
        "Yes! Add unlimited team members with different permission levels. Everyone can collaborate on leads, share notes, and track customer interactions while maintaining clear ownership and accountability. Perfect for sales teams and customer service departments.",
      category: "team",
      tags: ["multiple", "permissions", "collaboration"],
      popularity: 88,
    },
    {
      id: "user-permissions",
      question: "How do user permissions work?",
      answer:
        "You can set different access levels: Admin (full access), Manager (team oversight), Agent (lead management), and Viewer (reports only). Control who can see what data, modify settings, or access specific features. Perfect for maintaining security and workflow organization.",
      category: "team",
      tags: ["permissions", "access", "roles"],
      popularity: 73,
    },
  ];

  // Filter FAQs based on category and search
  const filteredFAQs = faqs
    .filter((faq) => {
      const matchesCategory =
        activeCategory === "all" || faq.category === activeCategory;
      const matchesSearch =
        !searchQuery ||
        faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
        faq.answer.toLowerCase().includes(searchQuery.toLowerCase()) ||
        faq.tags.some((tag) =>
          tag.toLowerCase().includes(searchQuery.toLowerCase()),
        );

      return matchesCategory && matchesSearch;
    })
    .sort((a, b) => b.popularity - a.popularity);

  const getColorClasses = (color: string) => {
    const colorMap = {
      emerald: {
        bg: "from-emerald-500/20 to-green-400/10",
        text: "text-emerald-600",
        border: "border-emerald-500/30",
        hover: "hover:border-emerald-500/50",
      },
      green: {
        bg: "from-green-500/20 to-emerald-400/10",
        text: "text-green-700",
        border: "border-green-500/30",
        hover: "hover:border-green-500/50",
      },
      blue: {
        bg: "from-blue-500/20 to-cyan-400/10",
        text: "text-blue-400",
        border: "border-blue-500/30",
        hover: "hover:border-blue-500/50",
      },
      purple: {
        bg: "from-purple-500/20 to-pink-400/10",
        text: "text-purple-400",
        border: "border-purple-500/30",
        hover: "hover:border-purple-500/50",
      },
      orange: {
        bg: "from-orange-500/20 to-yellow-400/10",
        text: "text-orange-400",
        border: "border-orange-500/30",
        hover: "hover:border-orange-500/50",
      },
      pink: {
        bg: "from-pink-500/20 to-rose-400/10",
        text: "text-pink-400",
        border: "border-pink-500/30",
        hover: "hover:border-pink-500/50",
      },
      cyan: {
        bg: "from-cyan-500/20 to-teal-400/10",
        text: "text-cyan-400",
        border: "border-cyan-500/30",
        hover: "hover:border-cyan-500/50",
      },
    };
    return colorMap[color as keyof typeof colorMap] || colorMap.emerald;
  };

  return (
    <div className="py-20 relative">
      <div className="max-w-6xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <Badge variant="success" className="mb-6">
            <HelpCircle className="w-4 h-4" />
            Frequently Asked Questions
          </Badge>
          <h2 className="text-3xl md:text-5xl font-bold mb-4 text-slate-900 dark:text-white">
            Got Questions? We Have
            <span className="bg-gradient-to-r from-emerald-400 to-green-300 bg-clip-text text-transparent">
              {" "}
              Answers
            </span>
          </h2>
          <p className="text-xl text-slate-600 dark:text-zinc-400 max-w-3xl mx-auto">
            Everything you need to know about our AI-powered CRM for UAE
            businesses
          </p>
        </motion.div>

        {/* Search Bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          viewport={{ once: true }}
          className="relative max-w-2xl mx-auto mb-12"
        >
          <div className="relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-500 dark:text-zinc-400" />
            <input
              type="text"
              placeholder="Search questions..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-12 py-4 rounded-2xl glass-primary border border-slate-300 dark:border-zinc-700 focus:border-emerald-500/50 focus:outline-none text-slate-900 dark:text-white placeholder-slate-500 dark:placeholder-zinc-400"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 text-slate-500 dark:text-zinc-400 hover:text-slate-900 dark:hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            )}
          </div>
        </motion.div>

        {/* Category Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          viewport={{ once: true }}
          className="flex flex-wrap justify-center gap-3 mb-12"
        >
          {categories.map((category, index) => {
            const isActive = activeCategory === category.id;
            const colors = getColorClasses(category.color);

            return (
              <motion.button
                key={category.id}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
                viewport={{ once: true }}
                onClick={() => setActiveCategory(category.id)}
                className={`flex items-center gap-2 px-4 py-3 rounded-2xl font-medium ${
                  isActive
                    ? `bg-gradient-to-br ${colors.bg} border ${colors.border} ${colors.text}`
                    : `glass-primary hover:glass-secondary border border-transparent ${colors.hover}`
                }`}
              >
                <span className={isActive ? colors.text : "text-slate-600 dark:text-zinc-400"}>
                  {category.icon}
                </span>
                <span className={isActive ? colors.text : "text-slate-700 dark:text-zinc-300"}>
                  {category.name}
                </span>
                {category.id !== "all" && (
                  <span
                    className={`text-xs px-2 py-1 rounded-full ${
                      isActive ? "bg-white/10 dark:bg-white/10 bg-slate-900/10" : "bg-slate-200 dark:bg-zinc-800"
                    }`}
                  >
                    {faqs.filter((faq) => faq.category === category.id).length}
                  </span>
                )}
              </motion.button>
            );
          })}
        </motion.div>

        {/* FAQ List */}
        <div className="space-y-4">
          <AnimatePresence mode="wait">
            {filteredFAQs.map((faq, index) => {
              const isOpen = openFAQ === faq.id;
              const category = categories.find((c) => c.id === faq.category);
              const colors = getColorClasses(category?.color || "emerald");

              return (
                <motion.div
                  key={faq.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                  className={`rounded-2xl glass-primary hover:glass-secondary border ${
                    isOpen
                      ? `${colors.border} ${colors.bg}`
                      : "border-slate-300 dark:border-zinc-800 hover:border-slate-400 dark:hover:border-zinc-700"
                  }`}
                >
                  <button
                    onClick={() => setOpenFAQ(isOpen ? null : faq.id)}
                    className="w-full p-6 text-left"
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <span className={colors.text}>{category?.icon}</span>
                          <span
                            className={`text-xs px-2 py-1 rounded-full ${colors.text} bg-white/10`}
                          >
                            {category?.name}
                          </span>
                          {faq.popularity >= 90 && (
                            <Badge variant="success" size="sm">
                              Popular
                            </Badge>
                          )}
                        </div>
                        <h3
                          className={`text-lg font-semibold pr-4 ${isOpen ? colors.text : "text-slate-900 dark:text-zinc-200"}`}
                        >
                          {faq.question}
                        </h3>
                      </div>
                      <ChevronDown
                        className={`w-5 h-5 ${colors.text} transition-transform duration-300 flex-shrink-0 ${
                          isOpen ? "rotate-180" : ""
                        }`}
                      />
                    </div>
                  </button>

                  <AnimatePresence>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="overflow-hidden"
                      >
                        <div className="px-6 pb-6">
                          <div className="pl-8">
                            <p className="text-slate-700 dark:text-zinc-300 leading-relaxed mb-4">
                              {faq.answer}
                            </p>

                            {/* Tags */}
                            <div className="flex flex-wrap gap-2">
                              {faq.tags.map((tag, tagIndex) => (
                                <span
                                  key={tagIndex}
                                  className="text-xs px-2 py-1 bg-slate-200 dark:bg-zinc-800 text-slate-600 dark:text-zinc-400 rounded-full"
                                >
                                  {tag}
                                </span>
                              ))}
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>

        {/* No Results */}
        {filteredFAQs.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-12"
          >
            <HelpCircle className="w-16 h-16 text-slate-400 dark:text-zinc-600 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-slate-700 dark:text-zinc-300 mb-2">
              No questions found
            </h3>
            <p className="text-slate-600 dark:text-zinc-400 mb-6">
              Try adjusting your search terms or browse a different category
            </p>
            <button
              onClick={() => {
                setSearchQuery("");
                setActiveCategory("all");
              }}
              className="px-6 py-3 rounded-xl glass-primary hover:glass-secondary font-medium text-slate-900 dark:text-white"
            >
              Show All Questions
            </button>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default ModularFAQ;

