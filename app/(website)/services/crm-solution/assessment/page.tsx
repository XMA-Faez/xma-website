import type { Metadata } from "next";
import BusinessAssessment from "../_components/BusinessAssessment";
import CRMErrorBoundary from "../_components/ErrorBoundary";
import Section from "@/components/ui/section";
import Link from "next/link";
import { ScanningButton } from "@/components/ui/ScanningButton";

export const metadata: Metadata = {
  title: "CRM Readiness Assessment | Is Your Business Ready? | XMA",
  description:
    "Take our free CRM readiness assessment to discover where your business is losing leads and how an AI-powered WhatsApp CRM can help you convert more.",
  alternates: {
    canonical: "/services/crm-solution/assessment",
  },
  openGraph: {
    title: "CRM Readiness Assessment | XMA Agency",
    description:
      "Discover where your business is losing leads and how to fix it.",
    url: "/services/crm-solution/assessment",
    siteName: "XMA Agency",
    locale: "en_AE",
    type: "website",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function AssessmentPage() {
  return (
    <div className="relative w-full">
      <div
        className="absolute inset-0 h-[40vh]"
        style={{
          background: `
            radial-gradient(ellipse 70% 50% at 50% 0%, oklch(0.7 0.19 160 / 0.15), transparent 60%),
            linear-gradient(180deg, oklch(0.07 0 0), oklch(0.05 0 0))
          `,
        }}
      />

      <Section size="xl" padding="lg" className="relative z-10">
        <div className="max-w-3xl mx-auto text-center mb-12">
          <Link
            href="/services/crm-solution"
            className="text-sm text-zinc-500 hover:text-zinc-300 transition-colors mb-4 inline-block"
          >
            &larr; Back to CRM Solution
          </Link>
          <h1 className="text-3xl md:text-5xl font-bold tracking-tight text-white mb-4 leading-[1.1]">
            CRM Readiness Assessment
          </h1>
          <p className="text-lg text-zinc-400">
            Answer a few questions to discover where your business is losing
            leads and get a personalized recommendation.
          </p>
        </div>
      </Section>

      <CRMErrorBoundary>
        <BusinessAssessment />
      </CRMErrorBoundary>

      <Section size="md" padding="lg" className="relative z-10">
        <div className="text-center">
          <p className="text-lg text-zinc-400 mb-6">
            Want to discuss your results with an expert?
          </p>
          <Link href="/book-crm">
            <ScanningButton color="emerald" variant="primary" size="lg">
              Book a Demo
            </ScanningButton>
          </Link>
        </div>
      </Section>
    </div>
  );
}
