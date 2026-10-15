# PROJ-9: Social-Media-Vorlagen

**Status:** In Progress · **Priorität:** P1 · **Erstellt:** 2026-10-15 · **Abhängigkeiten:** PROJ-1–3

## Acceptance Criteria
- `/brand/social/*`: Post 1080×1350, Story 1080×1920, Highlight-Cover (Set), Event-Ankündigung, Kursstart Run Academy.
- PNG-Export in Originalgröße via Exportskript.

## Implementation Notes (2026-10-15)
- `src/components/templates/social.tsx`: Posts 1080×1350 (Laufanalyse, Run Academy, Cup-Lauf, Crown Town Runners, Gutschein), Stories 1080×1920 (Cup-Countdown, Lauftreff heute), 6 Highlight-Cover, Profilbild 1080×1080.
- Export als PNG in Originalgröße über `npm run brand:templates`. Inhalte (Lauf, Datum) kommen aus `src/content/*` und aktualisieren sich mit den Daten.
