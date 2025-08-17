# Google Side Setup - Complete Implementation Guide

## Overview
This guide covers everything you need to set up on Google's platforms before launching your ads. Follow these steps in order.

---

## STEP 1: Google Account Setup

### 1.1 Create/Verify Google Business Account
1. Go to [accounts.google.com](https://accounts.google.com)
2. Use a business email (preferably @yourdomain.com)
3. Enable 2-factor authentication for security

### 1.2 Verify Domain Ownership
1. Go to [search.google.com/search-console](https://search.google.com/search-console)
2. Add your property (website)
3. Choose verification method:
   - **Recommended**: HTML tag (we already have this in layout.tsx)
   - Alternative: DNS TXT record
4. Click "Verify"

---

## STEP 2: Google Analytics 4 Setup

### 2.1 Create GA4 Property
1. Go to [analytics.google.com](https://analytics.google.com)
2. Click **Admin** (gear icon) → **Create Property**
3. Enter property details:
   - Property name: "XMA Agency Website"
   - Time zone: Your business timezone
   - Currency: USD
   - Industry category: "Business & Industrial Services"
   - Business size: Select appropriate

### 2.2 Set Up Web Data Stream
1. In GA4 Property → **Data Streams** → **Add stream** → **Web**
2. Enter:
   - Website URL: `https://yourdomain.com`
   - Stream name: "XMA Main Website"
3. Copy your **Measurement ID** (G-XXXXXXXXXX)
4. Save this ID for `.env.local`

### 2.3 Configure Enhanced Measurement
1. In Data Stream → **Enhanced measurement** (gear icon)
2. Enable all:
   - [x] Page views
   - [x] Scrolls
   - [x] Outbound clicks
   - [x] Site search
   - [x] Form interactions
   - [x] Video engagement
   - [x] File downloads

### 2.4 Set Up Conversions
1. Go to **Admin** → **Conversions**
2. Click **New conversion event**
3. Create these events:
   ```
   - contact_form_submit
   - booking_request
   - newsletter_signup
   - phone_click
   - demo_request
   ```

### 2.5 Configure Audiences
1. Go to **Admin** → **Audiences**
2. Create audiences:
   - All Users (default)
   - Engaged Users (>2 min or >2 pages)
   - Contact Form Viewers
   - Service Page Visitors
   - Blog Readers

---

## STEP 3: Google Tag Manager Setup

### 3.1 Create GTM Account
1. Go to [tagmanager.google.com](https://tagmanager.google.com)
2. Click **Create Account**
3. Enter:
   - Account Name: "XMA Agency"
   - Country: Your country
   - Container name: "xma-website"
   - Target platform: **Web**
4. Accept Terms of Service

### 3.2 Get Container ID
1. After creation, you'll see installation code
2. Copy your **GTM Container ID** (GTM-XXXXXXX)
3. Save this ID for `.env.local`

### 3.3 Install Container Snippet
We've already added this to your code, but verify:
- Check `components/GoogleTagManager.tsx` has your GTM ID
- The component is included in `app/layout.tsx`

### 3.4 Set Up Variables
1. In GTM → **Variables** → **New**
2. Create these User-Defined Variables:

**Click Text Variable:**
- Type: Auto-Event Variable
- Variable Type: Element Text
- Name: "Click Text"

**Click URL Variable:**
- Type: Auto-Event Variable  
- Variable Type: Element URL
- Name: "Click URL"

**GA4 Measurement ID:**
- Type: Constant
- Value: Your G-XXXXXXXXXX
- Name: "GA4 Measurement ID"

### 3.5 Configure Tags

**Tag 1: GA4 Configuration**
1. **Tags** → **New** → **Google Analytics: GA4 Configuration**
2. Settings:
   - Measurement ID: {{GA4 Measurement ID}}
   - Send page view: Yes
3. Trigger: All Pages
4. Name: "GA4 Configuration"

**Tag 2: GA4 Events**
1. **Tags** → **New** → **Google Analytics: GA4 Event**
2. Settings:
   - Configuration Tag: GA4 Configuration
   - Event Name: {{Event}}
3. Trigger: All Pages
4. Name: "GA4 All Events"

### 3.6 Set Up Triggers

**Trigger 1: Contact Form Submit**
1. **Triggers** → **New** → **Form Submission**
2. Settings:
   - This trigger fires on: Some Forms
   - Form ID contains: "contact"
3. Name: "Contact Form Submit"

**Trigger 2: CTA Button Clicks**
1. **Triggers** → **New** → **Click - All Elements**
2. Settings:
   - This trigger fires on: Some Clicks
   - Click Classes contains: "ScanningButton"
3. Name: "CTA Button Clicks"

**Trigger 3: Phone Number Clicks**
1. **Triggers** → **New** → **Click - Just Links**
2. Settings:
   - This trigger fires on: Some Link Clicks
   - Click URL contains: "tel:"
3. Name: "Phone Click"

### 3.7 Test in Preview Mode
1. Click **Preview** button
2. Enter your website URL
3. Test all interactions
4. Verify tags fire correctly

### 3.8 Publish Container
1. Click **Submit** → **Publish**
2. Add version name: "Initial Setup"
3. Add description: "GA4 and basic tracking setup"

---

## STEP 4: Google Ads Account Setup

### 4.1 Create Google Ads Account
1. Go to [ads.google.com](https://ads.google.com)
2. Click **Start Now**
3. **IMPORTANT**: Click "Switch to Expert Mode" (skip the guided setup)
4. Click "Create an account without a campaign"
5. Confirm business information:
   - Country
   - Time zone
   - Currency (cannot be changed later!)

### 4.2 Get Google Ads ID
1. In Google Ads, click **Tools & Settings** → **Setup** → **Google Ads Conversion ID**
2. Copy your **Google Ads ID** (AW-XXXXXXXXX)
3. Save this ID for `.env.local`

### 4.3 Link GA4 Property
1. **Tools & Settings** → **Linked accounts**
2. Find **Google Analytics (GA4) & Firebase**
3. Click **Details** → **Link**
4. Select your GA4 property
5. Enable:
   - [x] Import conversions
   - [x] Enable auto-tagging
   - [x] Import Analytics audiences

### 4.4 Set Up Conversion Actions

**Conversion 1: Contact Form**
1. **Tools & Settings** → **Conversions**
2. Click **+ New conversion action** → **Website**
3. Settings:
   - Category: **Lead**
   - Conversion name: "Contact Form Submit"
   - Value: "Don't use a value"
   - Count: "One"
   - Click-through conversion window: 30 days
   - View-through conversion window: 1 day
   - Attribution model: Data-driven
4. Click **Create and Continue**
5. Select "Use Google Tag Manager"
6. Copy the **Conversion Label** (save for `.env.local`)

**Conversion 2: Phone Call Click**
1. Repeat process with:
   - Category: **Lead**
   - Conversion name: "Phone Call Click"
   - Value: "Use different values for each conversion"
   - Default value: 50

**Conversion 3: Demo/Booking Request**
1. Repeat process with:
   - Category: **Lead**
   - Conversion name: "Demo Booking"
   - Value: "Use different values for each conversion"
   - Default value: 100

### 4.5 Set Up Remarketing
1. **Tools & Settings** → **Audience Manager**
2. Audience sources → **Google Ads tag** → **Set up tag**
3. Choose "General site visitors"
4. Tag is automatically created
5. Go to **Audience segments** → **Website visitors**
6. Create segments:
   - All visitors (membership duration: 30 days)
   - Service page visitors (90 days)
   - Blog readers (120 days)
   - Cart abandoners (7 days)

### 4.6 Configure Billing
1. **Tools & Settings** → **Billing**
2. Add payment method
3. Set up billing alerts at 50%, 75%, 90%

---

## STEP 5: Create Conversion Tags in GTM

### 5.1 Google Ads Conversion Tag
1. In GTM → **Tags** → **New**
2. Choose **Google Ads Conversion Tracking**
3. Settings:
   - Conversion ID: AW-XXXXXXXXX
   - Conversion Label: (from Step 4.4)
   - Conversion Value: (optional)
   - Currency: USD
4. Trigger: Contact Form Submit
5. Name: "Google Ads - Contact Form Conversion"

### 5.2 Google Ads Remarketing Tag
1. **Tags** → **New** → **Google Ads Remarketing**
2. Settings:
   - Conversion ID: AW-XXXXXXXXX
3. Trigger: All Pages
4. Name: "Google Ads - Remarketing"

### 5.3 Enhanced Conversions Setup
1. In your Google Ads Conversion Tag
2. Check "Include user-provided data from your website"
3. Select data type: "User-provided data variable"
4. Create new variable for email/phone if collected

---

## STEP 6: Testing Everything

### 6.1 GTM Preview Mode
1. In GTM, click **Preview**
2. Navigate your website
3. Verify all tags fire:
   - GA4 Configuration on page load
   - Conversion tags on form submit
   - Remarketing tag on all pages

### 6.2 GA4 DebugView
1. In GA4 → **Admin** → **DebugView**
2. Install [Google Analytics Debugger](https://chrome.google.com/webstore/detail/google-analytics-debugger) Chrome extension
3. Enable extension and refresh your site
4. Watch real-time events in DebugView

### 6.3 Google Tag Assistant
1. Install [Tag Assistant Legacy](https://chrome.google.com/webstore/detail/tag-assistant-legacy) extension
2. Navigate to your website
3. Click extension icon
4. Verify all tags show green:
   - Google Analytics
   - Google Ads Conversion
   - Google Ads Remarketing

### 6.4 Google Ads Tag Verification
1. In Google Ads → **Tools** → **Conversions**
2. Click on each conversion action
3. Check "Webpages" tab
4. Should show "Unverified" initially
5. After 24 hours of traffic, should show "Recording conversions"

---

## STEP 7: Environment Variables Setup

Create your `.env.local` file with all collected IDs:

```env
# Google Analytics 4
NEXT_PUBLIC_GA_MEASUREMENT_ID=G-XXXXXXXXXX

# Google Tag Manager
NEXT_PUBLIC_GTM_ID=GTM-XXXXXXX

# Google Ads
NEXT_PUBLIC_GOOGLE_ADS_ID=AW-XXXXXXXXX

# Conversion Labels (from Step 4.4)
NEXT_PUBLIC_GOOGLE_ADS_CONVERSION_LABEL_CONTACT=AbCdEfGhIj
NEXT_PUBLIC_GOOGLE_ADS_CONVERSION_LABEL_BOOKING=KlMnOpQrSt
NEXT_PUBLIC_GOOGLE_ADS_CONVERSION_LABEL_SIGNUP=UvWxYzAbCd
NEXT_PUBLIC_GOOGLE_ADS_CONVERSION_LABEL_PHONE=EfGhIjKlMn
```

---

## STEP 8: First Campaign Setup

### 8.1 Campaign Creation
1. In Google Ads → **Campaigns** → **New Campaign**
2. Choose goal: **Leads**
3. Campaign type: **Search**
4. Select conversions to track
5. Campaign name: "Search - Brand - US"

### 8.2 Campaign Settings
- Networks: Google search only (uncheck partners initially)
- Locations: United States (or your target)
- Languages: English
- Budget: $50/day (start conservative)
- Bidding: Maximize conversions (no target CPA initially)
- Ad rotation: Optimize

### 8.3 Ad Group Setup
Create 3 initial ad groups:
1. Brand keywords
2. Service keywords
3. Competitor keywords

### 8.4 Keywords
Start with 10-15 keywords per ad group:
- Use Keyword Planner for research
- Start with exact match [keyword]
- Add phrase match "keyword" after data collection

### 8.5 Ad Creation
Create 3-4 responsive search ads per ad group:
- 15 headlines (30 char max)
- 4 descriptions (90 char max)
- Include keywords in headlines
- Clear CTAs in descriptions

---

## STEP 9: Post-Launch Monitoring

### Daily (First Week)
- [ ] Check conversion tracking status
- [ ] Monitor search terms report
- [ ] Add negative keywords
- [ ] Check budget pacing

### Weekly
- [ ] Review conversion data in GA4
- [ ] Check Quality Scores
- [ ] Optimize ad copy (pause low performers)
- [ ] Adjust bids based on performance

### Monthly
- [ ] Full performance review
- [ ] Update conversion values
- [ ] Expand/pause keywords
- [ ] Test new ad copy
- [ ] Review and update audiences

---

## STEP 10: Troubleshooting

### Conversions Not Tracking
1. Check GTM Preview mode
2. Verify conversion labels match
3. Wait 24 hours for data
4. Check GTM trigger conditions

### High Cost, Low Conversions
1. Review search terms report
2. Add more negative keywords
3. Improve ad-to-landing page relevance
4. Check form functionality

### Tag Assistant Shows Errors
1. Clear browser cache
2. Check for ad blockers
3. Verify GTM container is published
4. Check for JavaScript errors in console

---

## Important URLs Reference

- **Google Ads**: [ads.google.com](https://ads.google.com)
- **Google Analytics**: [analytics.google.com](https://analytics.google.com)
- **Google Tag Manager**: [tagmanager.google.com](https://tagmanager.google.com)
- **Search Console**: [search.google.com/search-console](https://search.google.com/search-console)
- **Keyword Planner**: ads.google.com → Tools → Keyword Planner
- **Google Ads Editor**: [Download](https://ads.google.com/home/tools/ads-editor/)

---

## Support & Resources

- **Google Ads Support**: 1-866-2-GOOGLE
- **Community Forum**: [support.google.com/google-ads/community](https://support.google.com/google-ads/community)
- **Google Skillshop**: [skillshop.withgoogle.com](https://skillshop.withgoogle.com)
- **YouTube Channel**: [Google Ads YouTube](https://www.youtube.com/c/GoogleAds)

---

## Notes
- Keep all IDs and labels in a secure password manager
- Never share conversion labels publicly
- Always test in GTM Preview before publishing
- Set up billing alerts to avoid overspending
- Start with conservative budgets and scale based on data