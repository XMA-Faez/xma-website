"use client";

import { useExperiment } from "@/hooks/useExperiment";

type HeadlineVariant = "control" | "problem_focused" | "outcome_focused" | "question";

interface HeadlineContent {
  main: string;
  sub: string;
}

const headlines: Record<HeadlineVariant, HeadlineContent> = {
  control: {
    main: "Growth Systems Built to Scale Revenue",
    sub: "We design and implement the marketing, sales, and conversion systems companies need to generate leads, acquire customers, and grow revenue predictably.",
  },
  problem_focused: {
    main: "Stop Losing Leads to Broken Systems",
    sub: "Most leads are lost to slow follow-up and disconnected tools. We build integrated growth systems that capture every opportunity.",
  },
  outcome_focused: {
    main: "3x Your Pipeline in 90 Days",
    sub: "Proven growth systems that optimize your conversion funnel, automate follow-ups, and turn traffic into predictable revenue.",
  },
  question: {
    main: "What If Every Lead Became a Customer?",
    sub: "It's possible with the right systems. We build the marketing, sales, and conversion infrastructure your business needs to scale.",
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
