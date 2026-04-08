import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import Section from "@/components/ui/section";
import { servicePageEntries } from "@/data/landing-pages/registry";

export const metadata: Metadata = {
  title: "Marketing Services Dubai & UAE | XMA Agency",
  description:
    "Explore XMA's full range of marketing services in Dubai and the UAE — from performance marketing and SEO to CRM integration, video production, and AI-powered campaigns.",
  keywords: [
    "marketing services Dubai",
    "digital marketing agency UAE",
    "marketing services UAE",
  ],
  alternates: { canonical: "https://www.xma.ae/services-hub" },
  openGraph: {
    title: "Marketing Services Dubai & UAE | XMA Agency",
    description:
      "Explore XMA's full range of marketing services in Dubai and the UAE.",
    url: "https://www.xma.ae/services-hub",
    siteName: "XMA Agency",
    type: "website",
  },
};

export default function ServicesHubPage() {
  return (
    <div className="relative w-full">
      <Section size="xl" padding="lg">
        <div className="max-w-3xl mb-16">
          <span className="inline-block px-4 py-1.5 rounded-full text-sm font-medium mb-6 border border-zinc-700/50 text-zinc-400">
            Our Services
          </span>
          <h1 className="text-4xl md:text-6xl font-bold tracking-tighter text-white mb-6 leading-[1.1]">
            Marketing Services Built for Growth in Dubai
          </h1>
          <p className="text-lg text-zinc-400 leading-relaxed">
            From paid media and SEO to CRM automation and video production — every service is designed to generate leads, acquire customers, and scale revenue for businesses in the UAE.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {servicePageEntries.map((service) => (
            <Link
              key={service.slug}
              href={`/${service.slug}`}
              className="group glass-secondary rounded-2xl p-8 border border-zinc-800/50 hover:border-zinc-600/50 transition-all duration-300 hover:-translate-y-1 flex flex-col"
            >
              <h2 className="text-lg font-semibold text-white mb-2 group-hover:text-zinc-100">
                {service.name}
              </h2>
              <p className="text-sm text-zinc-400 leading-relaxed mb-4 flex-1">
                {service.description}
              </p>
              <span className="inline-flex items-center gap-1.5 text-sm font-medium text-zinc-500 group-hover:text-white group-hover:gap-2.5 transition-all duration-300">
                Learn more
                <ArrowRight className="w-4 h-4" />
              </span>
            </Link>
          ))}
        </div>
      </Section>
    </div>
  );
}
