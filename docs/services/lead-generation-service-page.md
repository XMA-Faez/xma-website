# Lead Generation Service Page

> **Route:** `/services/lead-generation/`
> **Color Theme:** Cyber Yellow (amber Tailwind classes)
> **Target Audience:** UAE businesses looking for Google Ads and Meta Ads lead generation
> **Primary CTA:** Book Your Free Ad Audit -> `/book`

---

## Page Architecture

```
page.tsx              -> Server Component (SEO metadata, JSON-LD, renders client)
page-client.tsx       -> Client Component (Hero + section layout with ErrorBoundaries)
_components/
  ErrorBoundary.tsx         -> LeadGenErrorBoundary (amber-themed)
  PlatformShowcase.tsx      -> Google Ads + Meta Ads panels
  LeadGenFeatures.tsx       -> 4 core features with demo components
  CampaignROICalculator.tsx -> Interactive slider-based ROI calculator
  LeadGenCTA.tsx            -> Progressive CTA (testimonials + final positions)
  LeadGenAssessment.tsx     -> 7-question ad readiness assessment
  LeadGenFAQ.tsx            -> 17 FAQs across 7 categories
  feature-demos/
    index.ts                    -> Barrel exports
    AdPerformanceDashboard.tsx  -> Mock metrics dashboard
    CampaignBuilder.tsx         -> Campaign setup progress visualization
    AudienceTargetingDemo.tsx   -> Concentric circles targeting layers
    LeadQualificationFlow.tsx   -> Funnel visualization
```

## Section Flow

1. **Hero** - Badge "Trusted by 200+ UAE Businesses", headline, subtitle, CTA
2. **PlatformShowcase** - Side-by-side Google Ads + Meta Ads panels
3. **LeadGenFeatures** - 4 features: Campaign Strategy, Audience Targeting, Performance Analytics, Lead Qualification
4. **CampaignROICalculator** - Sliders for budget/CPL/leads + industry dropdown
5. **LeadGenCTA (testimonials)** - Social proof with 3.5x ROAS, 40% Lower CPL
6. **LeadGenAssessment** - 7-question ad readiness quiz
7. **LeadGenFAQ** - 17 FAQs with search and category filters
8. **LeadGenCTA (final)** - Book free ad audit + WhatsApp CTA

## Color Mapping (CRM emerald -> Lead Gen amber)

| CRM Page              | Lead Gen Page          |
|-----------------------|------------------------|
| `text-emerald-400`    | `text-amber-400`       |
| `from-emerald-400`    | `from-amber-400`       |
| `border-emerald-500/20` | `border-amber-500/20` |
| `bg-emerald-500/20`   | `bg-amber-500/20`      |
| `Badge variant="success"` | `Badge variant="warning"` |
| `ScanningButton color="emerald"` | `ScanningButton color="amber"` |
| Background `rgba(16,185,129,...)` | Background `rgba(245,158,11,...)` |

## SEO

- **Title:** "Lead Generation & Paid Ads for UAE Businesses | Google & Meta Ads Dubai"
- **Keywords:** lead generation Dubai, Google Ads Dubai, Meta Ads UAE, digital advertising Dubai
- **JSON-LD:** Organization, WebPage with Breadcrumbs, Service (serviceType: Digital Advertising)
- **Canonical:** `/services/lead-generation`

## Pattern Source

All components follow the exact structural patterns from `/services/crm-solution/` with amber color substitution.
