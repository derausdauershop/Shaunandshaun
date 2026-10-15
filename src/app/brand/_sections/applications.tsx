import { BrandLogo } from "@/components/brand/brand-logo";
import { DataOverlay } from "@/components/brand/data-overlay";
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
      intro="Erste Skizzen für Flyer und Social. Die vollständigen Vorlagen (Flyer, Plakat, Geschäftsausstattung, Social-Templates) folgen nach Freigabe der Markenbasis."
    >
      <div className="grid items-start gap-8 md:grid-cols-3">
        <Mock label="Flyer A5 · Run Academy">
          <div className="surface-ink relative flex aspect-[148/210] flex-col overflow-hidden rounded-sm p-6 shadow-xl">
            <TopoLines className="absolute inset-0 h-full w-full text-signal opacity-20" />
            <RunAcademyLogo className="relative [&_svg]:text-signal" />
            <div className="relative mt-auto">
              <p className="font-mono text-[0.6rem] uppercase tracking-[0.2em] text-signal">Einsteiger-Laufkurs</p>
              <p className="mt-2 font-display text-5xl font-black uppercase italic leading-[0.85]">
                Von 0 auf
                <br />5 km.
              </p>
              <PaceLines className="mt-4 w-32 text-signal" count={3} />
            </div>
            <StartNumber number="130€" label="8 Wochen" variant="signal" size="sm" className="absolute right-4 top-24 rotate-6" />
          </div>
        </Mock>
        <Mock label="Instagram Post 4:5 · Run Club">
          <div className="relative flex aspect-[4/5] flex-col overflow-hidden rounded-sm bg-signal p-6 text-signal-foreground shadow-xl">
            <TopoLines className="absolute inset-0 h-full w-full text-ink opacity-15" />
            <p className="relative font-mono text-xs uppercase tracking-[0.2em]">Community Run · Siegen</p>
            <p className="relative mt-4 font-display text-6xl font-black uppercase italic leading-[0.85]">
              Do.
              <br />
              18:30.
              <br />
              Lauf mit.
            </p>
            <div className="relative mt-auto flex items-end justify-between">
              <KmMarker km="5–7" label="km" />
              <BrandLogo className="h-6 text-lg" />
            </div>
          </div>
        </Mock>
        <Mock label="Flyer DIN lang · Laufanalyse">
          <div className="relative mx-auto flex aspect-[99/210] w-3/4 flex-col overflow-hidden rounded-sm bg-paper p-5 shadow-xl ring-1 ring-border">
            <BrandLogo className="h-6 text-lg" />
            <p className="mt-6 font-display text-4xl font-black uppercase leading-[0.85]">
              Wir schauen dir auf die <span className="italic">Füße.</span>
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
