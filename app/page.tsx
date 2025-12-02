import type { Metadata } from "next";
import RealEstateClient from "./real-estate/page-client";

export const metadata: Metadata = {
  title: "Real Estate Ad Management | Meta & Google Ads | XMA",
  description: "Fill your pipeline with qualified property leads. Specialized Meta & Google ad campaigns for UAE real estate professionals. From solo agents to brokerages.",
  keywords: [
    "real estate ads Dubai",
    "property lead generation UAE",
    "real estate marketing agency",
    "Facebook ads for realtors",
    "Google ads real estate",
    "Dubai property advertising",
    "real estate agent marketing",
    "property leads Dubai",
    "real estate digital marketing",
    "agent lead generation"
  ],
  authors: [{ name: "XMA Agency" }],
  creator: "XMA Agency",
  publisher: "XMA Agency",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL("https://www.xma.ae"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Real Estate Ad Management | Qualified Leads for UAE Agents",
    description: "Stop wasting ad spend on unqualified leads. We deliver serious buyers and tenants ready to view your properties.",
    url: "/",
    siteName: "XMA Agency",
    images: [
      {
        url: "/images/real-estate-og.jpg",
        width: 1200,
        height: 630,
        alt: "Real estate ad management and lead generation results",
      },
    ],
    locale: "en_AE",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Real Estate Ad Management | Qualified Leads for UAE Agents",
    description: "Stop wasting ad spend on unqualified leads. We deliver serious buyers and tenants ready to view your properties.",
    images: ["/images/real-estate-twitter.jpg"],
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
  category: "business",
};

const structuredData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": "https://www.xma.ae/#organization",
      name: "XMA Agency",
      url: "https://www.xma.ae",
      logo: {
        "@type": "ImageObject",
        url: "https://www.xma.ae/images/logo.png",
        width: 200,
        height: 60
      },
      contactPoint: {
        "@type": "ContactPoint",
        contactType: "customer service",
        availableLanguage: ["English", "Arabic"]
      }
    },
    {
      "@type": "WebPage",
      "@id": "https://www.xma.ae/#webpage",
      url: "https://www.xma.ae",
      name: "Real Estate Ad Management | Meta & Google Ads for UAE Agents",
      description: "Fill your pipeline with qualified property leads. Specialized Meta & Google ad campaigns for UAE real estate professionals.",
      inLanguage: "en-AE",
      isPartOf: {
        "@id": "https://www.xma.ae/#website"
      },
      about: {
        "@id": "https://www.xma.ae/#organization"
      },
      dateModified: new Date().toISOString()
    },
    {
      "@type": "Service",
      name: "Real Estate Ad Management",
      description: "Complete Meta and Google ad management service for UAE real estate professionals, delivering qualified buyer and tenant leads.",
      provider: {
        "@id": "https://www.xma.ae/#organization"
      },
      serviceType: "Digital Marketing",
      areaServed: "United Arab Emirates",
      audience: {
        "@type": "Audience",
        audienceType: "Real estate agents, teams, and brokerages"
      }
    }
  ]
};

export default function Home() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(structuredData),
        }}
      />
      <RealEstateClient />
    </>
  );
}
