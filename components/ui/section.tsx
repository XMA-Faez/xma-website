"use client";

import React from "react";
import { cn } from "@/lib/utils";

interface SectionProps {
  children: React.ReactNode;
  className?: string;
  id?: string;
  containerClassName?: string;
  size?: "sm" | "md" | "lg" | "xl" | "full";
  padding?: "none" | "sm" | "md" | "lg";
}

const sizeVariants = {
  sm: "max-w-3xl",
  md: "max-w-4xl",
  lg: "max-w-5xl",
  xl: "max-w-6xl xl:max-w-7xl",
  full: "max-w-full",
};

const paddingVariants = {
  none: "py-0",
  sm: "py-12 md:py-16",
  md: "py-16 md:py-24",
  lg: "py-24 md:py-32",
};

const Section = ({
  children,
  className,
  id,
  containerClassName,
  size = "xl",
  padding = "md",
}: SectionProps) => {
  return (
    <section
      id={id}
      className={cn("relative px-4 md:px-6", paddingVariants[padding], className)}
    >
      <div
        className={cn("mx-auto w-full", sizeVariants[size], containerClassName)}
      >
        {children}
      </div>
    </section>
  );
};

export default Section;
