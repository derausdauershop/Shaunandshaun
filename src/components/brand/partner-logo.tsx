import { resolveLogo } from "@/lib/brand/logos";
import { cn } from "@/lib/utils";

interface PartnerLogoProps {
  showSender?: boolean;
  className?: string;
}

/**
 * Co-branding container for "Absolute Run Ausdauer" (Sport 2000 format, Siegen).
 * The supplied logo only works on light backgrounds, so it always sits on its own white field
 * with fixed clear space – never recoloured, always with the sender line.
 */
export function PartnerLogo({ showSender = true, className }: PartnerLogoProps) {
  const src = resolveLogo("absoluteRun");

  return (
    <figure className={cn("inline-flex flex-col gap-2", className)}>
      <div className="flex items-center justify-center bg-white px-4 py-2">
        {src ? (
          // eslint-disable-next-line @next/next/no-img-element -- partner logo is used as supplied
          <img src={src} alt="Absolute Run Ausdauer" className="h-16 w-auto" />
        ) : (
          <span className="inline-flex h-16 items-center border border-dashed border-ink/50 px-3 text-sm font-bold uppercase tracking-widest text-ink">
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
