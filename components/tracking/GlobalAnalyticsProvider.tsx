"use client";

import { useScrollDepthTracking } from "@/hooks/useScrollDepthTracking";
import { useTimeOnPage } from "@/hooks/useTimeOnPage";
import { useAttribution } from "@/hooks/useAttribution";
import { AttributionProvider } from "@/components/providers/AttributionProvider";

export function GlobalAnalyticsProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  useScrollDepthTracking();
  useTimeOnPage();
  useAttribution();

  return <AttributionProvider>{children}</AttributionProvider>;
}