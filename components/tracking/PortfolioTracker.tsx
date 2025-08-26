"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { useTrackEvent } from "@/hooks/useTrackEvent";
import { useScrollDepthTracking } from "@/hooks/useScrollDepthTracking";
import { POSTHOG_EVENTS } from "@/lib/posthog-events";

export function PortfolioTracker() {
  const trackEvent = useTrackEvent();
  const pathname = usePathname();
  
  // Enable scroll depth tracking
  useScrollDepthTracking();
  
  useEffect(() => {
    // Track portfolio page view
    trackEvent(POSTHOG_EVENTS.PORTFOLIO_VIEW, {
      portfolio_path: pathname,
    });
  }, [pathname, trackEvent]);
  
  return null;
}

// Hook for tracking portfolio interactions
export function usePortfolioTracking() {
  const trackEvent = useTrackEvent();
  
  const trackItemClick = (itemTitle: string, itemCategory?: string) => {
    trackEvent(POSTHOG_EVENTS.PORTFOLIO_ITEM_CLICK, {
      item_title: itemTitle,
      item_category: itemCategory,
    });
  };
  
  const trackFilter = (filterValue: string) => {
    trackEvent(POSTHOG_EVENTS.PORTFOLIO_FILTER, {
      filter_value: filterValue,
    });
  };
  
  return {
    trackItemClick,
    trackFilter,
  };
}