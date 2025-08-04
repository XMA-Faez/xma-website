"use client";

import * as React from "react";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <div className="h-10 w-10 rounded-xl glass-primary animate-pulse" />;
  }

  return (
    <motion.button
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      className="relative h-10 w-10 rounded-xl glass-primary hover:glass-secondary border !border-zinc-300 dark:!border-zinc-800 hover:border-gray-500/30 transition-all duration-300 flex items-center justify-center group overflow-hidden"
      aria-label="Toggle theme"
    >
      {/* Glass shimmer effect on hover */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -skew-x-12 animate-shimmer-slow" />
      </div>

      {/* Theme icons with smooth transitions */}
      <AnimatePresence mode="wait">
        {theme === "dark" ? (
          <motion.div
            key="sun"
            initial={{ opacity: 0, rotate: -90, scale: 0.8 }}
            animate={{ opacity: 1, rotate: 0, scale: 1 }}
            exit={{ opacity: 0, rotate: 90, scale: 0.8 }}
            transition={{ duration: 0.2, ease: "easeInOut" }}
            className="relative z-10"
          >
            <Sun className="h-5 w-5 text-zinc-700 dark:text-zinc-300 drop-shadow-lg" />
          </motion.div>
        ) : (
          <motion.div
            key="moon"
            initial={{ opacity: 0, rotate: 90, scale: 0.8 }}
            animate={{ opacity: 1, rotate: 0, scale: 1 }}
            exit={{ opacity: 0, rotate: -90, scale: 0.8 }}
            transition={{ duration: 0.2, ease: "easeInOut" }}
            className="relative z-10"
          >
            <Moon className="h-5 w-5 text-zinc-600 dark:text-zinc-300  drop-shadow-lg" />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Electric glow effect */}
      <motion.div
        className="absolute inset-0 rounded-xl bg-gradient-to-r from-blue-500/0 via-blue-500/20 to-blue-500/0 opacity-0 group-hover:opacity-100"
        animate={{
          opacity: theme === "dark" ? [0, 0.3, 0] : [0, 0.2, 0],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
    </motion.button>
  );
}

export function ThemeToggleLarge() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="h-12 w-24 rounded-2xl glass-primary animate-pulse" />
    );
  }

  return (
    <motion.button
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      className="relative h-12 w-24 rounded-2xl glass-primary hover:glass-secondary border !border-zinc-600 dark:!border-zinc-300 hover:border-blue-500/30 transition-all duration-300 flex items-center justify-center group overflow-hidden px-3"
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      aria-label="Toggle theme"
    >
      {/* Background sliding indicator */}
      <motion.div
        className="absolute inset-1 rounded-xl bg-gradient-to-r from-blue-500/20 to-purple-500/20 backdrop-blur-sm"
        animate={{
          x: theme === "dark" ? 0 : "100%",
        }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        style={{ width: "40%" }}
      />

      {/* Icons container */}
      <div className="relative z-10 flex items-center justify-between w-full px-1">
        <motion.div
          animate={{
            scale: theme === "dark" ? 1.1 : 0.9,
            opacity: theme === "dark" ? 1 : 0.5,
          }}
          transition={{ duration: 0.3 }}
        >
          <Moon className="h-4 w-4 text-blue-400" />
        </motion.div>

        <motion.div
          animate={{
            scale: theme === "light" ? 1.1 : 0.9,
            opacity: theme === "light" ? 1 : 0.5,
          }}
          transition={{ duration: 0.3 }}
        >
          <Sun className="h-4 w-4 text-yellow-400" />
        </motion.div>
      </div>

      {/* Glass shimmer effect */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -skew-x-12 animate-shimmer-slow" />
      </div>
    </motion.button>
  );
}

