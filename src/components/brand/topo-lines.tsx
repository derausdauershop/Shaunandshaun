import { topoPaths } from "@/lib/brand/topo";
import { cn } from "@/lib/utils";

interface TopoLinesProps {
  className?: string;
  width?: number;
  height?: number;
  strokeWidth?: number;
}

/** Contour-line texture (Westerwald/Siegerland). Inherits currentColor. */
export function TopoLines({ className, width = 1200, height = 800, strokeWidth = 1.25 }: TopoLinesProps) {
  return (
    <svg
      aria-hidden
      viewBox={`0 0 ${width} ${height}`}
      preserveAspectRatio="xMidYMid slice"
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      className={cn("pointer-events-none", className)}
    >
      {topoPaths({ width, height }).map((d, i) => (
        <path key={i} d={d} vectorEffect="non-scaling-stroke" />
      ))}
    </svg>
  );
}
