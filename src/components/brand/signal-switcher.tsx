"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type Signal = "volt" | "orange";

const OPTIONS: Array<{ id: Signal; label: string; swatch: string }> = [
  { id: "volt", label: "Volt", swatch: "bg-[#D4FF3A]" },
  { id: "orange", label: "Orange", swatch: "bg-[#FF5A1F]" },
];

/** Lets reviewers preview the brand guide with each signal color candidate. */
export function SignalSwitcher({ children }: { children: React.ReactNode }) {
  const [signal, setSignal] = useState<Signal>("volt");

  return (
    <div data-signal={signal}>
      <div
        role="group"
        aria-label="Signalfarbe zur Vorschau wählen"
        className="fixed bottom-4 right-4 z-50 flex items-center gap-1 rounded-md border border-ink/10 bg-white p-1 shadow-lg print:hidden"
      >
        <span className="px-2 font-mono text-[0.65rem] uppercase tracking-[0.15em] text-stone-dark">Signal</span>
        {OPTIONS.map((o) => (
          <Button
            key={o.id}
            size="sm"
            variant={signal === o.id ? "default" : "ghost"}
            aria-pressed={signal === o.id}
            onClick={() => setSignal(o.id)}
            className="h-8 gap-2"
          >
            <span aria-hidden className={cn("size-3 rounded-full ring-1 ring-ink/20", o.swatch)} />
            {o.label}
          </Button>
        ))}
      </div>
      {children}
    </div>
  );
}
