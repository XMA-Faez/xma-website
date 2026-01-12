"use client";

import { motion, MotionValue } from "framer-motion";
import type { Service } from "./servicesData";
import ServiceVisual from "./ServiceVisual";

interface StackingCardProps {
  service: Service;
  index: number;
  y: MotionValue<number>;
  scale: MotionValue<number>;
  opacity: MotionValue<number>;
}

const StackingCard = ({ service, index, y, scale, opacity }: StackingCardProps) => {
  const isEven = index % 2 === 1;

  return (
    <motion.div
      style={{
        y,
        scale,
        opacity,
        zIndex: index + 1,
      }}
      className="absolute inset-0 flex items-center justify-center will-change-transform px-4 md:px-8"
    >
      <div
        className={`
          w-full max-w-6xl h-auto
          rounded-2xl md:rounded-3xl
          bg-zinc-900/90
          border border-white/10
          shadow-2xl shadow-black/50
          overflow-hidden
          flex flex-col md:flex-row
          ${isEven ? "md:flex-row-reverse" : "md:flex-row"}
        `}
      >
        <div className="w-full md:w-1/2 aspect-square p-4 md:p-5 lg:p-6">
          <ServiceVisual theme={service.visualTheme} />
        </div>

        <div className="w-full md:w-1/2 flex flex-col justify-center p-5 md:p-6 lg:p-10">
          <h3 className="text-xl sm:text-2xl lg:text-3xl xl:text-4xl font-semibold text-white mb-3 md:mb-4 leading-tight">
            {service.title}
          </h3>

          <p className="text-sm sm:text-base lg:text-lg text-gray-400 leading-relaxed">
            {service.description}
          </p>
        </div>
      </div>
    </motion.div>
  );
};

export default StackingCard;
