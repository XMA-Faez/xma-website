# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

bun run dev          # Start development server
bun run build        # Production build
bun run start        # Start production server
bun run lint         # ESLint
bun run knip         # Find unused files/dependencies
bun run sync:blogs   # Sync blogs from Contentful

Always use `bun` — never `npm` or `yarn`.

## Architecture

**Stack:** Next.js 16 (App Router), React 19, TypeScript, Tailwind CSS 3.4, Sanity CMS, PostHog analytics

**What this site is:** Marketing website for XMA Agency — a growth systems agency in Dubai that designs and implements marketing, sales, and conversion systems to help businesses generate leads, acquire customers, and scale revenue predictably.

**Route structure** uses grouped routes under `app/(website)/`:
- `(main)/` — homepage, about, contact, FAQ, and all primary pages:
  - `solutions/` — solutions overview and 5 individual solution pages (growth-launch-system, ecommerce-engine, b2b-lead-generation, crm-system, conversion-acceleration)
  - `apply/` — application form for prospective clients
  - `case-studies/` — case studies showcase
- `blog/` — blog listing and `[slug]` detail (legacy, kept live)
- `(booking)/` — book, book-crm, success, cancel (legacy, kept live)
- `(legal)/` — privacy-policy, terms-conditions
- `portfolio/` — portfolio showcase (legacy, kept live)
- `services/` — crm-solution, lead-generation, website-creation (legacy, kept live)
- `app/studio/[[...tool]]/` — embedded Sanity Studio
- `app/api/leads/` — lead capture webhook endpoint

**Provider hierarchy** (app/layout.tsx):
ThemeProvider → Radix Theme → QueryProvider → PostHogProvider → GlobalAnalyticsProvider

**Shared code** lives in root-level directories:
- `components/ui/` — CVA-based design system primitives (Button, Badge, Input, etc.)
- `components/providers/` — ThemeProvider, PostHogProvider, QueryProvider
- `components/seo/` — JsonLd structured data
- `components/landing-page/` — homepage section components (Hero, About, Products, Services, Process, CTA, FAQ)
- `lib/` — utils.ts (cn helper), posthog-events.ts
- `sanity/` — CMS config, schemas (blogPost, gallery, showcaseWebsite), data-fetching libs
- `data/` — static content/data files
- `utils/` — utility functions (e.g. cloudinary helpers)

**Feature-specific code** is co-located with routes using underscore-prefixed folders:
- `_components/`, `_hooks/`, `_lib/`, `_types/` inside each route directory

## Key Conventions

**Styling:** OKLCH color format only in CSS — never rgb, hex, or hsl. Use Tailwind design tokens (`p-md`, `gap-lg`, `rounded-main`) over raw values (`p-4`, `gap-8`, `rounded-lg`).

**Components:** Use Class Variance Authority (CVA) for all component variants. Pages should be thin orchestrators importing section components from `_components/`.

**HTTP:** Use axios, not fetch.

**CSS rules:** No ambient glow decorations. No `overflow: hidden` on parents with sticky children.

**Naming:** Expressive variable/function names instead of comments. Components: PascalCase. Utilities/data: camelCase.

**Import order:** React/Next → third-party → `@/` aliases → relative → types

**TypeScript:** `interface` for object shapes, `type` for unions. Path alias `@/*` maps to project root.

**Fonts:** Manrope (--font-primary), DM Sans (--font-secondary). Display: Cormorant Garamond. Sans: Inter.

**Theme:** Dark mode forced via next-themes. Color tokens defined as CSS variables in globals.css. Ruby OKLCH scale in tailwind.config.ts.

**Animation:** Uses `motion` (Framer Motion) for scroll-triggered animations and parallax. Glassmorphism utility classes (glass-primary, glass-secondary, glass-hero, etc.) defined in globals.css.

## Environment Variables

Required:
- `NEXT_PUBLIC_SANITY_PROJECT_ID`, `NEXT_PUBLIC_SANITY_DATASET` — Sanity CMS
- `NEXT_PUBLIC_POSTHOG_KEY` — analytics
- `WEBHOOK_URL` — lead capture endpoint (server-side only)

Optional:
- `NEXT_PUBLIC_GTM_ID` — Google Tag Manager
- `NEXT_PUBLIC_GA_MEASUREMENT_ID` — Google Analytics
- `NEXT_PUBLIC_SANITY_API_VERSION` — defaults to 2026-01-07

## Landing Page Shared Components

Reusable sub-components for SEO landing pages live in `app/(website)/(main)/_components/landing-pages/_shared/`:

**Utilities:**
- `accent-utils.ts` — `deriveAccentTokens()`, `mapAccentToButtonColor()`, `AccentTokens` and `ButtonColor` types
- `icon-map.ts` — `ICON_MAP` record and `resolveIcon()` helper (60+ lucide icons)

**Components (all accept `accentTokens: AccentTokens`):**
- `LandingHero.tsx` — Split-screen 60/40 hero with badge, H1, subtitle, CTA, decorative floating shapes
- `StatsStrip.tsx` — Animated counter strip with spring physics via `useMotionValue`
- `PainPointBento.tsx` — Bento grid (2fr/1fr) for pain points with icon tiles
- `ProcessTimeline.tsx` — Alternating left/right vertical timeline with numbered steps
- `FAQAccordion.tsx` — Animated accordion with FAQ JSON-LD schema injection
- `LandingCTA.tsx` — Bottom CTA with radial gradient and fade-up animation
- `CrossLinkGrid.tsx` — Related page cards grid with hover lift
- `TestimonialCard.tsx` — Case study spotlight with challenge/solution/result flow

Types are defined at `data/landing-pages/types.ts`.

## Documentation

Detailed docs live in `/docs/`:
- `design/design-system.md` — color system, typography, spacing tokens
- `design/component-library.md` — UI component specs and usage
- `design/effects-and-animations.md` — glassmorphism, motion patterns
- `coding-conventions.md` — full development guidelines
- `analytics/` — PostHog implementation details
- `crm/` — CRM feature architecture and API specs
- `services/` — service page specifications
