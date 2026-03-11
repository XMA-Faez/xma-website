"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Section from "@/components/ui/section";
import { ScanningButton } from "@/components/ui/ScanningButton";

const caseStudies = [
  {
    company: "E-Commerce Brand",
    industry: "E-Commerce",
    challenge:
      "Inconsistent ad spend with declining ROAS and no retention strategy.",
    system: "E-Commerce Revenue Engine",
    approach:
      "Rebuilt acquisition strategy across Meta and Google, optimized product pages, and implemented automated email and SMS retention flows.",
    results: [
      "3.2x ROAS within 90 days",
      "45% increase in repeat purchases",
      "Revenue scaled from $80K to $240K/month",
    ],
  },
  {
    company: "B2B SaaS Company",
    industry: "Technology",
    challenge:
      "No structured pipeline for lead generation. Sales team relying entirely on referrals.",
    system: "B2B Lead Generation System",
    approach:
      "Deployed LinkedIn and Google campaigns targeting decision-makers, built qualification funnels, and connected everything to a CRM with automated follow-ups.",
    results: [
      "120+ qualified leads per month",
      "Cost per lead reduced by 60%",
      "Sales cycle shortened by 3 weeks",
    ],
  },
  {
    company: "Service-Based Business",
    industry: "Professional Services",
    challenge:
      "Manual follow-ups and scattered lead management across WhatsApp, email, and spreadsheets.",
    system: "CRM & Revenue System",
    approach:
      "Implemented centralized CRM with automated lead capture from all channels, built follow-up sequences, and created pipeline dashboards.",
    results: [
      "40% increase in conversion rate",
      "Follow-up time reduced from days to minutes",
      "Full pipeline visibility for the first time",
    ],
  },
];

export default function CaseStudiesClient() {
  return (
    <div className="relative w-full">
      <div className="relative min-h-[50vh] flex items-center overflow-x-clip">
        <div
          className="absolute inset-0"
          style={{
            background: `
              radial-gradient(ellipse 70% 50% at 50% 0%, oklch(0.2 0.08 250 / 0.5), transparent 60%),
              linear-gradient(180deg, oklch(0.07 0 0), oklch(0.05 0 0))
            `,
          }}
        />
        <Section size="xl" padding="lg" className="relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-3xl mx-auto"
          >
            <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-white mb-6 leading-[1.1]">
              Real Systems. Real Results.
            </h1>
            <p className="text-lg md:text-xl text-zinc-400">
              See how businesses have used XMA&apos;s growth systems to generate
              leads, acquire customers, and scale revenue.
            </p>
          </motion.div>
        </Section>
      </div>

      <Section size="xl" padding="md">
        <div className="space-y-8">
          {caseStudies.map((study, index) => (
            <motion.div
              key={study.company}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="glass-primary rounded-2xl p-8 md:p-10"
            >
              <div className="flex flex-col md:flex-row md:items-start gap-8">
                <div className="flex-1 space-y-6">
                  <div>
                    <span className="text-xs uppercase tracking-wider text-zinc-600">
                      {study.industry}
                    </span>
                    <h2 className="text-2xl font-semibold text-white mt-1">
                      {study.company}
                    </h2>
                  </div>

                  <div>
                    <h3 className="text-sm uppercase tracking-wider text-zinc-600 mb-2">
                      Challenge
                    </h3>
                    <p className="text-zinc-400">{study.challenge}</p>
                  </div>

                  <div>
                    <h3 className="text-sm uppercase tracking-wider text-zinc-600 mb-2">
                      System Implemented
                    </h3>
                    <span className="inline-block px-3 py-1 rounded-full text-sm border border-blue-500/30 text-blue-400 bg-blue-500/10">
                      {study.system}
                    </span>
                  </div>

                  <div>
                    <h3 className="text-sm uppercase tracking-wider text-zinc-600 mb-2">
                      Approach
                    </h3>
                    <p className="text-zinc-400">{study.approach}</p>
                  </div>
                </div>

                <div className="md:w-72 shrink-0 glass-primary rounded-xl p-6">
                  <h3 className="text-sm uppercase tracking-wider text-zinc-600 mb-4">
                    Results
                  </h3>
                  <ul className="space-y-3">
                    {study.results.map((result) => (
                      <li key={result} className="flex items-start gap-3">
                        <div className="w-2 h-2 rounded-full bg-emerald-400 shrink-0 mt-2" />
                        <span className="text-white font-medium">
                          {result}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </Section>

      <div className="relative overflow-x-clip">
        <div
          className="absolute inset-0"
          style={{
            background: `
              radial-gradient(ellipse 80% 50% at 50% 100%, oklch(0.2 0.08 250 / 0.4), transparent 60%),
              linear-gradient(180deg, oklch(0.05 0 0), oklch(0.07 0 0))
            `,
          }}
        />
        <Section size="md" padding="lg" className="relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <h2 className="heading-section text-white mb-6">
              Ready to Become the Next Case Study?
            </h2>
            <Link href="/apply">
              <ScanningButton variant="primary" size="lg" color="blue">
                Book a Call
              </ScanningButton>
            </Link>
          </motion.div>
        </Section>
      </div>
    </div>
  );
}
