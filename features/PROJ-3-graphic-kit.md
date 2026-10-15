# PROJ-3: Grafik-Kit & Run-Academy-Logo

**Status:** In Progress · **Priorität:** P0 · **Erstellt:** 2026-10-15 · **Abhängigkeiten:** PROJ-1

## User Stories
- Als Designer:in möchte ich wiederverwendbare Markenelemente für Flyer, Social und Web.
- Als Run-Academy-Trainer:in möchte ich ein eigenes, aber klar zu AUSDAUER gehörendes Logo.

## Acceptance Criteria
- Elemente als SVG in `public/brand/elements/` und als React-Komponenten in `src/components/brand/`:
  Höhenlinien (Topo), Pace-Lines, Startnummern-Badge, Kilometer-Marker/Bahnlinie, Daten-Overlay.
- **Angenommen** ein Element wird auf dunklem oder hellem Grund genutzt, **dann** erbt es `currentColor`.
- Run-Academy-Logo in drei Varianten (horizontal, gestapelt, Icon), jeweils mit Zusatz „by AUSDAUER“.
- Absolute-Run-Logo wird nur über die Komponente `PartnerLogo` (neutrale Fläche + Schutzraum + Absenderzeile) eingebunden.

## Edge Cases
- Sehr kleine Größen (< 24 px) → Run-Academy-Icon statt Wortmarke.

## Out of Scope
- Veränderungen am Ausdauer- oder Absolute-Run-Logo.

## Product Decisions
- „by AUSDAUER“ grenzt die Academy von „RUN Academy“ (Absolute Run Düsseldorf) ab.
- Icon: drei Laufbahnen, die in einen Pfeil/Zielbogen laufen → „Strecke“ als Leitidee.

## Implementation Notes (2026-10-15)
- Komponenten: `topo-lines`, `pace-lines`, `start-number`, `km-marker`, `track-lanes`, `data-overlay`, `run-academy-logo`, `brand-logo`, `partner-logo` in `src/components/brand/`.
- Höhenlinien-Generator `src/lib/brand/topo.ts` (deterministisch, unit-getestet).
- `npm run brand:assets` schreibt SVGs nach `public/brand/elements/` + `public/brand/run-academy/` und `brand/tokens.json`.
- Original-Logos werden aus `public/brand/logos/` geladen (`src/lib/brand/logos.ts`); fehlen sie, erscheint ein gekennzeichneter Platzhalter.
