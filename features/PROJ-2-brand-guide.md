# PROJ-2: Brand Guide (live)

**Status:** In Progress · **Priorität:** P0 · **Erstellt:** 2026-10-15 · **Abhängigkeiten:** PROJ-1, PROJ-3

## User Stories
- Als Geschäftsführung möchte ich das neue Markenbild an einer Stelle sehen und freigeben.
- Als Team/Druckerei möchte ich nachschlagen, wie Logos, Farben, Schriften und Elemente eingesetzt werden.

## Acceptance Criteria
- **Angenommen** ich öffne `/brand`, **dann** sehe ich Abschnitte: Leitidee, Markenarchitektur, Logos & Schutzraum, Co-Branding Absolute Run, Farben, Typografie, Grafik-Kit, Run Academy, Tonalität (Du), Do's & Don'ts.
- **Angenommen** ich wechsle die Signalfarbe (Volt/Orange), **dann** aktualisiert sich der gesamte Guide zur Vorschau.
- **Angenommen** ein Logo ist noch nicht hochgeladen, **dann** erscheint ein klar gekennzeichneter Platzhalter.
- Der Guide ist mobil (375 px) und desktop (1440 px) lesbar; `noindex`.

## Edge Cases
- Druck des Guides (Strg+P) → lesbares Layout ohne Navigation.

## Out of Scope
- PDF-Export des Guides (kommt mit PROJ-8 Exportskript).

## Product Decisions
- Live-Guide als Route statt PDF: immer aktuell, gleiche Tokens wie die Webseite.

## Implementation Notes (2026-10-15)
- Route `src/app/brand/page.tsx`, Abschnitte in `src/app/brand/_sections/` (KM 01–10), `noindex`.
- Signal-Vorschau über `src/components/brand/signal-switcher.tsx` (setzt `data-signal`).
- Kontrasttabelle wird live aus `src/lib/brand/color.ts` berechnet (unit-getestet).
- Erste Anwendungsskizzen (A5 Academy, IG-Post Run Club, DIN lang Laufanalyse) in KM 10.
- Geprüft: 1440 px und 375 px ohne horizontalen Overflow, keine Console-Fehler.
