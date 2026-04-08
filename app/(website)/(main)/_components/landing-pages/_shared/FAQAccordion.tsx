"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";
import Section from "@/components/ui/section";
import { cn } from "@/lib/utils";
import type { LandingPageFaqItem } from "@/data/landing-pages/types";
import type { AccentTokens } from "./accent-utils";

interface FAQAccordionProps {
  items: LandingPageFaqItem[];
  accentTokens: AccentTokens;
}

function FAQJsonLd({ items }: { items: LandingPageFaqItem[] }) {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
    />
  );
}

function AccordionItem({
  item,
  isOpen,
  onToggle,
  accentTokens,
}: {
  item: LandingPageFaqItem;
  isOpen: boolean;
  onToggle: () => void;
  accentTokens: AccentTokens;
}) {
  return (
    <div className="border-b" style={{ borderColor: "oklch(0.3 0 0 / 0.5)" }}>
      <button
        type="button"
        onClick={onToggle}
        className="flex items-center justify-between w-full py-6 text-left group"
      >
        <span
          className={cn(
            "text-lg font-medium transition-colors duration-200",
            isOpen ? "text-white" : "text-zinc-300 group-hover:text-white",
          )}
        >
          {item.question}
        </span>
        <motion.span
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ type: "spring", stiffness: 200, damping: 25 }}
          className="shrink-0 ml-4"
        >
          <ChevronDown
            className="w-5 h-5"
            style={{ color: isOpen ? accentTokens.solid : "oklch(0.5 0 0)" }}
          />
        </motion.span>
      </button>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ type: "spring", stiffness: 100, damping: 20 }}
          >
            <p className="text-zinc-400 leading-relaxed pb-6 max-w-[65ch]">
              {item.answer}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function FAQAccordion({ items, accentTokens }: FAQAccordionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  function handleToggle(index: number) {
    setOpenIndex((current) => (current === index ? null : index));
  }

  return (
    <Section size="lg" padding="md">
      <FAQJsonLd items={items} />

      <motion.h2
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        viewport={{ once: true }}
        className="text-3xl md:text-4xl font-bold tracking-tighter text-white text-center mb-12"
      >
        Frequently Asked Questions
      </motion.h2>

      <div className="max-w-3xl mx-auto">
        {items.map((item, index) => (
          <AccordionItem
            key={item.question}
            item={item}
            isOpen={openIndex === index}
            onToggle={() => handleToggle(index)}
            accentTokens={accentTokens}
          />
        ))}
      </div>
    </Section>
  );
}
