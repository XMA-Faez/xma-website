"use client";

import React, { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  X,
  CaretLeft,
  CaretRight,
  Eye,
  Calendar,
  Tag,
  PlayCircle,
  Image as ImageIcon
} from "phosphor-react";
import { ScanningButton } from "@/components/ui/ScanningButton";

interface MediaItem {
  id: string;
  title: string;
  description?: string;
  url: string;
  thumbnailUrl?: string;
  format: 'square' | 'landscape' | 'portrait' | 'reels';
  category: string;
  tags: string[];
  date: string;
  views?: number;
}

interface Video extends MediaItem {
  type: 'video';
  duration?: string;
}

interface Graphic extends MediaItem {
  type: 'graphic';
  width?: number;
  height?: number;
}

type PortfolioItem = Video | Graphic;

interface PortfolioModalProps {
  item: PortfolioItem | null;
  items: PortfolioItem[];
  onClose: () => void;
  onNavigate: (item: PortfolioItem) => void;
}

const PortfolioModal: React.FC<PortfolioModalProps> = ({
  item,
  items,
  onClose,
  onNavigate
}) => {
  // Prevent body scroll when modal is open
  useEffect(() => {
    if (item) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [item]);

  // Keyboard navigation
  useEffect(() => {
    if (!item) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      } else if (e.key === 'ArrowLeft' || e.key === 'ArrowRight') {
        const currentIndex = items.findIndex(i => i.id === item.id);
        if (e.key === 'ArrowLeft' && currentIndex > 0) {
          onNavigate(items[currentIndex - 1]);
        } else if (e.key === 'ArrowRight' && currentIndex < items.length - 1) {
          onNavigate(items[currentIndex + 1]);
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [item, items, onClose, onNavigate]);

  if (!item) return null;

  const currentIndex = items.findIndex(i => i.id === item.id);
  const canNavigateLeft = currentIndex > 0;
  const canNavigateRight = currentIndex < items.length - 1;

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-50 flex items-center justify-center p-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
      >
        {/* Backdrop */}
        <div className="absolute inset-0 bg-black/90 backdrop-blur-md"></div>
        
        {/* Modal Content */}
        <motion.div
          className="relative max-w-6xl w-full max-h-[90vh] overflow-hidden rounded-2xl bg-white dark:bg-zinc-900 shadow-2xl"
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="absolute top-0 left-0 right-0 z-10 p-6 bg-gradient-to-b from-black/50 to-transparent">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                {item.type === 'video' ? (
                  <div className="flex items-center gap-2 px-3 py-1.5 bg-white/20 backdrop-blur-md rounded-full">
                    <PlayCircle weight="duotone" className="text-blue-400" size={18} />
                    <span className="text-sm font-medium text-white">
                      {(item as Video).duration}
                    </span>
                  </div>
                ) : (
                  <div className="flex items-center gap-2 px-3 py-1.5 bg-white/20 backdrop-blur-md rounded-full">
                    <ImageIcon weight="duotone" className="text-emerald-400" size={18} />
                    <span className="text-sm font-medium text-white">
                      Graphic Design
                    </span>
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

          {/* Navigation Buttons */}
          {canNavigateLeft && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                onNavigate(items[currentIndex - 1]);
              }}
              className="absolute top-1/2 -translate-y-1/2 left-4 z-10 p-3 bg-white/10 backdrop-blur-md rounded-full text-white hover:bg-white/20 transition-colors"
            >
              <CaretLeft size={24} />
            </button>
          )}
          
          {canNavigateRight && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                onNavigate(items[currentIndex + 1]);
              }}
              className="absolute top-1/2 -translate-y-1/2 right-4 z-10 p-3 bg-white/10 backdrop-blur-md rounded-full text-white hover:bg-white/20 transition-colors"
            >
              <CaretRight size={24} />
            </button>
          )}

          {/* Media Display */}
          <div className="relative overflow-hidden">
            {item.type === 'video' ? (
              <div className="aspect-video bg-black flex items-center justify-center">
                <video
                  src={item.url}
                  controls
                  autoPlay
                  className="w-full h-full object-contain"
                  poster={item.thumbnailUrl}
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

          {/* Info Panel - COMMENTED OUT */}
          {/* 
          <div className="p-6 bg-white dark:bg-zinc-900 border-t border-slate-200 dark:border-zinc-800">
            <div className="grid lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2">
                <h2 className="text-2xl md:text-3xl font-bold text-slate-900 dark:text-white mb-3">
                  {item.title}
                </h2>
                <p className="text-slate-600 dark:text-zinc-300 mb-4 leading-relaxed">
                  {item.description}
                </p>
                
                <div className="flex flex-wrap gap-2">
                  {item.tags.map((tag, i) => (
                    <span 
                      key={i}
                      className="flex items-center gap-1 px-3 py-1.5 bg-slate-100 dark:bg-zinc-800 rounded-full text-sm text-slate-700 dark:text-zinc-300"
                    >
                      <Tag weight="duotone" size={14} />
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              <div className="space-y-6">
                <div className="space-y-4">
                  <h3 className="font-semibold text-slate-900 dark:text-white">Project Details</h3>
                  
                  {item.views && (
                    <div className="flex items-center gap-3">
                      <Eye weight="duotone" size={20} className="text-blue-500" />
                      <div>
                        <div className="font-medium text-slate-900 dark:text-white">
                          {item.views.toLocaleString()}
                        </div>
                        <div className="text-sm text-slate-500 dark:text-gray-400">Views</div>
                      </div>
                    </div>
                  )}
                  
                  <div className="flex items-center gap-3">
                    <Calendar weight="duotone" size={20} className="text-emerald-500" />
                    <div>
                      <div className="font-medium text-slate-900 dark:text-white">
                        {new Date(item.date).toLocaleDateString('en-US', { 
                          month: 'long', 
                          day: 'numeric', 
                          year: 'numeric' 
                        })}
                      </div>
                      <div className="text-sm text-slate-500 dark:text-gray-400">Completed</div>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="w-5 h-5 rounded-full bg-gradient-to-r from-purple-400 to-purple-600"></div>
                    <div>
                      <div className="font-medium text-slate-900 dark:text-white capitalize">
                        {item.category.replace('-', ' ')}
                      </div>
                      <div className="text-sm text-slate-500 dark:text-gray-400">Category</div>
                    </div>
                  </div>
                </div>

                <div className="space-y-3">
                  <ScanningButton className="w-full" size="md">
                    View Project Details
                  </ScanningButton>
                  <ScanningButton className="w-full" size="md" variant="secondary">
                    Start Similar Project
                  </ScanningButton>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-center mt-6 pt-6 border-t border-slate-200 dark:border-zinc-800">
              <div className="flex items-center gap-2 text-sm text-slate-500 dark:text-gray-400">
                <span>{currentIndex + 1}</span>
                <span>/</span>
                <span>{items.length}</span>
                <span className="ml-2">•</span>
                <span className="ml-2">Use arrow keys to navigate</span>
              </div>
            </div>
          </div>
          */}
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default PortfolioModal;