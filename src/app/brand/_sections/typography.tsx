import { TYPE } from "@/lib/brand/tokens";
import { Section } from "./section";

const SCALE = [
  { name: "Display", cls: "font-display text-7xl font-black uppercase italic leading-[0.85] sm:text-8xl", spec: "Barlow Condensed 900 italic · 96/82", sample: "Bestzeit." },
  { name: "H1", cls: "font-display text-5xl font-extrabold uppercase leading-[0.92] sm:text-6xl", spec: "Barlow Condensed 800 · 64/58", sample: "Dein nächster Kilometer" },
  { name: "H2", cls: "font-display text-4xl font-extrabold uppercase leading-[0.95]", spec: "Barlow Condensed 800 · 40/38", sample: "Laufanalyse in 30 Minuten" },
  { name: "H3", cls: "font-display text-2xl font-bold uppercase", spec: "Barlow Condensed 700 · 24/28", sample: "Einsteiger-Laufkurs" },
  { name: "Lead", cls: "font-sans text-xl", spec: "Barlow 400 · 20/30", sample: "In acht Wochen von null auf fünf Kilometer – mit Plan, Gruppe und Trainer:in." },
  { name: "Body", cls: "font-sans text-base", spec: "Barlow 400 · 16/24", sample: "Wir schauen dir beim Laufen auf die Füße – per Video und Druckmessung – und finden den Schuh, der zu deinem Laufstil passt." },
  { name: "Daten", cls: "font-mono text-sm uppercase tracking-[0.15em]", spec: "JetBrains Mono 600 · 14/20 · +15 %", sample: "Pace 5:12 /km · Kadenz 172 · Do 18:30" },
];

export function Typography() {
  return (
    <Section
      id="typo"
      km={6}
      kicker="Typografie"
      title="Kondensiert, schnell, gut lesbar."
      intro="Barlow Condensed Black Italic nimmt die 5°-Neigung und die Wucht des Logo-Schriftzugs auf und bringt Startnummern-Energie in die Headlines. Barlow hält den Text ruhig. Sie ersetzen die bisherige Proxima Nova – frei lizenziert für Print und Web, ohne Lizenzkosten pro Arbeitsplatz."
      dark
    >
      <div className="grid gap-4 sm:grid-cols-3">
        {TYPE.map((t) => (
          <div key={t.role} className="rounded-sm bg-card p-5 ring-1 ring-border">
            <p className="font-mono text-[0.65rem] uppercase tracking-[0.2em] text-muted-foreground">{t.role}</p>
            <p
              className={
                t.role === "Headline"
                  ? "mt-2 font-display text-4xl font-black uppercase"
                  : t.role === "Fließtext"
                    ? "mt-2 font-sans text-3xl font-medium"
                    : "mt-2 font-mono text-2xl"
              }
            >
              {t.family}
            </p>
            <p className="mt-2 text-sm text-muted-foreground">{t.weights}</p>
            <p className="text-sm text-muted-foreground">Lizenz: {t.license}</p>
          </div>
        ))}
      </div>

      <div className="mt-12 divide-y divide-border border-y border-border">
        {SCALE.map((s) => (
          <div key={s.name} className="grid gap-3 py-6 md:grid-cols-[10rem_1fr]">
            <div className="font-mono text-xs uppercase tracking-[0.15em] text-muted-foreground">
              <p className="text-foreground">{s.name}</p>
              <p className="mt-1 normal-case tracking-normal">{s.spec}</p>
            </div>
            <p className={s.cls}>{s.sample}</p>
          </div>
        ))}
      </div>
      <p className="mt-6 text-sm text-muted-foreground">
        Regeln: Headlines immer in Versalien, max. 3 Zeilen, Zeilenabstand eng (85–95 %). Kursiv nur für das eine Wort, das Tempo braucht. Zahlen
        (Preise, Zeiten, Pace) immer tabellarisch in Mono oder Condensed.
      </p>
    </Section>
  );
}
