"use client";

import React from "react";
import { motion } from "framer-motion";
import { ArrowRight, Play, Image as ImageIcon } from "phosphor-react";
import Link from "next/link";
import { usePortfolioItems } from "@/hooks/usePortfolio";
import type { CloudinaryVideo, CloudinaryGraphic } from "@/lib/contentful-portfolio";
import Section from "@/components/ui/section";

const ProofSection = () => {
  const { items, isLoading } = usePortfolioItems();
  const displayItems = items.slice(0, 6);

  const isVideo = (item: CloudinaryVideo | CloudinaryGraphic): item is CloudinaryVideo => {
    return item.type === "video";
  };

  const getAspectRatio = (format: string) => {
    switch (format) {
      case "portrait":
        return "aspect-[3/4]";
      case "landscape":
        return "aspect-[16/9]";
      case "reels":
        return "aspect-[9/16]";
      default:
        return "aspect-square";
    }
  };

  return (
    <Section size="xl">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="mb-12"
      >
        <span className="text-sm uppercase tracking-wider text-blue-500 font-semibold mb-4 block">
          Our Work
        </span>
        <h2 className="font-display text-4xl md:text-5xl font-semibold text-slate-900 dark:text-white mb-4 leading-[1.1]">
          Real Work. <span className="text-blue-500">Real Upgrades.</span>
        </h2>
        <p className="text-lg text-slate-600 dark:text-gray-400 max-w-xl">
          We don&apos;t hide behind reports. We show the work.
        </p>
      </motion.div>

      {isLoading ? (
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {[...Array(6)].map((_, index) => (
            <div
              key={index}
              className="aspect-square rounded-2xl bg-slate-100 dark:bg-white/5 animate-pulse"
            />
          ))}
        </div>
      ) : displayItems.length > 0 ? (
        <div className="columns-2 md:columns-3 gap-4 space-y-4">
          {displayItems.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.05 * index }}
              viewport={{ once: true }}
              className="break-inside-avoid"
            >
              <div
                className={`group relative rounded-2xl overflow-hidden bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 ${getAspectRatio(item.format)}`}
              >
                {isVideo(item) ? (
                  <>
                    <img
                      src={item.thumbnailUrl}
                      alt={item.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                      <div className="w-14 h-14 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center">
                        <Play className="w-6 h-6 text-white ml-1" weight="fill" />
                      </div>
                    </div>
                    <div className="absolute top-3 left-3">
                      <span className="px-2 py-1 rounded-md bg-black/50 backdrop-blur-sm text-white text-xs font-medium flex items-center gap-1">
                        <Play className="w-3 h-3" weight="fill" />
                        Video
                      </span>
                    </div>
                  </>
                ) : (
                  <>
                    <img
                      src={item.url}
                      alt={item.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    <div className="absolute top-3 left-3">
                      <span className="px-2 py-1 rounded-md bg-black/50 backdrop-blur-sm text-white text-xs font-medium flex items-center gap-1">
                        <ImageIcon className="w-3 h-3" weight="fill" />
                        Graphic
                      </span>
                    </div>
                  </>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <p className="text-slate-500 dark:text-gray-500">
            Portfolio items coming soon.
          </p>
        </div>
      )}

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.3 }}
        viewport={{ once: true }}
        className="mt-12"
      >
        <Link
          href="/portfolio"
          className="inline-flex items-center gap-2 text-blue-500 font-medium hover:gap-3 transition-all duration-300"
        >
          View Full Portfolio
          <ArrowRight className="w-4 h-4" />
        </Link>
      </motion.div>
    </Section>
  );
};

export default ProofSection;
