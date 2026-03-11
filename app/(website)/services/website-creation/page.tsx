import type { Metadata } from "next";
import WebCreationPageClient from "./page-client";

export const metadata: Metadata = {
  title: "Premium Website Design & Development in Dubai | Next.js Experts | XMA Agency",
  description: "Custom high-performance websites built with Next.js for Dubai businesses. 90+ PageSpeed guaranteed, sub-2s load times, and conversion-focused design. Book a free strategy call today.",
  keywords: [
    "website design Dubai",
    "Next.js development UAE",
    "premium website Dubai",
    "web development agency Dubai",
    "custom website Dubai",
    "high performance website UAE",
    "Sanity CMS Dubai",
    "website redesign Dubai",
    "conversion optimization UAE",
    "luxury website design Dubai",
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
    canonical: "/services/website-creation",
  },
  openGraph: {
    title: "Premium Website Design & Development | 90+ PageSpeed Guaranteed",
    description: "Stop losing customers to a slow website. We build premium, high-performance Next.js websites that turn your traffic into bookings for Dubai businesses.",
    url: "/services/website-creation",
    siteName: "XMA Agency",
    images: [
      {
        url: "/images/website-creation-og.jpg",
        width: 1200,
        height: 630,
        alt: "Premium website design showcase with performance metrics and modern UI components",
      },
    ],
    locale: "en_AE",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Premium Website Design & Development | 90+ PageSpeed Guaranteed",
    description: "Stop losing customers to a slow website. We build premium, high-performance Next.js websites that turn your traffic into bookings for Dubai businesses.",
    images: ["/images/website-creation-twitter.jpg"],
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
        height: 60,
      },
      contactPoint: {
        "@type": "ContactPoint",
        telephone: "+971-50-363-6856",
        contactType: "customer service",
        areaServed: "AE",
        availableLanguage: ["English", "Arabic"],
      },
      address: {
        "@type": "PostalAddress",
        addressCountry: "AE",
        addressRegion: "Dubai",
      },
      sameAs: [
        "https://linkedin.com/company/xma-agency",
        "https://twitter.com/xmaagency",
      ],
    },
    {
      "@type": "WebPage",
      "@id": "https://xma-agency.com/services/website-creation/#webpage",
      url: "https://xma-agency.com/services/website-creation",
      name: "Premium Website Design & Development in Dubai",
      description: "Custom high-performance websites built with Next.js for Dubai businesses. 90+ PageSpeed guaranteed, sub-2s load times, and conversion-focused design.",
      inLanguage: "en-AE",
      isPartOf: {
        "@id": "https://xma-agency.com/#website",
      },
      about: {
        "@id": "https://xma-agency.com/#organization",
      },
      primaryImageOfPage: {
        "@type": "ImageObject",
        url: "https://xma-agency.com/images/website-creation-hero.jpg",
      },
      dateModified: new Date().toISOString(),
      breadcrumb: {
        "@type": "BreadcrumbList",
        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            name: "Home",
            item: "https://xma-agency.com",
          },
          {
            "@type": "ListItem",
            position: 2,
            name: "Services",
            item: "https://xma-agency.com/services",
          },
          {
            "@type": "ListItem",
            position: 3,
            name: "Website Creation",
            item: "https://xma-agency.com/services/website-creation",
          },
        ],
      },
    },
    {
      "@type": "Service",
      name: "Web Design and Development",
      serviceType: "Web Design and Development",
      description: "Custom high-performance website design and development using Next.js, React, and Sanity CMS for Dubai businesses seeking premium digital presence.",
      provider: {
        "@id": "https://xma-agency.com/#organization",
      },
      areaServed: {
        "@type": "Country",
        name: "United Arab Emirates",
      },
      hasOfferCatalog: {
        "@type": "OfferCatalog",
        name: "Website Development Services",
        itemListElement: [
          {
            "@type": "Offer",
            name: "Premium Website",
            description: "Custom Next.js website with Sanity CMS, 90+ PageSpeed, and conversion optimization",
          },
          {
            "@type": "Offer",
            name: "Website Redesign",
            description: "Complete redesign and migration to modern tech stack with performance guarantees",
          },
        ],
      },
      aggregateRating: {
        "@type": "AggregateRating",
        ratingValue: "4.9",
        reviewCount: "87",
        bestRating: "5",
        worstRating: "1",
      },
      featureList: [
        "Next.js Development",
        "Sanity CMS Integration",
        "90+ PageSpeed Guaranteed",
        "Responsive Design",
        "SEO Optimization",
        "Ongoing Support",
      ],
    },
  ],
};

export default function WebCreationPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(structuredData),
        }}
      />
      <WebCreationPageClient />
    </>
  );
}
