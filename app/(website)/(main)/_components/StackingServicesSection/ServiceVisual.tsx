"use client";

import { motion } from "framer-motion";
import type { ServiceVisualTheme } from "./servicesData";

interface ServiceVisualProps {
  theme: ServiceVisualTheme;
}

const visualStyles: Record<ServiceVisualTheme, { gradient: string; accent: string }> = {
  website: {
    gradient: `
      radial-gradient(ellipse 80% 50% at 20% 80%, oklch(0.45 0.15 220 / 0.6), transparent 50%),
      radial-gradient(ellipse 60% 60% at 80% 20%, oklch(0.5 0.18 200 / 0.5), transparent 50%),
      radial-gradient(ellipse 50% 50% at 50% 50%, oklch(0.35 0.1 240 / 0.3), transparent 60%),
      linear-gradient(180deg, oklch(0.12 0.02 250), oklch(0.08 0.01 240))
    `,
    accent: "oklch(0.6 0.2 210)",
  },
  creatives: {
    gradient: `
      radial-gradient(ellipse 70% 60% at 70% 70%, oklch(0.4 0.18 280 / 0.6), transparent 50%),
      radial-gradient(ellipse 50% 50% at 30% 30%, oklch(0.5 0.2 250 / 0.5), transparent 50%),
      conic-gradient(from 180deg at 50% 50%, oklch(0.2 0.08 280 / 0.3), oklch(0.15 0.05 250 / 0.2), oklch(0.2 0.08 280 / 0.3)),
      linear-gradient(135deg, oklch(0.1 0.03 280), oklch(0.08 0.02 250))
    `,
    accent: "oklch(0.55 0.2 270)",
  },
  paidAds: {
    gradient: `
      radial-gradient(ellipse 60% 80% at 30% 20%, oklch(0.45 0.2 250 / 0.6), transparent 50%),
      radial-gradient(ellipse 80% 50% at 70% 80%, oklch(0.4 0.15 230 / 0.5), transparent 50%),
      radial-gradient(circle at 50% 50%, oklch(0.3 0.12 240 / 0.4), transparent 40%),
      linear-gradient(225deg, oklch(0.12 0.04 250), oklch(0.06 0.02 230))
    `,
    accent: "oklch(0.55 0.22 245)",
  },
  whatsapp: {
    gradient: `
      radial-gradient(ellipse 70% 70% at 80% 30%, oklch(0.45 0.15 170 / 0.5), transparent 50%),
      radial-gradient(ellipse 60% 60% at 20% 70%, oklch(0.5 0.18 220 / 0.5), transparent 50%),
      radial-gradient(ellipse 40% 40% at 50% 50%, oklch(0.4 0.12 190 / 0.3), transparent 50%),
      linear-gradient(160deg, oklch(0.1 0.03 200), oklch(0.08 0.02 180))
    `,
    accent: "oklch(0.55 0.18 160)",
  },
  crm: {
    gradient: `
      radial-gradient(ellipse 50% 70% at 20% 30%, oklch(0.4 0.12 250 / 0.5), transparent 50%),
      radial-gradient(ellipse 70% 50% at 80% 70%, oklch(0.35 0.08 230 / 0.4), transparent 50%),
      linear-gradient(45deg, oklch(0.15 0.03 250 / 0.5) 25%, transparent 25%, transparent 75%, oklch(0.15 0.03 250 / 0.5) 75%),
      linear-gradient(135deg, oklch(0.1 0.02 240), oklch(0.06 0.01 250))
    `,
    accent: "oklch(0.45 0.1 250)",
  },
};

const ServiceVisual = ({ theme }: ServiceVisualProps) => {
  const styles = visualStyles[theme];

  return (
    <div className="relative w-full h-full rounded-2xl overflow-hidden">
      <div
        className="absolute inset-0"
        style={{ background: styles.gradient }}
      />

      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute w-32 h-32 rounded-full opacity-20"
          style={{
            background: `radial-gradient(circle, ${styles.accent}, transparent 70%)`,
            top: "20%",
            left: "60%",
          }}
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.2, 0.3, 0.2],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute w-48 h-48 rounded-full opacity-15"
          style={{
            background: `radial-gradient(circle, ${styles.accent}, transparent 70%)`,
            bottom: "10%",
            left: "20%",
          }}
          animate={{
            scale: [1.1, 1, 1.1],
            opacity: [0.15, 0.25, 0.15],
          }}
          transition={{
            duration: 5,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1,
          }}
        />

        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `
              linear-gradient(to right, oklch(1 0 0) 1px, transparent 1px),
              linear-gradient(to bottom, oklch(1 0 0) 1px, transparent 1px)
            `,
            backgroundSize: "40px 40px",
          }}
        />
      </div>

      <div
        className="absolute inset-0 rounded-2xl"
        style={{
          boxShadow: "inset 0 0 60px oklch(0 0 0 / 0.5)",
        }}
      />

      <div
        className="absolute inset-0 rounded-2xl border"
        style={{
          borderColor: "oklch(1 0 0 / 0.08)",
        }}
      />
    </div>
  );
};

export default ServiceVisual;
