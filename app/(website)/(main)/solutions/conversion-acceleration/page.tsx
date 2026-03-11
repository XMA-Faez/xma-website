import type { Metadata } from "next";
import SolutionPageTemplate from "../_components/SolutionPageTemplate";
import type { SolutionPageData } from "../_types/solution";

export const metadata: Metadata = {
  title: "Conversion Acceleration System",
  description:
    "Increase revenue by improving how traffic and leads convert into customers with XMA's Conversion Acceleration System.",
};

const data: SolutionPageData = {
  slug: "conversion-acceleration",
  accentColor: "oklch(0.68 0.2 350)",
  hero: {
    badge: "XMA Solution",
    title: "Conversion Acceleration System",
    subtitle:
      "Increase revenue by improving how traffic and leads convert into paying customers.",
    image: "/solutions/conversion-acceleration-desktop.png",
    mobileImage: "/solutions/conversion-acceleration-mobile.png",
  },
  problem: {
    headline: "Why Conversions Stay Low",
    painPoints: [
      {
        title: "Leaky Funnels",
        description:
          "Visitors drop off at critical points — landing pages, forms, and checkout.",
        icon: "Filter",
      },
      {
        title: "No Testing Framework",
        description:
          "Decisions are made on intuition instead of data-driven experimentation.",
        icon: "FlaskConical",
      },
      {
        title: "Wasted Ad Spend",
        description:
          "Traffic is expensive, but conversion rates make every click cost more than it should.",
        icon: "DollarSign",
      },
    ],
  },
  system: {
    title: "The System",
    description:
      "A conversion optimization system that audits your funnel, identifies bottlenecks, and systematically improves performance at every stage.",
    steps: [
      { label: "Audit", description: "Identify conversion bottlenecks" },
      { label: "Hypothesize", description: "Data-driven improvement plans" },
      { label: "Test", description: "A/B and multivariate experiments" },
      { label: "Implement", description: "Roll out winning variations" },
      { label: "Scale", description: "Compound improvements over time" },
    ],
  },
  included: {
    title: "What's Included",
    items: [
      {
        title: "Conversion Audit",
        description:
          "Deep-dive analysis of your funnel, identifying exactly where and why visitors drop off.",
        icon: "SearchCheck",
      },
      {
        title: "Landing Page Optimization",
        description:
          "Redesign and optimize key landing pages for maximum conversion rate.",
        icon: "LayoutTemplate",
      },
      {
        title: "A/B Testing Program",
        description:
          "Structured testing framework to validate improvements with statistical confidence.",
        icon: "Split",
      },
      {
        title: "Funnel Redesign",
        description:
          "Rebuild critical funnel stages — forms, checkout, onboarding — for friction-free conversion.",
        icon: "GitBranch",
      },
    ],
  },
  process: {
    steps: [
      { title: "Funnel Audit", description: "Analyze every stage of your conversion funnel", icon: "ClipboardCheck" },
      { title: "Prioritize", description: "Rank opportunities by impact and effort", icon: "ListOrdered" },
      { title: "Test", description: "Run experiments on highest-impact areas", icon: "FlaskConical" },
      { title: "Implement", description: "Deploy winning variations", icon: "CheckCircle2" },
      { title: "Iterate", description: "Continuous optimization cycle", icon: "RefreshCw" },
    ],
  },
  outcomes: {
    metrics: [
      "Higher conversion rates",
      "Lower cost per acquisition",
      "Increased revenue per visitor",
      "Data-driven decision making",
      "Improved landing page performance",
      "Compounding growth from ongoing optimization",
    ],
  },
  qualification: {
    forWho: [
      "Businesses with existing traffic but low conversion",
      "Companies spending on ads but not seeing returns",
      "Teams ready to adopt a data-driven approach",
    ],
    notForWho: [
      "Businesses with no traffic to optimize",
      "Companies expecting overnight results",
      "Businesses not ready to run experiments",
    ],
  },
  cta: {
    headline: "Ready to Accelerate Your Conversions?",
    subtext:
      "Apply to work with XMA and start turning more of your traffic into revenue.",
  },
};

export default function ConversionAccelerationPage() {
  return <SolutionPageTemplate data={data} />;
}
