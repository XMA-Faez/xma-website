# Service Colors

Brand color palette for the 5-part Luxury Booking System services.

---

## Color Palette

| Service | Color Name | Hex | OKLCH | Visual |
|---------|------------|-----|-------|--------|
| **Website** | Electric Royal Blue | `#1F6BFF` | `oklch(0.55 0.24 262)` | Trust, premium quality |
| **Creatives** | Hot Magenta | `#FF2E92` | `oklch(0.65 0.30 350)` | Creativity, energy |
| **Paid Ads** | Cyber Yellow | `#FFD400` | `oklch(0.88 0.20 95)` | Value, optimization |
| **WhatsApp** | Tech Mint | `#00FFB3` | `oklch(0.90 0.20 165)` | Speed, automation |
| **CRM** | Deep Purple | `#7A3EFF` | `oklch(0.50 0.30 285)` | Strategy, innovation |

---

## Extended Palette

Additional service colors available for future use:

| Name | Hex | OKLCH | Use Case |
|------|-----|-------|----------|
| Neon Green | `#3CFF4E` | `oklch(0.85 0.25 145)` | SEO Growth Engine |
| Vivid Orange | `#FF6A00` | `oklch(0.70 0.22 45)` | Video Ads |
| Aqua Cyan | `#00E5FF` | `oklch(0.85 0.18 200)` | Conversion Optimization |

---

## Implementation

### Source File

```
app/(website)/(main)/_components/StackingServicesSection/serviceColors.ts
```

### TypeScript Interface

```ts
interface ServiceColor {
  hex: string;
  oklch: string;
  tailwind: string;
  name: string;
}

type ServiceVisualTheme =
  | "website"
  | "creatives"
  | "paidAds"
  | "whatsapp"
  | "crm";
```

### Usage

```tsx
import { serviceColors, getServiceColorHex, getServiceColorOklch } from "./serviceColors"

// Access color object
const websiteColor = serviceColors.website
// { hex: "#1F6BFF", oklch: "oklch(0.55 0.24 262)", ... }

// Get hex value
const hex = getServiceColorHex("creatives") // "#FF2E92"

// Get OKLCH value
const oklch = getServiceColorOklch("paidAds") // "oklch(0.88 0.20 95)"
```

---

## Application

### Card Backgrounds

Use hex with alpha for subtle tints:

```tsx
<div style={{ background: `linear-gradient(135deg, ${hex}15 0%, transparent 100%)` }}>
  {/* 15 = ~8% opacity */}
</div>
```

### Icon Circles

```tsx
<div style={{ backgroundColor: `${hex}15` }}>
  <Icon style={{ color: hex }} />
</div>
```

### Gradient Overlays

```tsx
<div style={{
  background: `linear-gradient(135deg, ${hex}15 0%, oklch(0.15 0.01 0 / 0.95) 100%)`
}}>
  Service card content
</div>
```

---

## Components Using Service Colors

| Component | File | Usage |
|-----------|------|-------|
| StackingCard | `StackingServicesSection/StackingCard.tsx` | Card background gradients |
| ServiceVisual | `StackingServicesSection/ServiceVisual.tsx` | Visual accent colors |
| About Page | `about/page.tsx` | Service section cards |

---

## Color Psychology

Each color was chosen to represent its service:

- **Electric Royal Blue** - Trust, credibility, digital excellence
- **Hot Magenta** - Creativity, boldness, visual impact
- **Cyber Yellow** - Performance, results, measurable value
- **Tech Mint** - Speed, freshness, modern automation
- **Deep Purple** - Strategy, wisdom, premium positioning
