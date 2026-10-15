import { resolveLogo } from "@/lib/brand/logos";
import { cn } from "@/lib/utils";

interface PartnerLogoProps {
  /** Background of the neutral field – the partner logo itself is never recoloured */
  field?: "white" | "ink";
  showSender?: boolean;
  className?: string;
}

/**
 * Co-branding container for "Absolute Run Ausdauer" (Sport 2000 format, Siegen).
 * Rules: neutral field, fixed clear space, never recoloured, always with the sender line.
 */
export function PartnerLogo({ field = "white", showSender = true, className }: PartnerLogoProps) {
  const src = resolveLogo("absoluteRun");

  return (
    <figure className={cn("inline-flex flex-col gap-2", className)}>
      <div className={cn("flex items-center justify-center p-5", field === "white" ? "bg-white" : "bg-ink")}>
        {src ? (
          // eslint-disable-next-line @next/next/no-img-element -- partner logo is used as supplied
          <img src={src} alt="Absolute Run Ausdauer" className="h-12 w-auto" />
        ) : (
          <span
            role="img"
            aria-label="Absolute Run Ausdauer"
            title="Platzhalter – Partner-Logo in public/brand/logos/ablegen"
            className={cn(
              "inline-flex h-12 items-center border border-dashed px-3 font-sans text-sm font-bold uppercase tracking-widest",
              field === "white" ? "border-ink/50 text-ink" : "border-paper/50 text-paper",
            )}
          >
            Absolute Run Ausdauer
          </span>
        )}
      </div>
      {showSender && (
        <figcaption className="font-mono text-[0.65rem] uppercase tracking-[0.2em] opacity-80">ein AUSDAUER Store · Siegen</figcaption>
      )}
    </figure>
  );
}
