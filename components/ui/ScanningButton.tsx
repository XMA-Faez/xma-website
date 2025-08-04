import React from "react";
import { cn } from "@/lib/utils";
import { motion } from "motion/react";
import { cva, type VariantProps } from "class-variance-authority";

const scanningButtonVariants = cva(
  "group relative font-medium rounded-lg overflow-hidden transition-all duration-300 transform-gpu",
  {
    variants: {
      variant: {
        primary: "",
        secondary: "",
        outline: "",
      },
      size: {
        sm: "px-4 py-2 text-sm",
        md: "px-6 py-3 text-base",
        lg: "px-8 py-4 text-lg",
      },
      color: {
        blue: "",
        emerald: "",
        purple: "",
        amber: "",
        neutral: "",
      },
    },
    compoundVariants: [
      // Blue variants
      {
        variant: "primary",
        color: "blue",
        className: "text-white bg-gradient-to-br from-blue-500/25 to-blue-400/15 border border-blue-500/30 hover:from-sky-500/22 hover:to-sky-400/12 hover:shadow-[0_0_20px_rgba(59,130,246,0.4)]",
      },
      {
        variant: "secondary",
        color: "blue",
        className: "text-blue-300 bg-gradient-to-br from-blue-500/8 to-blue-400/5 border border-blue-500/25 hover:from-blue-500/15 hover:to-blue-400/10 hover:shadow-[0_0_30px_rgba(59,130,246,0.4),inset_0_0_20px_rgba(59,130,246,0.15)]",
      },
      {
        variant: "outline",
        color: "blue",
        className: "text-blue-400 hover:text-white bg-zinc-900/50 border border-blue-500/30 hover:bg-gradient-to-br hover:from-sky-500/22 hover:to-sky-400/12 hover:shadow-[0_0_20px_rgba(59,130,246,0.3)]",
      },
      // Emerald variants
      {
        variant: "primary",
        color: "emerald",
        className: "text-white bg-gradient-to-br from-emerald-500/25 to-emerald-400/15 border border-emerald-500/30 hover:from-emerald-600/22 hover:to-emerald-500/12 hover:shadow-[0_0_20px_rgba(16,185,129,0.4)]",
      },
      {
        variant: "secondary",
        color: "emerald",
        className: "text-emerald-300 bg-gradient-to-br from-emerald-500/8 to-emerald-400/5 border border-emerald-500/25 hover:from-emerald-500/15 hover:to-emerald-400/10 hover:shadow-[0_0_30px_rgba(16,185,129,0.4),inset_0_0_20px_rgba(16,185,129,0.15)]",
      },
      {
        variant: "outline",
        color: "emerald",
        className: "text-emerald-400 hover:text-white bg-zinc-900/50 border border-emerald-500/30 hover:bg-gradient-to-br hover:from-emerald-600/22 hover:to-emerald-500/12 hover:shadow-[0_0_20px_rgba(16,185,129,0.3)]",
      },
      // Purple variants
      {
        variant: "primary",
        color: "purple",
        className: "text-white bg-gradient-to-br from-purple-500/25 to-purple-400/15 border border-purple-500/30 hover:from-purple-600/22 hover:to-purple-500/12 hover:shadow-[0_0_20px_rgba(147,51,234,0.4)]",
      },
      {
        variant: "secondary",
        color: "purple",
        className: "text-purple-300 bg-gradient-to-br from-purple-500/8 to-purple-400/5 border border-purple-500/25 hover:from-purple-500/15 hover:to-purple-400/10 hover:shadow-[0_0_30px_rgba(147,51,234,0.4),inset_0_0_20px_rgba(147,51,234,0.15)]",
      },
      {
        variant: "outline",
        color: "purple",
        className: "text-purple-400 hover:text-white bg-zinc-900/50 border border-purple-500/30 hover:bg-gradient-to-br hover:from-purple-600/22 hover:to-purple-500/12 hover:shadow-[0_0_20px_rgba(147,51,234,0.3)]",
      },
      // Amber variants
      {
        variant: "primary",
        color: "amber",
        className: "text-white bg-gradient-to-br from-amber-500/25 to-amber-400/15 border border-amber-500/30 hover:from-amber-600/22 hover:to-amber-500/12 hover:shadow-[0_0_20px_rgba(245,158,11,0.4)]",
      },
      {
        variant: "secondary",
        color: "amber",
        className: "text-amber-300 bg-gradient-to-br from-amber-500/8 to-amber-400/5 border border-amber-500/25 hover:from-amber-500/15 hover:to-amber-400/10 hover:shadow-[0_0_30px_rgba(245,158,11,0.4),inset_0_0_20px_rgba(245,158,11,0.15)]",
      },
      {
        variant: "outline",
        color: "amber",
        className: "text-amber-400 hover:text-white bg-zinc-900/50 border border-amber-500/30 hover:bg-gradient-to-br hover:from-amber-600/22 hover:to-amber-500/12 hover:shadow-[0_0_20px_rgba(245,158,11,0.3)]",
      },
      // Neutral variants
      {
        variant: "primary",
        color: "neutral",
        className: "text-white bg-gradient-to-br from-zinc-500/20 to-zinc-400/10 border border-zinc-500/30 hover:from-zinc-600/25 hover:to-zinc-500/15 hover:shadow-[0_0_20px_rgba(163,163,163,0.4)]",
      },
      {
        variant: "secondary",
        color: "neutral",
        className: "text-zinc-300 bg-gradient-to-br from-zinc-500/50 to-zinc-400/35 border border-zinc-500/25 hover:from-zinc-500/15 hover:to-zinc-400/10 hover:shadow-[0_0_30px_rgba(163,163,163,0.4),inset_0_0_20px_rgba(163,163,163,0.15)]",
      },
      {
        variant: "outline",
        color: "neutral",
        className: "text-zinc-400 hover:text-white bg-zinc-900/50 border border-zinc-500/30 hover:bg-gradient-to-br hover:from-zinc-600/25 hover:to-zinc-500/15 hover:shadow-[0_0_20px_rgba(163,163,163,0.3)]",
      },
    ],
    defaultVariants: {
      variant: "primary",
      size: "md",
      color: "blue",
    },
  }
);

interface ScanningButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof scanningButtonVariants> {
  children: React.ReactNode;
}

const ScanningButton = React.forwardRef<HTMLButtonElement, ScanningButtonProps>(
  (
    { children, variant, size, color, className, ...props },
    ref,
  ) => {
    const getShimmerColor = () => {
      switch (color) {
        case 'emerald':
          return 'rgba(52, 211, 153, 0.3)';
        case 'purple':
          return 'rgba(196, 181, 253, 0.3)';
        case 'amber':
          return 'rgba(251, 191, 36, 0.3)';
        case 'neutral':
          return 'rgba(212, 212, 212, 0.25)';
        case 'blue':
        default:
          return 'rgba(255, 255, 255, 0.2)';
      }
    };

    return (
      <motion.button
        ref={ref}
        className={cn(
          scanningButtonVariants({ variant, size, color, className })
        )}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        {...props}
      >
        {/* Shimmer effect on hover */}
        <div className="absolute inset-0 overflow-hidden rounded-inherit">
          <div 
            className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-500 ease-out skew-x-12"
            style={{
              background: `linear-gradient(90deg, transparent, ${getShimmerColor()}, transparent)`
            }}
          />
        </div>

        {/* Content */}
        <span className="relative z-10 font-medium tracking-wide drop-shadow-sm">{children}</span>
      </motion.button>
    );
  },
);

ScanningButton.displayName = "ScanningButton";

export { ScanningButton };
