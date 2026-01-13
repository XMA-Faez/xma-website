"use client";

import { useEffect } from 'react';
import { onCLS, onFCP, onINP, onLCP, onTTFB, Metric } from 'web-vitals';

interface WebVitalsReporterProps {
  onMetric?: (metric: Metric) => void;
}

// Web Vitals thresholds
const WEB_VITALS_THRESHOLDS = {
  CLS: { good: 0.1, poor: 0.25 },
  FCP: { good: 1800, poor: 3000 },
  INP: { good: 200, poor: 500 }, // Interaction to Next Paint (replaced FID)
  LCP: { good: 2500, poor: 4000 },
  TTFB: { good: 800, poor: 1800 },
};

const getVitalsRating = (metric: Metric): 'good' | 'needs-improvement' | 'poor' => {
  const thresholds = WEB_VITALS_THRESHOLDS[metric.name as keyof typeof WEB_VITALS_THRESHOLDS];
  if (!thresholds) return 'good';
  
  if (metric.value <= thresholds.good) return 'good';
  if (metric.value <= thresholds.poor) return 'needs-improvement';
  return 'poor';
};

const reportMetric = (metric: Metric, onMetric?: (metric: Metric) => void) => {
  const rating = getVitalsRating(metric);
  
  // Call custom handler if provided
  if (onMetric) {
    onMetric(metric);
  }
  
  // Log to console in development
  if (process.env.NODE_ENV === 'development') {
    console.group(`🔍 Web Vital: ${metric.name}`);
    console.log(`📊 Value: ${metric.value.toFixed(2)}${metric.name === 'CLS' ? '' : 'ms'}`);
    console.log(`📈 Rating: ${rating.toUpperCase()}`);
    console.log(`🆔 ID: ${metric.id}`);
    console.log(`⏱️ Navigation Type: ${metric.navigationType}`);
    console.groupEnd();
  }
  
  // Send to analytics in production
  if (process.env.NODE_ENV === 'production') {
    // Example: Send to PostHog, Google Analytics, or custom endpoint
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', metric.name, {
        event_category: 'Web Vitals',
        event_label: metric.id,
        value: Math.round(metric.name === 'CLS' ? metric.value * 1000 : metric.value),
        custom_map: {
          metric_rating: rating,
          metric_navigation_type: metric.navigationType,
        },
      });
    }
    
    // Example: Send to PostHog
    if (typeof window !== 'undefined' && window.posthog) {
      window.posthog.capture('web_vital_measured', {
        metric_name: metric.name,
        metric_value: metric.value,
        metric_rating: rating,
        metric_id: metric.id,
        navigation_type: metric.navigationType,
      });
    }
  }
};

const WebVitalsReporter: React.FC<WebVitalsReporterProps> = ({ onMetric }) => {
  useEffect(() => {
    try {
      // Cumulative Layout Shift (CLS)
      onCLS((metric) => reportMetric(metric, onMetric), { reportAllChanges: true });
      
      // First Contentful Paint (FCP)
      onFCP((metric) => reportMetric(metric, onMetric), { reportAllChanges: true });
      
      // Interaction to Next Paint (INP) - replaces FID
      onINP((metric) => reportMetric(metric, onMetric), { reportAllChanges: true });
      
      // Largest Contentful Paint (LCP)
      onLCP((metric) => reportMetric(metric, onMetric), { reportAllChanges: true });
      
      // Time to First Byte (TTFB)
      onTTFB((metric) => reportMetric(metric, onMetric), { reportAllChanges: true });
    } catch (error) {
      console.error('Error initializing Web Vitals monitoring:', error);
    }
  }, [onMetric]);

  // This component doesn't render anything
  return null;
};

// Hook for using Web Vitals in components
const useWebVitals = (onMetric?: (metric: Metric) => void) => {
  useEffect(() => {
    try {
      onCLS((metric) => reportMetric(metric, onMetric));
      onFCP((metric) => reportMetric(metric, onMetric));
      onINP((metric) => reportMetric(metric, onMetric));
      onLCP((metric) => reportMetric(metric, onMetric));
      onTTFB((metric) => reportMetric(metric, onMetric));
    } catch (error) {
      console.error('Error in useWebVitals hook:', error);
    }
  }, [onMetric]);
};

// Performance budget monitoring
const performanceBudgetAlert = (metric: Metric) => {
  const rating = getVitalsRating(metric);
  
  if (rating === 'poor' && process.env.NODE_ENV === 'development') {
    console.warn(`🚨 Performance Budget Alert: ${metric.name} is ${rating.toUpperCase()}`);
    console.warn(`   Current value: ${metric.value.toFixed(2)}${metric.name === 'CLS' ? '' : 'ms'}`);
    const thresholds = WEB_VITALS_THRESHOLDS[metric.name as keyof typeof WEB_VITALS_THRESHOLDS];
    if (thresholds) {
      console.warn(`   Good threshold: ≤${thresholds.good}${metric.name === 'CLS' ? '' : 'ms'}`);
    }
  }
};

export default WebVitalsReporter;