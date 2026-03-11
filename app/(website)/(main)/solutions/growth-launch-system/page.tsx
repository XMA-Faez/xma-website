import type { Metadata } from "next";
import SolutionPageTemplate from "../_components/SolutionPageTemplate";
import type { SolutionPageData } from "../_types/solution";

export const metadata: Metadata = {
  title: "Growth Launch System",
  description:
    "Build the complete brand, website, and infrastructure required before scaling marketing. The Growth Launch System by XMA.",
};

const data: SolutionPageData = {
  slug: "growth-launch-system",
  accentColor: "oklch(0.65 0.2 300)",
  hero: {
    badge: "XMA Solution",
    title: "Growth Launch System",
    subtitle:
      "Build the complete brand, website, and infrastructure required before scaling marketing.",
  },
  problem: {
    headline: "Why Most Launches Fail",
    painPoints: [
      {
        title: "No Brand Foundation",
        description:
          "Companies try to scale marketing without a clear brand identity or positioning.",
        icon: "Palette",
      },
      {
        title: "Weak Digital Presence",
        description:
          "Websites that don't convert visitors into leads or customers.",
        icon: "Globe",
      },
      {
        title: "Missing Infrastructure",
        description:
          "No tracking, no CRM, no automation — launching ads into a broken funnel.",
        icon: "Wrench",
      },
    ],
  },
  system: {
    title: "The System",
    description:
      "A complete launch system that builds your brand, website, and marketing infrastructure before you spend a dollar on ads.",
    steps: [
      { label: "Brand Strategy", description: "Positioning and messaging" },
      { label: "Website Build", description: "Conversion-optimized site" },
      { label: "Infrastructure", description: "CRM, tracking, automation" },
      { label: "Launch", description: "Campaign-ready foundation" },
    ],
  },
  included: {
    title: "What's Included",
    items: [
      {
        title: "Brand Strategy & Positioning",
        description:
          "Define your unique market position, messaging framework, and visual identity.",
        icon: "Compass",
      },
      {
        title: "Conversion Website",
        description:
          "High-performance website built to convert traffic into leads and customers.",
        icon: "Monitor",
      },
      {
        title: "Marketing Infrastructure",
        description:
          "Analytics, tracking pixels, CRM integration, and automation workflows.",
        icon: "Settings",
      },
      {
        title: "Launch Strategy",
        description:
          "Go-to-market plan with channel strategy, content framework, and campaign blueprints.",
        icon: "Rocket",
      },
    ],
  },
  process: {
    steps: [
      { title: "Discovery", description: "Deep dive into your business, market, and goals", icon: "Search" },
      { title: "Strategy", description: "Brand positioning and growth architecture", icon: "Lightbulb" },
      { title: "Build", description: "Website, infrastructure, and systems", icon: "Hammer" },
      { title: "Test", description: "QA, tracking validation, and soft launch", icon: "FlaskConical" },
      { title: "Launch", description: "Go live with full marketing readiness", icon: "Rocket" },
    ],
  },
  outcomes: {
    metrics: [
      "Professional brand identity",
      "High-converting website",
      "Complete marketing infrastructure",
      "Campaign-ready launch foundation",
      "Clear growth roadmap",
      "CRM and automation setup",
    ],
  },
  qualification: {
    forWho: [
      "New businesses ready to build a strong foundation",
      "Companies rebranding or repositioning",
      "Businesses preparing to scale marketing spend",
    ],
    notForWho: [
      "Companies looking for quick logo designs",
      "Businesses not ready to invest in infrastructure",
      "Companies expecting results without a proper foundation",
    ],
  },
  cta: {
    headline: "Ready to Build Your Growth Foundation?",
    subtext:
      "Apply to work with XMA and launch with the infrastructure needed to scale.",
  },
};

export default function GrowthLaunchSystemPage() {
  return <SolutionPageTemplate data={data} />;
}
