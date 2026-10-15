import { BrandLogo } from "@/components/brand/brand-logo";
import { resolveLogo } from "@/lib/brand/logos";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Rule, Section } from "./section";

export function Logo() {
  const uploaded = resolveLogo("ausdauer") !== null;

  return (
    <Section
      id="logo"
      km={3}
      kicker="Logo"
      title="Das Logo bleibt. Das System drumherum ist neu."
      intro="Das AUSDAUER-Logo wird unverändert übernommen. Neu sind die Regeln, wie es eingesetzt wird: auf welchen Flächen, mit wie viel Luft und in welcher Mindestgröße."
    >
      {!uploaded && (
        <Alert className="mb-8 border-dashed bg-white">
          <AlertTitle className="font-display text-lg font-bold uppercase">Original-Logo fehlt noch</AlertTitle>
          <AlertDescription>
            Bitte als <code className="font-mono">public/brand/logos/ausdauer.svg</code> ablegen. Bis dahin zeigen alle Seiten einen gekennzeichneten
            Platzhalter.
          </AlertDescription>
        </Alert>
      )}
      <div className="grid gap-4 sm:grid-cols-3">
        <figure className="flex aspect-[4/3] flex-col items-center justify-center gap-4 rounded-sm bg-paper ring-1 ring-border">
          <BrandLogo className="h-14 text-4xl" />
          <figcaption className="font-mono text-[0.65rem] uppercase tracking-[0.2em] text-muted-foreground">Positiv auf Paper</figcaption>
        </figure>
        <figure className="flex aspect-[4/3] flex-col items-center justify-center gap-4 rounded-sm bg-ink text-paper">
          <BrandLogo negative className="h-14 text-4xl" />
          <figcaption className="font-mono text-[0.65rem] uppercase tracking-[0.2em] opacity-70">Negativ auf Ink</figcaption>
        </figure>
        <figure className="flex aspect-[4/3] flex-col items-center justify-center gap-4 rounded-sm bg-signal text-signal-foreground">
          <BrandLogo className="h-14 text-4xl" />
          <figcaption className="font-mono text-[0.65rem] uppercase tracking-[0.2em] opacity-70">Positiv auf Signal (nur Aktionen)</figcaption>
        </figure>
      </div>

      <div className="mt-12 grid gap-10 lg:grid-cols-2">
        <div>
          <h3 className="text-3xl">Schutzraum & Größe</h3>
          <div className="mt-6 flex items-center justify-center rounded-sm bg-white p-6 ring-1 ring-border">
            <div className="relative border border-dashed border-signal p-8 [background:repeating-linear-gradient(45deg,transparent_0_6px,hsl(var(--signal)/0.25)_6px_7px)]">
              <div className="bg-white">
                <BrandLogo className="h-12 text-3xl" />
              </div>
              <span className="absolute -top-5 left-1/2 -translate-x-1/2 font-mono text-[0.65rem]">x</span>
            </div>
          </div>
          <ul className="mt-6 space-y-2 text-muted-foreground">
            <li>
              <strong className="text-foreground">Schutzraum:</strong> rundum mindestens <span className="font-mono">x</span> = Höhe des Buchstabens „A“ im
              Logo.
            </li>
            <li>
              <strong className="text-foreground">Mindestgröße:</strong> 25 mm Breite im Druck, 120 px digital.
            </li>
            <li>
              <strong className="text-foreground">Position:</strong> Flyer & Plakate oben links oder unten links, Social unten links.
            </li>
          </ul>
        </div>
        <div>
          <h3 className="text-3xl">Do&apos;s & Don&apos;ts</h3>
          <ul className="mt-6 space-y-3">
            <Rule kind="do">Original-Datei verwenden, auf Paper, Weiß, Ink oder vollflächigem Signal.</Rule>
            <Rule kind="do">Auf Fotos nur auf ruhigen Bildbereichen oder mit Ink-Verlauf darunter.</Rule>
            <Rule kind="dont">Logo verzerren, drehen, umfärben, mit Effekten (Schatten, Kontur) versehen.</Rule>
            <Rule kind="dont">Logo auf Höhenlinien oder Pace-Lines legen – Elemente halten Abstand.</Rule>
            <Rule kind="dont">Logo und Absolute-Run-Logo direkt aneinanderkleben (siehe KM 04).</Rule>
          </ul>
        </div>
      </div>
    </Section>
  );
}
