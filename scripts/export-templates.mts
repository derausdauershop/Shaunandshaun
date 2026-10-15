/**
 * Exports all templates from /brand/vorlagen as files to public/brand/vorlagen-export/:
 * print → PDF (with 3 mm bleed) + PNG preview, social → PNG in original size, e-mail → HTML.
 * Also renders the PNG logo the e-mail signature needs.
 *
 * Usage: start the app (npm run build && npm run start), then
 *   BASE_URL=http://localhost:3000 PW_CHROMIUM=/path/to/chromium node scripts/export-templates.mts
 */
import fs from "node:fs";
import path from "node:path";
import { chromium } from "playwright";

const BASE = process.env.BASE_URL ?? "http://localhost:3000";
type Template = { id: string; kind: "print" | "social" | "email"; size: { w: number; h: number; unit: "mm" | "px" } };
const TEMPLATES: Template[] = await (await fetch(`${process.env.BASE_URL ?? "http://localhost:3000"}/brand/vorlagen-liste`)).json();
const OUT = path.resolve(import.meta.dirname, "..", "public", "brand", "vorlagen-export");
fs.mkdirSync(OUT, { recursive: true });

const browser = await chromium.launch(process.env.PW_CHROMIUM ? { executablePath: process.env.PW_CHROMIUM } : {});
const page = await browser.newPage({ viewport: { width: 2400, height: 2400 } });

async function load(url: string) {
  await page.goto(url, { waitUntil: "networkidle" });
  await page.evaluate(async () => {
    await document.fonts.ready;
    await Promise.all([...document.images].map((img) => (img.complete ? null : new Promise((r) => (img.onload = img.onerror = r)))));
  });
}

for (const t of TEMPLATES) {
  await load(`${BASE}/brand/vorlagen/${t.id}`);
  const board = page.locator("#artboard > *").first();
  if (t.kind === "print") {
    await page.pdf({ path: path.join(OUT, `${t.id}.pdf`), width: `${t.size.w}mm`, height: `${t.size.h}mm`, printBackground: true, pageRanges: "1" });
    await board.screenshot({ path: path.join(OUT, `${t.id}.png`) });
  } else if (t.kind === "social") {
    await board.screenshot({ path: path.join(OUT, `${t.id}.png`) });
  } else {
    const html = (await page.locator("#artboard table").first().evaluate((el) => el.outerHTML)).replaceAll('src="/brand/', 'src="https://ausdauer.shop/brand/');
    fs.writeFileSync(path.join(OUT, `${t.id}.html`), `<!doctype html><html lang="de"><head><meta charset="utf-8"><title>AUSDAUER E-Mail-Signatur</title></head><body>${html}</body></html>\n`);
    await board.screenshot({ path: path.join(OUT, `${t.id}.png`) });
  }
  console.log("exported", t.id);
}

// PNG logo for e-mail clients (2× for sharp display at 160 px)
await page.setContent(`<body style="margin:0"><img id="l" src="${BASE}/brand/logos/ausdauer-rot.svg" style="width:320px;display:block"></body>`);
await page.waitForLoadState("networkidle");
await page.locator("#l").screenshot({ path: path.resolve(import.meta.dirname, "..", "public", "brand", "logos", "ausdauer-rot.png"), omitBackground: true });
console.log("exported logo png");

await browser.close();
