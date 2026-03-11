"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Section from "@/components/ui/section";
import { ScanningButton } from "@/components/ui/ScanningButton";
import { ArrowUpRight } from "lucide-react";

const caseStudies = [
  {
    company: "E-Commerce Brand",
    challenge: "Inconsistent ad spend with no clear ROI tracking",
    system: "E-Commerce Revenue Engine",
    results: "3.2x ROAS within 90 days",
  },
  {
    company: "B2B SaaS Company",
    challenge: "No structured pipeline for lead generation",
    system: "B2B Lead Generation System",
    results: "120+ qualified leads per month",
  },
  {
    company: "Service-Based Business",
    challenge: "Manual follow-ups leading to lost opportunities",
    system: "CRM & Revenue System",
    results: "40% increase in conversion rate",
  },
];

export default function CaseStudiesPreview() {
  return (
    <Section size="xl" padding="md">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="text-center mb-16"
      >
        <h2 className="heading-section text-white">
          Real Systems. Real Results.
        </h2>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        {caseStudies.map((study, index) => (
          <motion.div
            key={study.company}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            viewport={{ once: true }}
            className="glass-primary rounded-2xl p-8 flex flex-col"
          >
            <div className="flex items-start justify-between mb-6">
              <h3 className="text-lg font-semibold text-white">
                {study.company}
              </h3>
              <ArrowUpRight className="w-4 h-4 text-zinc-600 shrink-0" />
            </div>

            <div className="space-y-4 flex-1">
              <div>
                <div className="text-xs uppercase tracking-wider text-zinc-600 mb-1">
                  Challenge
                </div>
                <p className="text-sm text-zinc-400">{study.challenge}</p>
              </div>
              <div>
                <div className="text-xs uppercase tracking-wider text-zinc-600 mb-1">
                  System
                </div>
                <p className="text-sm text-blue-400">{study.system}</p>
              </div>
              <div>
                <div className="text-xs uppercase tracking-wider text-zinc-600 mb-1">
                  Results
                </div>
                <p className="text-lg font-semibold text-white">
                  {study.results}
                </p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.4 }}
        viewport={{ once: true }}
        className="text-center"
      >
        <Link href="/case-studies">
          <ScanningButton variant="outline" size="md">
            View Case Studies
          </ScanningButton>
        </Link>
      </motion.div>
    </Section>
  );
}
