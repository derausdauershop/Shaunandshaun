# PROJ-10: Shop-Integration (Headless Shopify) & Domain ausdauer.shop

**Status:** Planned · **Priorität:** P0 · **Erstellt:** 2026-10-15 · **Abhängigkeiten:** PROJ-4, PROJ-5, PROJ-11

## Ausgangslage
- Shopify (`der-ausdauer-shop.myshopify.com`) verkauft nur zwei Produkte: Geschenk-Gutschein (10–300 €) und Einsteiger-Laufkurs (130 €).
- Online-Gutscheine werden über **Shopify POS** (iPads) im Laden eingelöst. Das bleibt vorerst so; die WaWi-Kasse folgt später (→ PROJ-11, Phase 2).
- Die Domains ausdauer.shop und ausdauer-shop.de liegen bei **STRATO**.
- Der Shop belegt die Domain **ausdauer.shop**, die künftig die Hauptadresse der Marke AUSDAUER werden soll.

## Ziel
Gutscheine und Kurse werden direkt auf der neuen Webseite verkauft, im AUSDAUER-Design. Nur der Bezahlschritt läuft über die Shopify-Kasse. ausdauer.shop wird die Hauptdomain der Webseite.

## User Stories
- Als Schenkende:r möchte ich auf ausdauer.shop einen Gutschein-Betrag wählen und direkt bezahlen, ohne auf eine fremd aussehende Seite zu wechseln.
- Als Einsteiger:in möchte ich den Laufkurs auf der Kursseite buchen und sehen, ob noch Plätze frei sind.
- Als Team möchte ich Kurse, Preise und Bestellungen weiter wie gewohnt in Shopify verwalten. Gutscheine bleiben native Shopify-Geschenkgutscheine (PROJ-11).

## Architektur
```
ausdauer.shop (Vercel, Next.js)                     Shopify (unverändert als Backend)
├─ /gutscheine ── Betrag wählen ──┐                 ├─ Produkte, Preise, Bestand (Kursplätze)
├─ /run-academy/[kurs] ── buchen ─┼─ Server Action ─┼─ Storefront API: cartCreate
│                                 │                 ├─ Kasse: checkout.ausdauer.shop
│                                                   └─ Gutschein-Mail + Gutschein-Seite (Shopify, /gift_cards/…)
└─ Produktdaten (Preis, Varianten, verfügbar?) ◀── Storefront API (alle 5 Min. aktualisiert)
```
- **Datenquelle:** Shopify Storefront API (GraphQL) mit öffentlichem Storefront-Token aus dem kostenlosen Sales-Channel „Headless“.
  - Server-seitig abgefragt, ISR alle 5 Minuten.
  - Fällt Shopify aus, zeigen die Seiten die zuletzt bekannten Daten und einen Hinweis.
- **Kaufen:** Ein Klick auf „Jetzt kaufen“ startet eine Server Action. Sie legt per `cartCreate` einen Warenkorb mit genau einer Variante an und leitet zur `checkoutUrl` weiter.
  - Zunächst gibt es keinen eigenen Warenkorb, weil pro Bestellung meist nur ein Gutschein oder Kurs gekauft wird.
  - Ein Warenkorb lässt sich später ergänzen („Später mehr“).
- **Kasse:** Die Shopify-Kasse läuft unter der Subdomain `checkout.ausdauer.shop`. Das sieht vertrauenswürdig aus und bleibt rechtssicher: AGB, Widerruf, Zahlarten und der Button „Zahlungspflichtig bestellen“ kommen von Shopify.
- **Shopify-Storefront (Theme):** Wird bis auf die Gutschein-Seite nicht mehr gebraucht. Alle Theme-URLs leiten auf die neue Webseite um, **außer `/gift_cards/*`** (vorsorglich, Link aus der Gutschein-Mail, PROJ-11). Das Theme bleibt veröffentlicht. Gestaltet werden nur `gift_card.liquid` und die Benachrichtigungs-Mails.
- **Konfiguration:** `SHOPIFY_STORE_DOMAIN`, `SHOPIFY_STOREFRONT_TOKEN` (Vercel Environment Variables, nie im Repo).

## Neue/geänderte Seiten
- `/gutscheine`:
  - Betragskacheln aus den Shopify-Varianten, Vorschau des Gutscheins im AUSDAUER-Design, Hinweise („digital per E-Mail, in Betzdorf & Siegen einlösbar“) und Kaufen-Button.
  - Der Gutschein-Button im Header zeigt künftig hierhin statt zu Shopify.
- `/run-academy/[slug]`: Preis und Verfügbarkeit kommen live aus Shopify, dazu der Button „Jetzt buchen“. Später lassen sich Kurstermine als Varianten mit Platzanzahl (Bestand) abbilden, mit Anzeige „Noch X Plätze“ bzw. „Ausgebucht“.
- `/bestellung-abgeschlossen`: Danke-Seite nach dem Kauf (Rückleitung aus der Kasse, optional).
- Footer: Links zu AGB, Widerrufsbelehrung und Zahlung & Versand (Shopify-Richtlinien).

## Domains (Umzug)
| Domain | Ziel |
|---|---|
| `ausdauer.shop` + `www` | Vercel (neue Webseite), Hauptdomain |
| `checkout.ausdauer.shop` | Shopify (Kasse), CNAME `shops.myshopify.com` |
| `ausdauer-shop.de` + `www` | 301 → `ausdauer.shop` mit Pfad. Die alten Contao-Weiterleitungen greifen danach. |

- **E-Mail bleibt unberührt:** Die MX-Einträge von ausdauer-shop.de werden nicht verändert, `info@ausdauer-shop.de` funktioniert weiter.

## Acceptance Criteria
- **Angenommen** ich bin auf `/gutscheine`, **wenn** ich 50 € wähle und „Jetzt kaufen“ klicke, **dann** lande ich in der Shopify-Kasse mit genau diesem Gutschein im Warenkorb.
- **Angenommen** ein Kurs ist in Shopify nicht verfügbar (Bestand 0), **dann** zeigt die Kursseite „Ausgebucht“ und keinen Kaufen-Button.
- **Angenommen** die Storefront API ist nicht erreichbar, **dann** zeigt die Seite die zuletzt bekannten Preise und als Ausweichweg einen Link zur Shopify-Kasse.
- **Angenommen** jemand ruft eine alte Shopify-URL auf (z. B. `/products/geschenk-gutschein`), **dann** wird er auf die passende neue Seite weitergeleitet.
- Preisänderungen in Shopify erscheinen spätestens nach 5 Minuten auf der Webseite.
- Kein Shopify-Skript und kein Cookie wird auf der Webseite geladen, solange nicht gekauft wird. Die Webseite selbst bleibt cookiefrei.

## Edge Cases
- Ein Doppelklick auf „Kaufen“ legt nur einen Warenkorb an: Der Button ist während der Weiterleitung deaktiviert.
- Wird ein Gutschein-Betrag in Shopify gelöscht, verschwindet die Kachel automatisch.
- Ein Kurs ohne Varianten bzw. Termine wird als „Termine folgen“ mit „Interesse melden“ angezeigt.

## Aufgaben beim Kunden (Shopify-Admin, ca. 15 Min.)
1. Den Sales-Channel **Headless** installieren (kostenlos, von Shopify), einen Storefront erstellen und den **öffentlichen Zugriffstoken** kopieren.
2. Gutschein bleibt **Shopify-Geschenkgutschein** (nichts umstellen). Prüfen, dass er im Headless-Kanal verfügbar ist.
3. Mail-Vorlage „Geschenkgutschein erstellt“ und Gutschein-Seite im AUSDAUER-Design einbauen (Vorlagen und Anleitung in `shopify/`, PROJ-11).
4. Unter **Domains**: `checkout.ausdauer.shop` verbinden und `ausdauer.shop` erst nach dem Livegang der neuen Seite entfernen.
5. AGB, Widerrufsbelehrung und Datenschutz in Shopify prüfen (Rechtstexte).
6. **STRATO (DNS)**, erst zum Livegang:
   - `ausdauer.shop`: A-Record `@` und CNAME `www` nach Vorgabe von Vercel (typisch `76.76.21.21` bzw. `cname.vercel-dns.com`; die exakten Werte zeigt Vercel beim Hinzufügen der Domain).
   - CNAME `checkout` → `shops.myshopify.com`.
   - `ausdauer-shop.de` + `www` ebenfalls auf Vercel zeigen lassen; die 301-Weiterleitung mit Pfad macht Vercel (nicht die STRATO-Weiterleitung, die den Pfad verliert).
   - **MX-, SPF- und DKIM-Einträge nicht anfassen**, sonst fällt die E-Mail aus.

## Umsetzungsschritte (Entwicklung)
1. `src/lib/shopify.ts`: Storefront-Client (fetch + GraphQL), Abfragen für Produkt nach Handle und `cartCreate`. Unit-Tests mit gemockten Antworten.
2. Server Action `buyNow(variantId)` mit Weiterleitung zur Kasse.
3. Seite `/gutscheine`, Kursseiten an Shopify-Daten anbinden, Fallback auf `src/content/*`.
4. Header-, Startseiten- und Footer-CTAs auf `/gutscheine` umstellen, Rechtstext-Links ergänzen.
5. Weiterleitungen für alte Shopify-URLs (`/products/*`, `/collections/*`, `/cart`).
6. `COMPANY.url`/`metadataBase` auf `https://ausdauer.shop`, Sitemap und Canonicals anpassen.
7. E2E-Test mit gemockter Storefront API: Betrag wählen, dann Weiterleitung zur Kasse.
8. Livegang-Reihenfolge:
   - neue Seite auf Vercel unter ausdauer.shop-Vorschau testen
   - `checkout.ausdauer.shop` in Shopify verbinden
   - DNS von ausdauer.shop auf Vercel umstellen
   - ausdauer-shop.de per 301 weiterleiten

## Out of Scope
- Eigener Warenkorb mit mehreren Artikeln (vorbereitet, später).
- Verkauf von Sortimentsartikeln (Schuhe, Bekleidung).
- Kundenkonto/Login.

## Product Decisions
- Hauptdomain wird **ausdauer.shop** (Kundenentscheidung 2026-10-15).
- Eigene Seiten mit Shopify-Kasse statt Buy Button: Das sieht aus wie die Marke, die Seite bleibt cookiefrei und schnell. Die Kasse bleibt rechtssicher bei Shopify.
- Gutscheine bleiben vorerst in Shopify (Ausgabe, Saldo, Einlösung in Shopify POS), weil die WaWi noch in Entwicklung ist (Kundenentscheidung 2026-10-16, PROJ-11).
- Kein eigener Warenkorb im ersten Schritt: Für Einzelkäufe wie Gutschein oder Kurs ist „Jetzt kaufen“ der kürzeste Weg.

## Open Questions
- [x] Wie werden Gutscheine im Store eingelöst? → Shopify POS (iPads); WaWi-Kasse erst in PROJ-11 Phase 2.
- [x] Gutschein-Typ → bleibt nativer Shopify-Geschenkgutschein, Einlösung in Shopify POS (2026-10-16).
- [x] DNS-Provider → STRATO (2026-10-16).
- [ ] Sollen Kurstermine als Varianten mit Platzanzahl in Shopify gepflegt werden?
