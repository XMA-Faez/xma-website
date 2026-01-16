# Coding Conventions

Development guidelines and standards for the XMA website project.

---

## Package Manager

**Always use `bun`** - never `npm` or `yarn`.

```bash
# Install dependencies
bun install

# Add a package
bun add package-name

# Run scripts
bun run dev
bun run build

# Execute binaries
bunx sanity schema deploy
```

---

## Color Format

**Always use OKLCH** - never `rgb()`, `rgba()`, `hex`, or `hsl()`.

```css
/* Correct */
oklch(0.55 0.24 262)
oklch(0.55 0.24 262 / 0.5)

/* Avoid */
rgb(31, 107, 255)
rgba(31, 107, 255, 0.5)
#1F6BFF
hsl(217, 100%, 56%)
```

### Exception
Hex codes are acceptable in TypeScript for service colors (for compatibility), but always provide OKLCH equivalent:

```ts
export const serviceColors = {
  website: {
    hex: "#1F6BFF",           // For JS/inline styles
    oklch: "oklch(0.55 0.24 262)", // Preferred
  },
}
```

---

## Component Architecture

### Componentize Everything

Pages should be thin orchestrators, not monolithic files. Break down into focused components:

```
app/(website)/(main)/services/
├── page.tsx              # Thin - just imports and arranges sections
└── _components/          # Co-located components
    ├── HeroSection.tsx
    ├── ServiceGrid.tsx
    └── CTASection.tsx
```

### CVA for Variants

Use Class Variance Authority for all component variants:

```tsx
import { cva, type VariantProps } from "class-variance-authority"

const buttonVariants = cva("base-classes", {
  variants: {
    variant: { primary: "...", secondary: "..." },
    size: { sm: "...", md: "...", lg: "..." },
  },
  defaultVariants: {
    variant: "primary",
    size: "md",
  },
})
```

---

## Locality of Behavior

Co-locate feature-specific code with routes using underscore-prefixed folders:

```
app/(website)/(main)/
├── page.tsx
├── _components/         # Route-specific components
│   ├── HeroSection.tsx
│   └── ServicesSection/
│       ├── index.tsx
│       ├── ServiceCard.tsx
│       └── serviceData.ts
├── _hooks/              # Route-specific hooks
│   └── useServiceData.ts
├── _lib/                # Route-specific utilities
│   └── calculations.ts
└── _types/              # Route-specific types
    └── service.ts
```

### Shared Code Locations

Only truly shared code goes in root-level directories:

```
components/ui/           # Design system primitives
lib/                     # Global utilities
types/                   # Shared TypeScript types
```

---

## HTTP Requests

**Use axios instead of fetch**:

```tsx
import axios from "axios"

// Correct
const { data } = await axios.get("/api/endpoint")

// Avoid
const response = await fetch("/api/endpoint")
```

---

## CSS Guidelines

### No Ambient Glow

Never add decorative ambient glows:

```css
/* Avoid */
box-shadow: 0 0 50px rgba(59, 130, 246, 0.5);
```

### No Overflow Hidden with Sticky

Overflow hidden breaks sticky positioning:

```css
/* This breaks sticky children */
.parent {
  overflow: hidden;
  .child { position: sticky; } /* Won't work! */
}
```

### Design Tokens

Use design tokens instead of hardcoded values:

```tsx
// Correct
<div className="p-md gap-lg rounded-main" />

// Avoid
<div className="p-4 gap-8 rounded-lg" />
```

---

## Naming Conventions

### Files
- Components: PascalCase (`ServiceCard.tsx`)
- Utilities: camelCase (`formatDate.ts`)
- Types: camelCase (`service.ts`)
- Data: camelCase (`serviceData.ts`)

### Variables
- Use expressive names over comments
- Avoid abbreviations

```tsx
// Correct
const websiteServiceColor = serviceColors.website.hex

// Avoid
const wsc = sc.website.hex // What does this mean?
```

---

## Comments

Avoid comments - use expressive code instead:

```tsx
// Avoid
// Calculate the total price with tax
const x = price * 1.05

// Correct
const priceWithTax = price * TAX_MULTIPLIER
```

Only add comments for:
- Complex algorithms that can't be simplified
- Workarounds with external dependencies
- TODO markers for known issues

---

## Import Order

1. React/Next.js
2. Third-party libraries
3. Internal aliases (`@/`)
4. Relative imports
5. Types (last)

```tsx
import React from "react"
import { motion } from "motion/react"
import axios from "axios"

import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

import { ServiceCard } from "./_components/ServiceCard"

import type { Service } from "./_types/service"
```

---

## TypeScript

- Always define explicit types for props
- Export types alongside components when reusable
- Use `interface` for object shapes, `type` for unions

```tsx
interface ServiceCardProps {
  title: string
  description: string
  color: ServiceColor
}

type ServiceStatus = "active" | "pending" | "completed"
```

---

## Testing

Run tests before committing:

```bash
bun run test
bun run lint
bun run type-check
```
