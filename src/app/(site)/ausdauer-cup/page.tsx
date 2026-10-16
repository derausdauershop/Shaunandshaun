import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { CupLogo, SeriesTrack } from "@/components/brand/cup-logo";
import { PageHero } from "@/components/site/page-hero";
import { SiteSection } from "@/components/site/section";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CUP, CUP_FINAL, CUP_RACES, CUP_RULES } from "@/content/cup";
import { berlinDate, formatDate } from "@/lib/dates";

export const revalidate = 86400;

export const metadata: Metadata = {
  title: "AUSDAUER CUP",
  description: "Die Laufserie seit 1989: acht Läufe in Siegerland und Südsauerland, Cup-Wertung, Preise und Abschlussfeier. Termine, Modus und Anmeldung.",
};

export default function CupPage() {
  const today = berlinDate(new Date());
  const done = CUP_RACES.filter((r) => r.date < today).map((r) => r.no);

  return (
    <>
      <PageHero
        kicker={`${CUP.edition}. AUSDAUER CUP · Saison ${CUP.season}`}
        title={
          <>
            Acht Läufe. <span className="italic text-brand">Ein Finale.</span>
          </>
        }
        intro={`Seit ${CUP.since} verbindet der AUSDAUER CUP die Laufveranstaltungen der Vereine in Siegerland und Südsauerland. Wer mindestens fünf Läufe finisht, kommt in die Wertung.`}
      >
        <CupLogo color="negativ" className="h-auto w-full max-w-md" />
      </PageHero>

      <SiteSection km={1} kicker="Termine" title={`Saison ${CUP.season}`}>
        <div className="mb-8 max-w-2xl">
          <p className="mb-2 font-mono text-xs uppercase tracking-[0.2em] text-muted-foreground">
            {done.length} von {CUP_RACES.length} Läufen gelaufen
          </p>
          <SeriesTrack total={CUP_RACES.length} done={done} final />
        </div>
        <ol className="divide-y divide-ink/10 border-y border-ink/10">
          {CUP_RACES.map((r) => {
            const past = r.date < today;
            return (
              <li key={r.slug}>
                <Link href={`/ausdauer-cup/${r.slug}`} className="group grid grid-cols-[3rem_1fr_auto] items-center gap-4 py-4 sm:grid-cols-[3rem_9rem_1fr_auto]">
                  <span className="font-display text-3xl font-black italic text-brand tabular">{String(r.no).padStart(2, "0")}</span>
                  <span className="hidden font-mono tabular sm:block">{formatDate(r.date)}</span>
                  <span className="min-w-0">
                    <span className="block font-display text-2xl font-bold uppercase leading-tight group-hover:text-brand">{r.name}</span>
                    <span className="block text-sm text-muted-foreground">
                      {r.place}
                      <span className="sm:hidden"> · {formatDate(r.date)}</span>
                    </span>
                  </span>
                  <span className="flex items-center gap-3">
                    {past ? <Badge variant="secondary">Gelaufen</Badge> : r.provisional ? <Badge variant="outline">Termin unter Vorbehalt</Badge> : null}
                    <ArrowRight className="size-5 text-muted-foreground transition-transform group-hover:translate-x-1" />
                  </span>
                </Link>
              </li>
            );
          })}
          <li id="abschlussfeier" className="grid scroll-mt-24 grid-cols-[3rem_1fr] gap-4 py-5 sm:grid-cols-[3rem_9rem_1fr]">
            <span aria-hidden className="mt-1 size-6 rounded-full bg-brand" />
            <span className="hidden font-mono tabular sm:block">{formatDate(CUP_FINAL.date)}</span>
            <span>
              <span className="block font-display text-2xl font-bold uppercase text-brand">{CUP_FINAL.name}</span>
              <span className="block text-muted-foreground">
                {CUP_FINAL.venue} · {CUP_FINAL.time}
                {CUP_FINAL.provisional && " · voraussichtlicher Termin"}
              </span>
              <span className="mt-1 block text-sm text-muted-foreground">{CUP_FINAL.text}</span>
            </span>
          </li>
        </ol>
        <p className="mt-6 text-sm text-muted-foreground">
          Saison {CUP.nextSeason}: Die Läufe finden voraussichtlich wieder statt, die Termine folgen.
        </p>
      </SiteSection>

      <SiteSection id="modus" km={2} kicker="Modus" title="So funktioniert die Wertung." tone="white">
        <Accordion type="multiple" defaultValue={CUP_RULES.map((r) => r.title)} className="max-w-3xl">
          {CUP_RULES.map((rule) => (
            <AccordionItem key={rule.title} value={rule.title}>
              <AccordionTrigger className="font-display text-2xl font-bold uppercase hover:no-underline">{rule.title}</AccordionTrigger>
              <AccordionContent>
                <ul className="space-y-2 text-base">
                  {rule.items.map((i) => (
                    <li key={i} className="flex gap-3">
                      <span aria-hidden className="mt-2 size-2 shrink-0 rounded-full bg-brand" />
                      {i}
                    </li>
                  ))}
                </ul>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </SiteSection>

      <SiteSection km={3} kicker="Ergebnisse" title="Zwischenstand, Ergebnisse, Bilder." tone="ink">
        <div className="flex flex-wrap gap-3">
          <Button asChild variant="brand" size="lg">
            <a href={CUP.standingsUrl} target="_blank" rel="noreferrer">
              Zwischenstand {CUP.season} (PDF)
            </a>
          </Button>
          <Button asChild variant="outline" size="lg" className="border-paper/30 bg-transparent text-paper hover:bg-paper hover:text-ink">
            <a href={CUP.resultsUrl} target="_blank" rel="noreferrer">
              Ergebnisse
            </a>
          </Button>
          <Button asChild variant="outline" size="lg" className="border-paper/30 bg-transparent text-paper hover:bg-paper hover:text-ink">
            <a href={CUP.photosUrl} target="_blank" rel="noreferrer">
              Bilder & Berichte
            </a>
          </Button>
        </div>
      </SiteSection>
    </>
  );
}
