import type { Metadata } from "next";
import SolutionPageTemplate from "../_components/SolutionPageTemplate";
import type { SolutionPageData } from "../_types/solution";

export const metadata: Metadata = {
  title: "E-Commerce Revenue Engine",
  description:
    "Acquire customers and scale revenue for e-commerce brands with a complete acquisition and conversion system by XMA.",
};

const data: SolutionPageData = {
  slug: "ecommerce-revenue-engine",
  accentColor: "oklch(0.8285 0.1234 198.3)",
  hero: {
    badge: "XMA Solution",
    title: "E-Commerce Revenue Engine",
    subtitle:
      "A system designed to acquire customers and scale revenue for e-commerce brands.",
    image: "/solutions/Ecommerce-revenue-engine-desktop.png",
    mobileImage: "/solutions/Ecommerce-revenue-engine-mobile.png",
  },
  problem: {
    headline: "Why E-Commerce Brands Struggle to Scale",
    painPoints: [
      {
        title: "Rising Ad Costs",
        description:
          "Customer acquisition costs keep climbing without a structured scaling strategy.",
        icon: "TrendingUp",
      },
      {
        title: "Low Conversion Rates",
        description:
          "Traffic comes in but product pages, checkout flows, and follow-ups underperform.",
        icon: "BarChart3",
      },
      {
        title: "No Retention System",
        description:
          "One-time buyers never return because there's no automated retention infrastructure.",
        icon: "UserMinus",
      },
    ],
  },
  system: {
    title: "The System",
    description:
      "An integrated acquisition and retention engine that drives profitable customer growth across paid, organic, and owned channels.",
    steps: [
      { label: "Traffic", description: "Paid and organic acquisition" },
      { label: "Product Pages", description: "Optimized for conversion" },
      { label: "Checkout", description: "Friction-free purchasing" },
      { label: "Retention", description: "Email, SMS, and remarketing" },
      { label: "Revenue", description: "Profitable scaling" },
    ],
  },
  included: {
    title: "What's Included",
    items: [
      {
        title: "Acquisition Strategy",
        description:
          "Multi-channel ad strategy across Meta, Google, and TikTok optimized for ROAS.",
        icon: "Megaphone",
      },
      {
        title: "Creative Production",
        description:
          "Performance-driven ad creatives, UGC frameworks, and landing page design.",
        icon: "Paintbrush",
      },
      {
        title: "Conversion Optimization",
        description:
          "Product page optimization, checkout flow improvements, and A/B testing.",
        icon: "MousePointerClick",
      },
      {
        title: "Retention Infrastructure",
        description:
          "Email and SMS automation, abandoned cart recovery, and loyalty flows.",
        icon: "Mail",
      },
    ],
  },
  process: {
    steps: [
      { title: "Revenue Audit", description: "Analyze current performance and opportunities", icon: "ClipboardCheck" },
      { title: "Strategy", description: "Channel mix and creative strategy", icon: "Map" },
      { title: "Implementation", description: "Launch campaigns and automation", icon: "Play" },
      { title: "Optimization", description: "Test, iterate, and improve ROAS", icon: "SlidersHorizontal" },
      { title: "Scaling", description: "Increase spend while maintaining profitability", icon: "ArrowUpRight" },
    ],
  },
  outcomes: {
    metrics: [
      "Increased revenue and ROAS",
      "Lower customer acquisition costs",
      "Higher conversion rates",
      "Automated retention system",
      "Predictable revenue growth",
      "Multi-channel customer acquisition",
    ],
  },
  qualification: {
    forWho: [
      "E-commerce brands with validated products",
      "Stores ready to scale beyond $50K/month",
      "Brands looking for structured growth systems",
    ],
    notForWho: [
      "Stores without product-market fit",
      "Businesses with no marketing budget",
      "Companies looking for overnight results",
    ],
  },
  cta: {
    headline: "Ready to Scale Your E-Commerce Revenue?",
    subtext:
      "Apply to work with XMA and build the acquisition engine your brand needs.",
  },
};

export default function EcommerceRevenueEnginePage() {
  return <SolutionPageTemplate data={data} />;
}
