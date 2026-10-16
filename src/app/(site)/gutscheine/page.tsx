import type { Metadata } from "next";
import { PageHero } from "@/components/site/page-hero";
import { SiteSection } from "@/components/site/section";
import { VoucherForm } from "@/components/site/voucher-form";
import { VOUCHER_FACTS } from "@/content/voucher";

export const metadata: Metadata = {
  title: "Gutscheine",
  description: "AUSDAUER Geschenk-Gutschein ab 10 € – sofort per E-Mail oder zum Wunschtermin an die beschenkte Person. Einlösbar in Betzdorf und Siegen.",
};

export default function VoucherPage() {
  return (
    <>
      <PageHero
        kicker="Geschenk-Gutschein"
        title={
          <>
            Verschenk <span className="italic text-brand">Kilometer.</span>
          </>
        }
        intro="Für Laufschuhe, Laufanalyse, Einlagen, Outdoor oder den nächsten Lauftreff-Look: Der AUSDAUER Gutschein passt immer."
      />
      <SiteSection>
        <VoucherForm />
      </SiteSection>
      <SiteSection km={1} kicker="So funktioniert's" title="Kaufen, verschenken, einlösen." tone="white">
        <ul className="grid gap-6 md:grid-cols-3">
          {VOUCHER_FACTS.map((f) => (
            <li key={f.title} className="border-t-4 border-brand pt-4">
              <h3 className="font-display text-2xl font-black uppercase">{f.title}</h3>
              <p className="mt-2 text-muted-foreground">{f.text}</p>
            </li>
          ))}
        </ul>
      </SiteSection>
    </>
  );
}
