import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { CupLogo } from "@/components/brand/cup-logo";
import { PageHero } from "@/components/site/page-hero";
import { SiteSection } from "@/components/site/section";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CUP, CUP_RACES, raceBySlug } from "@/content/cup";
import { formatDate } from "@/content/events";

export function generateStaticParams() {
  return CUP_RACES.map((r) => ({ slug: r.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const r = raceBySlug((await params).slug);
  return r ? { title: `${r.name} ${r.place} · AUSDAUER CUP`, description: `Lauf ${r.no} des AUSDAUER CUP ${CUP.season} am ${formatDate(r.date)}. ${r.course}` } : {};
}

export default async function RacePage({ params }: { params: Promise<{ slug: string }> }) {
  const r = raceBySlug((await params).slug);
  if (!r) notFound();
  const next = CUP_RACES.find((x) => x.no === r.no + 1);

  return (
    <>
      <PageHero
        kicker={`AUSDAUER CUP · Lauf ${r.no} von ${CUP_RACES.length}`}
        title={
          <>
            {r.name} <span className="italic text-brand">{r.place}</span>
          </>
        }
        intro={
          <>
            <span className="font-mono text-paper tabular">{formatDate(r.date, { weekday: "long", day: "2-digit", month: "long", year: "numeric" })}</span>
            {r.provisional && <Badge variant="outline" className="ml-3 border-paper/40 text-paper">Termin unter Vorbehalt</Badge>}
            <span className="mt-2 block">{r.venue}</span>
          </>
        }
      >
        <div className="flex flex-wrap items-center gap-4">
          {r.registrationUrl ? (
            <Button asChild variant="brand" size="lg">
              <a href={r.registrationUrl} target="_blank" rel="noreferrer">
                Anmeldung bei RaceResult
              </a>
            </Button>
          ) : (
            <p className="text-muted-foreground">Die Anmeldung läuft über RaceResult – der Link folgt.</p>
          )}
          <CupLogo color="negativ" className="h-8" />
        </div>
      </PageHero>
      <SiteSection>
        <div className="grid gap-10 lg:grid-cols-[1.3fr_1fr]">
          <div>
            <h2 className="text-4xl">Startzeiten & Startgeld</h2>
            <div className="mt-6 overflow-x-auto rounded-sm bg-white ring-1 ring-border">
              <table className="w-full text-left">
                <thead className="border-b border-ink/10 font-mono text-xs uppercase tracking-[0.15em] text-muted-foreground">
                  <tr>
                    <th scope="col" className="px-4 py-3">Start</th>
                    <th scope="col" className="px-4 py-3">Lauf</th>
                    <th scope="col" className="px-4 py-3 text-right">Startgeld</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-ink/10">
                  {r.starts.map((s) => (
                    <tr key={`${s.time}-${s.name}`}>
                      <td className="px-4 py-3 font-mono tabular">{s.time}</td>
                      <td className="px-4 py-3">{s.name}</td>
                      <td className="px-4 py-3 text-right font-mono tabular">{s.fee ?? "–"}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <h2 className="mt-12 text-4xl">Strecke</h2>
            <p className="mt-4 text-lg">{r.course}</p>
          </div>
          <aside className="space-y-6">
            {r.registrationNote && (
              <div className="rounded-sm bg-white p-6 ring-1 ring-border">
                <h2 className="text-2xl">Anmeldung</h2>
                <p className="mt-2 text-muted-foreground">{r.registrationNote}</p>
              </div>
            )}
            <div className="rounded-sm bg-white p-6 ring-1 ring-border">
              <h2 className="text-2xl">Gut zu wissen</h2>
              <ul className="mt-2 space-y-2 text-muted-foreground">
                {r.notes.map((n) => (
                  <li key={n}>{n}</li>
                ))}
              </ul>
            </div>
            <p className="text-sm text-muted-foreground">Infos zur Saison {CUP.season}. Änderungen durch den ausrichtenden Verein vorbehalten.</p>
          </aside>
        </div>
        <div className="mt-12 flex flex-wrap gap-3">
          <Button asChild variant="outline">
            <Link href="/ausdauer-cup">← Alle Läufe & Modus</Link>
          </Button>
          {next && (
            <Button asChild variant="outline">
              <Link href={`/ausdauer-cup/${next.slug}`}>
                Lauf {next.no}: {next.name} →
              </Link>
            </Button>
          )}
        </div>
      </SiteSection>
    </>
  );
}
