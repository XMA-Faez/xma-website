import {
  Phone,
  Mail,
  MapPin,
  Video,
  BarChart3,
  Bot,
  MessageSquare,
  Shield,
  FileText,
} from "lucide-react";

const footerData = {
  company: {
    name: "XMA Agency",
    description:
      "Premier digital marketing agency specializing in video production, CRM integration, and performance marketing. Transform your business with our comprehensive digital solutions.",
    contact: [
      {
        icon: Phone,
        text: "+971 50 363 6856",
        href: "tel:+971503636856",
        isClickable: true,
      },
      {
        icon: Mail,
        text: "admin@xmaagency.com",
        href: "mailto:admin@xmaagency.com",
        isClickable: true,
      },
      {
        icon: MapPin,
        text: "Dubai, UAE",
        isClickable: false,
      },
    ],
  },
  services: [
    {
      icon: Video,
      text: "Video Production",
      href: "/services/video-production",
    },
    {
      icon: BarChart3,
      text: "Performance Marketing",
      href: "/services/marketing",
    },
    {
      icon: Bot,
      text: "CRM Solutions",
      href: "/services/crm-solution",
    },
    {
      icon: MessageSquare,
      text: "WhatsApp Integration",
      href: "/services/whatsapp-integration",
    },
  ],
  quickLinks: [
    {
      text: "About Us",
      href: "/about",
    },
    {
      text: "Blog",
      href: "/blog",
    },
    // {
    //   text: "Proposal",
    //   href: "/proposal",
    // },
    {
      text: "Contact",
      href: "/contact",
    },
  ],
  legal: [
    {
      text: "Terms of Service",
      href: "/terms-conditions",
      icon: FileText,
    },
    {
      text: "Privacy Policy",
      href: "/privacy-policy",
      icon: Shield,
    },
  ],
};

export default footerData;
