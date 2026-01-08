'use client'

import React, { useEffect } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import { X, CaretLeft, CaretRight, PlayCircle, Image as ImageIcon } from 'phosphor-react'
import type { CloudinaryVideo, CloudinaryGraphic } from '@/sanity/lib/types'

type PortfolioItem = CloudinaryVideo | CloudinaryGraphic

interface PortfolioModalProps {
  item: PortfolioItem | null
  items: PortfolioItem[]
  onClose: () => void
  onNavigate: (item: PortfolioItem) => void
}

const PortfolioModal: React.FC<PortfolioModalProps> = ({ item, items, onClose, onNavigate }) => {
  useEffect(() => {
    if (item) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }

    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [item])

  useEffect(() => {
    if (!item) return

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose()
      } else if (e.key === 'ArrowLeft' || e.key === 'ArrowRight') {
        const currentIndex = items.findIndex((i) => i.id === item.id)
        if (e.key === 'ArrowLeft' && currentIndex > 0) {
          onNavigate(items[currentIndex - 1])
        } else if (e.key === 'ArrowRight' && currentIndex < items.length - 1) {
          onNavigate(items[currentIndex + 1])
        }
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [item, items, onClose, onNavigate])

  if (!item) return null

  const currentIndex = items.findIndex((i) => i.id === item.id)
  const canNavigateLeft = currentIndex > 0
  const canNavigateRight = currentIndex < items.length - 1
  const isVideo = item.type === 'video'

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-50 flex items-center justify-center p-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
      >
        <div className="absolute inset-0 bg-black/90 backdrop-blur-md"></div>

        <motion.div
          className="relative max-w-6xl w-full max-h-[90vh] overflow-hidden rounded-2xl bg-white dark:bg-zinc-900 shadow-2xl"
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          onClick={(e) => e.stopPropagation()}
        >
          <div className="absolute top-0 left-0 right-0 z-10 p-6 bg-gradient-to-b from-black/50 to-transparent">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                {isVideo ? (
                  <div className="flex items-center gap-2 px-3 py-1.5 bg-white/20 backdrop-blur-md rounded-full">
                    <PlayCircle weight="duotone" className="text-blue-400" size={18} />
                    <span className="text-sm font-medium text-white">
                      {(item as CloudinaryVideo).duration}
                    </span>
                  </div>
                ) : (
                  <div className="flex items-center gap-2 px-3 py-1.5 bg-white/20 backdrop-blur-md rounded-full">
                    <ImageIcon weight="duotone" className="text-emerald-400" size={18} />
                    <span className="text-sm font-medium text-white">Graphic Design</span>
                  </div>
                )}
              </div>

              <button
                onClick={onClose}
                className="p-2 bg-white/10 backdrop-blur-md rounded-full text-white hover:bg-white/20 transition-colors"
              >
                <X size={24} />
              </button>
            </div>
          </div>

          {canNavigateLeft && (
            <button
              onClick={(e) => {
                e.stopPropagation()
                onNavigate(items[currentIndex - 1])
              }}
              className="absolute top-1/2 -translate-y-1/2 left-4 z-10 p-3 bg-white/10 backdrop-blur-md rounded-full text-white hover:bg-white/20 transition-colors"
            >
              <CaretLeft size={24} />
            </button>
          )}

          {canNavigateRight && (
            <button
              onClick={(e) => {
                e.stopPropagation()
                onNavigate(items[currentIndex + 1])
              }}
              className="absolute top-1/2 -translate-y-1/2 right-4 z-10 p-3 bg-white/10 backdrop-blur-md rounded-full text-white hover:bg-white/20 transition-colors"
            >
              <CaretRight size={24} />
            </button>
          )}

          <div className="relative overflow-hidden">
            {isVideo ? (
              <div className="aspect-video bg-black flex items-center justify-center">
                <video
                  src={item.url}
                  controls
                  autoPlay
                  className="w-full h-full object-contain"
                  poster={(item as CloudinaryVideo).thumbnailUrl}
                />
              </div>
            ) : (
              <div className="relative">
                <img
                  src={item.url}
                  alt={item.title}
                  className="w-full h-auto max-h-[70vh] object-contain bg-black"
                />
              </div>
            )}
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}

export default PortfolioModal
