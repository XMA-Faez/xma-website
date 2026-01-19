# PostHog Dashboard Setup Guide

This guide provides the complete configuration for setting up analytics dashboards in PostHog for the XMA website.

## Dashboard Overview

| Dashboard | Purpose | Priority |
|-----------|---------|----------|
| Executive Overview | High-level business metrics | ⭐ High |
| Lead Generation | Form & contact metrics | ⭐ High |
| Engagement & Content | User behavior | Medium |
| Attribution & Marketing | Traffic sources | Medium |
| A/B Testing | Experiment results | Medium |

---

## 1. Executive Overview Dashboard

**Description**: High-level business metrics: traffic, engagement, leads, and performance

### Insight 1.1: Daily Active Users
- **Type**: Trends
- **Event**: `$pageview`
- **Math**: Unique users (DAU)
- **Date range**: Last 30 days
- **Display**: Line graph

### Insight 1.2: Weekly Traffic by Page
- **Type**: Trends
- **Event**: `$pageview`
- **Math**: Total count
- **Breakdown**: `$pathname`
- **Date range**: Last 7 days
- **Display**: Table

### Insight 1.3: Total Leads
- **Type**: Trends
- **Event**: `lead_form_submitted`
- **Math**: Total count
- **Date range**: Last 30 days
- **Display**: Bold number

### Insight 1.4: Web Vitals - LCP
- **Type**: Trends
- **Event**: `web_vital_measured`
- **Filter**: `metric_name` = `LCP`
- **Math**: Average of `value`
- **Date range**: Last 7 days
- **Display**: Line graph

### Insight 1.5: Traffic Sources
- **Type**: Trends
- **Event**: `$pageview`
- **Math**: Unique users
- **Breakdown**: `$referring_domain`
- **Date range**: Last 14 days
- **Display**: Pie chart

### Insight 1.6: Exceptions/Errors
- **Type**: Trends
- **Event**: `$exception`
- **Math**: Total count
- **Date range**: Last 7 days
- **Display**: Line graph

---

## 2. Lead Generation Dashboard

**Description**: Lead form performance and contact engagement metrics

### Insight 2.1: Lead Form Submissions Over Time
- **Type**: Trends
- **Event**: `lead_form_submitted`
- **Math**: Total count
- **Date range**: Last 30 days
- **Display**: Line graph

### Insight 2.2: Total Leads (Bold Number)
- **Type**: Trends
- **Event**: `lead_form_submitted`
- **Math**: Total count
- **Date range**: Last 30 days
- **Display**: Bold number

### Insight 2.3: Leads by Source
- **Type**: Trends
- **Event**: `lead_form_submitted`
- **Math**: Total count
- **Breakdown**: `source`
- **Date range**: Last 30 days
- **Display**: Bar chart

### Insight 2.4: Leads by Form Variant
- **Type**: Trends
- **Event**: `lead_form_submitted`
- **Math**: Total count
- **Breakdown**: `form_variant`
- **Date range**: Last 30 days
- **Display**: Pie chart

### Insight 2.5: Contact Method Clicks
- **Type**: Trends
- **Event**: `contact_method_click`
- **Math**: Total count
- **Breakdown**: `contact_method` (phone, email, whatsapp)
- **Date range**: Last 30 days
- **Display**: Pie chart

### Insight 2.6: Weekly Lead Trend
- **Type**: Trends
- **Event**: `lead_form_submitted`
- **Math**: Total count
- **Date range**: Last 12 weeks
- **Interval**: Week
- **Display**: Bar chart

---

## 3. Engagement & Content Dashboard

**Description**: User engagement metrics: scroll depth, time on page, content interaction

### Insight 3.1: Scroll Depth Distribution
- **Type**: Trends
- **Event**: `scroll_depth`
- **Math**: Unique users
- **Breakdown**: `depth_percentage` (25, 50, 75, 100)
- **Date range**: Last 7 days
- **Display**: Bar chart

### Insight 3.2: Average Time on Page
- **Type**: Trends
- **Event**: `time_on_page`
- **Math**: Average of `duration_seconds`
- **Breakdown**: `page_path`
- **Date range**: Last 7 days
- **Display**: Table

### Insight 3.3: Page Exit Points
- **Type**: Trends
- **Event**: `page_exit`
- **Math**: Total count
- **Breakdown**: `page_path`
- **Date range**: Last 7 days
- **Display**: Table

### Insight 3.4: CTA Button Clicks
- **Type**: Trends
- **Event**: `cta_button_click`
- **Math**: Total count
- **Breakdown**: `button_text`
- **Date range**: Last 30 days
- **Display**: Bar chart

### Insight 3.5: CTA Clicks by Location
- **Type**: Trends
- **Event**: `cta_button_click`
- **Math**: Total count
- **Breakdown**: `button_location`
- **Date range**: Last 30 days
- **Display**: Pie chart

### Insight 3.6: Users Reaching 100% Scroll
- **Type**: Trends
- **Event**: `scroll_depth`
- **Filter**: `depth_percentage` = 100
- **Math**: Unique users
- **Date range**: Last 30 days
- **Display**: Line graph

---

## 4. Attribution & Marketing Dashboard

**Description**: UTM tracking, traffic sources, and marketing campaign performance

### Insight 4.1: Leads by First Touch Source
- **Type**: Trends
- **Event**: `lead_form_submitted`
- **Math**: Total count
- **Breakdown**: Person property `$initial_utm_source`
- **Date range**: Last 30 days
- **Display**: Bar chart

### Insight 4.2: Landing Page Performance
- **Type**: Trends
- **Event**: `landing_page_view`
- **Math**: Unique users
- **Breakdown**: `landing_page`
- **Date range**: Last 30 days
- **Display**: Table

### Insight 4.3: Traffic by UTM Campaign
- **Type**: Trends
- **Event**: `$pageview`
- **Math**: Unique users
- **Breakdown**: `utm_campaign`
- **Date range**: Last 30 days
- **Display**: Bar chart

### Insight 4.4: Attribution Captured Events
- **Type**: Trends
- **Event**: `attribution_captured`
- **Math**: Total count
- **Breakdown**: `traffic_source`
- **Date range**: Last 30 days
- **Display**: Pie chart

### Insight 4.5: First Visit to Lead Funnel
- **Type**: Funnel
- **Steps**:
  1. `landing_page_view` - "First Visit"
  2. `lead_form_submitted` - "Lead Submitted"
- **Conversion window**: 30 days
- **Breakdown**: `traffic_source`
- **Display**: Funnel with breakdown

### Insight 4.6: Header Navigation Clicks
- **Type**: Trends
- **Event**: `header_navigation_click`
- **Math**: Total count
- **Breakdown**: `link_text`
- **Date range**: Last 30 days
- **Display**: Bar chart

---

## 5. A/B Testing Dashboard

**Description**: Experiment results for hero CTA and headline variants

### Insight 5.1: Hero CTA Experiment - Exposures
- **Type**: Trends
- **Event**: `experiment_viewed`
- **Filter**: `experiment_key` = `hero_cta_variant`
- **Math**: Unique users
- **Breakdown**: `variant`
- **Date range**: Last 30 days
- **Display**: Bar chart

### Insight 5.2: Hero CTA Experiment - Conversions
- **Type**: Trends
- **Event**: `experiment_converted`
- **Filter**: `experiment_key` = `hero_cta_variant`
- **Math**: Unique users
- **Breakdown**: `variant`
- **Date range**: Last 30 days
- **Display**: Bar chart

### Insight 5.3: Hero CTA Conversion Funnel by Variant
- **Type**: Funnel
- **Steps**:
  1. `experiment_viewed` (filter: `experiment_key` = `hero_cta_variant`)
  2. `experiment_converted` (filter: `experiment_key` = `hero_cta_variant`)
- **Breakdown**: `variant`
- **Display**: Funnel

### Insight 5.4: Hero Headline Experiment - Exposures
- **Type**: Trends
- **Event**: `experiment_viewed`
- **Filter**: `experiment_key` = `hero_headline_variant`
- **Math**: Unique users
- **Breakdown**: `variant`
- **Date range**: Last 30 days
- **Display**: Bar chart

### Insight 5.5: Hero Headline Experiment - Conversions
- **Type**: Trends
- **Event**: `experiment_converted`
- **Filter**: `experiment_key` = `hero_headline_variant`
- **Math**: Unique users
- **Breakdown**: `variant`
- **Date range**: Last 30 days
- **Display**: Bar chart

### Insight 5.6: Overall Experiment Performance
- **Type**: Trends
- **Event**: `experiment_converted`
- **Math**: Unique users
- **Breakdown**: `experiment_key`
- **Date range**: Last 30 days
- **Display**: Table

---

## Quick Setup Checklist

### In PostHog UI:

1. **Create Dashboards**
   - [ ] Executive Overview (pin to home)
   - [ ] Lead Generation (pin to home)
   - [ ] Engagement & Content
   - [ ] Attribution & Marketing
   - [ ] A/B Testing

2. **Create Insights**
   - [ ] Use "New Insight" button
   - [ ] Configure as specified above
   - [ ] Save to appropriate dashboard

3. **Set Up Feature Flags** (for A/B Testing)
   - [ ] `hero_cta_variant` with variants: control, urgency, benefit, social_proof
   - [ ] `hero_headline_variant` with variants: control, problem_focused, outcome_focused, question

4. **Create Cohorts** (optional but recommended)
   - [ ] "Lead Submitters" - users who triggered `lead_form_submitted`
   - [ ] "Engaged Non-Converters" - users with 75%+ scroll depth but no lead submitted

---

## Event Reference

These are the custom events defined in `lib/posthog-events.ts`:

| Event | Description |
|-------|-------------|
| `header_navigation_click` | User clicked a navigation link in header |
| `cta_button_click` | User clicked a CTA button |
| `contact_method_click` | User clicked phone/email/whatsapp |
| `lead_form_submitted` | Lead form was submitted |
| `scroll_depth` | User scrolled to 25%, 50%, 75%, or 100% |
| `time_on_page` | Periodic time tracking (every 30s) |
| `page_exit` | User left the page |
| `landing_page_view` | First page view in session |
| `attribution_captured` | UTM parameters were captured |
| `experiment_viewed` | User was exposed to an experiment |
| `experiment_converted` | User converted in an experiment |

---

## Notes

- **Events may not appear until triggered**: If you don't see events in PostHog, ensure the website is deployed and users are interacting with it
- **Test in development**: Events are disabled in development mode by default. To test, temporarily remove the `opt_out_capturing_by_default` setting in PostHogProvider
- **Person properties**: Attribution data is stored on person properties (`$initial_utm_*` and `$current_utm_*`) for targeting
