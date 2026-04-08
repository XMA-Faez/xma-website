"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import Section from "@/components/ui/section";
import type { AccentTokens } from "./accent-utils";

interface CrossLinkItem {
  name: string;
  description: string;
  href: string;
}

interface CrossLinkGridProps {
  title: string;
  items: CrossLinkItem[];
  accentTokens: AccentTokens;
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.08 },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: "spring", stiffness: 100, damping: 20 },
  },
};

const CATEGORY_GRADIENTS = {
  service: "oklch(0.55 0.15 230)",
  industry: "oklch(0.65 0.15 65)",
};

function inferCategory(href: string): "service" | "industry" {
  const industryKeywords = [
    "real-estate", "hotel", "restaurant", "healthcare", "ecommerce-agency",
    "retail", "education", "law-firm", "fintech", "automotive", "luxury-brand",
    "startup", "construction", "beauty-salon", "event", "b2b", "dental",
    "travel", "logistics", "ngo",
  ];
  return industryKeywords.some((kw) => href.includes(kw)) ? "industry" : "service";
}

export default function CrossLinkGrid({
  title,
  items,
  accentTokens,
}: CrossLinkGridProps) {
  return (
    <Section size="xl" padding="md">
      <motion.h2
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        viewport={{ once: true }}
        className="text-3xl md:text-4xl font-bold tracking-tighter text-white mb-12"
      >
        {title}
      </motion.h2>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-60px" }}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5"
      >
        {items.map((item) => {
          const category = inferCategory(item.href);
          const gradientColor = CATEGORY_GRADIENTS[category];

          return (
            <motion.div key={item.href} variants={cardVariants}>
              <Link
                href={item.href}
                className="block glass-tertiary rounded-xl relative group transition-transform duration-300 hover:-translate-y-1"
              >
                <div
                  className="absolute top-0 left-0 right-0 h-[3px] rounded-t-xl"
                  style={{
                    background: `linear-gradient(90deg, ${gradientColor}, transparent 80%)`,
                  }}
                />
                <div className="p-6">
                  <div className="flex items-start justify-between gap-4 mb-3">
                    <h3 className="text-lg font-semibold text-white">
                      {item.name}
                    </h3>
                    <ArrowUpRight
                      className="w-5 h-5 shrink-0 text-zinc-600 transition-all duration-200 group-hover:text-white group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                    />
                  </div>
                  <p className="text-sm text-zinc-500 leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </Link>
            </motion.div>
          );
        })}
      </motion.div>
    </Section>
  );
}
