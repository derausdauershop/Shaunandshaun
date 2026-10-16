/** AUSDAUER TEAMWEAR – content for /teamwear (PROJ-13). Edit texts here. */

export const TEAMWEAR = {
  name: "AUSDAUER TEAMWEAR",
  claim: "Bedruckt in Betzdorf",
  /** Leading teamwear brands we supply – named as text only, no brand logos. */
  brands: ["JAKO", "erima", "adidas"],
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
    text: "Vom Trikotsatz der Ersten bis zur Trainingsjacke der Bambini: Wir statten euren Verein mit JAKO, erima oder adidas aus und bedrucken alles bei uns in Betzdorf.",
    points: ["Trikots, Hosen, Stutzen, Trainingsanzüge", "Wappen, Sponsor, Namen und Nummern", "Nachbestellungen für neue Spieler:innen"],
  },
  {
    title: "Für Firmen",
    text: "Einheitliche Kleidung fürs Team, den Firmenlauf oder den Messestand: Shirts, Polos, Softshells und Hoodies mit eurem Logo.",
    points: ["Shirts, Polos, Softshells, Hoodies", "Logo auf Brust, Rücken oder Ärmel", "Ab einem Stück – ohne Mindestmenge"],
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

/** References – crests and kits shown with the clubs' permission (2026-10-16). */
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
  {
    club: "Sportfreunde Daaden",
    title: "Spielertrikot",
    front: "/images/teamwear/sportfreunde-daaden-vorne.webp",
    back: "/images/teamwear/sportfreunde-daaden-hinten.webp",
    prints: ["Wappen ca. 85 mm", "Sponsor ca. 250 mm", "Schriftzug ca. 275 mm", "Nummer ca. 240 mm"],
  },
];

export const STEPS = [
  { title: "Anfrage", text: "Ruf an, schreib uns oder komm in Betzdorf vorbei. Sag uns, was ihr braucht und wie viele." },
  { title: "Muster & Größen", text: "Wir zeigen dir die passenden Modelle von JAKO, erima und adidas. Größen könnt ihr bei uns anprobieren." },
  { title: "Druckfreigabe", text: "Du bekommst eine Ansicht von vorn und hinten mit allen Maßen – so wie auf dieser Seite." },
  { title: "Druck", text: "Nach deiner Freigabe drucken wir in unserer Werkstatt in Betzdorf." },
  { title: "Übergabe", text: "Abholung im Store oder Lieferung an den Verein." },
];
