"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { useTrackEvent } from "@/hooks/useTrackEvent";
import { useScrollDepthTracking } from "@/hooks/useScrollDepthTracking";
import { useTimeOnPage } from "@/hooks/useTimeOnPage";
import { POSTHOG_EVENTS } from "@/lib/posthog-events";

interface ServicePageTrackerProps {
  serviceName: string;
  serviceCategory?: string;
}

export function ServicePageTracker({ serviceName, serviceCategory }: ServicePageTrackerProps) {
  const trackEvent = useTrackEvent();
  const pathname = usePathname();
  
  // Enable scroll depth tracking
  useScrollDepthTracking();
  
  // Enable time on page tracking
  useTimeOnPage();
  
  useEffect(() => {
    // Track service page view
    trackEvent(POSTHOG_EVENTS.SERVICE_VIEW, {
      service_name: serviceName,
      service_category: serviceCategory,
      service_path: pathname,
    });
  }, [serviceName, serviceCategory, pathname, trackEvent]);
  
  return null;
}