"use client";

import { useScrollDepthTracking } from "@/hooks/useScrollDepthTracking";
import { useTimeOnPage } from "@/hooks/useTimeOnPage";

export function GlobalAnalyticsProvider({ children }: { children: React.ReactNode }) {
  // Enable global tracking for all pages
  useScrollDepthTracking();
  useTimeOnPage();
  
  return <>{children}</>;
}