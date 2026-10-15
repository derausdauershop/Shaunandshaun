import { KmMarker } from "@/components/brand/km-marker";
import { cn } from "@/lib/utils";

interface SiteSectionProps {
  id?: string;
  km?: number | string;
  kicker?: string;
  title?: React.ReactNode;
  intro?: React.ReactNode;
  tone?: "paper" | "ink" | "white";
  accent?: "brand" | "signal" | "partner";
  className?: string;
  children: React.ReactNode;
}

export function SiteSection({ id, km, kicker, title, intro, tone = "paper", accent = "brand", className, children }: SiteSectionProps) {
  return (
    <section id={id} className={cn("scroll-mt-20 px-4 py-16 sm:px-8 lg:py-24", tone === "ink" && "surface-ink", tone === "white" && "bg-white", className)}>
      <div className="mx-auto max-w-7xl">
        {kicker && km !== undefined && <KmMarker km={km} label={kicker} accent={accent} />}
        {title && <h2 className="mt-6 max-w-4xl text-balance text-4xl sm:text-6xl">{title}</h2>}
        {intro && <div className="mt-5 max-w-2xl text-lg text-muted-foreground">{intro}</div>}
        <div className={cn((title || intro) && "mt-10 lg:mt-12")}>{children}</div>
      </div>
    </section>
  );
}
