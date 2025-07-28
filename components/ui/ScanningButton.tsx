import React from "react";
import { cn } from "@/lib/utils";

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
      "group relative font-semibold rounded-lg overflow-hidden transition-all duration-300";

    const variantClasses = {
      primary:
        "bg-gradient-to-r from-blue-600 to-indigo-600 text-white",
      secondary: "bg-zinc-800 text-white hover:bg-zinc-700",
      outline:
        "border-2 border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white",
    };

    const sizeClasses = {
      sm: "px-4 py-2 text-sm",
      md: "px-8 py-3 text-base",
      lg: "px-10 py-4 text-lg",
    };

    return (
      <button
        ref={ref}
        className={cn(
          baseClasses,
          variantClasses[variant],
          sizeClasses[size],
          className,
        )}
        {...props}
      >
        <span className="relative z-10">{children}</span>
        <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-12" />
      </button>
    );
  },
);

ScanningButton.displayName = "ScanningButton";

export { ScanningButton };

