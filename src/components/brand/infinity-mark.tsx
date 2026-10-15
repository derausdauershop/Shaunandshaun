import { INFINITY_PATH, INFINITY_VIEWBOX } from "@/lib/brand/infinity";
import { cn } from "@/lib/utils";

interface InfinityMarkProps {
  className?: string;
  /** "solid" = the symbol as in the logo, "track" = outline only, used as a large supergraphic */
  variant?: "solid" | "track";
  title?: string;
  /** Stroke width in px for the "track" variant */
  strokeWidth?: number;
}

/** The ∞ from the AUSDAUER logo – the shared signature of the whole brand family. Inherits currentColor. */
export function InfinityMark({ className, variant = "solid", title, strokeWidth = 1.5 }: InfinityMarkProps) {
  return (
    <svg
      viewBox={INFINITY_VIEWBOX}
      role={title ? "img" : undefined}
      aria-hidden={title ? undefined : true}
      aria-label={title}
      className={cn("shrink-0 overflow-visible", className)}
    >
      {variant === "solid" ? (
        <path d={INFINITY_PATH} fill="currentColor" />
      ) : (
        <path d={INFINITY_PATH} fill="none" stroke="currentColor" strokeWidth={strokeWidth} vectorEffect="non-scaling-stroke" />
      )}
    </svg>
  );
}
