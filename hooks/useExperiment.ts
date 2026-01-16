"use client";

import { useEffect, useState, useCallback, useRef } from "react";
import { usePostHog } from "posthog-js/react";
import { useTrackEvent } from "./useTrackEvent";
import { POSTHOG_EVENTS } from "@/lib/posthog-events";

interface UseExperimentResult<T> {
  variant: T;
  isLoading: boolean;
  trackConversion: (
    conversionType?: string,
    properties?: Record<string, unknown>
  ) => void;
}

export function useExperiment<T extends string>(
  experimentKey: string,
  defaultVariant: T
): UseExperimentResult<T> {
  const posthog = usePostHog();
  const trackEvent = useTrackEvent();
  const [variant, setVariant] = useState<T>(defaultVariant);
  const [isLoading, setIsLoading] = useState(true);
  const hasTrackedExposure = useRef(false);

  useEffect(() => {
    if (!posthog) {
      setIsLoading(false);
      return;
    }

    const checkFlag = () => {
      const flagValue = posthog.getFeatureFlag(experimentKey);

      if (flagValue !== undefined && flagValue !== null) {
        setVariant(flagValue as T);
        setIsLoading(false);

        if (!hasTrackedExposure.current) {
          hasTrackedExposure.current = true;
          trackEvent(POSTHOG_EVENTS.EXPERIMENT_VIEWED, {
            experiment_key: experimentKey,
            variant: flagValue,
          });
        }
      }
    };

    checkFlag();

    posthog.onFeatureFlags(() => {
      checkFlag();
    });
  }, [posthog, experimentKey, trackEvent]);

  const trackConversion = useCallback(
    (conversionType?: string, properties?: Record<string, unknown>) => {
      trackEvent(POSTHOG_EVENTS.EXPERIMENT_CONVERTED, {
        experiment_key: experimentKey,
        variant,
        conversion_type: conversionType || "default",
        ...properties,
      });
    },
    [experimentKey, variant, trackEvent]
  );

  return { variant, isLoading, trackConversion };
}

export function useMultipleExperiments<T extends Record<string, string>>(
  experiments: { [K in keyof T]: { key: string; defaultVariant: T[K] } }
): {
  variants: T;
  isLoading: boolean;
  trackConversion: (
    experimentKey: keyof T,
    conversionType?: string,
    properties?: Record<string, unknown>
  ) => void;
} {
  const posthog = usePostHog();
  const trackEvent = useTrackEvent();
  const [variants, setVariants] = useState<T>(() => {
    const initial = {} as T;
    for (const key in experiments) {
      initial[key] = experiments[key].defaultVariant;
    }
    return initial;
  });
  const [isLoading, setIsLoading] = useState(true);
  const trackedExposures = useRef<Set<string>>(new Set());

  useEffect(() => {
    if (!posthog) {
      setIsLoading(false);
      return;
    }

    const checkFlags = () => {
      const newVariants = { ...variants };
      let hasChanges = false;

      for (const key in experiments) {
        const { key: flagKey } = experiments[key];
        const flagValue = posthog.getFeatureFlag(flagKey);

        if (flagValue !== undefined && flagValue !== null) {
          newVariants[key] = flagValue as T[typeof key];
          hasChanges = true;

          if (!trackedExposures.current.has(flagKey)) {
            trackedExposures.current.add(flagKey);
            trackEvent(POSTHOG_EVENTS.EXPERIMENT_VIEWED, {
              experiment_key: flagKey,
              variant: flagValue,
            });
          }
        }
      }

      if (hasChanges) {
        setVariants(newVariants);
      }
      setIsLoading(false);
    };

    checkFlags();

    posthog.onFeatureFlags(() => {
      checkFlags();
    });
  }, [posthog, experiments, trackEvent, variants]);

  const trackConversion = useCallback(
    (
      experimentKey: keyof T,
      conversionType?: string,
      properties?: Record<string, unknown>
    ) => {
      const experiment = experiments[experimentKey];
      trackEvent(POSTHOG_EVENTS.EXPERIMENT_CONVERTED, {
        experiment_key: experiment.key,
        variant: variants[experimentKey],
        conversion_type: conversionType || "default",
        ...properties,
      });
    },
    [experiments, variants, trackEvent]
  );

  return { variants, isLoading, trackConversion };
}
