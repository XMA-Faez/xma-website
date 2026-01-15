# Component Library

All UI components use **Class Variance Authority (CVA)** for variant management. Components are located in `components/ui/`.

---

## Button

**File:** `components/ui/button.tsx`

Basic button component with Radix Slot support for polymorphic rendering.

### Variants

| Variant | Description |
|---------|-------------|
| `default` | Primary filled button |
| `destructive` | Danger/delete actions |
| `outline` | Bordered button |
| `secondary` | Muted secondary actions |
| `ghost` | Transparent, hover-only |
| `link` | Text link style |

### Sizes

| Size | Height | Padding |
|------|--------|---------|
| `sm` | h-8 | px-3 |
| `default` | h-9 | px-4 |
| `lg` | h-10 | px-8 |
| `icon` | h-9 w-9 | - |

### Usage

```tsx
import { buttonVariants } from "@/components/ui/button"

// As className
<button className={buttonVariants({ variant: "outline", size: "lg" })}>
  Click me
</button>

// With asChild for custom elements
<Button asChild>
  <Link href="/page">Go to page</Link>
</Button>
```

---

## Badge

**File:** `components/ui/Badge.tsx`

Status indicators and labels with color variants.

### Variants

| Variant | Colors |
|---------|--------|
| `default` | Emerald (green) |
| `primary` | Blue |
| `secondary` | Slate/Zinc |
| `success` | Emerald (alias) |
| `warning` | Amber |
| `danger` | Red |
| `purple` | Purple |

### Sizes

| Size | Padding | Text |
|------|---------|------|
| `sm` | px-3 py-1 | text-xs |
| `md` | px-4 py-2 | text-sm |
| `lg` | px-6 py-3 | text-base |

### Usage

```tsx
import { Badge } from "@/components/ui/Badge"

<Badge variant="primary" size="sm">New</Badge>
<Badge variant="success">Active</Badge>
<Badge variant="danger">Error</Badge>
```

---

## ScanningButton

**File:** `components/ui/ScanningButton.tsx`

Premium animated CTA button with shimmer effects and motion animations.

### Features
- Animated gradient shimmer on hover
- Color-coded variants matching service colors
- Event tracking support via `trackEvent` prop
- Motion-based smooth animations

### Variants

| Variant | Description |
|---------|-------------|
| `primary` | Filled with shimmer |
| `outline` | Bordered with glow |
| `ghost` | Minimal style |

### Colors

| Color | Hex |
|-------|-----|
| `blue` | #1F6BFF |
| `emerald` | #10B981 |
| `purple` | #7A3EFF |
| `cyan` | #00FFB3 |
| `yellow` | #FFD400 |
| `magenta` | #FF2E92 |

### Sizes

| Size | Padding | Text |
|------|---------|------|
| `sm` | px-4 py-2 | text-sm |
| `md` | px-6 py-2.5 | text-base |
| `lg` | px-8 py-3 | text-lg |

### Usage

```tsx
import { ScanningButton } from "@/components/ui/ScanningButton"

<ScanningButton variant="primary" color="blue" size="lg">
  Get Started
</ScanningButton>

// With tracking
<ScanningButton
  variant="outline"
  color="emerald"
  trackEvent={{ name: "cta_click", properties: { location: "hero" } }}
>
  Learn More
</ScanningButton>
```

---

## ThemeToggle

**File:** `components/ui/ThemeToggle.tsx`

Theme switcher with smooth icon animations.

### Variants

| Component | Description |
|-----------|-------------|
| `ThemeToggle` | Compact icon button |
| `ThemeToggleLarge` | Larger standalone toggle |

### Usage

```tsx
import { ThemeToggle, ThemeToggleLarge } from "@/components/ui/ThemeToggle"

// In navigation
<ThemeToggle />

// Standalone
<ThemeToggleLarge />
```

---

## Input & Textarea

**Files:** `components/ui/input.tsx`, `components/ui/textarea.tsx`

Form inputs with consistent styling.

### Usage

```tsx
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"

<Input type="email" placeholder="Enter email" />
<Textarea placeholder="Your message" rows={4} />
```

---

## LogoMarquee

**File:** `components/ui/LogoMarquee.tsx`

Infinite scrolling logo strip for client showcases.

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `logos` | `Logo[]` | required | Array of logo objects |
| `speed` | `"slow" \| "normal" \| "fast"` | `"normal"` | Animation speed |
| `containerHeight` | `number` | `50` | Fixed container height |

### Logo Object

```ts
interface Logo {
  src: string;
  alt: string;
  height: number;  // Height-controlled sizing
}
```

### Usage

```tsx
import { LogoMarquee, type Logo } from "@/components/ui/LogoMarquee"

const logos: Logo[] = [
  { src: "/logos/client1.png", alt: "Client 1", height: 40 },
  { src: "/logos/client2.svg", alt: "Client 2", height: 50 },
]

<LogoMarquee logos={logos} speed="normal" containerHeight={60} />
```

---

## Other Components

### Switch
Toggle switch component based on Radix.

### Sheet
Slide-out panel/drawer component.

### AlertDialog
Modal dialog for confirmations.

### DropdownMenu
Context menus and dropdown navigation.

### NavigationMenu
Main navigation with dropdowns.

### Section
Layout wrapper component.

---

## CVA Pattern

All components follow this pattern:

```tsx
import { cva, type VariantProps } from "class-variance-authority"

const componentVariants = cva(
  "base-classes-here", // Base styles
  {
    variants: {
      variant: {
        default: "variant-specific-classes",
        // ...
      },
      size: {
        sm: "size-classes",
        // ...
      },
    },
    defaultVariants: {
      variant: "default",
      size: "md",
    },
  }
)

interface ComponentProps extends VariantProps<typeof componentVariants> {
  // additional props
}
```

---

## File Locations

```
components/
└── ui/
    ├── Badge.tsx
    ├── button.tsx
    ├── ScanningButton.tsx
    ├── ThemeToggle.tsx
    ├── LogoMarquee.tsx
    ├── input.tsx
    ├── textarea.tsx
    ├── switch.tsx
    ├── sheet.tsx
    ├── alert-dialog.tsx
    ├── dropdown-menu.tsx
    ├── navigation-menu.tsx
    └── section.tsx
```
