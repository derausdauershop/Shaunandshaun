# PROJ-6: Community & Events

**Status:** Planned · **Priorität:** P1 · **Erstellt:** 2026-10-15 · **Abhängigkeiten:** PROJ-4

## User Stories
- Als junge:r Runner:in möchte ich wissen, wann und wo der nächste Run Club läuft.

## Acceptance Criteria
- `/community`: Crown Town Runners – Community Run Siegen (Do 18:30, ab Koblenzer Str. 40), mit eigenem Logo + „powered by AUSDAUER“.
- Westerwälder Firmenlauf mit eigenem Logo (`public/brand/logos/westerwaelder-firmenlauf.svg`) + „präsentiert von AUSDAUER“.
- `/events`: kommende Events chronologisch, vergangene ausgeblendet (unit-getestete Sortierung/Filter).
- Leerzustand: „Gerade keine Events geplant – folge uns auf Instagram“.

## Product Decisions
- BTown Run Club (Betzdorf) existiert nicht mehr → entfällt (Info Kunde, 2026-10-15).

## Open Questions
- [x] Crown Town Runners = der Donnerstags-Lauftreff in Siegen (bestätigt 2026-10-15).

## AUSDAUER CUP (Kundeninfo 2026-10-15)
- 8 Läufe + Abschlussfeier: Asdorflauf Wehbach, Föschber Radweglauf (Niederfischbach), Flecker Tunnellauf (Freudenberg), Deuzer Sparkassen Pfingst-Lauf, Anzhäuser Gückellauf, Wilnsdorfer Bahnlauf, Herdorfer Götzelauf, Südsauerlandlauf Wenden; Abschlussfeier im November.
- 2026 = 38. Ausgabe → 2027 = 39. Ausgabe. Termine 2027 noch nicht final (Daten in `src/lib/brand/cup.ts`).
- [ ] Termine 2027 eintragen, sobald final.
