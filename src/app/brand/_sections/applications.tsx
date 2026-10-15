import { BrandLogo } from "@/components/brand/brand-logo";
import { CrownTownLogo } from "@/components/brand/crown-town-logo";
import { DataOverlay } from "@/components/brand/data-overlay";
import { InfinityMark } from "@/components/brand/infinity-mark";
import { KmMarker } from "@/components/brand/km-marker";
import { PaceLines } from "@/components/brand/pace-lines";
import { RunAcademyLogo } from "@/components/brand/run-academy-logo";
import { StartNumber } from "@/components/brand/start-number";
import { TopoLines } from "@/components/brand/topo-lines";
import { Section } from "./section";

function Mock({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <figure>
      {children}
      <figcaption className="mt-3 font-mono text-[0.65rem] uppercase tracking-[0.2em] text-muted-foreground">{label}</figcaption>
    </figure>
  );
}

export function Applications() {
  return (
    <Section
      id="anwendung"
      km={10}
      kicker="Anwendung"
      title="So sieht das draußen aus."
      intro="Drei Welten, ein System: Rot für AUSDAUER, Volt für die Run Academy, Cyan für Siegen. Erste Skizzen – die vollständigen Vorlagen folgen nach Freigabe."
    >
      <div className="grid items-start gap-8 md:grid-cols-3">
        <Mock label="Flyer A5 · Run Academy">
          <div className="surface-ink relative flex aspect-[148/210] flex-col overflow-hidden rounded-sm p-6 shadow-xl">
            <TopoLines className="absolute inset-0 h-full w-full text-signal opacity-20" />
            <RunAcademyLogo surface="dark" className="relative" />
            <div className="relative mt-auto">
              <p className="font-mono text-[0.6rem] uppercase tracking-[0.2em] text-signal">Einsteiger-Laufkurs</p>
              <p className="mt-2 font-display text-5xl font-black uppercase italic leading-[0.85]">
                Von 0 auf
                <br />5 km.
              </p>
              <div className="mt-4 flex items-end justify-between">
                <PaceLines className="w-28 text-signal" count={3} />
                <BrandLogo variant="white" className="h-4" />
              </div>
            </div>
            <StartNumber number="130€" label="8 Wochen" variant="signal" size="sm" className="absolute right-4 top-28 rotate-6" />
          </div>
        </Mock>
        <Mock label="Instagram Post 4:5 · Crown Town Runners">
          <div className="relative flex aspect-[4/5] flex-col overflow-hidden rounded-sm bg-white p-6 text-ink shadow-xl">
            <TopoLines className="absolute inset-0 h-full w-full text-partner opacity-25" />
            <CrownTownLogo className="relative h-10 self-start" />
            <p className="relative mt-auto font-display text-6xl font-black uppercase italic leading-[0.85]">
              Do.
              <br />
              18:30.
              <br />
              <span className="text-partner">Lauf mit.</span>
            </p>
            <div className="relative mt-5 flex items-end justify-between">
              <KmMarker km="5–7" accent="partner" />
              <span className="flex items-center gap-1.5 font-mono text-[0.55rem] uppercase tracking-[0.15em]">
                <InfinityMark className="h-2.5 w-auto" /> powered by Ausdauer
              </span>
            </div>
          </div>
        </Mock>
        <Mock label="Flyer DIN lang · Laufanalyse">
          <div className="relative mx-auto flex aspect-[99/210] w-3/4 flex-col overflow-hidden rounded-sm bg-white p-5 shadow-xl ring-1 ring-border">
            <BrandLogo variant="red" className="h-5 self-start" />
            <p className="mt-6 font-display text-4xl font-black uppercase leading-[0.85]">
              Wir schauen dir auf die <span className="italic text-brand">Füße.</span>
            </p>
            <DataOverlay
              className="mt-6 gap-x-4 p-3 [&_dd]:text-base"
              data={[
                { label: "Pace", value: "5:12" },
                { label: "Kadenz", value: "172" },
              ]}
            />
            <div className="mt-auto space-y-2">
              <KmMarker km={1} label="Video" />
              <KmMarker km={2} label="Druckmessung" />
              <KmMarker km={3} label="Schuh" />
            </div>
          </div>
        </Mock>
      </div>
    </Section>
  );
}
