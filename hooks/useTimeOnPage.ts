"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import { useTrackEvent } from "./useTrackEvent";
import { POSTHOG_EVENTS } from "@/lib/posthog-events";

export function useTimeOnPage() {
  const trackEvent = useTrackEvent();
  const pathname = usePathname();
  const startTime = useRef<number>(Date.now());
  const intervalRef = useRef<NodeJS.Timeout>();

  useEffect(() => {
    // Reset start time on page change
    startTime.current = Date.now();

    // Track time on page every 30 seconds
    intervalRef.current = setInterval(() => {
      const timeOnPage = Math.floor((Date.now() - startTime.current) / 1000);
      
      trackEvent(POSTHOG_EVENTS.TIME_ON_PAGE, {
        time_seconds: timeOnPage,
        time_formatted: formatTime(timeOnPage),
      });
    }, 30000); // 30 seconds

    // Track when user leaves the page
    const handlePageExit = () => {
      const timeOnPage = Math.floor((Date.now() - startTime.current) / 1000);
      
      trackEvent(POSTHOG_EVENTS.PAGE_EXIT, {
        time_on_page_seconds: timeOnPage,
        time_formatted: formatTime(timeOnPage),
        exit_method: "navigation", // or "tab_close" if we detect that
      });
    };

    // Cleanup on unmount or page change
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
      handlePageExit();
    };
  }, [pathname, trackEvent]);
}

function formatTime(seconds: number): string {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;
  return `${minutes}:${remainingSeconds.toString().padStart(2, "0")}`;
}