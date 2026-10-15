import { CUP_FINAL, CUP_RACES } from "./cup";

export type EventCategory = "AUSDAUER CUP" | "Community" | "Firmenlauf";

export interface SiteEvent {
  /** ISO date (YYYY-MM-DD) in local time */
  date: string;
  title: string;
  place: string;
  category: EventCategory;
  href: string;
  provisional?: boolean;
}

export const EVENTS: SiteEvent[] = [
  ...CUP_RACES.map((r) => ({
    date: r.date,
    title: `${r.name} ${r.place}`,
    place: r.place,
    category: "AUSDAUER CUP" as const,
    href: `/ausdauer-cup/${r.slug}`,
    provisional: r.provisional,
  })),
  { date: CUP_FINAL.date, title: "Abschlussfeier AUSDAUER CUP", place: "Krombacher Braustuben", category: "AUSDAUER CUP", href: "/ausdauer-cup#abschlussfeier", provisional: true },
];

/** Today's date in Berlin as YYYY-MM-DD. */
export function berlinDate(now: Date): string {
  return new Intl.DateTimeFormat("sv-SE", { timeZone: "Europe/Berlin" }).format(now);
}

/** Events from today on, sorted by date. */
export function upcomingEvents(events: SiteEvent[], now: Date): SiteEvent[] {
  const today = berlinDate(now);
  return events.filter((e) => e.date >= today).sort((a, b) => a.date.localeCompare(b.date));
}

export function formatDate(iso: string, opts: Intl.DateTimeFormatOptions = { weekday: "short", day: "2-digit", month: "2-digit", year: "numeric" }) {
  return new Intl.DateTimeFormat("de-DE", { ...opts, timeZone: "UTC" }).format(new Date(`${iso}T12:00:00Z`));
}
