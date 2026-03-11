"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Monitor, Tablet, Smartphone, TrendingUp } from "lucide-react";

type DeviceType = "desktop" | "tablet" | "mobile";

interface DeviceConfig {
  id: DeviceType;
  label: string;
  icon: React.ReactNode;
  frameWidth: string;
  frameHeight: string;
  borderRadius: string;
}

const devices: DeviceConfig[] = [
  {
    id: "desktop",
    label: "Desktop",
    icon: <Monitor className="w-4 h-4" />,
    frameWidth: "w-full",
    frameHeight: "h-[280px] sm:h-[320px]",
    borderRadius: "rounded-lg",
  },
  {
    id: "tablet",
    label: "Tablet",
    icon: <Tablet className="w-4 h-4" />,
    frameWidth: "w-3/4 sm:w-2/3 md:w-1/2",
    frameHeight: "h-[320px] sm:h-[360px]",
    borderRadius: "rounded-2xl",
  },
  {
    id: "mobile",
    label: "Mobile",
    icon: <Smartphone className="w-4 h-4" />,
    frameWidth: "w-1/2 sm:w-1/3 md:w-1/4",
    frameHeight: "h-[360px] sm:h-[400px]",
    borderRadius: "rounded-3xl",
  },
];

const MockWebsiteContent: React.FC<{ device: DeviceType }> = ({ device }) => {
  const isCompact = device === "mobile";
  const isMedium = device === "tablet";

  return (
    <div className="w-full h-full bg-zinc-900 flex flex-col">
      <div className="bg-gradient-to-r from-blue-600 to-blue-500 p-2 sm:p-3 flex items-center justify-between">
        <div className="flex items-center gap-1.5">
          <div className="w-4 h-4 sm:w-5 sm:h-5 rounded bg-white/20" />
          <div className={`${isCompact ? "w-12" : "w-16"} h-2 rounded bg-white/40`} />
        </div>
        {!isCompact && (
          <div className="flex gap-2">
            {[1, 2, 3].map((i) => (
              <div key={i} className="w-8 h-1.5 rounded bg-white/30" />
            ))}
          </div>
        )}
        {isCompact && (
          <div className="flex flex-col gap-0.5">
            <div className="w-3.5 h-0.5 rounded bg-white/40" />
            <div className="w-3.5 h-0.5 rounded bg-white/40" />
            <div className="w-3.5 h-0.5 rounded bg-white/40" />
          </div>
        )}
      </div>

      <div className={`flex-1 ${isCompact ? "p-2" : isMedium ? "p-3" : "p-4"}`}>
        <div className={`${isCompact ? "mb-2" : "mb-3"}`}>
          <div
            className={`${isCompact ? "w-3/4 h-2.5" : "w-2/3 h-3"} rounded bg-zinc-700 mb-1.5`}
          />
          <div
            className={`${isCompact ? "w-full h-1.5" : "w-full h-2"} rounded bg-zinc-800 mb-1`}
          />
          <div
            className={`${isCompact ? "w-5/6 h-1.5" : "w-5/6 h-2"} rounded bg-zinc-800`}
          />
        </div>

        <div
          className={`${isCompact ? "w-16 h-5" : "w-24 h-7"} rounded-md bg-gradient-to-r from-blue-500 to-blue-600 mb-3`}
        />

        <div
          className={`grid ${isCompact ? "grid-cols-1 gap-1.5" : isMedium ? "grid-cols-2 gap-2" : "grid-cols-3 gap-2"}`}
        >
          {(isCompact ? [1, 2] : isMedium ? [1, 2, 3, 4] : [1, 2, 3]).map(
            (i) => (
              <div
                key={i}
                className={`${isCompact ? "h-12" : "h-16"} rounded-lg bg-gradient-to-br from-zinc-800 to-zinc-700 border border-zinc-600 p-1.5`}
              >
                <div className="w-full h-1 rounded bg-zinc-600 mb-1" />
                <div className="w-2/3 h-1 rounded bg-zinc-700" />
              </div>
            ),
          )}
        </div>

        {!isCompact && (
          <div className="mt-3 flex gap-2">
            {[1, 2].map((i) => (
              <div
                key={i}
                className="flex-1 h-8 rounded bg-zinc-800 border border-zinc-700"
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

const ResponsivePreview: React.FC = () => {
  const [activeDevice, setActiveDevice] = useState<DeviceType>("desktop");

  const currentDevice = devices.find((d) => d.id === activeDevice)!;

  return (
    <div className="w-full bg-gradient-to-br from-zinc-900 to-zinc-800 p-4 sm:p-6 md:p-8">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <TrendingUp className="w-5 h-5 text-emerald-400" />
          <h3 className="text-lg font-bold text-white">
            Responsive Design
          </h3>
        </div>

        <div className="flex gap-1.5 p-1 rounded-xl bg-zinc-800">
          {devices.map((device) => (
            <button
              key={device.id}
              onClick={() => setActiveDevice(device.id)}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                activeDevice === device.id
                  ? "bg-blue-500 text-white shadow-sm"
                  : "text-zinc-400 hover:text-white"
              }`}
            >
              {device.icon}
              <span className="hidden sm:inline">{device.label}</span>
            </button>
          ))}
        </div>
      </div>

      <div className="flex justify-center items-center min-h-[300px] sm:min-h-[360px]">
        <motion.div
          key={activeDevice}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3 }}
          className={`${currentDevice.frameWidth} ${currentDevice.frameHeight} ${currentDevice.borderRadius} overflow-hidden border-2 border-zinc-600 shadow-xl`}
        >
          {activeDevice === "mobile" && (
            <div className="bg-zinc-700 h-4 flex items-center justify-center">
              <div className="w-12 h-1.5 rounded-full bg-zinc-500" />
            </div>
          )}
          <MockWebsiteContent device={activeDevice} />
        </motion.div>
      </div>

      <div className="flex justify-center gap-4 mt-4">
        {[
          { label: "Mobile-First", value: "70%+ UAE Traffic" },
          { label: "Touch-Optimized", value: "48px Targets" },
          { label: "Fluid Layout", value: "320px to 4K" },
        ].map((stat, index) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.3 + index * 0.1 }}
            className="text-center"
          >
            <div className="text-xs font-bold text-emerald-400">{stat.value}</div>
            <div className="text-[10px] text-zinc-400">
              {stat.label}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default ResponsivePreview;
