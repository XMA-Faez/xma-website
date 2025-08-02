"use client";

import React, { useState, useEffect, useRef, Suspense } from "react";
import { motion } from "framer-motion";

interface LazySectionProps {
  children: React.ReactNode;
  fallback?: React.ReactNode;
  rootMargin?: string;
  threshold?: number;
  className?: string;
  delay?: number;
  priority?: 'high' | 'medium' | 'low';
}

// Default loading skeleton
const DefaultSkeleton: React.FC = () => (
  <div className="py-20 animate-pulse">
    <div className="max-w-6xl mx-auto px-4">
      <div className="text-center mb-16">
        <div className="w-32 h-6 bg-zinc-800 rounded-full mx-auto mb-6" />
        <div className="w-96 h-12 bg-zinc-800 rounded-lg mx-auto mb-4" />
        <div className="w-80 h-6 bg-zinc-800 rounded-lg mx-auto" />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[1, 2, 3, 4, 5, 6].map(i => (
          <div key={i} className="p-6 rounded-2xl bg-zinc-900/50 border border-zinc-800">
            <div className="w-12 h-12 bg-zinc-800 rounded-xl mb-4" />
            <div className="w-32 h-6 bg-zinc-800 rounded mb-3" />
            <div className="w-full h-4 bg-zinc-800 rounded mb-2" />
            <div className="w-3/4 h-4 bg-zinc-800 rounded" />
          </div>
        ))}
      </div>
    </div>
  </div>
);

const LazySection: React.FC<LazySectionProps> = ({
  children,
  fallback = <DefaultSkeleton />,
  rootMargin = "100px",
  threshold = 0.1,
  className = "",
  delay = 0,
  priority = 'medium'
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const [shouldLoad, setShouldLoad] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);
  const observerRef = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    // High priority sections load immediately
    if (priority === 'high') {
      setShouldLoad(true);
      return;
    }

    // Create intersection observer
    observerRef.current = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (entry.isIntersecting) {
          setIsVisible(true);
          
          // Add delay for performance optimization
          const loadDelay = priority === 'low' ? delay + 500 : delay;
          
          setTimeout(() => {
            setShouldLoad(true);
          }, loadDelay);

          // Cleanup observer
          if (observerRef.current && entry.target) {
            observerRef.current.unobserve(entry.target);
          }
        }
      },
      {
        rootMargin,
        threshold
      }
    );

    // Start observing
    if (sectionRef.current && observerRef.current) {
      observerRef.current.observe(sectionRef.current);
    }

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, [rootMargin, threshold, delay, priority]);

  // Preload critical resources when visible
  useEffect(() => {
    if (isVisible && !shouldLoad) {
      // Preload any critical resources here
      const link = document.createElement('link');
      link.rel = 'preload';
      link.as = 'script';
      document.head.appendChild(link);
    }
  }, [isVisible, shouldLoad]);

  if (!shouldLoad) {
    return (
      <div ref={sectionRef} className={className}>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: isVisible ? 1 : 0 }}
          transition={{ duration: 0.3 }}
        >
          {fallback}
        </motion.div>
      </div>
    );
  }

  return (
    <div ref={sectionRef} className={className}>
      <Suspense fallback={fallback}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          {children}
        </motion.div>
      </Suspense>
    </div>
  );
};

export default LazySection;