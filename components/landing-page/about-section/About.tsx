"use client";
import { Section } from "@radix-ui/themes";
import React  from "react";
import { Highlight } from "@/components/ui/HeroHighlight";
import { motion, } from "framer-motion";
import useInViewAnimation from "@/hooks/useInViewAnimation";

const variants = {
  visible: { opacity: 1, y: 0 },
  hidden: { opacity: 0, y: 20 },
}


function About() {
  const {ref, controls} = useInViewAnimation();

  return (
    <motion.div
      initial="hidden"
      animate={controls}
      variants={variants}
      ref={ref}
      transition={{ duration: 0.5 }}
    >
      <Section className="max-w-4xl mb-2xl mx-auto">
        <p className="text-5xl leading-snug text-white">
          We noticed a need in advertising: businesses often struggle to achieve{" "}
          <Highlight>high-impact, results-driven</Highlight> lead generation
          strategies. That&apos;s where we come in.
        </p>
      </Section>
    </motion.div>
  );
}

export default About;
