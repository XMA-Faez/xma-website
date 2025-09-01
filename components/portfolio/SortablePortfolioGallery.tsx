"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  PlayCircle,
  Image as ImageIcon,
  DotsSixVertical,
  FloppyDisk,
} from "phosphor-react";
import { useIntersectionObserver } from "@/hooks/useIntersectionObserver";
import Image from "next/image";
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragOverlay,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
  useSortable,
} from "@dnd-kit/sortable";
import {
  CSS,
} from "@dnd-kit/utilities";
import { ProcessedPortfolioItem } from "@/lib/contentful-portfolio";

interface SortableCardProps {
  item: ProcessedPortfolioItem;
  index: number;
  onSelect: (item: ProcessedPortfolioItem) => void;
  isDragMode: boolean;
}

const SortableCard: React.FC<SortableCardProps> = ({
  item,
  index,
  onSelect,
  isDragMode,
}) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);
  const { ref, hasIntersected } = useIntersectionObserver({
    threshold: 0.1,
    rootMargin: "100px",
    once: true,
  });

  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: item.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  const handleImageLoad = () => {
    setImageLoaded(true);
  };

  const handleImageError = () => {
    setImageError(true);
    setImageLoaded(true);
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={`relative group cursor-pointer overflow-hidden rounded-2xl w-full ${
        isDragging ? 'opacity-50' : ''
      } ${isDragMode ? 'cursor-grab' : ''}`}
    >
      {/* Drag Handle */}
      {isDragMode && (
        <div
          {...attributes}
          {...listeners}
          className="absolute top-2 right-2 z-10 p-2 bg-white/90 dark:bg-black/70 backdrop-blur-md rounded-full cursor-grab hover:bg-white dark:hover:bg-black/90 transition-colors"
        >
          <DotsSixVertical size={16} className="text-slate-600 dark:text-zinc-400" />
        </div>
      )}

      <div
        ref={ref}
        onClick={isDragMode ? undefined : () => onSelect(item)}
        className={isDragMode ? 'pointer-events-none' : ''}
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
          {/* Placeholder */}
          <div className="absolute inset-0 bg-gradient-to-br from-slate-200 to-slate-300 dark:from-zinc-800 dark:to-zinc-900">
            {(!hasIntersected || !imageLoaded) && (
              <motion.div 
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-shimmer-slow"
                animate={{ opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              />
            )}
          </div>

          {/* Image */}
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
          {!isDragMode && (
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          )}

          {/* Type Badge */}
          <div className="absolute top-4 left-4">
            <div className="flex items-center gap-2 px-3 py-1.5 bg-white/90 dark:bg-black/70 backdrop-blur-md rounded-full">
              {item.resourceType === "video" ? (
                <>
                  <PlayCircle
                    weight="duotone"
                    className="text-blue-500"
                    size={18}
                  />
                  <span className="text-xs font-medium text-slate-700 dark:text-zinc-300">
                    Video
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

          {/* Order Number in Drag Mode */}
          {isDragMode && (
            <div className="absolute bottom-4 left-4">
              <div className="px-3 py-1.5 bg-blue-500 text-white rounded-full text-sm font-medium">
                {index + 1}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

interface SortablePortfolioGalleryProps {
  items: ProcessedPortfolioItem[];
  onItemSelect: (item: ProcessedPortfolioItem) => void;
  onOrderChange?: (newOrder: ProcessedPortfolioItem[]) => Promise<void>;
  isLoading?: boolean;
  canReorder?: boolean;
  hasMore?: boolean;
  onLoadMore?: () => Promise<void>;
  total?: number;
}

const SortablePortfolioGallery: React.FC<SortablePortfolioGalleryProps> = ({
  items,
  onItemSelect,
  onOrderChange,
  isLoading = false,
  canReorder = false,
  hasMore = false,
  onLoadMore,
  total = 0,
}) => {
  const [localItems, setLocalItems] = useState(items);
  const [isDragMode, setIsDragMode] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [activeId, setActiveId] = useState<string | null>(null);
  const [isLoadingMore, setIsLoadingMore] = useState(false);

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  React.useEffect(() => {
    setLocalItems(items);
  }, [items]);

  const handleDragStart = (event: any) => {
    const { active } = event;
    setActiveId(active.id);
  };

  const handleDragEnd = (event: any) => {
    const { active, over } = event;
    setActiveId(null);

    if (active.id !== over?.id) {
      setLocalItems((prevItems) => {
        const oldIndex = prevItems.findIndex((item) => item.id === active.id);
        const newIndex = prevItems.findIndex((item) => item.id === over.id);
        
        return arrayMove(prevItems, oldIndex, newIndex);
      });
    }
  };

  const saveOrder = async () => {
    if (!onOrderChange) return;
    
    setIsSaving(true);
    try {
      await onOrderChange(localItems);
      console.log('✅ Order saved successfully');
    } catch (error: any) {
      console.error('Failed to save order:', error);
      
      // Show user-friendly error message
      const errorMessage = error.message?.includes('rate limit') 
        ? 'Too many requests. Please wait a moment and try again.'
        : 'Failed to save order. Please try again.';
        
      alert(errorMessage);
      
      // Revert to original order on error
      setLocalItems(items);
    } finally {
      setIsSaving(false);
      setIsDragMode(false);
    }
  };

  const cancelReorder = () => {
    setLocalItems(items);
    setIsDragMode(false);
  };

  const handleLoadMore = async () => {
    if (!onLoadMore || isLoadingMore) return;
    
    setIsLoadingMore(true);
    try {
      await onLoadMore();
    } catch (error) {
      console.error('Failed to load more items:', error);
    } finally {
      setIsLoadingMore(false);
    }
  };

  if (isLoading) {
    const skeletonAspects = ['aspect-video', 'aspect-square', 'aspect-[3/4]', 'aspect-[9/16]', 'aspect-video', 'aspect-square'];
    
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[...Array(6)].map((_, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="relative overflow-hidden rounded-2xl bg-slate-50/50 dark:bg-zinc-900/50 backdrop-blur-sm border border-slate-200 dark:border-zinc-800 w-full"
          >
            <div className={`${skeletonAspects[index]} bg-gradient-to-br from-slate-200 to-slate-300 dark:from-zinc-800 dark:to-zinc-900 animate-pulse`}>
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-shimmer-slow"></div>
            </div>
          </motion.div>
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
          Create portfolio items in Contentful to see them here
        </p>
      </div>
    );
  }

  const activeItem = activeId ? localItems.find(item => item.id === activeId) : null;

  return (
    <div>
      {/* Reorder Controls */}
      {canReorder && (
        <div className="flex items-center justify-between mb-6 p-4 bg-slate-50 dark:bg-zinc-900 rounded-lg">
          <div className="flex items-center gap-3">
            <DotsSixVertical size={20} className="text-slate-500" />
            <span className="text-sm font-medium text-slate-700 dark:text-zinc-300">
              {isDragMode ? 'Drag items to reorder' : 'Reorder portfolio items'}
            </span>
          </div>
          
          <div className="flex items-center gap-2">
            {isDragMode ? (
              <>
                <button
                  onClick={cancelReorder}
                  className="px-4 py-2 text-sm text-slate-600 dark:text-zinc-400 hover:text-slate-800 dark:hover:text-zinc-200 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={saveOrder}
                  disabled={isSaving}
                  className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors text-sm"
                >
                  <FloppyDisk size={16} />
                  {isSaving ? 'Saving...' : 'Save Order'}
                </button>
              </>
            ) : (
              <button
                onClick={() => setIsDragMode(true)}
                className="px-4 py-2 bg-slate-200 dark:bg-zinc-800 text-slate-700 dark:text-zinc-300 rounded-lg hover:bg-slate-300 dark:hover:bg-zinc-700 transition-colors text-sm"
              >
                Reorder Items
              </button>
            )}
          </div>
        </div>
      )}

      {/* Gallery */}
      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
      >
        <SortableContext 
          items={localItems.map(item => item.id)} 
          strategy={verticalListSortingStrategy}
        >
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            {localItems.map((item, index) => (
              <SortableCard
                key={item.id}
                item={item}
                index={index}
                onSelect={onItemSelect}
                isDragMode={isDragMode}
              />
            ))}
          </motion.div>
        </SortableContext>
        
        <DragOverlay>
          {activeItem ? (
            <SortableCard
              item={activeItem}
              index={0}
              onSelect={() => {}}
              isDragMode={true}
            />
          ) : null}
        </DragOverlay>
      </DndContext>

      {/* Load More Button */}
      {hasMore && !isDragMode && (
        <div className="flex flex-col items-center mt-8 gap-4">
          <p className="text-sm text-slate-500 dark:text-zinc-400">
            Showing {items.length} of {total} items
          </p>
          <button
            onClick={handleLoadMore}
            disabled={isLoadingMore}
            className="px-6 py-3 bg-slate-100 dark:bg-zinc-800 text-slate-700 dark:text-zinc-300 rounded-lg hover:bg-slate-200 dark:hover:bg-zinc-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            {isLoadingMore ? 'Loading...' : 'Load More'}
          </button>
        </div>
      )}
    </div>
  );
};

export default SortablePortfolioGallery;