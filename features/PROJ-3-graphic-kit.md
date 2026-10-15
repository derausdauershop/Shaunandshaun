# PROJ-3: Grafik-Kit & Run-Academy-Logo

**Status:** In Progress · **Priorität:** P0 · **Erstellt:** 2026-10-15 · **Abhängigkeiten:** PROJ-1

## User Stories
- Als Designer:in möchte ich wiederverwendbare Markenelemente für Flyer, Social und Web.
- Als Run-Academy-Trainer:in möchte ich ein eigenes, aber klar zu AUSDAUER gehörendes Logo.

## Acceptance Criteria
- Elemente als SVG in `public/brand/elements/` und als React-Komponenten in `src/components/brand/`:
  Höhenlinien (Topo), Pace-Lines, Startnummern-Badge, Kilometer-Marker/Bahnlinie, Daten-Overlay.
- **Angenommen** ein Element wird auf dunklem oder hellem Grund genutzt, **dann** erbt es `currentColor`.
- Run-Academy-Logo in drei Varianten (horizontal, gestapelt, Plakette), Claim „Besser. Laufen. Lernen.“, optional „by AUSDAUER“ für externe Kommunikation.
- ∞-Symbol aus dem Logo als Element (`InfinityMark`, solid und als Kontur-„Strecke“).
- Absolute-Run-Logo wird nur über die Komponente `PartnerLogo` (neutrale Fläche + Schutzraum + Absenderzeile) eingebunden.

## Edge Cases
- Sehr kleine Größen (< 24 px) → Run-Academy-Icon statt Wortmarke.

## Out of Scope
- Veränderungen am Ausdauer- oder Absolute-Run-Logo.

## Product Decisions
- Das ∞ steckt in AUSDAUER, Absolute Run Ausdauer und dem alten Academy-Logo → wird zur Klammer der Familie.
- Neues Academy-Logo behält ∞, Volt und Claim (Wiedererkennung), setzt das ∞ in eine um 5° geneigte Plakette (Startnummer) und den Namen in Barlow Condensed Black Italic. (Erster Entwurf mit Laufbahn-Icon verworfen, nachdem die Original-Logos vorlagen.)
- „by AUSDAUER“ grenzt die Academy extern von „RUN Academy“ (Absolute Run Düsseldorf) ab.

## Implementation Notes (2026-10-15)
- Komponenten: `topo-lines`, `pace-lines`, `start-number`, `km-marker`, `track-lanes`, `data-overlay`, `run-academy-logo`, `brand-logo`, `partner-logo` in `src/components/brand/`.
- Höhenlinien-Generator `src/lib/brand/topo.ts` (deterministisch, unit-getestet).
- `npm run brand:assets` schreibt SVGs nach `public/brand/elements/` + `public/brand/run-academy/` und `brand/tokens.json`.
- Original-Logos aus den Kunden-PDFs als SVG in `public/brand/logos/` (Rot/Schwarz/Weiß, Symbol, Absolute Run, Crown Town Runners, altes Academy-Logo); geladen über `src/lib/brand/logos.ts`.
- ∞-Pfad als Konstante in `src/lib/brand/infinity.ts`, Komponenten `infinity-mark.tsx`, `crown-town-logo.tsx`.
