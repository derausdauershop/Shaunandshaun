/* eslint-disable @next/next/no-img-element -- static vector logos */
import type { Metadata } from "next";
import Link from "next/link";
import { TopoLines } from "@/components/brand/topo-lines";
import { CLUB_SWATCHES, TEXTILE_RULES, teamwearLogo, textileMark, type TeamwearColor } from "@/lib/brand/teamwear";
import { cn } from "@/lib/utils";
import { Rule, Section } from "../_sections/section";

export const metadata: Metadata = {
  title: "AUSDAUER TEAMWEAR – Logo",
  description: "Logo-System und Textil-Marken für AUSDAUER TEAMWEAR, den Textildruck für Vereine und Firmen.",
  robots: { index: false, follow: false },
};

const SURFACE: Record<TeamwearColor, string> = {
  farbig: "bg-white ring-1 ring-border",
  negativ: "bg-ink",
  schwarz: "bg-white ring-1 ring-border",
  weiss: "bg-brand",
};
const COLORS: TeamwearColor[] = ["farbig", "negativ", "schwarz", "weiss"];

/** Literal swatch classes (Tailwind needs static class names). */
const SWATCH: Record<string, string> = {
  Weiß: "bg-white ring-1 ring-border",
  Schwarz: "bg-[#1A1A1A]",
  Rot: "bg-[#C8102E]",
  Royalblau: "bg-[#1D4FA0]",
  Grün: "bg-[#0B7A3B]",
  Gelb: "bg-[#F7D417]",
};

/** Jersey silhouette with the three print positions. */
function Jersey({ color, mark, neck, label }: { color: string; mark: string; neck: string; label: string }) {
  return (
    <figure className="min-w-0">
      <div className="relative mx-auto aspect-[10/9] w-full max-w-sm">
        <svg viewBox="0 0 200 180" aria-hidden className="absolute inset-0 h-full w-full drop-shadow-md">
          <path d="M70 8 Q100 26 130 8 L176 26 L198 78 L164 92 L156 72 L156 176 L44 176 L44 72 L36 92 L2 78 L24 26 Z" className={color} />
          <path d="M70 8 Q100 26 130 8" fill="none" stroke="currentColor" strokeOpacity="0.18" strokeWidth="3" />
        </svg>
        {/* sleeve, rotated with the sleeve edge */}
        <img src={mark} alt="" className="absolute left-[81.5%] top-[25%] w-[9%] rotate-[22deg]" />
        <img src={neck} alt="" className="absolute left-1/2 top-[15%] w-[18%] -translate-x-1/2" />
        <span className="absolute left-1/2 top-[42%] -translate-x-1/2 font-mono text-[0.6rem] uppercase tracking-[0.2em] opacity-40">Vereinswappen</span>
      </div>
      <figcaption className="mt-3 text-center font-mono text-[0.65rem] uppercase tracking-[0.2em] text-muted-foreground">{label}</figcaption>
    </figure>
  );
}

export default function TeamwearBrandPage() {
  return (
    <>
      <header className="surface-ink relative overflow-hidden">
        <TopoLines className="absolute inset-0 h-full w-full text-stone opacity-30" />
        <div className="relative mx-auto max-w-6xl px-4 pb-16 pt-10 sm:px-8 lg:pb-24">
          <Link href="/brand" className="font-mono text-xs uppercase tracking-[0.2em] text-muted-foreground hover:text-foreground">
            ← Brand Guide
          </Link>
          <p className="mt-12 font-mono text-xs uppercase tracking-[0.25em] text-brand">Logo-Entwurf · Textildruck für Vereine & Firmen</p>
          <img src={teamwearLogo("", "negativ")} alt="AUSDAUER TEAMWEAR – Bedruckt in Betzdorf" className="mt-8 h-auto w-full max-w-2xl" />
          <p className="mt-10 max-w-2xl text-lg text-muted-foreground sm:text-xl">
            Flex und DTF für Vereine und Firmen, ausgestattet über JAKO. Das lange AUSDAUER-Logo ist auf dem Ärmel zu flach. Deshalb
            sitzt dort ab jetzt die rote ∞-Plakette, kompakt, auch mit 25 mm noch erkennbar.
          </p>
        </div>
      </header>

      <main>
        <Section
          id="problem"
          km={1}
          kicker="Problem"
          title="Das lange Logo ist für den Ärmel zu flach."
          intro="Das AUSDAUER-Logo ist gut siebenmal so breit wie hoch. Auf einem Ärmel stehen 50–60 mm Breite zur Verfügung, dann sind die Buchstaben gerade 6 mm hoch. Die Lösung lässt das Logo unverändert und stellt nur seine Teile anders zusammen."
        >
          <div className="grid gap-4 md:grid-cols-3">
            <figure className="flex min-h-44 flex-col items-center justify-center gap-4 rounded-sm bg-white p-8 ring-1 ring-border">
              <img src="/brand/logos/ausdauer.svg" alt="AUSDAUER Logo" className="h-auto w-[60%]" />
              <figcaption className="text-center font-mono text-[0.65rem] uppercase tracking-[0.2em] text-muted-foreground">Heute · gleiche Breite · Buchstaben ~6 mm</figcaption>
            </figure>
            <figure className="flex min-h-44 flex-col items-center justify-center gap-4 rounded-sm bg-white p-8 ring-1 ring-border">
              <img src={textileMark("aermel-vertikal", "farbig")} alt="Ärmel vertikal" className="h-auto w-[60%]" />
              <figcaption className="text-center font-mono text-[0.65rem] uppercase tracking-[0.2em] text-muted-foreground">Ärmel vertikal · Buchstaben ~12 mm</figcaption>
            </figure>
            <figure className="flex min-h-44 flex-col items-center justify-center gap-4 rounded-sm bg-white p-8 ring-1 ring-border">
              <img src={textileMark("aermel-plakette", "farbig")} alt="Ärmel-Plakette" className="h-auto w-[34%]" />
              <figcaption className="text-center font-mono text-[0.65rem] uppercase tracking-[0.2em] text-muted-foreground">Ärmel-Plakette · ab 25 mm</figcaption>
            </figure>
          </div>
          <p className="mt-6 text-sm text-muted-foreground">
            Zum Prüfen am echten Shirt:{" "}
            <Link href="/brand/vorlagen/teamwear-testbogen" className="underline underline-offset-4">
              Lesbarkeitstest A4 (1:1 drucken) →
            </Link>
          </p>
        </Section>

        <Section
          id="untermarke"
          km={2}
          kicker="Untermarke"
          title="Gebaut wie Run Academy und CUP."
          intro="Gleicher Bauplan wie die anderen Untermarken: ∞-Plakette, Name in Barlow Condensed Black Italic, Claim in JetBrains Mono. Für Briefbogen, Angebote, Bestellshop, Webseite, Hangtags und Fahrzeug."
          dark
        >
          <div className="grid gap-4 md:grid-cols-2">
            {[
              { kind: "" as const, label: "Standard", use: "Webseite, Angebote, Bestellshop, Fahrzeug", h: "h-12" },
              { kind: "gestapelt-" as const, label: "Gestapelt", use: "Hangtag, Verpackung, Hochformate", h: "h-28" },
            ].map((v) => (
              <figure key={v.label} className="overflow-hidden rounded-sm bg-card ring-1 ring-border">
                <div className="grid grid-cols-2">
                  {COLORS.map((c) => (
                    <div key={c} className={cn("flex min-h-36 items-center justify-center p-5", SURFACE[c])}>
                      <img src={teamwearLogo(v.kind, c)} alt={`AUSDAUER TEAMWEAR ${c}`} className={cn("w-auto max-w-full", v.h)} />
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
          <div className="mt-10">
            <p className="font-mono text-xs uppercase tracking-[0.2em] text-muted-foreground">Claim zur Wahl</p>
            <div className="mt-4 grid gap-4 md:grid-cols-2">
              <figure className="rounded-sm bg-white p-8 ring-1 ring-border">
                <img src={teamwearLogo("", "farbig")} alt="Claim Bedruckt in Betzdorf" className="h-12 w-auto max-w-full" />
                <figcaption className="mt-4 text-sm text-ink/70">A · „Bedruckt in Betzdorf“: Herkunft und Handwerk, lokal.</figcaption>
              </figure>
              <figure className="rounded-sm bg-white p-8 ring-1 ring-border">
                <img src={teamwearLogo("claim-alt-", "farbig")} alt="Claim Für Vereine und Firmen" className="h-12 w-auto max-w-full" />
                <figcaption className="mt-4 text-sm text-ink/70">B · „Für Vereine & Firmen“: sagt sofort, für wen.</figcaption>
              </figure>
            </div>
          </div>
        </Section>

        <Section
          id="textil"
          km={3}
          kicker="Textil-Marken"
          title="Drei Marken für Trikot, Hoodie und Kappe."
          intro="Die Textil-Marken tragen AUSDAUER, nicht „Teamwear“: Auf dem Vereinstrikot sind wir der Absender. Alle 1-farbigen Dateien sind ein einziger Pfad mit ausgespartem ∞. Der Plotter schneidet sie in einem Stück, im Flex erscheint dort die Textilfarbe."
        >
          <div className="grid gap-4 md:grid-cols-3">
            {TEXTILE_RULES.map((r) => (
              <figure key={r.mark} className="flex flex-col overflow-hidden rounded-sm ring-1 ring-border">
                <div className="grid flex-1 grid-cols-2">
                  <div className="flex min-h-40 items-center justify-center bg-white p-5">
                    <img src={textileMark(r.mark, r.mark === "nacken" ? "1c-schwarz" : "farbig")} alt={`${r.label} auf hell`} className="h-auto w-[80%]" />
                  </div>
                  <div className="flex min-h-40 items-center justify-center bg-ink p-5">
                    <img src={textileMark(r.mark, r.mark === "nacken" ? "1c-weiss" : "negativ")} alt={`${r.label} auf dunkel`} className="h-auto w-[80%]" />
                  </div>
                </div>
                <figcaption className="bg-card p-5">
                  <p className="font-display text-xl font-extrabold uppercase">{r.label}</p>
                  <p className="text-sm text-muted-foreground">{r.where}</p>
                  <dl className="mt-3 flex gap-6 font-mono text-xs">
                    <div>
                      <dt className="uppercase tracking-[0.15em] text-muted-foreground">Mindestens</dt>
                      <dd className="mt-1 text-base font-semibold tabular">{r.min} mm</dd>
                    </div>
                    <div>
                      <dt className="uppercase tracking-[0.15em] text-muted-foreground">Ideal</dt>
                      <dd className="mt-1 text-base font-semibold tabular">{r.ideal}</dd>
                    </div>
                  </dl>
                </figcaption>
              </figure>
            ))}
          </div>

          <p className="mt-12 font-mono text-xs uppercase tracking-[0.2em] text-muted-foreground">Ärmel-Plakette auf Vereinsfarben · 1-farbig</p>
          <div className="mt-4 grid grid-cols-3 gap-3 sm:grid-cols-6">
            {CLUB_SWATCHES.map((c) => (
              <figure key={c.name}>
                <div className={cn("flex aspect-square items-center justify-center rounded-sm", SWATCH[c.name])}>
                  <img src={textileMark("aermel-plakette", c.mark)} alt={`Plakette auf ${c.name}`} className="h-auto w-1/2" />
                </div>
                <figcaption className="mt-2 font-mono text-[0.65rem] uppercase tracking-[0.15em] text-muted-foreground">{c.name}</figcaption>
              </figure>
            ))}
          </div>
        </Section>

        <Section id="platzierung" km={4} kicker="Platzierung" title="Der Verein vorn, wir am Ärmel." dark>
          <div className="grid gap-10 md:grid-cols-3">
            <Jersey color="fill-white" mark={textileMark("aermel-plakette", "farbig")} neck={textileMark("nacken", "1c-schwarz")} label="Heimtrikot weiß · DTF farbig" />
            <Jersey color="fill-[#C8102E]" mark={textileMark("aermel-plakette", "1c-weiss")} neck={textileMark("nacken", "1c-weiss")} label="Rot · Flex weiß" />
            <Jersey color="fill-[#1D4FA0]" mark={textileMark("aermel-vertikal", "1c-weiss")} neck={textileMark("nacken", "1c-weiss")} label="Royalblau · Ärmel vertikal" />
          </div>
          <div className="mt-12 grid gap-8 lg:grid-cols-2">
            <ul className="space-y-3">
              <Rule kind="do">Rangfolge auf dem Trikot: Vereinswappen und Sponsor vorn, JAKO laut Ausrüster-Vorgabe, AUSDAUER am linken Ärmel oder im Nacken.</Rule>
              <Rule kind="do">Ärmel: Plakette 3–4 cm unter der Schulternaht, mittig auf der Ärmelachse. Nacken: 2 cm unter dem Kragen.</Rule>
              <Rule kind="do">Auf Vereinsfarben 1-farbig in Weiß oder Schwarz, je nachdem, was mehr Kontrast hat. Rot nur auf Weiß, Grau oder Schwarz.</Rule>
            </ul>
            <ul className="space-y-3">
              <Rule kind="dont">Das lange Logo auf dem Ärmel unter 60 mm Breite.</Rule>
              <Rule kind="dont">Vereinswappen, JAKO- oder Sponsorlogos umfärben oder mit der Plakette verbinden.</Rule>
              <Rule kind="dont">Rote Plakette auf rotem Trikot. Claim oder „TEAMWEAR“ auf dem Vereinstrikot.</Rule>
            </ul>
          </div>
        </Section>

        <Section id="dateien" km={5} kicker="Dateien" title="Für Plotter, DTF-Drucker und Druckerei.">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[560px] text-left text-sm">
              <thead className="font-mono text-xs uppercase tracking-[0.15em] text-muted-foreground">
                <tr className="border-b border-border">
                  <th className="py-3 pr-4 font-medium">Datei</th>
                  <th className="py-3 pr-4 font-medium">Verfahren</th>
                  <th className="py-3 font-medium">Einsatz</th>
                </tr>
              </thead>
              <tbody className="[&_td]:py-3 [&_td]:pr-4 [&_tr]:border-b [&_tr]:border-border">
                <tr>
                  <td className="font-mono text-xs">textil-*-1c-weiss / -1c-schwarz / -1c-rot</td>
                  <td>Flex</td>
                  <td>Ein Pfad, ∞ ausgespart, plotterfertig. Spiegeln macht die Plottersoftware.</td>
                </tr>
                <tr>
                  <td className="font-mono text-xs">textil-*-farbig</td>
                  <td>DTF</td>
                  <td>Helle Textilien: rote Plakette, weißes ∞, Schrift in Ink.</td>
                </tr>
                <tr>
                  <td className="font-mono text-xs">textil-*-negativ</td>
                  <td>DTF</td>
                  <td>Dunkle Textilien: rote Plakette, Schrift in Weiß.</td>
                </tr>
                <tr>
                  <td className="font-mono text-xs">ausdauer-teamwear-*</td>
                  <td>Print / Web</td>
                  <td>Untermarke für Angebote, Webseite, Hangtag, Fahrzeug.</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className="mt-6 font-mono text-xs text-muted-foreground">Alle Dateien als SVG und PDF mit Schrift in Pfaden: public/brand/teamwear/ · erzeugt mit npm run brand:subbrands</p>
        </Section>
      </main>
    </>
  );
}
