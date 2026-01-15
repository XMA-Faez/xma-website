"use client";

import React from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";

interface Logo {
  src: string;
  alt: string;
  height: number;
}

interface LogoMarqueeProps {
  logos: Logo[];
  className?: string;
  speed?: "slow" | "normal" | "fast";
  containerHeight?: number;
}

const speedMap = {
  slow: "40s",
  normal: "25s",
  fast: "15s",
};

const LogoMarquee = ({
  logos,
  className,
  speed = "normal",
  containerHeight = 50,
}: LogoMarqueeProps) => {
  const duplicatedLogos = [...logos, ...logos];

  return (
    <div
      className={cn("relative overflow-hidden", className)}
      style={{ height: containerHeight }}
    >
      <div
        className="flex items-center gap-12 md:gap-16 hover:[animation-play-state:paused] h-full"
        style={{
          animation: `marquee-left ${speedMap[speed]} linear infinite`,
          width: "fit-content",
        }}
      >
        {duplicatedLogos.map((logo, index) => (
          <div
            key={`${logo.alt}-${index}`}
            className="flex-shrink-0 opacity-70 hover:opacity-100 transition-all duration-300 flex items-center"
            style={{ height: containerHeight }}
          >
            <Image
              src={logo.src}
              alt={logo.alt}
              width={230}
              height={logo.height}
              style={{ height: logo.height }}
              className="object-contain object-center w-full"
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export { LogoMarquee };
export type { Logo };
