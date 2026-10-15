import { cn } from "@/lib/utils";

/** Three lanes running through a track bend – "Ausdauer ist eine Strecke". */
export function RunAcademyIcon({ className, framed = false }: { className?: string; framed?: boolean }) {
  return (
    <svg viewBox="0 0 64 64" aria-hidden className={cn("size-12 shrink-0", className)}>
      {framed && <rect width="64" height="64" rx="4" className="fill-ink" />}
      <g fill="none" strokeWidth="6" strokeLinecap="butt" className={framed ? "stroke-signal" : "stroke-current"}>
        {[38, 27, 16].map((r) => (
          <path key={r} d={`M${54 - r} 60 V54 A${r} ${r} 0 0 1 54 ${54 - r} H60`} />
        ))}
      </g>
    </svg>
  );
}

interface RunAcademyLogoProps {
  layout?: "horizontal" | "stacked";
  framedIcon?: boolean;
  className?: string;
}

export function RunAcademyLogo({ layout = "horizontal", framedIcon = false, className }: RunAcademyLogoProps) {
  const stacked = layout === "stacked";
  return (
    <div
      role="img"
      aria-label="Run Academy by AUSDAUER"
      className={cn("inline-flex", stacked ? "flex-col items-center gap-3 text-center" : "items-center gap-3", className)}
    >
      <RunAcademyIcon framed={framedIcon} className={stacked ? "size-16" : "size-12"} />
      <div className={cn("flex flex-col leading-none", stacked && "items-center")}>
        <span className="font-display text-[2.1rem] font-black uppercase italic leading-[0.8] tracking-tight">Run</span>
        <span className="font-display text-xl font-bold uppercase leading-none tracking-[0.12em]">Academy</span>
        <span className="mt-1 font-mono text-[0.55rem] font-semibold uppercase tracking-[0.25em] opacity-80">by Ausdauer</span>
      </div>
    </div>
  );
}
