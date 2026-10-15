/* eslint-disable @next/next/no-img-element -- print artboards use plain <img> so exports embed the original files */
import { BrandLogo } from "@/components/brand/brand-logo";
import { CrownTownLogo } from "@/components/brand/crown-town-logo";
import { CupLogo, SeriesTrack } from "@/components/brand/cup-logo";
import { DataOverlay } from "@/components/brand/data-overlay";
import { InfinityMark } from "@/components/brand/infinity-mark";
import { KmMarker } from "@/components/brand/km-marker";
import { PaceLines } from "@/components/brand/pace-lines";
import { RunAcademyLogo } from "@/components/brand/run-academy-logo";
import { StartNumber } from "@/components/brand/start-number";
import { TopoLines } from "@/components/brand/topo-lines";
import { courseBySlug } from "@/content/academy";
import { CUP, CUP_FINAL, CUP_RACES } from "@/content/cup";
import { formatDate } from "@/content/events";
import { ANALYSIS_STEPS } from "@/content/services";
import { COMPANY } from "@/content/site";
import { Artboard, StoreLine } from "./artboard";
import { QrCode } from "./qr-code";

/** Future main domain (PROJ-10). QR codes point here. */
export const SITE = "https://ausdauer.shop";
const DOMAIN = "ausdauer.shop";

const course = courseBySlug("einsteiger-laufkurs")!;

/* ---------- Run Academy · A5 ---------- */

export function AcademyFlyerA5Front() {
  return (
    <Artboard className="surface-ink h-[216mm] w-[154mm] bg-ink text-paper">
      <TopoLines className="absolute inset-0 h-full w-full text-signal opacity-25" />
      <div className="relative flex h-full flex-col p-[13mm]">
        <RunAcademyLogo surface="dark" endorsed className="origin-top-left scale-[1.35]" />
        <StartNumber number="130€" label="8 Wochen" sublabel="mit Coach" variant="signal" className="absolute right-[13mm] top-[48mm] rotate-6 scale-125" />
        <div className="mt-auto">
          <p className="font-mono text-[3mm] uppercase tracking-[0.25em] text-signal">Einsteiger-Laufkurs</p>
          <p className="mt-[3mm] font-display text-[25mm] font-black uppercase italic leading-[0.82]">
            Von 0 auf
            <br />
            <span className="text-signal">5 km.</span>
          </p>
          <p className="mt-[5mm] max-w-[95mm] text-[4mm] leading-snug text-paper/85">
            Einmal pro Woche betreutes Training in der Gruppe, Trainingsplan für zu Hause, Kräftigung und Lauftechnik. Für alle, die (wieder)
            anfangen wollen.
          </p>
          <div className="mt-[8mm] flex items-end justify-between">
            <PaceLines className="w-[38mm] text-signal" count={3} />
            <BrandLogo variant="white" className="h-[5mm]" />
          </div>
        </div>
      </div>
    </Artboard>
  );
}

export async function AcademyFlyerA5Back() {
  return (
    <Artboard className="h-[216mm] w-[154mm] bg-paper text-ink">
      <div className="flex h-full flex-col p-[13mm]">
        <KmMarker km="01" label="Das erwartet dich" accent="signal" />
        <ul className="mt-[5mm] space-y-[2.5mm] text-[3.8mm] leading-snug">
          {course.contents.map((c) => (
            <li key={c} className="flex gap-[3mm]">
              <span aria-hidden className="mt-[1.4mm] size-[2.2mm] shrink-0 rotate-45 bg-signal ring-1 ring-ink/30" />
              {c}
            </li>
          ))}
        </ul>
        <KmMarker km="02" label="Inklusive" accent="signal" className="mt-[9mm]" />
        <ul className="mt-[4mm] space-y-[1.5mm] text-[3.4mm] leading-snug text-stone-dark">
          {course.includes!.map((c) => (
            <li key={c}>{c}</li>
          ))}
        </ul>
        <div className="mt-auto grid grid-cols-[1fr_30mm] items-end gap-[6mm] border-t-[0.6mm] border-ink pt-[6mm]">
          <div>
            <p className="font-display text-[7mm] font-black uppercase italic leading-none">Jetzt anmelden.</p>
            <p className="mt-[2mm] text-[3.4mm]">
              130 € · Termine & Anmeldung:
              <br />
              <span className="font-mono font-semibold">{DOMAIN}/run-academy</span>
            </p>
            <p className="mt-[2mm] text-[2.6mm] text-stone-dark">{course.note}</p>
          </div>
          <QrCode url={`${SITE}/run-academy/einsteiger-laufkurs`} className="size-[30mm] bg-white p-[1.5mm]" />
        </div>
        <StoreLine className="mt-[6mm]" />
      </div>
    </Artboard>
  );
}

/* ---------- Laufanalyse · DIN lang (99 × 210 mm) ---------- */

export function AnalysisFlyerFront() {
  return (
    <Artboard className="h-[216mm] w-[105mm] bg-white text-ink">
      <div className="relative h-[100mm]">
        <img src="/images/betzdorf-fussanalyse.webp" alt="" className="h-full w-full object-cover" />
        <DataOverlay
          className="absolute bottom-[5mm] left-[8mm] bg-ink/85 p-[3mm] text-paper [&_dd]:text-[4mm]"
          data={[
            { label: "Fuß", value: "3D-Scan" },
            { label: "Bewegung", value: "Video" },
          ]}
        />
      </div>
      <div className="flex h-[116mm] flex-col p-[9mm] pt-[7mm]">
        <BrandLogo variant="red" className="h-[6mm] self-start" />
        <p className="mt-[7mm] font-display text-[14mm] font-black uppercase leading-[0.85]">
          Wir schauen dir auf die <span className="italic text-brand">Füße.</span>
        </p>
        <p className="mt-[4mm] text-[3.6mm] leading-snug">Laufschuhberatung mit 3D-Fußvermessung, Videoanalyse und Probelauf. Ohne Termin, in Betzdorf und Siegen.</p>
        <PaceLines className="mt-auto w-[30mm] text-brand" count={3} />
      </div>
    </Artboard>
  );
}

export async function AnalysisFlyerBack() {
  return (
    <Artboard className="h-[216mm] w-[105mm] bg-paper text-ink">
      <div className="flex h-full flex-col p-[9mm]">
        <p className="font-display text-[8mm] font-black uppercase leading-none">In 5 Schritten zu deinem Schuh</p>
        <ol className="mt-[6mm] space-y-[4mm]">
          {ANALYSIS_STEPS.map((s, i) => (
            <li key={s.title} className="grid grid-cols-[9mm_1fr] gap-[2mm]">
              <span className="font-display text-[7mm] font-black italic leading-none text-brand">{String(i + 1).padStart(2, "0")}</span>
              <span>
                <span className="block font-display text-[4.2mm] font-bold uppercase leading-tight">{s.title}</span>
                <span className="block text-[2.9mm] leading-snug text-stone-dark">{s.text}</span>
              </span>
            </li>
          ))}
        </ol>
        <div className="mt-[6mm] rounded-[1mm] bg-ink p-[4mm] text-paper">
          <p className="font-display text-[4.4mm] font-black uppercase italic">FootBalance-Einlegesohle</p>
          <p className="mt-[1mm] text-[2.9mm] leading-snug text-paper/80">Aus deinem 3D-Scan, im Store an deinen Fuß geformt – und sofort zum Mitnehmen.</p>
        </div>
        <div className="mt-auto flex items-end justify-between gap-[4mm] pt-[5mm]">
          <div className="text-[2.6mm] leading-snug">
            <p className="font-display text-[3.6mm] font-black uppercase italic">Betzdorf</p>
            <p className="text-stone-dark">Wilhelmstraße 16 · 02741 4372</p>
            <p className="mt-[2mm] font-display text-[3.6mm] font-black uppercase italic">Siegen</p>
            <p className="text-stone-dark">Koblenzer Straße 40 · 0271 77005090</p>
          </div>
          <QrCode url={`${SITE}/laufanalyse`} className="size-[22mm] shrink-0 bg-white p-[1mm]" />
        </div>
      </div>
    </Artboard>
  );
}

/* ---------- Crown Town Runners · A5 ---------- */

export async function CrownTownFlyerA5() {
  return (
    <Artboard className="h-[216mm] w-[154mm] bg-white text-ink">
      <TopoLines className="absolute inset-0 h-full w-full text-partner opacity-25" />
      <div className="relative flex h-full flex-col p-[13mm]">
        <CrownTownLogo className="h-[22mm] self-start" />
        <p className="mt-auto font-display text-[24mm] font-black uppercase italic leading-[0.82]">
          Donnerstag.
          <br />
          18:30.
          <br />
          <span className="text-partner">Lauf mit.</span>
        </p>
        <p className="mt-[6mm] max-w-[100mm] text-[4mm] leading-snug">
          Unser Lauftreff in Siegen: ca. eine Stunde, 5–7 km in der Gruppe plus Übungen für Rumpf und Oberkörper. Ohne Anmeldung, für jedes Tempo.
        </p>
        <div className="mt-[8mm] grid grid-cols-[1fr_26mm] items-end gap-[6mm] border-t-[0.6mm] border-ink pt-[5mm]">
          <div className="text-[3.2mm] leading-snug">
            <KmMarker km="5–7" label="km · jeden Donnerstag" accent="partner" />
            <p className="mt-[3mm]">
              Treffpunkt: Absolute Run Ausdauer
              <br />
              Koblenzer Straße 40, 57072 Siegen
            </p>
            <p className="mt-[3mm] flex items-center gap-[1.5mm] font-mono text-[2.4mm] uppercase tracking-[0.15em]">
              <InfinityMark className="h-[2.2mm] w-auto" /> powered by AUSDAUER
            </p>
          </div>
          <QrCode url={COMPANY.instagram} className="size-[26mm] bg-white p-[1mm]" />
        </div>
      </div>
    </Artboard>
  );
}

/* ---------- AUSDAUER CUP · A5 Saisonkalender ---------- */

export function CupFlyerA5Front() {
  return (
    <Artboard className="h-[216mm] w-[154mm] bg-white text-ink">
      <div className="flex h-full flex-col p-[13mm]">
        <CupLogo className="h-auto w-[95mm]" />
        <SeriesTrack total={CUP_RACES.length} done={[]} final className="mt-[5mm] w-[100mm]" />
        <p className="mt-[8mm] font-display text-[16mm] font-black uppercase italic leading-[0.85]">
          8 Läufe.
          <br />
          <span className="text-brand">1 Finale.</span>
        </p>
        <ol className="mt-[6mm] divide-y divide-ink/15 border-y border-ink/15">
          {CUP_RACES.map((r) => (
            <li key={r.slug} className="grid grid-cols-[9mm_1fr_auto] items-center gap-[3mm] py-[1.6mm]">
              <span className="font-display text-[4.6mm] font-black italic text-brand">{String(r.no).padStart(2, "0")}</span>
              <span className="leading-tight">
                <span className="block font-display text-[4mm] font-bold uppercase">{r.name}</span>
                <span className="block text-[2.6mm] text-stone-dark">{r.place}</span>
              </span>
              <span className="font-mono text-[3mm]">{formatDate(r.date, { day: "2-digit", month: "2-digit" })}</span>
            </li>
          ))}
          <li className="grid grid-cols-[9mm_1fr_auto] items-center gap-[3mm] py-[1.6mm] text-brand">
            <span className="size-[3.5mm] rounded-full bg-brand" />
            <span className="font-display text-[4mm] font-bold uppercase">Abschlussfeier & Siegerehrung</span>
            <span className="font-mono text-[3mm]">{formatDate(CUP_FINAL.date, { day: "2-digit", month: "2-digit" })}</span>
          </li>
        </ol>
        <div className="mt-auto flex items-end justify-between pt-[4mm]">
          <p className="font-mono text-[2.4mm] uppercase tracking-[0.15em] text-stone-dark">
            {CUP.edition}. AUSDAUER CUP · Saison {CUP.season} · Änderungen vorbehalten
          </p>
          <BrandLogo variant="red" className="h-[4.5mm]" />
        </div>
      </div>
    </Artboard>
  );
}

export async function CupFlyerA5Back() {
  return (
    <Artboard className="surface-ink h-[216mm] w-[154mm] bg-ink text-paper">
      <TopoLines className="absolute inset-0 h-full w-full text-stone opacity-25" />
      <div className="relative flex h-full flex-col p-[13mm]">
        <p className="font-display text-[11mm] font-black uppercase leading-none">So funktioniert der Cup</p>
        <div className="mt-[6mm] grid grid-cols-2 gap-[6mm] text-[3.3mm] leading-snug">
          {[
            ["Wertung", "Mindestens 5 Läufe finishen. Es zählen die 5 besten Platzierungen plus Bonuspunkte."],
            ["Punkte", "Platz 1 = 20, Platz 2 = 19, Platz 3 = 18 Punkte usw. Wertung über 10 km, in Deuz über 15 km."],
            ["Bonus", "6 Läufe: 5 Punkte · 7 Läufe: 10 Punkte · 8 Läufe: 15 Punkte."],
            ["Preise", "Gutscheine für die Plätze 1–7, Finisher-Shirt ab 6 Läufen, Präsent und Einladung zur Abschlussfeier bei allen 8 Läufen."],
          ].map(([t, d]) => (
            <div key={t} className="border-t-[0.6mm] border-brand pt-[2mm]">
              <p className="font-display text-[4.6mm] font-bold uppercase">{t}</p>
              <p className="mt-[1mm] text-paper/80">{d}</p>
            </div>
          ))}
        </div>
        <div className="mt-[8mm]">
          <p className="mb-[2mm] font-mono text-[2.6mm] uppercase tracking-[0.2em] text-paper/70">Deine Saison – 8 Läufe + Finale</p>
          <SeriesTrack total={CUP_RACES.length} done={[]} final light />
        </div>
        <div className="mt-auto grid grid-cols-[1fr_28mm] items-end gap-[6mm]">
          <div>
            <p className="font-display text-[7mm] font-black uppercase italic leading-none">Anmeldung über RaceResult.</p>
            <p className="mt-[2mm] text-[3.2mm] text-paper/80">
              Alle Läufe, Startzeiten, Ergebnisse:
              <br />
              <span className="font-mono font-semibold text-paper">{DOMAIN}/ausdauer-cup</span>
            </p>
            <p className="mt-[3mm] text-[2.8mm] text-paper/70">Fragen: {COMPANY.email} · {COMPANY.phone}</p>
          </div>
          <QrCode url={`${SITE}/ausdauer-cup`} className="size-[28mm] bg-white p-[1.5mm]" />
        </div>
      </div>
    </Artboard>
  );
}

/* ---------- Plakat A2 (420 × 594 mm) ---------- */

export async function AnalysisPosterA2() {
  return (
    <Artboard className="surface-ink h-[600mm] w-[426mm] bg-ink text-paper">
      <img src="/images/betzdorf-laufbahn.webp" alt="" className="absolute inset-0 h-full w-full object-cover opacity-40" />
      <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/70 to-ink/20" />
      <TopoLines className="absolute inset-0 h-full w-full text-stone opacity-20" />
      <div className="relative flex h-full flex-col p-[30mm]">
        <BrandLogo variant="white" className="h-[18mm] self-start" />
        <div className="mt-auto">
          <KmMarker km="00" label="Laufanalyse · ohne Termin" className="origin-left scale-[2.4]" />
          <p className="mt-[24mm] font-display text-[62mm] font-black uppercase leading-[0.82]">
            Erst laufen.
            <br />
            <span className="italic text-brand">Dann kaufen.</span>
          </p>
          <p className="mt-[12mm] max-w-[260mm] text-[11mm] leading-snug text-paper/85">
            3D-Fußvermessung, Videoanalyse der dynamischen Bewegung und Probelauf vor der Tür. Dazu FootBalance-Einlegesohlen zum Mitnehmen.
          </p>
          <div className="mt-[20mm] flex items-end justify-between gap-[20mm] border-t-[1.5mm] border-brand pt-[12mm]">
            <div className="grid grid-cols-2 gap-[20mm] text-[8mm] leading-snug">
              <div>
                <p className="font-display text-[12mm] font-black uppercase italic">Betzdorf</p>
                <p className="text-paper/75">Wilhelmstraße 16</p>
              </div>
              <div>
                <p className="font-display text-[12mm] font-black uppercase italic">Siegen</p>
                <p className="text-paper/75">Koblenzer Straße 40</p>
              </div>
            </div>
            <QrCode url={`${SITE}/laufanalyse`} className="size-[60mm] shrink-0 bg-white p-[3mm]" />
          </div>
        </div>
      </div>
    </Artboard>
  );
}

/* ---------- Geschenk-Gutschein · DIN lang quer (210 × 99 mm) ---------- */

export function VoucherFront() {
  return (
    <Artboard className="h-[105mm] w-[216mm] bg-brand text-white">
      <InfinityMark variant="track" strokeWidth={1.5} className="absolute -right-[30mm] top-1/2 h-[150mm] w-auto -translate-y-1/2 text-white/25" />
      <div className="relative flex h-full flex-col justify-between p-[11mm]">
        <BrandLogo variant="white" className="h-[7mm] self-start" />
        <div>
          <p className="font-mono text-[3mm] uppercase tracking-[0.25em] text-white/80">Geschenk-Gutschein</p>
          <p className="mt-[2mm] font-display text-[19mm] font-black uppercase italic leading-[0.85]">Verschenk Kilometer.</p>
        </div>
        <p className="text-[3mm] text-white/85">Einlösbar in Betzdorf & Siegen · {DOMAIN}</p>
      </div>
    </Artboard>
  );
}

export function VoucherBack() {
  return (
    <Artboard className="h-[105mm] w-[216mm] bg-white text-ink">
      <div className="grid h-full grid-cols-[1fr_62mm] gap-[8mm] p-[11mm]">
        <div className="flex flex-col">
          <p className="font-display text-[7mm] font-black uppercase">Für</p>
          <div className="mt-[6mm] border-b-[0.4mm] border-ink/40" />
          <p className="mt-[6mm] font-display text-[7mm] font-black uppercase">Von</p>
          <div className="mt-[6mm] border-b-[0.4mm] border-ink/40" />
          <div className="mt-auto">
            <StoreLine />
          </div>
        </div>
        <div className="flex flex-col gap-[4mm]">
          <div className="relative rounded-[1mm] border-[0.4mm] border-ink px-[5mm] pb-[3mm] pt-[2mm]">
            {["left-[1.5mm] top-[1.5mm]", "right-[1.5mm] top-[1.5mm]", "bottom-[1.5mm] left-[1.5mm]", "bottom-[1.5mm] right-[1.5mm]"].map((pos) => (
              <span key={pos} aria-hidden className={`absolute size-[1.6mm] rounded-full bg-ink/25 ${pos}`} />
            ))}
            <p className="text-center font-mono text-[2.4mm] uppercase tracking-[0.2em]">Wert</p>
            <p className="mt-[8mm] text-right font-display text-[9mm] font-black italic leading-none">€</p>
          </div>
          <dl className="grid grid-cols-[auto_1fr] gap-x-[3mm] gap-y-[3mm] text-[3mm]">
            <dt className="font-mono uppercase tracking-[0.15em] text-stone-dark">Nr.</dt>
            <dd className="border-b-[0.3mm] border-ink/40" />
            <dt className="font-mono uppercase tracking-[0.15em] text-stone-dark">Datum</dt>
            <dd className="border-b-[0.3mm] border-ink/40" />
          </dl>
          <p className="mt-auto text-[2.4mm] leading-snug text-stone-dark">Keine Barauszahlung. Restbeträge bleiben als Guthaben erhalten.</p>
        </div>
      </div>
    </Artboard>
  );
}

/* ---------- Visitenkarte (85 × 55 mm) ---------- */

export function BusinessCardFront() {
  return (
    <Artboard className="h-[61mm] w-[91mm] bg-white">
      <InfinityMark variant="track" strokeWidth={1} className="absolute -bottom-[14mm] -right-[18mm] h-[48mm] w-auto text-brand/30" />
      <div className="relative flex h-full items-center justify-center">
        <BrandLogo variant="red" className="h-[8mm]" />
      </div>
    </Artboard>
  );
}

export function BusinessCardBack() {
  return (
    <Artboard className="surface-ink h-[61mm] w-[91mm] bg-ink text-paper">
      <div className="flex h-full flex-col p-[8mm]">
        <p className="font-display text-[5.6mm] font-black uppercase italic leading-none">Laura Stern-Bätzing</p>
        <p className="mt-[1mm] font-mono text-[2.2mm] uppercase tracking-[0.2em] text-brand">Geschäftsführung</p>
        <div className="mt-auto space-y-[0.6mm] text-[2.5mm] leading-snug">
          <p>Wilhelmstraße 16 · 57518 Betzdorf</p>
          <p className="font-mono">T 02741 4372</p>
          <p className="font-mono">{COMPANY.email}</p>
          <p className="font-mono">{DOMAIN}</p>
        </div>
        <PaceLines className="absolute bottom-[8mm] right-[8mm] w-[14mm] text-brand" count={3} />
      </div>
    </Artboard>
  );
}

/* ---------- Briefbogen DIN 5008 Form B (A4) ---------- */

export function Letterhead() {
  return (
    <Artboard className="h-[297mm] w-[210mm] bg-white text-ink">
      {/* Fold and punch marks */}
      <span aria-hidden className="absolute left-[4mm] top-[105mm] h-[0.2mm] w-[4mm] bg-stone" />
      <span aria-hidden className="absolute left-[4mm] top-[148.5mm] h-[0.2mm] w-[6mm] bg-stone" />
      <span aria-hidden className="absolute left-[4mm] top-[210mm] h-[0.2mm] w-[4mm] bg-stone" />
      <BrandLogo variant="red" className="absolute right-[20mm] top-[16mm] h-[8mm]" />
      <PaceLines className="absolute left-[25mm] top-[18mm] w-[20mm] text-brand" count={3} />
      {/* Address field 85 × 45 mm at 25 mm / 45 mm */}
      <div className="absolute left-[20mm] top-[45mm] h-[45mm] w-[85mm] pl-[5mm]">
        <p className="border-b-[0.2mm] border-stone pb-[0.8mm] text-[2.2mm] text-stone-dark">{COMPANY.legalName} · Wilhelmstr. 16 · 57518 Betzdorf</p>
        <div className="mt-[8mm] space-y-[0.5mm] text-[3.5mm] leading-snug text-stone">
          <p>Firma / Verein</p>
          <p>Vorname Nachname</p>
          <p>Straße Hausnummer</p>
          <p>PLZ Ort</p>
        </div>
      </div>
      {/* Information block */}
      <dl className="absolute left-[125mm] top-[50mm] grid w-[65mm] grid-cols-[22mm_1fr] gap-y-[1mm] text-[2.8mm]">
        <dt className="text-stone-dark">Ihr Zeichen</dt>
        <dd />
        <dt className="text-stone-dark">Ansprechpartner</dt>
        <dd>Laura Stern-Bätzing</dd>
        <dt className="text-stone-dark">Telefon</dt>
        <dd>02741 4372</dd>
        <dt className="text-stone-dark">E-Mail</dt>
        <dd>{COMPANY.email}</dd>
        <dt className="text-stone-dark">Datum</dt>
        <dd>TT.MM.JJJJ</dd>
      </dl>
      <div className="absolute left-[25mm] right-[20mm] top-[103.5mm] text-[3.6mm] leading-[1.5]">
        <p className="font-display text-[5mm] font-bold uppercase">Betreff in Barlow Condensed</p>
        <p className="mt-[8mm]">Hallo Frau Muster,</p>
        <p className="mt-[4mm] text-stone-dark">
          Fließtext in Barlow Regular, 10–11 pt, linksbündig im Flattersatz. Der Brieftext beginnt nach DIN 5008 Form B unterhalb des Anschriftfelds;
          Falz- und Lochmarken stehen am linken Rand.
        </p>
        <p className="mt-[8mm]">Sportliche Grüße</p>
        <p className="mt-[12mm] font-medium">Laura Stern-Bätzing</p>
        <p className="text-stone-dark">Geschäftsführung</p>
      </div>
      {/* Footer */}
      <div className="absolute bottom-[10mm] left-[25mm] right-[20mm] grid grid-cols-3 gap-[6mm] border-t-[0.4mm] border-brand pt-[3mm] text-[2.2mm] leading-snug text-stone-dark">
        <div>
          <p className="font-medium text-ink">{COMPANY.legalName}</p>
          <p>Wilhelmstr. 16 · 57518 Betzdorf</p>
          <p>Store Siegen: Koblenzer Str. 40 · 57072 Siegen</p>
        </div>
        <div>
          <p>T 02741 4372 · F {COMPANY.fax}</p>
          <p>{COMPANY.email}</p>
          <p>{DOMAIN}</p>
        </div>
        <div>
          <p>Amtsgericht Montabaur HRA 21721</p>
          <p>USt-IdNr. DE 301 435 598</p>
          <p>GF: Daniel Bätzing, Bettina Stern</p>
        </div>
      </div>
    </Artboard>
  );
}
