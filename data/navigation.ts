import { Video, BarChart3, Bot, MessageSquare } from "lucide-react";
import { LucideIcon } from "lucide-react";

interface NavItem {
  name: string;
  href: string;
}

export interface ServiceItem extends NavItem {
  icon: LucideIcon;
  description: string;
}

export const mainNavItems: NavItem[] = [
  {
    name: "Home",
    href: "/",
  },
  {
    name: "About",
    href: "/about",
  },
  {
    name: "Blog",
    href: "/blog",
  },
];

export const services: ServiceItem[] = [
  {
    name: "Video Production",
    href: "/services/video-production",
    icon: Video,
    description:
      "Transform your brand with stunning videos that captivate and convert",
  },
  {
    name: "Performance Marketing",
    href: "/services/marketing",
    icon: BarChart3,
    description:
      "Data-driven marketing strategies that deliver measurable results",
  },
  {
    name: "CRM Solutions",
    href: "/services/crm-solution",
    icon: Bot,
    description: "Transform your lead management with intelligent automation",
  },
  {
    name: "WhatsApp Integration",
    href: "/services/whatsapp-integration",
    icon: MessageSquare,
    description:
      "Automate your customer communication with intelligent WhatsApp solutions",
  },
];
