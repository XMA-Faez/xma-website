"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { Service } from "./servicesData";
import ServiceVisual from "./ServiceVisual";
import { serviceColors } from "./serviceColors";
import { ScanningButton } from "@/components/ui/ScanningButton";

interface ServiceCardProps {
  service: Service;
  index: number;
}

const themeToButtonColor = {
  paidAds: "amber",
  website: "blue",
  crm: "purple",
  creatives: "purple",
  whatsapp: "emerald",
} as const;

const ServiceCard = ({ service, index }: ServiceCardProps) => {
  const isEven = index % 2 === 1;
  const themeColor = serviceColors[service.visualTheme].hex;
  const buttonColor = themeToButtonColor[service.visualTheme];

  return (
    <div
      className={`w-full rounded-2xl md:rounded-3xl border border-white/10 shadow-2xl shadow-black/50 flex flex-col ${isEven ? "md:flex-row-reverse" : "md:flex-row"}`}
      style={{
        background: `linear-gradient(135deg, ${themeColor}15 0%, oklch(0.15 0.01 0 / 0.95) 100%)`,
      }}
    >
      <div className="w-full md:w-1/2 aspect-square p-4 md:p-5 lg:p-6">
        <ServiceVisual theme={service.visualTheme} iconName={service.iconName} />
      </div>

      <div className="w-full md:w-1/2 flex flex-col justify-center p-5 md:p-6 lg:p-10">
        <h3 className="text-xl sm:text-2xl lg:text-3xl xl:text-4xl font-semibold text-white mb-3 md:mb-4 leading-tight">
          {service.title}
        </h3>

        <p className="text-sm sm:text-base lg:text-lg text-gray-400 leading-relaxed mb-6">
          {service.description}
        </p>

        <Link href={service.href} className="self-start">
          <ScanningButton color={buttonColor} variant="primary" size="md">
            <span className="flex items-center gap-2">
              Learn More
              <ArrowRight className="w-4 h-4" />
            </span>
          </ScanningButton>
        </Link>
      </div>
    </div>
  );
};

export default ServiceCard;
