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
- Marken JAKO, erima und adidas (als Text)
- Referenzwappen
- Ablauf: Anfrage → Muster/Größenprobe → Freigabe → Druck → Übergabe
- FAQ
- Kontakt

Inhalte kommen aus `src/content/teamwear.ts`. Der Menüpunkt „Teamwear“ kommt ins Hauptmenü.

## Acceptance Criteria
- [x] Kein Menüeintrag und keine Seite „Events“ mehr. `/events` leitet auf `/community#app` um.
- [x] Community-Seite und Startseite verlinken die App (App Store, Google Play).
- [x] „Nächster Lauf“ auf der Startseite kommt direkt aus den Cup-Daten.
- [x] `/teamwear` mit allen Abschnitten, mobil ohne horizontales Scrollen.
- [x] Referenzwappen sichtbar, mit Alt-Text (5 Vereine).
- [x] Menü enthält „Teamwear“.
- [x] Trikot-Galerie aus Druckfreigaben, Vorder-/Rückseite per Tippen drehbar (CSS 3D, `prefers-reduced-motion` beachtet).
- [x] Marken JAKO, erima, adidas als Text, kein Partner-Hinweis, keine Herstellerlogos.
- [x] FAQ: keine Mindestmenge, Lieferzeit ca. 4 Wochen je nach Auftragslage.

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
- [x] Kein „JAKO Teamwear Partner“-Hinweis. Stattdessen werden JAKO, erima und adidas als führende Marken genannt (Kunde, 2026-10-16).
- [x] Mindestmengen: keine. Lieferzeit: ca. 4 Wochen.
- [ ] Statt Fotos: Mockups aus Druckfreigaben (Upload durch den Kunden) als drehbare Trikot-Ansicht. Ansatz siehe Chat 2026-10-16.
- [x] Wolf-Wappen = TuS Weitefeld. JSG Weitefeld-Neunkhausen ist ein eigener Verein (2026-10-16).
- [x] Wappen Sportfreunde Daaden geliefert.
- [x] Daaden-Trikot (adidas) wird in der Galerie gezeigt.
- [x] Vereine sind mit Wappen und Trikots auf der Seite einverstanden (2026-10-16).

## Implementation Notes (2026-10-16, Teil Teamwear)
- Inhalte in `src/content/teamwear.ts`: Zielgruppen, Verfahren, Vereine, Trikots, Ablauf, FAQ. Die FAQ-Texte bitte prüfen, Mindestmengen und Lieferzeiten sind bewusst offen formuliert.
- Seite `src/app/(site)/teamwear/page.tsx`, Komponente `src/components/site/kit-viewer.tsx` (Client, drehbar, Button mit `aria-pressed`).
- Mockups:
  - aus den Druckfreigaben-PDFs zugeschnitten nach `public/images/teamwear/*.webp`
  - Spielername auf der SG-06-Rückseite entfernt
- Vereinswappen in `public/images/vereine/` (5 Stück).
- Marken: JAKO, erima und adidas nur als Text, da keine Herstellerlogos freigegeben sind. Den JAKO-CI-Guide 2026 beachten, falls doch Logos kommen: Originaldatei, keine Umfärbung, mind. 2 cm, Freigabe durch das JAKO-Marketing.
- Menü (`MAIN_NAV`), Sitemap und E2E-Test „teamwear page shows the club crests and turns a jersey“ ergänzt.
