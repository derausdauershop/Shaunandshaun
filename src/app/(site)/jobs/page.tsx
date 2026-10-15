import type { Metadata } from "next";
import Image from "next/image";
import { PageHero } from "@/components/site/page-hero";
import { SiteSection } from "@/components/site/section";
import { Button } from "@/components/ui/button";
import { COMPANY } from "@/content/site";

export const metadata: Metadata = {
  title: "Jobs",
  description: "Arbeiten bei AUSDAUER in Betzdorf und Siegen: Fachberatung Running und Outdoor im Familienunternehmen. Initiativbewerbung willkommen.",
};

/** Open positions – add entries here when there are vacancies. */
const OPENINGS: Array<{ title: string; store: string; type: string; text: string }> = [];

export default function JobsPage() {
  const mail = `mailto:${COMPANY.email}?subject=${encodeURIComponent("Bewerbung bei AUSDAUER")}`;
  return (
    <>
      <PageHero
        kicker="Jobs"
        title={
          <>
            Lauf <span className="italic text-brand">mit uns.</span>
          </>
        }
        intro="Wir sind ein Familienunternehmen mit einem Team, das selbst läuft, wandert und testet. Wenn du Menschen gerne berätst und Sport liebst, passt du zu uns."
        image="/images/team.webp"
        imageAlt="Das AUSDAUER-Team"
      />
      <SiteSection km={1} kicker="Offene Stellen" title="Aktuelle Stellen">
        {OPENINGS.length ? (
          <ul className="grid gap-4 md:grid-cols-2">
            {OPENINGS.map((o) => (
              <li key={o.title} className="rounded-sm bg-white p-6 ring-1 ring-border">
                <p className="font-mono text-xs uppercase tracking-[0.2em] text-brand">
                  {o.store} · {o.type}
                </p>
                <h2 className="mt-2 text-3xl">{o.title}</h2>
                <p className="mt-2 text-muted-foreground">{o.text}</p>
              </li>
            ))}
          </ul>
        ) : (
          <div className="grid gap-8 rounded-sm bg-white p-8 ring-1 ring-border lg:grid-cols-[1.4fr_1fr] lg:items-center">
            <div>
              <p className="font-display text-3xl font-black uppercase italic">Gerade keine offenen Stellen.</p>
              <p className="mt-3 max-w-xl text-lg text-muted-foreground">
                Wir freuen uns trotzdem über deine Initiativbewerbung – für Fachberatung, Aushilfe oder Ausbildung, in Betzdorf oder Siegen. Schick uns ein
                paar Zeilen über dich und deinen Sport.
              </p>
              <Button asChild variant="brand" size="lg" className="mt-6">
                <a href={mail}>Initiativ bewerben</a>
              </Button>
              <p className="mt-3 font-mono text-sm">{COMPANY.email}</p>
            </div>
            <div className="relative aspect-square overflow-hidden rounded-sm">
              <Image src="/images/siegen-lounge.webp" alt="Store Siegen" fill sizes="(min-width: 1024px) 30vw, 100vw" className="object-cover" />
            </div>
          </div>
        )}
      </SiteSection>
    </>
  );
}
