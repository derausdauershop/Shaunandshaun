import { cn } from "@/lib/utils";

export interface DataPoint {
  label: string;
  value: string;
  unit?: string;
}

interface DataOverlayProps {
  data: DataPoint[];
  className?: string;
}

/** Running-analysis style data readout with corner brackets. */
export function DataOverlay({ data, className }: DataOverlayProps) {
  return (
    <dl className={cn("relative inline-grid grid-cols-2 gap-x-8 gap-y-3 p-5 font-mono", className)}>
      {["left-0 top-0 border-l border-t", "right-0 top-0 border-r border-t", "bottom-0 left-0 border-b border-l", "bottom-0 right-0 border-b border-r"].map(
        (pos) => (
          <span key={pos} aria-hidden className={cn("absolute size-3 border-current", pos)} />
        ),
      )}
      {data.map((d) => (
        <div key={d.label}>
          <dt className="text-[0.65rem] uppercase tracking-[0.2em] opacity-70">{d.label}</dt>
          <dd className="text-xl font-semibold tabular">
            {d.value}
            {d.unit && <span className="ml-1 text-xs font-normal opacity-70">{d.unit}</span>}
          </dd>
        </div>
      ))}
    </dl>
  );
}
