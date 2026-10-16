"use client";

import { useSyncExternalStore } from "react";
import { berlinDate } from "@/lib/dates";

const noop = () => () => {};

/**
 * Today's date in Berlin (YYYY-MM-DD) for statically exported pages.
 * The HTML is rendered with `buildDay`; after hydration the visitor's real date takes over.
 */
export function useToday(buildDay: string): string {
  return useSyncExternalStore(noop, () => berlinDate(new Date()), () => buildDay);
}
