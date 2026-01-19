"use client";

import { Suspense } from "react";
import { useScrollDepthTracking } from "@/hooks/useScrollDepthTracking";
import { useTimeOnPage } from "@/hooks/useTimeOnPage";
import { useAttribution } from "@/hooks/useAttribution";
import { AttributionProvider } from "@/components/providers/AttributionProvider";

function AnalyticsHooks() {
  useScrollDepthTracking();
  useTimeOnPage();
  useAttribution();
  return null;
}

export function GlobalAnalyticsProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AttributionProvider>
      <Suspense fallback={null}>
        <AnalyticsHooks />
      </Suspense>
      {children}
    </AttributionProvider>
  );
}