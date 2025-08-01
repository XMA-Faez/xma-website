"use client";

import React from "react";
import { cn } from "@/lib/utils";
import { motion } from "motion/react";

interface GlassShimmerButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  variant?: "primary" | "secondary" | "tertiary";
  size?: "sm" | "md" | "lg";
  className?: string;
  href?: string;
}

const GlassShimmerButton = React.forwardRef<HTMLButtonElement, GlassShimmerButtonProps>(
  (
    { children, variant = "secondary", size = "md", className, ...props },
    ref,
  ) => {
    const baseClasses =
      "group relative font-medium overflow-hidden transition-all duration-300 transform-gpu";

    const variantClasses = {
      primary: "text-white",
      secondary: "text-white", 
      tertiary: "text-white",
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
        border: "1px solid rgba(255, 255, 255, 0.2)",
      };

      switch (variant) {
        case "primary":
          return {
            ...baseStyle,
            background: "linear-gradient(135deg, rgba(59, 130, 246, 0.15), rgba(147, 197, 253, 0.08))",
            border: "1px solid rgba(59, 130, 246, 0.2)",
          };
        case "secondary":
          return {
            ...baseStyle,
            background: "linear-gradient(135deg, rgba(14, 165, 233, 0.12), rgba(56, 189, 248, 0.06))",
            border: "1px solid rgba(14, 165, 233, 0.15)",
          };
        case "tertiary":
          return {
            ...baseStyle,
            background: "linear-gradient(135deg, rgba(255, 255, 255, 0.08), rgba(255, 255, 255, 0.03))",
            border: "1px solid rgba(255, 255, 255, 0.1)",
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
          "hover:electric-glow",
          className,
        )}
        style={getGlassmorphismStyle()}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        {...props}
      >
        {/* Shimmer effect on hover */}
        <div className="absolute inset-0 overflow-hidden rounded-inherit opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <div className="absolute -inset-full animate-shimmer-slow bg-gradient-to-r from-transparent via-white/10 to-transparent skew-x-12" />
        </div>

        {/* Content */}
        <span className="relative z-10 font-medium tracking-wide drop-shadow-sm">
          {children}
        </span>
      </motion.button>
    );
  },
);

GlassShimmerButton.displayName = "GlassShimmerButton";

export { GlassShimmerButton };