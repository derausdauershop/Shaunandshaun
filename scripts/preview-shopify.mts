/**
 * Renders the Shopify Liquid templates (PROJ-11) with sample data into
 * self-contained HTML previews: shopify/preview/*.html
 *
 *   npm run preview:shopify
 *
 * Shopify-only filters are emulated; assets are inlined as data URIs.
 */
import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { extname, join } from "node:path";
import { Liquid } from "liquidjs";
import QRCode from "qrcode";

const ROOT = new URL("..", import.meta.url).pathname;
const SHOPIFY = join(ROOT, "shopify");
const OUT = join(SHOPIFY, "preview");

const MIME: Record<string, string> = { ".woff2": "font/woff2", ".svg": "image/svg+xml", ".css": "text/css", ".png": "image/png", ".js": "text/javascript" };
const dataUri = (buf: Buffer | string, ext: string) => `data:${MIME[ext]};base64,${Buffer.from(buf).toString("base64")}`;
const asset = (name: string) => dataUri(readFileSync(join(SHOPIFY, "theme/assets", name)), extname(name));

/** Stand-in for Shopify's vendor/qrcode.js (same constructor API). */
async function qrShim(text: string) {
  const svg = await QRCode.toString(text, { type: "svg", margin: 0, color: { dark: "#222222", light: "#FFFFFF" } });
  return `window.QRCode=function(el){el.innerHTML=${JSON.stringify(svg)};};`;
}
const WALLET_BADGE = `<svg xmlns="http://www.w3.org/2000/svg" width="120" height="40" viewBox="0 0 120 40"><rect width="120" height="40" rx="6" fill="#000"/><text x="60" y="17" fill="#fff" font-family="Helvetica,Arial" font-size="8" text-anchor="middle">Add to</text><text x="60" y="30" fill="#fff" font-family="Helvetica,Arial" font-size="12" font-weight="bold" text-anchor="middle">Apple Wallet</text></svg>`;

function money(cents: number) {
  const value = (cents / 100).toFixed(2).replace(".", ",");
  return `${value.endsWith(",00") ? value.slice(0, -3) : value} €`;
}

async function engine(qrIdentifier: string) {
  const shim = await qrShim(qrIdentifier);
  const liquid = new Liquid({ root: SHOPIFY, extname: ".liquid", strictFilters: true });
  liquid.registerFilter("money_without_trailing_zeros", (c: number) => money(c));
  liquid.registerFilter("format_code", (code: string) => String(code).replace(/(.{4})(?=.)/g, "$1 "));
  liquid.registerFilter("asset_url", (name: string) => asset(name));
  liquid.registerFilter("shopify_asset_url", (name: string) =>
    name === "vendor/qrcode.js" ? dataUri(shim, ".js") : dataUri(WALLET_BADGE, ".svg"),
  );
  liquid.registerFilter("script_tag", (src: string) => `<script src="${src}"></script>`);
  liquid.registerFilter("stylesheet_tag", (href: string) => `<link rel="stylesheet" href="${href}">`);
  return liquid;
}

const giftCard = (overrides: Record<string, unknown> = {}) => ({
  code: "7K2MQX9P4TRVHB3C",
  qr_identifier: "shopify-giftcard-v1-7K2MQX9P4TRVHB3C",
  initial_value: 5000,
  balance: 5000,
  enabled: true,
  expired: false,
  expires_on: null,
  url: "gutschein-seite.html",
  pass_url: "#apple-wallet",
  message: "Für deinen ersten Halbmarathon – viel Spaß beim Training!\nTom",
  customer: { first_name: "Lena" },
  ...overrides,
});

async function main() {
  mkdirSync(OUT, { recursive: true });
  const card = giftCard();
  const liquid = await engine(card.qr_identifier);
  const shop = { name: "AUSDAUER", email_logo_url: dataUri(readFileSync(join(SHOPIFY, "email/ausdauer-logo-email@2x.png")), ".png") };

  // E-Mail: the QR image comes from https://ausdauer.shop/api/gift-qr in production.
  const qrPng = await QRCode.toDataURL(card.qr_identifier, { width: 480, margin: 2, color: { dark: "#222222", light: "#FFFFFF" } });
  let mail = await liquid.renderFile("notifications/geschenkgutschein-erstellt", { gift_card: card, shop });
  mail = mail.replace(/https:\/\/ausdauer\.shop\/api\/gift-qr\?id=[^"]+/, qrPng);
  writeFileSync(join(OUT, "gutschein-mail.html"), mail);

  const pages = {
    "gutschein-seite.html": giftCard({ balance: 2000, expires_on: "2029-12-31" }),
    "gutschein-seite-abgelaufen.html": giftCard({ expired: true, expires_on: "2025-12-31", pass_url: null }),
  };
  for (const [file, gift_card] of Object.entries(pages)) {
    writeFileSync(join(OUT, file), await liquid.renderFile("theme/templates/gift_card", { gift_card, shop, content_for_header: "" }));
  }
  console.log(`Previews written to ${OUT}`);
}

main();
