# PROJ-4: Webseite Kernseiten

**Status:** Planned · **Priorität:** P0 · **Erstellt:** 2026-10-15 · **Abhängigkeiten:** PROJ-1–3

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
