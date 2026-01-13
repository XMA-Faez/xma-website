"use client";

import { Icon } from "@iconify/react";
import type { ServiceVisualTheme } from "./servicesData";

interface ServiceIconProps {
  icon: string;
  theme: ServiceVisualTheme;
  size?: "sm" | "md" | "lg";
}

const themeStyles: Record<
  ServiceVisualTheme,
  { gradientFrom: string; gradientTo: string; iconColor: string; glowColor: string }
> = {
  website: {
    gradientFrom: "oklch(0.55 0.22 260)",
    gradientTo: "oklch(0.45 0.25 280)",
    iconColor: "oklch(0.65 0.22 260)",
    glowColor: "oklch(0.55 0.22 260 / 0.4)",
  },
  creatives: {
    gradientFrom: "oklch(0.65 0.28 350)",
    gradientTo: "oklch(0.7 0.22 30)",
    iconColor: "oklch(0.7 0.28 350)",
    glowColor: "oklch(0.65 0.28 350 / 0.4)",
  },
  paidAds: {
    gradientFrom: "oklch(0.88 0.2 95)",
    gradientTo: "oklch(0.75 0.22 70)",
    iconColor: "oklch(0.88 0.2 95)",
    glowColor: "oklch(0.88 0.2 95 / 0.4)",
  },
  whatsapp: {
    gradientFrom: "oklch(0.85 0.2 165)",
    gradientTo: "oklch(0.75 0.18 180)",
    iconColor: "oklch(0.85 0.2 165)",
    glowColor: "oklch(0.85 0.2 165 / 0.4)",
  },
  crm: {
    gradientFrom: "oklch(0.5 0.28 285)",
    gradientTo: "oklch(0.55 0.22 260)",
    iconColor: "oklch(0.6 0.28 285)",
    glowColor: "oklch(0.5 0.28 285 / 0.4)",
  },
};

const sizeStyles = {
  sm: {
    wrapper: "p-[2px]",
    inner: "p-4",
    icon: "w-8 h-8",
  },
  md: {
    wrapper: "p-[2px]",
    inner: "p-6",
    icon: "w-12 h-12",
  },
  lg: {
    wrapper: "p-[3px]",
    inner: "p-8 md:p-10",
    icon: "w-16 h-16 md:w-20 md:h-20",
  },
};

const ServiceIcon = ({ icon, theme, size = "lg" }: ServiceIconProps) => {
  const themeStyle = themeStyles[theme];
  const sizeStyle = sizeStyles[size];

  return (
    <div
      className={`
        relative rounded-full
        ${sizeStyle.wrapper}
        transition-all duration-300 ease-out
        hover:scale-105
        group
      `}
      style={{
        background: `linear-gradient(135deg, ${themeStyle.gradientFrom}, ${themeStyle.gradientTo})`,
        boxShadow: `0 0 40px ${themeStyle.glowColor}`,
      }}
    >
      <div
        className={`
          bg-zinc-900 rounded-full
          ${sizeStyle.inner}
          flex items-center justify-center
          transition-all duration-300
          group-hover:bg-zinc-800/90
        `}
      >
        <Icon
          icon={icon}
          className={`${sizeStyle.icon} transition-transform duration-300 group-hover:scale-110`}
          style={{ color: themeStyle.iconColor }}
        />
      </div>
    </div>
  );
};

export default ServiceIcon;
