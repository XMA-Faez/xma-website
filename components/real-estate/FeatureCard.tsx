import React from "react";
import { motion } from "framer-motion";
import { Icon } from "phosphor-react";

interface FeatureCardProps {
  icon: Icon;
  title: string;
  description: string;
  index: number;
}

export const FeatureCard: React.FC<FeatureCardProps> = ({
  icon: IconComponent,
  title,
  description,
  index,
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      viewport={{ once: true }}
      className="relative p-[1px] rounded-2xl overflow-hidden bg-gradient-to-br from-blue-500/10 to-blue-500/5 dark:from-[oklch(0.45_0.15_250_/_0.15)] dark:to-[oklch(0.45_0.15_250_/_0.05)]"
    >
      {/* card_gradient - radial gradient from top */}
      <div
        className="absolute inset-0 hidden dark:block"
        style={{
          backgroundImage:
            "radial-gradient(circle closest-corner at 50% 0%, oklch(0.45 0.15 250 / 0.4), transparent 60%)",
        }}
      ></div>
      <div
        className="absolute inset-0 dark:hidden"
        style={{
          backgroundImage:
            "radial-gradient(circle closest-corner at 50% 0%, oklch(0.6 0.15 250 / 0.2), transparent 60%)",
        }}
      ></div>

      {/* card_inner - light mode */}
      <div
        className="relative h-full rounded-[calc(1rem-1px)] p-3 border border-slate-200 dark:border-blue-950/10 bg-white dark:bg-transparent"
      >
        {/* Dark mode background */}
        <div
          className="absolute inset-0 rounded-[calc(1rem-1px)] hidden dark:block"
          style={{
            backgroundColor: "oklch(0.1 0.05 250 / 0.95)",
            backgroundImage: `
              radial-gradient(circle farthest-side at 50% 50%, oklch(0.1 0.05 250 / 0.1), oklch(0.1 0.05 250 / 0.95)),
              url(https://cdn.prod.website-files.com/681df90c8000b68e87797d93/682106ede00afadb49f7bf0e_webyst_dot-pattern.svg)
            `,
            backgroundPosition: "0 0, 0 0",
            backgroundSize: "auto, 8px 8px",
          }}
        ></div>
        {/* card_content */}
        <div className="relative z-10 py-6 px-6 text-center">
          {/* Icon section */}
          <div className="mb-6">
            <div className="flex justify-center">
              {/* feature-card_icon */}
              <div
                className="relative flex items-center justify-center rounded-xl w-14 h-14"
                style={{
                  backgroundImage: "linear-gradient(145deg, oklch(0.5 0.15 250), oklch(0.4 0.12 250))",
                  boxShadow: "0 2px 32px oklch(0.5 0.15 250 / 0.6)",
                }}
              >
                {/* brand-overlay */}
                <div
                  className="absolute rounded-xl opacity-100"
                  style={{
                    mixBlendMode: "soft-light",
                    backgroundImage:
                      "linear-gradient(oklch(0.1 0 0 / 0.75), oklch(0.1 0 0 / 0.4))",
                    inset: "0.15rem",
                  }}
                ></div>

                {/* icon */}
                <div className="relative z-10 w-8 h-8 text-white">
                  <IconComponent className="w-full h-full" weight="duotone" />
                </div>
              </div>
            </div>
          </div>

          {/* Title */}
          <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-4 text-center">
            {title}
          </h3>

          {/* Divider */}
          <div className="my-4">
            <div className="w-full h-[1px] bg-gradient-to-r from-transparent via-slate-200 dark:via-white/20 to-transparent"></div>
          </div>

          {/* Description */}
          <p className="text-slate-600 dark:text-gray-400 text-center leading-relaxed">
            {description}
          </p>
        </div>
      </div>
    </motion.div>
  );
};
