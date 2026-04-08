import type { ServicePageData, IndustryPageData, LandingPageData } from "./types";

import { performanceMarketingDubai } from "./services/performance-marketing-dubai";
import { googleAdsDubai } from "./services/google-ads-agency-dubai";
import { metaAdsUae } from "./services/meta-ads-agency-uae";
import { seoDubai } from "./services/seo-agency-dubai";
import { crmIntegrationUae } from "./services/crm-integration-uae";
import { whatsappMarketingDubai } from "./services/whatsapp-marketing-dubai";
import { videoProductionDubai } from "./services/video-production-dubai";
import { leadGenerationUae } from "./services/lead-generation-uae";
import { socialMediaDubai } from "./services/social-media-marketing-dubai";
import { contentMarketingUae } from "./services/content-marketing-agency-uae";
import { landingPageDesignDubai } from "./services/landing-page-design-dubai";
import { salesFunnelUae } from "./services/sales-funnel-agency-uae";
import { marketingAutomationDubai } from "./services/marketing-automation-dubai";
import { brandingDubai } from "./services/branding-agency-dubai";
import { webDesignDubai } from "./services/web-design-agency-dubai";
import { tiktokAdsUae } from "./services/tiktok-ads-uae";
import { ecommerceMarketingUae } from "./services/ecommerce-marketing-uae";
import { arabicDigitalMarketingUae } from "./services/arabic-digital-marketing-uae";
import { aiMarketingDubai } from "./services/ai-marketing-agency-dubai";

import { realEstateMarketingDubai } from "./industries/real-estate-marketing-dubai";
import { hotelMarketingDubai } from "./industries/hotel-marketing-agency-dubai";
import { restaurantMarketingDubai } from "./industries/restaurant-marketing-dubai";
import { healthcareMarketingUae } from "./industries/healthcare-marketing-uae";
import { ecommerceAgencyUae } from "./industries/ecommerce-agency-uae";
import { retailMarketingDubai } from "./industries/retail-marketing-dubai";
import { educationMarketingUae } from "./industries/education-marketing-uae";
import { lawFirmMarketingDubai } from "./industries/law-firm-marketing-dubai";
import { fintechMarketingUae } from "./industries/fintech-marketing-uae";
import { automotiveMarketingUae } from "./industries/automotive-marketing-uae";
import { luxuryBrandMarketingDubai } from "./industries/luxury-brand-marketing-dubai";
import { startupMarketingDubai } from "./industries/startup-marketing-agency-dubai";
import { constructionMarketingUae } from "./industries/construction-marketing-uae";
import { beautySalonMarketingDubai } from "./industries/beauty-salon-marketing-dubai";
import { eventMarketingDubai } from "./industries/event-marketing-dubai";
import { b2bMarketingUae } from "./industries/b2b-marketing-agency-uae";
import { dentalClinicMarketingDubai } from "./industries/dental-clinic-marketing-dubai";
import { travelMarketingUae } from "./industries/travel-marketing-agency-uae";
import { logisticsMarketingUae } from "./industries/logistics-marketing-uae";
import { ngoMarketingUae } from "./industries/ngo-marketing-uae";

export const allServicePages: ServicePageData[] = [
  performanceMarketingDubai,
  googleAdsDubai,
  metaAdsUae,
  seoDubai,
  crmIntegrationUae,
  whatsappMarketingDubai,
  videoProductionDubai,
  leadGenerationUae,
  socialMediaDubai,
  contentMarketingUae,
  landingPageDesignDubai,
  salesFunnelUae,
  marketingAutomationDubai,
  brandingDubai,
  webDesignDubai,
  tiktokAdsUae,
  ecommerceMarketingUae,
  arabicDigitalMarketingUae,
  aiMarketingDubai,
];

export const allIndustryPages: IndustryPageData[] = [
  realEstateMarketingDubai,
  hotelMarketingDubai,
  restaurantMarketingDubai,
  healthcareMarketingUae,
  ecommerceAgencyUae,
  retailMarketingDubai,
  educationMarketingUae,
  lawFirmMarketingDubai,
  fintechMarketingUae,
  automotiveMarketingUae,
  luxuryBrandMarketingDubai,
  startupMarketingDubai,
  constructionMarketingUae,
  beautySalonMarketingDubai,
  eventMarketingDubai,
  b2bMarketingUae,
  dentalClinicMarketingDubai,
  travelMarketingUae,
  logisticsMarketingUae,
  ngoMarketingUae,
];

export const allLandingPages: LandingPageData[] = [
  ...allServicePages,
  ...allIndustryPages,
];

const pageDataBySlug = new Map<string, LandingPageData>(
  allLandingPages.map((page) => [page.slug, page])
);

export function getPageBySlug(slug: string): LandingPageData | undefined {
  return pageDataBySlug.get(slug);
}

export function getServicePageBySlug(slug: string): ServicePageData | undefined {
  return allServicePages.find((p) => p.slug === slug);
}

export function getIndustryPageBySlug(slug: string): IndustryPageData | undefined {
  return allIndustryPages.find((p) => p.slug === slug);
}

export function getAllSlugs(): string[] {
  return allLandingPages.map((p) => p.slug);
}

interface LandingPageEntry {
  slug: string;
  name: string;
  description: string;
  category: "service" | "industry";
}

export const servicePageEntries: LandingPageEntry[] = allServicePages.map((p) => ({
  slug: p.slug,
  name: p.hero.badge,
  description: p.seo.description.slice(0, 80),
  category: "service" as const,
}));

export const industryPageEntries: LandingPageEntry[] = allIndustryPages.map((p) => ({
  slug: p.slug,
  name: p.hero.badge,
  description: p.seo.description.slice(0, 80),
  category: "industry" as const,
}));

export const allLandingPageEntries: LandingPageEntry[] = [
  ...servicePageEntries,
  ...industryPageEntries,
];
