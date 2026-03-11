import type { Metadata } from "next";
import ROICalculator from "../_components/ROICalculator";
import CRMErrorBoundary from "../_components/ErrorBoundary";
import Section from "@/components/ui/section";
import Link from "next/link";
import { ScanningButton } from "@/components/ui/ScanningButton";

export const metadata: Metadata = {
  title: "CRM ROI Calculator | See Your Potential Revenue Growth | XMA",
  description:
    "Calculate how much revenue you could recover with an AI-powered WhatsApp CRM. See your projected ROI based on your current leads, close rate, and deal size.",
  alternates: {
    canonical: "/services/crm-solution/roi-calculator",
  },
  openGraph: {
    title: "CRM ROI Calculator | XMA Agency",
    description:
      "Calculate how much revenue you could recover with an AI-powered WhatsApp CRM.",
    url: "/services/crm-solution/roi-calculator",
    siteName: "XMA Agency",
    locale: "en_AE",
    type: "website",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function ROICalculatorPage() {
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
            Calculate Your CRM ROI
          </h1>
          <p className="text-lg text-zinc-400">
            See how much revenue you could recover by automating your lead
            follow-up with our AI-powered WhatsApp CRM.
          </p>
        </div>
      </Section>

      <CRMErrorBoundary>
        <ROICalculator />
      </CRMErrorBoundary>

      <Section size="md" padding="lg" className="relative z-10">
        <div className="text-center">
          <p className="text-lg text-zinc-400 mb-6">
            Ready to see these numbers become reality?
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
