import { resolveLogo, type LogoKey } from "@/lib/brand/logos";
import { cn } from "@/lib/utils";

export type BrandLogoVariant = "ink" | "red" | "white";

const FILE: Record<BrandLogoVariant, LogoKey> = {
  ink: "ausdauer",
  red: "ausdauerRed",
  white: "ausdauerNegative",
};

interface BrandLogoProps {
  /** ink on light, red on white/paper, white on ink or red */
  variant?: BrandLogoVariant;
  className?: string;
}

/** The original AUSDAUER logo (unchanged). Falls back to a marked placeholder if the file is missing. */
export function BrandLogo({ variant = "ink", className }: BrandLogoProps) {
  const src = resolveLogo(FILE[variant]);

  if (src) {
    // eslint-disable-next-line @next/next/no-img-element -- original vector logo, no optimisation needed
    return <img src={src} alt="AUSDAUER" className={cn("h-8 w-auto", className)} />;
  }

  return (
    <span
      role="img"
      aria-label="AUSDAUER"
      title="Platzhalter – Original-Logo in public/brand/logos/ablegen"
      className={cn("inline-flex h-8 items-center border border-dashed border-current px-2 font-display text-xl font-black uppercase italic", className)}
    >
      Ausdauer
    </span>
  );
}
