"use server";

import { redirect } from "next/navigation";
import { createVoucherCheckout, getVoucherProduct, productUrl, voucherOrderSchema } from "@/lib/shopify";

export interface VoucherFormState {
  errors?: Partial<Record<"variantId" | "recipientEmail" | "recipientName" | "message" | "sendOn" | "form", string>>;
}

const field = (data: FormData, key: string) => {
  const value = data.get(key);
  return typeof value === "string" && value.trim() !== "" ? value : undefined;
};

/** Validates the order on the server, creates a Shopify cart and sends the buyer to the Shopify checkout. */
export async function buyVoucher(_prev: VoucherFormState, data: FormData): Promise<VoucherFormState> {
  const parsed = voucherOrderSchema.safeParse({
    variantId: field(data, "variantId") ?? "",
    gift: data.get("gift") === "on",
    recipientName: field(data, "recipientName"),
    recipientEmail: field(data, "recipientEmail"),
    message: field(data, "message"),
    sendOn: field(data, "sendOn"),
  });
  if (!parsed.success) {
    const errors: VoucherFormState["errors"] = {};
    for (const issue of parsed.error.issues) {
      const key = String(issue.path[0] ?? "form") as keyof NonNullable<VoucherFormState["errors"]>;
      errors[key] ??= issue.message;
    }
    return { errors };
  }

  const { product, live } = await getVoucherProduct();
  const allowed = product.variants.map((v) => v.id);
  if (!allowed.includes(parsed.data.variantId)) return { errors: { variantId: "Diesen Betrag gibt es nicht mehr. Bitte wähle einen anderen." } };

  let checkoutUrl: string;
  try {
    if (!live) throw new Error("Shopify unavailable");
    checkoutUrl = await createVoucherCheckout(parsed.data, allowed);
  } catch {
    // Shopify API down: the product page in the Shopify shop still sells the voucher.
    checkoutUrl = productUrl(parsed.data.variantId);
  }
  redirect(checkoutUrl);
}
