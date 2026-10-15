import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { PartnerLogo } from "@/components/brand/partner-logo";
import { OpenStatus } from "@/components/site/open-status";
import { PageHero } from "@/components/site/page-hero";
import { SiteSection } from "@/components/site/section";
import { StoreJsonLd } from "@/components/site/store-jsonld";
import { Button } from "@/components/ui/button";
import { STORES, mapsUrl } from "@/content/stores";
import { summarize } from "@/lib/opening-hours";

export const metadata: Metadata = {
  title: "Stores",
  description: "AUSDAUER in Betzdorf (Wilhelmstraße 16) und Absolute Run Ausdauer in Siegen (Koblenzer Straße 40): Adressen, Öffnungszeiten, Telefon.",
};

export default function StoresPage() {
  return (
    <>
      <StoreJsonLd stores={STORES} />
      <PageHero kicker="Stores" title={<>Betzdorf & <span className="italic text-brand">Siegen.</span></>} intro="Zweimal Laufsport mit Beratung, die sich Zeit nimmt. In Betzdorf zusätzlich Wandern, Outdoor und Fitness." />
      <SiteSection>
        <div className="grid gap-8 lg:grid-cols-2">
          {STORES.map((s) => (
            <article key={s.slug} className="overflow-hidden rounded-sm bg-white ring-1 ring-border">
              <div className="relative aspect-[16/10]">
                <Image src={s.image} alt={`Store ${s.city}`} fill sizes="(min-width: 1024px) 50vw, 100vw" className="object-cover" />
              </div>
              <div className="p-6 sm:p-8">
                <div className="flex min-h-14 flex-wrap items-center justify-between gap-4">
                  <h2 className="text-5xl italic">{s.city}</h2>
                  {s.partner && <PartnerLogo className="[&>div]:p-0 [&_img]:h-12" />}
                </div>
                <p className="mt-4 text-muted-foreground">{s.intro}</p>
                <div className="mt-6 grid gap-6 sm:grid-cols-2">
                  <address className="not-italic">
                    <p className="font-mono text-xs uppercase tracking-[0.2em] text-muted-foreground">Adresse</p>
                    <p className="mt-2">
                      {s.street}
                      <br />
                      {s.zip} {s.city}
                    </p>
                    <a href={s.phoneHref} className="mt-1 block font-mono tabular hover:text-brand">
                      Tel. {s.phone}
                    </a>
                  </address>
                  <div>
                    <p className="font-mono text-xs uppercase tracking-[0.2em] text-muted-foreground">Öffnungszeiten</p>
                    <dl className="mt-2 grid w-fit grid-cols-[auto_auto] gap-x-4 font-mono tabular">
                      {summarize(s.hours).map((r) => (
                        <div key={r.days} className="contents">
                          <dt>{r.days}</dt>
                          <dd>{r.time}</dd>
                        </div>
                      ))}
                    </dl>
                    <OpenStatus hours={s.hours} className="mt-3" />
                  </div>
                </div>
                <div className="mt-8 flex flex-wrap gap-3">
                  <Button asChild variant="brand">
                    <Link href={`/stores/${s.slug}`}>Store {s.city} ansehen</Link>
                  </Button>
                  <Button asChild variant="outline">
                    <a href={mapsUrl(s)} target="_blank" rel="noreferrer">
                      Route planen
                    </a>
                  </Button>
                </div>
              </div>
            </article>
          ))}
        </div>
      </SiteSection>
    </>
  );
}
