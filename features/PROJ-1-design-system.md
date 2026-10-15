# PROJ-1: Design-System & Tokens

**Status:** In Progress · **Priorität:** P0 · **Erstellt:** 2026-10-15 · **Abhängigkeiten:** Logo-Dateien (Upload)

## User Stories
- Als Designer:in/Agentur möchte ich verbindliche Farb-, Typo- und Abstands-Tokens, damit alle Medien gleich aussehen.
- Als Entwickler:in möchte ich die Tokens als CSS-Variablen/Tailwind-Klassen nutzen, damit die Webseite automatisch markenkonform ist.

## Acceptance Criteria
- **Angenommen** die Webseite wird geladen, **wenn** Text dargestellt wird, **dann** nutzen Headlines Barlow Condensed und Fließtext Barlow (selbst gehostet via `next/font`, keine Requests an Google zur Laufzeit).
- **Angenommen** eine Komponente nutzt `bg-signal`, **wenn** die Signalfarbe in `globals.css` geändert wird, **dann** ändert sie sich überall.
- **Angenommen** Text liegt auf einer Markenfarbe, **dann** erfüllt die erlaubte Kombination WCAG AA (≥ 4.5:1 Fließtext, ≥ 3:1 große Schrift).
- Tokens liegen zusätzlich als `brand/tokens.json` (HEX, RGB, CMYK, Pantone-Näherung) für Print vor.

## Edge Cases
- Logofarben noch unbekannt → Platzhalter-Token `--brand` (Tiefschwarz) bis Upload.
- Volt-Signalfarbe hat auf Weiß zu wenig Kontrast → nur als Fläche mit Ink-Text, nie als Textfarbe auf Weiß.

## Out of Scope
- Änderung des Ausdauer-Logos.

## Product Decisions
- Barlow-Familie (OFL): kondensiert + normal aus einer Familie → harmonisch, frei für Print & Web.
- JetBrains Mono als Daten-Akzent (Pace, Laufanalyse-Werte).
- Signalfarbe: zwei Kandidaten (Volt `#D4FF3A`, Signal-Orange `#FF5A1F`), Default Volt; finale Wahl nach Logo-Sichtung.

## Open Questions
- [ ] Exakte Logofarben (aus SVG) übernehmen.
- [ ] Finale Signalfarbe festlegen.

## Implementation Notes
- `src/app/globals.css`: Marken-Tokens + shadcn-Variablen gemappt.
- `tailwind.config.ts`: Farben `ink`, `paper`, `stone`, `signal`, `brand`; Fonts `display`, `sans`, `mono`.
- `src/app/layout.tsx`: Fonts via `next/font/google` (self-hosted beim Build), `lang="de"`.
- `src/lib/brand/tokens.ts`: Farben inkl. CMYK/Pantone-Näherung → `brand/tokens.json`.
- Lint auf ESLint-Flat-Config migriert (`eslint.config.mjs`), da `next lint` in Next 16 entfällt.
