import type { ServiceVisualTheme } from "./servicesData";

interface ServiceColor {
  hex: string;
  oklch: string;
  tailwind: string;
  name: string;
}

export const serviceColors: Record<ServiceVisualTheme, ServiceColor> = {
  website: {
    hex: "#1F6BFF",
    oklch: "oklch(0.55 0.24 262)",
    tailwind: "[#1F6BFF]",
    name: "Electric Royal Blue",
  },
  creatives: {
    hex: "#FF2E92",
    oklch: "oklch(0.65 0.30 350)",
    tailwind: "[#FF2E92]",
    name: "Hot Magenta",
  },
  paidAds: {
    hex: "#FFD400",
    oklch: "oklch(0.88 0.20 95)",
    tailwind: "[#FFD400]",
    name: "Cyber Yellow",
  },
  whatsapp: {
    hex: "#00FFB3",
    oklch: "oklch(0.90 0.20 165)",
    tailwind: "[#00FFB3]",
    name: "Tech Mint",
  },
  crm: {
    hex: "#7A3EFF",
    oklch: "oklch(0.50 0.30 285)",
    tailwind: "[#7A3EFF]",
    name: "Deep Purple",
  },
};

const getServiceColorHex = (theme: ServiceVisualTheme): string => {
  return serviceColors[theme].hex;
};

const getServiceColorOklch = (theme: ServiceVisualTheme): string => {
  return serviceColors[theme].oklch;
};
