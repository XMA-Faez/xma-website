// components/SidebarCTA.jsx
"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { MessageSquare, ArrowRight } from "lucide-react";

const SidebarCTA = ({ scrollThreshold = 300 }) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > scrollThreshold) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [scrollThreshold]);

  // Animation variants for the sidebar
  const sidebarVariants = {
    hidden: { x: "100%", opacity: 0 },
    visible: {
      x: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 15,
      },
    },
    exit: {
      x: "100%",
      opacity: 0,
      transition: { duration: 0.3 },
    },
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial="hidden"
          animate="visible"
          exit="exit"
          variants={sidebarVariants}
          className="fixed right-0 top-1/2 -translate-y-1/2 z-40"
        >
          <div className="bg-zinc-900/90 backdrop-blur-md border-l border-t border-b border-zinc-800 p-4 rounded-l-lg shadow-xl">
            <div className="flex flex-col items-center gap-3 w-64">
              <h3 className="text-lg font-bold bg-gradient-to-r from-red-600 to-red-500 bg-clip-text text-transparent">
                Ready to Grow?
              </h3>
              <p className="text-sm text-zinc-400 text-center mb-2">
                Join Dubai's top businesses using our lead generation system
              </p>

              <div className="flex flex-col gap-2 w-full">
                <Button
                  className="w-full bg-red-600 hover:bg-red-700 text-white py-2 rounded-lg font-medium transition duration-300 flex items-center justify-center gap-1"
                  onClick={() => {
                    // Scroll to pricing section - you might need to adjust this selector
                    const pricingSection = document.getElementById("cta");
                    if (pricingSection) {
                      pricingSection.scrollIntoView({ behavior: "smooth" });
                    }
                  }}
                >
                  <MessageSquare className="w-4 h-4" />
                  Schedule a Call
                </Button>

                <Button
                  variant="outline"
                  className="w-full border-zinc-700 text-zinc-300 hover:bg-zinc-800 py-2 rounded-lg font-medium transition duration-300 flex items-center justify-center gap-1"
                  onClick={() => {
                    // Scroll to pricing section - you might need to adjust this selector
                    const pricingSection =
                      document.getElementById("pricing") ||
                      document.querySelector('[data-section="pricing"]');
                    if (pricingSection) {
                      pricingSection.scrollIntoView({ behavior: "smooth" });
                    }
                  }}
                >
                  View Packages
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default SidebarCTA;
