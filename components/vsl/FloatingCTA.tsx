// components/FloatingCTA.jsx
"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { X, ChevronRight } from "lucide-react";

const FloatingCTA = ({ hasWatchedVideo, onOpen }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [isDismissed, setIsDismissed] = useState(false);

  useEffect(() => {
    // Only show if the user has watched the video and hasn't dismissed
    if (hasWatchedVideo && !isDismissed) {
      const timer = setTimeout(() => {
        setIsVisible(true);
      }, 3000); // Show 3 seconds after watching video

      return () => clearTimeout(timer);
    }
  }, [hasWatchedVideo, isDismissed]);

  const handleDismiss = () => {
    setIsVisible(false);
    setIsDismissed(true);
  };

  const handleButtonClick = () => {
    if (onOpen) {
      onOpen();
    }
    setIsVisible(false);
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 50 }}
          transition={{ duration: 0.3 }}
          className="fixed bottom-6 right-6 z-50"
        >
          <div className="bg-zinc-900 border border-zinc-800 rounded-lg shadow-2xl p-4 max-w-sm">
            <button
              onClick={handleDismiss}
              className="absolute top-2 right-2 text-zinc-500 hover:text-zinc-300"
              aria-label="Close"
            >
              <X size={18} />
            </button>

            <div className="mb-4">
              <h3 className="text-lg font-bold mb-2">
                Ready to transform your business?
              </h3>
              <p className="text-zinc-400 text-sm">
                Schedule a free strategy call and learn how our 4-step system
                can work for you.
              </p>
            </div>

            <Button
              onClick={handleButtonClick}
              className="w-full bg-red-600 hover:bg-red-700 text-white flex items-center justify-center gap-1"
            >
              Schedule a Call <ChevronRight size={16} />
            </Button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default FloatingCTA;
