import Image from "next/image";
import { KmMarker } from "@/components/brand/km-marker";
import { TopoLines } from "@/components/brand/topo-lines";
import { cn } from "@/lib/utils";

interface PageHeroProps {
  kicker: string;
  title: React.ReactNode;
  intro?: React.ReactNode;
  image?: string;
  imageAlt?: string;
  accent?: "brand" | "signal" | "partner";
  children?: React.ReactNode;
}

/** Ink hero used by all subpages: topo texture, optional photo on the right. */
export function PageHero({ kicker, title, intro, image, imageAlt = "", accent = "brand", children }: PageHeroProps) {
  return (
    <section className="surface-ink relative overflow-hidden">
      <TopoLines className="absolute inset-0 h-full w-full text-stone opacity-25" />
      <div className={cn("relative mx-auto grid max-w-7xl gap-10 px-4 py-14 sm:px-8 lg:py-20", image && "lg:grid-cols-[1.2fr_1fr] lg:items-center")}>
        <div className="min-w-0">
          <KmMarker km="00" label={kicker} accent={accent} />
          <h1 className="mt-6 text-balance text-5xl sm:text-7xl lg:text-8xl">{title}</h1>
          {intro && <div className="mt-6 max-w-2xl text-lg text-muted-foreground sm:text-xl">{intro}</div>}
          {children && <div className="mt-8">{children}</div>}
        </div>
        {image && (
          <div className="relative aspect-[4/3] overflow-hidden rounded-sm lg:aspect-square">
            <Image src={image} alt={imageAlt} fill priority sizes="(min-width: 1024px) 40vw, 100vw" className="object-cover" />
          </div>
        )}
      </div>
    </section>
  );
}
