import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import Section from "@/components/ui/section";
import { industryPageEntries } from "@/data/landing-pages/registry";

export const metadata: Metadata = {
  title: "Industries We Serve in Dubai & UAE | XMA Agency",
  description:
    "XMA builds marketing systems for 20+ industries across Dubai and the UAE — real estate, hospitality, healthcare, e-commerce, fintech, and more.",
  keywords: [
    "marketing agency Dubai industries",
    "industry marketing UAE",
    "Dubai marketing by industry",
  ],
  alternates: { canonical: "https://www.xma.ae/industries-hub" },
  openGraph: {
    title: "Industries We Serve in Dubai & UAE | XMA Agency",
    description:
      "XMA builds marketing systems for 20+ industries across Dubai and the UAE.",
    url: "https://www.xma.ae/industries-hub",
    siteName: "XMA Agency",
    type: "website",
  },
};

export default function IndustriesHubPage() {
  return (
    <div className="relative w-full">
      <Section size="xl" padding="lg">
        <div className="max-w-3xl mb-16">
          <span className="inline-block px-4 py-1.5 rounded-full text-sm font-medium mb-6 border border-zinc-700/50 text-zinc-400">
            Industries
          </span>
          <h1 className="text-4xl md:text-6xl font-bold tracking-tighter text-white mb-6 leading-[1.1]">
            Marketing Systems for Every Industry in Dubai
          </h1>
          <p className="text-lg text-zinc-400 leading-relaxed">
            Whether you're in real estate, healthcare, e-commerce, or hospitality — we build marketing and sales systems tailored to your industry's specific challenges, buyer behavior, and competitive landscape in the UAE.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {industryPageEntries.map((industry) => (
            <Link
              key={industry.slug}
              href={`/${industry.slug}`}
              className="group glass-secondary rounded-2xl p-8 border border-zinc-800/50 hover:border-zinc-600/50 transition-all duration-300 hover:-translate-y-1 flex flex-col"
            >
              <h2 className="text-lg font-semibold text-white mb-2 group-hover:text-zinc-100">
                {industry.name}
              </h2>
              <p className="text-sm text-zinc-400 leading-relaxed mb-4 flex-1">
                {industry.description}
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
