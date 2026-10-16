# PROJ-13: Teamwear-Bereich auf der Webseite & Wegfall der Events-Seite

**Status:** In Progress · **Priorität:** P1 · **Erstellt:** 2026-10-16 · **Abhängigkeiten:** PROJ-4, PROJ-6, PROJ-12

## Ziel
- Eine Seite `/teamwear`, über die Vereine und Firmen AUSDAUER TEAMWEAR kennenlernen und anfragen.
- Die Events-Seite entfällt. Termine laufen komplett in der **Absolute Run Community App**.

## Entscheidungen (Kunde, 2026-10-16)
- Events: Hinweis und Link zur App. `/events` und alte `/eventleser/*`-URLs leiten auf `/community#app` um. Die Weiterleitungen auf einzelne Cup-Läufe bleiben.
- App-Links:
  - iOS: https://apps.apple.com/de/app/absolute-run-community/id6808254762
  - Android: https://play.google.com/store/apps/details?id=shop.ausdauer.absoluterun
- Bestellshop (Beta): **noch nicht verlinken**, nur der Hinweis „Vereinszugang folgt“.
- Referenzen **mit Wappen** (Dateien in `public/images/vereine/`):
  - SG 06 Betzdorf
  - TuS Weitefeld (Wolf-Wappen „Westerwald“, bestätigt)
  - JSG Weitefeld-Neunkhausen (eigener Verein)
  - VfB Niederdreisbach
  - Sportfreunde Daaden: Wappen fehlt noch, bis dahin als Namenskachel.

## Seite /teamwear (geplant)
Aufbau:
- Hero mit Trikot-Mockup und Ärmel-Plakette
- Für Vereine / Für Firmen
- Flex und DTF im Vergleich
- JAKO als Ausrüster
- Referenzwappen
- Ablauf: Anfrage → Muster/Größenprobe → Freigabe → Druck → Übergabe
- FAQ
- Kontakt

Inhalte kommen aus `src/content/teamwear.ts`. Der Menüpunkt „Teamwear“ kommt ins Hauptmenü.

## Acceptance Criteria
- [x] Kein Menüeintrag und keine Seite „Events“ mehr. `/events` leitet auf `/community#app` um.
- [x] Community-Seite und Startseite verlinken die App (App Store, Google Play).
- [x] „Nächster Lauf“ auf der Startseite kommt direkt aus den Cup-Daten.
- [ ] `/teamwear` mit allen Abschnitten, mobil ohne horizontales Scrollen.
- [ ] Referenzwappen sichtbar, mit Alt-Text.
- [ ] Menü enthält „Teamwear“.

## Implementation Notes (2026-10-16, Teil Events)
- Entfernt:
  - `src/app/(site)/events/`
  - `src/content/events.ts` und der zugehörige Test
- `src/lib/dates.ts` (`berlinDate`, `upcoming`, `formatDate`, mit Test) ersetzt die Hilfsfunktionen.
- `COMMUNITY_APP` steht in `src/content/site.ts`.
- `src/components/site/app-teaser.tsx` enthält `AppTeaser` und `AppStoreButtons`.
- Weiterleitungen in `next.config.ts`, Sitemap angepasst.
- E2E-Test „events point to the community app“ ergänzt.

## Offene Fragen
- [x] JAKO: offizieller JAKO Teamwear Partner, Logo darf gezeigt werden. Originaldatei bzw. Partner-Badge liefert der Kunde.
- [ ] Mindestmengen, Lieferzeiten.
- [ ] Statt Fotos: Mockups aus Druckfreigaben (Upload durch den Kunden) als drehbare Trikot-Ansicht. Ansatz siehe Chat 2026-10-16.
- [x] Wolf-Wappen = TuS Weitefeld. JSG Weitefeld-Neunkhausen ist ein eigener Verein (2026-10-16).
- [ ] Wappen Sportfreunde Daaden nachliefern.
