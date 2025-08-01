"use client";
import React from "react";
import { cn } from "@/lib/utils";
import { motion } from "motion/react";

interface LiquidGlassButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  variant?: "primary" | "secondary" | "outline";
  size?: "sm" | "md" | "lg";
  className?: string;
}

const LiquidGlassButton = React.forwardRef<HTMLButtonElement, LiquidGlassButtonProps>(
  (
    { children, variant = "primary", size = "md", className, ...props },
    ref,
  ) => {
    const [isPressed, setIsPressed] = React.useState(false);

    const baseClasses =
      "group relative font-medium overflow-hidden transition-all duration-300 transform-gpu";

    const variantClasses = {
      primary:
        "text-white",
      secondary: "text-white",
      outline:
        "text-blue-600",
    };

    const sizeClasses = {
      sm: "px-6 py-3 text-sm rounded-2xl",
      md: "px-8 py-4 text-base rounded-3xl",
      lg: "px-10 py-5 text-lg rounded-3xl",
    };

    return (
      <motion.button
        ref={ref}
        className={cn(
          baseClasses,
          variantClasses[variant],
          sizeClasses[size],
          "liquid-glass-button",
          className,
        )}
        onMouseDown={() => setIsPressed(true)}
        onMouseUp={() => setIsPressed(false)}
        onMouseLeave={() => setIsPressed(false)}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        style={{
          background: variant === "primary" 
            ? "linear-gradient(135deg, rgba(255,255,255,0.25) 0%, rgba(255,255,255,0.1) 100%)"
            : variant === "secondary"
            ? "linear-gradient(135deg, rgba(0,0,0,0.25) 0%, rgba(0,0,0,0.1) 100%)"
            : "linear-gradient(135deg, rgba(59,130,246,0.15) 0%, rgba(59,130,246,0.05) 100%)",
          backdropFilter: "blur(20px) saturate(180%)",
          WebkitBackdropFilter: "blur(20px) saturate(180%)",
          border: variant === "outline" 
            ? "1px solid rgba(59,130,246,0.3)" 
            : "1px solid rgba(255,255,255,0.2)",
        }}
        {...props}
      >
        {/* Liquid ripple effect */}
        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <div className="absolute inset-0 bg-gradient-radial from-white/20 via-transparent to-transparent animate-pulse" />
        </div>

        {/* Glass shimmer effect on hover */}
        <div className="absolute inset-0 overflow-hidden rounded-inherit opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <div className="absolute -inset-full animate-shimmer-slow bg-gradient-to-r from-transparent via-white/10 to-transparent skew-x-12" />
        </div>

        {/* Edge highlights */}
        <div className="absolute inset-0 rounded-inherit">
          <div className="absolute top-0 left-4 right-4 h-px bg-gradient-to-r from-transparent via-white/40 to-transparent" />
          <div className="absolute bottom-0 left-4 right-4 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />
        </div>

        {/* Liquid blob animation on hover */}
        <div className="absolute inset-0 opacity-0 group-hover:opacity-30 transition-all duration-500">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-gradient-conic from-blue-400/30 via-purple-400/30 to-pink-400/30 rounded-full blur-xl animate-spin-slow" />
        </div>

        {/* Inner glow */}
        <div className={cn(
          "absolute inset-1 rounded-inherit opacity-0 group-hover:opacity-50 transition-opacity duration-300",
          "bg-gradient-to-br from-white/30 via-transparent to-transparent"
        )} />

        {/* Content */}
        <span className="relative z-10 font-medium tracking-wide drop-shadow-sm">
          {children}
        </span>

        {/* Press state overlay */}
        {isPressed && (
          <div className="absolute inset-0 bg-black/10 rounded-inherit transition-opacity duration-150" />
        )}
      </motion.button>
    );
  },
);

LiquidGlassButton.displayName = "LiquidGlassButton";

export { LiquidGlassButton };