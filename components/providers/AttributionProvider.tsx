"use client";

import { useEffect, Suspense } from "react";
import { useSearchParams, usePathname } from "next/navigation";
import { usePostHog } from "posthog-js/react";
import { useTrackEvent } from "@/hooks/useTrackEvent";
import { POSTHOG_EVENTS } from "@/lib/posthog-events";
import { classifyTrafficSource } from "@/hooks/useAttribution";

const FIRST_TOUCH_KEY = "xma_first_touch_attribution";

function AttributionCapture() {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const posthog = usePostHog();
  const trackEvent = useTrackEvent();

  useEffect(() => {
    if (!posthog) return;

    const lastSessionId = sessionStorage.getItem("xma_session_id");
    const currentSessionId = posthog.get_session_id();

    if (lastSessionId !== currentSessionId) {
      sessionStorage.setItem("xma_session_id", currentSessionId || "");

      const utmSource = searchParams.get("utm_source") || undefined;
      const utmMedium = searchParams.get("utm_medium") || undefined;
      const utmCampaign = searchParams.get("utm_campaign") || undefined;
      const utmTerm = searchParams.get("utm_term") || undefined;
      const utmContent = searchParams.get("utm_content") || undefined;
      const referrer = document.referrer;

      let referrerDomain: string | undefined;
      if (referrer && !referrer.includes(window.location.hostname)) {
        try {
          referrerDomain = new URL(referrer).hostname;
        } catch {
          referrerDomain = undefined;
        }
      }

      const trafficSource = classifyTrafficSource(utmSource, referrer);
      const isFirstSession = !localStorage.getItem(FIRST_TOUCH_KEY);

      trackEvent(POSTHOG_EVENTS.LANDING_PAGE_VIEW, {
        landing_page: pathname,
        traffic_source: trafficSource,
        utm_source: utmSource,
        utm_medium: utmMedium,
        utm_campaign: utmCampaign,
        utm_term: utmTerm,
        utm_content: utmContent,
        referrer: referrer || undefined,
        referrer_domain: referrerDomain,
        is_first_session: isFirstSession,
      });

      if (utmSource || utmMedium || utmCampaign) {
        trackEvent(POSTHOG_EVENTS.ATTRIBUTION_CAPTURED, {
          landing_page: pathname,
          traffic_source: trafficSource,
          utm_source: utmSource,
          utm_medium: utmMedium,
          utm_campaign: utmCampaign,
          utm_term: utmTerm,
          utm_content: utmContent,
          referrer: referrer || undefined,
          referrer_domain: referrerDomain,
        });
      }
    }
  }, [searchParams, pathname, posthog, trackEvent]);

  return null;
}

export function AttributionProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Suspense fallback={null}>
        <AttributionCapture />
      </Suspense>
      {children}
    </>
  );
}
