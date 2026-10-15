import QRCode from "qrcode";
import { cn } from "@/lib/utils";

/** QR code as inline SVG (vector – sharp in print). Rendered on the server. */
export async function QrCode({ url, className, dark = "#222222", light = "#FFFFFF" }: { url: string; className?: string; dark?: string; light?: string }) {
  const svg = await QRCode.toString(url, { type: "svg", margin: 0, errorCorrectionLevel: "M", color: { dark, light } });
  return <div role="img" aria-label={`QR-Code: ${url}`} className={cn("[&>svg]:h-full [&>svg]:w-full", className)} dangerouslySetInnerHTML={{ __html: svg }} />;
}
