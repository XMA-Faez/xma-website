"use client";

import { useCallback } from "react";
import { usePostHog } from "posthog-js/react";
import { useTrackEvent } from "./useTrackEvent";
import { POSTHOG_EVENTS, type AttributionData } from "@/lib/posthog-events";

type ConversionType =
  | "booking_completed"
  | "contact_form_submitted"
  | "payment_completed"
  | "lead_captured";

interface ConversionProperties {
  value?: number;
  currency?: string;
  conversion_source?: string;
  booking_type?: "strategy" | "crm";
  [key: string]: unknown;
}

const FIRST_TOUCH_KEY = "xma_first_touch_attribution";
const LAST_TOUCH_KEY = "xma_attribution";

function getStoredAttribution(key: string): AttributionData | null {
  if (typeof window === "undefined") return null;
  try {
    const stored = localStorage.getItem(key);
    return stored ? JSON.parse(stored) : null;
  } catch {
    return null;
  }
}

export function useConversionTracking() {
  const posthog = usePostHog();
  const trackEvent = useTrackEvent();

  const trackConversion = useCallback(
    (type: ConversionType, properties?: ConversionProperties) => {
      const firstTouch = getStoredAttribution(FIRST_TOUCH_KEY);
      const lastTouch = getStoredAttribution(LAST_TOUCH_KEY);

      const eventMap: Record<ConversionType, string> = {
        booking_completed: POSTHOG_EVENTS.BOOKING_COMPLETED,
        contact_form_submitted: POSTHOG_EVENTS.CONTACT_FORM_SUBMIT,
        payment_completed: POSTHOG_EVENTS.PAYMENT_SUCCESS,
        lead_captured: POSTHOG_EVENTS.LEAD_CAPTURED,
      };

      const conversionData = {
        conversion_type: type,
        conversion_timestamp: new Date().toISOString(),

        first_touch_source: firstTouch?.utm_source,
        first_touch_medium: firstTouch?.utm_medium,
        first_touch_campaign: firstTouch?.utm_campaign,
        first_touch_landing_page: firstTouch?.landing_page,

        last_touch_source: lastTouch?.utm_source,
        last_touch_medium: lastTouch?.utm_medium,
        last_touch_campaign: lastTouch?.utm_campaign,
        last_touch_referrer: lastTouch?.referrer,

        ...properties,
      };

      trackEvent(eventMap[type], conversionData);

      posthog?.capture("$set", {
        $set: {
          has_converted: true,
          last_conversion_type: type,
          last_conversion_date: new Date().toISOString(),
        },
      });

      posthog?.capture("$set_once", {
        $set_once: {
          first_conversion_type: type,
          first_conversion_date: new Date().toISOString(),
        },
      });
    },
    [posthog, trackEvent]
  );

  const trackBookingCompleted = useCallback(
    (bookingType: "strategy" | "crm", additionalProps?: Record<string, unknown>) => {
      trackConversion("booking_completed", {
        booking_type: bookingType,
        conversion_source: bookingType === "strategy" ? "book_page" : "book_crm_page",
        ...additionalProps,
      });
    },
    [trackConversion]
  );

  const trackPaymentCompleted = useCallback(
    (value?: number, currency?: string, additionalProps?: Record<string, unknown>) => {
      trackConversion("payment_completed", {
        value,
        currency: currency || "USD",
        ...additionalProps,
      });
    },
    [trackConversion]
  );

  return {
    trackConversion,
    trackBookingCompleted,
    trackPaymentCompleted,
  };
}
