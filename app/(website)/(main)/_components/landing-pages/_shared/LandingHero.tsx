"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import Section from "@/components/ui/section";
import { ScanningButton } from "@/components/ui/ScanningButton";
import type { AccentTokens, ButtonColor } from "./accent-utils";

interface LandingHeroProps {
  badge: string;
  title: string;
  subtitle: string;
  image?: string;
  imageAlt?: string;
  accentTokens: AccentTokens;
  buttonColor: ButtonColor;
}

const staggeredEntrance = {
  badge: { initial: { opacity: 0, y: 16 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.5, delay: 0 } },
  heading: { initial: { opacity: 0, y: 24 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.6, delay: 0.1 } },
  subtitle: { initial: { opacity: 0, y: 24 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.6, delay: 0.2 } },
  cta: { initial: { opacity: 0, y: 24 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.6, delay: 0.3 } },
};

const floatingShapeVariants = {
  float: (delay: number) => ({
    y: [0, -20, 0],
    rotate: [0, 8, 0],
    transition: {
      duration: 6,
      repeat: Infinity,
      ease: "easeInOut",
      delay,
    },
  }),
};

export default function LandingHero({
  badge,
  title,
  subtitle,
  image,
  imageAlt,
  accentTokens,
  buttonColor,
}: LandingHeroProps) {
  return (
    <div className="relative min-h-[100dvh] flex items-center overflow-x-clip">
      <div
        className="absolute inset-0"
        style={{
          background: `
            radial-gradient(ellipse 60% 70% at 85% 20%, ${accentTokens.bg}, transparent 60%),
            linear-gradient(180deg, oklch(0.07 0 0), oklch(0.05 0 0))
          `,
        }}
      />
      <div
        className="absolute inset-0 bg-dot-thick-zinc-700/20 pointer-events-none"
        style={{
          maskImage:
            "radial-gradient(ellipse 60% 80% at 80% 50%, black 10%, transparent 70%)",
        }}
      />

      <Section size="xl" padding="lg" className="relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-[3fr_2fr] gap-12 lg:gap-8 items-center">
          <div className="flex flex-col items-center lg:items-start text-center lg:text-left">
            <motion.span
              {...staggeredEntrance.badge}
              className="inline-block px-4 py-1.5 rounded-full text-sm font-medium mb-8"
              style={{
                border: `1px solid ${accentTokens.border}`,
                color: accentTokens.solid,
                backgroundColor: accentTokens.bg,
              }}
            >
              {badge}
            </motion.span>

            <motion.h1
              {...staggeredEntrance.heading}
              className="text-4xl md:text-6xl font-bold tracking-tighter text-white mb-6 leading-[1.05]"
            >
              {title}
            </motion.h1>

            <motion.p
              {...staggeredEntrance.subtitle}
              className="text-lg text-zinc-400 leading-relaxed max-w-[65ch] mb-10"
            >
              {subtitle}
            </motion.p>

            <motion.div {...staggeredEntrance.cta}>
              <Link href="/apply">
                <ScanningButton variant="primary" size="lg" color={buttonColor}>
                  Get Started
                </ScanningButton>
              </Link>
            </motion.div>
          </div>

          {image ? (
            <motion.div
              initial={{ opacity: 0, x: 40, scale: 0.95 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              transition={{ type: "spring", stiffness: 60, damping: 20, delay: 0.3 }}
              className="hidden lg:block relative"
            >
              <div
                className="relative rounded-2xl overflow-clip border"
                style={{
                  borderColor: accentTokens.border,
                  boxShadow: `0 25px 60px -12px ${accentTokens.bg}, 0 0 0 1px ${accentTokens.bgSubtle}`,
                }}
              >
                <Image
                  src={image}
                  alt={imageAlt || title}
                  width={1200}
                  height={800}
                  className="w-full h-auto"
                  priority
                  quality={90}
                />
              </div>
            </motion.div>
          ) : (
            <FallbackDecorativeShapes accentTokens={accentTokens} />
          )}

          {image && (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="lg:hidden relative"
            >
              <div
                className="relative rounded-xl overflow-clip border"
                style={{
                  borderColor: accentTokens.border,
                  boxShadow: `0 20px 40px -12px ${accentTokens.bg}`,
                }}
              >
                <Image
                  src={image}
                  alt={imageAlt || title}
                  width={1200}
                  height={800}
                  className="w-full h-auto"
                  priority
                  quality={85}
                />
              </div>
            </motion.div>
          )}
        </div>
      </Section>
    </div>
  );
}

function FallbackDecorativeShapes({ accentTokens }: { accentTokens: AccentTokens }) {
  return (
    <div className="hidden lg:flex items-center justify-center relative h-[400px]">
      <motion.div
        custom={0}
        variants={floatingShapeVariants}
        animate="float"
        className="absolute w-56 h-56 rounded-3xl blur-sm"
        style={{
          background: `linear-gradient(135deg, ${accentTokens.bg}, transparent)`,
          border: `1px solid ${accentTokens.border}`,
          top: "10%",
          right: "5%",
        }}
      />
      <motion.div
        custom={1.5}
        variants={floatingShapeVariants}
        animate="float"
        className="absolute w-36 h-36 rounded-full"
        style={{
          background: `radial-gradient(circle, ${accentTokens.border}, transparent 70%)`,
          bottom: "15%",
          left: "10%",
        }}
      />
      <motion.div
        custom={3}
        variants={floatingShapeVariants}
        animate="float"
        className="absolute w-20 h-20 rounded-2xl rotate-45"
        style={{
          background: accentTokens.bgSubtle,
          border: `1px solid ${accentTokens.border}`,
          top: "40%",
          left: "30%",
        }}
      />
    </div>
  );
}
