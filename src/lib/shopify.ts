/**
 * Shopify Storefront API (PROJ-10) – server side only.
 * Reads the gift card product and creates a one-line cart whose checkout URL we redirect to.
 * Config: SHOPIFY_STORE_DOMAIN, SHOPIFY_STOREFRONT_TOKEN (Vercel env, never in the repo).
 */
import { z } from "zod";
import { FALLBACK_VOUCHER, type VoucherProduct } from "@/content/voucher";

const API_VERSION = "2025-07";
export const VOUCHER_HANDLE = "geschenk-gutschein";

/** Line attributes Shopify uses for gift cards sent to a recipient (same keys as the theme's recipient form). */
export const RECIPIENT_KEYS = {
  send: "__shopify_send_gift_card_to_customer",
  email: "Recipient email",
  name: "Recipient name",
  message: "Message",
  sendOn: "Send on",
} as const;

function config() {
  const domain = process.env.SHOPIFY_STORE_DOMAIN;
  const token = process.env.SHOPIFY_STOREFRONT_TOKEN;
  return domain && token ? { domain, token } : null;
}

async function storefront<T>(query: string, variables: Record<string, unknown>, revalidate: number | false): Promise<T> {
  const cfg = config();
  if (!cfg) throw new Error("Shopify is not configured");
  const res = await fetch(`https://${cfg.domain}/api/${API_VERSION}/graphql.json`, {
    method: "POST",
    headers: { "Content-Type": "application/json", "X-Shopify-Storefront-Access-Token": cfg.token },
    body: JSON.stringify({ query, variables }),
    ...(revalidate === false ? { cache: "no-store" as const } : { next: { revalidate } }),
  });
  if (!res.ok) throw new Error(`Shopify responded ${res.status}`);
  const json = (await res.json()) as { data?: T; errors?: Array<{ message: string }> };
  if (json.errors?.length || !json.data) throw new Error(json.errors?.[0]?.message ?? "Shopify returned no data");
  return json.data;
}

const PRODUCT_QUERY = /* GraphQL */ `
  query Voucher($handle: String!) {
    product(handle: $handle) {
      handle
      title
      availableForSale
      variants(first: 50) {
        nodes { id availableForSale price { amount } }
      }
    }
  }
`;

type ProductResponse = {
  product: null | {
    handle: string;
    title: string;
    availableForSale: boolean;
    variants: { nodes: Array<{ id: string; availableForSale: boolean; price: { amount: string } }> };
  };
};

export type VoucherResult = { product: VoucherProduct; live: boolean };

/** Gift card amounts, live from Shopify (cached 5 min). Falls back to the last known amounts. */
export async function getVoucherProduct(): Promise<VoucherResult> {
  try {
    const { product } = await storefront<ProductResponse>(PRODUCT_QUERY, { handle: VOUCHER_HANDLE }, 300);
    if (!product) throw new Error("Voucher product not found");
    const variants = product.variants.nodes
      .filter((v) => v.availableForSale)
      .map((v) => ({ id: v.id, amount: Number(v.price.amount) }))
      .sort((a, b) => a.amount - b.amount);
    if (!variants.length) throw new Error("No voucher amounts available");
    return { product: { handle: product.handle, variants }, live: true };
  } catch {
    return { product: FALLBACK_VOUCHER, live: false };
  }
}

/** Shopify product page for one amount – used when the API is unavailable. */
export function productUrl(variantId?: string) {
  const domain = process.env.SHOPIFY_STORE_DOMAIN ?? "der-ausdauer-shop.myshopify.com";
  const numeric = variantId?.split("/").pop();
  return `https://${domain}/products/${VOUCHER_HANDLE}${numeric ? `?variant=${numeric}` : ""}`;
}

// ---------- order form ----------

const today = () => new Intl.DateTimeFormat("sv-SE", { timeZone: "Europe/Berlin" }).format(new Date());

export const voucherOrderSchema = z
  .object({
    variantId: z.string().regex(/^gid:\/\/shopify\/ProductVariant\/\d+$/, "Bitte wähle einen Betrag."),
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
export async function createVoucherCheckout(order: VoucherOrder, allowedVariantIds: string[]): Promise<string> {
  if (!allowedVariantIds.includes(order.variantId)) throw new Error("Unknown voucher amount");
  const data = await storefront<CartResponse>(
    CART_MUTATION,
    { lines: [{ merchandiseId: order.variantId, quantity: 1, attributes: recipientAttributes(order) }] },
    false,
  );
  const url = data.cartCreate.cart?.checkoutUrl;
  if (!url) throw new Error(data.cartCreate.userErrors[0]?.message ?? "Checkout could not be created");
  return url;
}
