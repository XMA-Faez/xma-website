export type ServiceVisualTheme =
  | "website"
  | "creatives"
  | "paidAds"
  | "whatsapp"
  | "crm";

export interface Service {
  id: string;
  iconName: string;
  title: string;
  description: string;
  features: string[];
  visualTheme: ServiceVisualTheme;
  href: string;
}

export const services: Service[] = [
  {
    id: "lead-generation",
    iconName: "solar:target-bold",
    title: "Lead Generation",
    description:
      "Precision-targeted Google & Meta ad campaigns that deliver qualified leads ready to convert. No wasted spend — every dirham drives measurable pipeline growth.",
    features: [
      "Google & Meta Ads management",
      "Audience targeting & retargeting",
      "Conversion tracking & optimization",
      "Monthly performance reporting",
    ],
    visualTheme: "paidAds",
    href: "/services/lead-generation",
  },
  {
    id: "website-creation",
    iconName: "solar:monitor-bold",
    title: "Premium Website Creation",
    description:
      "Conversion-optimized websites built on Next.js and Sanity CMS — engineered for speed, designed for trust, and structured to turn visitors into customers.",
    features: [
      "Custom Next.js development",
      "Sanity CMS integration",
      "Sub-2-second load times",
      "Conversion-focused UX design",
    ],
    visualTheme: "website",
    href: "/services/website-creation",
  },
  {
    id: "crm",
    iconName: "solar:server-square-cloud-bold",
    title: "CRM & Automations",
    description:
      "AI-powered WhatsApp CRM that captures every inquiry, automates follow-ups, and turns conversations into revenue — 24/7 without missing a beat.",
    features: [
      "WhatsApp Business integration",
      "AI chatbot with 95% accuracy",
      "Visual sales pipeline",
      "Smart automation workflows",
    ],
    visualTheme: "crm",
    href: "/services/crm-solution",
  },
];
