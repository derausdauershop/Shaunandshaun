"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { SeriesTrack } from "@/components/brand/cup-logo";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CUP, CUP_RACES } from "@/content/cup";
import { useToday } from "@/hooks/use-today";
import { formatDate } from "@/lib/dates";

const doneRaces = (today: string) => CUP_RACES.filter((r) => r.date < today).map((r) => r.no);

/** "x von 8 Läufen gelaufen" + series track, computed in the browser. */
export function CupProgress({ buildDay, prefix }: { buildDay: string; prefix?: string }) {
  const done = doneRaces(useToday(buildDay));
  return (
    <>
      <p className="mb-2 font-mono text-xs uppercase tracking-[0.2em] text-muted-foreground">
        {prefix}
        {done.length} von {CUP_RACES.length} Läufen gelaufen
      </p>
      <SeriesTrack total={CUP_RACES.length} done={done} final />
    </>
  );
}

/** Next race card on the home page. */
export function CupNextRace({ buildDay }: { buildDay: string }) {
  const today = useToday(buildDay);
  const nextRace = CUP_RACES.filter((r) => r.date >= today).sort((a, b) => a.date.localeCompare(b.date))[0];
  return nextRace ? (
    <>
      <p className="font-mono text-xs uppercase tracking-[0.2em] text-brand">Nächster Termin</p>
      <p className="mt-3 font-display text-4xl font-black uppercase italic leading-none">
        {nextRace.name} {nextRace.place}
      </p>
      <p className="mt-2 font-mono tabular">{formatDate(nextRace.date)}</p>
      <Button asChild variant="brand" className="mt-6">
        <Link href={`/ausdauer-cup/${nextRace.slug}`}>Infos & Anmeldung</Link>
      </Button>
    </>
  ) : (
    <>
      <p className="font-mono text-xs uppercase tracking-[0.2em] text-brand">Saison {CUP.nextSeason}</p>
      <p className="mt-3 font-display text-4xl font-black uppercase italic leading-none">Die Termine folgen.</p>
      <p className="mt-2 text-muted-foreground">Der {CUP.edition + 1}. AUSDAUER CUP startet im Januar.</p>
      <Button asChild variant="brand" className="mt-6">
        <Link href="/ausdauer-cup">Zum AUSDAUER CUP</Link>
      </Button>
    </>
  );
}

/** Badge + arrow of a race row in the season list. */
export function CupRaceState({ buildDay, date, provisional }: { buildDay: string; date: string; provisional?: boolean }) {
  const past = date < useToday(buildDay);
  return (
    <span className="flex items-center gap-3">
      {past ? <Badge variant="secondary">Gelaufen</Badge> : provisional ? <Badge variant="outline">Termin unter Vorbehalt</Badge> : null}
      <ArrowRight className="size-5 text-muted-foreground transition-transform group-hover:translate-x-1" />
    </span>
  );
}
