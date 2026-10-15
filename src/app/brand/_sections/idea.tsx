import { Section } from "./section";

const VALUES = [
  { title: "Kompetent", text: "Laufanalyse, Einlagenbau, ehrliche Beratung. Wir wissen, wovon wir reden – und erklären es verständlich." },
  { title: "Gemeinsam", text: "Run Clubs, Firmenlauf, Academy. Laufen ist allein gut und zusammen besser." },
  { title: "Nahbar", text: "Familienunternehmen aus dem Westerwald und Siegerland. Wir kennen unsere Strecken – und unsere Leute." },
  { title: "In Bewegung", text: "Wir bleiben neugierig: neue Produkte, neue Formate, neue Ziele. Stillstand ist keine Disziplin." },
];

export function Idea() {
  return (
    <Section
      id="idee"
      km={1}
      kicker="Leitidee"
      title="Expertise als Fundament. Community als Energie."
      intro="Jede Strecke beginnt mit dem ersten Kilometer – egal ob 5 km im Park oder 42,195 km in Frankfurt. AUSDAUER ist der Ort, an dem diese Strecke beginnt, besser wird und gemeinsam weitergeht."
    >
      <div className="grid gap-px overflow-hidden rounded-sm bg-border sm:grid-cols-2 lg:grid-cols-4">
        {VALUES.map((v, i) => (
          <div key={v.title} className="bg-background p-6">
            <span className="font-mono text-xs text-muted-foreground tabular">0{i + 1}</span>
            <h3 className="mt-3 text-3xl">{v.title}</h3>
            <p className="mt-3 text-muted-foreground">{v.text}</p>
          </div>
        ))}
      </div>
      <div className="mt-12 grid gap-6 sm:grid-cols-3">
        {[
          ["Name", "AUSDAUER", "„Ausdauer-Shop“ nur noch in Domain & Impressum."],
          ["Signatur", "Wir leben Sport.", "Bleibt als Absender – unter Logo oder am Ende."],
          ["Kampagnenzeile", "Dein nächster Kilometer.", "Für Aktionen, Academy, Social."],
        ].map(([label, value, note]) => (
          <div key={label} className="border-t-4 border-ink pt-4">
            <p className="font-mono text-xs uppercase tracking-[0.2em] text-muted-foreground">{label}</p>
            <p className="mt-2 font-display text-3xl font-extrabold uppercase">{value}</p>
            <p className="mt-1 text-sm text-muted-foreground">{note}</p>
          </div>
        ))}
      </div>
    </Section>
  );
}
