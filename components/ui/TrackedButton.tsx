"use client";

import React from "react";
import { useGoogleAds } from "@/hooks/useGoogleAds";
import { ScanningButton, ScanningButtonProps } from "./ScanningButton";

interface TrackedButtonProps extends ScanningButtonProps {
  trackingName: string;
  trackingCategory?: string;
  conversionType?: "booking" | "signup" | "lead" | "contact_form";
  conversionValue?: number;
}

export function TrackedButton({
  trackingName,
  trackingCategory = "cta",
  conversionType,
  conversionValue,
  onClick,
  children,
  ...props
}: TrackedButtonProps) {
  const { trackButtonClick, trackConversion } = useGoogleAds();

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    // Track the button click
    trackButtonClick(trackingName, trackingCategory);
    
    // Track conversion if specified
    if (conversionType) {
      trackConversion(conversionType, conversionValue);
    }
    
    // Call original onClick handler
    onClick?.(e);
  };

  return (
    <ScanningButton {...props} onClick={handleClick}>
      {children}
    </ScanningButton>
  );
}