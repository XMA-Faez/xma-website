"use client";

import { useRef, useCallback } from "react";
import { useTrackEvent } from "./useTrackEvent";
import { POSTHOG_EVENTS } from "@/lib/posthog-events";

interface VideoTrackingOptions {
  videoTitle?: string;
  videoUrl: string;
  trackingLocation?: string;
}

export function useVideoTracking(options: VideoTrackingOptions) {
  const trackEvent = useTrackEvent();
  const progressTracked = useRef(new Set<number>());
  const videoDuration = useRef<number>(0);

  const trackVideoPlay = useCallback((currentTime: number = 0) => {
    trackEvent(POSTHOG_EVENTS.VIDEO_PLAY, {
      video_title: options.videoTitle,
      video_url: options.videoUrl,
      video_current_time: currentTime,
      video_duration: videoDuration.current,
      tracking_location: options.trackingLocation,
    });
  }, [trackEvent, options]);

  const trackVideoPause = useCallback((currentTime: number) => {
    trackEvent(POSTHOG_EVENTS.VIDEO_PAUSE, {
      video_title: options.videoTitle,
      video_url: options.videoUrl,
      video_current_time: currentTime,
      video_duration: videoDuration.current,
      completion_percentage: videoDuration.current ? (currentTime / videoDuration.current) * 100 : 0,
      tracking_location: options.trackingLocation,
    });
  }, [trackEvent, options]);

  const trackVideoProgress = useCallback((currentTime: number, duration: number) => {
    videoDuration.current = duration;
    const percentage = Math.floor((currentTime / duration) * 100);
    
    // Track at 25%, 50%, 75%, and 100% completion
    const milestones = [25, 50, 75, 100];
    
    milestones.forEach(milestone => {
      if (percentage >= milestone && !progressTracked.current.has(milestone)) {
        progressTracked.current.add(milestone);
        
        trackEvent(POSTHOG_EVENTS.VIDEO_COMPLETE, {
          video_title: options.videoTitle,
          video_url: options.videoUrl,
          video_current_time: currentTime,
          video_duration: duration,
          completion_percentage: milestone,
          tracking_location: options.trackingLocation,
        });
      }
    });
  }, [trackEvent, options]);

  const resetTracking = useCallback(() => {
    progressTracked.current.clear();
  }, []);

  return {
    trackVideoPlay,
    trackVideoPause,
    trackVideoProgress,
    resetTracking,
  };
}