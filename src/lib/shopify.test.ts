import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { FALLBACK_VOUCHER } from "@/content/voucher";
import { RECIPIENT_KEYS, createVoucherCheckout, getVoucherProduct, productUrl, recipientAttributes, voucherOrderSchema } from "./shopify";

const V50 = "gid://shopify/ProductVariant/58267034780035";
const reply = (data: unknown) => Promise.resolve(new Response(JSON.stringify({ data }), { status: 200 }));

describe("shopify voucher", () => {
  beforeEach(() => {
    vi.stubEnv("SHOPIFY_STORE_DOMAIN", "test-shop.myshopify.com");
    vi.stubEnv("SHOPIFY_STOREFRONT_TOKEN", "public-token");
  });
  afterEach(() => {
    vi.unstubAllEnvs();
    vi.unstubAllGlobals();
  });

  it("reads available amounts from Shopify, sorted", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn(() =>
        reply({
          product: {
            handle: "geschenk-gutschein",
            title: "Gutschein",
            availableForSale: true,
            variants: {
              nodes: [
                { id: "gid://shopify/ProductVariant/2", availableForSale: true, price: { amount: "50.0" } },
                { id: "gid://shopify/ProductVariant/1", availableForSale: true, price: { amount: "10.0" } },
                { id: "gid://shopify/ProductVariant/3", availableForSale: false, price: { amount: "300.0" } },
              ],
            },
          },
        }),
      ),
    );
    const { product, live } = await getVoucherProduct();
    expect(live).toBe(true);
    expect(product.variants.map((v) => v.amount)).toEqual([10, 50]);
  });

  it("falls back to the last known amounts when Shopify is down", async () => {
    vi.stubGlobal("fetch", vi.fn(() => Promise.resolve(new Response("down", { status: 503 }))));
    const { product, live } = await getVoucherProduct();
    expect(live).toBe(false);
    expect(product).toEqual(FALLBACK_VOUCHER);
  });

  it("falls back when no token is configured", async () => {
    vi.stubEnv("SHOPIFY_STOREFRONT_TOKEN", "");
    const fetchSpy = vi.fn();
    vi.stubGlobal("fetch", fetchSpy);
    expect((await getVoucherProduct()).live).toBe(false);
    expect(fetchSpy).not.toHaveBeenCalled();
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
    await expect(createVoucherCheckout(order, [V50])).resolves.toBe("https://test-shop.myshopify.com/cart/c/abc");
  });

  it("refuses variants that are not voucher amounts", async () => {
    const order = voucherOrderSchema.parse({ variantId: "gid://shopify/ProductVariant/999", gift: false });
    await expect(createVoucherCheckout(order, [V50])).rejects.toThrow("Unknown voucher amount");
  });

  it("validates the gift fields", () => {
    expect(voucherOrderSchema.safeParse({ variantId: V50, gift: true, recipientEmail: "kein-mail" }).success).toBe(false);
    expect(voucherOrderSchema.safeParse({ variantId: V50, gift: true, recipientEmail: "a@b.de", message: "x".repeat(201) }).success).toBe(false);
    expect(voucherOrderSchema.safeParse({ variantId: V50, gift: true, recipientEmail: "a@b.de", sendOn: "2000-01-01" }).success).toBe(false);
    expect(voucherOrderSchema.safeParse({ variantId: "evil", gift: false }).success).toBe(false);
    // without "gift" the recipient fields are ignored
    expect(recipientAttributes(voucherOrderSchema.parse({ variantId: V50, gift: false, recipientEmail: "a@b.de" }))).toEqual([]);
  });

  it("builds the product page fallback URL", () => {
    expect(productUrl(V50)).toBe("https://test-shop.myshopify.com/products/geschenk-gutschein?variant=58267034780035");
  });
});
