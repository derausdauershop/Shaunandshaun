# PROJ-8: Print-Vorlagen (Entwürfe)

**Status:** In Progress · **Priorität:** P1 · **Erstellt:** 2026-10-15 · **Abhängigkeiten:** PROJ-1–3

## Acceptance Criteria
- Previews unter `/brand/print/*`: Run-Academy-Flyer A5 + DIN lang, Event-/Run-Club-Flyer A5, Aktionsplakat A2, Laufanalyse-Flyer, Visitenkarte, Briefbogen (DIN 5008), Gutschein, E-Mail-Signatur.
- Formate in echten mm-Maßen inkl. 3 mm Beschnitt-Markierung.
- Export als PNG/PDF via `scripts/export-previews.ts` nach `brand/previews/`.
- Standortleiste mit beiden Stores; Absolute-Run-Logo nur gemäß Co-Branding-Regeln.

## Out of Scope
- Druckfertige Reinzeichnung (macht Druckerei/Agentur).

## Implementation Notes (2026-10-15)
- Vorlagen als React-Artboards in echter Größe: `src/components/templates/print.tsx`, Registry `src/components/templates/registry.tsx`.
- Galerie `/brand/vorlagen`, Einzelansicht `/brand/vorlagen/[id]`, Export `npm run brand:templates` → `public/brand/vorlagen-export/` (PDF mit 3 mm Beschnitt + PNG-Vorschau).
- Umfang: Run-Academy-Flyer A5 (V/R), Laufanalyse-Flyer DIN lang (V/R), Plakat A2, AUSDAUER-CUP-Saisonkalender A5 (V/R), Crown-Town-Runners-Flyer A5, Gutschein DIN lang quer (V/R), Visitenkarte (V/R), Briefbogen DIN 5008 Form B, E-Mail-Signatur (HTML, Tabellenlayout).
- QR-Codes (Vektor) zeigen auf die künftige Domain ausdauer.shop (PROJ-10) – vor Druck prüfen, ob die Seite live ist.
- PDFs sind RGB-Entwürfe; CMYK-Konvertierung/Reinzeichnung durch Druckerei. Abweichung: keine Schnittmarken im PDF (Beschnitt ist enthalten).
