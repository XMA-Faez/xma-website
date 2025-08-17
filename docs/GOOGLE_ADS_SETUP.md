# Google Ads Setup Guide

## Pre-Launch Checklist

### 1. Account Setup
- [ ] Create Google Ads account at ads.google.com
- [ ] Set up billing information
- [ ] Link Google Analytics 4 property
- [ ] Link Google Tag Manager
- [ ] Verify domain ownership

### 2. Get Your Tracking IDs
1. **Google Tag Manager ID**: 
   - Go to tagmanager.google.com
   - Create container for your website
   - Copy GTM-XXXXXXX ID

2. **Google Analytics 4 ID**:
   - Go to analytics.google.com
   - Admin → Data Streams → Web
   - Copy G-XXXXXXXXXX ID

3. **Google Ads Conversion ID**:
   - Google Ads → Tools → Conversions
   - Create conversion actions for:
     - Contact form submission
     - Booking/demo request
     - Phone calls
     - Newsletter signup
   - Copy AW-XXXXXXXXX ID and labels

### 3. Environment Variables
Create `.env.local` file:
```env
NEXT_PUBLIC_GTM_ID=GTM-XXXXXXX
NEXT_PUBLIC_GA_MEASUREMENT_ID=G-XXXXXXXXXX
NEXT_PUBLIC_GOOGLE_ADS_ID=AW-XXXXXXXXX
NEXT_PUBLIC_GOOGLE_ADS_CONVERSION_LABEL_CONTACT=XXXXXXXXX
NEXT_PUBLIC_GOOGLE_ADS_CONVERSION_LABEL_BOOKING=XXXXXXXXX
```

## Campaign Types & Best Practices

### 1. Search Campaigns
**Best for**: Capturing high-intent traffic
```
Budget: $50-100/day starting
Bidding: Max conversions or Target CPA
Keywords: Start with exact match, expand to phrase match
```

### 2. Performance Max Campaigns
**Best for**: Automated optimization across all Google properties
```
Budget: $100+/day recommended
Assets needed:
- 15+ images (1200x628, 1200x1200, etc.)
- 5+ logos
- 5+ videos (optional but recommended)
- Headlines (30 char max): 15+
- Long headlines (90 char): 5+
- Descriptions (90 char): 5+
```

### 3. Remarketing Campaigns
**Best for**: Re-engaging website visitors
```
Audience segments:
- All visitors (30 days)
- Cart abandoners
- Product viewers
- Blog readers
Budget: 20-30% of search budget
```

## Conversion Tracking Implementation

### Form Submissions
```tsx
// In your form component
import { useGoogleAds } from "@/hooks/useGoogleAds";

const { trackConversion } = useGoogleAds();

// On successful submission
trackConversion("contact_form");
```

### Button Clicks
```tsx
// Use TrackedButton component
<TrackedButton
  trackingName="hero_cta"
  conversionType="booking"
>
  Book a Demo
</TrackedButton>
```

### E-commerce Tracking
```tsx
// Track purchase
import { trackPurchase } from "@/lib/google-ads";

trackPurchase({
  transaction_id: "12345",
  value: 99.99,
  currency: "USD",
  items: [
    {
      item_id: "SKU123",
      item_name: "Product Name",
      price: 99.99,
      quantity: 1
    }
  ]
});
```

## Testing Your Implementation

### 1. Google Tag Assistant
1. Install Chrome extension
2. Navigate to your website
3. Verify tags are firing:
   - GA4 Configuration
   - Google Ads Remarketing
   - Conversion events

### 2. Google Analytics DebugView
1. GA4 → Admin → DebugView
2. Enable debug mode in browser
3. Test all conversion events

### 3. Google Ads Conversion Testing
1. Google Ads → Tools → Conversions
2. Click on conversion action
3. Check "Webpages" tab for recent conversions

## Optimization Tips

### Landing Page Quality Score
- Page load speed < 3 seconds
- Mobile responsive design
- Clear value proposition
- Prominent CTAs
- Trust signals (testimonials, certifications)
- Privacy policy and terms

### Ad Copy Best Practices
```
Headlines:
- Include keywords
- Highlight unique value
- Use numbers/statistics
- Create urgency

Descriptions:
- Expand on benefits
- Include social proof
- Clear call-to-action
- Use ad extensions
```

### Bidding Strategies

**Week 1-2**: Manual CPC
- Start with conservative bids
- Monitor search terms report
- Add negative keywords

**Week 3-4**: Maximize Clicks
- Let algorithm learn
- Set max CPC limit

**Week 5+**: Max Conversions/Target CPA
- Need 30+ conversions/month
- Set realistic target CPA

## Budget Recommendations

### Small Business ($1,000-3,000/month)
- 60% Search campaigns
- 30% Performance Max
- 10% Remarketing

### Growth Stage ($3,000-10,000/month)
- 40% Search campaigns
- 40% Performance Max
- 10% Display/Video
- 10% Remarketing

### Scale Stage ($10,000+/month)
- 30% Search campaigns
- 35% Performance Max
- 15% Shopping (if applicable)
- 10% YouTube
- 10% Remarketing

## Common Issues & Solutions

### Low Quality Score
- Improve ad relevance
- Optimize landing pages
- Increase CTR with better ad copy
- Add negative keywords

### High CPC
- Review search terms report
- Add negative keywords
- Improve quality score
- Test different match types
- Adjust location targeting

### Low Conversion Rate
- Test landing pages
- Improve page speed
- Simplify forms
- Add trust signals
- Create urgency

## Monitoring & Reporting

### Weekly Checks
- Search terms report
- Conversion tracking status
- Budget pacing
- Negative keyword opportunities

### Monthly Analysis
- Cost per conversion trends
- Campaign performance comparison
- Landing page performance
- Audience insights
- Competitor analysis

## Compliance & Policies

### Required Pages
- Privacy Policy (must mention cookies/tracking)
- Terms of Service
- Contact information
- Business address

### Cookie Consent
- Implement cookie banner
- Allow opt-out
- Update privacy policy
- GDPR/CCPA compliance

## Support Resources

- [Google Ads Help Center](https://support.google.com/google-ads)
- [Google Analytics Academy](https://analytics.google.com/analytics/academy/)
- [Tag Manager Fundamentals](https://tagmanager.google.com/resources/)
- [Google Ads Editor](https://ads.google.com/home/tools/ads-editor/)