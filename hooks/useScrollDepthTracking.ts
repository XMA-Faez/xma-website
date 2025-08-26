"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import { useTrackEvent } from "./useTrackEvent";
import { POSTHOG_EVENTS } from "@/lib/posthog-events";

export function useScrollDepthTracking() {
  const trackEvent = useTrackEvent();
  const pathname = usePathname();
  const trackedDepths = useRef(new Set<number>());

  useEffect(() => {
    // Reset tracked depths on page change
    trackedDepths.current.clear();

    const handleScroll = () => {
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;
      const scrollTop = window.scrollY || document.documentElement.scrollTop;
      const scrollPercentage = (scrollTop + windowHeight) / documentHeight * 100;

      const depths = [25, 50, 75, 100] as const;
      
      depths.forEach(depth => {
        if (scrollPercentage >= depth && !trackedDepths.current.has(depth)) {
          trackedDepths.current.add(depth);
          
          trackEvent(POSTHOG_EVENTS.SCROLL_DEPTH, {
            depth_percentage: depth,
            pixel_depth: scrollTop + windowHeight,
            page_height: documentHeight,
          });
        }
      });
    };

    // Debounce scroll events
    let scrollTimer: NodeJS.Timeout;
    const debouncedHandleScroll = () => {
      if (scrollTimer) clearTimeout(scrollTimer);
      scrollTimer = setTimeout(handleScroll, 150);
    };

    window.addEventListener("scroll", debouncedHandleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", debouncedHandleScroll);
      if (scrollTimer) clearTimeout(scrollTimer);
    };
  }, [pathname, trackEvent]);
}