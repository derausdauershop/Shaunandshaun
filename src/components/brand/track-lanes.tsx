import { cn } from "@/lib/utils";

interface TrackLanesProps {
  lanes?: number;
  className?: string;
}

/** Track lanes as a horizontal divider / background band. Inherits currentColor. */
export function TrackLanes({ lanes = 4, className }: TrackLanesProps) {
  return (
    <div aria-hidden className={cn("relative w-full", className)}>
      <span className="absolute inset-x-0 top-0 h-px bg-current opacity-40" />
      {Array.from({ length: lanes }, (_, i) => (
        <div key={i} className="relative flex h-8 items-center gap-3">
          <span className="w-6 font-mono text-[0.65rem] font-semibold opacity-70 tabular">{i + 1}</span>
          <span className="absolute inset-x-0 bottom-0 h-px bg-current opacity-40" />
        </div>
      ))}
      {/* Finish line */}
      <span className="absolute inset-y-0 right-10 w-2 bg-[repeating-linear-gradient(0deg,currentColor_0_8px,transparent_8px_16px)] opacity-70" />
    </div>
  );
}
