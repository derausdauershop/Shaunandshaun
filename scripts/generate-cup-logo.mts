/**
 * AUSDAUER CUP – logo system generator.
 * Writes outlined SVGs (no fonts needed by print shops, RaceResult or textile printers) to public/brand/cup/.
 *
 * Run: npm run brand:cup -- [season] [races]
 *   season  e.g. 2027 (default)
 *   races   number of races in the season, 8 or 9 (default 9) – one station dot per race
 */
import fs from "node:fs";
import path from "node:path";
import { createRequire } from "node:module";

const require = createRequire(import.meta.url);

interface Glyph {
  advanceWidth: number;
  getPath(x: number, y: number, size: number): { commands: Cmd[]; getBoundingBox(): { x1: number; y1: number; x2: number; y2: number } };
}
interface Font {
  unitsPerEm: number;
  stringToGlyphs(text: string): Glyph[];
  getKerningValue(a: Glyph, b: Glyph): number;
}
const opentype: { loadSync(file: string): Font } = require("opentype.js");

const ROOT = path.resolve(import.meta.dirname, "..");
const OUT = path.join(ROOT, "public", "brand", "cup");
const SEASON = process.argv[2] ?? "2027";
const RACES = Number(process.argv[3] ?? 9);

const RED = "#E30110";
const INK = "#222222";
const WHITE = "#FFFFFF";
const SLANT = Math.tan((5 * Math.PI) / 180); // the logo lettering leans 5°

const fontFile = (pkg: string, file: string) => path.join(ROOT, "node_modules", "@fontsource", pkg, "files", file);
const DISPLAY = opentype.loadSync(fontFile("barlow-condensed", "barlow-condensed-latin-900-italic.woff"));
const LABEL = opentype.loadSync(fontFile("barlow-condensed", "barlow-condensed-latin-800-normal.woff"));
const MONO = opentype.loadSync(fontFile("jetbrains-mono", "jetbrains-mono-latin-700-normal.woff"));

// ---------- helpers ----------
type Cmd = { type: string; x?: number; y?: number; x1?: number; y1?: number; x2?: number; y2?: number };
const r = (n: number) => Math.round(n * 100) / 100;

function cmdsToD(cmds: Cmd[]): string {
  return cmds
    .map((c) => {
      switch (c.type) {
        case "M":
        case "L":
          return `${c.type}${r(c.x!)} ${r(c.y!)}`;
        case "Q":
          return `Q${r(c.x1!)} ${r(c.y1!)} ${r(c.x!)} ${r(c.y!)}`;
        case "C":
          return `C${r(c.x1!)} ${r(c.y1!)} ${r(c.x2!)} ${r(c.y2!)} ${r(c.x!)} ${r(c.y!)}`;
        default:
          return "Z";
      }
    })
    .join("");
}

function mapCmds(cmds: Cmd[], fn: (x: number, y: number) => [number, number]): Cmd[] {
  return cmds.map((c) => {
    const o: Cmd = { type: c.type };
    for (const [kx, ky] of [["x", "y"], ["x1", "y1"], ["x2", "y2"]] as const) {
      if (c[kx] !== undefined) [o[kx], o[ky]] = fn(c[kx]!, c[ky]!);
    }
    return o;
  });
}

interface Laid {
  glyphs: Array<{ glyph: Glyph; x: number }>;
  width: number;
}

function layout(font: Font, text: string, size: number, tracking = 0): Laid {
  const scale = size / font.unitsPerEm;
  const glyphs = font.stringToGlyphs(text);
  let x = 0;
  const out: Laid["glyphs"] = [];
  glyphs.forEach((g: Glyph, i: number) => {
    out.push({ glyph: g, x });
    x += g.advanceWidth * scale + tracking;
    if (i < glyphs.length - 1) x += font.getKerningValue(g, glyphs[i + 1]) * scale;
  });
  return { glyphs: out, width: x - tracking };
}

/** Text as outlined path data, baseline at (x, y). */
function textD(font: Font, text: string, x: number, y: number, size: number, tracking = 0): { d: string; width: number } {
  const l = layout(font, text, size, tracking);
  const d = l.glyphs.map(({ glyph, x: gx }) => cmdsToD(glyph.getPath(x + gx, y, size).commands)).join("");
  return { d, width: l.width };
}

/** Visual bounds of outlined text (for optical centring). */
function textBounds(font: Font, text: string, size: number, tracking = 0) {
  const l = layout(font, text, size, tracking);
  let x1 = Infinity, y1 = Infinity, x2 = -Infinity, y2 = -Infinity;
  for (const { glyph, x } of l.glyphs) {
    const b = glyph.getPath(x, 0, size).getBoundingBox();
    if (b.x1 === b.x2) continue;
    x1 = Math.min(x1, b.x1); y1 = Math.min(y1, b.y1); x2 = Math.max(x2, b.x2); y2 = Math.max(y2, b.y2);
  }
  return { x1, y1, x2, y2, width: x2 - x1, height: y2 - y1 };
}

/** Text running along a circle (clockwise on top when inside=false), centred on `angle` (radians, 0 = top). */
function arcTextD(font: Font, text: string, cx: number, cy: number, radius: number, size: number, tracking: number, bottom = false): string {
  const l = layout(font, text, size, tracking);
  const total = l.width / radius;
  return l.glyphs
    .map(({ glyph, x }) => {
      const scale = size / font.unitsPerEm;
      const w = glyph.advanceWidth * scale;
      const mid = x + w / 2;
      // angle measured from 12 o'clock, clockwise
      const a = bottom ? Math.PI + total / 2 - mid / radius : -total / 2 + mid / radius;
      const cmds = glyph.getPath(-w / 2, 0, size).commands as Cmd[];
      const rot = bottom ? a + Math.PI : a;
      const rr = bottom ? radius + size * 0.7 : radius;
      const px = cx + Math.sin(a) * rr;
      const py = cy - Math.cos(a) * rr;
      return cmdsToD(
        mapCmds(cmds, (gx, gy) => [px + gx * Math.cos(rot) - gy * Math.sin(rot), py + gx * Math.sin(rot) + gy * Math.cos(rot)]),
      );
    })
    .join("");
}

// ---------- original AUSDAUER logo ----------
function readLogo(file: string) {
  const s = fs.readFileSync(path.join(ROOT, "public", "brand", "logos", file), "utf8");
  const [vx, vy, vw, vh] = s.match(/viewBox="([^"]+)"/)![1].split(/\s+/).map(Number);
  const inner = s.match(/<g fill="[^"]+">([\s\S]*)<\/g>/)![1];
  return { vx, vy, vw, vh, inner };
}
const LOGO = readLogo("ausdauer.svg");
const SYMBOL = readLogo("ausdauer-symbol.svg");

function placeLogo(logo: ReturnType<typeof readLogo>, x: number, y: number, height: number, fill: string) {
  const s = height / logo.vh;
  return `<g fill="${fill}" transform="translate(${r(x)} ${r(y)}) scale(${r(s * 1000) / 1000}) translate(${-logo.vx} ${-logo.vy})">${logo.inner}</g>`;
}
const logoWidth = (logo: ReturnType<typeof readLogo>, height: number) => (logo.vw / logo.vh) * height;

// ---------- CUP plate ----------
/** Slanted plate with "CUP". knockout=true cuts the letters out (one-colour use). */
function plate(x: number, y: number, h: number, fill: string, textFill: string, knockout: boolean) {
  const size = h * 0.98;
  const b = textBounds(DISPLAY, "CUP", size, h * 0.02);
  const padX = h * 0.34;
  const skew = h * SLANT;
  const w = b.width + padX * 2 + skew;
  const tx = x + skew / 2 + padX - b.x1;
  const baseline = y + h / 2 - (b.y1 + b.y2) / 2; // optical centre of the cap height
  const t = textD(DISPLAY, "CUP", tx, baseline, size, h * 0.02).d;
  const poly = `M${r(x + skew)} ${r(y)}L${r(x + w)} ${r(y)}L${r(x + w - skew)} ${r(y + h)}L${r(x)} ${r(y + h)}Z`;
  const svg = knockout
    ? `<path fill="${fill}" fill-rule="evenodd" d="${poly}${t}"/>`
    : `<path fill="${fill}" d="${poly}"/><path fill="${textFill}" d="${t}"/>`;
  return { svg, width: w };
}

// ---------- series line ----------
function stations(x: number, y: number, width: number, n: number, color: string, accent: string, dot: number) {
  const step = (width - dot * 2) / (n - 1);
  let s = `<path d="M${r(x + dot)} ${r(y)}H${r(x + width - dot)}" stroke="${color}" stroke-width="${r(dot * 0.45)}" fill="none"/>`;
  for (let i = 0; i < n; i++) {
    const cx = x + dot + i * step;
    const last = i === n - 1;
    s += last
      ? `<circle cx="${r(cx)}" cy="${r(y)}" r="${r(dot * 1.25)}" fill="${accent}"/>`
      : `<circle cx="${r(cx)}" cy="${r(y)}" r="${r(dot)}" fill="${color}"/>`;
  }
  return s;
}

// ---------- palettes ----------
interface Palette { name: string; logo: string; plate: string; plateText: string; knockout: boolean; line: string; accent: string; bg?: string }
const PALETTES: Palette[] = [
  { name: "farbig", logo: INK, plate: RED, plateText: WHITE, knockout: false, line: INK, accent: RED },
  { name: "negativ", logo: WHITE, plate: RED, plateText: WHITE, knockout: false, line: WHITE, accent: RED, bg: INK },
  { name: "schwarz", logo: INK, plate: INK, plateText: WHITE, knockout: true, line: INK, accent: INK },
  { name: "weiss", logo: WHITE, plate: WHITE, plateText: INK, knockout: true, line: WHITE, accent: WHITE, bg: INK },
];

const svg = (w: number, h: number, body: string, title: string) =>
  `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${r(w)} ${r(h)}" role="img" aria-label="${title}"><title>${title}</title>${body}</svg>\n`;

// ---------- lockups ----------
function horizontal(p: Palette, withLine: boolean) {
  const H = 40;
  const lw = logoWidth(LOGO, H * 0.78);
  const gap = H * 0.28;
  const pl = plate(lw + gap, 0, H, p.plate, p.plateText, p.knockout);
  const logo = placeLogo(LOGO, 0, H * 0.11, H * 0.78, p.logo);
  const width = lw + gap + pl.width;
  let body = logo + pl.svg;
  let height = H;
  if (withLine) {
    const y = H + 15;
    const desc = textD(MONO, "LAUFSERIE SIEGERLAND", 0, y + 3.2, 9, 1.4);
    const season = textBounds(MONO, SEASON, 9, 1.4);
    const sx = width - season.width - season.x1;
    body += `<path fill="${p.line}" d="${desc.d}"/>`;
    body += `<path fill="${p.line}" d="${textD(MONO, SEASON, sx, y + 3.2, 9, 1.4).d}"/>`;
    body += stations(desc.width + 9, y, sx - desc.width - 18, RACES, p.line, p.accent, 2.6);
    height = y + 5;
  }
  return svg(width, height, body, `AUSDAUER CUP${withLine ? ` – Laufserie Siegerland ${SEASON}` : ""}`);
}

function stacked(p: Palette) {
  const W = 200;
  const lh = (W / LOGO.vw) * LOGO.vh;
  const ph = 54;
  const pl = plate(0, 0, ph, p.plate, p.plateText, p.knockout);
  const plX = (W - pl.width) / 2;
  const plate2 = plate(plX, lh + 12, ph, p.plate, p.plateText, p.knockout);
  const y = lh + 12 + ph + 16;
  const desc = textBounds(MONO, `LAUFSERIE SIEGERLAND ${SEASON}`, 8.4, 1.3);
  const body =
    placeLogo(LOGO, 0, 0, lh, p.logo) +
    plate2.svg +
    `<path fill="${p.line}" d="${textD(MONO, `LAUFSERIE SIEGERLAND ${SEASON}`, (W - desc.width) / 2 - desc.x1, y, 8.4, 1.3).d}"/>` +
    stations(10, y + 12, W - 20, RACES, p.line, p.accent, 2.6);
  return svg(W, y + 16, body, `AUSDAUER CUP – Laufserie Siegerland ${SEASON}`);
}

function badge(p: Palette) {
  const S = 240, c = S / 2;
  let body = `<circle cx="${c}" cy="${c}" r="116" fill="none" stroke="${p.line}" stroke-width="3"/>`;
  body += `<circle cx="${c}" cy="${c}" r="90" fill="none" stroke="${p.line}" stroke-width="1.2"/>`;
  body += `<path fill="${p.line}" d="${arcTextD(LABEL, "LAUFSERIE · SIEGERLAND", c, c, 98, 17, 2.2)}"/>`;
  // station dots along the bottom arc – one per race, last = overall ranking
  const span = (110 * Math.PI) / 180;
  for (let i = 0; i < RACES; i++) {
    const a = Math.PI + span / 2 - (i * span) / (RACES - 1);
    const x = c + Math.sin(a) * 103, y = c - Math.cos(a) * 103;
    const last = i === RACES - 1;
    body += `<circle cx="${r(x)}" cy="${r(y)}" r="${last ? 5 : 3.6}" fill="${last ? p.accent : p.line}"/>`;
  }
  const lw = 138;
  const lh = (lw / LOGO.vw) * LOGO.vh;
  body += placeLogo(LOGO, c - lw / 2, 72, lh, p.logo);
  const ph = 50;
  const probe = plate(0, 0, ph, p.plate, p.plateText, p.knockout);
  body += plate(c - probe.width / 2, 72 + lh + 10, ph, p.plate, p.plateText, p.knockout).svg;
  const sb = textBounds(MONO, SEASON, 13, 2);
  body += `<path fill="${p.line}" d="${textD(MONO, SEASON, c - sb.width / 2 - sb.x1, 72 + lh + 10 + ph + 22, 13, 2).d}"/>`;
  return svg(S, S, body, `AUSDAUER CUP – Siegel ${SEASON}`);
}

function icon(p: Palette) {
  const S = 96;
  const skew = S * SLANT;
  const poly = `M${r(skew)} 0H${S}L${r(S - skew)} ${S}H0Z`;
  const sw = 60, sh = (sw / SYMBOL.vw) * SYMBOL.vh;
  const tb = textBounds(DISPLAY, "CUP", 40, 0.8);
  const fg = p.knockout ? (p.plate === INK ? WHITE : INK) : p.plateText;
  const body =
    `<path fill="${p.plate}" d="${poly}"/>` +
    placeLogo(SYMBOL, (S - sw) / 2, 16, sh, fg) +
    `<path fill="${fg}" d="${textD(DISPLAY, "CUP", (S - tb.width) / 2 - tb.x1, 16 + sh + 8 + tb.height, 40, 0.8).d}"/>`;
  return svg(S, S, body, "AUSDAUER CUP – Icon");
}

fs.mkdirSync(OUT, { recursive: true });
for (const f of fs.readdirSync(OUT)) if (f.endsWith(".svg")) fs.rmSync(path.join(OUT, f));
const write = (name: string, content: string) => {
  fs.writeFileSync(path.join(OUT, name), content);
  console.log("wrote", path.relative(ROOT, path.join(OUT, name)));
};
for (const p of PALETTES) {
  write(`ausdauer-cup-${p.name}.svg`, horizontal(p, false));
  write(`ausdauer-cup-serie-${p.name}.svg`, horizontal(p, true));
  write(`ausdauer-cup-gestapelt-${p.name}.svg`, stacked(p));
  write(`ausdauer-cup-siegel-${p.name}.svg`, badge(p));
}
write("ausdauer-cup-icon.svg", icon(PALETTES[0]));
write("ausdauer-cup-icon-schwarz.svg", icon(PALETTES[2]));
