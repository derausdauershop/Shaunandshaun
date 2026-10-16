import QRCode from "qrcode";
import { isGiftQrIdentifier } from "@/lib/gift-qr";

/** PNG QR code for the gift card email: GET /api/gift-qr?id=shopify-giftcard-v1-… */
export async function GET(request: Request) {
  const id = new URL(request.url).searchParams.get("id");
  if (!isGiftQrIdentifier(id)) {
    return new Response("Not found", { status: 404 });
  }
  const png = await QRCode.toBuffer(id, { type: "png", width: 480, margin: 2, errorCorrectionLevel: "M", color: { dark: "#222222", light: "#FFFFFF" } });
  return new Response(new Uint8Array(png), {
    headers: {
      "Content-Type": "image/png",
      // The identifier works like the gift card code: no shared CDN cache, no indexing.
      "Cache-Control": "private, max-age=31536000, immutable",
      "X-Robots-Tag": "noindex",
      "Referrer-Policy": "no-referrer",
    },
  });
}
