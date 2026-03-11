"use client";

import { motion } from "framer-motion";
import Section from "@/components/ui/section";
import Image from "next/image";
import FounderImage from "@/public/ceo-pic.jpg"

export default function FounderSection() {
  return (
    <Section size="lg" padding="md">
      <div className="grid lg:grid-cols-2 gap-12 items-center">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="order-2 lg:order-1"
        >
          <span className="text-sm uppercase tracking-widest text-zinc-500 mb-4 block">
            Meet the Founder
          </span>
          <h2 className="heading-section text-white mb-6">Amir Banki</h2>
          <p className="text-lg text-zinc-400 mb-4">
            Amir Banki is the founder of XMA, a growth agency focused on
            building systems that help businesses scale revenue.
          </p>
          <p className="text-lg text-zinc-400">
            Rather than offering fragmented marketing services, XMA focuses on
            building the full infrastructure companies need to generate leads,
            convert customers, and grow sustainably.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
          className="order-1 lg:order-2 flex justify-center"
        >
          <Image
            src={FounderImage}
            alt="Amir Banki"
            width={400}
            height={400}
            className="rounded-full shadow-xl"
          />
        </motion.div>
      </div>
    </Section>
  );
}
