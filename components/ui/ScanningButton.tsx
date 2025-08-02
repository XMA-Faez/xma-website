import React from "react";
import { cn } from "@/lib/utils";
import { motion } from "motion/react";

interface ScanningButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  variant?: "primary" | "secondary" | "outline";
  size?: "sm" | "md" | "lg";
  color?: "blue" | "emerald" | "purple" | "amber";
  className?: string;
}

const ScanningButton = React.forwardRef<HTMLButtonElement, ScanningButtonProps>(
  (
    { children, variant = "primary", size = "md", color = "blue", className, ...props },
    ref,
  ) => {
    const baseClasses =
      "group relative font-medium rounded-lg overflow-hidden transition-all duration-300 transform-gpu";

    // Color-specific styling with inline styles for dynamic colors
    const getColorStyles = () => {
      const colorConfig = {
        blue: {
          primary: {
            background: "linear-gradient(135deg, rgba(59, 130, 246, 0.25), rgba(147, 197, 253, 0.15))",
            border: "1px solid rgba(59, 130, 246, 0.3)",
            hoverGlow: "0 0 20px rgba(59, 130, 246, 0.4)",
            textColor: "text-white",
            hoverBackground: "linear-gradient(135deg, rgba(14, 165, 233, 0.22), rgba(56, 189, 248, 0.12))"
          },
          secondary: {
            background: "linear-gradient(135deg, rgba(255, 255, 255, 0.05), rgba(255, 255, 255, 0.02))",
            border: "1px solid rgba(59, 130, 246, 0.2)",
            hoverGlow: "0 0 30px rgba(59, 130, 246, 0.3), inset 0 0 20px rgba(59, 130, 246, 0.1)",
            textColor: "text-blue-400",
            hoverBackground: "linear-gradient(135deg, rgba(59, 130, 246, 0.08), rgba(147, 197, 253, 0.05))"
          },
          outline: {
            background: "rgba(24, 24, 27, 0.5)",
            border: "1px solid rgba(59, 130, 246, 0.3)",
            hoverGlow: "0 0 20px rgba(59, 130, 246, 0.3)",
            textColor: "text-blue-400",
            hoverTextColor: "text-white",
            hoverBackground: "linear-gradient(135deg, rgba(14, 165, 233, 0.22), rgba(56, 189, 248, 0.12))"
          }
        },
        emerald: {
          primary: {
            background: "linear-gradient(135deg, rgba(16, 185, 129, 0.25), rgba(52, 211, 153, 0.15))",
            border: "1px solid rgba(16, 185, 129, 0.3)",
            hoverGlow: "0 0 20px rgba(16, 185, 129, 0.4)",
            textColor: "text-white",
            hoverBackground: "linear-gradient(135deg, rgba(5, 150, 105, 0.22), rgba(34, 197, 94, 0.12))"
          },
          secondary: {
            background: "linear-gradient(135deg, rgba(255, 255, 255, 0.05), rgba(255, 255, 255, 0.02))",
            border: "1px solid rgba(16, 185, 129, 0.2)",
            hoverGlow: "0 0 30px rgba(16, 185, 129, 0.3), inset 0 0 20px rgba(16, 185, 129, 0.1)",
            textColor: "text-emerald-400",
            hoverBackground: "linear-gradient(135deg, rgba(16, 185, 129, 0.08), rgba(52, 211, 153, 0.05))"
          },
          outline: {
            background: "rgba(24, 24, 27, 0.5)",
            border: "1px solid rgba(16, 185, 129, 0.3)",
            hoverGlow: "0 0 20px rgba(16, 185, 129, 0.3)",
            textColor: "text-emerald-400",
            hoverTextColor: "text-white",
            hoverBackground: "linear-gradient(135deg, rgba(5, 150, 105, 0.22), rgba(34, 197, 94, 0.12))"
          }
        },
        purple: {
          primary: {
            background: "linear-gradient(135deg, rgba(147, 51, 234, 0.25), rgba(196, 181, 253, 0.15))",
            border: "1px solid rgba(147, 51, 234, 0.3)",
            hoverGlow: "0 0 20px rgba(147, 51, 234, 0.4)",
            textColor: "text-white",
            hoverBackground: "linear-gradient(135deg, rgba(124, 58, 237, 0.22), rgba(168, 85, 247, 0.12))"
          },
          secondary: {
            background: "linear-gradient(135deg, rgba(255, 255, 255, 0.05), rgba(255, 255, 255, 0.02))",
            border: "1px solid rgba(147, 51, 234, 0.2)",
            hoverGlow: "0 0 30px rgba(147, 51, 234, 0.3), inset 0 0 20px rgba(147, 51, 234, 0.1)",
            textColor: "text-purple-400",
            hoverBackground: "linear-gradient(135deg, rgba(147, 51, 234, 0.08), rgba(196, 181, 253, 0.05))"
          },
          outline: {
            background: "rgba(24, 24, 27, 0.5)",
            border: "1px solid rgba(147, 51, 234, 0.3)",
            hoverGlow: "0 0 20px rgba(147, 51, 234, 0.3)",
            textColor: "text-purple-400",
            hoverTextColor: "text-white",
            hoverBackground: "linear-gradient(135deg, rgba(124, 58, 237, 0.22), rgba(168, 85, 247, 0.12))"
          }
        },
        amber: {
          primary: {
            background: "linear-gradient(135deg, rgba(245, 158, 11, 0.25), rgba(251, 191, 36, 0.15))",
            border: "1px solid rgba(245, 158, 11, 0.3)",
            hoverGlow: "0 0 20px rgba(245, 158, 11, 0.4)",
            textColor: "text-white",
            hoverBackground: "linear-gradient(135deg, rgba(217, 119, 6, 0.22), rgba(251, 146, 60, 0.12))"
          },
          secondary: {
            background: "linear-gradient(135deg, rgba(255, 255, 255, 0.05), rgba(255, 255, 255, 0.02))",
            border: "1px solid rgba(245, 158, 11, 0.2)",
            hoverGlow: "0 0 30px rgba(245, 158, 11, 0.3), inset 0 0 20px rgba(245, 158, 11, 0.1)",
            textColor: "text-amber-400",
            hoverBackground: "linear-gradient(135deg, rgba(245, 158, 11, 0.08), rgba(251, 191, 36, 0.05))"
          },
          outline: {
            background: "rgba(24, 24, 27, 0.5)",
            border: "1px solid rgba(245, 158, 11, 0.3)",
            hoverGlow: "0 0 20px rgba(245, 158, 11, 0.3)",
            textColor: "text-amber-400",
            hoverTextColor: "text-white",
            hoverBackground: "linear-gradient(135deg, rgba(217, 119, 6, 0.22), rgba(251, 146, 60, 0.12))"
          }
        }
      };
      return colorConfig[color][variant];
    };

    const colorStyles = getColorStyles();

    const getTextColorClass = () => {
      return colorStyles.hoverTextColor 
        ? `${colorStyles.textColor} hover:${colorStyles.hoverTextColor.replace('text-', '')}`
        : colorStyles.textColor;
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
          getTextColorClass(),
          sizeClasses[size],
          className,
        )}
        style={{
          background: colorStyles.background,
          border: colorStyles.border,
          willChange: "transform"
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.boxShadow = colorStyles.hoverGlow;
          if (colorStyles.hoverBackground) {
            e.currentTarget.style.background = colorStyles.hoverBackground;
          }
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.boxShadow = "none";
          e.currentTarget.style.background = colorStyles.background;
        }}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        {...props}
      >
        {/* Shimmer effect on hover */}
        <div className="absolute inset-0 overflow-hidden rounded-inherit">
          <div 
            className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-500 ease-out skew-x-12"
            style={{
              background: `linear-gradient(90deg, transparent, ${
                color === 'blue' ? 'rgba(255, 255, 255, 0.2)' :
                color === 'emerald' ? 'rgba(52, 211, 153, 0.3)' :
                color === 'purple' ? 'rgba(196, 181, 253, 0.3)' :
                color === 'amber' ? 'rgba(251, 191, 36, 0.3)' :
                'rgba(255, 255, 255, 0.2)'
              }, transparent)`
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

