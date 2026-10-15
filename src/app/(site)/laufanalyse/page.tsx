import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { DataOverlay } from "@/components/brand/data-overlay";
import { PageHero } from "@/components/site/page-hero";
import { SiteSection } from "@/components/site/section";
import { Button } from "@/components/ui/button";
import { ANALYSIS_STEPS, SERVICES } from "@/content/services";
import { COMPANY } from "@/content/site";

export const metadata: Metadata = {
  title: "Laufanalyse & Service",
  description: "Laufschuhberatung mit Fußdruckmessung (Currex), Videoanalyse (Dartfish) und Probelauf. Dazu Einlagen, Bonussystem, Gutscheine und Textildruck.",
};

export default function AnalysisPage() {
  return (
    <>
      <PageHero
        kicker="Laufanalyse & Service"
        title={
          <>
            Erst laufen. <span className="italic text-brand">Dann kaufen.</span>
          </>
        }
        intro="Wir schauen dir auf die Füße – per Fußdruckmessung und Video – und finden den Schuh, der zu deinem Laufstil passt. Ohne Termin, in beiden Stores."
        image="/images/betzdorf-beratung.webp"
        imageAlt="Beratungsecke im Store Betzdorf"
      />

      <SiteSection km={1} kicker="Ablauf" title="Fünf Schritte zu deinem Schuh.">
        <ol className="grid gap-px overflow-hidden rounded-sm bg-border md:grid-cols-5">
          {ANALYSIS_STEPS.map((s, i) => (
            <li key={s.title} className="bg-white p-6">
              <span className="font-display text-5xl font-black italic text-brand tabular">{String(i + 1).padStart(2, "0")}</span>
              <h3 className="mt-3 text-2xl">{s.title}</h3>
              <p className="mt-2 text-muted-foreground">{s.text}</p>
            </li>
          ))}
        </ol>
      </SiteSection>

      <SiteSection km={2} kicker="Technik" title="Messen statt raten." tone="ink">
        <div className="grid gap-8 lg:grid-cols-2">
          {[
            { img: "/images/betzdorf-fussanalyse.webp", title: "Fußdruckmessung", text: "Der Currex Motionquest Neo zeigt, wie sich die Belastung beim Stehen und Gehen über deinen Fuß verteilt.", data: [{ label: "System", value: "Currex" }, { label: "Messung", value: "Fußdruck" }] },
            { img: "/images/siegen-laufbahn.webp", title: "Videoanalyse", text: "Auf unserer Laufbahn filmen wir deinen Laufstil. Mit Dartfish sehen wir in Zeitlupe, was dein Fuß beim Aufsetzen macht.", data: [{ label: "System", value: "Dartfish" }, { label: "Auf der", value: "Laufbahn" }] },
          ].map((t) => (
            <figure key={t.title} className="overflow-hidden rounded-sm bg-card ring-1 ring-border">
              <div className="relative aspect-[4/3]">
                <Image src={t.img} alt={t.title} fill sizes="(min-width: 1024px) 50vw, 100vw" className="object-cover" />
                <DataOverlay className="absolute bottom-4 left-4 bg-ink/80 backdrop-blur" data={t.data} />
              </div>
              <figcaption className="p-6">
                <h3 className="text-3xl">{t.title}</h3>
                <p className="mt-2 text-muted-foreground">{t.text}</p>
              </figcaption>
            </figure>
          ))}
        </div>
      </SiteSection>

      <SiteSection km={3} kicker="Service" title="Mehr als Schuhe.">
        <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {SERVICES.map((s) => (
            <li key={s.title} className="rounded-sm bg-white p-6 ring-1 ring-border">
              <h3 className="text-2xl">{s.title}</h3>
              <p className="mt-2 text-muted-foreground">{s.text}</p>
            </li>
          ))}
        </ul>
        <div className="mt-10 flex flex-wrap gap-3">
          <Button asChild variant="brand" size="lg">
            <Link href="/stores">Store finden</Link>
          </Button>
          <Button asChild variant="outline" size="lg">
            <a href={COMPANY.voucher} target="_blank" rel="noreferrer">
              Gutschein kaufen
            </a>
          </Button>
        </div>
      </SiteSection>
    </>
  );
}
