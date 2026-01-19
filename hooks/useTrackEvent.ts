"use client";

import { usePostHog } from "posthog-js/react";
import { useCallback } from "react";
import type { BaseEventProperties, EventName } from "@/lib/posthog-events";

const EXCLUDED_PATHS = ["/studio"];

function isExcludedPath(pathname: string): boolean {
  return EXCLUDED_PATHS.some(
    (excluded) => pathname === excluded || pathname.startsWith(`${excluded}/`)
  );
}

export function useTrackEvent() {
  const posthog = usePostHog();

  const trackEvent = useCallback(
    (eventName: EventName | string, properties?: Record<string, unknown>) => {
      if (!posthog) return;

      const currentPath =
        typeof window !== "undefined" ? window.location.pathname : "";

      if (isExcludedPath(currentPath)) return;

      const baseProperties: Partial<BaseEventProperties> = {
        page_path: currentPath,
        page_title: typeof document !== "undefined" ? document.title : "",
        timestamp: new Date().toISOString(),
        referrer: typeof document !== "undefined" ? document.referrer : "",
      };

      posthog.capture(eventName, {
        ...baseProperties,
        ...properties,
      });
    },
    [posthog]
  );

  return trackEvent;
}

// Specialized hook for tracking CTA clicks
export function useTrackCTA() {
  const trackEvent = useTrackEvent();

  return useCallback(
    (buttonText: string, location: string, additionalProps?: Record<string, unknown>) => {
      trackEvent("cta_button_click", {
        button_text: buttonText,
        button_location: location,
        ...additionalProps,
      });
    },
    [trackEvent]
  );
}

// Specialized hook for tracking navigation
export function useTrackNavigation() {
  const trackEvent = useTrackEvent();

  return useCallback(
    (linkText: string, linkUrl: string, section: "header" | "footer" | "mobile_menu") => {
      const eventName = section === "footer" ? "footer_link_click" : "header_navigation_click";
      
      trackEvent(eventName, {
        link_text: linkText,
        link_url: linkUrl,
        navigation_section: section,
      });
    },
    [trackEvent]
  );
}