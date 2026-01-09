"use client";

import { motion, MotionValue } from "framer-motion";
import { Check } from "phosphor-react";
import type { Service } from "./servicesData";
import ServiceVisual from "./ServiceVisual";

interface StackingCardProps {
  service: Service;
  index: number;
  y: MotionValue<number>;
  scale: MotionValue<number>;
}

const StackingCard = ({ service, index, y, scale }: StackingCardProps) => {
  const isEven = index % 2 === 1;
  const Icon = service.icon;

  return (
    <motion.div
      style={{
        y,
        scale,
        zIndex: index + 1,
      }}
      className="absolute inset-0 flex items-center justify-center will-change-transform"
    >
      <div
        className={`
          w-full max-w-7xl h-[65vh] min-h-[500px] max-h-[700px]
          rounded-3xl
          bg-slate-100 dark:bg-zinc-900/90
          border border-slate-200 dark:border-white/10
          shadow-2xl shadow-black/10 dark:shadow-black/50
          overflow-hidden
          flex flex-col lg:flex-row
          ${isEven ? "lg:flex-row-reverse" : "lg:flex-row"}
        `}
      >
        <div className="w-full lg:w-1/2 h-[200px] lg:h-full p-4 lg:p-6">
          <ServiceVisual theme={service.visualTheme} />
        </div>

        <div className="w-full lg:w-1/2 h-full flex flex-col justify-center p-6 lg:p-12">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 rounded-xl bg-blue-500/10 flex items-center justify-center">
              <Icon className="w-6 h-6 text-blue-500" weight="duotone" />
            </div>
            <span className="text-sm uppercase tracking-wider text-blue-500 font-semibold">
              {String(index + 1).padStart(2, "0")}
            </span>
          </div>

          <h3 className="text-2xl lg:text-3xl xl:text-4xl font-semibold text-slate-900 dark:text-white mb-4 leading-tight">
            {service.title}
          </h3>

          <p className="text-base lg:text-lg text-slate-600 dark:text-gray-400 mb-6 leading-relaxed">
            {service.description}
          </p>

          <ul className="space-y-3">
            {service.features.map((feature, featureIndex) => (
              <li
                key={featureIndex}
                className="flex items-start gap-3 text-slate-700 dark:text-gray-300"
              >
                <div className="w-5 h-5 rounded-full bg-blue-500/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <Check className="w-3 h-3 text-blue-500" weight="bold" />
                </div>
                <span className="text-sm lg:text-base">{feature}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </motion.div>
  );
};

export default StackingCard;
