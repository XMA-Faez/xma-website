"use client";

import { forwardRef, type ComponentPropsWithoutRef } from "react";
import { cn } from "@/lib/utils";

interface SectionProps extends ComponentPropsWithoutRef<"section"> {
  size?: "sm" | "md" | "lg" | "xl" | "full";
  padding?: "none" | "sm" | "md" | "lg";
}

const sizeVariants = {
  sm: "max-w-3xl mx-auto",
  md: "max-w-4xl mx-auto",
  lg: "max-w-5xl mx-auto",
  xl: "max-w-6xl xl:max-w-7xl mx-auto",
  full: "max-w-full",
};

const paddingVariants = {
  none: "py-0",
  sm: "py-12 md:py-16",
  md: "py-16 md:py-24",
  lg: "py-24 md:py-32",
};

const Section = forwardRef<HTMLElement, SectionProps>(
  ({ children, className, size = "xl", padding = "md", ...props }, ref) => {
    return (
      <section
        ref={ref}
        className={cn(
          "relative w-full px-4 md:px-6",
          paddingVariants[padding],
          sizeVariants[size],
          className
        )}
        {...props}
      >
        {children}
      </section>
    );
  }
);

Section.displayName = "Section";

export default Section;
