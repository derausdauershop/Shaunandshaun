import type { OpeningHours } from "@/lib/opening-hours";

export interface Store {
  slug: "betzdorf" | "siegen";
  name: string;
  /** Name on the street sign – Siegen runs the Sport 2000 format "Absolute Run Ausdauer" */
  signName: string;
  partner: boolean;
  street: string;
  zip: string;
  city: string;
  phone: string;
  phoneHref: string;
  size: string;
  since: number;
  focus: string[];
  intro: string;
  hours: OpeningHours;
  image: string;
  gallery: string[];
}

export const STORES: Store[] = [
  {
    slug: "betzdorf",
    name: "AUSDAUER Betzdorf",
    signName: "AUSDAUER",
    partner: false,
    street: "Wilhelmstraße 16",
    zip: "57518",
    city: "Betzdorf",
    phone: "02741 4372",
    phoneHref: "tel:+4927414372",
    size: "400 m²",
    since: 1986,
    focus: ["Running", "Laufanalyse", "Einlagen", "Wandern & Outdoor", "Fitness & Lifestyle"],
    intro:
      "Hier hat alles angefangen: 1986 auf 40 m², heute auf 400 m². Running mit Laufanalyse, eine große Wanderschuh- und Outdoor-Abteilung und alles für deinen aktiven Alltag.",
    hours: {
      mo: [["09:30", "18:30"]],
      di: [["09:30", "18:30"]],
      mi: [["09:30", "18:30"]],
      do: [["09:30", "18:30"]],
      fr: [["09:30", "18:30"]],
      sa: [["09:30", "14:00"]],
      so: [],
    },
    image: "/images/betzdorf-laufbahn.webp",
    gallery: ["/images/betzdorf-schaufenster.webp", "/images/betzdorf-beratung.webp", "/images/betzdorf-outdoor-schuhe.webp", "/images/betzdorf-outdoor.webp"],
  },
  {
    slug: "siegen",
    name: "Absolute Run Ausdauer Siegen",
    signName: "Absolute Run Ausdauer",
    partner: true,
    street: "Koblenzer Straße 40",
    zip: "57072",
    city: "Siegen",
    phone: "0271 77005090",
    phoneHref: "tel:+4927177005090",
    size: "230 m²",
    since: 2019,
    focus: ["Running", "Laufanalyse", "Laufbekleidung", "Laufuhren & Zubehör", "Crown Town Runners"],
    intro:
      "Seit September 2019 dein Laufspezialist in Siegen. 230 m², die sich komplett ums Laufen drehen – von der Laufschuhberatung mit Analyse bis zu Laufuhren und Trinksystemen.",
    hours: {
      mo: [["10:00", "18:30"]],
      di: [["10:00", "18:30"]],
      mi: [["10:00", "18:30"]],
      do: [["10:00", "18:30"]],
      fr: [["10:00", "18:30"]],
      sa: [["10:00", "16:00"]],
      so: [],
    },
    image: "/images/siegen-store.webp",
    gallery: ["/images/siegen-aussen.webp", "/images/siegen-laufbahn.webp", "/images/siegen-lounge.webp", "/images/siegen-theke.webp"],
  },
];

export const mapsUrl = (s: Store) =>
  `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`${s.street}, ${s.zip} ${s.city}`)}`;

export const storeBySlug = (slug: string) => STORES.find((s) => s.slug === slug);
