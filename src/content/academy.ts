import { COMPANY } from "./site";

export interface Course {
  slug: string;
  title: string;
  level: string;
  status: "buchbar" | "in-planung";
  price?: string;
  bookingUrl?: string;
  summary: string;
  contents: string[];
  includes?: string[];
  note?: string;
}

export const COURSES: Course[] = [
  {
    slug: "einsteiger-laufkurs",
    title: "Einsteiger-Laufkurs",
    level: "Für alle, die (wieder) anfangen",
    status: "buchbar",
    price: "130 €",
    bookingUrl: `${COMPANY.shop}/products/einsteiger-laufkurs`,
    summary: "Schritt für Schritt zu einem gesunden, regelmäßigen Lauftraining – in der Gruppe, mit Coach und mit Plan.",
    contents: [
      "1× pro Woche betreute Trainingseinheit mit professionellem Coaching",
      "Schritt für Schritt zu einem gesunden und regelmäßigen Lauftraining",
      "Gemeinsam laufen, motiviert bleiben und Spaß haben",
      "Laufspezifische Kräftigung und funktionelles Training",
      "Lauftechnik und Koordination verbessern",
    ],
    includes: [
      "Trainingsplan für die gesamte Kursdauer: 1× zusätzliches Training pro Woche + Krafttraining",
      "6–8 Koordinations- und Technikübungen erklärt",
      "6–8 Lauf-Kräftigungsübungen",
      "Grundlagen des Ausdauertrainings",
    ],
    note: "Kommt der Kurs wegen zu weniger Anmeldungen nicht zustande, bekommst du den vollen Preis zurück.",
  },
  {
    slug: "10-km-halbmarathon",
    title: "10 km & Halbmarathon",
    level: "Für Fortgeschrittene mit Wettkampfziel",
    status: "in-planung",
    summary: "Strukturierte Vorbereitung auf dein Rennen – zum Beispiel einen Lauf aus dem AUSDAUER CUP.",
    contents: ["Trainingsplan auf dein Zielrennen", "Tempo- und Intervalltraining in der Gruppe", "Tipps zu Ernährung, Material und Renntag"],
  },
  {
    slug: "lauf-abc-technik",
    title: "Lauf-ABC & Technik",
    level: "Für alle Niveaus",
    status: "in-planung",
    summary: "Effizienter und verletzungsärmer laufen – Workshop mit Lauf-ABC und Videoanalyse.",
    contents: ["Lauf-ABC und Koordination", "Videoanalyse deines Laufstils", "Übungen für zu Hause"],
  },
];

export const courseBySlug = (slug: string) => COURSES.find((c) => c.slug === slug);
