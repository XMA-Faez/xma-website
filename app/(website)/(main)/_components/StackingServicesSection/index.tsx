"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { services } from "./servicesData";
import StackingCard from "./StackingCard";

const StackingServicesSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const totalCards = services.length;

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });

  return (
    <section
      ref={sectionRef}
      id="services"
      className="relative"
      style={{ height: `${(totalCards + 1) * 70}vh` }}
    >
      <div className="sticky top-0 h-screen flex items-center justify-center">
        <div className="absolute top-8 left-1/2 -translate-x-1/2 text-center z-10 pointer-events-none">
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="text-sm uppercase tracking-wider text-blue-500 font-semibold mb-2 block"
          >
            The System
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl font-semibold text-slate-900 dark:text-white"
          >
            The Luxury <span className="text-blue-500">Booking System</span>
          </motion.h2>
        </div>

        <div className="absolute inset-0 flex items-center justify-center">
          {services.map((service, index) => (
            <CardWithAnimation
              key={service.id}
              service={service}
              index={index}
              totalCards={totalCards}
              scrollYProgress={scrollYProgress}
            />
          ))}
        </div>

        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10">
          <motion.div
            className="flex items-center gap-2"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            viewport={{ once: true }}
          >
            {services.map((_, index) => (
              <ScrollIndicatorDot
                key={index}
                index={index}
                totalCards={totalCards}
                scrollYProgress={scrollYProgress}
              />
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

interface CardWithAnimationProps {
  service: (typeof services)[0];
  index: number;
  totalCards: number;
  scrollYProgress: ReturnType<typeof useScroll>["scrollYProgress"];
}

const CardWithAnimation = ({
  service,
  index,
  totalCards,
  scrollYProgress,
}: CardWithAnimationProps) => {
  const cardStart = index / totalCards;
  const cardEnd = (index + 1) / totalCards;
  const cardMid = (cardStart + cardEnd) / 2;

  const isFirstCard = index === 0;

  const y = useTransform(
    scrollYProgress,
    [cardStart, cardMid],
    isFirstCard ? ["0%", "0%"] : ["100%", "0%"]
  );

  const scale = useTransform(
    scrollYProgress,
    [cardEnd, Math.min(cardEnd + 0.15, 1)],
    [1, 0.95 - index * 0.01]
  );

  return (
    <StackingCard
      service={service}
      index={index}
      y={y}
      scale={scale}
    />
  );
};

interface ScrollIndicatorDotProps {
  index: number;
  totalCards: number;
  scrollYProgress: ReturnType<typeof useScroll>["scrollYProgress"];
}

const ScrollIndicatorDot = ({
  index,
  totalCards,
  scrollYProgress,
}: ScrollIndicatorDotProps) => {
  const cardStart = index / totalCards;
  const cardEnd = (index + 1) / totalCards;

  const dotOpacity = useTransform(
    scrollYProgress,
    [cardStart - 0.05, cardStart, cardEnd, cardEnd + 0.05],
    [0.3, 1, 1, 0.3]
  );

  const dotScale = useTransform(
    scrollYProgress,
    [cardStart - 0.05, cardStart, cardEnd, cardEnd + 0.05],
    [1, 1.5, 1.5, 1]
  );

  return (
    <motion.div
      style={{ opacity: dotOpacity, scale: dotScale }}
      className="w-2 h-2 rounded-full bg-blue-500"
    />
  );
};

export default StackingServicesSection;
