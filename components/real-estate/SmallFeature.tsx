import React from "react";
import { motion } from "framer-motion";
import { Icon } from "phosphor-react";

interface SmallFeatureProps {
  icon: Icon;
  title: string;
  description: string;
  index: number;
}

export const SmallFeature: React.FC<SmallFeatureProps> = ({
  icon: IconComponent,
  title,
  description,
  index,
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      viewport={{ once: true }}
      className="flex gap-4 items-start"
    >
      {/* Icon */}
      <div className="flex-shrink-0 w-12 h-12 flex items-center justify-center rounded-xl bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10">
        <IconComponent className="w-6 h-6 text-blue-500 dark:text-blue-400" weight="duotone" />
      </div>

      {/* Content */}
      <div>
        <h4 className="text-lg font-semibold text-slate-900 dark:text-white mb-1">
          {title}
        </h4>
        <p className="text-sm text-slate-600 dark:text-gray-400 leading-relaxed">
          {description}
        </p>
      </div>
    </motion.div>
  );
};
