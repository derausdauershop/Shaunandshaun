"use client";

import { useEffect, useState } from "react";
import { DAY_LABEL, openState, type OpenState, type OpeningHours } from "@/lib/opening-hours";
import { cn } from "@/lib/utils";

/** Live "open now" badge. Rendered after mount so the static page never shows a stale state. */
export function OpenStatus({ hours, className, tone = "light" }: { hours: OpeningHours; className?: string; tone?: "light" | "dark" }) {
  const [state, setState] = useState<OpenState | null>(null);

  useEffect(() => {
    const update = () => setState(openState(hours, new Date()));
    update();
    const id = window.setInterval(update, 60_000);
    return () => window.clearInterval(id);
  }, [hours]);

  if (!state) return <span data-hours={JSON.stringify(hours)} className={cn("inline-block h-5", className)} aria-hidden />;

  const label = state.open
    ? `Jetzt geöffnet · bis ${state.closesAt} Uhr`
    : state.opensAt
      ? `Geschlossen · öffnet ${state.opensDay ? DAY_LABEL[state.opensDay] : ""} ${state.opensAt} Uhr`
      : "Geschlossen";

  return (
    <span role="status" className={cn("inline-flex items-center gap-2 font-mono text-[0.7rem] uppercase tracking-[0.12em]", className)}>
      <span
        aria-hidden
        className={cn("size-2 rounded-full", state.open ? "bg-signal ring-2 ring-signal/30" : tone === "dark" ? "bg-paper/40" : "bg-stone")}
      />
      {label}
    </span>
  );
}
