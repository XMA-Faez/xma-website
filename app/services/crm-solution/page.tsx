import type { Metadata } from "next";
import CRMPageClient from "./page-client";

// SEO Metadata for CRM Solution Page
export const metadata: Metadata = {
  title: "AI-Powered WhatsApp CRM for UAE Businesses | Never Miss a Lead Again",
  description: "Revolutionary CRM with AI chatbot that connects WhatsApp, automates conversations, and converts 67% more leads for UAE service businesses. Book a free demo today.",
  keywords: [
    "WhatsApp CRM UAE",
    "AI chatbot Dubai",
    "CRM Dubai",
    "WhatsApp Business Dubai",
    "Lead management UAE",
    "Customer relationship management Dubai",
    "AI automation UAE",
    "WhatsApp integration Dubai",
    "Business automation UAE",
    "CRM software Dubai"
  ],
  authors: [{ name: "XMA Agency" }],
  creator: "XMA Agency",
  publisher: "XMA Agency",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL("https://xma-agency.com"),
  alternates: {
    canonical: "/services/crm-solution",
  },
  openGraph: {
    title: "AI WhatsApp CRM | 67% More Leads for UAE Businesses",
    description: "Stop losing WhatsApp leads to poor follow-up. Our AI-powered CRM automates conversations and converts more inquiries into paying customers.",
    url: "/services/crm-solution",
    siteName: "XMA Agency",
    images: [
      {
        url: "/images/crm-solution-og.jpg",
        width: 1200,
        height: 630,
        alt: "AI-Powered WhatsApp CRM Dashboard showing conversation management and lead tracking",
      },
    ],
    locale: "en_AE",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "AI WhatsApp CRM | 67% More Leads for UAE Businesses",
    description: "Stop losing WhatsApp leads to poor follow-up. Our AI-powered CRM automates conversations and converts more inquiries into paying customers.",
    images: ["/images/crm-solution-twitter.jpg"],
    creator: "@xmaagency",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: "b4Ruz4qrwE5l_HVaxaP5_Nysz4MGIQaCWg8xYkKrJcM",
  },
  category: "technology",
};

// JSON-LD Structured Data
const structuredData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": "https://xma-agency.com/#organization",
      name: "XMA Agency",
      url: "https://xma-agency.com",
      logo: {
        "@type": "ImageObject",
        url: "https://xma-agency.com/images/logo.png",
        width: 200,
        height: 60
      },
      contactPoint: {
        "@type": "ContactPoint",
        telephone: "+971-50-123-4567",
        contactType: "customer service",
        areaServed: "AE",
        availableLanguage: ["English", "Arabic"]
      },
      address: {
        "@type": "PostalAddress",
        addressCountry: "AE",
        addressRegion: "Dubai"
      },
      sameAs: [
        "https://linkedin.com/company/xma-agency",
        "https://twitter.com/xmaagency"
      ]
    },
    {
      "@type": "WebPage",
      "@id": "https://xma-agency.com/services/crm-solution/#webpage",
      url: "https://xma-agency.com/services/crm-solution",
      name: "AI-Powered WhatsApp CRM for UAE Businesses",
      description: "Revolutionary CRM with AI chatbot that connects WhatsApp, automates conversations, and converts 67% more leads for UAE service businesses.",
      inLanguage: "en-AE",
      isPartOf: {
        "@id": "https://xma-agency.com/#website"
      },
      about: {
        "@id": "https://xma-agency.com/#organization"
      },
      primaryImageOfPage: {
        "@type": "ImageObject",
        url: "https://xma-agency.com/images/crm-solution-hero.jpg"
      },
      dateModified: new Date().toISOString(),
      breadcrumb: {
        "@type": "BreadcrumbList",
        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            name: "Home",
            item: "https://xma-agency.com"
          },
          {
            "@type": "ListItem",
            position: 2,
            name: "Services",
            item: "https://xma-agency.com/services"
          },
          {
            "@type": "ListItem",
            position: 3,
            name: "CRM Solution",
            item: "https://xma-agency.com/services/crm-solution"
          }
        ]
      }
    },
    {
      "@type": "SoftwareApplication",
      name: "WhatsApp CRM with AI Chatbot",
      description: "AI-powered CRM system that integrates with WhatsApp Business to automate customer conversations and lead management for UAE businesses.",
      applicationCategory: "BusinessApplication",
      operatingSystem: "Web-based",
      offers: {
        "@type": "Offer",
        price: "0",
        priceCurrency: "AED",
        description: "Free demo available",
        availability: "https://schema.org/InStock"
      },
      aggregateRating: {
        "@type": "AggregateRating",
        ratingValue: "4.8",
        reviewCount: "156",
        bestRating: "5",
        worstRating: "1"
      },
      featureList: [
        "WhatsApp Business Integration",
        "AI Chatbot with 95% accuracy",
        "Visual Sales Pipeline",
        "Smart Automation Workflows",
        "24/7 Customer Support",
        "Multi-language Support"
      ]
    },
    {
      "@type": "Service",
      name: "CRM Implementation and Training",
      description: "Complete setup and training service for our AI-powered WhatsApp CRM system",
      provider: {
        "@id": "https://xma-agency.com/#organization"
      },
      areaServed: {
        "@type": "Country",
        name: "United Arab Emirates"
      },
      hasOfferCatalog: {
        "@type": "OfferCatalog",
        name: "CRM Solutions",
        itemListElement: [
          {
            "@type": "Offer",
            name: "Starter Plan",
            price: "299",
            priceCurrency: "AED",
            description: "Perfect for small businesses with up to 100 contacts"
          },
          {
            "@type": "Offer",
            name: "Professional Plan", 
            price: "599",
            priceCurrency: "AED",
            description: "Ideal for growing businesses with advanced automation"
          },
          {
            "@type": "Offer",
            name: "Enterprise Plan",
            price: "1299",
            priceCurrency: "AED",
            description: "Complete solution for large organizations"
          }
        ]
      }
    }
  ]
};

export default function CRMSolutionPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(structuredData),
        }}
      />
      <CRMPageClient />
    </>
  );
}