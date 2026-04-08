export interface LandingPageSeo {
  title: string;
  description: string;
  keywords: string[];
}

export interface LandingPageStat {
  value: string;
  label: string;
  icon?: string;
  progress?: number;
}

export interface LandingPagePainPoint {
  title: string;
  description: string;
  icon?: string;
}

export interface LandingPageFaqItem {
  question: string;
  answer: string;
}

export interface LandingPageCta {
  headline: string;
  subtext: string;
}

interface LandingPageBase {
  slug: string;
  category: "service" | "industry";
  accentColor: string;
  seo: LandingPageSeo;
  hero: {
    badge: string;
    title: string;
    subtitle: string;
    image?: string;
    imageAlt?: string;
  };
  stats: LandingPageStat[];
  painPoints: LandingPagePainPoint[];
  results: LandingPageStat[];
  faq: LandingPageFaqItem[];
  cta: LandingPageCta;
  crossLinks: string[];
}

export interface ServicePageData extends LandingPageBase {
  category: "service";
  approach: {
    title: string;
    steps: {
      label: string;
      description: string;
      icon?: string;
    }[];
  };
  deliverables: {
    title: string;
    items: {
      title: string;
      description: string;
      icon?: string;
    }[];
  };
  differentiators: {
    title: string;
    description: string;
    icon?: string;
  }[];
}

export interface IndustryPageData extends LandingPageBase {
  category: "industry";
  relevantServices: {
    name: string;
    description: string;
    slug: string;
    icon?: string;
  }[];
  expertise: {
    title: string;
    points: {
      title: string;
      description: string;
    }[];
  };
  caseStudy?: {
    company: string;
    challenge: string;
    solution: string;
    result: string;
    logo?: string;
  };
}

export type LandingPageData = ServicePageData | IndustryPageData;
