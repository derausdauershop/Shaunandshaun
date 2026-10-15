import { PaceLines } from "@/components/brand/pace-lines";
import { RunAcademyIcon, RunAcademyLogo } from "@/components/brand/run-academy-logo";
import { StartNumber } from "@/components/brand/start-number";
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
      title="Neues Logo. Gleiche Familie."
      intro="Die Run Academy bekommt ein eigenes Zeichen: drei Bahnen, die durch eine Kurve laufen – Lernen als Strecke. „by AUSDAUER“ verankert die Laufschule in der Dachmarke und grenzt sie von gleichnamigen Angeboten anderer Händler ab."
    >
      <div className="grid gap-4 md:grid-cols-3">
        <figure className="flex aspect-[4/3] flex-col items-center justify-center gap-4 rounded-sm bg-paper ring-1 ring-border">
          <RunAcademyLogo />
          <figcaption className="font-mono text-[0.65rem] uppercase tracking-[0.2em] text-muted-foreground">Horizontal</figcaption>
        </figure>
        <figure className="surface-ink flex aspect-[4/3] flex-col items-center justify-center gap-4 rounded-sm">
          <RunAcademyLogo layout="stacked" className="[&_svg]:text-signal" />
          <figcaption className="font-mono text-[0.65rem] uppercase tracking-[0.2em] text-muted-foreground">Gestapelt · Negativ</figcaption>
        </figure>
        <figure className="flex aspect-[4/3] flex-col items-center justify-center gap-4 rounded-sm bg-signal text-signal-foreground">
          <div className="flex items-end gap-4">
            <RunAcademyIcon framed className="size-20" />
            <RunAcademyIcon className="size-12" />
            <RunAcademyIcon className="size-6" />
          </div>
          <figcaption className="font-mono text-[0.65rem] uppercase tracking-[0.2em] opacity-70">Icon · Avatar · Favicon</figcaption>
        </figure>
      </div>

      <div className="mt-12 grid gap-10 lg:grid-cols-[1fr_1.2fr]">
        <ul className="space-y-3">
          <Rule kind="do">Icon allein nur, wenn AUSDAUER im selben Medium sichtbar ist (Social-Avatar, Shirt-Rücken).</Rule>
          <Rule kind="do">Unter 24 px nur das Icon verwenden.</Rule>
          <Rule kind="do">Academy-Medien dürfen mehr Signalfarbe tragen – sie sind Aktivierung.</Rule>
          <Rule kind="dont">„by AUSDAUER“ weglassen bei externer Kommunikation.</Rule>
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
