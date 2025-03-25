// import About from "@/components/landing-page/about-section/About";
// import CTA from "@/components/landing-page/cta/CTA";
// import Hero from "@/components/landing-page/hero/Hero";
// import Products from "@/components/landing-page/products/Products";
// import Services from "@/components/landing-page/services/Services";
//
// export default function Home() {
//   return (
//     <div className="relative w-full">
//       <Hero />
//       <About />
//       <Products />
//       <Services />
//       <CTA />
//     </div>
//   );
// }

// /app/vsl/page.js
import React from "react";
import VSLPage from "@/components/vsl/VSLPage";

export const metadata = {
  title: "XMA Agency - Generate Qualified Leads On Autopilot",
  description:
    "Top businesses trust our 4-step system to grow consistently month after month. Learn how our proven lead flow system can guarantee qualified leads without you lifting a finger.",
  openGraph: {
    title: "XMA Agency - Generate Qualified Leads On Autopilot",
    description:
      "Top businesses trust our 4-step system to grow consistently month after month",
  },
  icons: {
    icon: [
      {
        media: "(prefers-color-scheme: light)",
        url: "/images/icon-48x48-dark.png",
        href: "/images/icon-48x48-dark.png",
      },
      {
        media: "(prefers-color-scheme: dark)",
        url: "/images/icon-48x48-light.png",
        href: "/images/icon-48x48-light.png",
      },
    ],
  },
};

export default function VSL() {
  return <VSLPage />;
}
