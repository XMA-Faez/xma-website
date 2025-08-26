export const POSTHOG_EVENTS = {
  // Navigation Events
  HEADER_NAV_CLICK: "header_navigation_click",
  FOOTER_LINK_CLICK: "footer_link_click",
  MOBILE_MENU_TOGGLE: "mobile_menu_toggle",
  
  // CTA & Conversion Events  
  CTA_CLICK: "cta_button_click",
  BOOK_DEMO_CLICK: "book_demo_click",
  CONTACT_FORM_SUBMIT: "contact_form_submit",
  CONTACT_METHOD_CLICK: "contact_method_click",
  
  // Service Events
  SERVICE_VIEW: "service_page_view",
  SERVICE_FEATURE_INTERACT: "service_feature_interaction",
  PRICING_VIEW: "pricing_section_view",
  FAQ_EXPAND: "faq_expand",
  
  // Blog Events
  BLOG_POST_VIEW: "blog_post_view",
  BLOG_CATEGORY_FILTER: "blog_category_filter", 
  BLOG_SEARCH: "blog_search",
  RELATED_POST_CLICK: "related_post_click",
  
  // Portfolio Events
  PORTFOLIO_VIEW: "portfolio_page_view",
  PORTFOLIO_ITEM_CLICK: "portfolio_item_click",
  PORTFOLIO_FILTER: "portfolio_filter",
  
  // Video & Media Events
  VIDEO_PLAY: "video_play",
  VIDEO_PAUSE: "video_pause",
  VIDEO_COMPLETE: "video_completion",
  IMAGE_GALLERY_INTERACT: "image_gallery_interaction",
  
  // Form Events
  FORM_START: "form_start",
  FORM_FIELD_COMPLETE: "form_field_complete",
  FORM_ABANDON: "form_abandon",
  LEAD_CAPTURED: "lead_captured",
  
  // Payment Events
  CHECKOUT_STARTED: "checkout_started",
  PAYMENT_SUCCESS: "payment_success",
  PAYMENT_FAILED: "payment_failed",
  
  // Engagement Events
  SCROLL_DEPTH: "scroll_depth",
  TIME_ON_PAGE: "time_on_page",
  PAGE_EXIT: "page_exit",
} as const;

export type EventName = typeof POSTHOG_EVENTS[keyof typeof POSTHOG_EVENTS];

// Event property types for consistency
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

export interface FormEventProperties extends BaseEventProperties {
  form_name: string;
  field_name?: string;
  form_step?: number;
  total_steps?: number;
}

export interface VideoEventProperties extends BaseEventProperties {
  video_title?: string;
  video_url: string;
  video_duration?: number;
  video_current_time?: number;
  completion_percentage?: number;
}

export interface ScrollDepthProperties extends BaseEventProperties {
  depth_percentage: 25 | 50 | 75 | 100;
  pixel_depth: number;
  page_height: number;
}

export interface ServiceEventProperties extends BaseEventProperties {
  service_name: string;
  service_category?: string;
  interaction_type?: string;
}

export interface BlogEventProperties extends BaseEventProperties {
  post_title?: string;
  post_slug?: string;
  post_category?: string;
  post_tags?: string[];
  search_query?: string;
}

export interface PortfolioEventProperties extends BaseEventProperties {
  item_title?: string;
  item_category?: string;
  filter_value?: string;
}