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
      <div className="sticky top-0 h-screen flex flex-col">
        <div className="pt-32 pb-4 text-center">
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
            className="text-2xl sm:text-3xl md:text-4xl font-semibold text-white"
          >
            The Luxury Booking System
          </motion.h2>
        </div>

        <div className="flex-1 relative">
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
  const isLastCard = index === totalCards - 1;

  const y = useTransform(
    scrollYProgress,
    [cardStart, cardMid],
    isFirstCard ? ["0%", "0%"] : ["100%", "0%"]
  );

  const scale = useTransform(
    scrollYProgress,
    [cardEnd, Math.min(cardEnd + 0.1, 1)],
    isLastCard ? [1, 1] : [1, 0.92 - index * 0.02]
  );

  const opacity = useTransform(
    scrollYProgress,
    [cardEnd, Math.min(cardEnd + 0.15, 1)],
    isLastCard ? [1, 1] : [1, 0]
  );

  return (
    <StackingCard
      service={service}
      index={index}
      y={y}
      scale={scale}
      opacity={opacity}
    />
  );
};

export default StackingServicesSection;
