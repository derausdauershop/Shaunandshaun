import { cn } from "@/lib/utils";

interface PaceLinesProps {
  className?: string;
  /** Number of bars (3–6 recommended) */
  count?: number;
}

const LENGTHS = [1, 0.72, 0.88, 0.55, 0.8, 0.64];

/** Diagonal motion bars – the "Pace-Lines". Inherits currentColor. */
export function PaceLines({ className, count = 4 }: PaceLinesProps) {
  const barHeight = 14;
  const gap = 10;
  const skew = 18;
  const width = 400;
  const height = count * barHeight + (count - 1) * gap;

  return (
    <svg aria-hidden viewBox={`0 0 ${width} ${height}`} fill="currentColor" className={cn("pointer-events-none", className)}>
      {Array.from({ length: count }, (_, i) => {
        const len = LENGTHS[i % LENGTHS.length] * (width - skew);
        const y = i * (barHeight + gap);
        const x = width - len - i * 6;
        return (
          <polygon
            key={i}
            points={`${x + skew},${y} ${x + len},${y} ${x + len - skew},${y + barHeight} ${x},${y + barHeight}`}
          />
        );
      })}
    </svg>
  );
}
