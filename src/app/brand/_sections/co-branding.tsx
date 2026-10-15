import { BrandLogo } from "@/components/brand/brand-logo";
import { PartnerLogo } from "@/components/brand/partner-logo";
import { Rule, Section } from "./section";

export function CoBranding() {
  return (
    <Section
      id="co-branding"
      km={4}
      kicker="Co-Branding Siegen"
      title="Absolute Run Ausdauer: eingebettet, nicht angepasst."
      intro="Das Siegener Logo folgt dem Sport-2000-Format und passt bewusst nicht ganz zu AUSDAUER. Wir lösen das nicht durch Anpassen, sondern durch Rahmen: eine neutrale Fläche, fester Abstand und eine klare Absenderzeile."
      dark
    >
      <div className="grid gap-8 lg:grid-cols-2">
        <div className="flex flex-wrap items-start gap-6">
          <PartnerLogo field="white" />
          <PartnerLogo field="ink" className="ring-1 ring-paper/20" />
        </div>
        <ul className="space-y-3">
          <Rule kind="do">Partner-Logo immer in seinem eigenen neutralen Feld (Weiß oder Ink) mit festem Innenabstand.</Rule>
          <Rule kind="do">Immer mit Absenderzeile „ein AUSDAUER Store · Siegen“.</Rule>
          <Rule kind="do">Nur dort einsetzen, wo es um Siegen geht: Store-Seite, Siegen-Flyer, Standortleiste.</Rule>
          <Rule kind="dont">Umfärben, in AUSDAUER-Schriften nachbauen oder mit Signalfarbe hinterlegen.</Rule>
          <Rule kind="dont">Größer als das AUSDAUER-Logo auf gemeinsamen Medien.</Rule>
        </ul>
      </div>

      <h3 className="mt-16 text-3xl">Standortleiste</h3>
      <p className="mt-2 max-w-2xl text-muted-foreground">
        Für alle Medien, die beide Stores betreffen (Flyer, Plakate, Gutscheine, Footer der Webseite). Gleich hohe Felder, AUSDAUER links.
      </p>
      <div className="mt-6 grid overflow-hidden rounded-sm bg-paper text-ink sm:grid-cols-2">
        <div className="flex items-center gap-5 p-6">
          <BrandLogo className="h-10 text-2xl" />
          <address className="not-italic">
            <p className="font-display text-lg font-bold uppercase">Betzdorf</p>
            <p className="text-sm text-stone-dark">Wilhelmstraße 16 · 02741 4372</p>
          </address>
        </div>
        <div className="flex items-center gap-5 border-t border-ink/10 bg-white p-6 sm:border-l sm:border-t-0">
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
