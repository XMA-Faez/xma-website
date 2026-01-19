export const POSTHOG_EVENTS = {
  // Navigation Events
  HEADER_NAV_CLICK: "header_navigation_click",

  // CTA & Conversion Events
  CTA_CLICK: "cta_button_click",
  CONTACT_METHOD_CLICK: "contact_method_click",

  // Lead Events
  LEAD_FORM_SUBMITTED: "lead_form_submitted",

  // Engagement Events
  SCROLL_DEPTH: "scroll_depth",
  TIME_ON_PAGE: "time_on_page",
  PAGE_EXIT: "page_exit",

  // Attribution Events
  LANDING_PAGE_VIEW: "landing_page_view",
  ATTRIBUTION_CAPTURED: "attribution_captured",

  // Experiment Events
  EXPERIMENT_VIEWED: "experiment_viewed",
  EXPERIMENT_CONVERTED: "experiment_converted",
} as const;

export type EventName = (typeof POSTHOG_EVENTS)[keyof typeof POSTHOG_EVENTS];

export interface BaseEventProperties {
  page_path: string;
  page_title?: string;
  timestamp: string;
  session_id?: string;
  referrer?: string;
}

export interface CTAEventProperties extends BaseEventProperties {
  button_text: string;
  button_location: string;
  button_variant?: string;
  destination_url?: string;
}

export interface NavigationEventProperties extends BaseEventProperties {
  link_text: string;
  link_url: string;
  navigation_section: "header" | "footer" | "mobile_menu";
}

export interface ScrollDepthProperties extends BaseEventProperties {
  depth_percentage: 25 | 50 | 75 | 100;
  pixel_depth: number;
  page_height: number;
}

export interface AttributionData {
  utm_source?: string;
  utm_medium?: string;
  utm_campaign?: string;
  utm_term?: string;
  utm_content?: string;
  referrer?: string;
  referrer_domain?: string;
  landing_page?: string;
  first_visit_timestamp?: string;
  attribution_type: "first_touch" | "last_touch";
}

export interface AttributionEventProperties extends BaseEventProperties {
  landing_page: string;
  traffic_source: string;
  utm_source?: string;
  utm_medium?: string;
  utm_campaign?: string;
  utm_term?: string;
  utm_content?: string;
  referrer?: string;
  referrer_domain?: string;
  is_first_session?: boolean;
}

export interface ExperimentEventProperties extends BaseEventProperties {
  experiment_key: string;
  variant: string;
  conversion_type?: string;
}

export interface LeadFormEventProperties extends BaseEventProperties {
  source: string;
  form_variant?: string;
  has_company?: boolean;
  has_message?: boolean;
}
