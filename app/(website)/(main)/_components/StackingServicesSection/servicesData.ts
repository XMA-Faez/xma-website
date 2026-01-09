import {
  Globe,
  FilmStrip,
  Target,
  WhatsappLogo,
  Database,
  type Icon,
} from "phosphor-react";

export type ServiceVisualTheme =
  | "website"
  | "creatives"
  | "paidAds"
  | "whatsapp"
  | "crm";

export interface Service {
  id: string;
  icon: Icon;
  title: string;
  description: string;
  features: string[];
  visualTheme: ServiceVisualTheme;
}

export const services: Service[] = [
  {
    id: "website",
    icon: Globe,
    title: "Conversion-Optimized Website",
    description:
      "Built to push visitors toward action, not just look good. Every element is designed to convert browsers into bookers.",
    features: [
      "Mobile-first luxury experience",
      "WhatsApp integration built-in",
      "Speed-optimized for UAE networks",
      "Trust signals strategically placed",
    ],
    visualTheme: "website",
  },
  {
    id: "creatives",
    icon: FilmStrip,
    title: "High-End Ad Creatives",
    description:
      "Video, graphics, and photography aligned with luxury perception. Content that stops the scroll and commands attention.",
    features: [
      "Cinematic video production",
      "Premium photography direction",
      "Social-first creative formats",
      "A/B tested for performance",
    ],
    visualTheme: "creatives",
  },
  {
    id: "paid-ads",
    icon: Target,
    title: "Paid Ads That Qualify Leads",
    description:
      "No cheap clicks. No random traffic. We target high-intent prospects ready to book luxury vehicles.",
    features: [
      "Meta & Google Ads expertise",
      "Lookalike audience targeting",
      "Retargeting sequences",
      "Cost-per-booking optimization",
    ],
    visualTheme: "paidAds",
  },
  {
    id: "whatsapp",
    icon: WhatsappLogo,
    title: "WhatsApp Automation",
    description:
      "Instant replies without sounding robotic. Automated sequences that feel human and close deals while you sleep.",
    features: [
      "Instant response within seconds",
      "Intelligent follow-up sequences",
      "Lead qualification flows",
      "Booking confirmation automation",
    ],
    visualTheme: "whatsapp",
  },
  {
    id: "crm",
    icon: Database,
    title: "Custom CRM Built for Rentals",
    description:
      "Every inquiry tracked. Every opportunity followed. A system designed specifically for luxury car rental operations.",
    features: [
      "Pipeline visibility dashboard",
      "Automated task assignments",
      "Customer history tracking",
      "Revenue reporting & analytics",
    ],
    visualTheme: "crm",
  },
];
