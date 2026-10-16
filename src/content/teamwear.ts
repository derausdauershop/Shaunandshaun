/** AUSDAUER TEAMWEAR – content for /teamwear (PROJ-13). Edit texts here. */

export const TEAMWEAR = {
  name: "AUSDAUER TEAMWEAR",
  claim: "Bedruckt in Betzdorf",
  partner: "Offizieller JAKO Teamwear Partner",
  /** Order shop for clubs is still in beta – not linked yet. */
  clubShopLive: false,
} as const;

export interface Audience {
  title: string;
  text: string;
  points: string[];
}

export const AUDIENCES: Audience[] = [
  {
    title: "Für Vereine",
    text: "Vom Trikotsatz der Ersten bis zur Trainingsjacke der Bambini: Wir statten euren Verein mit JAKO aus und bedrucken alles bei uns in Betzdorf.",
    points: ["Trikots, Hosen, Stutzen, Trainingsanzüge", "Wappen, Sponsor, Namen und Nummern", "Nachbestellungen für neue Spieler:innen"],
  },
  {
    title: "Für Firmen",
    text: "Einheitliche Kleidung fürs Team, den Firmenlauf oder den Messestand: Shirts, Polos, Softshells und Hoodies mit eurem Logo.",
    points: ["JAKO Corporate Teamwear", "Logo auf Brust, Rücken oder Ärmel", "Kleine und große Stückzahlen"],
  },
];

export interface Method {
  name: string;
  short: string;
  text: string;
  bestFor: string[];
}

export const METHODS: Method[] = [
  {
    name: "Flextransfer",
    short: "Flex",
    text: "Die Folie wird geplottet, entgittert und aufgepresst. Satte, deckende Farben mit klaren Kanten.",
    bestFor: ["Namen und Rückennummern", "1- bis 2-farbige Logos", "Schriftzüge"],
  },
  {
    name: "Direct-to-Film",
    short: "DTF",
    text: "Das Motiv wird farbig auf Film gedruckt und dann übertragen. Feine Details und Verläufe in voller Farbe.",
    bestFor: ["Mehrfarbige Wappen", "Sponsorlogos mit Verläufen", "Fotos und feine Details"],
  },
];

export interface Club {
  name: string;
  crest: string;
}

/** References – crests used with the clubs' permission. */
export const CLUBS: Club[] = [
  { name: "SG 06 Betzdorf", crest: "/images/vereine/sg-06-betzdorf.png" },
  { name: "TuS Weitefeld", crest: "/images/vereine/tus-weitefeld.png" },
  { name: "JSG Weitefeld-Neunkhausen", crest: "/images/vereine/jsg-weitefeld-neunkhausen.png" },
  { name: "Sportfreunde Daaden", crest: "/images/vereine/sportfreunde-daaden.png" },
  { name: "VfB Niederdreisbach", crest: "/images/vereine/vfb-niederdreisbach.png" },
];

export interface Kit {
  club: string;
  title: string;
  front: string;
  back: string;
  /** What we printed – from the print approval */
  prints: string[];
}

/** Mock-ups from real print approvals (player names removed). */
export const KITS: Kit[] = [
  {
    club: "SG 06 Betzdorf",
    title: "Spielertrikot 1. Mannschaft 25/26",
    front: "/images/teamwear/sg-06-betzdorf-vorne.webp",
    back: "/images/teamwear/sg-06-betzdorf-hinten.webp",
    prints: ["Wappen „120 Jahre“ ca. 80 mm", "Sponsor ca. 250 mm", "Schriftzug ca. 310 mm", "Nummer ca. 260 mm"],
  },
  {
    club: "TuS Weitefeld",
    title: "Spielertrikot",
    front: "/images/teamwear/tus-weitefeld-vorne.webp",
    back: "/images/teamwear/tus-weitefeld-hinten.webp",
    prints: ["Wappen ca. 80 mm", "Sponsor ca. 250 mm", "Nummer ca. 240 mm"],
  },
];

export const STEPS = [
  { title: "Anfrage", text: "Ruf an, schreib uns oder komm in Betzdorf vorbei. Sag uns, was ihr braucht und wie viele." },
  { title: "Muster & Größen", text: "Wir zeigen dir die passenden JAKO-Modelle. Größen könnt ihr bei uns anprobieren." },
  { title: "Druckfreigabe", text: "Du bekommst eine Ansicht von vorn und hinten mit allen Maßen – so wie auf dieser Seite." },
  { title: "Druck", text: "Nach deiner Freigabe drucken wir in unserer Werkstatt in Betzdorf." },
  { title: "Übergabe", text: "Abholung im Store oder Lieferung an den Verein." },
];

export const FAQ = [
  {
    q: "Gibt es eine Mindestmenge?",
    a: "Sprich uns an – wir drucken für ganze Vereine genauso wie für ein einzelnes Team. Den Preis bekommst du mit dem Angebot.",
  },
  {
    q: "Wie lange dauert es?",
    a: "Das hängt von der Verfügbarkeit bei JAKO und vom Umfang ab. Den Termin nennen wir dir mit dem Angebot.",
  },
  {
    q: "Welche Druckdaten braucht ihr?",
    a: "Am besten Vektordateien (PDF, SVG, AI oder EPS). Wenn ihr nur ein Bild habt, schick es trotzdem – wir prüfen es und sagen dir, was geht.",
  },
  {
    q: "Können wir später nachbestellen?",
    a: "Ja. Neue Spieler:innen bekommen das gleiche Trikot mit Namen und Nummer nach der Druckfreigabe, die wir für euch angelegt haben.",
  },
  {
    q: "Druckt ihr auch auf mitgebrachte Kleidung?",
    a: "Frag uns – ob ein Textil sich bedrucken lässt, hängt vom Material ab. Wir testen das vorher.",
  },
];
