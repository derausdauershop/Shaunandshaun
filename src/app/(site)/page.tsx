import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { CupLogo, SeriesTrack } from "@/components/brand/cup-logo";
import { DataOverlay } from "@/components/brand/data-overlay";
import { KmMarker } from "@/components/brand/km-marker";
import { PaceLines } from "@/components/brand/pace-lines";
import { PartnerLogo } from "@/components/brand/partner-logo";
import { RunAcademyLogo } from "@/components/brand/run-academy-logo";
import { StartNumber } from "@/components/brand/start-number";
import { TopoLines } from "@/components/brand/topo-lines";
import { OpenStatus } from "@/components/site/open-status";
import { SiteSection } from "@/components/site/section";
import { StoreJsonLd } from "@/components/site/store-jsonld";
import { Button } from "@/components/ui/button";
import { ARTICLES } from "@/content/articles";
import { CUP, CUP_RACES } from "@/content/cup";
import { formatDate, upcoming } from "@/lib/dates";
import { AppStoreButtons } from "@/components/site/app-teaser";
import { ANALYSIS_STEPS, REVIEWS } from "@/content/services";
import { COMMUNITY_APP, COMPANY } from "@/content/site";
import { STORES } from "@/content/stores";

// Re-render daily so "next race" stays current.
export const revalidate = 86400;

export default function HomePage() {
  const now = new Date();
  const racesAhead = upcoming(CUP_RACES, now);
  const nextRace = racesAhead[0];
  const racesDone = CUP_RACES.filter((r) => !racesAhead.includes(r)).map((r) => r.no);
  const articles = ARTICLES.filter((a) => a.category !== "News").slice(0, 3);
  const jubilee = now.getFullYear() === COMPANY.founded + 40;

  return (
    <>
      <StoreJsonLd stores={STORES} />

      {/* Hero */}
      <section className="surface-ink relative overflow-hidden">
        <Image src="/images/betzdorf-laufbahn.webp" alt="" fill priority sizes="100vw" className="object-cover opacity-35" />
        <div className="absolute inset-0 bg-gradient-to-r from-ink via-ink/85 to-ink/30" />
        <TopoLines className="absolute inset-0 h-full w-full text-stone opacity-20" />
        <div className="relative mx-auto max-w-7xl px-4 pb-16 pt-14 sm:px-8 lg:pb-28 lg:pt-24">
          <KmMarker km="00" label={`Seit ${COMPANY.founded} · Betzdorf & Siegen`} />
          <h1 className="mt-6 max-w-4xl text-balance text-6xl sm:text-8xl lg:text-[8.5rem]">
            Dein nächster <span className="italic text-brand">Kilometer.</span>
          </h1>
          <p className="mt-6 max-w-xl text-lg text-muted-foreground sm:text-xl">
            Laufschuhberatung mit Video- und Fußanalyse, ein Team, das selbst läuft, und eine Community, die mitzieht. Wir leben Sport – seit{" "}
            {COMPANY.founded}.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Button asChild variant="brand" size="lg">
              <Link href="/laufanalyse">Zur Laufanalyse</Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="border-paper/30 bg-transparent text-paper hover:bg-paper hover:text-ink">
              <Link href="/stores">Stores & Öffnungszeiten</Link>
            </Button>
          </div>
          <ul className="mt-10 flex flex-wrap gap-x-8 gap-y-2">
            {STORES.map((s) => (
              <li key={s.slug} className="flex items-center gap-3">
                <span className="font-display text-lg font-bold uppercase">{s.city}</span>
                <OpenStatus hours={s.hours} tone="dark" />
              </li>
            ))}
          </ul>
        </div>
      </section>

      {jubilee && (
        <Link href="/magazin/40-jahre-ausdauer" className="group block bg-brand text-brand-foreground">
          <div className="mx-auto flex max-w-7xl items-center gap-4 px-4 py-4 sm:px-8">
            <span className="font-display text-3xl font-black italic tabular">40</span>
            <span className="font-display text-lg font-bold uppercase leading-tight">
              Jahre AUSDAUER · Eine Vision. Zwei Menschen. 40 Jahre Ausdauer.
            </span>
            <ArrowRight className="ml-auto size-5 shrink-0 transition-transform group-hover:translate-x-1" />
          </div>
        </Link>
      )}

      {/* Laufanalyse */}
      <SiteSection
        km={1}
        kicker="Laufanalyse"
        title="Erst laufen. Dann kaufen."
        intro="Den richtigen Schuh findest du nicht im Regal, sondern auf der Laufbahn. Wir nehmen uns Zeit – mit 3D-Fußvermessung, Videoanalyse und Probelauf vor der Tür."
      >
        <div className="grid gap-10 lg:grid-cols-[1fr_1.1fr] lg:items-center">
          <div className="relative aspect-square overflow-hidden rounded-sm">
            <Image src="/images/betzdorf-fussanalyse.webp" alt="FootBalance 3D-Fußvermessung im Store Betzdorf" fill sizes="(min-width: 1024px) 45vw, 100vw" className="object-cover" />
            <DataOverlay
              className="absolute bottom-4 left-4 bg-ink/80 text-paper backdrop-blur"
              data={[
                { label: "Fuß", value: "3D-Scan" },
                { label: "Bewegung", value: "Video" },
              ]}
            />
          </div>
          <div>
            <ol className="divide-y divide-ink/10 border-y border-ink/10">
              {ANALYSIS_STEPS.map((s, i) => (
                <li key={s.title} className="grid grid-cols-[3.5rem_1fr] gap-4 py-5">
                  <span className="font-display text-4xl font-black italic text-brand tabular">{String(i + 1).padStart(2, "0")}</span>
                  <div>
                    <h3 className="text-2xl">{s.title}</h3>
                    <p className="mt-1 text-muted-foreground">{s.text}</p>
                  </div>
                </li>
              ))}
            </ol>
            <Button asChild variant="link" className="mt-4 px-0 font-display text-lg font-bold uppercase">
              <Link href="/laufanalyse">
                Alles zur Beratung & unserem Service <ArrowRight />
              </Link>
            </Button>
          </div>
        </div>
      </SiteSection>

      {/* Stores */}
      <SiteSection km={2} kicker="Stores" title="Zwei Stores. Ein Team." tone="white">
        <div className="grid gap-6 md:grid-cols-2">
          {STORES.map((s) => (
            <Link key={s.slug} href={`/stores/${s.slug}`} className="group block overflow-hidden rounded-sm bg-paper ring-1 ring-border">
              <div className="relative aspect-[4/3] overflow-hidden">
                <Image src={s.image} alt={`Store ${s.city}`} fill sizes="(min-width: 768px) 50vw, 100vw" className="object-cover transition-transform duration-500 group-hover:scale-[1.03]" />
              </div>
              <div className="p-6">
                <div className="flex min-h-16 flex-wrap items-center justify-between gap-4">
                  <p className="font-display text-4xl font-black uppercase italic">{s.city}</p>
                  {s.partner && <PartnerLogo showSender={false} className="[&>div]:p-0 [&_img]:h-12" />}
                </div>
                <p className="mt-2 text-muted-foreground">
                  {s.street} · {s.size}
                </p>
                <p className="mt-3">{s.focus.slice(0, 4).join(" · ")}</p>
                <div className="mt-5 flex flex-wrap items-center justify-between gap-3">
                  <OpenStatus hours={s.hours} />
                  <span className="inline-flex items-center gap-1 font-display font-bold uppercase text-brand">
                    Zum Store <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </SiteSection>

      {/* Run Academy */}
      <section className="surface-ink relative overflow-hidden px-4 py-16 sm:px-8 lg:py-24">
        <TopoLines className="absolute inset-0 h-full w-full text-signal opacity-15" />
        <div className="relative mx-auto grid max-w-7xl gap-10 lg:grid-cols-[1.3fr_1fr] lg:items-center">
          <div>
            <KmMarker km={3} label="Run Academy" accent="signal" />
            <RunAcademyLogo surface="dark" className="mt-8" />
            <h2 className="mt-8 text-balance text-5xl sm:text-7xl">
              Von 0 auf <span className="italic text-signal">5 km.</span>
            </h2>
            <p className="mt-5 max-w-xl text-lg text-muted-foreground">
              Unser Einsteiger-Laufkurs: einmal pro Woche betreutes Training in der Gruppe, Trainingsplan für zu Hause, Kräftigung und Technik.
              Für alle, die (wieder) anfangen wollen.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button asChild variant="signal" size="lg">
                <Link href="/run-academy/einsteiger-laufkurs">Zum Einsteiger-Laufkurs</Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="border-paper/30 bg-transparent text-paper hover:bg-paper hover:text-ink">
                <Link href="/run-academy">Alle Kurse</Link>
              </Button>
            </div>
          </div>
          <div className="flex justify-center">
            <StartNumber number="Frühjahr" label="Kursstart" sublabel="Einsteigerkurs" variant="signal" className="rotate-3 scale-110" />
          </div>
        </div>
      </section>

      {/* AUSDAUER CUP */}
      <SiteSection km={4} kicker="AUSDAUER CUP" title={`Acht Läufe. Ein Finale. Seit ${CUP.since}.`}>
        <div className="grid gap-10 lg:grid-cols-[1fr_1fr] lg:items-center">
          <div className="min-w-0">
            <CupLogo className="h-auto w-full max-w-md" />
            <p className="mt-6 max-w-xl text-lg text-muted-foreground">
              Die Laufserie in Siegerland und Südsauerland: Vereine richten die Läufe aus, wir stellen den Cup drumherum – mit Wertung, Preisen und
              großer Abschlussfeier.
            </p>
            <div className="mt-6 max-w-lg">
              <p className="mb-2 font-mono text-xs uppercase tracking-[0.2em] text-muted-foreground">
                Saison {CUP.season} · {racesDone.length} von {CUP_RACES.length} Läufen gelaufen
              </p>
              <SeriesTrack total={CUP_RACES.length} done={racesDone} final />
            </div>
          </div>
          <div className="rounded-sm bg-white p-6 ring-1 ring-border sm:p-8">
            {nextRace ? (
              <>
                <p className="font-mono text-xs uppercase tracking-[0.2em] text-brand">Nächster Termin</p>
                <p className="mt-3 font-display text-4xl font-black uppercase italic leading-none">
                  {nextRace.name} {nextRace.place}
                </p>
                <p className="mt-2 font-mono tabular">{formatDate(nextRace.date)}</p>
                <Button asChild variant="brand" className="mt-6">
                  <Link href={`/ausdauer-cup/${nextRace.slug}`}>Infos & Anmeldung</Link>
                </Button>
              </>
            ) : (
              <>
                <p className="font-mono text-xs uppercase tracking-[0.2em] text-brand">Saison {CUP.nextSeason}</p>
                <p className="mt-3 font-display text-4xl font-black uppercase italic leading-none">Die Termine folgen.</p>
                <p className="mt-2 text-muted-foreground">Der {CUP.edition + 1}. AUSDAUER CUP startet im Januar.</p>
                <Button asChild variant="brand" className="mt-6">
                  <Link href="/ausdauer-cup">Zum AUSDAUER CUP</Link>
                </Button>
              </>
            )}
          </div>
        </div>
      </SiteSection>

      {/* Community */}
      <section className="grid bg-partner/10 lg:grid-cols-2">
        <div className="relative min-h-80">
          <Image src="/images/crown-town-runners.webp" alt="Crown Town Runners beim Lauftreff in Siegen" fill sizes="(min-width: 1024px) 50vw, 100vw" className="object-cover" />
        </div>
        <div className="px-4 py-16 sm:px-8 lg:px-16 lg:py-24">
          <KmMarker km={5} label="Community" accent="partner" />
          <h2 className="mt-6 text-balance text-5xl sm:text-6xl">
            Donnerstag. 18:30. <span className="italic text-partner">Lauf mit.</span>
          </h2>
          <p className="mt-5 max-w-lg text-lg text-muted-foreground">
            Die Crown Town Runners treffen sich jede Woche am Store in Siegen: 5–7 km in der Gruppe, dazu Übungen für Rumpf und Oberkörper. Ohne
            Anmeldung, für jedes Tempo.
          </p>
          <p className="mt-5 max-w-lg text-muted-foreground">Alle Termine und Events findest du in der {COMMUNITY_APP.name} App.</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Button asChild variant="default" size="lg">
              <Link href="/community">Zur Community</Link>
            </Button>
            <AppStoreButtons />
          </div>
        </div>
      </section>

      {/* Reviews */}
      <SiteSection km={6} kicker="Stimmen" title="Rein kommen, wohlfühlen.">
        <ul className="grid gap-4 md:grid-cols-3">
          {REVIEWS.slice(0, 3).map((r) => (
            <li key={r.name} className="flex flex-col rounded-sm bg-white p-6 ring-1 ring-border">
              <PaceLines className="w-12 text-brand" count={3} />
              <blockquote className="mt-4 flex-1 text-lg">„{r.text}“</blockquote>
              <p className="mt-4 font-mono text-xs uppercase tracking-[0.2em] text-muted-foreground">{r.name}</p>
            </li>
          ))}
        </ul>
      </SiteSection>

      {/* Magazin */}
      <SiteSection km={7} kicker="Magazin" title="Wissen für deinen Lauf." tone="white">
        <ul className="grid gap-6 md:grid-cols-3">
          {articles.map((a) => (
            <li key={a.slug}>
              <Link href={`/magazin/${a.slug}`} className="group block h-full border-t-4 border-ink pt-5">
                <p className="font-mono text-xs uppercase tracking-[0.2em] text-brand">{a.category}</p>
                <h3 className="mt-3 text-3xl group-hover:text-brand">{a.title}</h3>
                <p className="mt-2 text-muted-foreground">{a.teaser}</p>
              </Link>
            </li>
          ))}
        </ul>
        <Button asChild variant="link" className="mt-8 px-0 font-display text-lg font-bold uppercase">
          <Link href="/magazin">
            Alle Artikel <ArrowRight />
          </Link>
        </Button>
      </SiteSection>

      {/* Gutschein */}
      <section className="relative overflow-hidden bg-brand px-4 py-14 text-brand-foreground sm:px-8">
        <PaceLines className="absolute -right-10 top-1/2 hidden w-96 -translate-y-1/2 text-white/15 md:block" count={6} />
        <div className="relative mx-auto flex max-w-7xl flex-col gap-6 md:flex-row md:items-center md:justify-between">
          <div>
            <h2 className="text-5xl sm:text-6xl">Verschenk Kilometer.</h2>
            <p className="mt-3 max-w-lg text-lg text-white/85">Geschenk-Gutscheine ab 10 € – online gekauft, sofort per E-Mail verschickt, in beiden Stores einlösbar.</p>
          </div>
          <Button asChild size="lg" className="bg-white text-ink hover:bg-paper">
            <a href={COMPANY.voucher} target="_blank" rel="noreferrer">
              Gutschein kaufen
            </a>
          </Button>
        </div>
      </section>
    </>
  );
}
