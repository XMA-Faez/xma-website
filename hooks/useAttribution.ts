"use client";

import { useEffect, useCallback } from "react";
import { useSearchParams, usePathname } from "next/navigation";
import { usePostHog } from "posthog-js/react";
import type { AttributionData } from "@/lib/posthog-events";

const FIRST_TOUCH_KEY = "xma_first_touch_attribution";
const LAST_TOUCH_KEY = "xma_attribution";
const EXCLUDED_PATHS = ["/studio"];

function isExcludedPath(pathname: string): boolean {
  return EXCLUDED_PATHS.some(
    (excluded) => pathname === excluded || pathname.startsWith(`${excluded}/`)
  );
}

export function useAttribution() {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const posthog = usePostHog();

  const captureAttribution = useCallback((): AttributionData | null => {
    if (typeof window === "undefined") return null;

    const utmSource = searchParams.get("utm_source");
    const utmMedium = searchParams.get("utm_medium");
    const utmCampaign = searchParams.get("utm_campaign");
    const utmTerm = searchParams.get("utm_term");
    const utmContent = searchParams.get("utm_content");

    const referrer = document.referrer;
    let referrerDomain: string | undefined;

    if (referrer && !referrer.includes(window.location.hostname)) {
      try {
        referrerDomain = new URL(referrer).hostname;
      } catch {
        referrerDomain = undefined;
      }
    }

    const landingPage = window.location.pathname;
    const hasUtmParams = utmSource || utmMedium || utmCampaign;
    const hasExternalReferrer = referrer && !referrer.includes(window.location.hostname);

    if (!hasUtmParams && !hasExternalReferrer) return null;

    return {
      utm_source: utmSource || undefined,
      utm_medium: utmMedium || undefined,
      utm_campaign: utmCampaign || undefined,
      utm_term: utmTerm || undefined,
      utm_content: utmContent || undefined,
      referrer: referrer || undefined,
      referrer_domain: referrerDomain,
      landing_page: landingPage,
      first_visit_timestamp: new Date().toISOString(),
      attribution_type: "first_touch",
    };
  }, [searchParams]);

  useEffect(() => {
    if (isExcludedPath(pathname)) return;

    const currentAttribution = captureAttribution();
    if (!currentAttribution) return;

    const existingFirstTouch = localStorage.getItem(FIRST_TOUCH_KEY);
    if (!existingFirstTouch) {
      localStorage.setItem(
        FIRST_TOUCH_KEY,
        JSON.stringify({
          ...currentAttribution,
          attribution_type: "first_touch",
        })
      );

      posthog?.setPersonPropertiesForFlags({
        $initial_utm_source: currentAttribution.utm_source,
        $initial_utm_medium: currentAttribution.utm_medium,
        $initial_utm_campaign: currentAttribution.utm_campaign,
        $initial_referrer: currentAttribution.referrer,
        $initial_landing_page: currentAttribution.landing_page,
      });
    }

    localStorage.setItem(
      LAST_TOUCH_KEY,
      JSON.stringify({
        ...currentAttribution,
        attribution_type: "last_touch",
      })
    );

    posthog?.register({
      $current_utm_source: currentAttribution.utm_source,
      $current_utm_medium: currentAttribution.utm_medium,
      $current_utm_campaign: currentAttribution.utm_campaign,
      $current_referrer: currentAttribution.referrer,
    });
  }, [captureAttribution, pathname, posthog]);

  const getFirstTouchAttribution = useCallback((): AttributionData | null => {
    if (typeof window === "undefined") return null;
    const stored = localStorage.getItem(FIRST_TOUCH_KEY);
    return stored ? JSON.parse(stored) : null;
  }, []);

  const getLastTouchAttribution = useCallback((): AttributionData | null => {
    if (typeof window === "undefined") return null;
    const stored = localStorage.getItem(LAST_TOUCH_KEY);
    return stored ? JSON.parse(stored) : null;
  }, []);

  return {
    captureAttribution,
    getFirstTouchAttribution,
    getLastTouchAttribution,
  };
}

export function classifyTrafficSource(
  utmSource: string | undefined,
  referrer: string | undefined
): string {
  if (utmSource) return utmSource;

  if (!referrer) return "direct";

  try {
    const referrerHost = new URL(referrer).hostname.toLowerCase();

    if (referrerHost.includes("google")) return "google_organic";
    if (referrerHost.includes("bing")) return "bing_organic";
    if (referrerHost.includes("facebook") || referrerHost.includes("fb.com"))
      return "facebook";
    if (referrerHost.includes("instagram")) return "instagram";
    if (referrerHost.includes("linkedin")) return "linkedin";
    if (referrerHost.includes("twitter") || referrerHost.includes("x.com"))
      return "twitter";
    if (referrerHost.includes("youtube")) return "youtube";
    if (referrerHost.includes("tiktok")) return "tiktok";

    return referrerHost;
  } catch {
    return "unknown";
  }
}
