import type { Metadata } from "next";
import Link from "next/link";
import { BrandLogo } from "@/components/brand/brand-logo";
import { CupLogo, SeriesTrack } from "@/components/brand/cup-logo";
import { TopoLines } from "@/components/brand/topo-lines";
import { Badge } from "@/components/ui/badge";
import { CUP_EDITION, CUP_FINAL, CUP_RACES, CUP_SEASON, cupLogo, type CupLogoColor, type CupLogoKind } from "@/lib/brand/cup";
import { cn } from "@/lib/utils";
import { Rule, Section } from "../_sections/section";

export const metadata: Metadata = {
  title: "AUSDAUER CUP – Logo",
  description: "Logo-System und Anwendungen für den AUSDAUER CUP, die Laufserie im Siegerland.",
  robots: { index: false, follow: false },
};

const SURFACE: Record<CupLogoColor, string> = {
  farbig: "bg-white ring-1 ring-border",
  negativ: "bg-ink",
  schwarz: "bg-white ring-1 ring-border",
  weiss: "bg-brand",
};

const VARIANTS: Array<{ kind: CupLogoKind; label: string; use: string; h: string }> = [
  { kind: "serie-", label: "Serienlogo", use: "Urkunden, RaceResult, Webseite, Flyer", h: "h-14" },
  { kind: "", label: "Standard", use: "Banner, Startnummern, Medaillenband, Webseite", h: "h-12" },
  { kind: "gestapelt-", label: "Gestapelt", use: "T-Shirt-Rücken, Hochformate, Beachflag", h: "h-32" },
  { kind: "siegel-", label: "Siegel", use: "Mit allen acht Orten im Ring und der Auflage – wie das bisherige Cup-Siegel. Urkunde, Brust-Logo, Medaille", h: "h-32" },
];

const SPONSORS = ["Co-Sponsor A", "Co-Sponsor B", "Co-Sponsor C", "Co-Sponsor D", "Co-Sponsor E"];

function Mock({ label, note, children, className }: { label: string; note?: string; children: React.ReactNode; className?: string }) {
  return (
    <figure className={cn("min-w-0", className)}>
      {children}
      <figcaption className="mt-3 font-mono text-[0.65rem] uppercase tracking-[0.2em] text-muted-foreground">
        {label}
        {note && <span className="block normal-case tracking-normal">{note}</span>}
      </figcaption>
    </figure>
  );
}

function Shirt({ side, children }: { side: "front" | "back"; children: React.ReactNode }) {
  return (
    <div className="relative mx-auto aspect-[10/11] w-full max-w-xs">
      <svg viewBox="0 0 200 220" aria-hidden className="absolute inset-0 h-full w-full drop-shadow-md">
        <path
          d={
            side === "front"
              ? "M60 10 Q100 34 140 10 L196 38 L178 84 L156 74 L156 214 L44 214 L44 74 L22 84 L4 38 Z"
              : "M60 10 Q100 20 140 10 L196 38 L178 84 L156 74 L156 214 L44 214 L44 74 L22 84 L4 38 Z"
          }
          className="fill-ink"
        />
      </svg>
      {children}
    </div>
  );
}

export default function CupPage() {
  return (
    <>
      <header className="surface-ink relative overflow-hidden">
        <TopoLines className="absolute inset-0 h-full w-full text-stone opacity-30" />
        <div className="relative mx-auto max-w-6xl px-4 pb-16 pt-10 sm:px-8 lg:pb-24">
          <Link href="/brand" className="font-mono text-xs uppercase tracking-[0.2em] text-muted-foreground hover:text-foreground">
            ← Brand Guide
          </Link>
          <p className="mt-12 font-mono text-xs uppercase tracking-[0.25em] text-brand">Logo-Entwurf · Laufserie seit 1989</p>
          <CupLogo kind="serie-" color="negativ" className="mt-8 h-auto w-full max-w-xl" />
          <p className="mt-10 max-w-2xl text-lg text-muted-foreground sm:text-xl">
            Acht Läufe, acht Orte, ein Finale – zum {CUP_EDITION}. Mal. Die Vereine richten die Läufe aus, AUSDAUER spannt den Cup
            darum. Ab jetzt mit einem einheitlichen Logo als Untermarke, gebaut wie die Run Academy.
          </p>
        </div>
      </header>

      <main>
        <Section
          id="konzept"
          km={1}
          kicker="Konzept"
          title="Eine Untermarke wie die Run Academy."
          intro="Der AUSDAUER CUP bekommt erstmals ein einheitliches Logo und folgt dabei genau dem Bauplan der Run Academy: das ∞ aus dem AUSDAUER-Logo in der 5° geneigten Plakette, der Name in Barlow Condensed Black Italic, darunter der Claim. Nur die Farbe unterscheidet die beiden: Volt fürs Lernen, Rot für den Wettkampf."
        >
          <div className="grid gap-4 md:grid-cols-2">
            <figure className="flex min-h-48 flex-col items-center justify-center gap-4 rounded-sm bg-white p-8 ring-1 ring-border">
              {/* eslint-disable-next-line @next/next/no-img-element -- static vector logo */}
              <img src="/brand/run-academy/run-academy-farbig.svg" alt="Run Academy" className="h-14 w-auto max-w-full" />
              <figcaption className="font-mono text-[0.65rem] uppercase tracking-[0.2em] text-muted-foreground">Untermarke Lernen · Volt</figcaption>
            </figure>
            <figure className="flex min-h-48 flex-col items-center justify-center gap-4 rounded-sm bg-white p-8 ring-1 ring-border">
              <CupLogo className="h-14 max-w-full" />
              <figcaption className="font-mono text-[0.65rem] uppercase tracking-[0.2em] text-muted-foreground">Untermarke Wettkampf · Rot</figcaption>
            </figure>
          </div>
          <ol className="mt-8 grid gap-6 md:grid-cols-3">
            <li className="border-t-4 border-brand pt-4">
              <p className="font-mono text-xs uppercase tracking-[0.2em] text-muted-foreground">Zeichen</p>
              <p className="mt-2 font-display text-2xl font-extrabold uppercase">∞-Plakette in Rot</p>
              <p className="mt-1 text-muted-foreground">Gleiche Form wie bei der Run Academy. Sie funktioniert allein als Avatar, Stempel oder Medaillen-Prägung.</p>
            </li>
            <li className="border-t-4 border-ink pt-4">
              <p className="font-mono text-xs uppercase tracking-[0.2em] text-muted-foreground">Name & Claim</p>
              <p className="mt-2 font-display text-2xl font-extrabold uppercase">AUSDAUER CUP</p>
              <p className="mt-1 text-muted-foreground">„Seit 1989“ erzählt die Tradition: {CUP_SEASON} läuft der Cup zum {CUP_EDITION}. Mal – von Wehbach bis Wenden.</p>
            </li>
            <li className="border-t-4 border-stone pt-4">
              <p className="font-mono text-xs uppercase tracking-[0.2em] text-muted-foreground">Nur beim Cup</p>
              <p className="mt-2 font-display text-2xl font-extrabold uppercase">Serienleiste</p>
              <p className="mt-1 text-muted-foreground">
                Acht Punkte für die acht Läufe, der rote Punkt am Ende ist die Abschlussfeier mit der Gesamtwertung. Wird pro Saison neu
                erzeugt, falls ein Lauf dazukommt oder wegfällt.
              </p>
            </li>
          </ol>
          <div className="mt-10 overflow-x-auto rounded-sm bg-white p-6 ring-1 ring-border sm:p-10">
            <CupLogo kind="serie-" className="h-auto w-full min-w-[480px] max-w-3xl" />
          </div>
        </Section>

        <Section id="system" km={2} kicker="Logo-System" title="Vier Formen. Vier Farbstellungen." dark>
          <div className="grid gap-4 md:grid-cols-2">
            {VARIANTS.map((v) => (
              <figure key={v.label} className="overflow-hidden rounded-sm bg-card ring-1 ring-border">
                <div className="grid grid-cols-2">
                  {(["farbig", "negativ", "schwarz", "weiss"] as CupLogoColor[]).map((c) => (
                    <div key={c} className={cn("flex min-h-36 items-center justify-center p-5", SURFACE[c])}>
                      <CupLogo kind={v.kind} color={c} className={cn("max-w-full", v.h)} />
                    </div>
                  ))}
                </div>
                <figcaption className="p-5">
                  <p className="font-display text-xl font-extrabold uppercase">{v.label}</p>
                  <p className="text-sm text-muted-foreground">{v.use}</p>
                </figcaption>
              </figure>
            ))}
          </div>
          <div className="mt-10 grid gap-8 lg:grid-cols-2">
            <div className="flex flex-wrap items-center gap-6">
              {/* eslint-disable-next-line @next/next/no-img-element -- static vector icon */}
              <img src="/brand/cup/ausdauer-cup-icon.svg" alt="AUSDAUER CUP Icon" className="h-20 w-auto" />
              {/* eslint-disable-next-line @next/next/no-img-element -- static vector icon */}
              <img src="/brand/cup/ausdauer-cup-icon-negativ.svg" alt="AUSDAUER CUP Icon auf Ink" className="h-12 w-auto" />
              <p className="max-w-xs text-sm text-muted-foreground">Icon für Social-Avatar, App-Icon in RaceResult, Favicon und Stempel.</p>
            </div>
            <ul className="space-y-3">
              <Rule kind="do">Farbig auf Weiß, negativ auf Ink, Weiß auf Rot. Schwarz für Fax, Stempel und Einfarbdruck.</Rule>
              <Rule kind="do">Mindestgrößen: Serienlogo 60 mm, Standard 35 mm, Siegel 35 mm (darunter die Variante „siegel-claim“ ohne Ortsnamen), Plakette 8 mm.</Rule>
              <Rule kind="dont">Rote Plakette auf Rot, Logo auf unruhigen Fotos, Cup in Volt oder Academy in Rot.</Rule>
            </ul>
          </div>
          <p className="mt-8 font-mono text-xs text-muted-foreground">
            Alle Dateien als SVG mit Schrift in Pfaden: public/brand/cup/ · Neue Saison: npm run brand:subbrands -- 2028 8 40
          </p>
        </Section>

        <Section
          id="urkunde"
          km={3}
          kicker="Urkunde"
          title="Mit Co-Sponsoren, ohne Gedränge."
          intro="Der Cup führt oben, das Siegel bestätigt unten rechts. Co-Sponsoren bekommen eine eigene Leiste mit gleich großen Feldern. So bleibt jeder Partner gleich sichtbar und das Cup-Logo bleibt der Absender."
        >
          <div className="grid items-start gap-10 lg:grid-cols-[1.1fr_1fr]">
            <Mock label="Urkunde A4 · Gesamtwertung" note="Name, Platz und Läufe kommen aus RaceResult">
              <div className="relative mx-auto flex aspect-[210/297] w-full max-w-lg flex-col overflow-hidden bg-white p-[7%] text-ink shadow-xl ring-1 ring-border">
                <TopoLines className="absolute inset-x-0 top-0 h-1/3 w-full text-stone opacity-20" />
                <CupLogo kind="serie-" className="relative h-auto w-[78%]" />
                <div className="relative mt-[12%]">
                  <p className="font-mono text-[0.6rem] uppercase tracking-[0.25em] text-stone-dark">Urkunde · Gesamtwertung {CUP_SEASON}</p>
                  <p className="mt-2 font-display text-[clamp(1.6rem,6vw,3rem)] font-black uppercase italic leading-[0.9]">Max Mustermann</p>
                  <p className="mt-1 text-sm text-stone-dark">LG Beispielverein · Altersklasse M40</p>
                </div>
                <div className="relative mt-[8%] flex items-end gap-4">
                  <p className="font-display text-[clamp(3rem,12vw,6rem)] font-black italic leading-[0.8] text-brand tabular">3.</p>
                  <p className="pb-1 font-display text-lg font-bold uppercase leading-tight">
                    Platz
                    <br />
                    Gesamtwertung
                  </p>
                </div>
                <div className="relative mt-[8%]">
                  <p className="mb-2 font-mono text-[0.55rem] uppercase tracking-[0.2em] text-stone-dark">6 von 8 Läufen in der Wertung</p>
                  <SeriesTrack total={8} done={[1, 2, 4, 5, 7, 8]} final />
                </div>
                <div className="relative mt-auto flex items-end justify-between gap-4 pt-6">
                  <div className="w-1/2 border-t border-ink pt-1 font-mono text-[0.5rem] uppercase tracking-[0.15em] text-stone-dark">
                    Unterschrift Cup-Leitung
                  </div>
                  {/* eslint-disable-next-line @next/next/no-img-element -- static vector seal */}
                  <img src={cupLogo("siegel-", "farbig")} alt="" className="-mb-2 w-[28%] -rotate-6" />
                </div>
                <div className="relative mt-4 border-t border-ink/15 pt-3">
                  <p className="mb-2 font-mono text-[0.5rem] uppercase tracking-[0.2em] text-stone-dark">Cup-Partner</p>
                  <div className="grid grid-cols-5 gap-2">
                    {SPONSORS.map((s) => (
                      <div key={s} className="flex aspect-[2/1] items-center justify-center border border-dashed border-ink/25 text-center font-mono text-[0.45rem] uppercase text-stone">
                        {s}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </Mock>
            <div>
              <h3 className="text-3xl">Regeln für Co-Sponsoren</h3>
              <ul className="mt-6 space-y-3">
                <Rule kind="do">Sponsoren nur in der Partnerleiste unten, maximal 6, alle in gleich großen Feldern.</Rule>
                <Rule kind="do">Cup-Logo mindestens doppelt so breit wie ein Sponsorenfeld.</Rule>
                <Rule kind="do">Sponsorlogos dürfen farbig bleiben. Wirkt die Leiste zu bunt, alle einheitlich in Schwarz.</Rule>
                <Rule kind="do">Auf Urkunden einzelner Läufe: links das Logo des ausrichtenden Vereins, rechts das Cup-Siegel.</Rule>
                <Rule kind="dont">Sponsorlogos neben oder über dem Cup-Logo, oder größer als die Felder.</Rule>
              </ul>
              <div className="mt-10 rounded-sm bg-white p-5 ring-1 ring-border">
                <p className="font-display text-xl font-extrabold uppercase">Idee: Die Serienleiste zählt mit</p>
                <p className="mt-2 text-muted-foreground">
                  Auf der Gesamturkunde sind die Punkte der gelaufenen Läufe gefüllt. Jede Urkunde zeigt so die eigene Saison. Das lässt
                  sich mit den Ergebnisdaten aus RaceResult erzeugen.
                </p>
              </div>
            </div>
          </div>
        </Section>

        <Section id="raceresult" km={4} kicker="RaceResult & Web" title="Ein Header für alle acht Läufe." dark>
          <Mock label="RaceResult-Header · 1200 × 240 px" note="Format bitte an die Vorgabe eures RaceResult-Layouts anpassen">
            <div className="relative flex aspect-[5/1] w-full items-center justify-between gap-6 overflow-hidden border-b-4 border-brand bg-ink px-[4%] text-paper ring-1 ring-border">
              <TopoLines className="absolute inset-0 h-full w-full text-stone opacity-30" />
              <CupLogo kind="serie-" color="negativ" className="relative h-auto w-[52%]" />
              <div className="relative text-right">
                <p className="font-mono text-[clamp(0.45rem,1.2vw,0.75rem)] uppercase tracking-[0.2em] text-muted-foreground">Lauf 4 von 8 · Deuz</p>
                <p className="font-display text-[clamp(0.9rem,2.6vw,2rem)] font-black uppercase italic leading-none">Pfingst-Lauf</p>
                <p className="font-mono text-[clamp(0.45rem,1.2vw,0.75rem)] uppercase tracking-[0.15em] text-muted-foreground">Deuzer Sparkassen Pfingst-Lauf</p>
              </div>
            </div>
          </Mock>
          <div className="mt-10 grid gap-8 md:grid-cols-2">
            <Mock label="Webseite · Saisonübersicht">
              <div className="rounded-sm bg-paper p-6 text-ink">
                <CupLogo className="h-8" />
                <p className="mt-6 font-display text-3xl font-black uppercase">Saison {CUP_SEASON}</p>
                <SeriesTrack total={8} done={[1, 2, 3]} final className="mt-4" />
                <ul className="mt-6 divide-y divide-ink/10 text-sm">
                  {CUP_RACES.slice(3, 6).map((r) => (
                    <li key={r.no} className="flex items-center justify-between gap-3 py-2">
                      <span className="w-8 font-mono text-xs">{r.month}</span>
                      <span className="flex-1 font-display text-lg font-bold uppercase leading-tight">{r.name}</span>
                      <span className="text-stone-dark">{r.place}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </Mock>
            <Mock label="Instagram 4:5 · Ankündigung">
              <div className="relative mx-auto flex aspect-[4/5] max-w-sm flex-col overflow-hidden bg-brand p-6 text-white">
                <TopoLines className="absolute inset-0 h-full w-full text-white opacity-15" />
                <CupLogo color="weiss" className="relative h-7 self-start" />
                <p className="relative mt-auto font-mono text-xs uppercase tracking-[0.2em]">Lauf 4 von 8 · Deuz · Pfingsten</p>
                <p className="relative mt-2 font-display text-6xl font-black uppercase italic leading-[0.85]">
                  Halbzeit
                  <br />
                  im Cup.
                </p>
                <SeriesTrack total={8} done={[1, 2, 3]} final light className="relative mt-6" />
              </div>
            </Mock>
          </div>
        </Section>

        <Section id="textil" km={5} kicker="T-Shirt" title="Brust klein, Rücken laut.">
          <div className="grid gap-10 md:grid-cols-2">
            <Mock label="Vorne · Siegel auf der Brust, 8 cm">
              <Shirt side="front">
                {/* eslint-disable-next-line @next/next/no-img-element -- static vector seal */}
                <img src={cupLogo("siegel-", "weiss")} alt="" className="absolute left-[56%] top-[26%] w-[18%]" />
              </Shirt>
            </Mock>
            <Mock label="Hinten · gestapelt + alle Läufe der Saison">
              <Shirt side="back">
                <div className="absolute inset-x-[27%] top-[16%] flex flex-col items-center text-paper">
                  {/* eslint-disable-next-line @next/next/no-img-element -- static vector logo */}
                  <img src={cupLogo("gestapelt-", "negativ")} alt="" className="w-full" />
                  <ol className="mt-[8%] w-full space-y-[2px] font-display text-[clamp(0.45rem,1.3vw,0.7rem)] font-bold uppercase leading-tight">
                    {CUP_RACES.map((r) => (
                      <li key={r.no} className="flex justify-between gap-2">
                        <span className="tabular">{String(r.no).padStart(2, "0")}</span>
                        <span className="flex-1 truncate">{r.place}</span>
                      </li>
                    ))}
                    <li className="flex justify-between gap-2 text-brand">
                      <span>∞</span>
                      <span className="flex-1">Finale</span>
                    </li>
                  </ol>
                </div>
              </Shirt>
            </Mock>
          </div>
          <p className="mt-6 text-sm text-muted-foreground">
            Siebdruck: max. zwei Farben (Weiß + Rot). Für Einfarbdruck die weiße Version mit ausgesparter Plakette. Funktioniert auch auf roten
            Finisher-Shirts mit der weißen Version.
          </p>
        </Section>

        <Section id="print" km={6} kicker="Flyer & Banner" title="Vom Flyer bis zum Bauzaun." dark>
          <div className="grid items-start gap-10 lg:grid-cols-[1fr_1.6fr]">
            <Mock label="Flyer A5 · Saisonkalender">
              <div className="mx-auto flex aspect-[148/210] w-full max-w-sm flex-col bg-white p-6 text-ink shadow-xl">
                <CupLogo kind="serie-" className="h-auto w-full" />
                <p className="mt-6 font-display text-4xl font-black uppercase italic leading-[0.85]">
                  8 Läufe.
                  <br />
                  <span className="text-brand">1 Finale.</span>
                </p>
                <ol className="mt-5 flex-1 divide-y divide-ink/10 text-xs">
                  {CUP_RACES.map((r) => (
                    <li key={r.no} className="flex items-center gap-2 py-1">
                      <span className="w-6 border-l-2 border-ink pl-1.5 font-display text-sm font-black tabular">{String(r.no).padStart(2, "0")}</span>
                      <span className="flex-1 font-display text-sm font-bold uppercase leading-tight">
                        {r.name}
                        <span className="block font-sans text-[0.6rem] font-normal normal-case text-stone-dark">{r.place}</span>
                      </span>
                      <span className="font-mono">{r.month}</span>
                    </li>
                  ))}
                  <li className="flex items-center gap-2 py-1 text-brand">
                    <span className="w-6 border-l-2 border-brand pl-1.5 font-display text-sm font-black">∞</span>
                    <span className="flex-1 font-display text-sm font-bold uppercase">{CUP_FINAL.name} & Siegerehrung</span>
                    <span className="font-mono">{CUP_FINAL.month}</span>
                  </li>
                </ol>
                <div className="mt-3 flex items-center justify-between border-t border-ink/15 pt-3">
                  <span className="font-mono text-[0.5rem] uppercase tracking-[0.15em] text-stone-dark">Präsentiert von</span>
                  <BrandLogo variant="red" className="h-4" />
                </div>
              </div>
            </Mock>
            <div className="space-y-10">
              <Mock label="Bauzaunbanner 340 × 85 cm · Weiß auf Rot">
                <div className="relative flex aspect-[4/1] w-full items-center justify-between overflow-hidden bg-brand px-[5%]">
                  <CupLogo kind="serie-" color="weiss" className="relative h-auto w-[58%]" />
                  <p className="relative text-right font-display text-[clamp(0.8rem,2.6vw,1.8rem)] font-black uppercase italic leading-none text-white">
                    Ziel
                    <br />
                    Herdorf
                  </p>
                </div>
              </Mock>
              <Mock label="Start-/Zielbogen-Banner 300 × 50 cm · Negativ">
                <div className="flex aspect-[6/1] w-full items-center justify-center bg-ink px-[5%] ring-1 ring-border">
                  <CupLogo color="negativ" className="h-auto w-[70%]" />
                </div>
              </Mock>
              <div className="flex flex-wrap gap-2">
                <Badge variant="outline">Termine vorläufig</Badge>
                <p className="text-sm text-muted-foreground">
                  Läufe wie 2026, Monate als Orientierung. Die Termine {CUP_SEASON} werden eingesetzt, sobald sie feststehen.
                </p>
              </div>
            </div>
          </div>
        </Section>
      </main>
      <footer className="surface-ink px-4 py-10 sm:px-8">
        <div className="mx-auto flex max-w-6xl flex-col justify-between gap-4 font-mono text-xs uppercase tracking-[0.15em] text-muted-foreground sm:flex-row">
          <p>AUSDAUER CUP · seit 1989</p>
          <p>Logo-Entwurf v1 · zur Freigabe</p>
        </div>
      </footer>
    </>
  );
}
