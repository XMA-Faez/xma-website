interface NavItem {
  name: string;
  href: string;
}

interface SolutionItem extends NavItem {
  description: string;
}

export const mainNavItems: NavItem[] = [
  { name: "Home", href: "/" },
  { name: "Solutions", href: "/solutions" },
  { name: "Case Studies", href: "/case-studies" },
  { name: "Insights", href: "/insights" },
  { name: "About", href: "/about" },
];

export const solutions: SolutionItem[] = [
  {
    name: "Growth Launch System",
    href: "/solutions/growth-launch-system",
    description: "Complete brand, website, and infrastructure for scaling",
  },
  {
    name: "E-Commerce Revenue Engine",
    href: "/solutions/ecommerce-revenue-engine",
    description: "Customer acquisition and revenue scaling for e-commerce",
  },
  {
    name: "B2B Lead Generation",
    href: "/solutions/b2b-lead-generation",
    description: "Qualified leads and predictable sales pipelines",
  },
  {
    name: "CRM & Revenue System",
    href: "/solutions/crm-revenue-system",
    description: "Lead organization, automation, and pipeline management",
  },
  {
    name: "Conversion Acceleration",
    href: "/solutions/conversion-acceleration",
    description: "Improve how traffic and leads convert into revenue",
  },
];
