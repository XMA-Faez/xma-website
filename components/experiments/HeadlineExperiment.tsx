"use client";

import { useExperiment } from "@/hooks/useExperiment";

type HeadlineVariant = "control" | "problem_focused" | "outcome_focused" | "question";

interface HeadlineContent {
  main: string;
  sub: string;
}

const headlines: Record<HeadlineVariant, HeadlineContent> = {
  control: {
    main: "Turn Luxury Car Inquiries Into Confirmed Bookings",
    sub: "We help UAE luxury car rental companies increase their booking rate by fixing what most agencies ignore: conversion, follow-up, and WhatsApp response speed.",
  },
  problem_focused: {
    main: "Stop Losing Bookings to Slow Follow-Up",
    sub: "Most inquiries are lost in the first 5 minutes. We fix your conversion, follow-up, and WhatsApp response speed to capture every opportunity.",
  },
  outcome_focused: {
    main: "3x Your Booking Rate in 90 Days",
    sub: "Proven systems for luxury car rental growth. We optimize your conversion funnel, automate follow-ups, and accelerate your WhatsApp response time.",
  },
  question: {
    main: "What If Every Inquiry Became a Booking?",
    sub: "It's possible with the right systems. We fix conversion, follow-up, and WhatsApp response speed for UAE luxury car rental companies.",
  },
};

interface HeadlineExperimentProps {
  mainClassName?: string;
  subClassName?: string;
  renderMain?: (text: string) => React.ReactNode;
  renderSub?: (text: string) => React.ReactNode;
}

export function HeadlineExperiment({
  mainClassName = "heading-hero pb-2",
  subClassName = "text-lg md:text-xl text-slate-600 dark:text-gray-400 mb-8 leading-relaxed",
  renderMain,
  renderSub,
}: HeadlineExperimentProps) {
  const { variant, isLoading } = useExperiment<HeadlineVariant>(
    "hero_headline_variant",
    "control"
  );

  const content = headlines[isLoading ? "control" : variant];

  return (
    <>
      {renderMain ? (
        renderMain(content.main)
      ) : (
        <h1 className={mainClassName}>{content.main}</h1>
      )}
      {renderSub ? (
        renderSub(content.sub)
      ) : (
        <p className={subClassName}>{content.sub}</p>
      )}
    </>
  );
}

export function useHeadlineExperiment() {
  const { variant, isLoading, trackConversion } = useExperiment<HeadlineVariant>(
    "hero_headline_variant",
    "control"
  );

  const content = headlines[isLoading ? "control" : variant];

  return {
    headline: content.main,
    subheadline: content.sub,
    variant,
    isLoading,
    trackConversion,
  };
}
