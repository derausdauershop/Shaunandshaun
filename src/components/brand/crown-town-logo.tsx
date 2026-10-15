import { resolveLogo } from "@/lib/brand/logos";
import { cn } from "@/lib/utils";

/** Crown Town Runners – Siegen run club, keeps its own logo (used as supplied, on light backgrounds). */
export function CrownTownLogo({ className }: { className?: string }) {
  const src = resolveLogo("crownTown");
  if (!src) return <span className={cn("font-display text-xl font-black uppercase", className)}>Crown Town Runners</span>;
  // eslint-disable-next-line @next/next/no-img-element -- club logo is used as supplied
  return <img src={src} alt="Crown Town Runners" className={cn("h-12 w-auto", className)} />;
}

/** Westerwälder Firmenlauf – event organised by AUSDAUER, keeps its own logo (used as supplied, on light backgrounds). */
export function FirmenlaufLogo({ className }: { className?: string }) {
  const src = resolveLogo("firmenlauf");
  if (!src) return <span className={cn("font-display text-xl font-black uppercase", className)}>Westerwälder Firmenlauf</span>;
  // eslint-disable-next-line @next/next/no-img-element -- event logo is used as supplied
  return <img src={src} alt="Westerwälder Firmenlauf – Let's move as one!" className={cn("h-12 w-auto", className)} />;
}
