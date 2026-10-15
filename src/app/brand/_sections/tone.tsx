import { Section } from "./section";

const PRINCIPLES = [
  { title: "Du, auf Augenhöhe", do: "Komm vorbei, wir schauen uns deinen Laufstil an.", dont: "Vereinbaren Sie einen Termin für eine Laufanalyse." },
  { title: "Fachlich, nicht fachchinesisch", do: "Dein Fuß knickt beim Aufsetzen leicht nach innen – das gleichen wir aus.", dont: "Überpronation mit erhöhtem Rückfußwinkel festgestellt." },
  { title: "Motivierend, nicht marktschreierisch", do: "Fünf Kilometer? Schaffst du. Wir zeigen dir wie.", dont: "MEGA-SALE!!! Nur heute!!!" },
  { title: "Kurz & mit Tempo", do: "Mittwoch. 18:15. Wilhelmsgasse. Lauf mit.", dont: "Unser Lauftreff findet regelmäßig an Mittwochen statt, Treffpunkt ist …" },
];

const HEADLINES = ["Dein nächster Kilometer.", "Erst laufen. Dann kaufen.", "Gemeinsam ist das neue schnell.", "Wir schauen dir auf die Füße.", "Westerwald-Höhenmeter inklusive."];

export function Tone() {
  return (
    <Section
      id="tonalitaet"
      km={9}
      kicker="Tonalität"
      title="Wir reden wie beim Lauftreff."
      intro="Duzen, direkt, freundlich. Expertise zeigen wir durch Klarheit, nicht durch Fremdwörter. Community zeigen wir durch Einladungen, nicht durch Superlative."
      dark
    >
      <div className="grid gap-4 md:grid-cols-2">
        {PRINCIPLES.map((p) => (
          <div key={p.title} className="rounded-sm bg-card p-6 ring-1 ring-border">
            <h3 className="text-2xl">{p.title}</h3>
            <p className="mt-4 border-l-4 border-signal pl-3">„{p.do}“</p>
            <p className="mt-3 border-l-4 border-destructive pl-3 text-muted-foreground line-through decoration-destructive/60">„{p.dont}“</p>
          </div>
        ))}
      </div>
      <h3 className="mt-12 text-3xl">Headline-Bank</h3>
      <ul className="mt-6 flex flex-wrap gap-3">
        {HEADLINES.map((h) => (
          <li key={h} className="rounded-sm bg-signal px-4 py-2 font-display text-xl font-extrabold uppercase italic text-signal-foreground">
            {h}
          </li>
        ))}
      </ul>
    </Section>
  );
}
