# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

```bash
bun dev         # Start development server (localhost:3000)
bun build       # Production build
bun lint        # Run ESLint
```

Always use `bun` instead of `npm` for all package management and script execution.

## Architecture Overview

### Tech Stack
- **Framework**: Next.js 15 with App Router
- **UI**: React 19 RC, Radix UI primitives, class-variance-authority (CVA)
- **Styling**: Tailwind CSS 3.4 with oklch color system
- **Animation**: Framer Motion (imported as `motion/react`)
- **CMS**: Contentful for blog content
- **Analytics**: PostHog (EU region), Vercel Analytics, Google Tag Manager
- **Payments**: Stripe integration
- **Icons**: Lucide React & Phosphor React (prefer Phosphor with `weight="duotone"`)

### Project Structure

```
app/                    # Next.js App Router pages
├── page.tsx           # Home (renders HomeClient)
├── blog/              # Contentful-powered blog
├── services/          # Service pages (crm-solution)
├── api/               # API routes (stripe webhooks)
└── [page]/page.tsx    # Static pages (about, contact, book, etc.)

components/
├── home/              # Homepage sections
├── layout/            # Header, Footer, navigation
├── ui/                # Design system primitives (ScanningButton, etc.)
├── crm/               # CRM service page components
├── blog/              # Blog-specific components
├── vsl/               # Video Sales Letter components
└── Proposal/          # Proposal/pricing components

lib/
├── contentful.ts      # Contentful CMS client & queries
└── utils.ts           # cn() helper (clsx + tailwind-merge)

data/                  # Static data (navigation, carousel content)
hooks/                 # Custom React hooks (tracking, portfolio, stripe)
utils/                 # Server utilities (stripe, cloudinary)
```

### Key Patterns

**Pages follow Server/Client split**: Server component for metadata/SEO, client component for interactivity
```tsx
// app/page.tsx (server)
export const metadata: Metadata = { ... }
export default function Page() {
  return <PageClient />
}

// components/[page]/PageClient.tsx (client)
"use client";
// Interactive content here
```

**UI components use CVA for variants**: See `ScanningButton.tsx` for the primary CTA button pattern.

**Contentful integration**: All blog queries in `lib/contentful.ts`. Content type is `blogPost`.

### Design System Constraints

**Color requirements:**
- Never use rgb or hex - always use oklch or HSL via CSS variables
- Primary color palette: `gold-*` tokens (oklch-based, defined in tailwind.config.ts)
- Semantic colors: `primary`, `neutral`, `success`, `warning`, `error` map to gold/stone

**Typography:**
- Display headings: `font-display` (Cormorant Garamond serif)
- Body text: `font-sans` (Inter)

**Glass effects**: Use established classes from globals.css:
- `glass-primary`, `glass-secondary`, `glass-tertiary` - card backgrounds
- `glass-nav` - navigation with backdrop blur
- `glass-float` - floating elements with hover animations

**Buttons**: Use `<ScanningButton>` component from `components/ui/ScanningButton.tsx` for CTAs.

### Environment Variables Required

```
CONTENTFUL_SPACE_ID
CONTENTFUL_ACCESS_TOKEN
STRIPE_SECRET_KEY
STRIPE_PUBLISHABLE_KEY
NEXT_PUBLIC_POSTHOG_KEY
NEXT_PUBLIC_POSTHOG_HOST
```

### Important Conventions

1. **Light mode first**: Design for light mode, then adapt for dark mode
2. **No backdrop blur on cards**: Only navigation and floating elements use backdrop-filter
3. **Section spacing**: Use `section-padding` class or `py-12 lg:py-24 px-4`
4. **Container width**: `max-w-7xl mx-auto`
5. **Avoid overflow-hidden with sticky**: It breaks sticky positioning
6. **Framer Motion import**: Use `import { motion } from "motion/react"` (not `framer-motion`)

### Provider Hierarchy (in layout.tsx)

```
ThemeProvider → Theme (Radix) → QueryProvider → PostHogProvider → GlobalAnalyticsProvider
```

### Image Sources

Remote patterns configured for:
- res.cloudinary.com (video/image hosting)
- images.ctfassets.net (Contentful CDN)
