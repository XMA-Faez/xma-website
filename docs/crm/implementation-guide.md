# Implementation Guide - CRM Solution Page Redesign

## Overview

This guide provides step-by-step implementation instructions for transforming the monolithic CRM solution page into a modular, performant, and interactive experience. The implementation follows a phased approach to ensure minimal disruption while maximizing improvements.

## Phase 1: Foundation Setup (Week 1-2)

### 1.1 Install Dependencies

```bash
# Interactive features
npm install zustand react-hook-form @hookform/resolvers zod recharts

# Internationalization
npm install next-intl @formatjs/intl-localematcher

# Validation and utilities
npm install validator dompurify date-fns

# Development dependencies
npm install -D @types/validator @types/dompurify
```

### 1.2 Project Structure Setup

Create the new directory structure:

```bash
mkdir -p app/services/crm-solution/components/{hero,interactive,features,social-proof,content,layout}
mkdir -p app/services/crm-solution/{hooks,store,types,utils}
mkdir -p lib/validations
mkdir -p messages
```

### 1.3 Configure Internationalization

**Create `next.config.js` updates:**
```javascript
const createNextIntlPlugin = require('next-intl/plugin');
const withNextIntl = createNextIntlPlugin();

module.exports = withNextIntl({
  experimental: {
    optimizePackageImports: ['framer-motion', 'recharts', 'lucide-react'],
  },
  images: {
    domains: ['images.ctfassets.net'],
    formats: ['image/webp', 'image/avif'],
  },
});
```

**Create `middleware.ts`:**
```typescript
import createMiddleware from 'next-intl/middleware';

export default createMiddleware({
  locales: ['en', 'ar'],
  defaultLocale: 'en',
  localePrefix: 'as-needed',
});

export const config = {
  matcher: ['/((?!api|_next|_vercel|.*\\..*).*)']
};
```

**Create message files:**
```bash
# messages/en.json
{
  "hero": {
    "title": "Stop Losing WhatsApp Leads to Poor Follow-Up",
    "subtitle": "The AI-powered CRM with advanced chatbot that connects WhatsApp, automates conversations, and turns more inquiries into paying customers for UAE service businesses",
    "cta": {
      "primary": "Book Free Demo",
      "secondary": "Chat on WhatsApp"
    },
    "stats": {
      "businesses": "90% of UAE businesses use WhatsApp",
      "response": "3x faster response time",
      "conversion": "67% more leads converted"
    }
  },
  "calculator": {
    "title": "Calculate Your ROI",
    "subtitle": "See how much money you could save with automated lead management",
    "businessSize": "Business Size",
    "monthlyLeads": "Monthly Leads",
    "conversionRate": "Current Conversion Rate (%)",
    "calculate": "Calculate My ROI",
    "results": {
      "title": "Your Potential Results",
      "monthlySavings": "Monthly Savings",
      "yearlyROI": "Yearly ROI",
      "paybackPeriod": "Payback Period"
    }
  }
}

# messages/ar.json
{
  "hero": {
    "title": "توقف عن فقدان عملاء واتساب بسبب المتابعة الضعيفة",
    "subtitle": "نظام إدارة علاقات العملاء المدعوم بالذكاء الاصطناعي مع شات بوت متقدم يربط واتساب ويؤتمت المحادثات ويحول المزيد من الاستفسارات إلى عملاء يدفعون للشركات الخدمية في الإمارات",
    "cta": {
      "primary": "احجز عرض مجاني",
      "secondary": "تحدث عبر واتساب"
    }
  }
}
```

### 1.4 Type Definitions

**Create `app/services/crm-solution/types/crm.types.ts`:**
```typescript
export interface HeroContent {
  title: string;
  subtitle: string;
  videoUrl?: string;
  stats: HeroStat[];
  ctaButtons: CTAButton[];
}

export interface HeroStat {
  number: string;
  label: string;
  icon?: string;
}

export interface CTAButton {
  text: string;
  href: string;
  variant: 'primary' | 'secondary';
  icon?: string;
}

export interface Feature {
  id: string;
  icon: string;
  title: string;
  description: string;
  highlights: string[];
  demoVideo?: string;
  screenshot?: string;
}

export interface Testimonial {
  name: string;
  business: string;
  industry: string;
  rating: number;
  text: string;
  image?: string;
  results?: TestimonialResult[];
}

export interface TestimonialResult {
  label: string;
  value: string;
  previous?: string;
}

export interface ROICalculationInputs {
  businessSize: 'small' | 'medium' | 'large';
  industry: string;
  monthlyLeads: number;
  currentConversionRate: number;
  averageOrderValue: number;
  teamSize: number;
}

export interface ROIResults {
  monthlySavings: number;
  yearlyROI: number;
  paybackPeriod: number;
  improvements: {
    conversionRateIncrease: number;
    additionalMonthlyRevenue: number;
    timeSaved: number;
  };
  chartData: ChartDataPoint[];
}

export interface ChartDataPoint {
  month: string;
  current: number;
  projected: number;
  savings: number;
}
```

### 1.5 Validation Schemas

**Create `lib/validations/crm.schemas.ts`:**
```typescript
import { z } from 'zod';

export const roiCalculationSchema = z.object({
  businessSize: z.enum(['small', 'medium', 'large']),
  industry: z.enum(['automotive', 'beauty', 'real_estate', 'home_services', 'other']),
  monthlyLeads: z.number().int().min(1).max(10000),
  currentConversionRate: z.number().min(0).max(100),
  averageOrderValue: z.number().min(10).max(100000),
  teamSize: z.number().int().min(1).max(100),
});

export const leadCaptureSchema = z.object({
  email: z.string().email(),
  companyName: z.string().min(2).max(100).optional(),
  industry: z.enum(['automotive', 'beauty', 'real_estate', 'home_services', 'other']).optional(),
  employeesCount: z.number().int().min(1).max(1000).optional(),
  monthlyLeads: z.number().int().min(1).max(10000).optional(),
  currentTools: z.array(z.string()).optional(),
  painPoints: z.array(z.string()).optional(),
  roiCalculation: z.object({
    monthlySavings: z.number(),
    yearlyROI: z.number(),
    paybackPeriod: z.number(),
  }).optional(),
  locale: z.enum(['en', 'ar']).default('en'),
  source: z.string().max(50),
});

export const assessmentSchema = z.object({
  responses: z.array(z.object({
    questionId: z.string(),
    answer: z.union([z.string(), z.number(), z.array(z.string())]),
    type: z.enum(['text', 'number', 'single_choice', 'multiple_choice']),
  })),
  locale: z.enum(['en', 'ar']).default('en'),
});
```

## Phase 2: Component Architecture (Week 2-3)

### 2.1 Base Layout Components

**Create `app/services/crm-solution/components/layout/PageLayout.tsx`:**
```typescript
'use client';

import React from 'react';
import { motion } from 'framer-motion';

interface PageLayoutProps {
  children: React.ReactNode;
  className?: string;
}

export const PageLayout = ({ children, className = '' }: PageLayoutProps) => {
  return (
    <div className={`min-h-screen bg-gradient-to-b from-zinc-950 via-zinc-900 to-zinc-950 text-white overflow-hidden ${className}`}>
      {/* Animated Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-emerald-500/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-emerald-600/10 rounded-full blur-3xl animate-pulse animation-delay-2000" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-emerald-400/5 rounded-full blur-3xl animate-pulse animation-delay-4000" />
      </div>
      
      <div className="relative z-10">
        {children}
      </div>
    </div>
  );
};
```

**Create `app/services/crm-solution/components/layout/Section.tsx`:**
```typescript
'use client';

import React from 'react';
import { motion } from 'framer-motion';

interface SectionProps {
  children: React.ReactNode;
  className?: string;
  background?: 'none' | 'gradient' | 'dark';
  id?: string;
}

export const Section = ({ 
  children, 
  className = '', 
  background = 'none',
  id 
}: SectionProps) => {
  const backgroundClasses = {
    none: '',
    gradient: 'bg-gradient-to-b from-zinc-900 to-zinc-950',
    dark: 'bg-zinc-950',
  };

  return (
    <section 
      id={id}
      className={`py-20 relative ${backgroundClasses[background]} ${className}`}
    >
      <div className="max-w-6xl mx-auto px-4">
        {children}
      </div>
    </section>
  );
};

export const SectionHeader = ({ 
  title, 
  subtitle, 
  className = '' 
}: {
  title: string;
  subtitle?: string;
  className?: string;
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: true }}
      className={`text-center mb-16 ${className}`}
    >
      <h2 className="text-3xl md:text-5xl font-bold mb-4">
        {title.split(' ').map((word, index) => {
          const isHighlight = word.includes('*');
          const cleanWord = word.replace('*', '');
          
          return isHighlight ? (
            <span key={index} className="bg-gradient-to-r from-emerald-400 to-green-300 bg-clip-text text-transparent">
              {cleanWord}{' '}
            </span>
          ) : (
            <span key={index}>{cleanWord} </span>
          );
        })}
      </h2>
      {subtitle && (
        <p className="text-xl text-zinc-400 max-w-2xl mx-auto">{subtitle}</p>
      )}
    </motion.div>
  );
};
```

### 2.2 Hero Section Components

**Create `app/services/crm-solution/components/hero/CRMHero.tsx`:**
```typescript
'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Shield } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { HeroStats } from './HeroStats';
import { HeroCTA } from './HeroCTA';

interface CRMHeroProps {
  heroContent: {
    title: string;
    subtitle: string;
    videoUrl?: string;
    trustBadge?: string;
  };
}

export const CRMHero = ({ heroContent }: CRMHeroProps) => {
  const t = useTranslations('hero');

  return (
    <div className="relative pt-32 pb-20 px-4 min-h-[90vh] flex items-center">
      {/* Video Background */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-zinc-950/80 via-zinc-900/60 to-zinc-950/80 z-10" />
        {heroContent.videoUrl ? (
          <video
            autoPlay
            muted
            loop
            playsInline
            className="w-full h-full object-cover"
          >
            <source src={heroContent.videoUrl} type="video/mp4" />
          </video>
        ) : (
          <div className="w-full h-full bg-zinc-800 flex items-center justify-center">
            <p className="text-zinc-600 text-sm text-center p-8">
              VIDEO PLACEHOLDER: Add a background video showing WhatsApp notifications<br/>
              coming in and being managed in the CRM dashboard
            </p>
          </div>
        )}
      </div>
      
      <div className="max-w-6xl mx-auto text-center relative z-20">
        {/* Trust Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-sm font-medium mb-6"
        >
          <Shield className="w-4 h-4" />
          {heroContent.trustBadge || t('trustBadge')}
        </motion.div>

        {/* Main Heading */}
        <motion.h1
          className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          {heroContent.title.split(' ').map((word, index) => {
            const isHighlight = ['Poor', 'Follow-Up'].includes(word);
            return isHighlight ? (
              <span key={index} className="bg-gradient-to-r from-emerald-400 to-green-300 bg-clip-text text-transparent">
                {word}{' '}
              </span>
            ) : (
              <span key={index}>{word} </span>
            );
          })}
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          className="text-xl md:text-2xl text-zinc-300 max-w-3xl mx-auto mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          {heroContent.subtitle}
        </motion.p>

        {/* Stats */}
        <HeroStats />

        {/* CTA Buttons */}
        <HeroCTA />

        {/* Hero Screenshot */}
        <motion.div
          className="mt-12 relative"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
        >
          <div className="relative rounded-2xl overflow-hidden shadow-2xl shadow-emerald-500/20 border border-emerald-500/20">
            <div className="aspect-[16/9] bg-zinc-800 flex items-center justify-center">
              <p className="text-zinc-400 text-center p-8">
                IMAGE PLACEHOLDER: CRM dashboard screenshot showing:<br/>
                - WhatsApp conversation panel on the left<br/>
                - Customer details in the center<br/>
                - Sales pipeline on the right<br/>
                - Clean, modern interface with emerald green accents
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};
```

**Create `app/services/crm-solution/components/hero/HeroStats.tsx`:**
```typescript
'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';

const defaultStats = [
  { number: "90%", labelKey: "businesses" },
  { number: "3x", labelKey: "response" },
  { number: "67%", labelKey: "conversion" },
];

export const HeroStats = () => {
  const t = useTranslations('hero.stats');

  return (
    <motion.div
      className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-3xl mx-auto mb-12"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.3 }}
    >
      {defaultStats.map((stat, index) => (
        <div key={index} className="text-center">
          <div className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-emerald-400 to-green-300 bg-clip-text text-transparent">
            {stat.number}
          </div>
          <div className="text-zinc-400">{t(stat.labelKey)}</div>
        </div>
      ))}
    </motion.div>
  );
};
```

## Phase 3: Interactive Components (Week 3-4)

### 3.1 State Management Setup

**Create `app/services/crm-solution/store/calculatorStore.ts`:**
```typescript
import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import type { ROICalculationInputs, ROIResults } from '../types/crm.types';

interface CalculatorState {
  // Input values
  inputs: ROICalculationInputs;
  
  // Calculation results
  results: ROIResults | null;
  
  // UI state
  isCalculating: boolean;
  showResults: boolean;
  
  // Actions
  updateInputs: (inputs: Partial<ROICalculationInputs>) => void;
  calculateROI: () => Promise<void>;
  resetCalculator: () => void;
  showResultsPanel: (show: boolean) => void;
}

const defaultInputs: ROICalculationInputs = {
  businessSize: 'small',
  industry: 'automotive',
  monthlyLeads: 100,
  currentConversionRate: 15,
  averageOrderValue: 500,
  teamSize: 3,
};

export const useCalculatorStore = create<CalculatorState>()(
  devtools(
    (set, get) => ({
      inputs: defaultInputs,
      results: null,
      isCalculating: false,
      showResults: false,
      
      updateInputs: (newInputs) => {
        set((state) => ({
          inputs: { ...state.inputs, ...newInputs },
          showResults: false, // Hide results when inputs change
        }));
      },
      
      calculateROI: async () => {
        set({ isCalculating: true });
        
        try {
          const response = await fetch('/api/calculator/roi', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(get().inputs),
          });
          
          if (!response.ok) {
            throw new Error('Calculation failed');
          }
          
          const { data } = await response.json();
          
          set({ 
            results: data,
            showResults: true,
            isCalculating: false,
          });
        } catch (error) {
          console.error('ROI calculation error:', error);
          set({ isCalculating: false });
        }
      },
      
      resetCalculator: () => {
        set({
          inputs: defaultInputs,
          results: null,
          showResults: false,
          isCalculating: false,
        });
      },
      
      showResultsPanel: (show) => {
        set({ showResults: show });
      },
    }),
    { name: 'calculator-store' }
  )
);
```

### 3.2 ROI Calculator Component

**Create `app/services/crm-solution/components/interactive/ROICalculator.tsx`:**
```typescript
'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Calculator, TrendingUp } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { roiCalculationSchema } from '@/lib/validations/crm.schemas';
import { useCalculatorStore } from '../../store/calculatorStore';
import { ROIChart } from './ROIChart';
import { ROIResults } from './ROIResults';
import type { ROICalculationInputs } from '../../types/crm.types';

export const ROICalculator = () => {
  const t = useTranslations('calculator');
  const { 
    inputs, 
    results, 
    isCalculating, 
    showResults,
    updateInputs, 
    calculateROI 
  } = useCalculatorStore();

  const { register, handleSubmit, formState: { errors }, watch } = useForm<ROICalculationInputs>({
    resolver: zodResolver(roiCalculationSchema),
    defaultValues: inputs,
  });

  const watchedValues = watch();

  React.useEffect(() => {
    updateInputs(watchedValues);
  }, [watchedValues, updateInputs]);

  const onSubmit = async (data: ROICalculationInputs) => {
    await calculateROI();
    
    // Track analytics
    if (typeof window !== 'undefined' && window.posthog) {
      window.posthog.capture('roi_calculator_completed', {
        businessSize: data.businessSize,
        industry: data.industry,
        monthlyLeads: data.monthlyLeads,
        currentConversionRate: data.currentConversionRate,
      });
    }
  };

  return (
    <div className="py-20 relative">
      <div className="max-w-6xl mx-auto px-4">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-sm font-medium mb-6">
            <Calculator className="w-4 h-4" />
            ROI Calculator
          </div>
          <h2 className="text-3xl md:text-5xl font-bold mb-4">
            {t('title')}
          </h2>
          <p className="text-xl text-zinc-400 max-w-2xl mx-auto">
            {t('subtitle')}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          {/* Calculator Form */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="glass-primary rounded-3xl p-8"
          >
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              {/* Business Size */}
              <div>
                <label className="block text-sm font-medium text-zinc-300 mb-3">
                  {t('businessSize')}
                </label>
                <div className="grid grid-cols-3 gap-3">
                  {['small', 'medium', 'large'].map((size) => (
                    <label key={size} className="relative">
                      <input
                        type="radio"
                        value={size}
                        {...register('businessSize')}
                        className="sr-only peer"
                      />
                      <div className="p-3 rounded-xl border-2 border-zinc-800 peer-checked:border-emerald-500 peer-checked:bg-emerald-500/10 cursor-pointer transition-all text-center">
                        <div className="font-medium capitalize">{size}</div>
                        <div className="text-xs text-zinc-500 mt-1">
                          {size === 'small' && '1-10 employees'}
                          {size === 'medium' && '11-50 employees'}
                          {size === 'large' && '50+ employees'}
                        </div>
                      </div>
                    </label>
                  ))}
                </div>
              </div>

              {/* Monthly Leads */}
              <div>
                <label className="block text-sm font-medium text-zinc-300 mb-3">
                  {t('monthlyLeads')}
                </label>
                <input
                  type="number"
                  {...register('monthlyLeads', { valueAsNumber: true })}
                  className="w-full px-4 py-3 rounded-xl bg-zinc-800/50 border border-zinc-700 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 outline-none transition-colors"
                  placeholder="100"
                />
                {errors.monthlyLeads && (
                  <p className="text-red-400 text-sm mt-1">{errors.monthlyLeads.message}</p>
                )}
              </div>

              {/* Conversion Rate */}
              <div>
                <label className="block text-sm font-medium text-zinc-300 mb-3">
                  {t('conversionRate')}
                </label>
                <div className="relative">
                  <input
                    type="number"
                    step="0.1"
                    {...register('currentConversionRate', { valueAsNumber: true })}
                    className="w-full px-4 py-3 rounded-xl bg-zinc-800/50 border border-zinc-700 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 outline-none transition-colors pr-8"
                    placeholder="15"
                  />
                  <span className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-500">%</span>
                </div>
                {errors.currentConversionRate && (
                  <p className="text-red-400 text-sm mt-1">{errors.currentConversionRate.message}</p>
                )}
              </div>

              {/* Average Order Value */}
              <div>
                <label className="block text-sm font-medium text-zinc-300 mb-3">
                  Average Order Value (AED)
                </label>
                <input
                  type="number"
                  {...register('averageOrderValue', { valueAsNumber: true })}
                  className="w-full px-4 py-3 rounded-xl bg-zinc-800/50 border border-zinc-700 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 outline-none transition-colors"
                  placeholder="500"
                />
                {errors.averageOrderValue && (
                  <p className="text-red-400 text-sm mt-1">{errors.averageOrderValue.message}</p>
                )}
              </div>

              {/* Calculate Button */}
              <button
                type="submit"
                disabled={isCalculating}
                className="w-full py-4 bg-gradient-to-r from-emerald-500 to-green-400 text-white font-semibold rounded-xl hover:from-emerald-600 hover:to-green-500 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {isCalculating ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    Calculating...
                  </>
                ) : (
                  <>
                    <TrendingUp className="w-5 h-5" />
                    {t('calculate')}
                  </>
                )}
              </button>
            </form>
          </motion.div>

          {/* Results Panel */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
            className="sticky top-8"
          >
            {showResults && results ? (
              <div className="space-y-6">
                <ROIResults results={results} />
                <ROIChart data={results.chartData} />
              </div>
            ) : (
              <div className="glass-primary rounded-3xl p-8 text-center">
                <Calculator className="w-16 h-16 text-emerald-400 mx-auto mb-4" />
                <h3 className="text-2xl font-bold mb-2">See Your Results</h3>
                <p className="text-zinc-400">
                  Fill out the form and click calculate to see your potential ROI
                </p>
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </div>
  );
};
```

### 3.3 WhatsApp Simulator

**Create `app/services/crm-solution/components/interactive/WhatsAppSimulator.tsx`:**
```typescript
'use client';

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageSquare, Send, User, Bot } from 'lucide-react';
import { useTranslations } from 'next-intl';

interface Message {
  id: string;
  sender: 'customer' | 'ai_bot';
  text: string;
  timestamp: Date;
  isTyping?: boolean;
}

const scenarios = [
  {
    id: 'appointment_booking',
    title: 'Appointment Booking',
    description: 'Customer wants to book a service appointment',
    initialMessage: 'Hi, I need to repair my car\'s air conditioning. Can you help?',
  },
  {
    id: 'price_inquiry', 
    title: 'Price Inquiry',
    description: 'Customer asking for service pricing',
    initialMessage: 'What are your prices for full car service?',
  },
  {
    id: 'support_question',
    title: 'Support Question',
    description: 'Customer needs help with existing service',
    initialMessage: 'I had my car serviced last week but the issue is still there',
  },
];

export const WhatsAppSimulator = () => {
  const t = useTranslations('simulator');
  const [selectedScenario, setSelectedScenario] = React.useState(scenarios[0]);
  const [messages, setMessages] = React.useState<Message[]>([]);
  const [isTyping, setIsTyping] = React.useState(false);
  const [simulationStarted, setSimulationStarted] = React.useState(false);

  const startSimulation = async (scenario: typeof scenarios[0]) => {
    setSelectedScenario(scenario);
    setMessages([]);
    setSimulationStarted(true);

    // Add initial customer message
    const customerMessage: Message = {
      id: '1',
      sender: 'customer',
      text: scenario.initialMessage,
      timestamp: new Date(),
    };

    setMessages([customerMessage]);

    // Simulate AI typing
    setTimeout(() => {
      setIsTyping(true);
    }, 500);

    // Add AI response
    setTimeout(() => {
      setIsTyping(false);
      const aiResponse: Message = {
        id: '2',
        sender: 'ai_bot',
        text: getAIResponse(scenario.id, customerMessage.text),
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, aiResponse]);
    }, 2000);
  };

  const getAIResponse = (scenarioId: string, customerMessage: string): string => {
    const responses = {
      appointment_booking: "Hello! I'd be happy to help you with your AC repair. What type of car do you have and what seems to be the issue? I can check our availability for you.",
      price_inquiry: "Hi there! Our full car service packages start at AED 299 for basic service and go up to AED 899 for premium service. What type of car do you have? I can give you an exact quote.",
      support_question: "I'm sorry to hear the issue persists. Let me look into this for you. Can you tell me what service was performed and what problem you're still experiencing? I'll make sure we resolve this.",
    };
    
    return responses[scenarioId as keyof typeof responses] || "Thank you for your message. How can I help you today?";
  };

  return (
    <div className="py-20 relative">
      <div className="max-w-6xl mx-auto px-4">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-sm font-medium mb-6">
            <MessageSquare className="w-4 h-4" />
            WhatsApp Simulator
          </div>
          <h2 className="text-3xl md:text-5xl font-bold mb-4">
            See AI Chatbot in *Action*
          </h2>
          <p className="text-xl text-zinc-400 max-w-2xl mx-auto">
            Experience how our AI handles real customer conversations
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Scenario Selection */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <h3 className="text-2xl font-bold mb-6">Choose a Scenario</h3>
            <div className="space-y-4">
              {scenarios.map((scenario) => (
                <button
                  key={scenario.id}
                  onClick={() => startSimulation(scenario)}
                  className={`w-full p-4 rounded-2xl border-2 transition-all text-left ${
                    selectedScenario.id === scenario.id
                      ? 'border-emerald-500 bg-emerald-500/10'
                      : 'border-zinc-800 glass-primary hover:border-emerald-500/50'
                  }`}
                >
                  <h4 className="font-semibold mb-2">{scenario.title}</h4>
                  <p className="text-sm text-zinc-400">{scenario.description}</p>
                </button>
              ))}
            </div>

            <div className="mt-8 p-6 glass-primary rounded-2xl">
              <h4 className="font-semibold mb-3 flex items-center gap-2">
                <Bot className="w-5 h-5 text-emerald-400" />
                AI Capabilities
              </h4>
              <ul className="space-y-2 text-sm text-zinc-400">
                <li>• Understands context and intent</li>
                <li>• Books appointments automatically</li>
                <li>• Provides accurate pricing</li>
                <li>• Escalates complex issues to humans</li>
                <li>• Available 24/7 in Arabic and English</li>
              </ul>
            </div>
          </motion.div>

          {/* WhatsApp Interface */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
            className="sticky top-8"
          >
            <div className="bg-zinc-900 rounded-3xl overflow-hidden shadow-2xl">
              {/* WhatsApp Header */}
              <div className="bg-emerald-600 p-4 flex items-center gap-3">
                <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center">
                  <Bot className="w-6 h-6 text-emerald-600" />
                </div>
                <div className="flex-1">
                  <h4 className="font-semibold text-white">XMA CRM Assistant</h4>
                  <p className="text-emerald-100 text-sm">Online • Powered by AI</p>
                </div>
              </div>

              {/* Messages */}
              <div className="h-96 overflow-y-auto p-4 space-y-4 bg-zinc-800">
                {!simulationStarted ? (
                  <div className="text-center text-zinc-500 mt-16">
                    <MessageSquare className="w-12 h-12 mx-auto mb-4 opacity-50" />
                    <p>Select a scenario to start the simulation</p>
                  </div>
                ) : (
                  <AnimatePresence>
                    {messages.map((message) => (
                      <motion.div
                        key={message.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className={`flex ${message.sender === 'customer' ? 'justify-end' : 'justify-start'}`}
                      >
                        <div className={`max-w-xs px-4 py-2 rounded-2xl ${
                          message.sender === 'customer'
                            ? 'bg-emerald-500 text-white'
                            : 'bg-zinc-700 text-zinc-100'
                        }`}>
                          <p className="text-sm">{message.text}</p>
                          <p className="text-xs opacity-70 mt-1">
                            {message.timestamp.toLocaleTimeString('en-US', { 
                              hour: '2-digit', 
                              minute: '2-digit' 
                            })}
                          </p>
                        </div>
                      </motion.div>
                    ))}
                    
                    {isTyping && (
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="flex justify-start"
                      >
                        <div className="bg-zinc-700 text-zinc-100 px-4 py-2 rounded-2xl">
                          <div className="flex space-x-1">
                            <div className="w-2 h-2 bg-zinc-400 rounded-full animate-bounce" />
                            <div className="w-2 h-2 bg-zinc-400 rounded-full animate-bounce animation-delay-200" />
                            <div className="w-2 h-2 bg-zinc-400 rounded-full animate-bounce animation-delay-400" />
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                )}
              </div>

              {/* Input Area */}
              <div className="p-4 border-t border-zinc-700">
                <div className="flex items-center gap-3">
                  <input
                    type="text"
                    placeholder="Type a message..."
                    className="flex-1 px-4 py-2 bg-zinc-700 rounded-full outline-none text-sm"
                    disabled
                  />
                  <button className="w-10 h-10 bg-emerald-500 rounded-full flex items-center justify-center">
                    <Send className="w-5 h-5 text-white" />
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};
```

## Phase 4: API Implementation (Week 4-5)

### 4.1 ROI Calculator API

**Create `app/api/calculator/roi/route.ts`:**
```typescript
import { NextRequest, NextResponse } from 'next/server';
import { roiCalculationSchema } from '@/lib/validations/crm.schemas';
import { calculateROI } from '@/lib/utils/calculations';
import { rateLimit } from '@/lib/utils/rate-limit';

export async function POST(request: NextRequest) {
  // Rate limiting
  const ip = request.ip ?? 'anonymous';
  const isAllowed = await rateLimit(ip, 10, 60); // 10 requests per minute
  
  if (!isAllowed) {
    return NextResponse.json(
      { success: false, error: { code: 'RATE_LIMIT', message: 'Too many requests' } },
      { status: 429 }
    );
  }

  try {
    const body = await request.json();
    
    // Validate input
    const validatedData = roiCalculationSchema.parse(body);
    
    // Calculate ROI
    const results = calculateROI(validatedData);
    
    // Log for analytics (optional)
    console.log('ROI calculation:', {
      businessSize: validatedData.businessSize,
      industry: validatedData.industry,
      monthlyLeads: validatedData.monthlyLeads,
      results: results.yearlyROI,
    });

    return NextResponse.json({
      success: true,
      data: results,
    });
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json(
        { success: false, error: { code: 'VALIDATION_ERROR', message: error.message } },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { success: false, error: { code: 'INTERNAL_ERROR', message: 'Internal server error' } },
      { status: 500 }
    );
  }
}
```

### 4.2 Calculation Utilities

**Create `lib/utils/calculations.ts`:**
```typescript
import type { ROICalculationInputs, ROIResults } from '@/app/services/crm-solution/types/crm.types';

export function calculateROI(inputs: ROICalculationInputs): ROIResults {
  const {
    businessSize,
    industry,
    monthlyLeads,
    currentConversionRate,
    averageOrderValue,
    teamSize,
  } = inputs;

  // Industry multipliers based on UAE market data
  const industryMultipliers = {
    automotive: 1.2,
    beauty: 1.0,
    real_estate: 1.5,
    home_services: 1.1,
    other: 1.0,
  };

  // Business size factors
  const sizeFactors = {
    small: { efficiency: 0.8, improvement: 1.3 },
    medium: { efficiency: 1.0, improvement: 1.2 },
    large: { efficiency: 1.2, improvement: 1.1 },
  };

  const industryMultiplier = industryMultipliers[industry as keyof typeof industryMultipliers] || 1.0;
  const sizeFactor = sizeFactors[businessSize];

  // Current state calculations
  const currentMonthlyConversions = Math.round((monthlyLeads * currentConversionRate) / 100);
  const currentMonthlyRevenue = currentMonthlyConversions * averageOrderValue;
  const currentYearlyRevenue = currentMonthlyRevenue * 12;

  // Projected improvements with CRM
  const projectedConversionRate = Math.min(
    currentConversionRate * sizeFactor.improvement * industryMultiplier,
    85 // Cap at 85%
  );
  
  const projectedMonthlyConversions = Math.round((monthlyLeads * projectedConversionRate) / 100);
  const projectedMonthlyRevenue = projectedMonthlyConversions * averageOrderValue;
  const projectedYearlyRevenue = projectedMonthlyRevenue * 12;

  // Improvements
  const additionalMonthlyRevenue = projectedMonthlyRevenue - currentMonthlyRevenue;
  const additionalYearlyRevenue = additionalMonthlyRevenue * 12;
  const conversionRateIncrease = projectedConversionRate - currentConversionRate;

  // Cost savings (time and efficiency)
  const timeSavedPerLead = 15; // minutes
  const hourlyRate = 50; // AED per hour
  const timeSavingsPerMonth = (monthlyLeads * timeSavedPerLead * teamSize) / 60 * hourlyRate;

  // Total savings
  const monthlySavings = additionalMonthlyRevenue + timeSavingsPerMonth;
  const yearlySavings = monthlySavings * 12;

  // CRM cost (estimated)
  const monthlyCRMCost = businessSize === 'small' ? 299 : businessSize === 'medium' ? 599 : 999;
  const yearlyROI = ((yearlySavings - (monthlyCRMCost * 12)) / (monthlyCRMCost * 12)) * 100;
  const paybackPeriod = (monthlyCRMCost * 12) / monthlySavings;

  // Chart data for visualization
  const chartData = Array.from({ length: 12 }, (_, index) => ({
    month: `Month ${index + 1}`,
    current: currentMonthlyRevenue,
    projected: projectedMonthlyRevenue,
    savings: additionalMonthlyRevenue,
  }));

  return {
    monthlySavings: Math.round(monthlySavings),
    yearlyROI: Math.round(yearlyROI),
    paybackPeriod: Math.round(paybackPeriod * 10) / 10,
    improvements: {
      conversionRateIncrease: Math.round(conversionRateIncrease * 10) / 10,
      additionalMonthlyRevenue: Math.round(additionalMonthlyRevenue),
      timeSaved: Math.round((timeSavedPerLead * monthlyLeads * teamSize) / 60),
    },
    chartData,
  };
}
```

## Phase 5: Final Integration & Optimization (Week 5-6)

### 5.1 Main Page Integration

**Update `app/services/crm-solution/page.tsx`:**
```typescript
import React from 'react';
import { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import { PageLayout } from './components/layout/PageLayout';
import { CRMHero } from './components/hero/CRMHero';
import { ROICalculator } from './components/interactive/ROICalculator';
import { WhatsAppSimulator } from './components/interactive/WhatsAppSimulator';
import { FeatureGrid } from './components/features/FeatureGrid';
import { TestimonialsSection } from './components/social-proof/TestimonialsSection';
import { FAQ } from './components/content/FAQ';

interface CRMSolutionPageProps {
  params: { locale: string };
}

export async function generateMetadata({ params }: CRMSolutionPageProps): Promise<Metadata> {
  const t = await getTranslations({ locale: params.locale, namespace: 'metadata' });
  
  return {
    title: t('crm.title'),
    description: t('crm.description'),
    keywords: t('crm.keywords'),
    openGraph: {
      title: t('crm.ogTitle'),
      description: t('crm.ogDescription'),
      type: 'website',
    },
    alternates: {
      languages: {
        'en': '/services/crm-solution',
        'ar': '/ar/services/crm-solution',
      },
    },
  };
}

export default async function CRMSolutionPage({ params }: CRMSolutionPageProps) {
  const t = await getTranslations({ locale: params.locale, namespace: 'crm' });
  
  const heroContent = {
    title: t('hero.title'),
    subtitle: t('hero.subtitle'),
    trustBadge: t('hero.trustBadge'),
  };

  return (
    <PageLayout>
      <CRMHero heroContent={heroContent} />
      <ROICalculator />
      <WhatsAppSimulator />
      <FeatureGrid />
      <TestimonialsSection />
      <FAQ />
    </PageLayout>
  );
}
```

### 5.2 Performance Optimization

**Create `next.config.js` optimizations:**
```javascript
const createNextIntlPlugin = require('next-intl/plugin');
const withNextIntl = createNextIntlPlugin();

/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    optimizePackageImports: [
      'framer-motion',
      'recharts', 
      'lucide-react',
      '@hookform/resolvers',
      'react-hook-form'
    ],
  },
  
  images: {
    domains: ['images.ctfassets.net'],
    formats: ['image/webp', 'image/avif'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
  },

  // Webpack optimizations
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        fs: false,
        net: false,
        tls: false,
      };
    }
    
    return config;
  },
};

module.exports = withNextIntl(nextConfig);
```

### 5.3 SEO Optimizations

**Create structured data:**
```typescript
// lib/seo/structured-data.ts
export function generateCRMStructuredData() {
  return {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "XMA CRM Solution",
    "description": "AI-powered CRM with WhatsApp integration for UAE businesses",
    "url": "https://xma.ae/services/crm-solution",
    "applicationCategory": "BusinessApplication",
    "operatingSystem": "Web",
    "offers": {
      "@type": "Offer",
      "price": "299",
      "priceCurrency": "AED",
      "priceValidUntil": "2024-12-31"
    },
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.8",
      "reviewCount": "150"
    },
    "featureList": [
      "WhatsApp Business Integration",
      "AI-Powered Chatbot",
      "Visual Sales Pipeline",
      "Smart Lead Management"
    ]
  };
}
```

## Testing Strategy

### 5.4 Component Testing

**Create test file `__tests__/ROICalculator.test.tsx`:**
```typescript
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { ROICalculator } from '@/app/services/crm-solution/components/interactive/ROICalculator';
import { NextIntlClientProvider } from 'next-intl';

const messages = {
  calculator: {
    title: 'Calculate Your ROI',
    subtitle: 'See potential savings',
    calculate: 'Calculate',
  },
};

const renderWithIntl = (component: React.ReactNode) => {
  return render(
    <NextIntlClientProvider locale="en" messages={messages}>
      {component}
    </NextIntlClientProvider>
  );
};

describe('ROICalculator', () => {
  test('renders calculator form', () => {
    renderWithIntl(<ROICalculator />);
    
    expect(screen.getByText('Calculate Your ROI')).toBeInTheDocument();
    expect(screen.getByText('Calculate')).toBeInTheDocument();
  });

  test('handles form submission', async () => {
    renderWithIntl(<ROICalculator />);
    
    // Fill form
    fireEvent.change(screen.getByPlaceholderText('100'), {
      target: { value: '150' }
    });
    
    // Submit
    fireEvent.click(screen.getByText('Calculate'));
    
    await waitFor(() => {
      expect(screen.getByText('Calculating...')).toBeInTheDocument();
    });
  });
});
```

### 5.5 Performance Testing

**Create Lighthouse CI configuration:**
```json
// .lighthouserc.json
{
  "ci": {
    "collect": {
      "url": ["http://localhost:3000/services/crm-solution"],
      "numberOfRuns": 3
    },
    "assert": {
      "assertions": {
        "categories:performance": ["error", {"minScore": 0.9}],
        "categories:accessibility": ["error", {"minScore": 0.9}],
        "categories:best-practices": ["error", {"minScore": 0.9}],
        "categories:seo": ["error", {"minScore": 0.9}]
      }
    }
  }
}
```

## Deployment Checklist

### Pre-deployment
- [ ] All components tested individually
- [ ] Integration tests passing
- [ ] Performance benchmarks met
- [ ] Accessibility compliance verified
- [ ] SEO meta tags implemented
- [ ] Analytics tracking configured
- [ ] Error boundaries added
- [ ] Fallback content for failed API calls

### Post-deployment
- [ ] Monitor Core Web Vitals
- [ ] Track conversion rates
- [ ] Monitor API response times
- [ ] Verify mobile responsiveness
- [ ] Test multilingual functionality
- [ ] Validate structured data
- [ ] Monitor error rates

## Success Metrics

### Technical KPIs
- **Page Load Time**: Target <2.5s (measure with Lighthouse)
- **Bundle Size**: Target <250KB initial load
- **Lighthouse Score**: Target >90 across all metrics
- **CLS Score**: Target <0.1

### Business KPIs  
- **Demo Conversion**: Target +35% increase
- **Calculator Usage**: Target >30% of visitors
- **Assessment Completion**: Target >20% of visitors
- **Bounce Rate**: Target -20% reduction

This implementation guide provides a comprehensive roadmap for transforming the CRM solution page into a high-performing, interactive experience that will significantly improve user engagement and conversion rates while maintaining the existing design system consistency.