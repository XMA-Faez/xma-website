"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { useTrackEvent } from "@/hooks/useTrackEvent";
import { useScrollDepthTracking } from "@/hooks/useScrollDepthTracking";
import { useTimeOnPage } from "@/hooks/useTimeOnPage";
import { POSTHOG_EVENTS } from "@/lib/posthog-events";

interface BlogTrackerProps {
  postTitle?: string;
  postSlug?: string;
  postCategory?: string;
  postTags?: string[];
}

export function BlogTracker({ postTitle, postSlug, postCategory, postTags }: BlogTrackerProps) {
  const trackEvent = useTrackEvent();
  const pathname = usePathname();
  
  // Enable scroll depth tracking
  useScrollDepthTracking();
  
  // Enable time on page tracking
  useTimeOnPage();
  
  useEffect(() => {
    if (postSlug) {
      // Track individual blog post view
      trackEvent(POSTHOG_EVENTS.BLOG_POST_VIEW, {
        post_title: postTitle,
        post_slug: postSlug,
        post_category: postCategory,
        post_tags: postTags,
        post_path: pathname,
      });
    }
  }, [postTitle, postSlug, postCategory, postTags, pathname, trackEvent]);
  
  return null;
}

// Hook for tracking blog interactions
export function useBlogTracking() {
  const trackEvent = useTrackEvent();
  
  const trackCategoryFilter = (category: string) => {
    trackEvent(POSTHOG_EVENTS.BLOG_CATEGORY_FILTER, {
      category_selected: category,
    });
  };
  
  const trackSearch = (searchQuery: string) => {
    trackEvent(POSTHOG_EVENTS.BLOG_SEARCH, {
      search_query: searchQuery,
      search_length: searchQuery.length,
    });
  };
  
  const trackRelatedPostClick = (postTitle: string, postSlug: string, fromPost?: string) => {
    trackEvent(POSTHOG_EVENTS.RELATED_POST_CLICK, {
      post_title: postTitle,
      post_slug: postSlug,
      from_post: fromPost,
    });
  };
  
  return {
    trackCategoryFilter,
    trackSearch,
    trackRelatedPostClick,
  };
}