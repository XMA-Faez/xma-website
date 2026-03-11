export interface SolutionPageData {
  slug: string;
  accentColor?: string;
  hero: {
    badge: string;
    title: string;
    subtitle: string;
    image?: string;
    mobileImage?: string;
  };
  problem: {
    headline: string;
    painPoints: {
      title: string;
      description: string;
      icon?: string;
    }[];
  };
  system: {
    title: string;
    description: string;
    steps: {
      label: string;
      description: string;
    }[];
  };
  included: {
    title: string;
    items: {
      title: string;
      description: string;
      icon?: string;
    }[];
  };
  process: {
    steps: {
      title: string;
      description: string;
      icon?: string;
    }[];
  };
  outcomes: {
    metrics: string[];
  };
  qualification: {
    forWho: string[];
    notForWho: string[];
  };
  cta: {
    headline: string;
    subtext: string;
  };
}
