import type { Metadata } from "next";
import Link from "next/link";
import { PageHero } from "@/components/site/page-hero";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "Danke für deine Bestellung",
  robots: { index: false, follow: false },
};

/** Return page after the Shopify checkout. */
export default function OrderCompletePage() {
  return (
    <PageHero
      kicker="Bestellung abgeschlossen"
      title={
        <>
          Danke! <span className="italic text-brand">Viel Freude damit.</span>
        </>
      }
      intro="Die Bestellbestätigung und den Gutschein bekommst du per E-Mail. Hast du ihn verschenkt, geht er zum gewählten Termin an die beschenkte Person."
    >
      <Button asChild variant="brand" size="lg">
        <Link href="/">Zur Startseite</Link>
      </Button>
    </PageHero>
  );
}
