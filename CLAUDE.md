# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

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

# Build & Deploy  
npm run build       # Production build
npm run start       # Start production server
npm run lint        # ESLint checking
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

## Important Notes

- Never create files unless absolutely necessary - always prefer editing existing files
- Maintain the glassmorphism design consistency across components
- Use the established button components rather than creating new ones
- Follow the electric blue color scheme (`--primary: 217 91% 60%`)
- Preserve the responsive design patterns (mobile-first approach)