export interface AccentTokens {
  solid: string;
  bg: string;
  border: string;
  bgSubtle: string;
}

export function deriveAccentTokens(accentColor?: string): AccentTokens {
  const fallback = "oklch(0.6 0.15 250";
  const base = accentColor ? accentColor.replace(/\)$/, "") : fallback;
  return {
    solid: `${base})`,
    bg: `${base} / 0.12)`,
    border: `${base} / 0.25)`,
    bgSubtle: `${base} / 0.06)`,
  };
}

export type ButtonColor =
  | "blue"
  | "cyan"
  | "emerald"
  | "purple"
  | "pink"
  | "amber";

export function mapAccentToButtonColor(accentColor?: string): ButtonColor {
  if (!accentColor) return "blue";
  const hueMatch = accentColor.match(
    /oklch\(\s*[\d.]+\s+[\d.]+\s+([\d.]+)/,
  );
  if (!hueMatch) return "blue";
  const hue = parseFloat(hueMatch[1]);
  if (hue >= 270 && hue <= 330) return "purple";
  if (hue >= 40 && hue <= 90) return "amber";
  if (hue >= 170 && hue <= 210) return "cyan";
  if (hue >= 120 && hue < 170) return "emerald";
  if (hue > 210 && hue < 270) return "blue";
  if (hue > 330 || hue < 20) return "pink";
  return "blue";
}
