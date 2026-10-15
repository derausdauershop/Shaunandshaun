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
  placeholder?: boolean;
}

export const COLORS: BrandColor[] = [
  {
    id: "brand",
    name: "Logo-Farbe",
    role: "Primärfarbe aus dem AUSDAUER-Logo – wird nach Upload übernommen",
    hex: "#111214",
    rgb: "–",
    cmyk: "–",
    pantone: "–",
    placeholder: true,
  },
  { id: "ink", name: "Ink", role: "Text, Flächen, Kontrast", hex: "#111214", rgb: "17 18 20", cmyk: "60 50 40 95", pantone: "≈ Black 6 C" },
  { id: "paper", name: "Paper", role: "Hintergrund, Ruhe", hex: "#F4F2ED", rgb: "244 242 237", cmyk: "3 3 6 0", pantone: "≈ Warm Gray 1 C (20 %)" },
  { id: "stone", name: "Stone", role: "Linien, Höhenlinien, Deko", hex: "#8C8A84", rgb: "140 138 132", cmyk: "0 2 8 52", pantone: "≈ Warm Gray 8 C" },
  { id: "stone-dark", name: "Stone Dark", role: "Sekundärtext auf Paper", hex: "#5E5C57", rgb: "94 92 87", cmyk: "0 2 7 70", pantone: "≈ 405 C" },
];

export const SIGNAL_CANDIDATES: BrandColor[] = [
  { id: "volt", name: "Volt", role: "Signalfarbe (Kandidat A)", hex: "#D4FF3A", rgb: "212 255 58", cmyk: "20 0 85 0", pantone: "≈ 380 C · Neon 802 C" },
  { id: "orange", name: "Signal-Orange", role: "Signalfarbe (Kandidat B)", hex: "#FF5A1F", rgb: "255 90 31", cmyk: "0 75 90 0", pantone: "≈ 1655 C · Neon 805 C" },
];

export const CONTRAST_PAIRS: Array<{ fg: string; bg: string; label: string }> = [
  { fg: "#111214", bg: "#F4F2ED", label: "Ink auf Paper" },
  { fg: "#F4F2ED", bg: "#111214", label: "Paper auf Ink" },
  { fg: "#5E5C57", bg: "#F4F2ED", label: "Stone Dark auf Paper" },
  { fg: "#111214", bg: "#D4FF3A", label: "Ink auf Volt" },
  { fg: "#D4FF3A", bg: "#111214", label: "Volt auf Ink" },
  { fg: "#D4FF3A", bg: "#F4F2ED", label: "Volt auf Paper" },
  { fg: "#111214", bg: "#FF5A1F", label: "Ink auf Orange" },
  { fg: "#FF5A1F", bg: "#F4F2ED", label: "Orange auf Paper" },
];

export const TYPE = [
  { role: "Headline", family: "Barlow Condensed", weights: "800 / 900, Versalien, optional kursiv", license: "SIL OFL 1.1" },
  { role: "Fließtext", family: "Barlow", weights: "400 / 500 / 600", license: "SIL OFL 1.1" },
  { role: "Daten & Zahlen", family: "JetBrains Mono", weights: "400 / 600", license: "SIL OFL 1.1" },
];
