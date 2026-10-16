/** Company facts, channels and navigation – single source of truth for the website. */

export const COMPANY = {
  brand: "AUSDAUER",
  legalName: "Der Ausdauer-Shop GmbH & Co. KG",
  founded: 1986,
  claim: "Wir leben Sport.",
  email: "info@ausdauer-shop.de",
  phone: "02741 4372",
  phoneHref: "tel:+4927414372",
  fax: "02741 971799",
  whatsapp: "https://wa.me/4927414372",
  instagram: "https://www.instagram.com/ausdauer.shop/",
  facebook: "https://www.facebook.com/ausdauershop",
  shop: "https://der-ausdauer-shop.myshopify.com",
  voucher: "https://der-ausdauer-shop.myshopify.com/products/geschenk-gutschein",
  url: "https://www.ausdauer-shop.de",
} as const;

/** Events, Lauftreffs and registration live in the app (no events page on the website any more). */
export const COMMUNITY_APP = {
  name: "Absolute Run Community",
  ios: "https://apps.apple.com/de/app/absolute-run-community/id6808254762",
  android: "https://play.google.com/store/apps/details?id=shop.ausdauer.absoluterun",
} as const;

export interface NavItem {
  href: string;
  label: string;
  external?: boolean;
}

export const MAIN_NAV: NavItem[] = [
  { href: "/laufanalyse", label: "Laufanalyse" },
  { href: "/stores", label: "Stores" },
  { href: "/run-academy", label: "Run Academy" },
  { href: "/ausdauer-cup", label: "AUSDAUER CUP" },
  { href: "/community", label: "Community" },
  { href: "/teamwear", label: "Teamwear" },
  { href: "/magazin", label: "Magazin" },
];

export const SECONDARY_NAV: NavItem[] = [
  { href: "/ueber-uns", label: "Über uns & Team" },
  { href: "/jobs", label: "Jobs" },
  { href: "/kontakt", label: "Kontakt" },
];

export const LEGAL_NAV: NavItem[] = [
  { href: "/impressum", label: "Impressum" },
  { href: "/datenschutz", label: "Datenschutz" },
];
