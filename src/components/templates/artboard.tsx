import { cn } from "@/lib/utils";

/**
 * Root of every template. Print artboards include 3 mm bleed on each side – the size class
 * passed in must already contain it (e.g. A5 = 148 × 210 mm → w-[154mm] h-[216mm]).
 */
export function Artboard({ className, children }: { className: string; children: React.ReactNode }) {
  return <div className={cn("relative overflow-hidden font-sans antialiased", className)}>{children}</div>;
}

/** Store line used on all print media that concern both stores. */
export function StoreLine({ tone = "light", className }: { tone?: "light" | "dark"; className?: string }) {
  const muted = tone === "dark" ? "text-paper/70" : "text-stone-dark";
  return (
    <div className={cn("grid grid-cols-2 gap-[4mm] text-[2.6mm] leading-snug", className)}>
      <div>
        <p className="font-display text-[3.6mm] font-black uppercase italic">Betzdorf</p>
        <p className={muted}>Wilhelmstraße 16 · 02741 4372</p>
        <p className={muted}>Mo–Fr 9:30–18:30 · Sa 9:30–14:00</p>
      </div>
      <div>
        <p className="font-display text-[3.6mm] font-black uppercase italic">Siegen</p>
        <p className={muted}>Koblenzer Straße 40 · 0271 77005090</p>
        <p className={muted}>Mo–Fr 10:00–18:30 · Sa 10:00–16:00</p>
      </div>
    </div>
  );
}
