import type { Metadata } from "next";
import { Suspense } from "react";
import dynamic from "next/dynamic";
import Hero from "@/components/landing-page/hero/Hero";
import CredibilityStrip from "./_components/CredibilityStrip";

const ProblemSection = dynamic(() => import("./_components/ProblemSection"));
const XMASolutionSection = dynamic(
  () => import("./_components/XMASolutionSection"),
);
const SolutionsOverviewSection = dynamic(
  () => import("./_components/SolutionsOverviewSection"),
);
const BrowserShowcaseSection = dynamic(
  () => import("./_components/BrowserShowcaseSection"),
);
const FounderSection = dynamic(() => import("./_components/FounderSection"));
const QualificationCTA = dynamic(
  () => import("./_components/QualificationCTA"),
);

export const metadata: Metadata = {
  title: "Growth Systems Built to Scale Revenue | XMA",
  description:
    "XMA designs and implements the marketing, sales, and conversion systems companies need to generate leads, acquire customers, and grow revenue predictably.",
  keywords: [
    "growth systems agency Dubai",
    "lead generation systems",
    "marketing infrastructure",
    "sales pipeline automation",
    "revenue growth agency",
    "B2B lead generation",
    "e-commerce revenue engine",
    "CRM automation",
    "conversion optimization",
    "digital marketing Dubai",
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
    title: "Growth Systems Built to Scale Revenue | XMA",
    description:
      "XMA designs and implements growth systems that help businesses generate leads, acquire customers, and scale revenue predictably.",
    url: "/",
    siteName: "XMA Agency",
    images: [
      {
        url: "/xma-website.png",
        width: 1200,
        height: 630,
        alt: "XMA Agency - Growth Systems Built to Scale Revenue",
      },
    ],
    locale: "en_AE",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Growth Systems Built to Scale Revenue | XMA",
    description:
      "XMA designs and implements growth systems that help businesses generate leads, acquire customers, and scale revenue.",
    images: ["/xma-website.png"],
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
        height: 60,
      },
      contactPoint: {
        "@type": "ContactPoint",
        contactType: "customer service",
        availableLanguage: ["English"],
      },
    },
    {
      "@type": "WebPage",
      "@id": "https://www.xma.ae/#webpage",
      url: "https://www.xma.ae",
      name: "Growth Systems Built to Scale Revenue | XMA",
      description:
        "XMA designs and implements growth systems that help businesses generate leads, acquire customers, and scale revenue predictably.",
      inLanguage: "en-AE",
      isPartOf: {
        "@id": "https://www.xma.ae/#website",
      },
      about: {
        "@id": "https://www.xma.ae/#organization",
      },
      dateModified: new Date().toISOString(),
    },
    {
      "@type": "Service",
      name: "Growth Systems for Businesses",
      description:
        "XMA designs and implements integrated marketing, sales, and conversion systems that help companies generate leads, acquire customers, and grow revenue predictably.",
      provider: {
        "@id": "https://www.xma.ae/#organization",
      },
      serviceType: "Growth Systems and Marketing Infrastructure",
      areaServed: "United Arab Emirates",
      audience: {
        "@type": "Audience",
        audienceType: "Growth-focused businesses ready to scale",
      },
    },
  ],
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
      <div className="relative w-full">
        <Hero />
        <CredibilityStrip />
        {/* <ProblemSection /> */}
        <XMASolutionSection />
        <SolutionsOverviewSection />
        <Suspense
          fallback={
            <div className="mx-auto max-w-7xl px-4 py-16">
              <div className="h-96 animate-pulse rounded-2xl bg-zinc-900/50" />
            </div>
          }
        >
          <BrowserShowcaseSection />
        </Suspense>
        <FounderSection />
        <QualificationCTA />
      </div>
    </>
  );
}
