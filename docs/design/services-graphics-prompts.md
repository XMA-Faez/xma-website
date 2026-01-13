# AI Graphic Generation Prompts for Services Section

## Overview

Style: **Abstract Tech Patterns (Circuit/Node Style)**
Inspiration: Stripe website, automotive dashboard + tech aesthetic
Output: Clean vector illustrations for the 4 services in `StackingServicesSection`

---

## Recommended AI Tools

| Tool | Best For | Notes |
|------|----------|-------|
| **Recraft AI** | **Best for vector/SVG style** | Specifically designed for illustrations, free tier |
| **Midjourney** | Highest quality, most stylistic control | Use `--v 6` or `--v 7`, needs Discord |
| **DALL-E 3** (ChatGPT) | Easy access, good for concepts | Can request SVG-friendly outputs |
| **Adobe Firefly** | Vector-friendly outputs | Good for clean graphics |
| **Ideogram** | Text + graphics, free tier | Good for tech aesthetics |

**Primary recommendation:** Start with **Recraft AI** (recraft.ai) — designed for vector illustrations, gives cleaner outputs.

---

## Base Style Prompt (Prefix for all services)

Add this to the beginning of each service prompt:

```
Abstract tech illustration, circuit board aesthetic, node and connection line diagram,
dark background (#18181b), glowing blue accent color (#3b82f6),
minimal geometric shapes, clean vector style, no text,
subtle automotive dashboard inspiration, premium tech aesthetic,
soft gradient glow on nodes, thin connection lines,
Stripe website illustration style, modern SaaS graphic
```

---

## Service 1: Website (Conversion-Optimized Website)

### Full Prompt

```
Abstract tech illustration of a website/digital presence concept.

Central element: stylized browser window shape made of glowing nodes and lines.
Connected to: mobile device node, globe/world node, speed indicator lines.
Visual metaphor: data flowing from website to multiple touchpoints.

Include:
- Horizontal speed lines suggesting fast performance
- Small nodes representing visitors/conversions flowing inward
- Subtle grid pattern in background
- Central hub radiating outward connections

Style: circuit board aesthetic, node diagram, dark background (#18181b),
glowing blue (#3b82f6) and subtle purple (#8b5cf6) accents,
clean vector illustration, no text, premium tech feel,
Stripe-style abstract graphic
```

### Short Version

```
Abstract node diagram of website connectivity, browser window as central glowing node,
mobile and globe nodes connected by thin lines, speed lines, circuit board aesthetic,
dark zinc background, blue glow accents, clean vector style, tech illustration, no text
```

---

## Service 2: Ad Creatives (High-End Ad Creatives)

### Full Prompt

```
Abstract tech illustration representing video and creative production.

Central element: play button or camera aperture shape made of connected nodes.
Connected to: multiple frame/screen nodes arranged in a storyboard pattern.
Visual metaphor: creative content flowing to multiple platforms.

Include:
- Geometric frame shapes (rectangles) suggesting video frames
- Nodes arranged in a cinematic aspect ratio pattern
- Light rays or focus lines emanating from center
- Small sparkle nodes suggesting premium quality

Style: circuit board aesthetic, node diagram, dark background (#18181b),
glowing blue (#3b82f6) accents, clean vector illustration, no text,
camera/aperture inspiration, premium tech feel, Stripe-style abstract graphic
```

### Short Version

```
Abstract node diagram of video production, play button as central glowing node,
connected to floating frame rectangles, aperture-inspired circular pattern,
light rays, circuit aesthetic, dark zinc background, blue glow,
clean vector style, cinematic tech illustration, no text
```

---

## Service 3: Paid Ads (Paid Ads That Qualify Leads)

### Full Prompt

```
Abstract tech illustration representing targeted advertising and lead qualification.

Central element: target/crosshair shape made of concentric node circles.
Connected to: funnel shape flowing downward, chart/growth nodes.
Visual metaphor: filtering many inputs down to qualified outputs.

Include:
- Funnel pattern with nodes narrowing from top to bottom
- Ascending dots or line suggesting growth/ROI
- Target rings with precision lines
- Small currency or conversion indicator nodes at the output

Style: circuit board aesthetic, node diagram, dark background (#18181b),
glowing blue (#3b82f6) accents, clean vector illustration, no text,
dashboard gauge inspiration, premium tech feel, Stripe-style abstract graphic
```

### Short Version

```
Abstract node diagram of marketing funnel and targeting, target crosshair as central node,
funnel shape with filtering nodes, upward growth chart line,
circuit aesthetic, dark zinc background, blue glow accents,
precision lines, clean vector style, analytics tech illustration, no text
```

---

## Service 4: CRM (Custom CRM Built for Rentals)

### Full Prompt

```
Abstract tech illustration representing CRM pipeline and customer management.

Central element: kanban/pipeline board shape made of connected node columns.
Connected to: user profile nodes, database node, calendar/timeline element.
Visual metaphor: customers flowing through stages in a system.

Include:
- Three or four vertical columns suggesting pipeline stages
- Small circular user/avatar nodes moving through stages
- Horizontal flow lines showing progression
- Database or server node at the base
- Timeline or calendar grid pattern

Style: circuit board aesthetic, node diagram, dark background (#18181b),
glowing blue (#3b82f6) and subtle green (#22c55e) accents for success states,
clean vector illustration, no text, dashboard inspiration,
premium tech feel, Stripe-style abstract graphic
```

### Short Version

```
Abstract node diagram of CRM pipeline, kanban board columns as node groups,
small user nodes flowing through stages, database node at base,
horizontal flow lines, circuit aesthetic, dark zinc background,
blue and green glow accents, clean vector style, dashboard tech illustration, no text
```

---

## Prompt Modifiers

Add these to adjust your output:

| Want | Add to prompt |
|------|---------------|
| **More minimal** | `"extremely minimal, fewer elements, more whitespace, essential shapes only"` |
| **More detailed** | `"intricate connections, dense node network, detailed circuit patterns"` |
| **More automotive** | `"speedometer gauge elements, racing stripe accents, aerodynamic curves"` |
| **More glow** | `"neon glow effect, light bloom, luminous nodes"` |
| **Less glow** | `"subtle glow, matte finish, soft highlights"` |
| **Horizontal format** | `"wide landscape format, 16:9 aspect ratio, horizontal composition"` |
| **Square format** | `"square format, 1:1 aspect ratio, centered composition"` |

---

## Platform-Specific Settings

| Platform | Settings |
|----------|----------|
| **Midjourney** | Add `--ar 16:9` or `--ar 4:3`, use `--v 6` or `--style raw` |
| **DALL-E 3** | Request "wide landscape format" in prompt |
| **Recraft AI** | Select "Illustration" → "Vector" style, set canvas to landscape |
| **Ideogram** | Use "Render" mode for cleaner outputs |

---

## Quick Start Workflow

1. **Go to Recraft.ai** (free tier available)
2. **Set canvas** to landscape (1200x800 or similar)
3. **Select style**: Vector Illustration
4. **Paste the full prompt** for Service 1 (Website)
5. **Generate 4 variations**, pick best one
6. **Download as SVG**
7. **Repeat** for other 3 services
8. **Clean up** in Figma if needed

---

## Post-Generation Cleanup

AI-generated graphics often need cleanup:

1. **Remove background** - Use remove.bg or Figma
2. **Convert to SVG** - Use vectorizer.ai or Adobe Illustrator's Image Trace
3. **Adjust colors** - Match exactly to your OKLCH palette:
   - Blue: `oklch(0.6 0.2 250)` or `#3b82f6`
   - Purple: `oklch(0.55 0.25 280)` or `#8b5cf6`
   - Green: `oklch(0.6 0.2 145)` or `#22c55e`
   - Background: `oklch(0.14 0.005 285)` or `#18181b`
4. **Optimize file size** - Use SVGO or svgomg.net

---

## Brand Color Reference

```css
/* Primary Blue */
--blue: oklch(0.6 0.2 250);  /* #3b82f6 equivalent */

/* Accent Purple */
--purple: oklch(0.55 0.25 280);  /* #8b5cf6 equivalent */

/* Success Green */
--green: oklch(0.6 0.2 145);  /* #22c55e equivalent */

/* Background Dark */
--zinc-900: oklch(0.14 0.005 285);  /* #18181b equivalent */
--zinc-950: oklch(0.09 0.005 285);  /* #09090b equivalent */
```

---

## Implementation Notes

Once graphics are generated:

1. Save SVGs to `/public/services/` folder
2. Update `servicesData.ts` to reference new graphics
3. Modify `ServiceVisual` component to render SVG instead of gradient orbs
4. Consider adding subtle CSS animations (hover scale, opacity transitions)

---

## File Locations

- **Services Section**: `app/(website)/(main)/_components/StackingServicesSection/`
- **Services Data**: `app/(website)/(main)/_components/StackingServicesSection/servicesData.ts`
- **Public Assets**: `/public/` (create `/public/services/` for new graphics)
