"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ChevronDown,
  Settings,
  Target,
  BarChart3,
  CreditCard,
  HelpCircle,
  Search,
  Users,
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

const LeadGenFAQ: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<string>("all");
  const [openFAQ, setOpenFAQ] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");

  const categories: FAQCategory[] = [
    {
      id: "all",
      name: "All Questions",
      icon: <HelpCircle className="w-5 h-5" />,
      color: "amber",
      description: "Browse all frequently asked questions",
    },
    {
      id: "setup",
      name: "Campaign Setup",
      icon: <Settings className="w-5 h-5" />,
      color: "amber",
      description: "Campaign setup and onboarding",
    },
    {
      id: "targeting",
      name: "Targeting",
      icon: <Target className="w-5 h-5" />,
      color: "blue",
      description: "Audience targeting and segmentation",
    },
    {
      id: "reporting",
      name: "Reporting",
      icon: <BarChart3 className="w-5 h-5" />,
      color: "purple",
      description: "Analytics, dashboards, and reporting",
    },
    {
      id: "pricing",
      name: "Pricing",
      icon: <CreditCard className="w-5 h-5" />,
      color: "orange",
      description: "Costs, billing, and budget management",
    },
    {
      id: "google",
      name: "Google Ads",
      icon: <Search className="w-5 h-5" />,
      color: "green",
      description: "Google Ads specific questions",
    },
    {
      id: "meta",
      name: "Meta Ads",
      icon: <Users className="w-5 h-5" />,
      color: "cyan",
      description: "Facebook and Instagram advertising",
    },
  ];

  const faqs: FAQ[] = [
    {
      id: "setup-timeline",
      question: "How long does it take to set up and launch campaigns?",
      answer:
        "Campaign setup typically takes 5-7 business days. This includes audience research, campaign structure design, ad creative development, tracking setup, and landing page review. We launch with a phased approach to ensure quality data from day one.",
      category: "setup",
      tags: ["timeline", "onboarding", "launch"],
      popularity: 96,
    },
    {
      id: "minimum-budget",
      question: "What is the minimum ad budget you recommend?",
      answer:
        "We recommend a minimum monthly ad budget of 5,000 AED for a single platform (Google or Meta). For dual-platform campaigns, we suggest at least 8,000 AED. This ensures enough data for optimization and meaningful results. Our management fee is separate from your ad spend.",
      category: "pricing",
      tags: ["budget", "minimum", "cost"],
      popularity: 95,
    },
    {
      id: "how-targeting-works",
      question: "How do you target the right audience for my business?",
      answer:
        "We use a multi-layered targeting approach: first-party data from your existing customers, intent signals from search behavior, demographic and interest layering, lookalike audiences built from your best customers, and retargeting sequences for website visitors. Each layer is tested and refined based on performance data.",
      category: "targeting",
      tags: ["audience", "targeting", "segmentation"],
      popularity: 93,
    },
    {
      id: "reporting-frequency",
      question: "How often do I receive performance reports?",
      answer:
        "You receive a real-time dashboard you can access anytime. Additionally, we provide weekly summary emails highlighting key metrics and optimizations made. Monthly deep-dive reports include strategic recommendations, competitive analysis, and next-month planning. Quarterly business reviews ensure alignment with your growth goals.",
      category: "reporting",
      tags: ["reports", "dashboard", "frequency"],
      popularity: 91,
    },
    {
      id: "contract-terms",
      question: "Do I need to sign a long-term contract?",
      answer:
        "No long-term contracts required. We operate on a month-to-month basis with 30 days notice to cancel. We believe in earning your business through results, not contracts. Most clients stay because they see consistent ROI growth month over month.",
      category: "pricing",
      tags: ["contract", "terms", "cancel"],
      popularity: 94,
    },
    {
      id: "google-vs-meta",
      question: "Should I run Google Ads or Meta Ads?",
      answer:
        "It depends on your business and goals. Google Ads captures high-intent search traffic - people actively looking for your service. Meta Ads is powerful for building awareness, reaching new audiences, and retargeting. Most UAE businesses get the best results combining both platforms. We recommend starting with the platform that best matches your customer journey.",
      category: "google",
      tags: ["comparison", "platform", "strategy"],
      popularity: 92,
    },
    {
      id: "retargeting-strategy",
      question: "How does retargeting work in your campaigns?",
      answer:
        "We set up multi-touch retargeting sequences: website visitors see relevant ads within 24 hours, video viewers get follow-up offers, form abandoners receive compelling reminders, and past customers see upsell campaigns. Each audience gets customized messaging based on their interaction stage, dramatically improving conversion rates.",
      category: "targeting",
      tags: ["retargeting", "remarketing", "conversion"],
      popularity: 88,
    },
    {
      id: "landing-pages",
      question: "Do you create landing pages for campaigns?",
      answer:
        "Yes, we strongly recommend dedicated landing pages and can create them as part of our service. Custom landing pages typically improve conversion rates by 30-50% compared to sending traffic to your homepage. We design, build, and A/B test landing pages optimized for each campaign and audience segment.",
      category: "setup",
      tags: ["landing pages", "conversion", "design"],
      popularity: 87,
    },
    {
      id: "industries-served",
      question: "What industries do you serve?",
      answer:
        "We serve all major UAE industries including real estate, e-commerce, automotive, healthcare, F&B, education, professional services, hospitality, and more. Each industry has unique targeting strategies and benchmarks. Our team has deep experience in UAE market dynamics across all these verticals.",
      category: "setup",
      tags: ["industries", "experience", "verticals"],
      popularity: 85,
    },
    {
      id: "billing-process",
      question: "How does billing work?",
      answer:
        "Our management fee is billed monthly at the start of each period. Your ad spend goes directly to Google/Meta through your own ad accounts - we never hold your ad budget. You maintain full ownership and control of your accounts. We provide transparent reporting on every dirham spent.",
      category: "pricing",
      tags: ["billing", "payment", "transparency"],
      popularity: 90,
    },
    {
      id: "google-search-ads",
      question: "How do you optimize Google Search campaigns?",
      answer:
        "We focus on keyword intent matching, negative keyword management, ad copy testing, quality score improvement, bid strategy optimization, and landing page relevance. We structure campaigns using Single Theme Ad Groups (STAGs) for maximum control and continuously refine based on search term reports and conversion data.",
      category: "google",
      tags: ["search", "optimization", "keywords"],
      popularity: 84,
    },
    {
      id: "meta-creative-strategy",
      question: "What type of ad creatives work best on Meta?",
      answer:
        "For UAE audiences, we find that video ads (15-30 seconds), carousel ads showcasing multiple offerings, and user-generated content style creatives perform best. We test multiple formats and messaging angles, then scale what works. Arabic/English bilingual creatives often outperform single-language ads in the UAE market.",
      category: "meta",
      tags: ["creative", "video", "format"],
      popularity: 86,
    },
    {
      id: "lead-quality",
      question: "How do you ensure lead quality?",
      answer:
        "Lead quality is our priority. We implement multi-step forms that pre-qualify leads, use platform-specific quality optimization features, set up lead scoring in your CRM, and continuously exclude low-quality traffic sources. We optimize for downstream conversions (sales), not just lead volume, ensuring you get prospects ready to buy.",
      category: "targeting",
      tags: ["quality", "leads", "qualification"],
      popularity: 89,
    },
    {
      id: "meta-lookalike",
      question: "How do lookalike audiences work on Meta?",
      answer:
        "We upload your best customer data (email lists, phone numbers, website converters) to Meta, which then finds new users who share similar characteristics and behaviors. We create lookalike audiences at different percentage ranges (1-3% for precision, 5-10% for scale) and test them against interest-based audiences to find the most profitable segments.",
      category: "meta",
      tags: ["lookalike", "audience", "expansion"],
      popularity: 83,
    },
    {
      id: "performance-max",
      question: "What is Google Performance Max and should I use it?",
      answer:
        "Performance Max is Google's AI-powered campaign type that runs across all Google properties (Search, Display, YouTube, Gmail, Maps, Discovery). It works well for businesses with strong conversion data and diverse creative assets. We typically recommend it alongside traditional Search campaigns for maximum coverage, especially for e-commerce and lead generation in the UAE market.",
      category: "google",
      tags: ["performance max", "automation", "AI"],
      popularity: 82,
    },
    {
      id: "attribution-model",
      question: "How do you track which ads are driving results?",
      answer:
        "We implement comprehensive tracking using Google Analytics 4, Google Tag Manager, Meta Conversion API (server-side tracking), and UTM parameters. We set up multi-touch attribution models so you can see the full customer journey, not just last-click data. This helps allocate budget to the channels and campaigns that truly drive revenue.",
      category: "reporting",
      tags: ["attribution", "tracking", "analytics"],
      popularity: 81,
    },
    {
      id: "account-ownership",
      question: "Do I own my ad accounts and data?",
      answer:
        "Absolutely. You own everything. We set up campaigns in your ad accounts (Google Ads, Meta Business Manager) and you maintain full admin access at all times. All creative assets, audience data, and historical performance data belong to you. If we part ways, everything stays with you.",
      category: "pricing",
      tags: ["ownership", "accounts", "data"],
      popularity: 80,
    },
  ];

  const filteredFAQs = faqs
    .filter((faq) => {
      const matchesCategory =
        activeCategory === "all" || faq.category === activeCategory;
      const matchesSearch =
        !searchQuery ||
        faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
        faq.answer.toLowerCase().includes(searchQuery.toLowerCase()) ||
        faq.tags.some((tag) =>
          tag.toLowerCase().includes(searchQuery.toLowerCase())
        );

      return matchesCategory && matchesSearch;
    })
    .sort((a, b) => b.popularity - a.popularity);

  const getColorClasses = (color: string) => {
    const colorMap: Record<
      string,
      { bg: string; text: string; border: string; hover: string }
    > = {
      amber: {
        bg: "from-amber-500/20 to-yellow-400/10",
        text: "text-amber-400",
        border: "border-amber-500/30",
        hover: "hover:border-amber-500/50",
      },
      green: {
        bg: "from-green-500/20 to-emerald-400/10",
        text: "text-green-400",
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
    return colorMap[color] || colorMap.amber;
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
          <Badge variant="warning" className="mb-6">
            <HelpCircle className="w-4 h-4" />
            Frequently Asked Questions
          </Badge>
          <h2 className="text-3xl md:text-5xl font-bold mb-4 text-white">
            Got Questions? We Have
            <span className="bg-gradient-to-r from-amber-400 to-yellow-300 bg-clip-text text-transparent">
              {" "}
              Answers
            </span>
          </h2>
          <p className="text-xl text-zinc-400 max-w-3xl mx-auto">
            Everything you need to know about our lead generation and paid
            advertising services for UAE businesses
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          viewport={{ once: true }}
          className="relative max-w-2xl mx-auto mb-12"
        >
          <div className="relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-zinc-400" />
            <input
              type="text"
              placeholder="Search questions..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-12 py-4 rounded-2xl glass-primary border border-zinc-700 focus:border-amber-500/50 focus:outline-none text-white placeholder-zinc-400"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 text-zinc-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            )}
          </div>
        </motion.div>

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
                <span
                  className={
                    isActive
                      ? colors.text
                      : "text-zinc-400"
                  }
                >
                  {category.icon}
                </span>
                <span
                  className={
                    isActive
                      ? colors.text
                      : "text-zinc-300"
                  }
                >
                  {category.name}
                </span>
                {category.id !== "all" && (
                  <span
                    className={`text-xs px-2 py-1 rounded-full ${
                      isActive
                        ? "bg-white/10"
                        : "bg-zinc-800"
                    }`}
                  >
                    {faqs.filter((faq) => faq.category === category.id).length}
                  </span>
                )}
              </motion.button>
            );
          })}
        </motion.div>

        <div className="space-y-4">
          <AnimatePresence mode="wait">
            {filteredFAQs.map((faq, index) => {
              const isOpen = openFAQ === faq.id;
              const category = categories.find((c) => c.id === faq.category);
              const colors = getColorClasses(category?.color || "amber");

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
                      : "border-zinc-800 hover:border-zinc-700"
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
                            <Badge variant="warning" size="sm">
                              Popular
                            </Badge>
                          )}
                        </div>
                        <h3
                          className={`text-lg font-semibold pr-4 ${isOpen ? colors.text : "text-zinc-200"}`}
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
                          <div>
                            <p className="text-zinc-300 leading-relaxed mb-4">
                              {faq.answer}
                            </p>

                            <div className="flex flex-wrap gap-2">
                              {faq.tags.map((tag, tagIndex) => (
                                <span
                                  key={tagIndex}
                                  className="text-xs px-2 py-1 bg-zinc-800 text-zinc-400 rounded-full"
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

        {filteredFAQs.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-12"
          >
            <HelpCircle className="w-16 h-16 text-zinc-600 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-zinc-300 mb-2">
              No questions found
            </h3>
            <p className="text-zinc-400 mb-6">
              Try adjusting your search terms or browse a different category
            </p>
            <button
              onClick={() => {
                setSearchQuery("");
                setActiveCategory("all");
              }}
              className="px-6 py-3 rounded-xl glass-primary hover:glass-secondary font-medium text-white"
            >
              Show All Questions
            </button>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default LeadGenFAQ;
