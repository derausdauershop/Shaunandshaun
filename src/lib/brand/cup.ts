/**
 * AUSDAUER CUP – season data used by the logo previews.
 * EXAMPLE DATA: race names, dates and hosts are placeholders until the 2027 calendar is confirmed.
 */
export const CUP_SEASON = "2027";

export interface CupRace {
  no: number;
  name: string;
  host: string;
  date: string;
  distance: string;
}

export const CUP_RACES: CupRace[] = Array.from({ length: 9 }, (_, i) => ({
  no: i + 1,
  name: `Lauf ${i + 1}`,
  host: "Ausrichter-Verein",
  date: "TT.MM.",
  distance: i % 3 === 0 ? "10 km" : i % 3 === 1 ? "5 km" : "Halbmarathon",
}));

export type CupLogoKind = "" | "serie-" | "gestapelt-" | "siegel-";
export type CupLogoColor = "farbig" | "negativ" | "schwarz" | "weiss";

export const cupLogo = (kind: CupLogoKind, color: CupLogoColor) => `/brand/cup/ausdauer-cup-${kind}${color}.svg`;
