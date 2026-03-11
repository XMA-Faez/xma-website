"use client";

import React from "react";
import { motion } from "framer-motion";
import { Target, Users, BarChart3, Filter, Zap } from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import {
  AdPerformanceDashboard,
  CampaignBuilder,
  AudienceTargetingDemo,
  LeadQualificationFlow,
} from "./feature-demos";

interface Feature {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  color: {
    bg: string;
    text: string;
    border: string;
    gradient: string;
  };
  details: string[];
  screenshot: {
    placeholder: string;
    aspectRatio: string;
  };
  demoComponent?: React.ComponentType;
}

const features: Feature[] = [
  {
    id: "campaign-strategy",
    title: "Campaign Strategy & Setup",
    description:
      "Custom campaign architecture designed around your ideal customer profile, with pixel-perfect tracking and conversion optimization from day one.",
    icon: <Target />,
    color: {
      bg: "from-amber-500/10 to-yellow-400/5",
      text: "text-amber-400",
      border: "border-amber-500/20",
      gradient: "from-amber-400 to-yellow-400",
    },
    details: [
      "Audience research & segmentation",
      "Campaign structure optimization",
      "Conversion tracking setup",
      "Landing page alignment",
      "A/B testing framework",
    ],
    screenshot: {
      placeholder:
        "Campaign Builder Interface - Shows campaign setup flow with audience targeting, budget allocation, and ad preview",
      aspectRatio: "16/9",
    },
    demoComponent: CampaignBuilder,
  },
  {
    id: "audience-targeting",
    title: "Audience Targeting",
    description:
      "Reach the exact people ready to buy with precision targeting using first-party data, lookalike audiences, and intent signals.",
    icon: <Users />,
    color: {
      bg: "from-blue-500/10 to-cyan-400/5",
      text: "text-blue-400",
      border: "border-blue-500/20",
      gradient: "from-blue-400 to-cyan-400",
    },
    details: [
      "Custom audience building",
      "Lookalike audience expansion",
      "Intent-based targeting",
      "Demographic & interest layering",
      "Retargeting sequences",
    ],
    screenshot: {
      placeholder:
        "Audience Targeting Visualization - Shows concentric targeting layers from broad to narrow audiences",
      aspectRatio: "16/9",
    },
    demoComponent: AudienceTargetingDemo,
  },
  {
    id: "performance-analytics",
    title: "Performance Analytics",
    description:
      "Real-time dashboards showing exactly where every dirham goes \u2014 from impressions to qualified leads to closed deals.",
    icon: <BarChart3 />,
    color: {
      bg: "from-purple-500/10 to-pink-400/5",
      text: "text-purple-400",
      border: "border-purple-500/20",
      gradient: "from-purple-400 to-pink-400",
    },
    details: [
      "Real-time performance dashboards",
      "Cost per lead tracking",
      "ROAS optimization",
      "Attribution modeling",
      "Monthly strategy reports",
    ],
    screenshot: {
      placeholder:
        "Performance Dashboard - Shows real-time metrics including CTR, CPC, conversions, and ROAS",
      aspectRatio: "16/9",
    },
    demoComponent: AdPerformanceDashboard,
  },
  {
    id: "lead-qualification",
    title: "Lead Qualification",
    description:
      "Not all leads are equal. Our qualification system scores and routes leads so your sales team only talks to prospects ready to convert.",
    icon: <Filter />,
    color: {
      bg: "from-emerald-500/10 to-green-400/5",
      text: "text-emerald-400",
      border: "border-emerald-500/20",
      gradient: "from-emerald-400 to-green-400",
    },
    details: [
      "Automated lead scoring",
      "Quality-based routing",
      "CRM integration",
      "Follow-up automation",
      "Lead source attribution",
    ],
    screenshot: {
      placeholder:
        "Lead Qualification Flow - Shows funnel stages from impression to qualified customer",
      aspectRatio: "16/9",
    },
    demoComponent: LeadQualificationFlow,
  },
];

const LeadGenFeatures: React.FC = () => {
  return (
    <section className="relative py-12 sm:py-16 md:py-20 lg:py-24">
      <div className="relative z-10 text-center px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto"
        >
          <Badge variant="warning" size="lg" className="mb-6 md:mb-8">
            <Zap className="w-3 h-3 sm:w-4 sm:h-4" />
            <span className="text-xs sm:text-sm">Core Features</span>
          </Badge>
        </motion.div>
      </div>

      <div className="relative z-10 px-4 sm:px-6 lg:px-8">
        {features.map((feature, index) => (
          <motion.div
            key={feature.id}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="mb-12 sm:mb-16 md:mb-20 lg:mb-24 last:mb-0"
          >
            <div className="max-w-7xl mx-auto">
              <div className="text-center mb-8 sm:mb-12 md:mb-16">
                <div className="flex items-center justify-center mb-4 sm:mb-6">
                  <div
                    className={`p-3 sm:p-4 rounded-xl sm:rounded-2xl bg-gradient-to-br ${feature.color.bg} ${feature.color.text}`}
                  >
                    <div className="w-6 h-6 sm:w-8 sm:h-8">
                      {React.cloneElement(
                        feature.icon as React.ReactElement,
                        { className: "w-full h-full" }
                      )}
                    </div>
                  </div>
                  <div
                    className={`ml-2 sm:ml-4 w-12 sm:w-16 md:w-20 h-0.5 sm:h-1 bg-gradient-to-r ${feature.color.gradient} rounded-full`}
                  />
                  <div
                    className={`ml-2 sm:ml-4 w-6 h-6 sm:w-8 sm:h-8 rounded-full bg-gradient-to-br ${feature.color.gradient} flex items-center justify-center text-white font-bold text-xs sm:text-sm`}
                  >
                    {index + 1}
                  </div>
                </div>
                <h3 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-3 sm:mb-4 px-2">
                  {feature.title}
                </h3>
                <p className="text-base sm:text-lg md:text-xl text-zinc-300 max-w-3xl mx-auto px-2">
                  {feature.description}
                </p>
              </div>

              <div
                className={`rounded-xl sm:rounded-2xl md:rounded-3xl overflow-hidden bg-gradient-to-br ${feature.color.bg} backdrop-blur-xl border ${feature.color.border} p-1 sm:p-1.5 md:p-2 mb-6 sm:mb-8 md:mb-12`}
              >
                <div className="rounded-lg sm:rounded-xl md:rounded-2xl overflow-hidden bg-zinc-900/80 backdrop-blur-sm">
                  {feature.demoComponent ? (
                    <div className="w-full">
                      {React.createElement(feature.demoComponent)}
                    </div>
                  ) : (
                    <div className="aspect-[16/9] flex items-center justify-center p-6 sm:p-8 md:p-12">
                      <div className="text-center space-y-4 sm:space-y-6">
                        <div
                          className={`inline-flex p-4 sm:p-5 md:p-6 rounded-xl sm:rounded-2xl bg-white/5 ${feature.color.text}`}
                        >
                          <div className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12">
                            {React.cloneElement(
                              feature.icon as React.ReactElement,
                              { className: "w-full h-full" }
                            )}
                          </div>
                        </div>
                        <p className="text-sm sm:text-base text-zinc-400 max-w-md mx-auto px-4">
                          {feature.screenshot.placeholder}
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default LeadGenFeatures;
