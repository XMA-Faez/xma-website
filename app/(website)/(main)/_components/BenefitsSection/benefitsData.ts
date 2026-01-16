import {
  Lightning,
  PencilLine,
  ChartLineUp,
  Clock,
  ShieldCheck,
  Sparkle,
} from "phosphor-react";
import type { Icon } from "phosphor-react";

export type Benefit = {
  icon: Icon;
  title: string;
  description: string;
  badge?: string;
  iconColor: string;
  iconBgColor: string;
};

export const benefits: Benefit[] = [
  {
    icon: Lightning,
    title: "Lightning Fast",
    description:
      "Next.js for blazing-fast, flexible, and fully customizable websites.",
    iconColor: "oklch(0.75 0.18 220)",
    iconBgColor: "oklch(0.75 0.18 220 / 0.12)",
  },
  {
    icon: PencilLine,
    title: "Content You Control",
    description:
      "Headless CMS implementation so you manage your content with ease.",
    iconColor: "oklch(0.72 0.2 300)",
    iconBgColor: "oklch(0.72 0.2 300 / 0.12)",
  },
  {
    icon: ChartLineUp,
    title: "Built for Conversions",
    description:
      "Sanity-powered optimization to turn visitors into qualified leads.",
    iconColor: "oklch(0.78 0.2 145)",
    iconBgColor: "oklch(0.78 0.2 145 / 0.12)",
  },
  {
    icon: Clock,
    title: "Reliable Timelines",
    description:
      "Streamlined development process, most projects launch in 4-6 weeks.",
    iconColor: "oklch(0.78 0.16 65)",
    iconBgColor: "oklch(0.78 0.16 65 / 0.12)",
  },
  {
    icon: ShieldCheck,
    title: "Transparent Pricing",
    description: "Fixed scope with upfront pricing, so there's no surprises.",
    badge: "No hidden fees",
    iconColor: "oklch(0.75 0.14 185)",
    iconBgColor: "oklch(0.75 0.14 185 / 0.12)",
  },
  {
    icon: Sparkle,
    title: "State-of-the-Art Design",
    description:
      "Thoughtful design that differentiates you from competitors.",
    iconColor: "oklch(0.75 0.22 340)",
    iconBgColor: "oklch(0.75 0.22 340 / 0.12)",
  },
];
