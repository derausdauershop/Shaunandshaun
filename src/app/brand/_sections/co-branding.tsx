import { BrandLogo } from "@/components/brand/brand-logo";
import { CrownTownLogo } from "@/components/brand/crown-town-logo";
import { InfinityMark } from "@/components/brand/infinity-mark";
import { PartnerLogo } from "@/components/brand/partner-logo";
import { Rule, Section } from "./section";

export function CoBranding() {
  return (
    <Section
      id="co-branding"
      km={4}
      kicker="Siegen"
      title="Absolute Run Ausdauer: eingebettet, nicht angepasst."
      intro="Das Siegener Logo folgt dem Sport-2000-Format: dünne Geometrie, Cyan statt Rot. Es passt bewusst nicht ganz – aber es trägt unser ∞. Wir lösen den Bruch durch Rahmen statt Anpassung: weißes Feld, fester Abstand, klare Absenderzeile. Cyan wird zur Farbe von Siegen und verbindet den Store mit den Crown Town Runners."
      dark
    >
      <div className="grid gap-8 lg:grid-cols-2">
        <div className="flex flex-wrap items-start gap-6">
          <PartnerLogo />
          <div className="flex flex-col gap-2">
            <div className="bg-white px-4 py-2">
              <CrownTownLogo className="h-16" />
            </div>
            <p className="font-mono text-[0.65rem] uppercase tracking-[0.2em] opacity-80">powered by AUSDAUER</p>
          </div>
        </div>
        <ul className="space-y-3">
          <Rule kind="do">Partner-Logo immer auf eigenem weißen Feld – es funktioniert nur auf hellem Grund.</Rule>
          <Rule kind="do">Immer mit Absenderzeile „ein AUSDAUER Store · Siegen“.</Rule>
          <Rule kind="do">Cyan nur im Siegen-Kontext: Store, Crown Town Runners, Siegen-Flyer.</Rule>
          <Rule kind="dont">Umfärben, in AUSDAUER-Schriften nachbauen, auf Ink, Rot oder Volt legen.</Rule>
          <Rule kind="dont">Größer als das AUSDAUER-Logo auf gemeinsamen Medien.</Rule>
        </ul>
      </div>

      <h3 className="mt-16 text-3xl">Standortleiste</h3>
      <p className="mt-2 max-w-2xl text-muted-foreground">
        Für alle Medien, die beide Stores betreffen (Flyer, Plakate, Gutscheine, Webseiten-Footer). Gleich hohe weiße Felder, AUSDAUER links, das ∞
        als Scharnier.
      </p>
      <div className="mt-6 grid items-stretch overflow-hidden rounded-sm bg-white text-ink sm:grid-cols-[1fr_auto_1fr]">
        <div className="flex flex-wrap items-center gap-5 p-6">
          <BrandLogo variant="red" className="h-7" />
          <address className="not-italic">
            <p className="font-display text-lg font-bold uppercase">Betzdorf</p>
            <p className="text-sm text-stone-dark">Wilhelmstraße 16 · 02741 4372</p>
          </address>
        </div>
        <div className="hidden items-center sm:flex">
          <InfinityMark className="h-4 w-auto text-stone" />
        </div>
        <div className="flex flex-wrap items-center gap-5 border-t border-ink/10 p-6 sm:border-t-0">
          <PartnerLogo showSender={false} className="[&>div]:p-0" />
          <address className="not-italic">
            <p className="font-display text-lg font-bold uppercase">Siegen</p>
            <p className="text-sm text-stone-dark">Koblenzer Straße 40 · 0271 77005090</p>
          </address>
        </div>
      </div>
    </Section>
  );
}
