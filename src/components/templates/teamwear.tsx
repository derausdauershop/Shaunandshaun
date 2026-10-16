/* eslint-disable @next/next/no-img-element -- print artboards use plain <img> so exports embed the original files */
import { BrandLogo } from "@/components/brand/brand-logo";
import { CLUB_SWATCHES, TEXTILE_RULES, textileMark, type TextileMark } from "@/lib/brand/teamwear";
import { cn } from "@/lib/utils";
import { Artboard } from "./artboard";

/** Widths shown on the test sheet. Literal classes so Tailwind generates them. */
const SIZES = [
  { mm: 25, w: "w-[25mm]" },
  { mm: 40, w: "w-[40mm]" },
  { mm: 60, w: "w-[60mm]" },
] as const;

type Row = { label: string; note: string; src: string; min: number; mark?: TextileMark };
const ROWS: Row[] = [
  { label: "Heute", note: "Langes AUSDAUER-Logo", src: "/brand/logos/ausdauer.svg", min: 60 },
  ...TEXTILE_RULES.map((r) => ({ label: r.label, note: `${r.where} · ab ${r.min} mm`, src: textileMark(r.mark, r.mark === "nacken" ? "1c-schwarz" : "farbig"), min: r.min, mark: r.mark })),
];

/** A4 sheet, printed at 100 %: every mark at its real width, to hold against a shirt. */
export function TeamwearTestSheet() {
  return (
    <Artboard className="h-[297mm] w-[210mm] bg-white text-ink">
      <div className="absolute inset-[14mm] flex flex-col">
        <header className="flex items-start justify-between gap-[6mm]">
          <div>
            <p className="font-mono text-[2.4mm] uppercase tracking-[0.25em] text-brand">AUSDAUER TEAMWEAR · Lesbarkeitstest</p>
            <p className="mt-[1.5mm] font-display text-[9mm] font-black uppercase italic leading-[0.9]">Halt es ans Shirt.</p>
            <p className="mt-[2mm] max-w-[120mm] text-[2.8mm] leading-snug text-stone-dark">
              Mit 100 % bzw. „Tatsächliche Größe“ drucken. Kontrolle: Das Lineal muss genau 100 mm lang sein. Jede Marke steht in echter Breite.
            </p>
          </div>
          <BrandLogo variant="red" className="mt-[1mm] h-[6mm]" />
        </header>

        {/* 100 mm ruler */}
        <div className="mt-[5mm] w-[100mm]" aria-label="Lineal 100 mm">
          <div className="flex h-[3mm] items-end border-b-[0.3mm] border-ink">
            {Array.from({ length: 11 }, (_, i) => (
              <span key={i} className={cn("w-[0.3mm] bg-ink", i % 5 === 0 ? "h-[3mm]" : "h-[1.6mm]", i < 10 && "mr-[9.7mm]")} />
            ))}
          </div>
          <div className="mt-[0.8mm] flex justify-between font-mono text-[2mm] text-stone-dark">
            <span>0</span>
            <span>50 mm</span>
            <span>100 mm</span>
          </div>
        </div>

        {/* Size grid */}
        <div className="mt-[5mm] grid grid-cols-[40mm_1fr] border-t-[0.3mm] border-ink">
          <span />
          <div className="grid grid-cols-[34mm_50mm_1fr] py-[1.5mm] font-mono text-[2.2mm] uppercase tracking-[0.15em] text-stone-dark">
            {SIZES.map((s) => (
              <span key={s.mm}>{s.mm} mm</span>
            ))}
          </div>
          {ROWS.map((row) => (
            <div key={row.label} className="contents">
              <div className="border-t-[0.2mm] border-stone py-[3mm] pr-[3mm]">
                <p className="font-display text-[4mm] font-bold uppercase leading-tight">{row.label}</p>
                <p className="mt-[0.8mm] text-[2.3mm] leading-snug text-stone-dark">{row.note}</p>
              </div>
              <div className="grid grid-cols-[34mm_50mm_1fr] items-start border-t-[0.2mm] border-stone py-[3mm]">
                {SIZES.map((s) => (
                  <div key={s.mm} className="flex flex-col items-start gap-[1mm]">
                    <img src={row.src} alt="" className={cn("h-auto", s.w, s.mm < row.min && "opacity-35")} />
                    {s.mm < row.min && <span className="font-mono text-[1.9mm] uppercase tracking-[0.1em] text-brand">unter Mindestgröße</span>}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Club colours */}
        <div className="mt-auto">
          <p className="font-mono text-[2.2mm] uppercase tracking-[0.2em] text-stone-dark">Ärmel-Plakette 25 mm auf Vereinsfarben · 1-farbig Flex</p>
          <div className="mt-[2mm] grid grid-cols-6 gap-[2mm]">
            {CLUB_SWATCHES.map((c) => (
              <figure key={c.name} className="flex flex-col gap-[1mm]">
                <div className={cn("flex h-[24mm] items-center justify-center ring-[0.2mm] ring-stone", SWATCH_BG[c.name])}>
                  <img src={textileMark("aermel-plakette", c.mark)} alt="" className="h-auto w-[25mm]" />
                </div>
                <figcaption className="font-mono text-[2mm] text-stone-dark">{c.name}</figcaption>
              </figure>
            ))}
          </div>
          <p className="mt-[4mm] border-t-[0.2mm] border-stone pt-[2mm] text-[2.3mm] leading-snug text-stone-dark">
            Flex: Linien mind. 1 mm, 1-farbige Dateien sind ein Pfad mit ausgespartem ∞ (plotterfertig). DTF: Dateien „farbig“ (helle Textilien) und „negativ“ (dunkle Textilien). Dateien: public/brand/teamwear/
          </p>
        </div>
      </div>
    </Artboard>
  );
}

/** Literal background classes per swatch (Tailwind needs static class names). */
const SWATCH_BG: Record<string, string> = {
  Weiß: "bg-[#FFFFFF]",
  Schwarz: "bg-[#1A1A1A]",
  Rot: "bg-[#C8102E]",
  Royalblau: "bg-[#1D4FA0]",
  Grün: "bg-[#0B7A3B]",
  Gelb: "bg-[#F7D417]",
};
