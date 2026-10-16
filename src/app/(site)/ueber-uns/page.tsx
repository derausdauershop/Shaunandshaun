import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { PageHero } from "@/components/site/page-hero";
import { SiteSection } from "@/components/site/section";
import { Button } from "@/components/ui/button";
import { COMPANY } from "@/content/site";
import { TeamCard } from "@/components/site/team-card";
import { ADVISORS, LEADERSHIP } from "@/content/team";

export const metadata: Metadata = {
  title: "Über uns & Team",
  description: "Seit 1986 familiengeführt: von 40 m² zu zwei Stores in Betzdorf und Siegen. Lerne das AUSDAUER-Team kennen.",
};

const TIMELINE = [
  { year: "1986", text: "Michael und Bettina Stern eröffnen den Ausdauer-Shop in Betzdorf – auf 40 m²." },
  { year: "1989", text: "Der erste AUSDAUER CUP: Seitdem verbindet die Laufserie die Vereine der Region." },
  { year: "2019", text: "Im September eröffnet unser zweiter Store: Absolute Run Ausdauer in Siegen, 230 m² nur fürs Laufen." },
  { year: "2026", text: "40 Jahre AUSDAUER. Laura Stern-Bätzing und Daniel Bätzing führen das Familienunternehmen in zweiter Generation." },
];

export default function AboutPage() {
  return (
    <>
      <PageHero
        kicker={`Seit ${COMPANY.founded}`}
        title={
          <>
            Wir leben <span className="italic text-brand">Sport.</span>
          </>
        }
        intro="Angefangen haben wir auf 40 m². Heute sind es 400 m² in Betzdorf und 230 m² in Siegen – und ein Team, das selbst läuft, wandert und testet, was es verkauft."
        image="/images/betzdorf-schaufenster.webp"
        imageAlt="Schaufenster des Stores in Betzdorf"
      />

      <SiteSection km={1} kicker="Geschichte" title="Eine Vision. Zwei Menschen. 40 Jahre Ausdauer.">
        <ol className="relative grid gap-8 md:grid-cols-4">
          <span aria-hidden className="absolute left-0 right-0 top-[1.4rem] hidden h-0.5 bg-ink/20 md:block" />
          {TIMELINE.map((t) => (
            <li key={t.year} className="relative">
              <span className="relative inline-block bg-paper pr-3 font-display text-5xl font-black italic text-brand tabular">{t.year}</span>
              <p className="mt-3 text-muted-foreground">{t.text}</p>
            </li>
          ))}
        </ol>
        <div className="mt-12 grid gap-8 lg:grid-cols-2">
          <div className="space-y-4 text-lg">
            <p>
              Unsere Entwicklung verdanken wir vor allem unserem Team und unseren Kundinnen und Kunden, die uns teilweise seit der ersten Stunde
              begleiten. Als Familienunternehmen steht für uns der persönliche Kontakt im Vordergrund.
            </p>
            <p>
              Sport bedeutet für uns Fortschritt. Deshalb testen wir jedes Produkt gründlich, bevor es ins Sortiment kommt, und bilden uns laufend
              weiter.
            </p>
            <Button asChild variant="link" className="px-0 font-display text-lg font-bold uppercase">
              <Link href="/magazin/40-jahre-ausdauer">40 Jahre AUSDAUER – die ganze Geschichte</Link>
            </Button>
          </div>
          <div className="relative aspect-[4/3] overflow-hidden rounded-sm">
            <Image src="/images/team.webp" alt="Das AUSDAUER-Team" fill sizes="(min-width: 1024px) 50vw, 100vw" className="object-cover object-top" />
          </div>
        </div>
      </SiteSection>

      <SiteSection id="team" km={2} kicker="Team" title="Die Menschen hinter AUSDAUER." tone="ink">
        <ul className="grid gap-px overflow-hidden rounded-sm bg-paper/10 sm:grid-cols-2 lg:grid-cols-4">
          {LEADERSHIP.map((m) => (
            <TeamCard key={m.name} member={m} size="lg" />
          ))}
        </ul>
        <ul className="mt-px grid gap-px overflow-hidden rounded-sm bg-paper/10 sm:grid-cols-2 lg:grid-cols-4">
          {ADVISORS.map((m) => (
            <TeamCard key={m.name} member={m} detail={`${m.role} · ${m.stores.map((s) => (s === "betzdorf" ? "Betzdorf" : "Siegen")).join(" & ")}`} />
          ))}
        </ul>
        <Button asChild variant="brand" className="mt-10">
          <Link href="/jobs">Werde Teil des Teams</Link>
        </Button>
      </SiteSection>
    </>
  );
}
