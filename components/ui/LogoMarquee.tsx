"use client";

import React from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";

interface Logo {
  src: string;
  alt: string;
  width?: number;
}

interface LogoMarqueeProps {
  logos: Logo[];
  className?: string;
  speed?: "slow" | "normal" | "fast";
}

const speedMap = {
  slow: "40s",
  normal: "25s",
  fast: "15s",
};

const LogoMarquee = ({ logos, className, speed = "normal" }: LogoMarqueeProps) => {
  const duplicatedLogos = [...logos, ...logos];

  return (
    <div className={cn("relative overflow-hidden", className)}>
      <div
        className="flex items-center gap-12 md:gap-16 hover:[animation-play-state:paused]"
        style={{
          animation: `marquee-left ${speedMap[speed]} linear infinite`,
          width: "fit-content",
        }}
      >
        {duplicatedLogos.map((logo, index) => (
          <div
            key={`${logo.alt}-${index}`}
            className="flex-shrink-0 grayscale opacity-60 hover:grayscale-0 hover:opacity-100 transition-all duration-300"
          >
            <Image
              src={logo.src}
              alt={logo.alt}
              width={logo.width || 120}
              height={40}
              className="h-8 md:h-10 w-auto object-contain"
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export { LogoMarquee };
export type { Logo,  };
