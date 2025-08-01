"use client";

import React from "react";
import { cn } from "@/lib/utils";
import { motion } from "motion/react";

interface EmeraldGlassButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  variant?: "primary" | "secondary" | "tertiary";
  size?: "sm" | "md" | "lg";
  className?: string;
  href?: string;
}

const EmeraldGlassButton = React.forwardRef<HTMLButtonElement, EmeraldGlassButtonProps>(
  (
    { children, variant = "primary", size = "md", className, ...props },
    ref,
  ) => {
    const baseClasses =
      "group relative font-medium overflow-hidden transition-all duration-300 transform-gpu";

    const variantClasses = {
      primary: "text-white hover:emerald-glow-strong",
      secondary: "text-white hover:emerald-glow", 
      tertiary: "text-emerald-300 hover:text-white hover:emerald-glow",
    };

    const sizeClasses = {
      sm: "px-4 py-2 text-sm rounded-xl",
      md: "px-6 py-3 text-base rounded-2xl",
      lg: "px-8 py-4 text-lg rounded-2xl",
    };

    const getGlassmorphismStyle = () => {
      const baseStyle = {
        backdropFilter: "blur(20px) saturate(180%)",
        WebkitBackdropFilter: "blur(20px) saturate(180%)",
      };

      switch (variant) {
        case "primary":
          return {
            ...baseStyle,
            background: "linear-gradient(135deg, rgba(16, 185, 129, 0.25), rgba(52, 211, 153, 0.15))",
            border: "1px solid rgba(16, 185, 129, 0.3)",
          };
        case "secondary":
          return {
            ...baseStyle,
            background: "linear-gradient(135deg, rgba(5, 150, 105, 0.22), rgba(34, 197, 94, 0.12))",
            border: "1px solid rgba(5, 150, 105, 0.25)",
          };
        case "tertiary":
          return {
            ...baseStyle,
            background: "linear-gradient(135deg, rgba(16, 185, 129, 0.08), rgba(52, 211, 153, 0.03))",
            border: "1px solid rgba(16, 185, 129, 0.15)",
          };
        default:
          return baseStyle;
      }
    };

    return (
      <motion.button
        ref={ref}
        className={cn(
          baseClasses,
          variantClasses[variant],
          sizeClasses[size],
          className,
        )}
        style={getGlassmorphismStyle()}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        {...props}
      >
        {/* Shimmer effect on hover */}
        <div className="absolute inset-0 overflow-hidden rounded-inherit opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <div className="absolute -inset-full animate-shimmer-slow bg-gradient-to-r from-transparent via-white/15 to-transparent skew-x-12" />
        </div>

        {/* Content */}
        <span className="relative z-10 font-medium tracking-wide drop-shadow-sm">
          {children}
        </span>
      </motion.button>
    );
  },
);

EmeraldGlassButton.displayName = "EmeraldGlassButton";

export { EmeraldGlassButton };