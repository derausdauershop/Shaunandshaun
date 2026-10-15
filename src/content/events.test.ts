import { describe, expect, it } from "vitest";
import { berlinDate, formatDate, upcomingEvents, type SiteEvent } from "./events";

const E = (date: string, title = date): SiteEvent => ({ date, title, place: "x", category: "AUSDAUER CUP", href: "/" });

describe("events", () => {
  it("uses the Berlin calendar day", () => {
    // 23:30 UTC on 6 Nov is already 7 Nov in Berlin (UTC+1)
    expect(berlinDate(new Date("2026-11-06T23:30:00Z"))).toBe("2026-11-07");
  });

  it("keeps today's event and drops past ones, sorted", () => {
    const list = [E("2026-11-19"), E("2026-09-27"), E("2026-11-07")];
    expect(upcomingEvents(list, new Date("2026-11-07T10:00:00Z")).map((e) => e.date)).toEqual(["2026-11-07", "2026-11-19"]);
  });

  it("returns an empty list after the season", () => {
    expect(upcomingEvents([E("2026-11-19")], new Date("2026-12-01T10:00:00Z"))).toEqual([]);
  });

  it("formats German dates", () => {
    expect(formatDate("2026-11-07")).toBe("Sa., 07.11.2026");
  });
});
