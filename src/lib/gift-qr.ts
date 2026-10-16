/**
 * QR image for the Shopify gift card email (PROJ-11).
 * Only Shopify gift card identifiers are accepted, so the endpoint cannot be
 * abused as a generic QR generator.
 */
const GIFT_QR_ID = /^shopify-giftcard-v1-[A-Za-z0-9]{8,64}$/;

export function isGiftQrIdentifier(value: string | null | undefined): value is string {
  return typeof value === "string" && GIFT_QR_ID.test(value);
}
