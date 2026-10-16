import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { CrownTownLogo } from "@/components/brand/crown-town-logo";
import { PartnerLogo } from "@/components/brand/partner-logo";
import { OpenStatus } from "@/components/site/open-status";
import { PageHero } from "@/components/site/page-hero";
import { SiteSection } from "@/components/site/section";
import { StoreJsonLd } from "@/components/site/store-jsonld";
import { Button } from "@/components/ui/button";
import { ANALYSIS_STEPS } from "@/content/services";
import { STORES, mapsUrl, storeBySlug } from "@/content/stores";
import { TeamCard } from "@/components/site/team-card";
import { teamFor } from "@/content/team";
import { summarize } from "@/lib/opening-hours";

export function generateStaticParams() {
  return STORES.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const s = storeBySlug((await params).slug);
  if (!s) return {};
  return { title: `Store ${s.city}`, description: `${s.name}: ${s.street}, ${s.zip} ${s.city}. ${s.intro}` };
}

export default async function StorePage({ params }: { params: Promise<{ slug: string }> }) {
  const s = storeBySlug((await params).slug);
  if (!s) notFound();
  const team = teamFor(s.slug);

  return (
    <>
      <StoreJsonLd stores={[s]} />
      <PageHero
        kicker={`Store · seit ${s.since}`}
        title={<span className="italic">{s.city}</span>}
        intro={s.intro}
        image={s.image}
        imageAlt={`Store ${s.city}`}
        accent={s.partner ? "partner" : "brand"}
      >
        {s.partner && (
          <div className="flex flex-wrap items-center gap-4">
            <PartnerLogo />
          </div>
        )}
      </PageHero>

      <SiteSection>
        <div className="grid gap-10 lg:grid-cols-[1fr_1.4fr]">
          <div className="space-y-6">
            <address className="not-italic">
              <p className="font-mono text-xs uppercase tracking-[0.2em] text-muted-foreground">Adresse</p>
              <p className="mt-2 text-xl">
                {s.street}
                <br />
                {s.zip} {s.city}
              </p>
              <a href={s.phoneHref} className="mt-2 block font-mono text-lg tabular hover:text-brand">
                Tel. {s.phone}
              </a>
            </address>
            <div>
              <p className="font-mono text-xs uppercase tracking-[0.2em] text-muted-foreground">Öffnungszeiten</p>
              <dl className="mt-2 grid w-fit grid-cols-[auto_auto] gap-x-6 font-mono text-lg tabular">
                {summarize(s.hours).map((r) => (
                  <div key={r.days} className="contents">
                    <dt>{r.days}</dt>
                    <dd>{r.time}</dd>
                  </div>
                ))}
              </dl>
              <OpenStatus hours={s.hours} className="mt-3" />
            </div>
            <div className="flex flex-wrap gap-3">
              <Button asChild variant="brand">
                <a href={mapsUrl(s)} target="_blank" rel="noreferrer">
                  Route planen
                </a>
              </Button>
              <Button asChild variant="outline">
                <a href={s.phoneHref}>Anrufen</a>
              </Button>
            </div>
            <div>
              <p className="font-mono text-xs uppercase tracking-[0.2em] text-muted-foreground">Schwerpunkte · {s.size}</p>
              <ul className="mt-3 flex flex-wrap gap-2">
                {s.focus.map((f) => (
                  <li key={f} className="rounded-sm bg-white px-3 py-1 font-display font-bold uppercase ring-1 ring-border">
                    {f}
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div className="grid grid-cols-6 gap-3">
            {s.gallery.map((src, i) => (
              <div key={src} className={i === 0 ? "relative col-span-6 aspect-[16/9]" : "relative col-span-2 aspect-square"}>
                <Image src={src} alt={`Store ${s.city} – Eindruck ${i + 1}`} fill sizes="(min-width: 1024px) 30vw, 50vw" className="rounded-sm object-cover" />
              </div>
            ))}
          </div>
        </div>
      </SiteSection>

      <SiteSection km={1} kicker="Laufanalyse" title="So finden wir deinen Schuh." tone="white">
        <ol className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
          {ANALYSIS_STEPS.map((step, i) => (
            <li key={step.title} className="border-t-4 border-ink pt-4">
              <span className="font-display text-3xl font-black italic text-brand tabular">{String(i + 1).padStart(2, "0")}</span>
              <h3 className="mt-2 text-xl">{step.title}</h3>
              <p className="mt-1 text-sm text-muted-foreground">{step.text}</p>
            </li>
          ))}
        </ol>
      </SiteSection>

      {s.slug === "siegen" && (
        <SiteSection km={2} kicker="Community" title="Crown Town Runners" accent="partner">
          <div className="flex flex-col gap-6 rounded-sm bg-white p-6 ring-1 ring-border sm:flex-row sm:items-center sm:justify-between">
            <CrownTownLogo className="h-14" />
            <p className="max-w-md text-muted-foreground">Jeden Donnerstag um 18:30 Uhr ab dem Store: 5–7 km in der Gruppe plus Übungen für Rumpf und Oberkörper.</p>
            <Button asChild>
              <Link href="/community">Mehr erfahren</Link>
            </Button>
          </div>
        </SiteSection>
      )}

      <SiteSection km={s.slug === "siegen" ? 3 : 2} kicker="Team" title={`Dein Team in ${s.city}`} tone="ink">
        <ul className="grid gap-px overflow-hidden rounded-sm bg-paper/10 sm:grid-cols-2 lg:grid-cols-4">
          {team.map((m) => (
            <TeamCard key={m.name} member={m} />
          ))}
        </ul>
      </SiteSection>
    </>
  );
}
