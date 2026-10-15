import { cn } from "@/lib/utils";

interface KmMarkerProps {
  km: number | string;
  label?: string;
  className?: string;
}

/** Kilometer marker used as section number / divider ("KM 01 – Laufanalyse"). */
export function KmMarker({ km, label, className }: KmMarkerProps) {
  const value = typeof km === "number" ? String(km).padStart(2, "0") : km;
  return (
    <div className={cn("flex items-center gap-3 whitespace-nowrap", className)}>
      <span aria-hidden className="h-8 w-1 bg-signal" />
      <span className="font-mono text-xs font-semibold uppercase tracking-[0.2em]">KM</span>
      <span className="font-display text-3xl font-black leading-none tabular">{value}</span>
      {label && (
        <>
          <span aria-hidden className="h-px w-8 bg-current opacity-40" />
          <span className="font-mono text-xs uppercase tracking-[0.15em]">{label}</span>
        </>
      )}
    </div>
  );
}
