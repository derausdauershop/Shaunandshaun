import { INFINITY_PATH } from "@/lib/brand/infinity";
import { cn } from "@/lib/utils";

type Surface = "light" | "dark" | "signal";

/**
 * Badge with the AUSDAUER ∞, slanted 5° like the logo lettering.
 * Geometry is shared with scripts/generate-brand-assets.mts.
 */
export const ACADEMY_BADGE_POINTS = "5.6,0 80,0 74.4,64 0,64";
export const ACADEMY_INFINITY_TRANSFORM = "translate(13.1 19.95) scale(0.85)";

export function RunAcademyIcon({ className, surface = "light" }: { className?: string; surface?: Surface }) {
  const onDark = surface === "dark";
  return (
    <svg viewBox="0 0 80 64" aria-hidden className={cn("h-12 w-auto shrink-0", className)}>
      <polygon points={ACADEMY_BADGE_POINTS} className={onDark ? "fill-signal" : "fill-ink"} />
      <path d={INFINITY_PATH} transform={ACADEMY_INFINITY_TRANSFORM} className={onDark ? "fill-ink" : "fill-signal"} />
    </svg>
  );
}

interface RunAcademyLogoProps {
  layout?: "horizontal" | "stacked";
  surface?: Surface;
  /** Adds "by AUSDAUER" – use for external communication outside our own channels */
  endorsed?: boolean;
  className?: string;
}

export function RunAcademyLogo({ layout = "horizontal", surface = "light", endorsed = false, className }: RunAcademyLogoProps) {
  const stacked = layout === "stacked";
  return (
    <div
      role="img"
      aria-label={`Run Academy – Besser. Laufen. Lernen.${endorsed ? " by AUSDAUER" : ""}`}
      className={cn(
        "inline-flex",
        stacked ? "flex-col items-center gap-3 text-center" : "items-center gap-3",
        surface === "dark" ? "text-paper" : "text-ink",
        className,
      )}
    >
      <RunAcademyIcon surface={surface} className={stacked ? "h-16" : "h-12"} />
      <div className={cn("flex flex-col", stacked && "items-center")}>
        <span className="whitespace-nowrap font-display text-[2rem] font-black uppercase italic leading-[0.85] tracking-tight">Run Academy</span>
        <span className="mt-1 whitespace-nowrap font-mono text-[0.6rem] font-semibold uppercase tracking-[0.18em]">Besser. Laufen. Lernen.</span>
        {endorsed && (
          <span className="mt-0.5 whitespace-nowrap font-mono text-[0.55rem] uppercase tracking-[0.25em] opacity-70">by Ausdauer</span>
        )}
      </div>
    </div>
  );
}
