"use client";
import React from "react";
import { cn } from "@/lib/utils";
import { motion, useMotionValue, useTransform, useSpring } from "motion/react";

interface GlossyButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  variant?: "primary" | "secondary" | "outline";
  size?: "sm" | "md" | "lg";
  className?: string;
}

const GlossyButton = React.forwardRef<HTMLButtonElement, GlossyButtonProps>(
  (
    { children, variant = "primary", size = "md", className, ...props },
    ref,
  ) => {
    const [isHovered, setIsHovered] = React.useState(false);
    const buttonRef = React.useRef<HTMLButtonElement>(null);
    
    // Motion values for 3D tilt effect
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);
    
    // Smooth spring animation for the tilt
    const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [10, -10]));
    const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-10, 10]));
    
    // Dynamic lighting based on mouse position
    const lightX = useTransform(mouseX, [-0.5, 0.5], [-150, 150]);
    const lightY = useTransform(mouseY, [-0.5, 0.5], [-150, 150]);

    const handleMouseMove = (e: React.MouseEvent<HTMLButtonElement>) => {
      if (!buttonRef.current) return;
      const rect = buttonRef.current.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      mouseX.set(x);
      mouseY.set(y);
    };

    const handleMouseLeave = () => {
      mouseX.set(0);
      mouseY.set(0);
      setIsHovered(false);
    };

    const baseClasses =
      "group relative font-semibold rounded-3xl overflow-hidden transition-all duration-500 backdrop-blur-2xl transform-gpu";

    const variantClasses = {
      primary:
        "bg-gradient-to-br from-white/10 via-white/5 to-transparent text-white border border-white/20 shadow-2xl",
      secondary: "bg-white/10 text-white hover:bg-white/15 border border-white/10",
      outline:
        "border-2 border-white/30 text-white hover:bg-white/5",
    };

    const sizeClasses = {
      sm: "px-6 py-3 text-sm",
      md: "px-10 py-4 text-base",
      lg: "px-14 py-6 text-lg",
    };

    return (
      <motion.div
        style={{
          perspective: "1000px",
          transformStyle: "preserve-3d",
        }}
        className="inline-block"
      >
        <motion.button
          ref={buttonRef}
          className={cn(
            baseClasses,
            variantClasses[variant],
            sizeClasses[size],
            "relative",
            className,
          )}
          style={{
            rotateX,
            rotateY,
            transformStyle: "preserve-3d",
          }}
          onMouseMove={handleMouseMove}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={handleMouseLeave}
          whileHover={{ 
            scale: 1.05,
            transition: { duration: 0.3 }
          }}
          whileTap={{ 
            scale: 0.95,
            rotateX: 0,
            rotateY: 0,
          }}
          {...props}
        >
          {/* Multi-layer glass effect for depth */}
          <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-white/20 via-white/10 to-transparent opacity-60" 
               style={{ transform: "translateZ(-5px)" }} />
          <div className="absolute inset-0 rounded-3xl bg-gradient-to-tl from-blue-500/10 via-purple-500/10 to-pink-500/10 opacity-40" 
               style={{ transform: "translateZ(-10px)" }} />
          
          {/* Dynamic light reflection that follows mouse */}
          <motion.div
            className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
            style={{
              background: `radial-gradient(circle at center, rgba(255,255,255,0.8) 0%, transparent 50%)`,
              transform: "translateZ(5px)",
              x: lightX,
              y: lightY,
              filter: "blur(40px)",
            }}
          />
          
          {/* Chromatic aberration effect layers */}
          <div className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-30 transition-opacity duration-700">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-400/30 to-transparent mix-blend-screen" 
                 style={{ transform: "translateX(-2px) translateZ(2px)" }} />
            <div className="absolute inset-0 bg-gradient-to-r from-transparent to-red-400/30 mix-blend-screen" 
                 style={{ transform: "translateX(2px) translateZ(2px)" }} />
          </div>

          {/* Iridescent shimmer effect */}
          <div className="absolute inset-0 overflow-hidden rounded-3xl">
            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
              <div className="absolute -inset-full animate-iridescent bg-gradient-conic from-blue-500/20 via-purple-500/20 via-pink-500/20 via-yellow-500/20 to-blue-500/20" />
            </div>
          </div>

          {/* Animated refraction bands with distortion */}
          <div className="absolute inset-0 overflow-hidden rounded-3xl opacity-30">
            <div className="absolute -inset-x-full h-full flex">
              <div className="w-full h-full bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-12 animate-refraction" />
              <div className="w-full h-full bg-gradient-to-r from-transparent via-cyan-400/20 to-transparent skew-x-12 animate-refraction animation-delay-300" />
              <div className="w-full h-full bg-gradient-to-r from-transparent via-purple-400/20 to-transparent skew-x-12 animate-refraction animation-delay-600" />
            </div>
          </div>

          {/* Glass edge highlight */}
          <div className="absolute inset-0 rounded-3xl"
               style={{
                 background: "linear-gradient(135deg, rgba(255,255,255,0.4) 0%, transparent 40%, transparent 60%, rgba(255,255,255,0.1) 100%)",
                 transform: "translateZ(1px)",
               }} />

          {/* Content with depth */}
          <span className="relative z-10 font-medium tracking-wide mix-blend-screen"
                style={{ transform: "translateZ(10px)" }}>
            {children}
          </span>

          {/* Bottom glass edge reflection */}
          <div className="absolute bottom-0 left-4 right-4 h-px bg-gradient-to-r from-transparent via-white/60 to-transparent"
               style={{ transform: "translateZ(5px)" }} />
          
          {/* Subtle inner glow on hover */}
          <div className={cn(
            "absolute inset-1 rounded-3xl opacity-0 group-hover:opacity-20 transition-opacity duration-500",
            "bg-gradient-to-br from-white/50 via-transparent to-transparent blur-md"
          )} />
        </motion.button>
        
        {/* Reflection underneath button */}
        <motion.div 
          className="absolute top-full left-0 right-0 h-full mt-4 opacity-20 pointer-events-none"
          style={{
            background: `linear-gradient(to bottom, rgba(255,255,255,0.1) 0%, transparent 50%)`,
            filter: "blur(10px)",
            transform: "scaleY(-1) translateZ(-20px)",
            transformOrigin: "top",
          }}
        />
      </motion.div>
    );
  },
);

GlossyButton.displayName = "GlossyButton";

export { GlossyButton };