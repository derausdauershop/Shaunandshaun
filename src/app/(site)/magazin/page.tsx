import type { Metadata } from "next";
import Link from "next/link";
import { PageHero } from "@/components/site/page-hero";
import { SiteSection } from "@/components/site/section";
import { ARTICLES } from "@/content/articles";

export const metadata: Metadata = {
  title: "Magazin",
  description: "Ratgeber, Training und News von AUSDAUER: Laufschuhe pflegen, Laufuntergründe, Dehnübungen, Erholung und Neuigkeiten aus Betzdorf und Siegen.",
};

export default function MagazinePage() {
  return (
    <>
      <PageHero kicker="Magazin" title={<>Wissen für <span className="italic text-brand">deinen Lauf.</span></>} intro="Ratgeber aus unserer Beratung, Tipps fürs Training und Neuigkeiten aus den Stores." />
      <SiteSection>
        <ul className="grid gap-x-8 gap-y-12 md:grid-cols-2 lg:grid-cols-3">
          {ARTICLES.map((a) => (
            <li key={a.slug}>
              <Link href={`/magazin/${a.slug}`} className="group block h-full border-t-4 border-ink pt-5">
                <p className="font-mono text-xs uppercase tracking-[0.2em] text-brand">{a.category}</p>
                <h2 className="mt-3 text-3xl group-hover:text-brand">{a.title}</h2>
                <p className="mt-2 text-muted-foreground">{a.teaser}</p>
                {a.author && <p className="mt-4 font-mono text-xs uppercase tracking-[0.15em] text-muted-foreground">von {a.author}</p>}
              </Link>
            </li>
          ))}
        </ul>
      </SiteSection>
    </>
  );
}
