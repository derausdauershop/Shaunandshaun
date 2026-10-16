import { CalendarDays, Smartphone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { COMMUNITY_APP } from "@/content/site";
import { cn } from "@/lib/utils";

/** Events, Lauftreffs and registration now live in the community app – the website only points there. */
export function AppStoreButtons({ className }: { className?: string }) {
  return (
    <div className={cn("flex flex-wrap gap-3", className)}>
      <Button asChild variant="signal" size="lg">
        <a href={COMMUNITY_APP.ios} target="_blank" rel="noopener noreferrer">
          <Smartphone aria-hidden /> App Store
        </a>
      </Button>
      <Button asChild variant="signal" size="lg">
        <a href={COMMUNITY_APP.android} target="_blank" rel="noopener noreferrer">
          <Smartphone aria-hidden /> Google Play
        </a>
      </Button>
    </div>
  );
}

export function AppTeaser({ className }: { className?: string }) {
  return (
    <div className={cn("grid gap-8 surface-ink rounded-sm bg-ink p-8 text-paper sm:p-10 lg:grid-cols-[auto_1fr] lg:items-center", className)}>
      <span className="flex size-20 items-center justify-center rounded-2xl bg-partner text-ink" aria-hidden>
        <CalendarDays className="size-10" strokeWidth={1.8} />
      </span>
      <div className="min-w-0">
        <p className="font-mono text-xs uppercase tracking-[0.2em] text-partner">Termine & Anmeldung</p>
        <p className="mt-2 font-display text-3xl font-black uppercase italic leading-none sm:text-4xl">Alle Events in der {COMMUNITY_APP.name} App.</p>
        <p className="mt-3 max-w-2xl text-paper/80">
          Lauftreffs, Test & Try, Cup-Läufe und Firmenlauf: Termine, Anmeldung und Neuigkeiten findest du jetzt in der App – kostenlos für iPhone
          und Android.
        </p>
        <AppStoreButtons className="mt-6" />
      </div>
    </div>
  );
}
