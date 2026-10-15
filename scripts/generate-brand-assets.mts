/**
 * Writes the graphic-kit elements as SVG files to public/brand/ and the design tokens to brand/tokens.json.
 * Run: npm run brand:assets
 */
import fs from "node:fs";
import path from "node:path";
import { topoSvg } from "../src/lib/brand/topo.ts";

const root = path.resolve(import.meta.dirname, "..", "public", "brand");
const INK = "#111214";
const VOLT = "#D4FF3A";

function write(rel: string, svg: string) {
  const file = path.join(root, rel);
  fs.mkdirSync(path.dirname(file), { recursive: true });
  fs.writeFileSync(file, `${svg}\n`);
  console.log("wrote", path.relative(process.cwd(), file));
}

// Contour lines
write("elements/topo-ink.svg", topoSvg(1200, 800, INK));
write("elements/topo-volt.svg", topoSvg(1200, 800, VOLT));

// Pace-Lines (same geometry as src/components/brand/pace-lines.tsx)
function paceLines(fill: string, count = 4) {
  const LENGTHS = [1, 0.72, 0.88, 0.55, 0.8, 0.64];
  const barHeight = 14, gap = 10, skew = 18, width = 400;
  const height = count * barHeight + (count - 1) * gap;
  const polys = Array.from({ length: count }, (_, i) => {
    const len = LENGTHS[i % LENGTHS.length] * (width - skew);
    const y = i * (barHeight + gap);
    const x = width - len - i * 6;
    return `<polygon points="${x + skew},${y} ${x + len},${y} ${x + len - skew},${y + barHeight} ${x},${y + barHeight}"/>`;
  }).join("");
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${width} ${height}" fill="${fill}">${polys}</svg>`;
}
write("elements/pace-lines-ink.svg", paceLines(INK));
write("elements/pace-lines-volt.svg", paceLines(VOLT));

// Run Academy icon (same geometry as src/components/brand/run-academy-logo.tsx)
function academyIcon(stroke: string, background?: string) {
  const bg = background ? `<rect width="64" height="64" rx="4" fill="${background}"/>` : "";
  const lanes = [38, 27, 16].map((r) => `<path d="M${54 - r} 60 V54 A${r} ${r} 0 0 1 54 ${54 - r} H60"/>`).join("");
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64">${bg}<g fill="none" stroke="${stroke}" stroke-width="6">${lanes}</g></svg>`;
}
write("run-academy/icon-ink.svg", academyIcon(INK));
write("run-academy/icon-volt-on-ink.svg", academyIcon(VOLT, INK));
write("run-academy/icon-white.svg", academyIcon("#FFFFFF"));

// Design tokens for print shops / agencies
import { COLORS, SIGNAL_CANDIDATES, TYPE } from "../src/lib/brand/tokens.ts";
const tokensFile = path.resolve(import.meta.dirname, "..", "brand", "tokens.json");
fs.mkdirSync(path.dirname(tokensFile), { recursive: true });
fs.writeFileSync(tokensFile, `${JSON.stringify({ colors: COLORS, signalCandidates: SIGNAL_CANDIDATES, typography: TYPE }, null, 2)}\n`);
console.log("wrote", path.relative(process.cwd(), tokensFile));
