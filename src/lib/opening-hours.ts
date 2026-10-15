/**
 * Opening hours in local time (Europe/Berlin).
 * Public holidays are not modelled – the footer note says so.
 */
export type DayKey = "mo" | "di" | "mi" | "do" | "fr" | "sa" | "so";
export type OpeningHours = Record<DayKey, Array<[string, string]>>;

export const DAY_ORDER: DayKey[] = ["mo", "di", "mi", "do", "fr", "sa", "so"];
export const DAY_LABEL: Record<DayKey, string> = { mo: "Mo", di: "Di", mi: "Mi", do: "Do", fr: "Fr", sa: "Sa", so: "So" };

const toMinutes = (hhmm: string) => {
  const [h, m] = hhmm.split(":").map(Number);
  return h * 60 + m;
};

/** Weekday and minutes since midnight of `date` in Berlin time. */
export function berlinClock(date: Date): { day: DayKey; minutes: number } {
  const parts = new Intl.DateTimeFormat("en-GB", {
    timeZone: "Europe/Berlin",
    weekday: "short",
    hour: "2-digit",
    minute: "2-digit",
    hourCycle: "h23",
  }).formatToParts(date);
  const get = (t: string) => parts.find((p) => p.type === t)?.value ?? "";
  const map: Record<string, DayKey> = { Mon: "mo", Tue: "di", Wed: "mi", Thu: "do", Fri: "fr", Sat: "sa", Sun: "so" };
  return { day: map[get("weekday")], minutes: Number(get("hour")) * 60 + Number(get("minute")) };
}

export type OpenState = { open: true; closesAt: string } | { open: false; opensDay: DayKey | null; opensAt: string | null };

export function openState(hours: OpeningHours, date: Date): OpenState {
  const { day, minutes } = berlinClock(date);
  for (const [from, to] of hours[day]) {
    if (minutes >= toMinutes(from) && minutes < toMinutes(to)) return { open: true, closesAt: to };
  }
  // next opening: later today, then the following days
  const later = hours[day].find(([from]) => toMinutes(from) > minutes);
  if (later) return { open: false, opensDay: day, opensAt: later[0] };
  const start = DAY_ORDER.indexOf(day);
  for (let i = 1; i <= 7; i++) {
    const d = DAY_ORDER[(start + i) % 7];
    if (hours[d].length) return { open: false, opensDay: d, opensAt: hours[d][0][0] };
  }
  return { open: false, opensDay: null, opensAt: null };
}

/** Groups days with identical hours: "Mo–Fr 09:30–18:30", "Sa 09:30–14:00". */
export function summarize(hours: OpeningHours): Array<{ days: string; time: string }> {
  const rows: Array<{ days: DayKey[]; time: string }> = [];
  for (const d of DAY_ORDER) {
    if (!hours[d].length) continue;
    const time = hours[d].map(([a, b]) => `${a}–${b}`).join(", ");
    const last = rows[rows.length - 1];
    const prev = last?.days[last.days.length - 1];
    if (last && last.time === time && prev && DAY_ORDER.indexOf(prev) === DAY_ORDER.indexOf(d) - 1) last.days.push(d);
    else rows.push({ days: [d], time });
  }
  return rows.map((r) => ({
    days: r.days.length > 1 ? `${DAY_LABEL[r.days[0]]}–${DAY_LABEL[r.days[r.days.length - 1]]}` : DAY_LABEL[r.days[0]],
    time: r.time,
  }));
}
