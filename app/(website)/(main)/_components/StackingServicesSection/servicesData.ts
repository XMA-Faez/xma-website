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
}

export const services: Service[] = [
  {
    id: "creatives",
    iconName: "solar:clapperboard-play-bold",
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
    iconName: "solar:target-bold",
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
  // {
  //   id: "whatsapp",
  //   iconName: "solar:whatsapp-bold",
  //   title: "WhatsApp Automation",
  //   description:
  //     "Instant replies without sounding robotic. Automated sequences that feel human and close deals while you sleep.",
  //   features: [
  //     "Instant response within seconds",
  //     "Intelligent follow-up sequences",
  //     "Lead qualification flows",
  //     "Booking confirmation automation",
  //   ],
  //   visualTheme: "whatsapp",
  // },
  {
    id: "crm",
    iconName: "solar:server-square-cloud-bold",
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
