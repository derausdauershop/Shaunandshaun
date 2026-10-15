/**
 * Writes the graphic-kit elements as SVG files to public/brand/ and the design tokens to brand/tokens.json.
 * Run: npm run brand:assets
 */
import fs from "node:fs";
import path from "node:path";
import { topoSvg } from "../src/lib/brand/topo.ts";
import { INFINITY_PATH, INFINITY_VIEWBOX } from "../src/lib/brand/infinity.ts";

const root = path.resolve(import.meta.dirname, "..", "public", "brand");
const INK = "#222222";
const VOLT = "#CAFF42";
const RED = "#E30110";

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

// Run Academy badge (same geometry as src/components/brand/run-academy-logo.tsx)
function academyIcon(badge: string, mark: string) {
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 80 64"><polygon points="5.6,0 80,0 74.4,64 0,64" fill="${badge}"/><path d="${INFINITY_PATH}" transform="translate(13.1 19.95) scale(0.85)" fill="${mark}"/></svg>`;
}
write("run-academy/icon-volt-on-ink.svg", academyIcon(INK, VOLT));
write("run-academy/icon-ink-on-volt.svg", academyIcon(VOLT, INK));

// ∞ symbol as outlined "track" supergraphic
for (const [name, color] of [["ink", INK], ["red", RED], ["volt", VOLT]]) {
  write(
    `elements/infinity-track-${name}.svg`,
    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="${INFINITY_VIEWBOX}"><path d="${INFINITY_PATH}" fill="none" stroke="${color}" stroke-width="0.4"/></svg>`,
  );
}

// Design tokens for print shops / agencies
import { ACCENT_COLORS, COLORS, PREVIOUS_TYPE, TYPE } from "../src/lib/brand/tokens.ts";
const tokensFile = path.resolve(import.meta.dirname, "..", "brand", "tokens.json");
fs.mkdirSync(path.dirname(tokensFile), { recursive: true });
fs.writeFileSync(tokensFile, `${JSON.stringify({ colors: COLORS, accentColors: ACCENT_COLORS, typography: TYPE, previousTypography: PREVIOUS_TYPE }, null, 2)}\n`);
console.log("wrote", path.relative(process.cwd(), tokensFile));
