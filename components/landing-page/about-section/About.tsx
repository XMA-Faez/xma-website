"use client"
import { Section } from "@radix-ui/themes";
import React from "react";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Highlight } from "@/components/ui/HeroHighlight";

function About() {
  const ref = useRef(null);
  const isInView = useInView(ref );

  return (
    <Section className="max-w-4xl mb-2xl mx-auto">
      <p className="text-5xl leading-snug text-white">
        We noticed a need in advertising: businesses often struggle to achieve {" "}
        <Highlight>
          high-impact, results-driven
        </Highlight>{" "}
        lead generation strategies. That&apos;s where we come in.
      </p>
    </Section>
  );
}

export default About;
