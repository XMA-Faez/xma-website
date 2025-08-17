export const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;
export const GTM_ID = process.env.NEXT_PUBLIC_GTM_ID;
export const GOOGLE_ADS_ID = process.env.NEXT_PUBLIC_GOOGLE_ADS_ID;

// Conversion event types
export type ConversionEvent = 
  | 'contact_form'
  | 'booking'
  | 'signup'
  | 'purchase'
  | 'lead'
  | 'phone_call';

// Conversion labels mapping
export const CONVERSION_LABELS: Record<ConversionEvent, string | undefined> = {
  contact_form: process.env.NEXT_PUBLIC_GOOGLE_ADS_CONVERSION_LABEL_CONTACT,
  booking: process.env.NEXT_PUBLIC_GOOGLE_ADS_CONVERSION_LABEL_BOOKING,
  signup: process.env.NEXT_PUBLIC_GOOGLE_ADS_CONVERSION_LABEL_SIGNUP,
  purchase: process.env.NEXT_PUBLIC_GOOGLE_ADS_CONVERSION_LABEL_PURCHASE,
  lead: process.env.NEXT_PUBLIC_GOOGLE_ADS_CONVERSION_LABEL_LEAD,
  phone_call: process.env.NEXT_PUBLIC_GOOGLE_ADS_CONVERSION_LABEL_PHONE,
};

// Send pageview to Google Analytics
export const pageview = (url: string) => {
  if (typeof window !== 'undefined' && window.gtag && GA_MEASUREMENT_ID) {
    window.gtag('config', GA_MEASUREMENT_ID, {
      page_path: url,
    });
  }
};

// Send custom events to Google Analytics
export const event = ({ action, category, label, value }: {
  action: string;
  category: string;
  label?: string;
  value?: number;
}) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', action, {
      event_category: category,
      event_label: label,
      value: value,
    });
  }
};

// Send conversion event to Google Ads
export const sendConversion = (
  conversionType: ConversionEvent,
  value?: number,
  currency: string = 'USD'
) => {
  const conversionLabel = CONVERSION_LABELS[conversionType];
  
  if (!conversionLabel || !GOOGLE_ADS_ID) {
    console.warn(`Conversion tracking not configured for: ${conversionType}`);
    return;
  }

  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', 'conversion', {
      send_to: `${GOOGLE_ADS_ID}/${conversionLabel}`,
      value: value,
      currency: currency,
    });

    // Also send to GA4 for unified tracking
    window.gtag('event', `ads_${conversionType}`, {
      value: value,
      currency: currency,
      conversion_type: conversionType,
    });
  }
};

// Enhanced e-commerce tracking
export const trackPurchase = (transactionData: {
  transaction_id: string;
  value: number;
  currency: string;
  items: Array<{
    item_id: string;
    item_name: string;
    price: number;
    quantity: number;
  }>;
}) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', 'purchase', transactionData);
    
    // Also trigger Google Ads conversion
    sendConversion('purchase', transactionData.value, transactionData.currency);
  }
};

// Track form submissions
export const trackFormSubmission = (formName: string, formData?: Record<string, any>) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', 'generate_lead', {
      form_name: formName,
      ...formData,
    });
    
    // Trigger appropriate conversion based on form type
    if (formName === 'contact') {
      sendConversion('contact_form');
    } else if (formName === 'booking') {
      sendConversion('booking');
    }
  }
};

// Initialize remarketing tag
export const initializeRemarketing = () => {
  if (typeof window !== 'undefined' && window.gtag && GOOGLE_ADS_ID) {
    window.gtag('config', GOOGLE_ADS_ID, {
      page_path: window.location.pathname,
    });
  }
};