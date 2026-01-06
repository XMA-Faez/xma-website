import type { Metadata } from "next";
import HeroSection from "@/components/home/sections/HeroSection";
import SocialProofStrip from "@/components/home/sections/SocialProofStrip";
import ProblemSection from "@/components/home/sections/ProblemSection";
import SolutionSection from "@/components/home/sections/SolutionSection";
import ProofSection from "@/components/home/sections/ProofSection";
import WhatsAppWidget from "@/components/ui/WhatsAppWidget";
import CTASection from "@/components/home/sections/CTASection";

export const metadata: Metadata = {
  title: "Luxury Car Rental Marketing | Increase Bookings | XMA",
  description:
    "Turn luxury car inquiries into confirmed bookings. We help UAE luxury car rental companies increase their booking rate through conversion optimization, WhatsApp automation, and premium branding.",
  keywords: [
    "luxury car rental marketing Dubai",
    "car rental advertising UAE",
    "exotic car rental leads",
    "luxury vehicle marketing",
    "car rental booking optimization",
    "WhatsApp automation car rental",
    "luxury car rental agency",
    "Dubai car rental marketing",
    "premium car rental advertising",
    "car rental conversion optimization",
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
    title: "Luxury Car Rental Marketing | Turn Inquiries Into Bookings",
    description:
      "Stop losing bookings to slow response times and weak follow-up. We optimize your entire conversion funnel for luxury car rentals in the UAE.",
    url: "/",
    siteName: "XMA Agency",
    images: [
      {
        url: "/images/luxury-car-og.jpg",
        width: 1200,
        height: 630,
        alt: "Luxury car rental marketing and booking optimization",
      },
    ],
    locale: "en_AE",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Luxury Car Rental Marketing | Turn Inquiries Into Bookings",
    description:
      "Stop losing bookings to slow response times and weak follow-up. We optimize your entire conversion funnel for luxury car rentals in the UAE.",
    images: ["/images/luxury-car-twitter.jpg"],
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
      name: "Luxury Car Rental Marketing | Increase Bookings | XMA",
      description:
        "Turn luxury car inquiries into confirmed bookings. Conversion optimization, WhatsApp automation, and premium branding for UAE luxury car rental companies.",
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
      name: "Luxury Car Rental Marketing",
      description:
        "Complete marketing and conversion optimization service for UAE luxury car rental companies, delivering increased booking rates through WhatsApp automation, premium branding, and qualified lead generation.",
      provider: {
        "@id": "https://www.xma.ae/#organization",
      },
      serviceType: "Digital Marketing",
      areaServed: "United Arab Emirates",
      audience: {
        "@type": "Audience",
        audienceType: "Luxury car rental business owners and operators",
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
      <div className="min-h-screen w-full relative bg-white dark:bg-black">
        <HeroSection />
        <SocialProofStrip />
        <ProblemSection />
        <SolutionSection />
        <ProofSection />
        <CTASection />

        <WhatsAppWidget />
      </div>
    </>
  );
}
