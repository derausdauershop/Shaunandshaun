import { PaceLines } from "@/components/brand/pace-lines";
import { RunAcademyIcon, RunAcademyLogo } from "@/components/brand/run-academy-logo";
import { StartNumber } from "@/components/brand/start-number";
import { TopoLines } from "@/components/brand/topo-lines";
import { Rule, Section } from "./section";

const COURSES = [
  { level: "01", title: "Einsteiger-Laufkurs", text: "Von 0 auf 5 km in 8 Wochen. Für alle, die (wieder) anfangen.", price: "130 €" },
  { level: "02", title: "10 km / Halbmarathon", text: "Strukturierte Vorbereitung auf dein Rennen mit Trainingsplan.", price: "tbd" },
  { level: "03", title: "Lauf-ABC & Technik", text: "Effizienter, verletzungsärmer laufen – Workshop mit Videoanalyse.", price: "tbd" },
];

export function Academy() {
  return (
    <Section
      id="academy"
      km={8}
      kicker="Run Academy"
      title="Gleiche Idee. Neue Form."
      intro="Was bleibt: das ∞, Volt als Academy-Farbe und der Claim „Besser. Laufen. Lernen.“ – alles schon gelernt. Was neu ist: das ∞ sitzt in einer um 5° geneigten Startnummern-Plakette, der Name steht in der neuen Headline-Schrift. So gehört die Academy sichtbar zu AUSDAUER und hebt sich klar von gleichnamigen Angeboten ab."
    >
      <div className="grid gap-4 md:grid-cols-[1fr_2fr]">
        <figure className="flex flex-col items-center justify-center gap-4 rounded-sm bg-white p-6 ring-1 ring-border">
          {/* eslint-disable-next-line @next/next/no-img-element -- reference of the previous logo */}
          <img src="/brand/logos/run-academy-alt.svg" alt="Bisheriges Run-Academy-Logo" className="h-24 w-auto" />
          <figcaption className="font-mono text-[0.65rem] uppercase tracking-[0.2em] text-muted-foreground">Bisher</figcaption>
        </figure>
        <div className="grid gap-4 sm:grid-cols-2">
          <figure className="flex aspect-[4/3] flex-col items-center justify-center gap-4 rounded-sm bg-paper ring-1 ring-border">
            <RunAcademyLogo />
            <figcaption className="font-mono text-[0.65rem] uppercase tracking-[0.2em] text-muted-foreground">Neu · horizontal</figcaption>
          </figure>
          <figure className="surface-ink flex aspect-[4/3] flex-col items-center justify-center gap-4 rounded-sm">
            <RunAcademyLogo layout="stacked" surface="dark" endorsed />
            <figcaption className="font-mono text-[0.65rem] uppercase tracking-[0.2em] text-muted-foreground">Neu · gestapelt · extern</figcaption>
          </figure>
          <figure className="flex aspect-[4/3] flex-col items-center justify-center gap-4 rounded-sm bg-signal text-signal-foreground sm:col-span-2 sm:aspect-auto sm:py-8">
            <RunAcademyLogo surface="signal" />
            <div className="flex items-end gap-4">
              <RunAcademyIcon className="h-16" />
              <RunAcademyIcon className="h-10" />
              <RunAcademyIcon className="h-6" />
            </div>
            <figcaption className="font-mono text-[0.65rem] uppercase tracking-[0.2em] opacity-70">Auf Volt · Plakette als Avatar & Favicon</figcaption>
          </figure>
        </div>
      </div>

      <div className="mt-12 grid gap-10 lg:grid-cols-[1fr_1.2fr]">
        <ul className="space-y-3">
          <Rule kind="do">Academy-Medien tragen Volt – bis zu 50 % der Fläche.</Rule>
          <Rule kind="do">Unter 24 px nur die Plakette verwenden.</Rule>
          <Rule kind="do">„by AUSDAUER“ in externer Kommunikation (Presse, Partner, Vereine).</Rule>
          <Rule kind="dont">Rot in Academy-Medien – Rot gehört dem AUSDAUER CUP und dem Absender-Logo.</Rule>
        </ul>
        <div className="grid gap-3">
          {COURSES.map((c) => (
            <div key={c.title} className="flex items-center gap-4 rounded-sm bg-white p-4 ring-1 ring-border">
              <span className="font-display text-4xl font-black italic text-stone tabular">{c.level}</span>
              <div className="flex-1">
                <p className="font-display text-xl font-extrabold uppercase">{c.title}</p>
                <p className="text-sm text-muted-foreground">{c.text}</p>
              </div>
              <span className="font-mono text-sm font-semibold tabular">{c.price}</span>
            </div>
          ))}
        </div>
      </div>
      <div className="surface-ink relative mt-12 flex flex-col gap-6 overflow-hidden rounded-sm p-8 sm:flex-row sm:items-center sm:justify-between">
        <TopoLines className="absolute inset-0 h-full w-full text-signal opacity-20" />
        <div className="relative">
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-signal">Kursstart Frühjahr</p>
          <p className="mt-2 font-display text-5xl font-black uppercase italic leading-none">Dein erster Kilometer.</p>
          <PaceLines className="mt-5 w-40 text-signal" count={3} />
        </div>
        <StartNumber number="08" label="Wochen" sublabel="0 → 5 km" variant="signal" className="relative rotate-2" />
      </div>
    </Section>
  );
}
