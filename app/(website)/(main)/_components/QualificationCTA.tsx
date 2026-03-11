"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Section from "@/components/ui/section";
import { ScanningButton } from "@/components/ui/ScanningButton";

export default function QualificationCTA() {
  return (
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
            Let&apos;s Build Your Growth System
          </h2>

          <p className="text-lg text-zinc-400 max-w-xl mx-auto mb-10">
            Tell us where you are and where you want to be. We&apos;ll show you
            the system to get there.
          </p>

          <Link href="/book">
            <ScanningButton variant="primary" size="lg" color="blue">
              Book a Call
            </ScanningButton>
          </Link>
        </motion.div>
      </Section>
    </div>
  );
}
