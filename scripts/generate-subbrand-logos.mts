/**
 * AUSDAUER sub-brand logo system (Run Academy, AUSDAUER CUP, AUSDAUER TEAMWEAR).
 * Both share one construction: the ∞ from the AUSDAUER logo in a plate slanted 5°,
 * the name in Barlow Condensed Black Italic and a claim in JetBrains Mono.
 * All text is converted to outlines, so the files work without installed fonts
 * (print shops, textile printers, RaceResult).
 *
 * Run: npm run brand:subbrands -- [cup season] [cup races] [cup edition]
 *   e.g. npm run brand:subbrands -- 2027 8 39
 * The series line shows one dot per race plus a red final dot (Abschlussfeier / overall ranking).
 * TEAMWEAR additionally gets textile marks (sleeve, neck) – one-colour versions are single
 * knock-out paths so Flex plotters cut them as one piece.
 */
import fs from "node:fs";
import path from "node:path";
import { createRequire } from "node:module";
import svgpath from "svgpath";

const require = createRequire(import.meta.url);

type Cmd = { type: string; x?: number; y?: number; x1?: number; y1?: number; x2?: number; y2?: number };
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
const SEASON = process.argv[2] ?? "2027";
const RACES = Number(process.argv[3] ?? 8);
const EDITION = process.argv[4] ?? "39";
const DOTS = RACES + 1; // races + final
/** Host places of the AUSDAUER CUP (ring of the seal), in season order. */
const PLACES = ["WEHBACH", "NIEDERFISCHBACH", "FREUDENBERG", "DEUZ", "ANZHAUSEN", "WILNSDORF", "HERDORF", "WENDEN"];

const RED = "#E30110";
const INK = "#222222";
const WHITE = "#FFFFFF";
const VOLT = "#CAFF42";

const fontFile = (pkg: string, file: string) => path.join(ROOT, "node_modules", "@fontsource", pkg, "files", file);
const DISPLAY = opentype.loadSync(fontFile("barlow-condensed", "barlow-condensed-latin-900-italic.woff"));
const LABEL = opentype.loadSync(fontFile("barlow-condensed", "barlow-condensed-latin-800-normal.woff"));
const MONO = opentype.loadSync(fontFile("jetbrains-mono", "jetbrains-mono-latin-700-normal.woff"));

// ---------- text helpers ----------
const r = (n: number) => Math.round(n * 100) / 100;

function cmdsToD(cmds: Cmd[]): string {
  return cmds
    .map((c) => {
      if (c.type === "M" || c.type === "L") return `${c.type}${r(c.x!)} ${r(c.y!)}`;
      if (c.type === "Q") return `Q${r(c.x1!)} ${r(c.y1!)} ${r(c.x!)} ${r(c.y!)}`;
      if (c.type === "C") return `C${r(c.x1!)} ${r(c.y1!)} ${r(c.x2!)} ${r(c.y2!)} ${r(c.x!)} ${r(c.y!)}`;
      return "Z";
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

function layout(font: Font, text: string, size: number, tracking = 0) {
  const scale = size / font.unitsPerEm;
  const glyphs = font.stringToGlyphs(text);
  let x = 0;
  const out: Array<{ glyph: Glyph; x: number }> = [];
  glyphs.forEach((g, i) => {
    out.push({ glyph: g, x });
    x += g.advanceWidth * scale + tracking;
    if (i < glyphs.length - 1) x += font.getKerningValue(g, glyphs[i + 1]) * scale;
  });
  return { glyphs: out, width: x - tracking };
}

function bounds(font: Font, text: string, size: number, tracking = 0) {
  let x1 = Infinity, y1 = Infinity, x2 = -Infinity, y2 = -Infinity;
  for (const { glyph, x } of layout(font, text, size, tracking).glyphs) {
    const b = glyph.getPath(x, 0, size).getBoundingBox();
    if (b.x1 === b.x2) continue;
    x1 = Math.min(x1, b.x1); y1 = Math.min(y1, b.y1); x2 = Math.max(x2, b.x2); y2 = Math.max(y2, b.y2);
  }
  return { x1, y1, x2, y2, width: x2 - x1, height: y2 - y1 };
}

/** Outlined text; (x, y) = left edge of the ink and baseline. */
function text(font: Font, s: string, x: number, y: number, size: number, tracking = 0): string {
  const b = bounds(font, s, size, tracking);
  return layout(font, s, size, tracking)
    .glyphs.map(({ glyph, x: gx }) => cmdsToD(glyph.getPath(x - b.x1 + gx, y, size).commands))
    .join("");
}

function arcText(font: Font, s: string, cx: number, cy: number, radius: number, size: number, tracking: number): string {
  const l = layout(font, s, size, tracking);
  const total = l.width / radius;
  const scale = size / font.unitsPerEm;
  return l.glyphs
    .map(({ glyph, x }) => {
      const w = glyph.advanceWidth * scale;
      const a = -total / 2 + (x + w / 2) / radius;
      const px = cx + Math.sin(a) * radius, py = cy - Math.cos(a) * radius;
      return cmdsToD(
        mapCmds(glyph.getPath(-w / 2, 0, size).commands, (gx, gy) => [px + gx * Math.cos(a) - gy * Math.sin(a), py + gx * Math.sin(a) + gy * Math.cos(a)]),
      );
    })
    .join("");
}

// ---------- ∞ plate (same geometry as src/components/brand/run-academy-logo.tsx) ----------
const SYMBOL = (() => {
  const s = fs.readFileSync(path.join(ROOT, "public", "brand", "logos", "ausdauer-symbol.svg"), "utf8");
  const [vx, vy] = s.match(/viewBox="([^"]+)"/)![1].split(/\s+/).map(Number);
  return { vx, vy, inner: s.match(/<g fill="[^"]+">([\s\S]*)<\/g>/)![1] };
})();

/** 80 × 64 units, scaled to `h`. */
function plate(x: number, y: number, h: number, plateFill: string, markFill: string) {
  const s = h / 64;
  return (
    `<g transform="translate(${r(x)} ${r(y)}) scale(${r(s * 1000) / 1000})">` +
    `<polygon points="5.6,0 80,0 74.4,64 0,64" fill="${plateFill}"/>` +
    `<g fill="${markFill}" transform="translate(13.1 19.95) scale(0.85) translate(${-SYMBOL.vx} ${-SYMBOL.vy})">${SYMBOL.inner}</g>` +
    `</g>`
  );
}
const plateWidth = (h: number) => (80 / 64) * h;

// ---------- sub-brands ----------
interface Colorway { name: string; plate: string; mark: string; name_: string; claim: string; accent: string }
interface SubBrand { id: string; dir: string; file: string; title: string; claim: string; colorways: Colorway[] }

const SUBBRANDS: SubBrand[] = [
  {
    id: "academy",
    dir: "run-academy",
    file: "run-academy",
    title: "RUN ACADEMY",
    claim: "BESSER. LAUFEN. LERNEN.",
    colorways: [
      { name: "farbig", plate: INK, mark: VOLT, name_: INK, claim: INK, accent: VOLT },
      { name: "negativ", plate: VOLT, mark: INK, name_: WHITE, claim: WHITE, accent: VOLT },
      { name: "schwarz", plate: INK, mark: WHITE, name_: INK, claim: INK, accent: INK },
      { name: "weiss", plate: WHITE, mark: INK, name_: WHITE, claim: WHITE, accent: WHITE },
    ],
  },
  {
    id: "cup",
    dir: "cup",
    file: "ausdauer-cup",
    title: "AUSDAUER CUP",
    claim: "SEIT 1989",
    colorways: [
      { name: "farbig", plate: RED, mark: WHITE, name_: INK, claim: INK, accent: RED },
      { name: "negativ", plate: RED, mark: WHITE, name_: WHITE, claim: WHITE, accent: RED },
      { name: "schwarz", plate: INK, mark: WHITE, name_: INK, claim: INK, accent: INK },
      { name: "weiss", plate: WHITE, mark: RED, name_: WHITE, claim: WHITE, accent: WHITE },
    ],
  },
  {
    id: "teamwear",
    dir: "teamwear",
    file: "ausdauer-teamwear",
    title: "AUSDAUER TEAMWEAR",
    claim: "BEDRUCKT IN BETZDORF",
    colorways: [
      { name: "farbig", plate: RED, mark: WHITE, name_: INK, claim: INK, accent: RED },
      { name: "negativ", plate: RED, mark: WHITE, name_: WHITE, claim: WHITE, accent: RED },
      { name: "schwarz", plate: INK, mark: WHITE, name_: INK, claim: INK, accent: INK },
      { name: "weiss", plate: WHITE, mark: RED, name_: WHITE, claim: WHITE, accent: WHITE },
    ],
  },
];
/** Second claim, shown next to the first one in the brand guide for the decision. */
const TEAMWEAR_ALT_CLAIM = "FÜR VEREINE & FIRMEN";

const NAME_SIZE = 50;
const CLAIM_SIZE = 11;
const CLAIM_TRACK = 2.4;
const PLATE_H = 64;

const esc = (t: string) => t.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/"/g, "&quot;");
const svg = (w: number, h: number, body: string, label: string) =>
  `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${r(w)} ${r(h)}" role="img" aria-label="${esc(label)}"><title>${esc(label)}</title>${body}</svg>\n`;

function stations(x: number, y: number, width: number, color: string, accent: string, dot = 2.8) {
  const step = (width - dot * 2) / (DOTS - 1);
  let s = `<path d="M${r(x + dot)} ${r(y)}H${r(x + width - dot)}" stroke="${color}" stroke-width="${r(dot * 0.45)}" fill="none"/>`;
  for (let i = 0; i < DOTS; i++) {
    const last = i === DOTS - 1;
    s += `<circle cx="${r(x + dot + i * step)}" cy="${r(y)}" r="${r(last ? dot * 1.3 : dot)}" fill="${last ? accent : color}"/>`;
  }
  return s;
}

/** Plate left, name + claim right – the standard lockup. */
function horizontal(b: SubBrand, c: Colorway, claim: string | null = b.claim) {
  const nb = bounds(DISPLAY, b.title, NAME_SIZE);
  const tx = plateWidth(PLATE_H) + 16;
  const nameBase = claim ? 38 : PLATE_H / 2 + nb.height / 2;
  let body = plate(0, 0, PLATE_H, c.plate, c.mark) + `<path fill="${c.name_}" d="${text(DISPLAY, b.title, tx, nameBase, NAME_SIZE)}"/>`;
  let width = tx + nb.width;
  if (claim) {
    const cb = bounds(MONO, claim, CLAIM_SIZE, CLAIM_TRACK);
    body += `<path fill="${c.claim}" d="${text(MONO, claim, tx + 2, 60, CLAIM_SIZE, CLAIM_TRACK)}"/>`;
    width = Math.max(width, tx + 2 + cb.width);
  }
  return svg(width + 2, PLATE_H, body, `${b.title}${claim ? ` – ${claim}` : ""}`);
}

/** Plate on top, centred name and claim. */
function stacked(b: SubBrand, c: Colorway) {
  const nb = bounds(DISPLAY, b.title, NAME_SIZE);
  const cb = bounds(MONO, b.claim, CLAIM_SIZE, CLAIM_TRACK);
  const W = Math.max(nb.width, cb.width) + 4;
  const ph = 72;
  const ny = ph + 16 + nb.height;
  const body =
    plate((W - plateWidth(ph)) / 2, 0, ph, c.plate, c.mark) +
    `<path fill="${c.name_}" d="${text(DISPLAY, b.title, (W - nb.width) / 2, ny, NAME_SIZE)}"/>` +
    `<path fill="${c.claim}" d="${text(MONO, b.claim, (W - cb.width) / 2, ny + 22, CLAIM_SIZE, CLAIM_TRACK)}"/>`;
  return svg(W, ny + 26, body, `${b.title} – ${b.claim}`);
}

/** CUP only: standard lockup plus a season row – one dot per race, the red dot is the overall ranking. */
function series(b: SubBrand, c: Colorway) {
  const nb = bounds(DISPLAY, b.title, NAME_SIZE);
  const tx = plateWidth(PLATE_H) + 16;
  const width = tx + nb.width;
  const claim = `${b.claim} · SAISON ${SEASON}`;
  const y = PLATE_H + 16;
  const body =
    plate(0, 0, PLATE_H, c.plate, c.mark) +
    `<path fill="${c.name_}" d="${text(DISPLAY, b.title, tx, 38, NAME_SIZE)}"/>` +
    `<path fill="${c.claim}" d="${text(MONO, claim, tx + 2, 60, CLAIM_SIZE, CLAIM_TRACK)}"/>` +
    stations(0, y, width, c.claim, c.accent, 3.4);
  return svg(width + 2, y + 5, body, `${b.title} – ${claim}`);
}

/** Round seal: host places around the ring (like the previous cup seal), edition + season inside. */
function seal(b: SubBrand, c: Colorway, ring: "places" | "claim") {
  const S = 240, m = S / 2, R = 98;
  let body =
    `<circle cx="${m}" cy="${m}" r="116" fill="none" stroke="${c.name_}" stroke-width="3"/>` +
    `<circle cx="${m}" cy="${m}" r="88" fill="none" stroke="${c.name_}" stroke-width="1.2"/>`;
  if (ring === "places") {
    // full circle, size fitted to the circumference
    const label = PLACES.join(" · ") + " · ";
    const rr = R - 5; // baseline radius
    let size = 20;
    // leave one tracking gap of air at the seam so the last separator never touches the first place
    while (layout(LABEL, label, size, size * 0.14).width + size * 0.14 > 2 * Math.PI * rr) size -= 0.1;
    body += `<path fill="${c.name_}" d="${arcText(LABEL, label, m, m, rr, size, size * 0.14)}"/>`;
  } else {
    body += `<path fill="${c.name_}" d="${arcText(LABEL, `SEIT 1989 · SAISON ${SEASON}`, m, m, R, 17, 2.2)}"/>`;
    const span = (110 * Math.PI) / 180;
    for (let i = 0; i < DOTS; i++) {
      const a = Math.PI + span / 2 - (i * span) / (DOTS - 1); // left to right, last dot = final
      const last = i === DOTS - 1;
      body += `<circle cx="${r(m + Math.sin(a) * 103)}" cy="${r(m - Math.cos(a) * 103)}" r="${last ? 5 : 3.6}" fill="${last ? c.accent : c.name_}"/>`;
    }
  }
  const ph = 46;
  const top = ring === "places" ? 50 : 58;
  body += plate(m - plateWidth(ph) / 2, top, ph, c.plate, c.mark);
  const size = 29;
  const nb = bounds(DISPLAY, b.title, size);
  const ny = top + ph + 10 + nb.height;
  body += `<path fill="${c.name_}" d="${text(DISPLAY, b.title, m - nb.width / 2, ny, size)}"/>`;
  const line = ring === "places" ? `${EDITION}. AUSGABE · ${SEASON}` : `${EDITION}. AUSGABE`;
  const sb = bounds(MONO, line, 9.5, 1.4);
  body += `<path fill="${c.name_}" d="${text(MONO, line, m - sb.width / 2, ny + 20, 9.5, 1.4)}"/>`;
  if (ring === "places") body += stations(m - 52, ny + 36, 104, c.name_, c.accent, 2.6);
  return svg(S, S, body, `${b.title} – ${EDITION}. Ausgabe ${SEASON}`);
}

// ---------- TEAMWEAR textile marks ----------
/** The original AUSDAUER logo: path 0 is the ∞, paths 1–8 are the letters (unchanged, only re-positioned). */
const LOGO = (() => {
  const s = fs.readFileSync(path.join(ROOT, "public", "brand", "logos", "ausdauer.svg"), "utf8");
  const [vx, vy, vw, vh] = s.match(/viewBox="([^"]+)"/)![1].split(/\s+/).map(Number);
  const ds = [...s.matchAll(/ d="([^"]+)"/g)].map((m) => m[1]);
  return { vx, vy, vw, vh, symbol: ds[0], letters: ds.slice(1) };
})();
const WORD = (() => {
  // bbox of the letters only
  let x1 = Infinity, x2 = -Infinity;
  for (const d of LOGO.letters) {
    svgpath(d).abs().iterate((seg) => {
      const n = seg.length;
      if (n >= 3) { x1 = Math.min(x1, seg[n - 2] as number); x2 = Math.max(x2, seg[n - 2] as number); }
    });
  }
  return { x1, x2, w: x2 - x1 };
})();
const tf = (d: string, ox: number, oy: number, s: number, dx: number, dy: number) =>
  svgpath(d).translate(-ox, -oy).scale(s).translate(dx, dy).round(2).toString();

/** Plate as ONE path, ∞ knocked out (evenodd) – for one-colour Flex/DTF. h = plate height. */
function plateKnockout(x: number, y: number, h: number) {
  const s = h / 64;
  const poly = `M${r(x + 5.6 * s)} ${r(y)}H${r(x + 80 * s)}L${r(x + 74.4 * s)} ${r(y + h)}H${r(x)}Z`;
  return poly + tf(LOGO.symbol, SYMBOL.vx, SYMBOL.vy, 0.85 * s, x + 13.1 * s, y + 19.95 * s);
}
/** Letters of the original logo, scaled to width w, top-left at (x, y). */
function wordmark(x: number, y: number, w: number) {
  const s = w / WORD.w;
  return LOGO.letters.map((d) => tf(d, WORD.x1, LOGO.vy, s, x, y)).join("");
}
const wordHeight = (w: number) => (LOGO.vh / WORD.w) * w;

type Textile = { name: string; plate?: string; mark?: string; word?: string; one?: string };
const TEXTILE: Textile[] = [
  { name: "farbig", plate: RED, mark: WHITE, word: INK }, // DTF on light textiles
  { name: "negativ", plate: RED, mark: WHITE, word: WHITE }, // DTF on dark textiles
  { name: "1c-weiss", one: WHITE }, // Flex, one colour, ∞ = textile colour
  { name: "1c-schwarz", one: INK },
  { name: "1c-rot", one: RED },
];

/** Sleeve: plate alone (from 25 mm). */
function sleevePlate(t: Textile) {
  const body = t.one ? `<path fill="${t.one}" fill-rule="evenodd" d="${plateKnockout(0, 0, 64)}"/>` : plate(0, 0, 64, t.plate!, t.mark!);
  return svg(80, 64, body, "AUSDAUER – Ärmel-Plakette");
}
/** Sleeve from 40 mm: plate above, original lettering below – about twice the letter height of the long logo at the same width. */
function sleeveVertical(t: Textile) {
  const W = 120, ph = 64, gap = 9, wy = ph + gap;
  const px = (W - plateWidth(ph)) / 2;
  const word = wordmark(0, wy, W);
  const body = t.one
    ? `<path fill="${t.one}" fill-rule="evenodd" d="${plateKnockout(px, 0, ph)}${word}"/>`
    : plate(px, 0, ph, t.plate!, t.mark!) + `<path fill="${t.word}" d="${word}"/>`;
  return svg(W, wy + wordHeight(W), body, "AUSDAUER – Ärmel vertikal");
}
/** Neck print: original logo + "TEAMWEAR · BETZDORF" (from 60 mm). */
function neck(color: string) {
  const W = 200, s = W / LOGO.vw, lh = LOGO.vh * s;
  const logo = [LOGO.symbol, ...LOGO.letters].map((d) => tf(d, LOGO.vx, LOGO.vy, s, 0, 0)).join("");
  const line = "TEAMWEAR · BETZDORF";
  const track = 3;
  let size = 10;
  while (bounds(MONO, line, size + 0.1, track).width < W) size += 0.1;
  const y = lh + 8 + bounds(MONO, line, size, track).height;
  return svg(W, y + 1, `<path fill="${color}" d="${logo}${text(MONO, line, 0, y, size, track)}"/>`, "AUSDAUER TEAMWEAR – Nacken");
}

function icon(c: Colorway) {
  return svg(80, 64, plate(0, 0, 64, c.plate, c.mark), "Plakette");
}

// ---------- write ----------
const written: string[] = [];
function write(dir: string, name: string, content: string) {
  const out = path.join(ROOT, "public", "brand", dir);
  fs.mkdirSync(out, { recursive: true });
  fs.writeFileSync(path.join(out, name), content);
  written.push(path.join("public", "brand", dir, name));
}

for (const b of SUBBRANDS) {
  const out = path.join(ROOT, "public", "brand", b.dir);
  if (fs.existsSync(out)) for (const f of fs.readdirSync(out)) if (f.endsWith(".svg")) fs.rmSync(path.join(out, f));
  for (const c of b.colorways) {
    write(b.dir, `${b.file}-${c.name}.svg`, horizontal(b, c));
    write(b.dir, `${b.file}-gestapelt-${c.name}.svg`, stacked(b, c));
    if (b.id === "cup") {
      write(b.dir, `${b.file}-serie-${c.name}.svg`, series(b, c));
      write(b.dir, `${b.file}-siegel-${c.name}.svg`, seal(b, c, "places"));
      write(b.dir, `${b.file}-siegel-claim-${c.name}.svg`, seal(b, c, "claim"));
    }
  }
  write(b.dir, `${b.file}-icon.svg`, icon(b.colorways[0]));
  write(b.dir, `${b.file}-icon-negativ.svg`, icon(b.colorways[1]));
  if (b.id === "teamwear") {
    write(b.dir, `${b.file}-claim-alt-farbig.svg`, horizontal(b, b.colorways[0], TEAMWEAR_ALT_CLAIM));
    write(b.dir, `${b.file}-claim-alt-negativ.svg`, horizontal(b, b.colorways[1], TEAMWEAR_ALT_CLAIM));
    for (const t of TEXTILE) {
      write(b.dir, `textil-aermel-plakette-${t.name}.svg`, sleevePlate(t));
      write(b.dir, `textil-aermel-vertikal-${t.name}.svg`, sleeveVertical(t));
    }
    for (const [n, c] of [["1c-schwarz", INK], ["1c-weiss", WHITE], ["1c-rot", RED]] as const) write(b.dir, `textil-nacken-${n}.svg`, neck(c));
  }
}
console.log(written.map((f) => `wrote ${f}`).join("\n"));
