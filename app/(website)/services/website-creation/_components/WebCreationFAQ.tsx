"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ChevronDown,
  Clock,
  Code,
  Palette,
  FileEdit,
  Search,
  CreditCard,
  HelpCircle,
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

const WebCreationFAQ: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<string>("all");
  const [openFAQ, setOpenFAQ] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");

  const categories: FAQCategory[] = [
    {
      id: "all",
      name: "All Questions",
      icon: <HelpCircle className="w-5 h-5" />,
      color: "blue",
      description: "Browse all frequently asked questions",
    },
    {
      id: "process",
      name: "Process & Timeline",
      icon: <Clock className="w-5 h-5" />,
      color: "sky",
      description: "How our development process works",
    },
    {
      id: "technology",
      name: "Technology",
      icon: <Code className="w-5 h-5" />,
      color: "purple",
      description: "Tech stack and development details",
    },
    {
      id: "design",
      name: "Design",
      icon: <Palette className="w-5 h-5" />,
      color: "pink",
      description: "Design process and customization",
    },
    {
      id: "content",
      name: "Content Management",
      icon: <FileEdit className="w-5 h-5" />,
      color: "amber",
      description: "CMS and content editing",
    },
    {
      id: "seo",
      name: "SEO",
      icon: <Search className="w-5 h-5" />,
      color: "emerald",
      description: "Search engine optimization",
    },
    {
      id: "pricing",
      name: "Pricing",
      icon: <CreditCard className="w-5 h-5" />,
      color: "orange",
      description: "Costs, billing, and packages",
    },
  ];

  const faqs: FAQ[] = [
    {
      id: "timeline",
      question: "How long does it take to build a website?",
      answer:
        "A typical project takes 6-10 weeks from kickoff to launch. This includes discovery and research (1 week), strategy and wireframing (1 week), custom design (2 weeks), development and CMS integration (2-3 weeks), testing and QA (1 week), and launch preparation (1 week). Complex projects with advanced features may take longer, and we will provide a detailed timeline during your strategy call.",
      category: "process",
      tags: ["timeline", "launch", "duration"],
      popularity: 98,
    },
    {
      id: "why-nextjs",
      question: "Why do you use Next.js instead of WordPress?",
      answer:
        "Next.js delivers dramatically better performance, security, and SEO compared to WordPress. WordPress sites average 6+ second load times and require constant plugin updates and security patches. Next.js sites load in under 2 seconds, score 90+ on PageSpeed, and have zero plugin vulnerabilities. It is the same technology used by Nike, Twitch, Netflix, and other Fortune 500 companies. For businesses serious about conversions, Next.js is the clear choice.",
      category: "technology",
      tags: ["nextjs", "wordpress", "performance", "comparison"],
      popularity: 96,
    },
    {
      id: "cms-training",
      question: "Will I be able to update content myself?",
      answer:
        "Absolutely. Every website we build includes Sanity CMS, which gives you a visual, user-friendly editor for all your content. We provide comprehensive training sessions for your team, including recorded video tutorials. You can update text, images, blog posts, and pages without touching any code. Most clients are comfortable managing their own content within the first week.",
      category: "content",
      tags: ["cms", "training", "sanity", "editing"],
      popularity: 95,
    },
    {
      id: "seo-included",
      question: "Is SEO included in the website build?",
      answer:
        "Yes. Every website includes comprehensive on-page SEO as standard: semantic HTML structure, optimized meta tags, structured data (JSON-LD), XML sitemaps, robots.txt configuration, Open Graph tags for social sharing, and Core Web Vitals optimization. We also set up Google Search Console and Analytics. For ongoing SEO campaigns, we offer separate monthly packages.",
      category: "seo",
      tags: ["seo", "search", "google", "included"],
      popularity: 93,
    },
    {
      id: "mobile-optimized",
      question: "Will my website work perfectly on mobile?",
      answer:
        "Mobile-first design is our default approach. Over 70% of web traffic in the UAE comes from mobile devices, so we design for mobile screens first, then scale up to tablets and desktops. Every component, layout, and interaction is tested across devices and browsers. We optimize touch targets, font sizes, and navigation for thumb-friendly mobile use.",
      category: "design",
      tags: ["mobile", "responsive", "devices"],
      popularity: 92,
    },
    {
      id: "maintenance",
      question: "What happens after launch? Do you offer maintenance?",
      answer:
        "We do not disappear after launch. Every project includes 30 days of post-launch support for bug fixes and minor adjustments. Beyond that, we offer ongoing maintenance packages that include performance monitoring, security updates, content updates, and priority support. We treat every client as a long-term partner, not a one-off project.",
      category: "process",
      tags: ["maintenance", "support", "post-launch"],
      popularity: 91,
    },
    {
      id: "hosting",
      question: "Where will my website be hosted?",
      answer:
        "We deploy on Vercel, the platform built by the creators of Next.js. Vercel provides edge deployment across a global CDN, meaning your site loads fast for visitors anywhere in the world. It includes automatic SSL certificates, DDoS protection, zero-downtime deployments, and automatic scaling. Hosting costs are typically included in our maintenance package.",
      category: "technology",
      tags: ["hosting", "vercel", "deployment"],
      popularity: 88,
    },
    {
      id: "pricing-structure",
      question: "How does pricing work?",
      answer:
        "Every project is custom-scoped based on your specific needs. We provide a detailed proposal after your free strategy call, where we understand your goals, features required, and timeline. Our websites start at AED 55,000 for a standard business website. Complex projects with custom features, integrations, or multilingual support are priced accordingly. We offer flexible payment schedules split across project milestones.",
      category: "pricing",
      tags: ["cost", "pricing", "payment", "budget"],
      popularity: 97,
    },
    {
      id: "revision-process",
      question: "How many design revisions do I get?",
      answer:
        "We include two rounds of design revisions at each major milestone (homepage design, inner pages, responsive layouts). Our collaborative process means we share designs early and often, so revisions are usually minor refinements rather than major changes. We have found that our discovery and wireframing phase aligns expectations so well that most clients approve designs within the included rounds.",
      category: "design",
      tags: ["revisions", "feedback", "design", "changes"],
      popularity: 87,
    },
    {
      id: "content-migration",
      question: "Can you migrate content from my existing website?",
      answer:
        "Yes, we handle full content migration as part of the project. We will audit your existing content, migrate what is working, and help you improve what is not. This includes text, images, blog posts, and metadata. We also set up proper 301 redirects so you do not lose any existing SEO authority from your current site.",
      category: "content",
      tags: ["migration", "existing", "content", "redirects"],
      popularity: 85,
    },
    {
      id: "multilingual",
      question: "Do you support multilingual websites (Arabic/English)?",
      answer:
        "Yes. We build multilingual websites with proper RTL (right-to-left) support for Arabic. The CMS allows you to manage content in both languages independently, and we implement proper hreflang tags for SEO in each language. Arabic typography, layout direction, and cultural considerations are all handled natively, not as an afterthought.",
      category: "technology",
      tags: ["multilingual", "arabic", "rtl", "languages"],
      popularity: 84,
    },
    {
      id: "industries",
      question: "What industries do you serve?",
      answer:
        "While we specialize in luxury car rental and premium service businesses in Dubai, we build websites for businesses across industries including hospitality, real estate, healthcare, e-commerce, and professional services. Our expertise is in high-performance, conversion-focused websites for businesses where brand perception directly impacts revenue.",
      category: "process",
      tags: ["industries", "clients", "specialization"],
      popularity: 82,
    },
    {
      id: "pagespeed-guarantee",
      question: "Do you guarantee the 90+ PageSpeed score?",
      answer:
        "Yes. Every website we build is guaranteed to score 90 or above on Google PageSpeed Insights for both mobile and desktop. If your site does not meet this threshold at launch, we continue optimizing at no additional cost until it does. This is not a marketing claim; it is a contractual guarantee backed by our architecture choices.",
      category: "technology",
      tags: ["pagespeed", "guarantee", "performance"],
      popularity: 94,
    },
    {
      id: "analytics-setup",
      question: "What analytics and tracking do you set up?",
      answer:
        "We set up comprehensive analytics as standard: Google Analytics 4 with conversion goals, Google Search Console, and basic event tracking for CTAs and forms. For clients who want deeper insights, we integrate PostHog for session replays and heatmaps, or connect to your existing analytics stack. Every setup includes a dashboard walkthrough so you know how to read your data.",
      category: "seo",
      tags: ["analytics", "tracking", "google", "posthog"],
      popularity: 80,
    },
    {
      id: "ongoing-cost",
      question: "What are the ongoing costs after launch?",
      answer:
        "Ongoing costs depend on your needs. Vercel hosting for most business sites is free or minimal (under AED 100/month). Our optional maintenance packages start at AED 2,000/month and include performance monitoring, security updates, CMS support, and priority bug fixes. Domain renewal and any third-party services (email, forms) are billed separately at their standard rates.",
      category: "pricing",
      tags: ["ongoing", "monthly", "maintenance", "costs"],
      popularity: 86,
    },
    {
      id: "dark-mode",
      question: "Can my website have dark mode?",
      answer:
        "Yes. We build dark mode support into every website by default. The implementation respects user system preferences while also allowing manual toggling. Both light and dark themes are designed with equal attention to detail, ensuring brand consistency and readability in both modes.",
      category: "design",
      tags: ["dark mode", "theme", "design"],
      popularity: 76,
    },
    {
      id: "booking-integration",
      question: "Can you integrate booking and payment systems?",
      answer:
        "Absolutely. We integrate with popular booking platforms (Calendly, Cal.com), payment gateways (Stripe, PayTabs for UAE), and custom booking flows. For car rental businesses, we can build custom availability calendars and quote request forms that feed directly into your CRM. All integrations are tested thoroughly before launch.",
      category: "technology",
      tags: ["booking", "payments", "integration", "calendar"],
      popularity: 83,
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
          tag.toLowerCase().includes(searchQuery.toLowerCase()),
        );

      return matchesCategory && matchesSearch;
    })
    .sort((a, b) => b.popularity - a.popularity);

  const getColorClasses = (color: string) => {
    const colorMap: Record<
      string,
      { bg: string; text: string; border: string; hover: string }
    > = {
      blue: {
        bg: "from-blue-500/20 to-sky-400/10",
        text: "text-blue-400",
        border: "border-blue-500/30",
        hover: "hover:border-blue-500/50",
      },
      sky: {
        bg: "from-sky-500/20 to-cyan-400/10",
        text: "text-sky-400",
        border: "border-sky-500/30",
        hover: "hover:border-sky-500/50",
      },
      purple: {
        bg: "from-purple-500/20 to-violet-400/10",
        text: "text-purple-400",
        border: "border-purple-500/30",
        hover: "hover:border-purple-500/50",
      },
      pink: {
        bg: "from-pink-500/20 to-rose-400/10",
        text: "text-pink-400",
        border: "border-pink-500/30",
        hover: "hover:border-pink-500/50",
      },
      amber: {
        bg: "from-amber-500/20 to-yellow-400/10",
        text: "text-amber-400",
        border: "border-amber-500/30",
        hover: "hover:border-amber-500/50",
      },
      emerald: {
        bg: "from-emerald-500/20 to-green-400/10",
        text: "text-emerald-400",
        border: "border-emerald-500/30",
        hover: "hover:border-emerald-500/50",
      },
      orange: {
        bg: "from-orange-500/20 to-amber-400/10",
        text: "text-orange-400",
        border: "border-orange-500/30",
        hover: "hover:border-orange-500/50",
      },
    };
    return colorMap[color] || colorMap.blue;
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
          <Badge variant="primary" className="mb-6">
            <HelpCircle className="w-4 h-4" />
            Frequently Asked Questions
          </Badge>
          <h2 className="text-3xl md:text-5xl font-bold mb-4 text-white">
            Got Questions? We Have
            <span className="bg-gradient-to-r from-blue-400 to-sky-300 bg-clip-text text-transparent">
              {" "}
              Answers
            </span>
          </h2>
          <p className="text-xl text-zinc-400 max-w-3xl mx-auto">
            Everything you need to know about our website design and development
            process
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
              className="w-full pl-12 pr-12 py-4 rounded-2xl glass-primary border border-zinc-700 focus:border-blue-500/50 focus:outline-none text-white placeholder-zinc-400"
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
              const colors = getColorClasses(category?.color || "blue");

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
                            <Badge variant="primary" size="sm">
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

export default WebCreationFAQ;
