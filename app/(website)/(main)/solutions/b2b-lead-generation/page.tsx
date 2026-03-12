import type { Metadata } from "next";
import SolutionPageTemplate from "../_components/SolutionPageTemplate";
import type { SolutionPageData } from "../_types/solution";

export const metadata: Metadata = {
  title: "B2B Lead Generation System",
  description:
    "Generate qualified leads and build predictable sales pipelines with XMA's B2B Lead Generation System.",
};

const data: SolutionPageData = {
  slug: "b2b-lead-generation",
  accentColor: "oklch(0.75 0.16 65)",
  hero: {
    badge: "XMA Solution",
    title: "B2B Lead Generation System",
    subtitle:
      "A system designed to generate qualified leads and build predictable sales pipelines.",
    image: "/solutions/lead-generation-desktop.png",
    mobileImage: "/solutions/lead-generation-mobile.png",
  },
  problem: {
    headline: "Why B2B Lead Generation Fails",
    painPoints: [
      {
        title: "Inconsistent Pipeline",
        description:
          "Lead flow is unpredictable — some months are great, others are dry.",
        icon: "Activity",
      },
      {
        title: "Unqualified Leads",
        description:
          "Marketing generates volume but sales wastes time on leads that never close.",
        icon: "UserX",
      },
      {
        title: "No Follow-Up System",
        description:
          "Leads go cold because there's no structured nurture or follow-up process.",
        icon: "Clock",
      },
    ],
  },
  system: {
    title: "The System",
    description:
      "A structured lead generation system that connects paid acquisition, lead qualification, and CRM automation into a predictable pipeline.",
    steps: [
      { label: "Traffic", description: "Targeted B2B campaigns" },
      { label: "Funnel", description: "Lead capture and qualification" },
      { label: "Lead Capture", description: "Forms, landing pages, offers" },
      { label: "CRM", description: "Automated nurture sequences" },
      { label: "Sales Pipeline", description: "Qualified opportunities" },
    ],
  },
  included: {
    title: "What's Included",
    items: [
      {
        title: "Acquisition Strategy",
        description:
          "LinkedIn, Google, and Meta campaigns targeting decision-makers in your ICP.",
        icon: "Target",
      },
      {
        title: "Funnel Architecture",
        description:
          "Landing pages, lead magnets, and qualification forms designed to capture and filter leads.",
        icon: "Layers",
      },
      {
        title: "Campaign Management",
        description:
          "Ongoing optimization of ad spend, targeting, and creative performance.",
        icon: "BarChart2",
      },
      {
        title: "CRM & Automation",
        description:
          "Lead scoring, automated follow-ups, and pipeline management in your CRM.",
        icon: "Database",
      },
    ],
  },
  process: {
    steps: [
      { title: "Growth Audit", description: "Assess current pipeline and lead sources", icon: "Search" },
      { title: "Strategy", description: "Define ICP, channels, and funnel architecture", icon: "Lightbulb" },
      { title: "Implementation", description: "Build funnels, launch campaigns, connect CRM", icon: "Wrench" },
      { title: "Optimization", description: "Improve lead quality and conversion rates", icon: "SlidersHorizontal" },
      { title: "Scaling", description: "Increase volume while maintaining quality", icon: "TrendingUp" },
    ],
  },
  outcomes: {
    metrics: [
      "Predictable lead flow",
      "Higher lead quality",
      "Shorter sales cycles",
      "Automated follow-up system",
      "Improved pipeline visibility",
      "Lower cost per qualified lead",
    ],
  },
  qualification: {
    forWho: [
      "B2B companies with validated services",
      "Teams ready to invest in structured acquisition",
      "Businesses targeting specific industries or roles",
    ],
    notForWho: [
      "Companies without a clear service offering",
      "Businesses looking for quick hacks",
      "Companies not ready to follow up on leads",
    ],
  },
  cta: {
    headline: "Ready to Build Your Lead Generation System?",
    subtext:
      "Apply to work with XMA and create a predictable pipeline for your business.",
  },
};

export default function B2BLeadGenerationPage() {
  return <SolutionPageTemplate data={data} />;
}
