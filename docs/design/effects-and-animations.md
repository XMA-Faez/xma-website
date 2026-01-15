# Effects & Animations

This document covers the glassmorphism system and animation patterns used throughout the website.

---

## Glassmorphism Classes

All glass effects are defined in `globals.css`. Note: We intentionally avoid ambient glow decorations.

### Card Glass Effects

These classes are optimized for performance - **no backdrop blur** on card surfaces.

| Class | Light Mode | Dark Mode | Usage |
|-------|------------|-----------|-------|
| `glass-primary` | White solid | Zinc-900/50 | Primary cards |
| `glass-secondary` | White/60 | Zinc-900/50 | Secondary surfaces |
| `glass-tertiary` | White/40 | Zinc-900/50 | Subtle backgrounds |
| `glass-card` | White/60 | Zinc-900/60 | Hover-interactive cards |

```tsx
// Usage
<div className="glass-primary rounded-2xl p-6">
  Card content
</div>
```

### Button Glass Effects

Gradient-based glass buttons:

| Class | Description |
|-------|-------------|
| `glass-button-primary` | Blue gradient, white text |
| `glass-button-secondary` | Cyan gradient |
| `glass-button-tertiary` | Subtle glass |

### Special Glass Effects

| Class | Blur | Usage |
|-------|------|-------|
| `glass-hero` | 10-32px | Hero section overlays |
| `glass-nav-light` | 20px | Navigation bar |
| `glass-float` | 20px | Floating elements with hover lift |
| `glass-dropdown` | 40px | Dropdown menus |
| `glass-dropdown-emerald` | 40px | CRM page dropdown |

```tsx
// Floating glass element with hover lift
<div className="glass-float rounded-xl p-4">
  Floats up 2px on hover
</div>

// Navigation glass
<nav className="glass-nav-light">
  Navigation content
</nav>
```

---

## CSS Animations

### Marquee Animations

Defined in both `globals.css` and `tailwind.config.ts`:

| Animation | Duration | Direction |
|-----------|----------|-----------|
| `marquee-up` | 30s | Vertical up |
| `marquee-down` | 30s | Vertical down |
| `marquee-left` | 25s | Horizontal left |

```tsx
// Usage with Tailwind
<div className="animate-marquee-left">
  Scrolling content
</div>

// Pause on hover (built-in)
.animate-marquee-left:hover {
  animation-play-state: paused;
}
```

### Shimmer Effects

| Animation | Duration | Effect |
|-----------|----------|--------|
| `shimmer` | 3s | Fast shimmer sweep |
| `shimmer-slow` | 4s | Slower shimmer |
| `refraction` | 4s | Shimmer with opacity |

```css
.animate-shimmer {
  animation: shimmer 3s ease-in-out infinite;
}
```

### Gradient Animations

| Animation | Duration | Effect |
|-----------|----------|--------|
| `gradient` | 15s | Background position shift |
| `iridescent` | 8s | Rotation + scale |
| `liquid-pulse` | 2s | Breathing scale effect |

```tsx
// Animated gradient background
<div className="animated-gradient">
  Background animates through dark colors
</div>
```

### Dropdown Animations

```css
@keyframes dropdownSlideIn {
  0% { opacity: 0; transform: translateY(-8px) scale(0.95); }
  100% { opacity: 1; transform: translateY(0) scale(1); }
}

@keyframes dropdownItemSlideIn {
  0% { opacity: 0; transform: translateY(4px); }
  100% { opacity: 1; transform: translateY(0); }
}
```

### Button Hover Effects

The Calypso button effect creates a circular reveal on hover:

```tsx
<button className="button--calypso">
  <span>Hover me</span>
</button>
```

---

## Framer Motion Patterns

We use `motion/react` (v12+) for interactive animations.

### Basic Animation Pattern

```tsx
import { motion } from "motion/react"

<motion.div
  initial={{ opacity: 0, y: 20 }}
  whileInView={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.6 }}
  viewport={{ once: true }}
>
  Animates when scrolled into view
</motion.div>
```

### Stagger Children

```tsx
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
}

<motion.div variants={containerVariants} initial="hidden" animate="visible">
  {items.map(item => (
    <motion.div key={item.id} variants={itemVariants}>
      {item.content}
    </motion.div>
  ))}
</motion.div>
```

### Interactive Feedback

```tsx
<motion.button
  whileHover={{ scale: 1.02 }}
  whileTap={{ scale: 0.98 }}
  transition={{ type: "spring", stiffness: 400, damping: 17 }}
>
  Click me
</motion.button>
```

### AnimatePresence for Exit

```tsx
import { AnimatePresence, motion } from "motion/react"

<AnimatePresence mode="wait">
  {isVisible && (
    <motion.div
      key="modal"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      Modal content
    </motion.div>
  )}
</AnimatePresence>
```

---

## Animation Delays

Utility classes for staggered animations:

```css
.animation-delay-300 { animation-delay: 0.3s; }
.animation-delay-600 { animation-delay: 0.6s; }
```

---

## Gradient Utilities

```css
/* Conic gradient */
.bg-gradient-conic {
  background: conic-gradient(var(--tw-gradient-stops));
}

/* Radial gradient */
.bg-gradient-radial {
  background: radial-gradient(var(--tw-gradient-stops));
}

/* Text gradient */
.gradient-text {
  @apply bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent;
}
```

---

## Text Shadow Utilities

```css
.text-shadow-sm { text-shadow: 0 1px 2px rgba(0, 0, 0, 0.3); }
.text-shadow-md { text-shadow: 0 2px 4px rgba(0, 0, 0, 0.4); }
.text-shadow-lg { text-shadow: 0 4px 8px rgba(0, 0, 0, 0.5); }
```

---

## Performance Tips

1. **Use `will-change: transform`** for animated elements
2. **Avoid animating `width`, `height`, `top`, `left`** - use `transform` instead
3. **Use `viewport={{ once: true }}`** for scroll animations to prevent re-triggering
4. **Keep backdrop-filter usage minimal** - it's expensive on mobile
5. **Prefer CSS animations over JS** for simple effects
