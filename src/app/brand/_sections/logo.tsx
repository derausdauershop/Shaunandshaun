import { BrandLogo } from "@/components/brand/brand-logo";
import { InfinityMark } from "@/components/brand/infinity-mark";
import { Rule, Section } from "./section";

const VARIANTS = [
  { bg: "bg-white ring-1 ring-border", variant: "red", label: "Rot auf Weiß · Standard", text: "text-muted-foreground" },
  { bg: "bg-paper ring-1 ring-border", variant: "ink", label: "Schwarz auf Paper", text: "text-muted-foreground" },
  { bg: "bg-ink", variant: "white", label: "Weiß auf Ink", text: "text-paper/70" },
  { bg: "bg-brand", variant: "white", label: "Weiß auf Rot · Aktionen", text: "text-white/80" },
] as const;

export function Logo() {
  return (
    <Section
      id="logo"
      km={3}
      kicker="Logo"
      title="Das Logo bleibt. Das System drumherum ist neu."
      intro="∞ + AUSDAUER, 5° geneigt, in Rot oder Schwarz – unverändert übernommen aus dem bestehenden Logo-Manual. Neu sind die Regeln, wie es eingesetzt wird."
    >
      <div className="grid gap-4 sm:grid-cols-2">
        {VARIANTS.map((v) => (
          <figure key={v.label} className={`flex aspect-[16/7] flex-col items-center justify-center gap-5 rounded-sm ${v.bg}`}>
            <BrandLogo variant={v.variant} className="h-10 sm:h-12" />
            <figcaption className={`font-mono text-[0.65rem] uppercase tracking-[0.2em] ${v.text}`}>{v.label}</figcaption>
          </figure>
        ))}
      </div>

      <div className="mt-12 grid gap-10 lg:grid-cols-3 [&>*]:min-w-0">
        <div>
          <h3 className="text-3xl">Schutzraum & Größe</h3>
          <div className="mt-6 flex items-center justify-center rounded-sm bg-white p-4 ring-1 ring-border sm:p-6">
            <div className="relative border border-dashed border-brand p-4 sm:p-6 [background:repeating-linear-gradient(45deg,transparent_0_6px,hsl(var(--brand)/0.15)_6px_7px)]">
              <div className="bg-white">
                <BrandLogo variant="red" className="h-6 sm:h-8" />
              </div>
            </div>
          </div>
          <ul className="mt-6 space-y-2 text-muted-foreground">
            <li>
              <strong className="text-foreground">Schutzraum:</strong> rundum mindestens die Höhe des ∞.
            </li>
            <li>
              <strong className="text-foreground">Mindestgröße:</strong> 30 mm Breite im Druck, 140 px digital.
            </li>
            <li>
              <strong className="text-foreground">Position:</strong> oben links oder unten links.
            </li>
          </ul>
        </div>
        <div>
          <h3 className="text-3xl">Das ∞ allein</h3>
          <div className="mt-6 flex items-center justify-center gap-6 rounded-sm bg-ink p-6">
            <InfinityMark className="h-10 w-auto text-brand" />
            <InfinityMark className="h-10 w-auto text-paper" />
            <InfinityMark variant="track" className="h-10 w-auto text-signal" />
          </div>
          <p className="mt-6 text-muted-foreground">
            Das ∞ darf allein stehen – als Avatar, Stempel, Shirt-Detail oder als Kontur-Supergrafik. Immer dann, wenn der Absender schon klar ist.
          </p>
        </div>
        <div>
          <h3 className="text-3xl">Do&apos;s & Don&apos;ts</h3>
          <ul className="mt-6 space-y-3">
            <Rule kind="do">Nur die Original-Dateien aus public/brand/logos verwenden.</Rule>
            <Rule kind="do">Auf Fotos nur auf ruhigen Bildbereichen oder mit Ink-Verlauf darunter.</Rule>
            <Rule kind="dont">Rotes Logo auf Ink oder Volt – zu wenig Kontrast bzw. flimmert.</Rule>
            <Rule kind="dont">Verzerren, Neigung ändern, umfärben, Effekte (Schatten, Kontur).</Rule>
            <Rule kind="dont">Logo auf Höhenlinien oder Pace-Lines legen.</Rule>
          </ul>
        </div>
      </div>
    </Section>
  );
}
