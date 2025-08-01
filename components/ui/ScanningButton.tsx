import React from "react";
import { cn } from "@/lib/utils";
import { motion } from "motion/react";

interface ScanningButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  variant?: "primary" | "secondary" | "outline";
  size?: "sm" | "md" | "lg";
  className?: string;
}

const ScanningButton = React.forwardRef<HTMLButtonElement, ScanningButtonProps>(
  (
    { children, variant = "primary", size = "md", className, ...props },
    ref,
  ) => {
    const baseClasses =
      "group backdrop-blur-md relative font-medium rounded-2xl overflow-hidden transition-all duration-300 transform-gpu";

    const variantClasses = {
      primary:
        "glass-button-primary-light hover:glass-button-secondary-light text-white hover:electric-glow",
      secondary: "glass-button-secondary-light hover:glass-button-primary-light text-white hover:electric-glow",
      outline:
        "glass-button-tertiary hover:glass-button-secondary-light text-blue-400 hover:text-white hover:electric-glow",
    };

    const sizeClasses = {
      sm: "px-4 py-2 text-sm",
      md: "px-6 py-3 text-base",
      lg: "px-8 py-4 text-lg",
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
        {...props}
      >
        {/* Shimmer effect on hover */}
        <div className="absolute inset-0 overflow-hidden rounded-inherit">
          <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent transition-transform duration-500 ease-out skew-x-12" />
        </div>

        {/* Content */}
        <span className="relative z-10 font-medium tracking-wide drop-shadow-sm">{children}</span>
      </motion.button>
    );
  },
);

ScanningButton.displayName = "ScanningButton";

export { ScanningButton };

