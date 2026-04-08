import type { Metadata } from "next";
import { notFound } from "next/navigation";
import {
  getPageBySlug,
  getAllSlugs,
  allServicePages,
  allIndustryPages,
} from "@/data/landing-pages/registry";
import type { ServicePageData, IndustryPageData } from "@/data/landing-pages/types";
import ServicePageTemplate from "@/app/(website)/(main)/_components/landing-pages/ServicePageTemplate";
import IndustryPageTemplate from "@/app/(website)/(main)/_components/landing-pages/IndustryPageTemplate";

const BASE_URL = "https://www.xma.ae";

export function generateStaticParams() {
  return getAllSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const page = getPageBySlug(slug);
  if (!page) return {};

  return {
    title: page.seo.title,
    description: page.seo.description,
    keywords: page.seo.keywords,
    alternates: { canonical: `${BASE_URL}/${page.slug}` },
    openGraph: {
      title: page.seo.title,
      description: page.seo.description,
      url: `${BASE_URL}/${page.slug}`,
      siteName: "XMA Agency",
      type: "website",
    },
  };
}

function buildStructuredData(page: ServicePageData | IndustryPageData) {
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: page.faq.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: { "@type": "Answer", text: item.answer },
    })),
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: BASE_URL },
      {
        "@type": "ListItem",
        position: 2,
        name: page.hero.badge,
        item: `${BASE_URL}/${page.slug}`,
      },
    ],
  };

  const orgSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "XMA Agency",
    url: BASE_URL,
    address: {
      "@type": "PostalAddress",
      addressLocality: "Dubai",
      addressCountry: "AE",
    },
  };

  if (page.category === "service") {
    return [
      {
        "@context": "https://schema.org",
        "@type": "Service",
        name: page.hero.badge,
        description: page.seo.description,
        provider: orgSchema,
        areaServed: { "@type": "Country", name: "United Arab Emirates" },
        serviceType: page.hero.badge,
      },
      faqSchema,
      breadcrumbSchema,
    ];
  }

  return [
    {
      "@context": "https://schema.org",
      "@type": "WebPage",
      name: page.seo.title,
      description: page.seo.description,
      url: `${BASE_URL}/${page.slug}`,
      publisher: orgSchema,
    },
    faqSchema,
    breadcrumbSchema,
  ];
}

function buildCrossLinkItems(
  page: ServicePageData | IndustryPageData
): { name: string; description: string; href: string }[] {
  const allPages = [...allServicePages, ...allIndustryPages];
  return page.crossLinks
    .map((slug) => {
      const linked = allPages.find((p) => p.slug === slug);
      if (!linked) return null;
      return {
        name: linked.hero.badge,
        description: linked.seo.description.slice(0, 120),
        href: `/${linked.slug}`,
      };
    })
    .filter(Boolean) as { name: string; description: string; href: string }[];
}

export default async function LandingPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const page = getPageBySlug(slug);
  if (!page) notFound();

  const structuredData = buildStructuredData(page);
  const crossLinkItems = buildCrossLinkItems(page);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      {page.category === "service" ? (
        <ServicePageTemplate
          data={page as ServicePageData}
          crossLinkItems={crossLinkItems}
        />
      ) : (
        <IndustryPageTemplate
          data={page as IndustryPageData}
          crossLinkItems={crossLinkItems}
        />
      )}
    </>
  );
}
