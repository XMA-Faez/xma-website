"use client";

import React, { useState, useMemo } from "react";
import { motion, AnimatePresence } from "motion/react";
import portfolioVideos, {
  PORTFOLIO_CATEGORIES,
  type PortfolioCategorySlug,
  type PortfolioVideo,
} from "@/data/portfolioVideos";
import PortfolioGallery from "./_components/PortfolioGallery";
import PortfolioModal from "./_components/PortfolioModal";
import { ScanningButton } from "@/components/ui/ScanningButton";
import Link from "next/link";

function formatDuration(seconds: number): string {
  const m = Math.floor(seconds / 60);
  const s = Math.floor(seconds % 60);
  return `${m}:${s.toString().padStart(2, "0")}`;
}

function getThumbnailUrl(publicId: string): string {
  return `https://res.cloudinary.com/dw1j7izud/video/upload/so_0,f_auto,q_auto,c_scale,w_480/${publicId}.jpg`;
}

function getOptimizedVideoUrl(url: string): string {
  if (!url.includes("cloudinary.com")) return url;
  return url.replace(
    "/video/upload/",
    "/video/upload/q_auto,f_auto,vc_auto/"
  );
}

export type PortfolioVideoWithMeta = PortfolioVideo & {
  thumbnailUrl: string;
  optimizedUrl: string;
  durationFormatted: string;
};

function enrichVideos(videos: PortfolioVideo[]): PortfolioVideoWithMeta[] {
  return videos.map((v) => ({
    ...v,
    thumbnailUrl: getThumbnailUrl(v.publicId),
    optimizedUrl: getOptimizedVideoUrl(v.url),
    durationFormatted: formatDuration(v.duration),
  }));
}

const allEnrichedVideos = enrichVideos(portfolioVideos);

export default function PortfolioPage() {
  const [activeCategory, setActiveCategory] =
    useState<PortfolioCategorySlug>("all");
  const [selectedVideo, setSelectedVideo] =
    useState<PortfolioVideoWithMeta | null>(null);

  const filteredVideos = useMemo(() => {
    if (activeCategory === "all") return allEnrichedVideos;
    return allEnrichedVideos.filter((v) => v.categorySlug === activeCategory);
  }, [activeCategory]);

  const handleVideoSelect = (video: PortfolioVideoWithMeta) => {
    setSelectedVideo(video);
  };

  const handleNavigate = (video: PortfolioVideoWithMeta) => {
    setSelectedVideo(video);
  };

  return (
    <div className="min-h-screen w-full relative bg-black">
      <div
        className="absolute inset-0 z-0"
        style={{
          background:
            "radial-gradient(ellipse 80% 50% at 50% 0%, oklch(0.35 0.05 280 / 0.4), transparent 70%), #000",
        }}
      />

      <section className="relative pt-32 pb-12 px-4">
        <div className="max-w-7xl mx-auto">
          <motion.div
            className="text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 text-white">
              Our{" "}
              <span className="heading-gradient">Portfolio</span>
            </h1>
            <p className="text-lg md:text-xl text-white/70 max-w-2xl mx-auto">
              Video content we&apos;ve produced across industries — from concept
              to final cut.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="relative px-4 pb-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-wrap justify-center gap-2 md:gap-3">
            {PORTFOLIO_CATEGORIES.map((cat) => {
              const isActive = activeCategory === cat.slug;
              const count =
                cat.slug === "all"
                  ? allEnrichedVideos.length
                  : allEnrichedVideos.filter(
                      (v) => v.categorySlug === cat.slug
                    ).length;

              return (
                <button
                  key={cat.slug}
                  onClick={() => setActiveCategory(cat.slug)}
                  className={`
                    px-4 py-2 rounded-full text-sm font-medium transition-all duration-300
                    ${
                      isActive
                        ? "bg-white text-black"
                        : "bg-white/10 text-white/70 hover:bg-white/20 hover:text-white border border-white/10"
                    }
                  `}
                >
                  {cat.label}
                  <span
                    className={`ml-1.5 text-xs ${
                      isActive ? "text-black/60" : "text-white/40"
                    }`}
                  >
                    {count}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </section>

      <section className="relative px-4 pb-24">
        <div className="max-w-7xl mx-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeCategory}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.3 }}
            >
              <PortfolioGallery
                videos={filteredVideos}
                onVideoSelect={handleVideoSelect}
              />
            </motion.div>
          </AnimatePresence>
        </div>
      </section>

      <PortfolioModal
        video={selectedVideo}
        videos={filteredVideos}
        onClose={() => setSelectedVideo(null)}
        onNavigate={handleNavigate}
      />

      <section className="relative py-24 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            className="glass-primary rounded-2xl p-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">
              Ready to Create Something Amazing?
            </h2>
            <p className="text-lg text-white/70 mb-8">
              Let&apos;s collaborate on your next project and bring your vision
              to life.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/apply">
                <ScanningButton variant="primary" size="md" color="white">
                  Book a Call
                </ScanningButton>
              </Link>
              <Link href="/#solutions">
                <ScanningButton variant="outline" size="md" color="neutral">
                  Explore Solutions
                </ScanningButton>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
