# Design System

This document defines the design tokens and visual language for the XMA website.

## Color System

### Philosophy

We use **OKLCH color space** as our primary color format. OKLCH provides perceptually uniform colors, making it easier to create harmonious palettes and predictable color transformations.

```css
/* Preferred format */
oklch(0.55 0.24 262)  /* lightness, chroma, hue */

/* Avoid */
rgb(31, 107, 255)
#1F6BFF
```

### Theme Variables (HSL)

CSS variables for theming are defined in `globals.css`:

| Variable | Light Mode | Dark Mode | Usage |
|----------|------------|-----------|-------|
| `--background` | `0 0% 100%` | `0 0% 4%` | Page background |
| `--foreground` | `240 10% 3.9%` | `0 0% 98%` | Primary text |
| `--primary` | `217 91% 60%` | `217 91% 60%` | Primary actions |
| `--secondary` | `240 4.8% 95.9%` | `240 3.7% 15.9%` | Secondary surfaces |
| `--muted` | `240 4.8% 95.9%` | `240 3.7% 15.9%` | Muted backgrounds |
| `--accent` | `240 4.8% 95.9%` | `240 3.7% 15.9%` | Accent elements |
| `--destructive` | `0 84.2% 60.2%` | `0 62.8% 30.6%` | Error states |
| `--border` | `240 5.9% 90%` | `240 3.7% 15.9%` | Borders |
| `--ring` | `217 91% 60%` | `217 91% 60%` | Focus rings |

### Ruby Color Scale (OKLCH)

Custom color scale defined in `tailwind.config.ts`:

```
ruby-50:  oklch(0.96 0.014 12.15)
ruby-100: oklch(0.926 0.025 14.67)
ruby-200: oklch(0.852 0.056 12.86)
ruby-300: oklch(0.778 0.091 14.21)
ruby-400: oklch(0.706 0.133 15.25)
ruby-500: oklch(0.634 0.183 16.21)
ruby-600: oklch(0.555 0.17 17.05)
ruby-700: oklch(0.475 0.145 16.9)
ruby-800: oklch(0.393 0.12 16.83)
ruby-900: oklch(0.269 0.082 17.29)
ruby-950: oklch(0.206 0.062 16.79)
```

---

## Typography

### Font Families

| Family | Font | Usage |
|--------|------|-------|
| `font-display` | Cormorant Garamond, Georgia, serif | Headings, hero text |
| `font-sans` | Inter, system-ui, sans-serif | Body text, UI elements |

### Heading Classes

```css
/* Hero headings - large display text */
.heading-hero {
  @apply text-5xl/[1.07] md:text-7xl/[1.07];
  /* Uses gradient from white to soft blue */
}

/* Section headings */
.heading-section {
  @apply text-4xl md:text-5xl font-semibold leading-[1.1];
}
```

### Default Styles

```css
h1 { @apply text-5xl md:text-6xl font-bold md:leading-[1.3]; }
h2 { @apply md:text-4xl text-3xl font-bold leading-[1.3]; }
h3 { font-size: 2rem; }
p  { @apply md:text-lg text-base; }
```

---

## Spacing Scale

| Token | Value | Usage |
|-------|-------|-------|
| `xs` | 4px | Tight spacing |
| `sm` | 8px | Small gaps |
| `md` | 16px | Default spacing |
| `lg` | 32px | Section gaps |
| `xl` | 64px | Large sections |
| `2xl` | 128px | Hero spacing |

```tsx
// Usage
<div className="p-md gap-lg" />
<div className="py-xl px-md" />
```

---

## Border Radius

| Token | Value | Usage |
|-------|-------|-------|
| `main` | 8px | Default buttons, cards |
| `4xl` | 60px | Pills, large rounded elements |
| `lg` | var(--radius) | Large elements |
| `md` | calc(var(--radius) - 2px) | Medium elements |
| `sm` | calc(var(--radius) - 4px) | Small elements |

```tsx
// Usage
<button className="rounded-main" />
<div className="rounded-4xl" />
```

---

## Backdrop Blur Scale

| Token | Value |
|-------|-------|
| `xs` | 2px |
| `sm` | 4px |
| `md` | 8px |
| `lg` | 12px |
| `xl` | 16px |
| `2xl` | 24px |
| `3xl` | 32px |

---

## Layout Utilities

### Section Padding

```css
.section-padding {
  @apply py-12 lg:py-24 px-4;
}

.spacing {
  @apply md:px-24 px-4;
}
```

### Grid

Custom 30-column grid available:

```tsx
<div className="grid grid-cols-30" />
```

---

## Dark Mode

Theme switching is handled via `next-themes` with the `class` strategy:

```tsx
// tailwind.config.ts
darkMode: ["class"]

// CSS variables automatically switch
.dark {
  --background: 0 0% 4%;
  --foreground: 0 0% 98%;
  /* ... */
}
```

---

## File References

| File | Purpose |
|------|---------|
| `tailwind.config.ts` | Token definitions, plugins |
| `app/globals.css` | CSS variables, utilities |
| `components/ui/` | CVA-based components |
