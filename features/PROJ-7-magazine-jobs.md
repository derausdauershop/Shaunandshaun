# PROJ-7: Magazin & Jobs

**Status:** In Progress · **Priorität:** P1 · **Erstellt:** 2026-10-15 · **Abhängigkeiten:** PROJ-4

## Acceptance Criteria
- `/magazin` Übersicht + Artikel aus `src/content/articles.ts`; `/jobs` mit offenen Stellen oder Initiativbewerbung.
- Leerzustände für beide Seiten.

## Out of Scope
- CMS-Anbindung (später).

## Implementation Notes (2026-10-15)
- 5 Ratgeber-Artikel und 2 News vom alten Blog übernommen (`src/content/articles.ts`), `/magazin` + `/magazin/[slug]`.
- `/jobs` mit Leerzustand und Initiativbewerbung per E-Mail; offene Stellen in `OPENINGS` pflegbar.
