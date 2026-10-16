import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { RECIPIENT_KEYS, createVoucherCheckout, productUrl, recipientAttributes, voucherCheckoutUrl, voucherOrderSchema } from "./shopify";

const V50 = "gid://shopify/ProductVariant/58267034780035";
const reply = (data: unknown) => Promise.resolve(new Response(JSON.stringify({ data }), { status: 200 }));

describe("shopify voucher", () => {
  beforeEach(() => {
    vi.stubEnv("NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN", "test-shop.myshopify.com");
    vi.stubEnv("NEXT_PUBLIC_SHOPIFY_STOREFRONT_TOKEN", "public-token");
  });
  afterEach(() => {
    vi.unstubAllEnvs();
    vi.unstubAllGlobals();
  });

  it("creates a one-line cart with recipient attributes and returns the checkout URL", async () => {
    const fetchSpy = vi.fn((_url: string, init: RequestInit) => {
      const body = JSON.parse(String(init.body));
      expect(body.variables.lines).toEqual([
        {
          merchandiseId: V50,
          quantity: 1,
          attributes: [
            { key: RECIPIENT_KEYS.send, value: "on" },
            { key: RECIPIENT_KEYS.email, value: "lena@example.com" },
            { key: RECIPIENT_KEYS.name, value: "Lena" },
            { key: RECIPIENT_KEYS.message, value: "Viel Spaß!" },
          ],
        },
      ]);
      return reply({ cartCreate: { cart: { checkoutUrl: "https://test-shop.myshopify.com/cart/c/abc" }, userErrors: [] } });
    });
    vi.stubGlobal("fetch", fetchSpy);
    const order = voucherOrderSchema.parse({ variantId: V50, gift: true, recipientName: "Lena", recipientEmail: "lena@example.com", message: "Viel Spaß!" });
    await expect(createVoucherCheckout(order)).resolves.toBe("https://test-shop.myshopify.com/cart/c/abc");
    expect(fetchSpy.mock.calls[0][0]).toBe("https://test-shop.myshopify.com/api/2025-07/graphql.json");
  });

  it("falls back to the Shopify product page when the API fails", async () => {
    vi.stubGlobal("fetch", vi.fn(() => Promise.resolve(new Response("down", { status: 503 }))));
    const order = voucherOrderSchema.parse({ variantId: V50, gift: false });
    await expect(voucherCheckoutUrl(order)).resolves.toBe(productUrl(V50));
  });

  it("falls back without calling Shopify when no token is configured", async () => {
    vi.stubEnv("NEXT_PUBLIC_SHOPIFY_STOREFRONT_TOKEN", "");
    const fetchSpy = vi.fn();
    vi.stubGlobal("fetch", fetchSpy);
    await expect(voucherCheckoutUrl(voucherOrderSchema.parse({ variantId: V50, gift: false }))).resolves.toBe(productUrl(V50));
    expect(fetchSpy).not.toHaveBeenCalled();
  });

  it("validates amount and gift fields", () => {
    expect(voucherOrderSchema.safeParse({ variantId: "gid://shopify/ProductVariant/999", gift: false }).success).toBe(false);
    expect(voucherOrderSchema.safeParse({ variantId: V50, gift: true, recipientEmail: "kein-mail" }).success).toBe(false);
    expect(voucherOrderSchema.safeParse({ variantId: V50, gift: true, recipientEmail: "a@b.de", message: "x".repeat(201) }).success).toBe(false);
    expect(voucherOrderSchema.safeParse({ variantId: V50, gift: true, recipientEmail: "a@b.de", sendOn: "2000-01-01" }).success).toBe(false);
    // without "gift" the recipient fields are ignored
    expect(recipientAttributes(voucherOrderSchema.parse({ variantId: V50, gift: false, recipientEmail: "a@b.de" }))).toEqual([]);
  });

  it("builds the product page fallback URL", () => {
    expect(productUrl(V50)).toBe("https://test-shop.myshopify.com/products/geschenk-gutschein?variant=58267034780035");
  });
});
