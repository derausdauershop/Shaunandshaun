export interface Course {
  slug: string;
  title: string;
  level: string;
  /** buchbar = online bookable, demnaechst = date announced but no booking yet, in-planung = idea */
  status: "buchbar" | "demnaechst" | "in-planung";
  /** Shown as start-number badge instead of a price, e.g. "Frühjahr" */
  start?: string;
  price?: string;
  bookingUrl?: string;
  /** Key facts from the course flyer */
  facts?: Array<{ label: string; value: string }>;
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
    status: "demnaechst",
    start: "Frühjahr",
    facts: [
      { label: "Ziel", value: "Von 0 auf 5 km" },
      { label: "Dauer", value: "8 Wochen" },
      { label: "Training", value: "1× pro Woche mit Coach" },
      { label: "Dazu", value: "Trainingsplan für zu Hause" },
    ],
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

/** Label for the status badge */
export const courseStatusLabel = (c: Course) =>
  c.status === "buchbar" ? "Jetzt buchbar" : c.status === "demnaechst" ? `Startet im ${c.start ?? "Frühjahr"}` : "In Planung";

export const courseBySlug = (slug: string) => COURSES.find((c) => c.slug === slug);
