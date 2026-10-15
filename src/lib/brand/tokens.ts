/**
 * Single source of truth for the AUSDAUER palette & type (PROJ-1).
 * Keep in sync with the CSS variables in src/app/globals.css.
 * CMYK / Pantone values are approximations – the print shop must verify them with a proof.
 */

export interface BrandColor {
  id: string;
  name: string;
  role: string;
  hex: string;
  rgb: string;
  cmyk: string;
  pantone: string;
}

export const COLORS: BrandColor[] = [
  { id: "brand", name: "AUSDAUER Rot", role: "Logofarbe · Marke, Aktion, CTA", hex: "#E30110", rgb: "227 1 16", cmyk: "0 100 100 0", pantone: "P 48-8 C" },
  { id: "ink", name: "Ink", role: "Logofarbe · Text, Flächen", hex: "#222222", rgb: "34 34 34", cmyk: "0 0 0 100", pantone: "Neutral Black C" },
  { id: "paper", name: "Paper", role: "Hintergrund, Ruhe", hex: "#F4F2ED", rgb: "244 242 237", cmyk: "3 3 6 0", pantone: "≈ Warm Gray 1 C (20 %)" },
  { id: "stone", name: "Stone", role: "Linien, Höhenlinien, Deko", hex: "#8C8A84", rgb: "140 138 132", cmyk: "0 2 8 52", pantone: "≈ Warm Gray 8 C" },
  { id: "stone-dark", name: "Stone Dark", role: "Sekundärtext auf Paper", hex: "#5E5C57", rgb: "94 92 87", cmyk: "0 2 7 70", pantone: "≈ 405 C" },
];

/** Accent colors with a fixed scope – never used for the umbrella brand alone. */
export const ACCENT_COLORS: BrandColor[] = [
  { id: "signal", name: "Volt", role: "Signalfarbe · Run Academy, Community, Aktivierung", hex: "#CAFF42", rgb: "202 255 66", cmyk: "25 0 85 0", pantone: "≈ 380 C · Neon 802 C" },
  { id: "partner", name: "Siegen-Cyan", role: "Nur Siegen-Kontext · aus Absolute Run & Crown Town Runners", hex: "#29B9D2", rgb: "41 185 210", cmyk: "70 0 15 0", pantone: "≈ 3125 C" },
];

export const CONTRAST_PAIRS: Array<{ fg: string; bg: string; label: string }> = [
  { fg: "#222222", bg: "#F4F2ED", label: "Ink auf Paper" },
  { fg: "#F4F2ED", bg: "#222222", label: "Paper auf Ink" },
  { fg: "#5E5C57", bg: "#F4F2ED", label: "Stone Dark auf Paper" },
  { fg: "#FFFFFF", bg: "#E30110", label: "Weiß auf Rot" },
  { fg: "#E30110", bg: "#FFFFFF", label: "Rot auf Weiß" },
  { fg: "#E30110", bg: "#F4F2ED", label: "Rot auf Paper" },
  { fg: "#E30110", bg: "#222222", label: "Rot auf Ink" },
  { fg: "#222222", bg: "#CAFF42", label: "Ink auf Volt" },
  { fg: "#CAFF42", bg: "#222222", label: "Volt auf Ink" },
  { fg: "#CAFF42", bg: "#F4F2ED", label: "Volt auf Paper" },
  { fg: "#222222", bg: "#29B9D2", label: "Ink auf Cyan" },
];

/** Previous house font (commercial licence) – replaced by the Barlow family. */
export const PREVIOUS_TYPE = "Proxima Nova (Black Italic / Medium / Regular)";

export const TYPE = [
  { role: "Headline", family: "Barlow Condensed", weights: "800 / 900, Versalien, optional kursiv", license: "SIL OFL 1.1" },
  { role: "Fließtext", family: "Barlow", weights: "400 / 500 / 600", license: "SIL OFL 1.1" },
  { role: "Daten & Zahlen", family: "JetBrains Mono", weights: "400 / 600", license: "SIL OFL 1.1" },
];
