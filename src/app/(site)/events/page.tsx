import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { PageHero } from "@/components/site/page-hero";
import { SiteSection } from "@/components/site/section";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { COMPANY } from "@/content/site";
import { EVENTS, formatDate, upcomingEvents } from "@/content/events";

export const revalidate = 86400;

export const metadata: Metadata = {
  title: "Events",
  description: "Kommende Läufe und Events von AUSDAUER: AUSDAUER CUP, Abschlussfeier, Lauftreff und mehr.",
};

export default function EventsPage() {
  const events = upcomingEvents(EVENTS, new Date());

  return (
    <>
      <PageHero kicker="Events" title={<>Was als Nächstes <span className="italic text-brand">läuft.</span></>} intro="Cup-Läufe, Abschlussfeier und Community-Termine. Jeden Donnerstag zusätzlich: Crown Town Runners in Siegen." />
      <SiteSection>
        {events.length ? (
          <ol className="divide-y divide-ink/10 border-y border-ink/10">
            {events.map((e) => (
              <li key={`${e.date}-${e.title}`}>
                <Link href={e.href} className="group grid grid-cols-[1fr_auto] items-center gap-4 py-5 sm:grid-cols-[10rem_1fr_auto]">
                  <span className="font-mono tabular">{formatDate(e.date)}</span>
                  <span className="col-span-2 row-start-2 min-w-0 sm:col-span-1 sm:row-start-auto">
                    <span className="block font-display text-2xl font-bold uppercase group-hover:text-brand">{e.title}</span>
                    <span className="text-sm text-muted-foreground">{e.place}</span>
                  </span>
                  <span className="flex items-center gap-3">
                    <Badge variant="secondary">{e.category}</Badge>
                    {e.provisional && <Badge variant="outline">vorläufig</Badge>}
                    <ArrowRight className="size-5 text-muted-foreground" />
                  </span>
                </Link>
              </li>
            ))}
          </ol>
        ) : (
          <div className="rounded-sm bg-white p-10 text-center ring-1 ring-border">
            <p className="font-display text-3xl font-black uppercase italic">Gerade keine Termine geplant.</p>
            <p className="mt-2 text-muted-foreground">Die neuen Termine kommen bald. Bis dahin: Lauftreff jeden Donnerstag in Siegen und Neuigkeiten auf Instagram.</p>
            <Button asChild className="mt-6">
              <a href={COMPANY.instagram} target="_blank" rel="noreferrer">
                Instagram öffnen
              </a>
            </Button>
          </div>
        )}
      </SiteSection>
    </>
  );
}
