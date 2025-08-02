import DOMPurify from 'isomorphic-dompurify';

/**
 * Input validation and sanitization utilities for CRM components
 */

// Type definitions for validation
export interface ValidationResult {
  isValid: boolean;
  error?: string;
  sanitizedValue?: number | string;
}

// Numeric validation with bounds checking
export function validateNumericInput(
  value: string | number,
  min?: number,
  max?: number,
  allowDecimals = true
): ValidationResult {
  // Convert to string for validation
  const stringValue = String(value).trim();
  
  // Check if empty
  if (!stringValue) {
    return { isValid: false, error: 'Value is required' };
  }
  
  // Check for XSS attempts in numeric input
  if (containsSuspiciousContent(stringValue)) {
    return { isValid: false, error: 'Invalid characters detected' };
  }
  
  // Parse numeric value
  const numericValue = allowDecimals ? parseFloat(stringValue) : parseInt(stringValue, 10);
  
  // Check if it's a valid number
  if (isNaN(numericValue) || !isFinite(numericValue)) {
    return { isValid: false, error: 'Must be a valid number' };
  }
  
  // Check bounds
  if (min !== undefined && numericValue < min) {
    return { isValid: false, error: `Must be at least ${min}` };
  }
  
  if (max !== undefined && numericValue > max) {
    return { isValid: false, error: `Must be no more than ${max}` };
  }
  
  // Check for reasonable decimal places (max 2 for currency)
  if (allowDecimals && stringValue.includes('.')) {
    const decimalPlaces = stringValue.split('.')[1]?.length || 0;
    if (decimalPlaces > 2) {
      return { isValid: false, error: 'Maximum 2 decimal places allowed' };
    }
  }
  
  return { isValid: true, sanitizedValue: numericValue };
}

// String validation with XSS protection
export function validateStringInput(
  value: string,
  minLength = 0,
  maxLength = 1000
): ValidationResult {
  // Basic sanitization
  const trimmedValue = String(value || '').trim();
  
  // Check length
  if (trimmedValue.length < minLength) {
    return { isValid: false, error: `Must be at least ${minLength} characters` };
  }
  
  if (trimmedValue.length > maxLength) {
    return { isValid: false, error: `Must be no more than ${maxLength} characters` };
  }
  
  // XSS protection - sanitize HTML
  const sanitizedValue = DOMPurify.sanitize(trimmedValue, {
    ALLOWED_TAGS: [], // No HTML tags allowed
    ALLOWED_ATTR: [],
    KEEP_CONTENT: true,
  });
  
  // Check for script injection attempts
  if (containsSuspiciousContent(sanitizedValue)) {
    return { isValid: false, error: 'Invalid characters detected' };
  }
  
  return { isValid: true, sanitizedValue };
}

// Email validation with XSS protection
export function validateEmailInput(email: string): ValidationResult {
  const trimmedEmail = String(email || '').trim().toLowerCase();
  
  // Basic length check
  if (!trimmedEmail) {
    return { isValid: false, error: 'Email is required' };
  }
  
  if (trimmedEmail.length > 254) {
    return { isValid: false, error: 'Email too long' };
  }
  
  // XSS check
  if (containsSuspiciousContent(trimmedEmail)) {
    return { isValid: false, error: 'Invalid characters in email' };
  }
  
  // Email format validation
  const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
  
  if (!emailRegex.test(trimmedEmail)) {
    return { isValid: false, error: 'Invalid email format' };
  }
  
  // Sanitize
  const sanitizedEmail = DOMPurify.sanitize(trimmedEmail, {
    ALLOWED_TAGS: [],
    ALLOWED_ATTR: [],
    KEEP_CONTENT: true,
  });
  
  return { isValid: true, sanitizedValue: sanitizedEmail };
}

// Check for suspicious content that might indicate XSS attempts
function containsSuspiciousContent(value: string): boolean {
  // Patterns that might indicate XSS attempts
  const suspiciousPatterns = [
    /<script[^>]*>/i,
    /<\/script>/i,
    /javascript:/i,
    /on\w+\s*=/i,
    /<iframe[^>]*>/i,
    /<object[^>]*>/i,
    /<embed[^>]*>/i,
    /<link[^>]*>/i,
    /<meta[^>]*>/i,
    /data:text\/html/i,
    /vbscript:/i,
    /expression\s*\(/i,
    /@import/i,
    /binding\s*:/i,
    /behavior\s*:/i,
  ];
  
  return suspiciousPatterns.some(pattern => pattern.test(value));
}

// ROI Calculator specific validation
export interface ROIMetrics {
  currentLeads: number;
  conversionRate: number;
  averageValue: number;
  responseTime: number;
}

export function validateROIMetrics(metrics: Partial<ROIMetrics>): {
  isValid: boolean;
  errors: Record<string, string>;
  sanitizedMetrics: ROIMetrics | null;
} {
  const errors: Record<string, string> = {};
  const sanitizedMetrics: any = {};
  
  // Validate current leads
  if (metrics.currentLeads !== undefined) {
    const result = validateNumericInput(metrics.currentLeads, 1, 10000, false);
    if (!result.isValid) {
      errors.currentLeads = result.error || 'Invalid leads count';
    } else {
      sanitizedMetrics.currentLeads = result.sanitizedValue;
    }
  }
  
  // Validate conversion rate
  if (metrics.conversionRate !== undefined) {
    const result = validateNumericInput(metrics.conversionRate, 0.1, 100, true);
    if (!result.isValid) {
      errors.conversionRate = result.error || 'Invalid conversion rate';
    } else {
      sanitizedMetrics.conversionRate = result.sanitizedValue;
    }
  }
  
  // Validate average value
  if (metrics.averageValue !== undefined) {
    const result = validateNumericInput(metrics.averageValue, 1, 1000000, true);
    if (!result.isValid) {
      errors.averageValue = result.error || 'Invalid average value';
    } else {
      sanitizedMetrics.averageValue = result.sanitizedValue;
    }
  }
  
  // Validate response time
  if (metrics.responseTime !== undefined) {
    const result = validateNumericInput(metrics.responseTime, 0.1, 168, true); // Max 1 week
    if (!result.isValid) {
      errors.responseTime = result.error || 'Invalid response time';
    } else {
      sanitizedMetrics.responseTime = result.sanitizedValue;
    }
  }
  
  const isValid = Object.keys(errors).length === 0;
  
  return {
    isValid,
    errors,
    sanitizedMetrics: isValid ? sanitizedMetrics as ROIMetrics : null,
  };
}

// Rate limiting utility for preventing spam
class RateLimiter {
  private requests: Map<string, number[]> = new Map();
  
  isAllowed(key: string, maxRequests = 10, windowMs = 60000): boolean {
    const now = Date.now();
    const windowStart = now - windowMs;
    
    // Get existing requests for this key
    let requests = this.requests.get(key) || [];
    
    // Filter out old requests
    requests = requests.filter(time => time > windowStart);
    
    // Check if under limit
    if (requests.length >= maxRequests) {
      return false;
    }
    
    // Add current request
    requests.push(now);
    this.requests.set(key, requests);
    
    return true;
  }
  
  clear(key: string): void {
    this.requests.delete(key);
  }
}

export const rateLimiter = new RateLimiter();

// Sanitize HTML content for display
export function sanitizeHTML(html: string): string {
  return DOMPurify.sanitize(html, {
    ALLOWED_TAGS: ['b', 'i', 'em', 'strong', 'u', 'br', 'p'],
    ALLOWED_ATTR: [],
    REMOVE_EMPTY_ELEMENTS: true,
  });
}

// Generate CSRF token for forms
export function generateCSRFToken(): string {
  const array = new Uint8Array(32);
  crypto.getRandomValues(array);
  return Array.from(array, byte => byte.toString(16).padStart(2, '0')).join('');
}