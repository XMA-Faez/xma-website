# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.
Always use bun for installing dependencies and running scripts, as it is the preferred runtime for this project.
Don't ever use rgb or hex colors; always use HSL or oklch for colors to maintain consistency with the project's design system.

## Professional Expertise

- As a UI/UX and frontend developer expert in a Fortune 500 company, I bring deep insights into:
  - Best practices for user interface design
  - Modern frontend development methodologies
  - Enterprise-level design and development standards
  - Creating scalable and performant web applications
  - Implementing user-centric design principles

Ask me questions before anything else to get more context and produce the best possible response.

## Development Commands

```bash
# Development
npm run dev          # Start development server (localhost:3000)
bun dev             # Alternative with Bun runtime
```

## Architecture Overview

### Tech Stack
- **Framework**: Next.js 15 with App Router
- **UI**: React 19 RC with Radix UI components
- **Styling**: Tailwind CSS with custom glassmorphism design system
- **Animation**: Framer Motion (`motion` package)
- **CMS**: Contentful for blog content
- **Analytics**: PostHog, Vercel Analytics & Speed Insights
- **Payments**: Stripe integration
- **Icons**: Lucide React & Phosphor React

### Design System & Glassmorphism

This project features a comprehensive glassmorphism design system:

**Core Glass Classes:**
- `glass-primary` - Primary glassmorphism with electric blue accents
- `glass-secondary` - Secondary glass effects with sky blue
- `glass-tertiary` - Subtle white glass overlays
- `glass-nav` - Navigation-specific glass styling
- `glass-hero` - Hero section glass with enhanced effects
- `glass-float` - Floating glass elements with hover animations

**Electric Blue Theme:**
- Primary color: `hsl(217 91% 60%)` (electric blue)
- Uses `electric-glow` and `electric-glow-strong` for hover effects
- Custom backdrop blur utilities: `backdrop-blur-xs` through `backdrop-blur-3xl`

**Button Components:**
- `ScanningButton` - Primary CTA with glassmorphism and hover shimmer
- `LiquidGlassButton` - Advanced liquid glass effects with animations
- `GlassShimmerButton` - Clean glassmorphism with inline styles

### Key Architecture Patterns

**Component Structure:**
```
components/
├── landing-page/     # Home page sections (About, Hero, Products, etc.)
├── layout/          # Header, Footer, Navigation
├── ui/              # Reusable design system components
├── vsl/             # Video Sales Letter components
└── blog/            # Blog-specific components
```

**Data Layer:**
- Contentful CMS integration via `lib/contentful.ts`
- TypeScript interfaces for BlogPost content
- Navigation data centralized in `data/navigation.ts`
- Stripe payment handling in `utils/stripe*.ts`

**App Router Structure:**
- Landing page: `/` (composed of modular sections)
- Services: `/services/[service-name]/`
- Blog: `/blog/` with dynamic `[slug]` routes
- Business pages: `/book`, `/contact`, `/about`

### Styling Conventions

**CSS Architecture:**
- Global styles in `app/globals.css` with custom glassmorphism utilities
- CSS Modules for specific components (`.module.css`)
- Tailwind config extended with custom spacing, backdrop filters, and glass utilities

**Animation System:**
- Framer Motion for page transitions and micro-interactions
- Custom shimmer animations: `animate-shimmer-slow`
- Glass hover effects with opacity transitions
- Scale animations on buttons (1.02 hover, 0.98 tap)

### Content Management

**Contentful Integration:**
- Blog posts with rich text, images, categories, and tags
- Automatic SEO metadata handling
- Search and filtering capabilities
- Related posts functionality

**Media Optimization:**
- Cloudinary integration for video optimization
- Automatic quality and format selection
- Thumbnail generation for video content

### Performance Considerations

- Video optimization with lazy loading and intersection observers
- Font optimization with local Geist font files
- Analytics integration with PostHog and Vercel
- Image optimization through Next.js Image component

## Approved Design System Guidelines

### Page Structure & Layout
Based on the approved home page and CRM page designs, all pages must follow these patterns:

**1. Base Structure:**
```tsx
<div className="min-h-screen w-full relative bg-white dark:bg-black">
  {/* Light mode background - Option 1: Subtle gradient */}
  <div className="absolute inset-0 z-0 dark:hidden" 
    style={{
      background: "radial-gradient(ellipse 80% 60% at 50% 0%, rgba(59, 130, 246, 0.12), transparent 70%), rgb(248, 250, 252)"
    }}
  />
  
  {/* Light mode background - Option 2: Cool Blue Glow (Recommended for hero sections) */}
  <div
    className="absolute inset-0 z-0 dark:hidden"
    style={{
      background: "#ffffff",
      backgroundImage: `
        radial-gradient(
          circle at top center,
          rgba(70, 130, 180, 0.5),
          transparent 70%
        )
      `,
      filter: "blur(80px)",
      backgroundRepeat: "no-repeat",
    }}
  />
  
  {/* Dark mode background */}
  <div className="absolute inset-0 z-0 hidden dark:block"
    style={{
      background: "radial-gradient(ellipse 80% 60% at 50% 0%, rgba(59, 130, 246, 0.25), transparent 70%), #000000"
    }}
  />
  {/* Content sections */}
</div>
```

**2. Section Layout:**
- Use `<section className="relative py-24 px-4">` for consistent spacing
- Container: `<div className="max-w-7xl mx-auto">`
- Add `overflow-hidden` to sections with decorative elements

### Typography System

**1. Color Scheme:**
- Headers: `text-slate-900 dark:text-white`
- Body text: `text-slate-600 dark:text-zinc-300`
- Muted text: `text-slate-400 dark:text-gray-500`
- Light backgrounds: `text-slate-500 dark:text-gray-400`

**2. Gradient Text (for emphasis):**
```tsx
// Primary gradient (headers)
className="bg-gradient-to-r from-slate-900 to-slate-600 dark:from-white dark:to-gray-400 bg-clip-text text-transparent"

// Accent gradients
className="bg-gradient-to-r from-blue-400 to-indigo-600 bg-clip-text text-transparent"
className="bg-gradient-to-r from-emerald-400 to-emerald-600 bg-clip-text text-transparent"
```

**3. Font Sizes:**
- Main headers: `text-5xl md:text-6xl lg:text-7xl font-bold`
- Section headers: `text-4xl md:text-5xl font-bold`
- Sub-headers: `text-2xl md:text-3xl font-bold`
- Large body: `text-xl md:text-2xl`
- Regular body: `text-lg`

### Component Styling

**1. Glass Cards:**
```tsx
// Primary glass card
className="glass-primary rounded-2xl p-6"

// With hover effect
className="glass-primary rounded-2xl p-6 transition-all duration-300 hover:scale-105"

// Alternative glass styles
className="bg-slate-50/50 dark:bg-zinc-900/50 backdrop-blur-sm rounded-2xl p-6 border border-slate-200 dark:border-zinc-800"
```

**2. Buttons:**
- Always use `<ScanningButton>` component for CTAs
- Variants: `variant="primary"` (default), `variant="secondary"`
- Sizes: `size="sm"`, `size="md"`, `size="lg"`
- Colors: `color="blue"` (default), `color="emerald"`

**3. Icon Usage:**
- **Phosphor React** for main UI icons (weight="duotone")
- **Lucide React** only for specific UI elements where Phosphor doesn't have equivalent
- Color classes: `text-blue-400`, `text-emerald-400`, `text-purple-400`, `text-orange-400`

### Animation Patterns

**1. Basic Entrance Animation:**
```tsx
<motion.div
  initial={{ opacity: 0, y: 20 }}
  whileInView={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.6 }}
  viewport={{ once: true }}
>
```

**2. Staggered Children:**
```tsx
// Parent
<motion.div
  initial={{ opacity: 0 }}
  whileInView={{ opacity: 1 }}
  transition={{ duration: 0.5 }}
  viewport={{ once: true }}
>
  {items.map((item, index) => (
    <motion.div
      key={item.id}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.1 * index }}
      viewport={{ once: true }}
    >
  ))}
</motion.div>
```

**3. Hover Animations:**
- Scale: `hover:scale-105 transition-all duration-300`
- Border: `hover:border-blue-500/50 transition-colors duration-300`

### Background Decorations

**1. Blur Circles:**
```tsx
<div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-600/5 rounded-full blur-3xl"></div>
<div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-indigo-600/5 rounded-full blur-3xl"></div>
```

**2. Gradient Lines:**
```tsx
<div className="w-12 h-0.5 bg-gradient-to-r from-blue-500 to-indigo-500"></div>
```

### Responsive Design

**1. Mobile-First Approach:**
- Base styles for mobile
- `md:` prefix for tablet (768px+)
- `lg:` prefix for desktop (1024px+)

**2. Grid Layouts:**
```tsx
// Responsive grid
className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"

// Two-column with proper spacing
className="grid lg:grid-cols-2 gap-16 items-center"
```

### SEO & Accessibility

**1. Semantic HTML:**
- Use proper heading hierarchy (h1 → h2 → h3)
- Include `role` and `aria-label` attributes where needed
- Ensure proper color contrast ratios

**2. Meta Tags:**
- Each page should have unique title and description
- Use structured data for better SEO

### Example Page Template

```tsx
"use client";

import React from "react";
import { motion } from "framer-motion";
import { TrendUp, Users, Target } from "phosphor-react";
import { ScanningButton } from "@/components/ui/ScanningButton";

const ExamplePage = () => {
  return (
    <div className="min-h-screen w-full relative bg-white dark:bg-black">
      {/* Background gradients */}
      <div className="absolute inset-0 z-0 dark:hidden"
        style={{
          background: "radial-gradient(ellipse 80% 60% at 50% 0%, rgba(59, 130, 246, 0.12), transparent 70%), rgb(248, 250, 252)"
        }}
      />
      <div className="absolute inset-0 z-0 hidden dark:block"
        style={{
          background: "radial-gradient(ellipse 80% 60% at 50% 0%, rgba(59, 130, 246, 0.25), transparent 70%), #000000"
        }}
      />

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 px-4">
        <div className="max-w-7xl mx-auto">
          <motion.h1
            className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-slate-900 to-slate-600 dark:from-white dark:to-gray-400 bg-clip-text text-transparent"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            Page Title
          </motion.h1>
        </div>
      </section>

      {/* Content sections... */}
    </div>
  );
};

export default ExamplePage;
```

## Important Notes

- Never create files unless absolutely necessary - always prefer editing existing files
- Maintain the glassmorphism design consistency across components
- Use the established button components rather than creating new ones
- Follow the electric blue color scheme (`--primary: 217 91% 60%`)
- Preserve the responsive design patterns (mobile-first approach)
- **Always prioritize light mode** - it should look perfect in light mode first
- Use Phosphor React icons as the primary icon library
- Implement proper loading states and error boundaries for dynamic content
