"use client";

import { motion } from "framer-motion";
import Section from "@/components/ui/section";
import { Target, Timer, Car } from "phosphor-react";
import type { Icon } from "phosphor-react";

type Statement = {
  icon: Icon;
  headline: string;
  subtext: string;
};

const statements: Statement[] = [
  {
    icon: Target,
    headline: "We optimize for bookings, not clicks.",
    subtext:
      "Other agencies celebrate traffic. We celebrate confirmed reservations.",
  },
  {
    icon: Timer,
    headline: "Response time under 2 minutes.",
    subtext: "Your WhatsApp inquiries answered instantly, 24/7.",
  },
  {
    icon: Car,
    headline: "Built specifically for luxury car rentals.",
    subtext:
      "Not a generic agency. We know your market, your customers, your challenges.",
  },
];

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: (index: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      delay: index * 0.15,
      ease: "easeOut",
    },
  }),
};

const WhyUsSection = () => {
  return (
    <Section id="why-us" size="xl" padding="lg">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="text-center mb-16"
      >
        <span className="text-sm uppercase tracking-wider text-blue-500 font-semibold mb-4 block">
          Why Choose Us
        </span>
        <h2 className="heading-section text-white mb-4">
          What Makes Us Different
        </h2>
        <p className="text-lg text-gray-400 max-w-xl mx-auto">
          We&apos;re not just another marketing agency. We&apos;re specialists.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
        {statements.map((statement, index) => {
          const IconComponent = statement.icon;
          return (
            <motion.div
              key={index}
              custom={index}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-50px" }}
              variants={cardVariants}
              whileHover={{ y: -8, transition: { duration: 0.3 } }}
              className="group relative p-8 rounded-2xl bg-zinc-900/50 border border-zinc-800 hover:border-blue-500/30 transition-colors duration-300"
            >
              <div className="flex flex-col items-center text-center">
                <motion.div
                  className="w-16 h-16 mb-6 rounded-xl bg-blue-500/10 flex items-center justify-center group-hover:bg-blue-500/20 transition-colors duration-300"
                  whileHover={{ scale: 1.05 }}
                >
                  <IconComponent
                    className="w-8 h-8 text-blue-500"
                    weight="duotone"
                  />
                </motion.div>

                <h3 className="text-xl md:text-2xl font-semibold text-white mb-4 leading-tight">
                  {statement.headline}
                </h3>

                <p className="text-base text-gray-400 leading-relaxed">
                  {statement.subtext}
                </p>
              </div>

              <div className="absolute inset-0 rounded-2xl bg-gradient-to-b from-blue-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
            </motion.div>
          );
        })}
      </div>
    </Section>
  );
};

export default WhyUsSection;
