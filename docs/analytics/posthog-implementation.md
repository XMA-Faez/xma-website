# PostHog Analytics Implementation

## Overview

This document describes the analytics implementation using PostHog for lead tracking, attribution, and A/B testing.

## Excluded Pages

The following pages are excluded from PostHog analytics tracking:

- `/studio` and all sub-routes (Sanity CMS)

This is implemented in:
- `components/providers/PostHogProvider.tsx` - pageview tracking
- `hooks/useTrackEvent.ts` - all custom event tracking
- `hooks/useAttribution.ts` - attribution tracking

## Architecture

```
GlobalAnalyticsProvider
├── useScrollDepthTracking()     # Automatic scroll depth tracking
├── useTimeOnPage()              # Automatic time-on-page tracking
├── useAttribution()             # UTM/referrer capture
└── AttributionProvider          # Session-level attribution events
```

## Event Categories

### Navigation Events
| Event | Trigger | Key Properties |
|-------|---------|----------------|
| `header_navigation_click` | Header nav link clicked | `link_text`, `link_url`, `navigation_section` |

### CTA & Lead Events
| Event | Trigger | Key Properties |
|-------|---------|----------------|
| `cta_button_click` | CTA button clicked | `button_text`, `button_location`, `button_variant` |
| `contact_method_click` | Phone/email/WhatsApp clicked | `contact_method`, `page_path` |
| `lead_form_submitted` | Lead form submitted | `source`, `form_variant`, `has_company`, `has_message` |

### Engagement Events
| Event | Trigger | Key Properties |
|-------|---------|----------------|
| `scroll_depth` | Scroll thresholds reached | `depth_percentage`, `pixel_depth`, `page_height` |
| `time_on_page` | Periodic (every 30s) | `duration_seconds`, `page_path` |
| `page_exit` | User leaves page | `exit_type`, `duration_seconds` |

### Attribution Events
| Event | Trigger | Key Properties |
|-------|---------|----------------|
| `landing_page_view` | New session starts | `landing_page`, `traffic_source`, `utm_*`, `is_first_session` |
| `attribution_captured` | UTM params detected | `utm_source`, `utm_medium`, `utm_campaign` |

### Experiment Events
| Event | Trigger | Key Properties |
|-------|---------|----------------|
| `experiment_viewed` | User exposed to variant | `experiment_key`, `variant` |
| `experiment_converted` | User converts after seeing variant | `experiment_key`, `variant`, `conversion_type` |

## Hooks Reference

### `useTrackEvent()`
Base hook for firing custom events with automatic page context.

```tsx
import { useTrackEvent } from "@/hooks/useTrackEvent";
import { POSTHOG_EVENTS } from "@/lib/posthog-events";

const trackEvent = useTrackEvent();

trackEvent(POSTHOG_EVENTS.CTA_CLICK, {
  button_text: "Book a Call",
  button_location: "hero",
});
```

### `useAttribution()`
Captures and persists UTM parameters and referrer data.

```tsx
import { useAttribution } from "@/hooks/useAttribution";

const { getFirstTouchAttribution, getLastTouchAttribution } = useAttribution();
```

**Storage Keys:**
- `xma_first_touch_attribution` - First visit attribution (never overwritten)
- `xma_attribution` - Last touch attribution (updated each session)

### `useExperiment(key, defaultVariant)`
A/B testing with PostHog feature flags.

```tsx
import { useExperiment } from "@/hooks/useExperiment";

const { variant, isLoading, trackConversion } = useExperiment("hero_cta_variant", "control");

if (isLoading) return <LoadingState />;

// Render based on variant
// Call trackConversion() when user converts
```

## Experiment Components

### `<CTAExperiment />`
A/B test CTA button copy.

```tsx
import { CTAExperiment } from "@/components/experiments";

<CTAExperiment
  location="hero"
  href="/book"
  showSubtext={true}
  color="white"
  size="sm"
/>
```

**Variants (configure in PostHog as `hero_cta_variant`):**
- `control`: "Book a Strategy Call"
- `urgency`: "Book Your Free Call Today"
- `benefit`: "Get Your Custom Growth Plan"
- `social_proof`: "Join 50+ Luxury Brands"

### `<HeadlineExperiment />`
A/B test headline messaging.

```tsx
import { HeadlineExperiment } from "@/components/experiments";

<HeadlineExperiment
  mainClassName="heading-hero"
  subClassName="text-lg text-gray-400"
/>
```

**Variants (configure in PostHog as `hero_headline_variant`):**
- `control`: "Turn Luxury Car Inquiries Into Confirmed Bookings"
- `problem_focused`: "Stop Losing Bookings to Slow Follow-Up"
- `outcome_focused`: "3x Your Booking Rate in 90 Days"
- `question`: "What If Every Inquiry Became a Booking?"

## PostHog Dashboard Setup

> **📊 Full Dashboard Guide**: See [posthog-dashboard-setup.md](./posthog-dashboard-setup.md) for complete dashboard configurations with insights across 5 dashboards.

### Recommended Dashboards

| Dashboard | Purpose |
|-----------|---------|
| **Executive Overview** | DAUs, traffic, leads, web vitals |
| **Lead Generation** | Form performance and leads |
| **Engagement & Content** | Scroll depth, time on page |
| **Attribution & Marketing** | UTM tracking, traffic sources |
| **A/B Testing** | Experiment results |

### Funnels to Create

**1. Engagement to Lead**
```
$pageview → scroll_depth (≥50%) → cta_button_click → lead_form_submitted
```

**2. Landing to Lead**
```
landing_page_view → lead_form_submitted
```

### Cohorts to Define

1. **Engaged Non-Converters**
   - `scroll_depth` >= 75% AND `time_on_page` >= 60s AND no `lead_form_submitted`

2. **Paid Traffic**
   - `$current_utm_medium` = "cpc" OR `$current_utm_medium` = "paid"

3. **Lead Submitters**
   - `lead_form_submitted` in last 30 days

### Feature Flags to Configure

| Flag Key | Type | Variants |
|----------|------|----------|
| `hero_cta_variant` | Multivariate | control, urgency, benefit, social_proof |
| `hero_headline_variant` | Multivariate | control, problem_focused, outcome_focused, question |

## Testing

### Attribution Testing
1. Visit: `https://yoursite.com?utm_source=test&utm_medium=cpc&utm_campaign=launch`
2. Open DevTools → Application → Local Storage
3. Verify `xma_first_touch_attribution` and `xma_attribution` keys exist
4. Check PostHog for `landing_page_view` event with UTM data

### Experiment Testing
1. Enable feature flag in PostHog dashboard
2. Visit page with experiment component
3. Verify `experiment_viewed` event fires
4. Click the CTA
5. Verify `experiment_converted` event fires with correct variant

## Traffic Source Classification

The `classifyTrafficSource()` function categorizes referrers:

| Referrer Contains | Traffic Source |
|-------------------|----------------|
| google | google_organic |
| bing | bing_organic |
| facebook, fb.com | facebook |
| instagram | instagram |
| linkedin | linkedin |
| twitter, x.com | twitter |
| youtube | youtube |
| tiktok | tiktok |
| (no referrer) | direct |
| (other) | hostname |
