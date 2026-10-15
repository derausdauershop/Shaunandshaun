import { contrastRatio, wcagLevel } from "@/lib/brand/color";
import { ACCENT_COLORS, COLORS, CONTRAST_PAIRS, type BrandColor } from "@/lib/brand/tokens";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { cn } from "@/lib/utils";
import { Section } from "./section";

const SWATCH_BG: Record<string, string> = {
  brand: "bg-brand",
  ink: "bg-ink",
  paper: "bg-paper",
  stone: "bg-stone",
  "stone-dark": "bg-stone-dark",
  signal: "bg-signal",
  partner: "bg-partner",
};

// Literal class names so Tailwind can pick them up.
const TEXT: Record<string, string> = {
  "#222222": "text-[#222222]",
  "#F4F2ED": "text-[#F4F2ED]",
  "#5E5C57": "text-[#5E5C57]",
  "#FFFFFF": "text-white",
  "#E30110": "text-[#E30110]",
  "#CAFF42": "text-[#CAFF42]",
};
const BG: Record<string, string> = {
  "#222222": "bg-[#222222]",
  "#F4F2ED": "bg-[#F4F2ED]",
  "#FFFFFF": "bg-white ring-1 ring-border",
  "#E30110": "bg-[#E30110]",
  "#CAFF42": "bg-[#CAFF42]",
  "#29B9D2": "bg-[#29B9D2]",
};

function Swatch({ color }: { color: BrandColor }) {
  return (
    <div className="overflow-hidden rounded-sm bg-white ring-1 ring-border">
      <div className={cn("relative h-28", SWATCH_BG[color.id])}>
      </div>
      <div className="p-4">
        <p className="font-display text-xl font-extrabold uppercase">{color.name}</p>
        <p className="text-sm text-muted-foreground">{color.role}</p>
        <dl className="mt-3 grid grid-cols-[4.5rem_1fr] gap-y-0.5 font-mono text-xs">
          <dt className="text-muted-foreground">HEX</dt>
          <dd>{color.hex}</dd>
          <dt className="text-muted-foreground">RGB</dt>
          <dd>{color.rgb}</dd>
          <dt className="text-muted-foreground">CMYK</dt>
          <dd>{color.cmyk}</dd>
          <dt className="text-muted-foreground">Pantone</dt>
          <dd>{color.pantone}</dd>
        </dl>
      </div>
    </div>
  );
}

export function Colors() {
  return (
    <Section
      id="farben"
      km={5}
      kicker="Farben"
      title="Rot & Schwarz. Plus Volt für Bewegung."
      intro="Die Logofarben Rot und Schwarz bleiben das Fundament, Paper gibt Ruhe. Die Signalfarbe Volt stammt aus dem bisherigen Run-Academy-Logo – sie ist schon gelernt und steht ab jetzt für Lernen, Community und Aktivierung. Cyan gehört Siegen."
    >
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
        {COLORS.map((c) => (
          <Swatch key={c.id} color={c} />
        ))}
      </div>
      <h3 className="mt-12 text-3xl">Akzente mit festem Revier</h3>
      <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:w-2/3">
        {ACCENT_COLORS.map((c) => (
          <Swatch key={c.id} color={c} />
        ))}
      </div>

      <h3 className="mt-12 text-3xl">Mengenverhältnis</h3>
      <div className="mt-6 flex h-16 overflow-hidden rounded-sm ring-1 ring-border" aria-label="55 % Paper, 30 % Ink, 10 % Rot, 5 % Volt">
        <div className="flex w-[55%] items-end bg-paper p-2 font-mono text-xs">Paper 55 %</div>
        <div className="flex w-[30%] items-end bg-ink p-2 font-mono text-xs text-paper">Ink 30 %</div>
        <div className="flex w-[10%] items-end bg-brand p-2 font-mono text-xs text-brand-foreground">Rot 10 %</div>
        <div className="flex w-[5%] items-end bg-signal p-2 font-mono text-xs text-signal-foreground">5 %</div>
      </div>
      <ul className="mt-4 space-y-1 text-sm text-muted-foreground">
        <li>
          <strong className="text-foreground">AUSDAUER-Medien:</strong> Rot ist der Akzent, Volt höchstens als kleiner Punkt.
        </li>
        <li>
          <strong className="text-foreground">Run Academy & Community:</strong> Volt darf bis zu 50 % tragen, Rot nur im Logo.
        </li>
        <li>
          <strong className="text-foreground">Nie</strong> Rot und Volt als gleich große Flächen nebeneinander – die beiden flimmern.
        </li>
      </ul>

      <h3 className="mt-12 text-3xl">Kontraste (WCAG 2.1)</h3>
      <div className="mt-6 overflow-x-auto rounded-sm bg-white ring-1 ring-border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Kombination</TableHead>
              <TableHead>Beispiel</TableHead>
              <TableHead className="text-right">Kontrast</TableHead>
              <TableHead>Einsatz</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {CONTRAST_PAIRS.map((p) => {
              const ratio = contrastRatio(p.fg, p.bg);
              const level = wcagLevel(ratio);
              return (
                <TableRow key={p.label}>
                  <TableCell className="font-medium">{p.label}</TableCell>
                  <TableCell>
                    <span className={cn("inline-block rounded-sm px-3 py-1 font-display font-bold uppercase", BG[p.bg], TEXT[p.fg])}>
                      Aa Kilometer
                    </span>
                  </TableCell>
                  <TableCell className="text-right font-mono tabular">{ratio.toFixed(1)}:1</TableCell>
                  <TableCell>
                    <Badge variant={level === "nicht zulässig" ? "destructive" : level === "AA groß" ? "outline" : "secondary"}>
                      {level === "AA groß" ? "nur große Schrift / Flächen" : level === "nicht zulässig" ? "nicht für Text" : `Text ${level}`}
                    </Badge>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </div>
    </Section>
  );
}
