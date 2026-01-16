"use client";

import { motion } from "framer-motion";
import type { Benefit } from "./benefitsData";

type BenefitCardProps = {
  benefit: Benefit;
  index: number;
  isLastColumn: boolean;
  isLastRow: boolean;
};

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: (index: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      delay: index * 0.1,
      ease: "easeOut",
    },
  }),
};

const BenefitCard = ({
  benefit,
  index,
  isLastColumn,
  isLastRow,
}: BenefitCardProps) => {
  const IconComponent = benefit.icon;

  return (
    <motion.div
      custom={index}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-50px" }}
      variants={cardVariants}
      className={`relative p-6 md:p-8 group hover:bg-white/5 transition-colors duration-300 ${
        !isLastColumn ? "md:border-r md:border-white/5" : ""
      } ${!isLastRow ? "md:border-b md:border-white/5" : ""}`}
    >
      {benefit.badge && (
        <span className="absolute top-4 right-4 bg-primary-500 text-white text-xs font-medium px-2.5 py-1 rounded-full">
          {benefit.badge}
        </span>
      )}

      <div
        className="w-12 h-12 rounded-xl flex items-center justify-center mb-4 transition-all duration-300"
        style={{ backgroundColor: benefit.iconBgColor }}
      >
        <IconComponent
          className="w-6 h-6"
          style={{ color: benefit.iconColor }}
          weight="duotone"
        />
      </div>

      <h3 className="text-lg font-semibold text-white mb-2">
        {benefit.title}
      </h3>

      <p className="text-sm text-neutral-400 leading-relaxed">
        {benefit.description}
      </p>
    </motion.div>
  );
};

export default BenefitCard;
