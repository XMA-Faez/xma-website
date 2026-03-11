import type { Metadata } from "next";
import LeadGenPageClient from "./page-client";

export const metadata: Metadata = {
  title: "Lead Generation & Paid Ads for UAE Businesses | Google & Meta Ads Dubai",
  description: "Precision-targeted Google Ads and Meta Ads campaigns that generate qualified leads for UAE businesses. 3.5x average ROAS with 40% lower cost per lead. Book a free ad audit today.",
  keywords: [
    "lead generation Dubai",
    "Google Ads Dubai",
    "Meta Ads UAE",
    "digital advertising Dubai",
    "Facebook Ads Dubai",
    "Instagram Ads UAE",
    "PPC management Dubai",
    "paid ads UAE",
    "performance marketing Dubai",
    "lead generation UAE"
  ],
  authors: [{ name: "XMA Agency" }],
  creator: "XMA Agency",
  publisher: "XMA Agency",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  alternates: {
    canonical: "/services/lead-generation",
  },
  openGraph: {
    title: "Lead Generation & Paid Ads | 3.5x ROAS for UAE Businesses",
    description: "Stop wasting ad spend on unqualified leads. Our precision-targeted campaigns on Google and Meta generate qualified leads that convert into paying customers.",
    url: "/services/lead-generation",
    siteName: "XMA Agency",
    images: [
      {
        url: "/images/lead-generation-og.jpg",
        width: 1200,
        height: 630,
        alt: "XMA Agency Lead Generation Dashboard showing campaign performance metrics and ROAS tracking",
      },
    ],
    locale: "en_AE",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Lead Generation & Paid Ads | 3.5x ROAS for UAE Businesses",
    description: "Stop wasting ad spend on unqualified leads. Our precision-targeted campaigns on Google and Meta generate qualified leads that convert into paying customers.",
    images: ["/images/lead-generation-twitter.jpg"],
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
  category: "marketing",
};

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
        telephone: "+971-50-363-6856",
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
      "@id": "https://xma-agency.com/services/lead-generation/#webpage",
      url: "https://xma-agency.com/services/lead-generation",
      name: "Lead Generation & Paid Ads for UAE Businesses",
      description: "Precision-targeted Google Ads and Meta Ads campaigns that generate qualified leads for UAE businesses with 3.5x average ROAS.",
      inLanguage: "en-AE",
      isPartOf: {
        "@id": "https://xma-agency.com/#website"
      },
      about: {
        "@id": "https://xma-agency.com/#organization"
      },
      primaryImageOfPage: {
        "@type": "ImageObject",
        url: "https://xma-agency.com/images/lead-generation-hero.jpg"
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
            name: "Lead Generation",
            item: "https://xma-agency.com/services/lead-generation"
          }
        ]
      }
    },
    {
      "@type": "Service",
      name: "Digital Advertising & Lead Generation",
      serviceType: "Digital Advertising",
      description: "Precision-targeted Google Ads and Meta Ads campaigns designed to generate qualified leads and maximize ROAS for UAE businesses.",
      provider: {
        "@id": "https://xma-agency.com/#organization"
      },
      areaServed: {
        "@type": "Country",
        name: "United Arab Emirates"
      },
      hasOfferCatalog: {
        "@type": "OfferCatalog",
        name: "Lead Generation Services",
        itemListElement: [
          {
            "@type": "Offer",
            name: "Google Ads Management",
            description: "Search, Display, YouTube, Shopping, and Performance Max campaign management"
          },
          {
            "@type": "Offer",
            name: "Meta Ads Management",
            description: "Facebook and Instagram advertising with lookalike audiences and retargeting"
          },
          {
            "@type": "Offer",
            name: "Full-Funnel Lead Generation",
            description: "End-to-end campaign strategy, optimization, and lead qualification"
          }
        ]
      },
      aggregateRating: {
        "@type": "AggregateRating",
        ratingValue: "4.9",
        reviewCount: "200",
        bestRating: "5",
        worstRating: "1"
      }
    }
  ]
};

export default function LeadGenerationPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(structuredData),
        }}
      />
      <LeadGenPageClient />
    </>
  );
}
