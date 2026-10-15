import { describe, expect, it } from "vitest";
import { berlinClock, openState, summarize, type OpeningHours } from "./opening-hours";

const HOURS: OpeningHours = {
  mo: [["09:30", "18:30"]],
  di: [["09:30", "18:30"]],
  mi: [["09:30", "18:30"]],
  do: [["09:30", "18:30"]],
  fr: [["09:30", "18:30"]],
  sa: [["09:30", "14:00"]],
  so: [],
};

describe("opening hours", () => {
  it("reads the clock in Berlin time (summer time, UTC+2)", () => {
    // 2026-10-15 is a Thursday; 08:00 UTC = 10:00 Berlin
    expect(berlinClock(new Date("2026-10-15T08:00:00Z"))).toEqual({ day: "do", minutes: 600 });
  });

  it("is open during opening hours", () => {
    expect(openState(HOURS, new Date("2026-10-15T08:00:00Z"))).toEqual({ open: true, closesAt: "18:30" });
  });

  it("is closed before opening and opens later the same day", () => {
    expect(openState(HOURS, new Date("2026-10-15T06:00:00Z"))).toEqual({ open: false, opensDay: "do", opensAt: "09:30" });
  });

  it("closes exactly at closing time", () => {
    // Saturday 14:00 Berlin = 12:00 UTC
    expect(openState(HOURS, new Date("2026-10-17T12:00:00Z"))).toEqual({ open: false, opensDay: "mo", opensAt: "09:30" });
  });

  it("skips Sunday", () => {
    expect(openState(HOURS, new Date("2026-10-18T10:00:00Z"))).toEqual({ open: false, opensDay: "mo", opensAt: "09:30" });
  });

  it("summarizes consecutive days", () => {
    expect(summarize(HOURS)).toEqual([
      { days: "Mo–Fr", time: "09:30–18:30" },
      { days: "Sa", time: "09:30–14:00" },
    ]);
  });

  it("handles a store without opening days", () => {
    const closed: OpeningHours = { mo: [], di: [], mi: [], do: [], fr: [], sa: [], so: [] };
    expect(openState(closed, new Date("2026-10-15T08:00:00Z"))).toEqual({ open: false, opensDay: null, opensAt: null });
  });
});
