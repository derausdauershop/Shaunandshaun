/**
 * AUSDAUER CUP – season data used by the logo previews.
 * Races as in 2026; the 2027 dates are not final yet, so only the month of the 2026 date is shown as orientation.
 */
export const CUP_SEASON = "2027";
export const CUP_EDITION = 39; // 2026 was the 38th AUSDAUER CUP

export interface CupRace {
  no: number;
  name: string;
  place: string;
  /** Date of the 2026 edition (DD.MM.) – orientation until the 2027 calendar is final */
  date2026: string;
  month: string;
}

export const CUP_RACES: CupRace[] = [
  { no: 1, name: "Asdorflauf", place: "Wehbach", date2026: "24.01.", month: "Jan" },
  { no: 2, name: "Föschber Radweglauf", place: "Niederfischbach", date2026: "21.02.", month: "Feb" },
  { no: 3, name: "Flecker Tunnellauf", place: "Freudenberg", date2026: "02.05.", month: "Mai" },
  { no: 4, name: "Deuzer Sparkassen Pfingst-Lauf", place: "Deuz", date2026: "23.05.", month: "Mai" },
  { no: 5, name: "Anzhäuser Gückellauf", place: "Anzhausen", date2026: "13.06.", month: "Jun" },
  { no: 6, name: "Wilnsdorfer Bahnlauf", place: "Wilnsdorf", date2026: "04.09.", month: "Sep" },
  { no: 7, name: "Herdorfer Götzelauf", place: "Herdorf", date2026: "27.09.", month: "Sep" },
  { no: 8, name: "Südsauerlandlauf", place: "Wenden", date2026: "07.11.", month: "Nov" },
];

export const CUP_FINAL = { name: "Abschlussfeier", date2026: "19.11.", month: "Nov" };

export type CupLogoKind = "" | "serie-" | "gestapelt-" | "siegel-" | "siegel-claim-";
export type CupLogoColor = "farbig" | "negativ" | "schwarz" | "weiss";

export const cupLogo = (kind: CupLogoKind, color: CupLogoColor) => `/brand/cup/ausdauer-cup-${kind}${color}.svg`;
