import type { Metadata } from "next";
import HeroSection from "./_components/HeroSection";
import SocialProofStrip from "./_components/SocialProofStrip";
import BrowserShowcaseSection from "./_components/BrowserShowcaseSection";
import BenefitsSection from "./_components/BenefitsSection";
import StackingServicesSection from "./_components/StackingServicesSection";
import ProofSection from "./_components/ProofSection";
import FAQSection from "./_components/FAQSection";
import WhyUsSection from "./_components/WhyUsSection";
import CTASection from "./_components/CTASection";

export const metadata: Metadata = {
  title: "Premium Websites for Luxury Car Rentals | XMA",
  description:
    "We craft websites that look as premium as your fleet — and convert visitors into bookings. Premium web design for luxury car rental companies.",
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
    title: "Premium Websites for Luxury Car Rentals | XMA",
    description:
      "We craft websites that look as premium as your fleet — and convert visitors into bookings.",
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
    title: "Premium Websites for Luxury Car Rentals | XMA",
    description:
      "We craft websites that look as premium as your fleet — and convert visitors into bookings.",
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
      name: "Premium Websites for Luxury Car Rentals | XMA",
      description:
        "We craft websites that look as premium as your fleet — and convert visitors into bookings.",
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
      name: "Premium Website Design for Luxury Car Rentals",
      description:
        "Premium website design and development for luxury car rental companies. We craft websites that look as premium as your fleet and convert visitors into bookings.",
      provider: {
        "@id": "https://www.xma.ae/#organization",
      },
      serviceType: "Web Design and Development",
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
      <div className="min-h-screen w-full relative bg-zinc-950">
        <HeroSection />
        <SocialProofStrip />
        <BrowserShowcaseSection />
        <BenefitsSection />
        <StackingServicesSection />
        <ProofSection />
        <FAQSection />
        <WhyUsSection />
        <CTASection />
      </div>
    </>
  );
}
