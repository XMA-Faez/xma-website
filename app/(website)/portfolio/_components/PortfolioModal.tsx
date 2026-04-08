"use client";

import React, { useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { X, CaretLeft, CaretRight } from "phosphor-react";
import type { PortfolioVideoWithMeta } from "../page";

interface PortfolioModalProps {
  video: PortfolioVideoWithMeta | null;
  videos: PortfolioVideoWithMeta[];
  onClose: () => void;
  onNavigate: (video: PortfolioVideoWithMeta) => void;
}

export default function PortfolioModal({
  video,
  videos,
  onClose,
  onNavigate,
}: PortfolioModalProps) {
  useEffect(() => {
    if (video) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [video]);

  useEffect(() => {
    if (!video) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      const currentIndex = videos.findIndex(
        (v) => v.publicId === video.publicId
      );
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft" && currentIndex > 0)
        onNavigate(videos[currentIndex - 1]);
      if (e.key === "ArrowRight" && currentIndex < videos.length - 1)
        onNavigate(videos[currentIndex + 1]);
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [video, videos, onClose, onNavigate]);

  if (!video) return null;

  const currentIndex = videos.findIndex(
    (v) => v.publicId === video.publicId
  );
  const canGoPrev = currentIndex > 0;
  const canGoNext = currentIndex < videos.length - 1;

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-[100] flex items-center justify-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
      >
        <div className="absolute inset-0 bg-black/90 backdrop-blur-sm" />

        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="relative w-[85vw] max-w-sm aspect-[9/16] rounded-2xl overflow-hidden"
          onClick={(e) => e.stopPropagation()}
        >
          <video
            key={video.publicId}
            src={video.optimizedUrl}
            poster={video.thumbnailUrl}
            className="absolute inset-0 w-full h-full object-cover rounded-2xl"
            autoPlay
            loop
            playsInline
            controls
          />
        </motion.div>

        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex items-center gap-2">
          <span className="text-sm text-white/60 bg-white/10 backdrop-blur-sm px-3 py-1.5 rounded-full">
            {video.category}
          </span>
          <span className="text-sm text-white/40">
            {video.durationFormatted}
          </span>
        </div>

        <button
          onClick={onClose}
          className="absolute top-6 right-6 z-10 w-10 h-10 rounded-full bg-zinc-800/80 backdrop-blur-sm border border-zinc-700/50 flex items-center justify-center text-white hover:bg-zinc-700/80 transition-colors"
        >
          <X size={20} />
        </button>

        {canGoPrev && (
          <button
            onClick={(e) => {
              e.stopPropagation();
              onNavigate(videos[currentIndex - 1]);
            }}
            className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full bg-zinc-800/80 backdrop-blur-sm border border-zinc-700/50 flex items-center justify-center text-white hover:bg-zinc-700/80 transition-colors"
          >
            <CaretLeft size={20} />
          </button>
        )}

        {canGoNext && (
          <button
            onClick={(e) => {
              e.stopPropagation();
              onNavigate(videos[currentIndex + 1]);
            }}
            className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full bg-zinc-800/80 backdrop-blur-sm border border-zinc-700/50 flex items-center justify-center text-white hover:bg-zinc-700/80 transition-colors"
          >
            <CaretRight size={20} />
          </button>
        )}
      </motion.div>
    </AnimatePresence>
  );
}
