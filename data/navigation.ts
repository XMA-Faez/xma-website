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
  { name: "Portfolio", href: "/portfolio" },
  { name: "Blog", href: "/blog" },
  { name: "About", href: "/about" },
  { name: "Contact Us", href: "/contact" },
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
    href: "/solutions/crm-system",
    description: "Lead organization, automation, and pipeline management",
  },
  {
    name: "Conversion Acceleration",
    href: "/solutions/conversion-acceleration",
    description: "Improve how traffic and leads convert into revenue",
  },
];

export const servicePages: NavItem[] = [
  { name: "Performance Marketing", href: "/performance-marketing-dubai" },
  { name: "Google Ads Management", href: "/google-ads-agency-dubai" },
  { name: "Meta Ads", href: "/meta-ads-agency-uae" },
  { name: "SEO Services", href: "/seo-agency-dubai" },
  { name: "CRM Integration", href: "/crm-integration-uae" },
  { name: "WhatsApp Marketing", href: "/whatsapp-marketing-dubai" },
  { name: "Video Production", href: "/video-production-dubai" },
  { name: "Lead Generation", href: "/lead-generation-uae" },
  { name: "Social Media Marketing", href: "/social-media-marketing-dubai" },
  { name: "Content Marketing", href: "/content-marketing-agency-uae" },
  { name: "Landing Page Design & CRO", href: "/landing-page-design-dubai" },
  { name: "Sales Funnel Building", href: "/sales-funnel-agency-uae" },
  { name: "Marketing Automation", href: "/marketing-automation-dubai" },
  { name: "Brand Identity & Design", href: "/branding-agency-dubai" },
  { name: "Web Design & Development", href: "/web-design-agency-dubai" },
  { name: "TikTok Advertising", href: "/tiktok-ads-uae" },
  { name: "E-commerce Marketing", href: "/ecommerce-marketing-uae" },
  { name: "Arabic Digital Marketing", href: "/arabic-digital-marketing-uae" },
  { name: "AI Marketing Solutions", href: "/ai-marketing-agency-dubai" },
];

export const industryPages: NavItem[] = [
  { name: "Real Estate", href: "/real-estate-marketing-dubai" },
  { name: "Hospitality & Hotels", href: "/hotel-marketing-agency-dubai" },
  { name: "Restaurant & F&B", href: "/restaurant-marketing-dubai" },
  { name: "Healthcare & Clinics", href: "/healthcare-marketing-uae" },
  { name: "E-commerce Brands", href: "/ecommerce-agency-uae" },
  { name: "Retail & Fashion", href: "/retail-marketing-dubai" },
  { name: "Education & Universities", href: "/education-marketing-uae" },
  { name: "Legal & Law Firms", href: "/law-firm-marketing-dubai" },
  { name: "Finance & Fintech", href: "/fintech-marketing-uae" },
  { name: "Automotive Dealerships", href: "/automotive-marketing-uae" },
  { name: "Luxury Brands", href: "/luxury-brand-marketing-dubai" },
  { name: "Tech Startups & SaaS", href: "/startup-marketing-agency-dubai" },
  { name: "Construction & Property Dev", href: "/construction-marketing-uae" },
  { name: "Beauty & Wellness", href: "/beauty-salon-marketing-dubai" },
  { name: "Events & Exhibition", href: "/event-marketing-dubai" },
  { name: "B2B Companies", href: "/b2b-marketing-agency-uae" },
  { name: "Dental Clinics", href: "/dental-clinic-marketing-dubai" },
  { name: "Travel & Tourism", href: "/travel-marketing-agency-uae" },
  { name: "Logistics & Freight", href: "/logistics-marketing-uae" },
  { name: "Non-Profits & NGOs", href: "/ngo-marketing-uae" },
];
