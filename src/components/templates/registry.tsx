import { EmailSignature } from "./email-signature";
import * as P from "./print";
import * as S from "./social";

export type TemplateKind = "print" | "social" | "email";

export interface TemplateDef {
  id: string;
  title: string;
  group: string;
  kind: TemplateKind;
  /** Final (trim) size shown to people */
  format: string;
  /** Artboard size incl. bleed – used for PDF/PNG export */
  size: { w: number; h: number; unit: "mm" | "px" };
  /** Literal zoom class so Tailwind generates it – scales the artboard to ~300 px in the gallery */
  zoom: string;
  Component: () => React.ReactNode | Promise<React.ReactNode>;
}

const A5 = { w: 154, h: 216, unit: "mm" as const };
const DL = { w: 105, h: 216, unit: "mm" as const };
const POST = { w: 1080, h: 1350, unit: "px" as const };
const STORY = { w: 1080, h: 1920, unit: "px" as const };

export const TEMPLATES: TemplateDef[] = [
  { id: "academy-a5-vorne", title: "Run Academy Flyer – Vorderseite", group: "Run Academy", kind: "print", format: "A5 · 148 × 210 mm", size: A5, zoom: "[zoom:0.5]", Component: P.AcademyFlyerA5Front },
  { id: "academy-a5-hinten", title: "Run Academy Flyer – Rückseite", group: "Run Academy", kind: "print", format: "A5 · 148 × 210 mm", size: A5, zoom: "[zoom:0.5]", Component: P.AcademyFlyerA5Back },
  { id: "laufanalyse-dl-vorne", title: "Laufanalyse Flyer – Vorderseite", group: "Laufanalyse", kind: "print", format: "DIN lang · 99 × 210 mm", size: DL, zoom: "[zoom:0.5]", Component: P.AnalysisFlyerFront },
  { id: "laufanalyse-dl-hinten", title: "Laufanalyse Flyer – Rückseite", group: "Laufanalyse", kind: "print", format: "DIN lang · 99 × 210 mm", size: DL, zoom: "[zoom:0.5]", Component: P.AnalysisFlyerBack },
  { id: "laufanalyse-plakat-a2", title: "Plakat Laufanalyse", group: "Laufanalyse", kind: "print", format: "A2 · 420 × 594 mm", size: { w: 426, h: 600, unit: "mm" }, zoom: "[zoom:0.18]", Component: P.AnalysisPosterA2 },
  { id: "cup-a5-vorne", title: "AUSDAUER CUP Saisonkalender – Vorderseite", group: "AUSDAUER CUP", kind: "print", format: "A5 · 148 × 210 mm", size: A5, zoom: "[zoom:0.5]", Component: P.CupFlyerA5Front },
  { id: "cup-a5-hinten", title: "AUSDAUER CUP Saisonkalender – Rückseite", group: "AUSDAUER CUP", kind: "print", format: "A5 · 148 × 210 mm", size: A5, zoom: "[zoom:0.5]", Component: P.CupFlyerA5Back },
  { id: "crown-town-a5", title: "Crown Town Runners Flyer", group: "Community", kind: "print", format: "A5 · 148 × 210 mm", size: A5, zoom: "[zoom:0.5]", Component: P.CrownTownFlyerA5 },
  { id: "gutschein-vorne", title: "Geschenk-Gutschein – Vorderseite", group: "Geschäftsausstattung", kind: "print", format: "DIN lang quer · 210 × 99 mm", size: { w: 216, h: 105, unit: "mm" }, zoom: "[zoom:0.38]", Component: P.VoucherFront },
  { id: "gutschein-hinten", title: "Geschenk-Gutschein – Rückseite", group: "Geschäftsausstattung", kind: "print", format: "DIN lang quer · 210 × 99 mm", size: { w: 216, h: 105, unit: "mm" }, zoom: "[zoom:0.38]", Component: P.VoucherBack },
  { id: "visitenkarte-vorne", title: "Visitenkarte – Vorderseite", group: "Geschäftsausstattung", kind: "print", format: "85 × 55 mm", size: { w: 91, h: 61, unit: "mm" }, zoom: "[zoom:0.85]", Component: P.BusinessCardFront },
  { id: "visitenkarte-hinten", title: "Visitenkarte – Rückseite", group: "Geschäftsausstattung", kind: "print", format: "85 × 55 mm", size: { w: 91, h: 61, unit: "mm" }, zoom: "[zoom:0.85]", Component: P.BusinessCardBack },
  { id: "briefbogen-a4", title: "Briefbogen DIN 5008 (Form B)", group: "Geschäftsausstattung", kind: "print", format: "A4 · 210 × 297 mm", size: { w: 210, h: 297, unit: "mm" }, zoom: "[zoom:0.38]", Component: P.Letterhead },
  { id: "email-signatur", title: "E-Mail-Signatur", group: "Geschäftsausstattung", kind: "email", format: "HTML · 600 px", size: { w: 600, h: 260, unit: "px" }, zoom: "[zoom:0.5]", Component: () => <EmailSignature /> },
  { id: "post-laufanalyse", title: "Post Laufanalyse", group: "Instagram Posts", kind: "social", format: "1080 × 1350 px", size: POST, zoom: "[zoom:0.28]", Component: S.PostAnalysis },
  { id: "post-run-academy", title: "Post Run Academy Kursstart", group: "Instagram Posts", kind: "social", format: "1080 × 1350 px", size: POST, zoom: "[zoom:0.28]", Component: S.PostAcademy },
  { id: "post-cup-lauf", title: "Post AUSDAUER CUP Lauf", group: "Instagram Posts", kind: "social", format: "1080 × 1350 px", size: POST, zoom: "[zoom:0.28]", Component: S.PostCupRace },
  { id: "post-crown-town", title: "Post Crown Town Runners", group: "Instagram Posts", kind: "social", format: "1080 × 1350 px", size: POST, zoom: "[zoom:0.28]", Component: S.PostCrownTown },
  { id: "post-gutschein", title: "Post Gutschein", group: "Instagram Posts", kind: "social", format: "1080 × 1350 px", size: POST, zoom: "[zoom:0.28]", Component: S.PostVoucher },
  { id: "story-cup-countdown", title: "Story Cup-Countdown", group: "Instagram Stories", kind: "social", format: "1080 × 1920 px", size: STORY, zoom: "[zoom:0.2]", Component: S.StoryCupCountdown },
  { id: "story-crown-town", title: "Story Lauftreff heute", group: "Instagram Stories", kind: "social", format: "1080 × 1920 px", size: STORY, zoom: "[zoom:0.2]", Component: S.StoryCrownTownToday },
  { id: "cover-stores", title: "Highlight Stores", group: "Highlight-Cover & Profil", kind: "social", format: "1080 × 1920 px", size: STORY, zoom: "[zoom:0.11]", Component: S.CoverStores },
  { id: "cover-laufanalyse", title: "Highlight Laufanalyse", group: "Highlight-Cover & Profil", kind: "social", format: "1080 × 1920 px", size: STORY, zoom: "[zoom:0.11]", Component: S.CoverAnalysis },
  { id: "cover-run-academy", title: "Highlight Run Academy", group: "Highlight-Cover & Profil", kind: "social", format: "1080 × 1920 px", size: STORY, zoom: "[zoom:0.11]", Component: S.CoverAcademy },
  { id: "cover-cup", title: "Highlight AUSDAUER CUP", group: "Highlight-Cover & Profil", kind: "social", format: "1080 × 1920 px", size: STORY, zoom: "[zoom:0.11]", Component: S.CoverCup },
  { id: "cover-community", title: "Highlight Community", group: "Highlight-Cover & Profil", kind: "social", format: "1080 × 1920 px", size: STORY, zoom: "[zoom:0.11]", Component: S.CoverCommunity },
  { id: "cover-gutschein", title: "Highlight Gutscheine", group: "Highlight-Cover & Profil", kind: "social", format: "1080 × 1920 px", size: STORY, zoom: "[zoom:0.11]", Component: S.CoverVoucher },
  { id: "profilbild", title: "Profilbild", group: "Highlight-Cover & Profil", kind: "social", format: "1080 × 1080 px", size: { w: 1080, h: 1080, unit: "px" }, zoom: "[zoom:0.19]", Component: S.Avatar },
];

export const templateById = (id: string) => TEMPLATES.find((t) => t.id === id);
