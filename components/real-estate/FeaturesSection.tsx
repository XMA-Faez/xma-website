import React from "react";
import { motion } from "framer-motion";
import {
  Rocket,
  MapPin,
  Wrench,
  ShieldCheck,
  ArrowsDownUp,
  ChartLine,
  Target,
} from "phosphor-react";
import { FeatureCard } from "./FeatureCard";
import { SmallFeature } from "./SmallFeature";

export const RealEstateFeaturesSection = () => {
  const mainFeatures = [
    {
      icon: Rocket,
      title: "Leads That Convert",
      description:
        "Every campaign is built for viewings, not vanity metrics. We target serious buyers and qualified tenants ready to act.",
    },
    {
      icon: MapPin,
      title: "UAE Market Expertise",
      description:
        "We understand Dubai real estate—buyer nationalities, seasonal trends, and the platforms where serious property seekers spend time.",
    },
    {
      icon: Wrench,
      title: "Completely Hands-Off",
      description:
        "From strategy to creative to optimization—everything handled. You focus on closing deals, we fill your pipeline.",
    },
  ];

  const smallFeatures = [
    {
      icon: ShieldCheck,
      title: "Quality Over Quantity",
      description: "We optimize for lead-to-viewing rate, not just lead volume.",
    },
    {
      icon: ArrowsDownUp,
      title: "Continuous Optimization",
      description: "Daily monitoring, weekly A/B tests, and constant refinement.",
    },
    {
      icon: ChartLine,
      title: "Transparent Reporting",
      description: "Real-time dashboard plus weekly reports and strategy calls.",
    },
    {
      icon: Target,
      title: "Precision Targeting",
      description: "Custom audiences built from buyer behavior and demographics.",
    },
  ];

  return (
    <section className="relative py-24 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="text-sm uppercase tracking-wider text-blue-500 font-semibold mb-4 block">
            Why Choose XMA
          </span>
          <h2 className="text-5xl md:text-6xl font-bold mb-4 text-slate-900 dark:text-white">
            Built for <span className="text-blue-500">Real Estate</span>
          </h2>
          <p className="text-xl text-slate-600 dark:text-gray-500 max-w-2xl mx-auto">
            Everything you need to fill your pipeline with qualified property leads
          </p>
        </motion.div>

        {/* Main Feature Cards */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {mainFeatures.map((feature, index) => (
            <FeatureCard key={feature.title} {...feature} index={index} />
          ))}
        </div>

        {/* Divider */}
        <motion.div
          initial={{ opacity: 0, scaleX: 0 }}
          whileInView={{ opacity: 1, scaleX: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="w-full h-px bg-gradient-to-r from-transparent via-slate-300 dark:via-white/10 to-transparent mb-16"
        ></motion.div>

        {/* Small Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {smallFeatures.map((feature, index) => (
            <SmallFeature key={feature.title} {...feature} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};
