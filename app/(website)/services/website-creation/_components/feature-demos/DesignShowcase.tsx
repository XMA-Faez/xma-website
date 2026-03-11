"use client";

import React from "react";
import { motion } from "framer-motion";
import { Palette } from "lucide-react";

interface ColorSwatch {
  name: string;
  shades: { label: string; value: string; textDark: boolean }[];
}

const colorPalette: ColorSwatch[] = [
  {
    name: "Primary",
    shades: [
      { label: "50", value: "oklch(0.97 0.01 260)", textDark: true },
      { label: "200", value: "oklch(0.85 0.08 260)", textDark: true },
      { label: "400", value: "oklch(0.70 0.15 260)", textDark: true },
      { label: "500", value: "oklch(0.62 0.19 260)", textDark: false },
      { label: "700", value: "oklch(0.45 0.18 260)", textDark: false },
      { label: "900", value: "oklch(0.30 0.12 260)", textDark: false },
    ],
  },
  {
    name: "Neutral",
    shades: [
      { label: "50", value: "oklch(0.98 0.00 0)", textDark: true },
      { label: "200", value: "oklch(0.90 0.00 0)", textDark: true },
      { label: "400", value: "oklch(0.70 0.00 0)", textDark: true },
      { label: "600", value: "oklch(0.45 0.00 0)", textDark: false },
      { label: "800", value: "oklch(0.27 0.01 260)", textDark: false },
      { label: "950", value: "oklch(0.15 0.01 260)", textDark: false },
    ],
  },
];

interface TypeSample {
  label: string;
  fontFamily: string;
  sampleText: string;
  size: string;
  weight: string;
}

const typographySamples: TypeSample[] = [
  {
    label: "Display",
    fontFamily: "font-serif",
    sampleText: "Cormorant Garamond",
    size: "text-3xl sm:text-4xl",
    weight: "font-bold",
  },
  {
    label: "Heading",
    fontFamily: "font-primary",
    sampleText: "Manrope Bold",
    size: "text-2xl sm:text-3xl",
    weight: "font-bold",
  },
  {
    label: "Body",
    fontFamily: "font-secondary",
    sampleText: "DM Sans Regular — The quick brown fox jumps over the lazy dog",
    size: "text-base",
    weight: "font-normal",
  },
  {
    label: "Caption",
    fontFamily: "font-sans",
    sampleText: "Inter — Labels, metadata, and small text elements",
    size: "text-sm",
    weight: "font-medium",
  },
];

const DesignShowcase: React.FC = () => {
  return (
    <div className="w-full bg-gradient-to-br from-zinc-900 to-zinc-800 p-4 sm:p-6 md:p-8">
      <div className="flex items-center gap-2 mb-6">
        <Palette className="w-5 h-5 text-purple-400" />
        <h3 className="text-lg font-bold text-white">
          Design System Preview
        </h3>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8">
        <div>
          <h4 className="text-sm font-medium text-zinc-400 uppercase tracking-wider mb-4">
            Color Palette
          </h4>
          <div className="space-y-4">
            {colorPalette.map((palette, paletteIndex) => (
              <motion.div
                key={palette.name}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: paletteIndex * 0.15 }}
              >
                <div className="text-xs font-medium text-zinc-400 mb-2">
                  {palette.name}
                </div>
                <div className="flex rounded-xl overflow-hidden">
                  {palette.shades.map((shade) => (
                    <div
                      key={shade.label}
                      className="flex-1 h-14 sm:h-16 flex items-end p-1.5"
                      style={{ backgroundColor: shade.value }}
                    >
                      <span
                        className={`text-[10px] font-medium ${shade.textDark ? "text-slate-700" : "text-white/80"}`}
                      >
                        {shade.label}
                      </span>
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.4 }}
            className="mt-6"
          >
            <h4 className="text-sm font-medium text-zinc-400 uppercase tracking-wider mb-3">
              Accent Colors
            </h4>
            <div className="flex gap-3">
              {[
                { name: "Success", color: "oklch(0.72 0.19 163)" },
                { name: "Warning", color: "oklch(0.80 0.16 84)" },
                { name: "Error", color: "oklch(0.63 0.24 25)" },
                { name: "Info", color: "oklch(0.62 0.19 260)" },
              ].map((accent) => (
                <div key={accent.name} className="flex flex-col items-center gap-1">
                  <div
                    className="w-10 h-10 rounded-lg shadow-sm"
                    style={{ backgroundColor: accent.color }}
                  />
                  <span className="text-[10px] text-zinc-400">
                    {accent.name}
                  </span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        <div>
          <h4 className="text-sm font-medium text-zinc-400 uppercase tracking-wider mb-4">
            Typography Scale
          </h4>
          <div className="space-y-5">
            {typographySamples.map((sample, index) => (
              <motion.div
                key={sample.label}
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: 0.2 + index * 0.1 }}
                className="border-l-2 border-purple-500/30 pl-4"
              >
                <div className="text-[10px] uppercase tracking-wider text-purple-400 font-medium mb-1">
                  {sample.label}
                </div>
                <div
                  className={`${sample.size} ${sample.weight} ${sample.fontFamily} text-white leading-tight`}
                >
                  {sample.sampleText}
                </div>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.7 }}
            className="mt-6 p-4 rounded-xl bg-zinc-800/50 border border-zinc-700"
          >
            <div className="text-xs font-medium text-zinc-400 uppercase tracking-wider mb-3">
              Spacing System
            </div>
            <div className="flex items-end gap-2">
              {[
                { label: "xs", size: "w-2 h-2" },
                { label: "sm", size: "w-3 h-3" },
                { label: "md", size: "w-4 h-4" },
                { label: "lg", size: "w-6 h-6" },
                { label: "xl", size: "w-8 h-8" },
                { label: "2xl", size: "w-12 h-12" },
              ].map((space) => (
                <div key={space.label} className="flex flex-col items-center gap-1">
                  <div
                    className={`${space.size} rounded bg-gradient-to-br from-purple-400 to-blue-400`}
                  />
                  <span className="text-[9px] text-zinc-500">
                    {space.label}
                  </span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default DesignShowcase;
