"use client";

import { useEffect, useRef, useCallback } from "react";
import { useTrackEvent } from "./useTrackEvent";
import { POSTHOG_EVENTS } from "@/lib/posthog-events";

type BookingType = "strategy" | "crm";

interface UseBookingTrackingOptions {
  bookingType: BookingType;
  engagementThresholdSeconds?: number;
  highEngagementThresholdSeconds?: number;
}

export function useBookingTracking({
  bookingType,
  engagementThresholdSeconds = 30,
  highEngagementThresholdSeconds = 120,
}: UseBookingTrackingOptions) {
  const trackEvent = useTrackEvent();
  const hasTrackedPageView = useRef(false);
  const hasTrackedEngagement = useRef(false);
  const hasTrackedHighEngagement = useRef(false);
  const startTime = useRef<number>(Date.now());

  useEffect(() => {
    if (!hasTrackedPageView.current) {
      hasTrackedPageView.current = true;
      startTime.current = Date.now();

      trackEvent(POSTHOG_EVENTS.BOOKING_PAGE_VIEW, {
        booking_type: bookingType,
        conversion_source: bookingType === "strategy" ? "book_page" : "book_crm_page",
      });
    }
  }, [bookingType, trackEvent]);

  useEffect(() => {
    const engagementTimer = setTimeout(() => {
      if (!hasTrackedEngagement.current) {
        hasTrackedEngagement.current = true;
        trackEvent(POSTHOG_EVENTS.BOOKING_WIDGET_INTERACTION, {
          booking_type: bookingType,
          action: "engaged",
          engagement_threshold_seconds: engagementThresholdSeconds,
          time_on_booking_page: Math.floor((Date.now() - startTime.current) / 1000),
        });
      }
    }, engagementThresholdSeconds * 1000);

    const highEngagementTimer = setTimeout(() => {
      if (!hasTrackedHighEngagement.current) {
        hasTrackedHighEngagement.current = true;
        trackEvent(POSTHOG_EVENTS.HIGH_ENGAGEMENT_SESSION, {
          booking_type: bookingType,
          engagement_threshold_seconds: highEngagementThresholdSeconds,
          time_on_booking_page: Math.floor((Date.now() - startTime.current) / 1000),
          likely_completing_form: true,
        });
      }
    }, highEngagementThresholdSeconds * 1000);

    return () => {
      clearTimeout(engagementTimer);
      clearTimeout(highEngagementTimer);
    };
  }, [
    bookingType,
    engagementThresholdSeconds,
    highEngagementThresholdSeconds,
    trackEvent,
  ]);

  useEffect(() => {
    const handleBeforeUnload = () => {
      const timeOnPage = Math.floor((Date.now() - startTime.current) / 1000);

      if (!hasTrackedHighEngagement.current) {
        trackEvent(POSTHOG_EVENTS.BOOKING_ABANDONED, {
          booking_type: bookingType,
          time_on_booking_page: timeOnPage,
          reached_engagement_threshold: hasTrackedEngagement.current,
        });
      }
    };

    window.addEventListener("beforeunload", handleBeforeUnload);
    return () => window.removeEventListener("beforeunload", handleBeforeUnload);
  }, [bookingType, trackEvent]);

  const trackWidgetInteraction = useCallback(
    (action: string, additionalProps?: Record<string, unknown>) => {
      trackEvent(POSTHOG_EVENTS.BOOKING_WIDGET_INTERACTION, {
        booking_type: bookingType,
        action,
        time_on_booking_page: Math.floor((Date.now() - startTime.current) / 1000),
        ...additionalProps,
      });
    },
    [bookingType, trackEvent]
  );

  return {
    trackWidgetInteraction,
    getTimeOnPage: () => Math.floor((Date.now() - startTime.current) / 1000),
  };
}
