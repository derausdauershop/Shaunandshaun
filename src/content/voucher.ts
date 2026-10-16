/** Gift card (PROJ-10). Amounts come live from Shopify; these are the last known ones (2026-10-16) as fallback. */

export interface VoucherProduct {
  handle: string;
  variants: Array<{ id: string; amount: number }>;
}

const v = (id: number, amount: number) => ({ id: `gid://shopify/ProductVariant/${id}`, amount });

export const FALLBACK_VOUCHER: VoucherProduct = {
  handle: "geschenk-gutschein",
  variants: [
    v(58267034714499, 10),
    v(58407425311107, 15),
    v(58274098315651, 20),
    v(58267034747267, 25),
    v(58274098348419, 30),
    v(58365342646659, 40),
    v(58267034780035, 50),
    v(58365342679427, 80),
    v(58267034812803, 100),
    v(58267034845571, 150),
    v(58267034878339, 200),
    v(58267034911107, 300),
  ],
};

export const VOUCHER_FACTS = [
  { title: "Sofort per E-Mail", text: "Du bekommst den Gutschein direkt nach dem Kauf – oder wir schicken ihn zum Wunschtermin an die beschenkte Person." },
  { title: "Betzdorf, Siegen & online", text: "Einlösbar in beiden Stores und online. QR-Code an der Kasse zeigen oder Code nennen." },
  { title: "Restguthaben bleibt", text: "Du musst nicht alles auf einmal ausgeben. Der Rest bleibt auf dem Gutschein." },
];

export const formatEuro = (amount: number) =>
  new Intl.NumberFormat("de-DE", { style: "currency", currency: "EUR", minimumFractionDigits: 0, maximumFractionDigits: 2 }).format(amount);
