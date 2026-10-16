/**
 * Shopify Storefront API (PROJ-10) – runs in the browser (static site on STRATO, no server).
 * Creates a one-line cart for the gift card and returns the Shopify checkout URL.
 * Config: NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN, NEXT_PUBLIC_SHOPIFY_STOREFRONT_TOKEN – the public Storefront token,
 * made for browsers, baked in at build time (never in the repo).
 */
import { z } from "zod";
import { FALLBACK_VOUCHER } from "@/content/voucher";

const API_VERSION = "2025-07";
export const VOUCHER_HANDLE = "geschenk-gutschein";
const DEFAULT_DOMAIN = "der-ausdauer-shop.myshopify.com";

/** Line attributes Shopify uses for gift cards sent to a recipient (same keys as the theme's recipient form). */
export const RECIPIENT_KEYS = {
  send: "__shopify_send_gift_card_to_customer",
  email: "Recipient email",
  name: "Recipient name",
  message: "Message",
  sendOn: "Send on",
} as const;

function config() {
  const domain = process.env.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN;
  const token = process.env.NEXT_PUBLIC_SHOPIFY_STOREFRONT_TOKEN;
  return domain && token ? { domain, token } : null;
}

/** Shopify product page for one amount – used when the API is unavailable. */
export function productUrl(variantId?: string) {
  const domain = process.env.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN ?? DEFAULT_DOMAIN;
  const numeric = variantId?.split("/").pop();
  return `https://${domain}/products/${VOUCHER_HANDLE}${numeric ? `?variant=${numeric}` : ""}`;
}

// ---------- order form ----------

const today = () => new Intl.DateTimeFormat("sv-SE", { timeZone: "Europe/Berlin" }).format(new Date());
const VARIANT_IDS: string[] = FALLBACK_VOUCHER.variants.map((v) => v.id);

export const voucherOrderSchema = z
  .object({
    variantId: z.string().refine((id) => VARIANT_IDS.includes(id), "Bitte wähle einen Betrag."),
    gift: z.boolean(),
    recipientName: z.string().trim().max(60, "Der Name ist zu lang.").optional(),
    recipientEmail: z.string().trim().optional(),
    message: z.string().trim().max(200, "Die Nachricht darf höchstens 200 Zeichen haben.").optional(),
    sendOn: z
      .string()
      .regex(/^\d{4}-\d{2}-\d{2}$/)
      .optional()
      .or(z.literal("")),
  })
  .superRefine((v, ctx) => {
    if (!v.gift) return;
    if (!v.recipientEmail || !z.email().safeParse(v.recipientEmail).success) {
      ctx.addIssue({ code: "custom", path: ["recipientEmail"], message: "Bitte gib eine gültige E-Mail-Adresse der beschenkten Person an." });
    }
    if (v.sendOn && v.sendOn < today()) {
      ctx.addIssue({ code: "custom", path: ["sendOn"], message: "Das Versanddatum darf nicht in der Vergangenheit liegen." });
    }
  });

export type VoucherOrder = z.infer<typeof voucherOrderSchema>;

/** Cart line attributes for a gift sent to someone else. */
export function recipientAttributes(order: VoucherOrder) {
  if (!order.gift || !order.recipientEmail) return [];
  const attrs: Array<{ key: string; value: string }> = [
    { key: RECIPIENT_KEYS.send, value: "on" },
    { key: RECIPIENT_KEYS.email, value: order.recipientEmail },
  ];
  if (order.recipientName) attrs.push({ key: RECIPIENT_KEYS.name, value: order.recipientName });
  if (order.message) attrs.push({ key: RECIPIENT_KEYS.message, value: order.message });
  if (order.sendOn && order.sendOn > today()) attrs.push({ key: RECIPIENT_KEYS.sendOn, value: order.sendOn });
  return attrs;
}

const CART_MUTATION = /* GraphQL */ `
  mutation Buy($lines: [CartLineInput!]!) {
    cartCreate(input: { lines: $lines }) {
      cart { checkoutUrl }
      userErrors { message }
    }
  }
`;

type CartResponse = { cartCreate: { cart: { checkoutUrl: string } | null; userErrors: Array<{ message: string }> } };

/** Creates a cart with exactly one voucher and returns the Shopify checkout URL. */
export async function createVoucherCheckout(order: VoucherOrder): Promise<string> {
  const cfg = config();
  if (!cfg) throw new Error("Shopify is not configured");
  const res = await fetch(`https://${cfg.domain}/api/${API_VERSION}/graphql.json`, {
    method: "POST",
    headers: { "Content-Type": "application/json", "X-Shopify-Storefront-Access-Token": cfg.token },
    body: JSON.stringify({
      query: CART_MUTATION,
      variables: { lines: [{ merchandiseId: order.variantId, quantity: 1, attributes: recipientAttributes(order) }] },
    }),
  });
  if (!res.ok) throw new Error(`Shopify responded ${res.status}`);
  const json = (await res.json()) as { data?: CartResponse; errors?: Array<{ message: string }> };
  const url = json.data?.cartCreate.cart?.checkoutUrl;
  if (!url) throw new Error(json.errors?.[0]?.message ?? json.data?.cartCreate.userErrors[0]?.message ?? "Checkout could not be created");
  return url;
}

/** Checkout URL for an order – falls back to the Shopify product page if the API fails (recipient data is then entered there). */
export async function voucherCheckoutUrl(order: VoucherOrder): Promise<string> {
  try {
    return await createVoucherCheckout(order);
  } catch {
    return productUrl(order.variantId);
  }
}
