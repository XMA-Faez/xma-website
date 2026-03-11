"use client";

import { motion } from "motion/react";
import Image from "next/image";
import Link from "next/link";
import Section from "@/components/ui/section";
import { ScanningButton } from "@/components/ui/ScanningButton";
import { ArrowRight } from "lucide-react";

type ButtonColor = "blue" | "emerald" | "purple" | "amber" | "neutral" | "white";

interface SolutionFeature {
  title: string;
  description: string;
  href: string;
  features: string[];
  accent: string;
  gradientBg: string;
  image: string;
  buttonColor: ButtonColor;
}

const featuredSolutions: SolutionFeature[] = [
  {
    title: "Growth Launch System",
    description:
      "Build the complete brand, website, and infrastructure required before scaling marketing. Everything you need to go from zero to launch-ready.",
    href: "/solutions/growth-launch-system",
    features: [
      "Brand strategy & positioning",
      "Conversion-optimized website",
      "Marketing infrastructure setup",
      "Launch-ready campaign blueprint",
    ],
    accent: "oklch(0.55 0.24 285)",
    gradientBg:
      "linear-gradient(135deg, oklch(0.55 0.24 285 / 0.06), oklch(0.15 0.01 0 / 0.95) 100%)",
    image: "/solutions/growth-launch-system.png",
    buttonColor: "purple",
  },
  {
    title: "B2B Lead Generation System",
    description:
      "Generate qualified leads and build predictable sales pipelines. A structured system connecting paid acquisition, lead qualification, and CRM automation.",
    href: "/solutions/b2b-lead-generation",
    features: [
      "Targeted B2B campaigns",
      "Funnel architecture & lead capture",
      "Lead scoring & qualification",
      "CRM automation & follow-ups",
    ],
    accent: "oklch(0.75 0.18 85)",
    gradientBg:
      "linear-gradient(135deg, oklch(0.75 0.18 85 / 0.06), oklch(0.15 0.01 0 / 0.95) 100%)",
    image: "/solutions/b2b-lead-generation.png",
    buttonColor: "amber",
  },
  {
    title: "CRM & Revenue System",
    description:
      "Organize leads, automate follow-ups, and manage the sales pipeline. Full visibility into every deal from first touch to close.",
    href: "/solutions/crm-revenue-system",
    features: [
      "CRM setup & configuration",
      "Multi-channel lead capture",
      "Automated nurture workflows",
      "Pipeline dashboards & forecasting",
    ],
    accent: "oklch(0.65 0.28 340)",
    gradientBg:
      "linear-gradient(135deg, oklch(0.65 0.28 340 / 0.06), oklch(0.15 0.01 0 / 0.95) 100%)",
    image: "/solutions/crm-revenue-system.png",
    buttonColor: "purple",
  },
];

function SolutionImage({
  image,
  title,
}: {
  image: string;
  title: string;
}) {
  return (
    <div className="relative w-full aspect-square rounded-2xl overflow-hidden">
      <Image
        src={image}
        alt={title}
        fill
        quality={95}
        sizes="(max-width: 768px) 100vw, 50vw"
        className="object-cover"
      />
    </div>
  );
}

export default function SolutionsOverviewSection() {
  return (
    <Section size="xl" padding="md" id="solutions">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="text-center mb-16"
      >
        <h2 className="heading-section text-white">XMA Solutions</h2>
      </motion.div>

      <div className="space-y-8 md:space-y-12">
        {featuredSolutions.map((solution, index) => {
          const isEven = index % 2 === 1;
          return (
            <motion.div
              key={solution.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className={`w-full rounded-2xl md:rounded-3xl border border-white/10 shadow-2xl shadow-black/50 flex flex-col ${isEven ? "md:flex-row-reverse" : "md:flex-row"}`}
              style={{ background: solution.gradientBg }}
            >
              <div className="w-full md:w-1/2 aspect-square p-4 md:p-5 lg:p-6">
                <SolutionImage
                  image={solution.image}
                  title={solution.title}
                />
              </div>

              <div className="w-full md:w-1/2 flex flex-col justify-center p-5 md:p-6 lg:p-10">
                <h3 className="text-xl sm:text-2xl lg:text-3xl xl:text-4xl font-semibold text-white mb-3 md:mb-4 leading-tight">
                  {solution.title}
                </h3>

                <p className="text-sm sm:text-base lg:text-lg text-gray-400 leading-relaxed mb-6">
                  {solution.description}
                </p>

                <ul className="space-y-2 mb-8">
                  {solution.features.map((feature) => (
                    <li
                      key={feature}
                      className="flex items-center gap-3 text-sm text-zinc-300"
                    >
                      <div
                        className="w-1.5 h-1.5 rounded-full shrink-0"
                        style={{ background: solution.accent }}
                      />
                      {feature}
                    </li>
                  ))}
                </ul>

              </div>
            </motion.div>
          );
        })}
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        viewport={{ once: true }}
        className="text-center mt-12"
      >
        <Link href="/solutions">
          <ScanningButton variant="outline" size="md">
            <span className="flex items-center gap-2">
              See All Solutions
              <ArrowRight className="w-4 h-4" />
            </span>
          </ScanningButton>
        </Link>
      </motion.div>
    </Section>
  );
}
