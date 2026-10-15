import { resolveLogo } from "@/lib/brand/logos";
import { cn } from "@/lib/utils";

interface BrandLogoProps {
  /** Use the negative (light) version on dark surfaces */
  negative?: boolean;
  className?: string;
}

/** The original AUSDAUER logo (unchanged). Shows a marked placeholder until the file is uploaded. */
export function BrandLogo({ negative = false, className }: BrandLogoProps) {
  const src = (negative && resolveLogo("ausdauerNegative")) || resolveLogo("ausdauer");

  if (src) {
    // eslint-disable-next-line @next/next/no-img-element -- original vector logo, no optimisation needed
    return <img src={src} alt="AUSDAUER" className={cn("h-10 w-auto", negative && !resolveLogo("ausdauerNegative") && "invert", className)} />;
  }

  return (
    <span
      role="img"
      aria-label="AUSDAUER"
      title="Platzhalter – Original-Logo in public/brand/logos/ablegen"
      className={cn(
        "inline-flex h-10 items-center border border-dashed border-current px-2 font-display text-2xl font-black uppercase italic tracking-tight",
        className,
      )}
    >
      Ausdauer
    </span>
  );
}
