# PROJ-4: Webseite Kernseiten

**Status:** In Progress · **Priorität:** P0 · **Erstellt:** 2026-10-15 · **Abhängigkeiten:** PROJ-1–3

## User Stories
- Als Kund:in möchte ich schnell Öffnungszeiten, Adresse und Leistungen beider Stores finden.
- Als Läufer:in möchte ich verstehen, warum ich zur Laufanalyse kommen soll, und einen Termin anfragen.
- Als Online-Käufer:in möchte ich mit einem Klick in den Shopify-Shop.

## Acceptance Criteria
- Seiten: Start, `/stores/betzdorf`, `/stores/siegen`, `/leistungen`, `/marken`, `/ueber-uns`, `/kontakt`, `/impressum`, `/datenschutz`.
- **Angenommen** ich bin auf `/stores/siegen`, **dann** sehe ich das Absolute-Run-Logo über `PartnerLogo` mit „ein AUSDAUER Store“; auf anderen Seiten nicht (außer Standortleiste im Footer).
- Shop-Links führen auf Shopify (neuer Tab nicht erzwungen).
- Öffnungszeiten kommen aus einer Datenquelle (`src/content/stores.ts`) – eine Wahrheit für alle Seiten; LocalBusiness-Schema (JSON-LD).
- Mobile Navigation über shadcn `Sheet`.

## Edge Cases
- Feiertage/Sonderöffnungszeiten → optionales Feld `notice` je Store.

## Out of Scope
- Online-Terminbuchung (zunächst Telefon/Mail).

## Implementation Notes (2026-10-15)
- Inhalte von ausdauer-shop.de übernommen (Texte, Team, Öffnungszeiten, Service, Bewertungen, Store-Fotos) in `src/content/*.ts`; Fotos als WebP in `public/images/`.
- Route-Gruppe `src/app/(site)/` mit Header (Mobile-Menü via shadcn `Sheet`), Footer mit Standortleiste und Live-Öffnungsstatus (`src/lib/opening-hours.ts`, unit-getestet).
- Seiten: Start, `/laufanalyse` (statt `/leistungen`), `/stores`, `/stores/[slug]`, `/ueber-uns` (inkl. Team), `/kontakt`, `/impressum`, `/datenschutz`.
- Abweichung: keine eigene `/marken`-Seite (keine gesicherte Markenliste); Kontaktformular entfällt zugunsten Telefon/WhatsApp/E-Mail (kein Backend).
- SEO: LocalBusiness-JSON-LD, `sitemap.xml`, `robots.txt`, 301-Weiterleitungen aller alten Contao-URLs (`next.config.ts`).
- Impressum übernommen (§ 5 TMG → § 5 DDG). Datenschutz nur als Entwurf – vor Livegang rechtlich prüfen.
- E2E: `tests/site.spec.ts` (22 Tests, `PW_CHROMIUM=… npm run test:e2e -- --project=chromium`).
- 2026-10-15 (Kundenhinweis): Currex-Druckmessung und Dartfish werden nicht mehr genutzt. Ersetzt durch FootBalance 3D-Fußvermessung mit individuell angepassten (thermoformbaren) Einlegesohlen und „Videoanalyse der dynamischen Bewegung“ (`src/content/services.ts`, Laufanalyse-Seite, Startseite).
- Bestätigt (Kunde): FootBalance in beiden Stores, Einlegesohlen werden direkt mitgenommen.
