"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  PlayCircle,
  Image as ImageIcon,
} from "phosphor-react";
import { useIntersectionObserver } from "@/hooks/useIntersectionObserver";
import Image from "next/image";

interface MediaItem {
  id: string;
  title: string;
  description?: string;
  url: string;
  thumbnailUrl?: string;
  format: "square" | "landscape" | "portrait" | "reels";
  category: string;
  tags: string[];
  date: string;
  views?: number;
}

interface Video extends MediaItem {
  type: "video";
  duration?: number;
}

interface Graphic extends MediaItem {
  type: "graphic";
  width?: number;
  height?: number;
}

type PortfolioItem = Video | Graphic;

interface PortfolioCardProps {
  item: PortfolioItem;
  index: number;
  onSelect: (item: PortfolioItem) => void;
}

const PortfolioCard: React.FC<PortfolioCardProps> = ({
  item,
  index,
  onSelect,
}) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);
  const { ref, hasIntersected } = useIntersectionObserver({
    threshold: 0.1,
    rootMargin: "100px",
    once: true,
  });

  const handleImageLoad = () => {
    setImageLoaded(true);
  };

  const handleImageError = () => {
    setImageError(true);
    setImageLoaded(true);
  };

  return (
    <motion.div
      ref={ref}
      layout
      initial={{ opacity: 0, y: 20, scale: 0.95 }}
      animate={{ 
        opacity: 1, 
        y: 0, 
        scale: 1,
        transition: {
          duration: 0.6,
          ease: [0.21, 1.11, 0.81, 0.99] // Custom easing for smooth entrance
        }
      }}
      exit={{ opacity: 0, scale: 0.9 }}
      className="relative group cursor-pointer overflow-hidden rounded-2xl w-full"
      onClick={() => onSelect(item)}
    >
      {/* Card Background */}
      <div className="absolute inset-0 bg-slate-50/50 dark:bg-zinc-900/50 backdrop-blur-sm border border-slate-200 dark:border-zinc-800"></div>

      {/* Image/Thumbnail */}
      <div className={`relative w-full overflow-hidden ${
        item.format === 'square' ? 'aspect-square' : 
        item.format === 'landscape' ? 'aspect-video' : 
        item.format === 'portrait' ? 'aspect-[3/4]' : 
        'aspect-[9/16]' // reels format
      }`}>
        {/* Always show placeholder first to maintain layout */}
        <div className="absolute inset-0 bg-gradient-to-br from-slate-200 to-slate-300 dark:from-zinc-800 dark:to-zinc-900">
          {(!hasIntersected || !imageLoaded) && (
            <motion.div 
              className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-shimmer-slow"
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            />
          )}
        </div>

        {/* Image loads on top of placeholder */}
        {hasIntersected && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: imageLoaded ? 1 : 0 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            className="absolute inset-0"
          >
            {!imageError ? (
              <Image
                src={item.thumbnailUrl || item.url}
                alt={item.title}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-110"
                onLoad={handleImageLoad}
                onError={handleImageError}
                sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
              />
            ) : (
              <div className="w-full h-full bg-gradient-to-br from-slate-200 to-slate-300 dark:from-zinc-800 dark:to-zinc-900 flex items-center justify-center">
                <div className="text-slate-400 dark:text-zinc-600">
                  <ImageIcon size={48} weight="duotone" />
                </div>
              </div>
            )}
          </motion.div>
        )}

        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

        {/* Type Badge */}
        <div className="absolute top-4 left-4">
          <div className="flex items-center gap-2 px-3 py-1.5 bg-white/90 dark:bg-black/70 backdrop-blur-md rounded-full">
            {item.type === "video" ? (
              <>
                <PlayCircle
                  weight="duotone"
                  className="text-blue-500"
                  size={18}
                />
                <span className="text-xs font-medium text-slate-700 dark:text-zinc-300">
                  {(item as Video).duration
                    ? `${(item as Video).duration}`
                    : "Video"}
                </span>
              </>
            ) : (
              <>
                <ImageIcon
                  weight="duotone"
                  className="text-emerald-500"
                  size={18}
                />
                <span className="text-xs font-medium text-slate-700 dark:text-zinc-300">
                  Graphic
                </span>
              </>
            )}
          </div>
        </div>

        {/* Content - SIMPLIFIED */}
        <div className="absolute bottom-0 left-0 right-0 p-6 transform translate-y-6 group-hover:translate-y-0 ease-out">
          {/* Only show title on hover, no other details */}
          {/* <h3 className="text-xl font-bold text-white opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 ease-out"> */}
          {/*   {item.title} */}
          {/* </h3> */}

          {/* All detailed content commented out */}
          {/* 
          <p className="text-sm text-gray-200 line-clamp-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-75">
            {item.description}
          </p>
          
          <div className="flex flex-wrap gap-2 mt-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-100">
            {item.tags.slice(0, 2).map((tag, i) => (
              <span 
                key={i}
                className="text-xs px-2 py-1 bg-white/20 backdrop-blur-md rounded-full text-white"
              >
                {tag}
              </span>
            ))}
          </div>

          <div className="flex items-center gap-4 mt-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-150">
            {item.views && (
              <div className="flex items-center gap-1 text-xs text-gray-300">
                <Eye weight="duotone" size={14} />
                {item.views.toLocaleString()}
              </div>
            )}
            <div className="flex items-center gap-1 text-xs text-gray-300">
              <Calendar weight="duotone" size={14} />
              {new Date(item.date).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}
            </div>
          </div>
          */}
        </div>
      </div>
    </motion.div>
  );
};

interface PortfolioGalleryProps {
  items: PortfolioItem[];
  onItemSelect: (item: PortfolioItem) => void;
  isLoading?: boolean;
}

const PortfolioGallery: React.FC<PortfolioGalleryProps> = ({
  items,
  onItemSelect,
  isLoading = false,
}) => {
  if (isLoading) {
    const skeletonAspects = ['aspect-video', 'aspect-square', 'aspect-[3/4]', 'aspect-[9/16]', 'aspect-video', 'aspect-square'];
    
    return (
      <div className="columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6">
        {/* Skeleton cards to maintain layout */}
        {[...Array(6)].map((_, index) => (
          <div key={index} className="break-inside-avoid mb-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="relative overflow-hidden rounded-2xl bg-slate-50/50 dark:bg-zinc-900/50 backdrop-blur-sm border border-slate-200 dark:border-zinc-800 w-full"
            >
              <div className={`${skeletonAspects[index]} bg-gradient-to-br from-slate-200 to-slate-300 dark:from-zinc-800 dark:to-zinc-900 animate-pulse`}>
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-shimmer-slow"></div>
              </div>
            </motion.div>
          </div>
        ))}
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="text-center py-16">
        <div className="text-slate-400 dark:text-zinc-600 mb-4">
          <ImageIcon size={64} weight="duotone" />
        </div>
        <h3 className="text-xl font-semibold text-slate-600 dark:text-zinc-400 mb-2">
          No items found
        </h3>
        <p className="text-slate-500 dark:text-zinc-500">
          Try adjusting your filters to see more content
        </p>
      </div>
    );
  }

  return (
    <motion.div
      className="columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      layout
    >
      <AnimatePresence mode="wait">
        {items.map((item, index) => (
          <div key={item.id} className="break-inside-avoid mb-6">
            <PortfolioCard
              item={item}
              index={index}
              onSelect={onItemSelect}
            />
          </div>
        ))}
      </AnimatePresence>
    </motion.div>
  );
};

export default PortfolioGallery;
