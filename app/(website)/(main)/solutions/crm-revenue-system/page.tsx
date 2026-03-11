import type { Metadata } from "next";
import CRMPageClient from "@/app/(website)/services/crm-solution/page-client";

export const metadata: Metadata = {
  title: "AI-Powered WhatsApp CRM for UAE Businesses | Never Miss a Lead Again",
  description:
    "Revolutionary CRM with AI chatbot that connects WhatsApp, automates conversations, and converts 67% more leads for UAE service businesses.",
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
    "CRM software Dubai",
  ],
  alternates: {
    canonical: "/solutions/crm-revenue-system",
  },
  openGraph: {
    title: "AI WhatsApp CRM | 67% More Leads for UAE Businesses",
    description:
      "Stop losing WhatsApp leads to poor follow-up. Our AI-powered CRM automates conversations and converts more inquiries into paying customers.",
    url: "/solutions/crm-revenue-system",
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
    description:
      "Stop losing WhatsApp leads to poor follow-up. Our AI-powered CRM automates conversations and converts more inquiries into paying customers.",
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
  category: "technology",
};

const structuredData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "SoftwareApplication",
      name: "WhatsApp CRM with AI Chatbot",
      description:
        "AI-powered CRM system that integrates with WhatsApp Business to automate customer conversations and lead management for UAE businesses.",
      applicationCategory: "BusinessApplication",
      operatingSystem: "Web-based",
      offers: {
        "@type": "Offer",
        price: "0",
        priceCurrency: "AED",
        description: "Free demo available",
        availability: "https://schema.org/InStock",
      },
      featureList: [
        "WhatsApp Business Integration",
        "AI Chatbot with 95% accuracy",
        "Visual Sales Pipeline",
        "Smart Automation Workflows",
        "24/7 Customer Support",
        "Multi-language Support",
      ],
    },
    {
      "@type": "Service",
      name: "CRM Implementation and Training",
      description:
        "Complete setup and training service for our AI-powered WhatsApp CRM system",
      provider: {
        "@id": "https://www.xma.ae/#organization",
      },
      areaServed: {
        "@type": "Country",
        name: "United Arab Emirates",
      },
    },
  ],
};

export default function CRMRevenueSystemPage() {
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
