import type { Metadata } from "next";
import Link from "next/link";
import { RunAcademyLogo } from "@/components/brand/run-academy-logo";
import { StartNumber } from "@/components/brand/start-number";
import { PageHero } from "@/components/site/page-hero";
import { SiteSection } from "@/components/site/section";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { COURSES, courseStatusLabel } from "@/content/academy";

export const metadata: Metadata = {
  title: "Run Academy",
  description: "Die Laufschule von AUSDAUER: Einsteiger-Laufkurs, 10 km & Halbmarathon, Lauf-ABC & Technik. Besser. Laufen. Lernen.",
};

export default function AcademyPage() {
  return (
    <>
      <PageHero
        kicker="Run Academy"
        accent="signal"
        title={
          <>
            Besser. Laufen. <span className="italic text-signal">Lernen.</span>
          </>
        }
        intro="Die Laufschule von AUSDAUER: in der Gruppe, mit Coach und mit Plan – vom ersten Kilometer bis zur Bestzeit."
      >
        <RunAcademyLogo surface="dark" endorsed />
      </PageHero>
      <SiteSection km={1} kicker="Kurse" title="Finde deinen Kurs." accent="signal">
        <ul className="grid gap-6 lg:grid-cols-3">
          {COURSES.map((c) => (
            <li key={c.slug} className="flex flex-col rounded-sm bg-white p-6 ring-1 ring-border">
              <div className="flex items-start justify-between gap-4">
                <Badge variant={c.status === "in-planung" ? "outline" : "default"} className="font-mono uppercase tracking-[0.15em]">
                  {courseStatusLabel(c)}
                </Badge>
                {c.start ? (
                  <StartNumber number={c.start} label="Kursstart" variant="signal" size="sm" className="-mt-2 rotate-3" />
                ) : (
                  c.price && <StartNumber number={c.price.replace(" ", "")} variant="signal" size="sm" className="-mt-2 rotate-3" />
                )}
              </div>
              <h2 className="mt-6 text-4xl">{c.title}</h2>
              <p className="mt-1 font-mono text-xs uppercase tracking-[0.15em] text-muted-foreground">{c.level}</p>
              <p className="mt-4 flex-1 text-muted-foreground">{c.summary}</p>
              <Button asChild variant={c.status === "in-planung" ? "outline" : "signal"} className="mt-6 self-start">
                <Link href={`/run-academy/${c.slug}`}>{c.status === "buchbar" ? "Details & Anmeldung" : "Mehr erfahren"}</Link>
              </Button>
            </li>
          ))}
        </ul>
      </SiteSection>
    </>
  );
}
