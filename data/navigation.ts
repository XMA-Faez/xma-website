import { Video, BarChart3, Bot, MessageSquare, Sparkles } from "lucide-react";
import { LucideIcon } from "lucide-react";

interface NavItem {
  name: string;
  href: string;
}

export interface ServiceItem extends NavItem {
  icon: LucideIcon;
  description: string;
  comingSoon?: boolean;
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
    name: "Portfolio",
    href: "/portfolio",
  },
  {
    name: "Blog",
    href: "/blog",
  },
];

export const services: ServiceItem[] = [
  {
    name: "XMA CRM System",
    href: "/services/crm-solution",
    icon: Bot,
    description: "Transform your lead management with intelligent automation",
  },
  {
    name: "Lead Generator",
    href: "#",
    icon: Sparkles,
    description: "Advanced lead generation system to grow your business",
    comingSoon: true,
  },
];
