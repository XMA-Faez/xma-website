import { Phone, Mail, MapPin, Shield, FileText } from "lucide-react";

const footerData = {
  company: {
    name: "XMA Agency",
    description:
      "We craft websites that look as premium as your fleet — and convert visitors into bookings.",
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
  quickLinks: [
    {
      text: "Book a Strategy Call",
      href: "/book",
    },
    {
      text: "Portfolio",
      href: "/portfolio",
    },
    {
      text: "About",
      href: "/about",
    },
    {
      text: "Blog",
      href: "/blog",
    },
    {
      text: "Contact",
      href: "/contact",
    },
  ],
  services: [
    {
      text: "XMA CRM System",
      href: "/services/crm-solution",
    },
    // {
    //   text: "Conversion Websites",
    //   href: "/#luxury-booking-system",
    // },
    // {
    //   text: "Ad Creatives",
    //   href: "/#luxury-booking-system",
    // },
    // {
    //   text: "Paid Advertising",
    //   href: "/#luxury-booking-system",
    // },
    // {
    //   text: "WhatsApp Automation",
    //   href: "/#luxury-booking-system",
    // },
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
