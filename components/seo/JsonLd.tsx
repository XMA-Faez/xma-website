import Script from "next/script";

const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "@id": "https://www.xma.ae/#organization",
  name: "XMA Agency",
  url: "https://www.xma.ae",
  logo: {
    "@type": "ImageObject",
    url: "https://www.xma.ae/icon-512x512.png",
    width: 512,
    height: 512,
  },
  image: "https://www.xma.ae/icon-512x512.png",
  description:
    "XMA Agency is a digital marketing agency specializing in web design for luxury car rental companies.",
  sameAs: [
    "https://www.instagram.com/xma.agency",
    "https://www.linkedin.com/company/xma-agency",
  ],
  contactPoint: {
    "@type": "ContactPoint",
    contactType: "customer service",
    availableLanguage: ["English", "Arabic"],
  },
};

const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": "https://www.xma.ae/#website",
  url: "https://www.xma.ae",
  name: "XMA Agency",
  publisher: {
    "@id": "https://www.xma.ae/#organization",
  },
};

const localBusinessSchema = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  "@id": "https://www.xma.ae/#localbusiness",
  name: "XMA Agency",
  image: "https://www.xma.ae/icon-512x512.png",
  url: "https://www.xma.ae",
  address: {
    "@type": "PostalAddress",
    addressCountry: "AE",
    addressLocality: "Dubai",
  },
  priceRange: "$$$",
  openingHoursSpecification: {
    "@type": "OpeningHoursSpecification",
    dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
    opens: "09:00",
    closes: "18:00",
  },
};

export function JsonLd() {
  return (
    <>
      <Script
        id="organization-jsonld"
        type="application/ld+json"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(organizationSchema),
        }}
      />
      <Script
        id="website-jsonld"
        type="application/ld+json"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(websiteSchema),
        }}
      />
      <Script
        id="localbusiness-jsonld"
        type="application/ld+json"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(localBusinessSchema),
        }}
      />
    </>
  );
}
