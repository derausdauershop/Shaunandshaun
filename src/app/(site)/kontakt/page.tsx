import type { Metadata } from "next";
import { OpenStatus } from "@/components/site/open-status";
import { PageHero } from "@/components/site/page-hero";
import { SiteSection } from "@/components/site/section";
import { Button } from "@/components/ui/button";
import { COMPANY } from "@/content/site";
import { STORES, mapsUrl } from "@/content/stores";
import { summarize } from "@/lib/opening-hours";

export const metadata: Metadata = {
  title: "Kontakt",
  description: "So erreichst du AUSDAUER: Telefon, WhatsApp und E-Mail für die Stores in Betzdorf und Siegen.",
};

export default function ContactPage() {
  return (
    <>
      <PageHero
        kicker="Kontakt"
        title={
          <>
            Frag uns <span className="italic text-brand">einfach.</span>
          </>
        }
        intro="Am schnellsten erreichst du uns im Store, per Telefon oder WhatsApp. Für alles andere: info@ausdauer-shop.de."
      >
        <div className="flex flex-wrap gap-3">
          <Button asChild variant="brand" size="lg">
            <a href={COMPANY.whatsapp} target="_blank" rel="noreferrer">
              WhatsApp schreiben
            </a>
          </Button>
          <Button asChild variant="outline" size="lg" className="border-paper/30 bg-transparent text-paper hover:bg-paper hover:text-ink">
            <a href={`mailto:${COMPANY.email}`}>E-Mail schreiben</a>
          </Button>
        </div>
        <p className="mt-4 font-mono text-sm text-muted-foreground">{COMPANY.email}</p>
      </PageHero>
      <SiteSection>
        <div className="grid gap-6 md:grid-cols-2">
          {STORES.map((s) => (
            <section key={s.slug} className="rounded-sm bg-white p-6 ring-1 ring-border sm:p-8">
              <h2 className="text-4xl italic">{s.city}</h2>
              <p className="text-sm text-muted-foreground">{s.name}</p>
              <address className="mt-4 not-italic">
                {s.street}, {s.zip} {s.city}
              </address>
              <a href={s.phoneHref} className="mt-2 block font-display text-3xl font-black tabular hover:text-brand">
                {s.phone}
              </a>
              <dl className="mt-4 grid w-fit grid-cols-[auto_auto] gap-x-4 font-mono tabular">
                {summarize(s.hours).map((r) => (
                  <div key={r.days} className="contents">
                    <dt>{r.days}</dt>
                    <dd>{r.time}</dd>
                  </div>
                ))}
              </dl>
              <OpenStatus hours={s.hours} className="mt-3" />
              <Button asChild variant="outline" className="mt-6">
                <a href={mapsUrl(s)} target="_blank" rel="noreferrer">
                  Route planen
                </a>
              </Button>
            </section>
          ))}
        </div>
        <div className="mt-10 grid gap-4 md:grid-cols-2">
          <div className="rounded-sm border-l-4 border-brand bg-white p-6">
            <h2 className="text-2xl">Vereine & Firmen</h2>
            <p className="mt-2 text-muted-foreground">
              Vereinsbekleidung, Trainingsanzüge, Textildruck und Beflockung: Schreib uns, was ihr braucht – wir melden uns mit einem Angebot.
            </p>
          </div>
          <div className="rounded-sm border-l-4 border-brand bg-white p-6">
            <h2 className="text-2xl">AUSDAUER CUP</h2>
            <p className="mt-2 text-muted-foreground">
              Fragen zu Wertung, Anmeldung oder Abschlussfeier: {COMPANY.email} oder Tel. {COMPANY.phone}.
            </p>
          </div>
        </div>
      </SiteSection>
    </>
  );
}
