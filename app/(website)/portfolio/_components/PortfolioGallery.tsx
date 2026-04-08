"use client";

import React, { useState, useRef, useEffect } from "react";
import { motion } from "motion/react";
import { PlayCircle } from "phosphor-react";
import Image from "next/image";
import type { PortfolioVideoWithMeta } from "../page";

interface PortfolioGalleryProps {
  videos: PortfolioVideoWithMeta[];
  onVideoSelect: (video: PortfolioVideoWithMeta) => void;
}

function VideoCard({
  video,
  onSelect,
}: {
  video: PortfolioVideoWithMeta;
  onSelect: (video: PortfolioVideoWithMeta) => void;
}) {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1, rootMargin: "200px" }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={ref} className="break-inside-avoid mb-4 md:mb-6">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="relative group cursor-pointer rounded-2xl overflow-hidden bg-zinc-900"
        onClick={() => onSelect(video)}
      >
        <div className="relative w-full aspect-[9/16]">
          {isVisible && (
            <Image
              src={video.thumbnailUrl}
              alt={video.category}
              fill
              className={`object-cover transition-all duration-500 group-hover:scale-105 ${
                imageLoaded ? "opacity-100" : "opacity-0"
              }`}
              onLoad={() => setImageLoaded(true)}
              sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
            />
          )}

          {!imageLoaded && (
            <div className="absolute inset-0 bg-zinc-800 animate-pulse" />
          )}

          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

          <div className="absolute top-3 left-3">
            <div className="flex items-center gap-1.5 px-2.5 py-1 bg-black/60 backdrop-blur-sm rounded-full">
              <PlayCircle weight="fill" className="text-white" size={14} />
              <span className="text-xs font-medium text-white/90">
                {video.durationFormatted}
              </span>
            </div>
          </div>

          <div className="absolute bottom-0 left-0 right-0 p-3 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
            <span className="text-xs font-medium text-white/80 bg-white/10 backdrop-blur-sm px-2.5 py-1 rounded-full">
              {video.category}
            </span>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

export default function PortfolioGallery({
  videos,
  onVideoSelect,
}: PortfolioGalleryProps) {
  if (videos.length === 0) {
    return (
      <div className="text-center py-16">
        <h3 className="text-xl font-semibold text-zinc-400 mb-2">
          No videos found
        </h3>
        <p className="text-zinc-500">
          Try selecting a different category.
        </p>
      </div>
    );
  }

  return (
    <div className="columns-2 sm:columns-3 lg:columns-4 gap-4 md:gap-6">
      {videos.map((video) => (
        <VideoCard
          key={video.publicId}
          video={video}
          onSelect={onVideoSelect}
        />
      ))}
    </div>
  );
}
