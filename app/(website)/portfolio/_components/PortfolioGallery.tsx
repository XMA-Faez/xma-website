'use client'

import React, { useState } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import { PlayCircle, Image as ImageIcon } from 'phosphor-react'
import { useIntersectionObserver } from '@/hooks/useIntersectionObserver'
import Image from 'next/image'
import type { CloudinaryVideo, CloudinaryGraphic } from '@/sanity/lib/types'

type PortfolioItem = CloudinaryVideo | CloudinaryGraphic

interface PortfolioCardProps {
  item: PortfolioItem
  index: number
  onSelect: (item: PortfolioItem) => void
}

const PortfolioCard: React.FC<PortfolioCardProps> = ({ item, index, onSelect }) => {
  const [imageLoaded, setImageLoaded] = useState(false)
  const [imageError, setImageError] = useState(false)
  const { ref, hasIntersected } = useIntersectionObserver<HTMLDivElement>({
    threshold: 0.1,
    rootMargin: '100px',
    once: true,
  })

  const handleImageLoad = () => {
    setImageLoaded(true)
  }

  const handleImageError = () => {
    setImageError(true)
    setImageLoaded(true)
  }

  const isVideo = item.type === 'video'
  const thumbnailUrl = isVideo ? (item as CloudinaryVideo).thumbnailUrl : item.url

  return (
    <motion.div
      ref={ref as React.RefObject<HTMLDivElement>}
      layout
      initial={{ opacity: 0, y: 20, scale: 0.95 }}
      animate={{
        opacity: 1,
        y: 0,
        scale: 1,
        transition: {
          duration: 0.6,
          ease: [0.21, 1.11, 0.81, 0.99],
        },
      }}
      exit={{ opacity: 0, scale: 0.9 }}
      className="relative group cursor-pointer overflow-hidden rounded-2xl w-full"
      onClick={() => onSelect(item)}
    >
      <div className="absolute inset-0 bg-slate-50/50 dark:bg-zinc-900/50 backdrop-blur-sm border border-slate-200 dark:border-zinc-800"></div>

      <div
        className={`relative w-full overflow-hidden ${
          item.format === 'square'
            ? 'aspect-square'
            : item.format === 'landscape'
              ? 'aspect-video'
              : item.format === 'portrait'
                ? 'aspect-[3/4]'
                : 'aspect-[9/16]'
        }`}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-slate-200 to-slate-300 dark:from-zinc-800 dark:to-zinc-900">
          {(!hasIntersected || !imageLoaded) && (
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-shimmer-slow"
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
            />
          )}
        </div>

        {hasIntersected && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: imageLoaded ? 1 : 0 }}
            transition={{ duration: 0.4, ease: 'easeOut' }}
            className="absolute inset-0"
          >
            {!imageError ? (
              <Image
                src={thumbnailUrl}
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

        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

        <div className="absolute top-4 left-4">
          <div className="flex items-center gap-2 px-3 py-1.5 bg-white/90 dark:bg-black/70 backdrop-blur-md rounded-full">
            {isVideo ? (
              <>
                <PlayCircle weight="duotone" className="text-blue-500" size={18} />
                <span className="text-xs font-medium text-slate-700 dark:text-zinc-300">
                  {(item as CloudinaryVideo).duration || 'Video'}
                </span>
              </>
            ) : (
              <>
                <ImageIcon weight="duotone" className="text-emerald-500" size={18} />
                <span className="text-xs font-medium text-slate-700 dark:text-zinc-300">
                  Graphic
                </span>
              </>
            )}
          </div>
        </div>

        <div className="absolute bottom-0 left-0 right-0 p-6 transform translate-y-6 group-hover:translate-y-0 ease-out"></div>
      </div>
    </motion.div>
  )
}

interface PortfolioGalleryProps {
  items: PortfolioItem[]
  onItemSelect: (item: PortfolioItem) => void
  isLoading?: boolean
}

const PortfolioGallery: React.FC<PortfolioGalleryProps> = ({
  items,
  onItemSelect,
  isLoading = false,
}) => {
  if (isLoading) {
    const skeletonAspects = [
      'aspect-video',
      'aspect-square',
      'aspect-[3/4]',
      'aspect-[9/16]',
      'aspect-video',
      'aspect-square',
    ]

    return (
      <div className="columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6">
        {[...Array(6)].map((_, index) => (
          <div key={index} className="break-inside-avoid mb-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="relative overflow-hidden rounded-2xl bg-slate-50/50 dark:bg-zinc-900/50 backdrop-blur-sm border border-slate-200 dark:border-zinc-800 w-full"
            >
              <div
                className={`${skeletonAspects[index]} bg-gradient-to-br from-slate-200 to-slate-300 dark:from-zinc-800 dark:to-zinc-900 animate-pulse`}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-shimmer-slow"></div>
              </div>
            </motion.div>
          </div>
        ))}
      </div>
    )
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
    )
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
            <PortfolioCard item={item} index={index} onSelect={onItemSelect} />
          </div>
        ))}
      </AnimatePresence>
    </motion.div>
  )
}

export default PortfolioGallery
