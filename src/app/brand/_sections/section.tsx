import { KmMarker } from "@/components/brand/km-marker";
import { cn } from "@/lib/utils";

interface SectionProps {
  id: string;
  km: number;
  kicker: string;
  title: string;
  intro?: string;
  dark?: boolean;
  children: React.ReactNode;
}

export function Section({ id, km, kicker, title, intro, dark = false, children }: SectionProps) {
  return (
    <section id={id} className={cn("scroll-mt-16 px-4 py-16 sm:px-8 lg:py-24", dark && "surface-ink")}>
      <div className="mx-auto max-w-6xl">
        <KmMarker km={km} label={kicker} />
        <h2 className="mt-6 max-w-3xl text-5xl sm:text-6xl lg:text-7xl">{title}</h2>
        {intro && <p className="mt-5 max-w-2xl text-lg text-muted-foreground">{intro}</p>}
        <div className="mt-12">{children}</div>
      </div>
    </section>
  );
}

export function Rule({ kind, children }: { kind: "do" | "dont"; children: React.ReactNode }) {
  return (
    <li className="flex gap-3">
      <span
        aria-hidden
        className={cn(
          "mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-sm font-mono text-xs font-bold",
          kind === "do" ? "bg-signal text-signal-foreground" : "bg-destructive text-destructive-foreground",
        )}
      >
        {kind === "do" ? "✓" : "✕"}
      </span>
      <span>
        <span className="sr-only">{kind === "do" ? "Richtig: " : "Falsch: "}</span>
        {children}
      </span>
    </li>
  );
}
