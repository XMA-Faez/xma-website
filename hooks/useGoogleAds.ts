import { useCallback } from 'react';
import { sendConversion, trackFormSubmission, event, ConversionEvent } from '@/lib/google-ads';

export function useGoogleAds() {
  // Track conversion with optional value
  const trackConversion = useCallback((
    type: ConversionEvent,
    value?: number,
    currency?: string
  ) => {
    sendConversion(type, value, currency);
  }, []);

  // Track form submission
  const trackForm = useCallback((
    formName: string,
    formData?: Record<string, any>
  ) => {
    trackFormSubmission(formName, formData);
  }, []);

  // Track custom events
  const trackEvent = useCallback((
    action: string,
    category: string,
    label?: string,
    value?: number
  ) => {
    event({ action, category, label, value });
  }, []);

  // Track button clicks
  const trackButtonClick = useCallback((
    buttonName: string,
    section?: string
  ) => {
    event({
      action: 'click',
      category: 'button',
      label: `${section ? `${section}_` : ''}${buttonName}`,
    });
  }, []);

  // Track page engagement
  const trackEngagement = useCallback((
    engagementType: 'scroll' | 'time_on_page' | 'video_play',
    details?: any
  ) => {
    event({
      action: engagementType,
      category: 'engagement',
      label: JSON.stringify(details),
    });
  }, []);

  return {
    trackConversion,
    trackForm,
    trackEvent,
    trackButtonClick,
    trackEngagement,
  };
}