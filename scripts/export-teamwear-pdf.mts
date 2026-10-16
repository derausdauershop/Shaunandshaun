/**
 * Vector PDFs of the AUSDAUER TEAMWEAR textile marks for textile printers (PROJ-12).
 * Each PDF has the recommended print width, the page is cropped to the mark.
 *   npm run brand:teamwear-pdf
 */
import fs from "node:fs";
import path from "node:path";
import { chromium } from "@playwright/test";

const ROOT = path.resolve(import.meta.dirname, "..");
const DIR = path.join(ROOT, "public", "brand", "teamwear");
const OUT = path.join(DIR, "pdf");
/** Recommended width in mm per mark (see src/lib/brand/teamwear.ts). */
const WIDTH: Record<string, number> = { "aermel-plakette": 35, "aermel-badge": 40, logo: 75, innendruck: 50 };

const browser = await chromium.launch({ executablePath: process.env.PW_CHROMIUM || "/opt/pw-browsers/chromium" });
const page = await browser.newPage();
fs.mkdirSync(OUT, { recursive: true });
for (const file of fs.readdirSync(DIR).filter((f) => f.startsWith("textil-") && f.endsWith(".svg"))) {
  const mark = Object.keys(WIDTH).find((k) => file.includes(k))!;
  const svg = fs.readFileSync(path.join(DIR, file), "utf8");
  const [, , vw, vh] = svg.match(/viewBox="([^"]+)"/)![1].split(/\s+/).map(Number);
  const w = WIDTH[mark];
  const h = Math.round(((w * vh) / vw) * 100) / 100;
  await page.setContent(`<style>@page{size:${w}mm ${h}mm;margin:0}html,body{margin:0}svg{display:block;width:${w}mm;height:${h}mm}</style>${svg}`);
  await page.pdf({ path: path.join(OUT, file.replace(".svg", ".pdf")), width: `${w}mm`, height: `${h}mm`, printBackground: false, pageRanges: "1" });
  console.log(`wrote pdf/${file.replace(".svg", ".pdf")} (${w} × ${h} mm)`);
}
await browser.close();
