/* eslint-disable @next/next/no-img-element -- social artboards use plain <img> so PNG exports embed the original files */
import { Footprints, Gift, MapPin, Users } from "lucide-react";
import { BrandLogo } from "@/components/brand/brand-logo";
import { CrownTownLogo } from "@/components/brand/crown-town-logo";
import { SeriesTrack } from "@/components/brand/cup-logo";
import { DataOverlay } from "@/components/brand/data-overlay";
import { InfinityMark } from "@/components/brand/infinity-mark";
import { KmMarker } from "@/components/brand/km-marker";
import { PaceLines } from "@/components/brand/pace-lines";
import { RunAcademyIcon, RunAcademyLogo } from "@/components/brand/run-academy-logo";
import { StartNumber } from "@/components/brand/start-number";
import { TopoLines } from "@/components/brand/topo-lines";
import { cupLogo } from "@/lib/brand/cup";
import { CUP_RACES } from "@/content/cup";
import { formatDate } from "@/content/events";
import { cn } from "@/lib/utils";
import { Artboard } from "./artboard";

const POST = "h-[1350px] w-[1080px]";
const STORY = "h-[1920px] w-[1080px]";
const HANDLE = "@ausdauer.shop";

/* ---------- Posts 4:5 ---------- */

export function PostAnalysis() {
  return (
    <Artboard className={cn(POST, "surface-ink bg-ink text-paper")}>
      <img src="/images/betzdorf-fussanalyse.webp" alt="" className="absolute inset-x-0 top-0 h-[760px] w-full object-cover" />
      <div className="absolute inset-x-0 top-[560px] h-[200px] bg-gradient-to-b from-transparent to-ink" />
      <DataOverlay
        className="absolute left-[72px] top-[72px] scale-[1.6] origin-top-left bg-ink/85 text-paper"
        data={[
          { label: "Fuß", value: "3D-Scan" },
          { label: "Bewegung", value: "Video" },
        ]}
      />
      <div className="absolute inset-x-[72px] bottom-[72px]">
        <p className="font-mono text-[26px] uppercase tracking-[0.25em] text-brand">Laufanalyse · ohne Termin</p>
        <p className="mt-[20px] font-display text-[150px] font-black uppercase leading-[0.82]">
          Erst laufen.
          <br />
          <span className="italic text-brand">Dann kaufen.</span>
        </p>
        <div className="mt-[48px] flex items-end justify-between">
          <BrandLogo variant="white" className="h-[44px]" />
          <span className="font-mono text-[24px] uppercase tracking-[0.15em] text-paper/70">Betzdorf · Siegen</span>
        </div>
      </div>
    </Artboard>
  );
}

export function PostAcademy() {
  return (
    <Artboard className={cn(POST, "surface-ink bg-ink text-paper")}>
      <TopoLines className="absolute inset-0 h-full w-full text-signal opacity-25" />
      <div className="relative flex h-full flex-col p-[72px]">
        <RunAcademyLogo surface="dark" className="origin-top-left scale-[2.2]" />
        <StartNumber number="130€" label="Kursstart" sublabel="8 Wochen" variant="signal" className="absolute right-[90px] top-[300px] rotate-6 scale-[2]" />
        <div className="mt-auto">
          <p className="font-display text-[190px] font-black uppercase italic leading-[0.8]">
            Von 0 auf
            <br />
            <span className="text-signal">5 km.</span>
          </p>
          <p className="mt-[36px] max-w-[760px] text-[36px] leading-snug text-paper/85">Einsteiger-Laufkurs mit Coach, Trainingsplan und Gruppe.</p>
          <div className="mt-[48px] flex items-end justify-between">
            <PaceLines className="w-[220px] text-signal" count={3} />
            <span className="font-mono text-[26px] uppercase tracking-[0.15em]">Link in Bio</span>
          </div>
        </div>
      </div>
    </Artboard>
  );
}

export function PostCupRace() {
  const race = CUP_RACES[CUP_RACES.length - 1];
  return (
    <Artboard className={cn(POST, "bg-white text-ink")}>
      <TopoLines className="absolute inset-0 h-full w-full text-stone opacity-30" />
      <div className="relative flex h-full flex-col p-[72px]">
        <img src={cupLogo("", "farbig")} alt="" className="h-[110px] w-auto self-start" />
        <div className="mt-auto">
          <p className="font-mono text-[28px] uppercase tracking-[0.25em] text-brand">
            Lauf {race.no} von {CUP_RACES.length} · {formatDate(race.date, { weekday: "long", day: "2-digit", month: "2-digit" })}
          </p>
          <p className="mt-[20px] font-display text-[118px] font-black uppercase leading-[0.85]">{race.name}</p>
          <p className="font-display text-[118px] font-black uppercase italic leading-[0.85] text-brand">{race.place}</p>
          <SeriesTrack total={CUP_RACES.length} done={CUP_RACES.slice(0, -1).map((r) => r.no)} final className="mt-[56px] origin-left scale-[1.9] w-[52%]" />
          <p className="mt-[72px] text-[34px] leading-snug">Das Saisonfinale vor der Abschlussfeier. Anmeldung über RaceResult – Link in Bio.</p>
        </div>
      </div>
    </Artboard>
  );
}

export function PostCrownTown() {
  return (
    <Artboard className={cn(POST, "bg-white text-ink")}>
      <img src="/images/crown-town-runners.webp" alt="" className="absolute inset-x-0 top-0 h-[700px] w-full object-cover" />
      <div className="absolute inset-x-0 top-[700px] h-[8px] bg-partner" />
      <div className="absolute inset-x-[72px] bottom-[72px] top-[760px] flex flex-col">
        <p className="font-display text-[130px] font-black uppercase italic leading-[0.82]">
          Donnerstag. 18:30.
          <br />
          <span className="text-partner">Lauf mit.</span>
        </p>
        <div className="mt-auto flex items-end justify-between">
          <CrownTownLogo className="h-[110px]" />
          <span className="flex items-center gap-[10px] font-mono text-[22px] uppercase tracking-[0.15em]">
            <InfinityMark className="h-[20px] w-auto" /> powered by AUSDAUER
          </span>
        </div>
      </div>
    </Artboard>
  );
}

export function PostVoucher() {
  return (
    <Artboard className={cn(POST, "bg-brand text-white")}>
      <InfinityMark variant="track" strokeWidth={4} className="absolute -right-[260px] top-[160px] h-[760px] w-auto text-white/25" />
      <div className="relative flex h-full flex-col p-[72px]">
        <BrandLogo variant="white" className="h-[56px] self-start" />
        <div className="mt-auto">
          <p className="font-mono text-[28px] uppercase tracking-[0.25em] text-white/80">Geschenk-Gutschein</p>
          <p className="mt-[20px] font-display text-[190px] font-black uppercase italic leading-[0.8]">
            Verschenk
            <br />
            Kilometer.
          </p>
          <p className="mt-[40px] max-w-[820px] text-[36px] leading-snug text-white/90">Ab 10 € – online gekauft, sofort per E-Mail, einlösbar in Betzdorf und Siegen.</p>
          <p className="mt-[48px] font-mono text-[26px] uppercase tracking-[0.15em]">Link in Bio · {HANDLE}</p>
        </div>
      </div>
    </Artboard>
  );
}

/* ---------- Stories 9:16 ---------- */

export function StoryCupCountdown() {
  const race = CUP_RACES[CUP_RACES.length - 1];
  return (
    <Artboard className={cn(STORY, "surface-ink bg-ink text-paper")}>
      <TopoLines className="absolute inset-0 h-full w-full text-stone opacity-25" />
      <div className="relative flex h-full flex-col px-[80px] pb-[260px] pt-[220px]">
        <img src={cupLogo("", "negativ")} alt="" className="h-[96px] w-auto self-start" />
        <div className="mt-auto">
          <p className="font-display text-[110px] font-black uppercase leading-none text-paper/60">Noch</p>
          <p className="font-display text-[480px] font-black italic leading-[0.8] text-brand tabular">7</p>
          <p className="font-display text-[110px] font-black uppercase leading-none">Tage bis</p>
          <p className="mt-[40px] font-display text-[96px] font-black uppercase italic leading-[0.9]">
            {race.name} {race.place}
          </p>
          <p className="mt-[24px] font-mono text-[32px] uppercase tracking-[0.2em] text-paper/70">
            {formatDate(race.date, { weekday: "long", day: "2-digit", month: "long" })}
          </p>
        </div>
      </div>
    </Artboard>
  );
}

export function StoryCrownTownToday() {
  return (
    <Artboard className={cn(STORY, "bg-partner text-ink")}>
      <TopoLines className="absolute inset-0 h-full w-full text-white opacity-30" />
      <div className="relative flex h-full flex-col px-[80px] pb-[260px] pt-[220px]">
        <div className="self-start bg-white px-[28px] py-[20px]">
          <CrownTownLogo className="h-[110px]" />
        </div>
        <div className="mt-auto">
          <p className="font-display text-[260px] font-black uppercase italic leading-[0.8]">
            Heute.
            <br />
            18:30.
          </p>
          <p className="mt-[48px] text-[44px] leading-snug">Treffpunkt: Absolute Run Ausdauer, Koblenzer Straße 40, Siegen. 5–7 km, jedes Tempo.</p>
          <KmMarker km="5–7" label="km" accent="brand" className="mt-[56px] origin-left scale-[2.4]" />
        </div>
      </div>
    </Artboard>
  );
}

/* ---------- Highlight covers & avatar ---------- */

function Cover({ label, children, tone = "ink" }: { label: string; children: React.ReactNode; tone?: "ink" | "brand" | "signal" }) {
  const bg = { ink: "bg-ink text-paper", brand: "bg-brand text-white", signal: "bg-signal text-ink" }[tone];
  return (
    <Artboard className={cn(STORY, bg)}>
      <div className="absolute left-1/2 top-1/2 flex size-[640px] -translate-x-1/2 -translate-y-1/2 flex-col items-center justify-center gap-[36px]">
        {children}
        <span className="sr-only">{label}</span>
      </div>
    </Artboard>
  );
}

export const CoverStores = () => (
  <Cover label="Stores">
    <MapPin className="size-[300px] text-brand" strokeWidth={1.8} />
  </Cover>
);
export const CoverAnalysis = () => (
  <Cover label="Laufanalyse">
    <Footprints className="size-[300px] text-brand" strokeWidth={1.8} />
  </Cover>
);
export const CoverAcademy = () => (
  <Cover label="Run Academy" tone="signal">
    <RunAcademyIcon className="h-[260px]" />
  </Cover>
);
export const CoverCup = () => (
  <Cover label="AUSDAUER CUP">
    <img src="/brand/cup/ausdauer-cup-icon.svg" alt="" className="h-[260px] w-auto" />
  </Cover>
);
export const CoverCommunity = () => (
  <Cover label="Community">
    <Users className="size-[300px] text-partner" strokeWidth={1.8} />
  </Cover>
);
export const CoverVoucher = () => (
  <Cover label="Gutscheine" tone="brand">
    <Gift className="size-[300px]" strokeWidth={1.8} />
  </Cover>
);

export function Avatar() {
  return (
    <Artboard className="h-[1080px] w-[1080px] bg-brand">
      <div className="absolute inset-0 flex items-center justify-center">
        <InfinityMark className="h-auto w-[640px] text-white" />
      </div>
    </Artboard>
  );
}
