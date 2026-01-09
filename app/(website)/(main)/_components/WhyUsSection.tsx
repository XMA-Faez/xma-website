"use client";

import { motion } from "framer-motion";
import Section from "@/components/ui/section";

const statements = [
  {
    headline: "We optimize for bookings, not clicks.",
    subtext:
      "Other agencies celebrate traffic. We celebrate confirmed reservations.",
  },
  {
    headline: "Response time under 2 minutes.",
    subtext: "Your WhatsApp inquiries answered instantly, 24/7.",
  },
  {
    headline: "Built specifically for luxury car rentals.",
    subtext:
      "Not a generic agency. We know your market, your customers, your challenges.",
  },
];

const WhyUsSection = () => {
  return (
    <Section id="why-us" size="xl" padding="lg">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="text-center mb-12"
      >
        <span className="text-sm uppercase tracking-wider text-blue-500 font-semibold">
          Why Choose Us
        </span>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
        {statements.map((statement, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <h3 className="text-xl md:text-2xl lg:text-3xl font-semibold text-slate-900 dark:text-white mb-4 leading-tight">
              {statement.headline}
            </h3>
            <p className="text-base text-slate-600 dark:text-gray-400 leading-relaxed">
              {statement.subtext}
            </p>
          </motion.div>
        ))}
      </div>
    </Section>
  );
};

export default WhyUsSection;
