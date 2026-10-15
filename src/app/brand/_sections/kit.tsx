import { DataOverlay } from "@/components/brand/data-overlay";
import { KmMarker } from "@/components/brand/km-marker";
import { PaceLines } from "@/components/brand/pace-lines";
import { StartNumber } from "@/components/brand/start-number";
import { TopoLines } from "@/components/brand/topo-lines";
import { TrackLanes } from "@/components/brand/track-lanes";
import { Section } from "./section";

function Tile({ title, text, children, dark = false, downloads }: { title: string; text: string; children: React.ReactNode; dark?: boolean; downloads?: string[] }) {
  return (
    <figure className="overflow-hidden rounded-sm bg-white ring-1 ring-border">
      <div className={dark ? "surface-ink relative flex h-56 items-center justify-center overflow-hidden p-6" : "relative flex h-56 items-center justify-center overflow-hidden bg-paper p-6"}>
        {children}
      </div>
      <figcaption className="p-5">
        <p className="font-display text-xl font-extrabold uppercase">{title}</p>
        <p className="mt-1 text-sm text-muted-foreground">{text}</p>
        {downloads && (
          <p className="mt-3 flex flex-wrap gap-3 font-mono text-xs">
            {downloads.map((d) => (
              <a key={d} href={d} download className="underline underline-offset-4 hover:text-foreground">
                {d.split("/").pop()}
              </a>
            ))}
          </p>
        )}
      </figcaption>
    </figure>
  );
}

export function Kit() {
  return (
    <Section
      id="kit"
      km={7}
      kicker="Grafik-Kit"
      title="Fünf Elemente. Unendlich viele Flyer."
      intro="Alle Elemente erzählen von Strecke, Tempo und Wissen. Sie werden sparsam kombiniert – maximal zwei pro Medium – und halten Abstand zum Logo."
    >
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Tile
          title="Höhenlinien"
          text="Topografie aus Westerwald & Siegerland. Hintergrundtextur für Flächen, Plakate, Social – in Stone auf Paper oder Signal auf Ink (20–30 % Deckkraft)."
          dark
          downloads={["/brand/elements/topo-ink.svg", "/brand/elements/topo-volt.svg"]}
        >
          <TopoLines className="absolute inset-0 h-full w-full text-signal opacity-60" />
        </Tile>
        <Tile
          title="Pace-Lines"
          text="Diagonale Tempo-Streifen. Akzent an Bildkanten, hinter Headlines oder als Bewegung im Video."
          downloads={["/brand/elements/pace-lines-ink.svg", "/brand/elements/pace-lines-volt.svg"]}
        >
          <PaceLines className="w-4/5 text-ink" count={5} />
        </Tile>
        <Tile title="Startnummer" text="Badge für Preise, Kursstarts, Aktionen und Event-Daten. Immer mit vier Sicherheitsnadel-Punkten.">
          <StartNumber number="130€" label="Run Academy" sublabel="Einsteigerkurs" variant="signal" className="-rotate-3" />
        </Tile>
        <Tile title="Kilometer-Marker" text="Nummeriert Abschnitte, Schritte und Kapitel – auf Flyern, im Web, in Präsentationen.">
          <div className="space-y-4">
            <KmMarker km={1} label="Analyse" />
            <KmMarker km={2} label="Beratung" />
            <KmMarker km={3} label="Laufen" />
          </div>
        </Tile>
        <Tile title="Bahnlinien" text="Laufbahn als Raster und Trenner. Für Kurspläne, Zeitpläne, Eventkalender." dark>
          <TrackLanes lanes={4} className="w-full text-paper" />
        </Tile>
        <Tile title="Daten-Overlay" text="Laufanalyse-Look für Expertise-Themen: Werte in Mono, Eckwinkel als Rahmen. Auch über Fotos.">
          <DataOverlay
            data={[
              { label: "Pace", value: "5:12", unit: "/km" },
              { label: "Kadenz", value: "172", unit: "spm" },
              { label: "Bodenkontakt", value: "238", unit: "ms" },
              { label: "Pronation", value: "neutral" },
            ]}
          />
        </Tile>
      </div>
    </Section>
  );
}
