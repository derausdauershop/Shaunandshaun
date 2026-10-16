import { describe, expect, it } from "vitest";
import { isGiftQrIdentifier } from "./gift-qr";

describe("isGiftQrIdentifier", () => {
  it("accepts Shopify gift card identifiers", () => {
    expect(isGiftQrIdentifier("shopify-giftcard-v1-3TKWJKJBM3X7PBRK")).toBe(true);
  });

  it("rejects anything else", () => {
    expect(isGiftQrIdentifier(null)).toBe(false);
    expect(isGiftQrIdentifier("")).toBe(false);
    expect(isGiftQrIdentifier("https://evil.example")).toBe(false);
    expect(isGiftQrIdentifier("shopify-giftcard-v1-short")).toBe(false);
    expect(isGiftQrIdentifier("shopify-giftcard-v1-3TKWJKJBM3X7PBRK<script>")).toBe(false);
  });
});
