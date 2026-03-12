import { Phone, Mail, MapPin, Shield, FileText } from "lucide-react";

const footerData = {
  company: {
    name: "XMA Agency",
    description:
      "XMA designs and implements growth systems that help businesses generate leads, acquire customers, and scale revenue.",
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
        text: "M44, The Curve Building, Al Qouz 3, Dubai, UAE",
        isClickable: false,
      },
    ],
  },
  quickLinks: [
    {
      text: "Book a Call",
      href: "/apply",
    },
    {
      text: "Portfolio",
      href: "/portfolio",
    },
    {
      text: "Blog",
      href: "/blog",
    },
    {
      text: "About",
      href: "/about",
    },
  ],
  solutions: [
    {
      text: "Growth Launch System",
      href: "/solutions/growth-launch-system",
    },
    {
      text: "E-Commerce Revenue Engine",
      href: "/solutions/ecommerce-revenue-engine",
    },
    {
      text: "B2B Lead Generation",
      href: "/solutions/b2b-lead-generation",
    },
    {
      text: "CRM & Revenue System",
      href: "/solutions/crm-system",
    },
    {
      text: "Conversion Acceleration",
      href: "/solutions/conversion-acceleration",
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
