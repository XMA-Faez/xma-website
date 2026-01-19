"use client";

import Link from "next/link";
import { ScanningButton } from "@/components/ui/ScanningButton";
import { useExperiment } from "@/hooks/useExperiment";
import { useTrackCTA } from "@/hooks/useTrackEvent";

type CTAVariant = "control" | "urgency" | "benefit" | "social_proof";

interface CTAContent {
  text: string;
  subtext?: string;
}

const variantContent: Record<CTAVariant, CTAContent> = {
  control: {
    text: "Book a Strategy Call",
    subtext: "No commitment required",
  },
  urgency: {
    text: "Book Your Free Call Today",
    subtext: "Limited spots available this week",
  },
  benefit: {
    text: "Get Your Custom Growth Plan",
    subtext: "See exactly how to increase bookings",
  },
  social_proof: {
    text: "Join 50+ Luxury Brands",
    subtext: "Book your strategy session",
  },
};

interface CTAExperimentProps {
  location: string;
  href?: string;
  showSubtext?: boolean;
  size?: "sm" | "md" | "lg";
  color?: "blue" | "emerald" | "purple" | "amber" | "neutral" | "white";
  variant?: "primary" | "secondary" | "outline";
  className?: string;
  subtextClassName?: string;
}

export function CTAExperiment({
  location,
  href = "/book",
  showSubtext = true,
  size = "md",
  color = "blue",
  variant = "primary",
  className,
  subtextClassName,
}: CTAExperimentProps) {
  const {
    variant: experimentVariant,
    isLoading,
    trackConversion,
  } = useExperiment<CTAVariant>("hero_cta_variant", "control");
  const trackCTA = useTrackCTA();

  if (isLoading) {
    return (
      <div className="flex flex-col items-center gap-2">
        <ScanningButton
          variant={variant}
          size={size}
          color={color}
          disabled
          className={className}
        >
          Book a Strategy Call
        </ScanningButton>
        {showSubtext && (
          <p
            className={
              subtextClassName || "text-sm text-slate-500 dark:text-white/60"
            }
          >
            No commitment required
          </p>
        )}
      </div>
    );
  }

  const content = variantContent[experimentVariant];

  const handleClick = () => {
    trackConversion("cta_click", {
      cta_location: location,
      cta_text: content.text,
    });
    trackCTA(content.text, location, {
      experiment: "hero_cta_variant",
      variant: experimentVariant,
    });
  };

  return (
    <div className="flex flex-col items-center gap-2">
      <ScanningButton
        variant={variant}
        size={size}
        color={color}
        onClick={handleClick}
        className={className}
      >
        <Link href={href}>{content.text}</Link>
      </ScanningButton>
      {showSubtext && content.subtext && (
        <p
          className={
            subtextClassName || "text-sm text-slate-500 dark:text-white/60"
          }
        >
          {content.subtext}
        </p>
      )}
    </div>
  );
}
