import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { StartNumber } from "@/components/brand/start-number";
import { PageHero } from "@/components/site/page-hero";
import { SiteSection } from "@/components/site/section";
import { Button } from "@/components/ui/button";
import { COURSES, courseBySlug } from "@/content/academy";
import { COMPANY } from "@/content/site";

export function generateStaticParams() {
  return COURSES.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const c = courseBySlug((await params).slug);
  return c ? { title: `${c.title} · Run Academy`, description: c.summary } : {};
}

export default async function CoursePage({ params }: { params: Promise<{ slug: string }> }) {
  const c = courseBySlug((await params).slug);
  if (!c) notFound();
  const interest = `mailto:${COMPANY.email}?subject=${encodeURIComponent(`Interesse Run Academy: ${c.title}`)}`;

  return (
    <>
      <PageHero kicker="Run Academy" accent="signal" title={c.title} intro={c.summary}>
        <div className="flex flex-wrap items-center gap-6">
          {c.start ? (
            <StartNumber number={c.start} label="Kursstart" sublabel={c.title} variant="signal" className="rotate-3" />
          ) : (
            c.price && <StartNumber number={c.price.replace(" ", "")} label="Kurs" variant="signal" />
          )}
          {c.status === "buchbar" && c.bookingUrl ? (
            <Button asChild variant="signal" size="lg">
              <a href={c.bookingUrl} target="_blank" rel="noreferrer">
                Jetzt anmelden
              </a>
            </Button>
          ) : (
            <Button asChild variant="signal" size="lg">
              <a href={interest}>Interesse melden</a>
            </Button>
          )}
        </div>
      </PageHero>
      {c.facts && (
        <section className="border-b border-ink/10 bg-white px-4 py-10 sm:px-8">
          <dl className="mx-auto grid max-w-7xl gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {c.facts.map((f) => (
              <div key={f.label} className="border-t-4 border-signal pt-3">
                <dt className="font-mono text-xs uppercase tracking-[0.2em] text-muted-foreground">{f.label}</dt>
                <dd className="mt-1 font-display text-3xl font-black uppercase italic leading-none">{f.value}</dd>
              </div>
            ))}
          </dl>
        </section>
      )}
      <SiteSection>
        <div className="grid gap-10 lg:grid-cols-2">
          <div>
            <h2 className="text-4xl">{c.status === "in-planung" ? "Geplante Inhalte" : "Kursinhalt"}</h2>
            <ul className="mt-6 space-y-3">
              {c.contents.map((item) => (
                <li key={item} className="flex gap-3 text-lg">
                  <span aria-hidden className="mt-2 size-2.5 shrink-0 rotate-45 bg-signal ring-1 ring-ink/20" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
          {c.includes && (
            <div className="rounded-sm bg-white p-6 ring-1 ring-border">
              <h2 className="text-3xl">Inklusive</h2>
              <ul className="mt-4 space-y-2 text-muted-foreground">
                {c.includes.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
        {c.note && <p className="mt-10 max-w-2xl border-l-4 border-signal pl-4 text-muted-foreground">{c.note}</p>}
        {c.status === "demnaechst" && (
          <p className="mt-10 max-w-2xl border-l-4 border-signal pl-4 text-muted-foreground">
            Der nächste Kurs startet im {c.start}. Die Anmeldung öffnet, sobald die Termine feststehen. Melde dein Interesse, dann sagen wir dir
            Bescheid.
          </p>
        )}
        {c.status === "in-planung" && (
          <p className="mt-10 max-w-2xl border-l-4 border-signal pl-4 text-muted-foreground">
            Dieser Kurs ist in Planung. Termine und Preis stehen noch nicht fest – melde dein Interesse und wir informieren dich, sobald es losgeht.
          </p>
        )}
        <Button asChild variant="link" className="mt-8 px-0 font-display text-lg font-bold uppercase">
          <Link href="/run-academy">← Alle Kurse</Link>
        </Button>
      </SiteSection>
    </>
  );
}
