/** Date helpers for content in Berlin local time (ISO dates YYYY-MM-DD). */

/** Today's date in Berlin as YYYY-MM-DD. */
export function berlinDate(now: Date): string {
  return new Intl.DateTimeFormat("sv-SE", { timeZone: "Europe/Berlin" }).format(now);
}

/** Items from today on, sorted by date. */
export function upcoming<T extends { date: string }>(items: readonly T[], now: Date): T[] {
  const today = berlinDate(now);
  return items.filter((e) => e.date >= today).sort((a, b) => a.date.localeCompare(b.date));
}

export function formatDate(iso: string, opts: Intl.DateTimeFormatOptions = { weekday: "short", day: "2-digit", month: "2-digit", year: "numeric" }) {
  return new Intl.DateTimeFormat("de-DE", { ...opts, timeZone: "UTC" }).format(new Date(`${iso}T12:00:00Z`));
}
