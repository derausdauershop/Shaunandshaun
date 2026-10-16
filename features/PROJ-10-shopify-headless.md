# PROJ-10: Shop-Integration (Headless Shopify) & Domain ausdauer.shop

**Status:** In Progress · **Priorität:** P0 · **Erstellt:** 2026-10-15 · **Abhängigkeiten:** PROJ-4, PROJ-5, PROJ-11

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
ausdauer.shop (STRATO, statisch)                    Shopify (unverändert als Backend)
├─ /gutscheine ── Betrag wählen ──┐                 ├─ Produkte, Preise, Bestand (Kursplätze)
├─ /run-academy/[kurs] ── buchen ─┼─ Browser ───────┼─ Storefront API: cartCreate
│                                 │                 ├─ Kasse: checkout.ausdauer.shop
│                                                   └─ Gutschein-Mail + Gutschein-Seite (Shopify, /gift_cards/…)
└─ Beträge (Varianten-IDs) als Datendatei src/content/voucher.ts
```
- **Datenquelle:** Shopify Storefront API (GraphQL) mit öffentlichem Storefront-Token aus dem kostenlosen Sales-Channel „Headless“.
  - Server-seitig abgefragt, ISR alle 5 Minuten.
  - Fällt Shopify aus, zeigen die Seiten die zuletzt bekannten Daten und einen Hinweis.
- **Kaufen:** Ein Klick auf „Jetzt kaufen“ startet eine Server Action. Sie legt per `cartCreate` einen Warenkorb mit genau einer Variante an und leitet zur `checkoutUrl` weiter.
  - Zunächst gibt es keinen eigenen Warenkorb, weil pro Bestellung meist nur ein Gutschein oder Kurs gekauft wird.
  - Ein Warenkorb lässt sich später ergänzen („Später mehr“).
- **Kasse:** Die Shopify-Kasse läuft unter der Subdomain `checkout.ausdauer.shop`. Das sieht vertrauenswürdig aus und bleibt rechtssicher: AGB, Widerruf, Zahlarten und der Button „Zahlungspflichtig bestellen“ kommen von Shopify.
- **Shopify-Storefront (Theme):** Wird bis auf die Gutschein-Seite nicht mehr gebraucht. Alle Theme-URLs leiten auf die neue Webseite um, **außer `/gift_cards/*`** (vorsorglich, Link aus der Gutschein-Mail, PROJ-11). Das Theme bleibt veröffentlicht. Gestaltet werden nur `gift_card.liquid` und die Benachrichtigungs-Mails.
- **Konfiguration:** `NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN`, `NEXT_PUBLIC_SHOPIFY_STOREFRONT_TOKEN` (öffentlicher Token, in `.env.local` beim Build, nie im Repo).
- **Hosting (seit 2026-10-16):** statischer Export auf dem STRATO-Webspace, kein Vercel. Siehe „Update: Statische Variante“.

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
8. Livegang ohne Verkaufspause (Grundsatz: Bis zur Umstellung bleibt der heutige Shop unter ausdauer.shop unverändert live):
   - **Jetzt, unabhängig von der Domain:** Gutschein-Mail und Gutschein-Seite (PROJ-11) im bestehenden Shop einbauen. Den QR-Code in der Mail so lange ausschalten, bis ausdauer.shop auf Vercel läuft.
   - **Vorbereitung parallel:**
     - Neue Seite unter der Vercel-Vorschauadresse (`*.vercel.app`) bauen und abnehmen.
     - Den Headless-Kanal installieren und einen Testkauf über die Vorschauseite machen. Die Kasse läuft dabei noch über die Shopify-Domain.
   - **1–2 Tage vorher:**
     - TTL der DNS-Einträge bei STRATO senken, falls möglich.
     - CNAME `checkout` → `shops.myshopify.com` anlegen und `checkout.ausdauer.shop` in Shopify verbinden. ausdauer.shop bleibt dabei Hauptdomain, beide Adressen funktionieren.
   - **Umstellungstag:**
     1. ausdauer.shop in Vercel hinzufügen.
     2. In Shopify `checkout.ausdauer.shop` zur Hauptdomain machen.
     3. Bei STRATO A-Record `@` und `www` auf Vercel umstellen.
     4. Testkauf über die neue Seite, Gutschein-Mail prüfen, QR-Code in der Mail einschalten.
     - Während der DNS-Umstellung sehen manche Besucher noch den alten Shop. Auch dort funktioniert der Kauf, es gibt also keine Lücke.
   - **Rückweg:** Falls etwas nicht klappt, die DNS-Einträge bei STRATO zurückstellen. Dann läuft wieder der alte Shop.
   - **Danach:**
     - ausdauer-shop.de per 301 weiterleiten.
     - Die Theme-Weiterleitungen und das Entfernen von ausdauer.shop aus Shopify erst, wenn die neue Seite einige Tage stabil läuft.
     - E-Mail-Einträge (MX/SPF/DKIM) von **beiden** Domains nicht verändern.

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
- [ ] Sollen Kurstermine als Varianten mit Platzanzahl in Shopify gepflegt werden? (Erst relevant, wenn der Einsteigerkurs im Frühjahr buchbar wird.)
- [ ] Werden die Empfängerfelder (Name, E-Mail, Nachricht, Versanddatum) aus dem Headless-Warenkorb von Shopify übernommen und an die beschenkte Person geschickt? Klärt der erste Testkauf.
- [x] Storefront-Token aus dem Headless-Kanal geliefert (2026-10-16). Lokal in `.env.local` (nicht im Repo). Für den Livegang in Vercel als Umgebungsvariable eintragen.

## Tech Design (Solution Architect, 2026-10-16)

### Umfang dieser Ausbaustufe
- **Jetzt:** Gutscheine auf der eigenen Seite kaufen, Bezahlung in der Shopify-Kasse.
- **Vorbereitet, aber noch aus:** Kursbuchung. Der Einsteigerkurs „startet im Frühjahr“ und ist noch nicht buchbar (PROJ-5). Sobald Termine feststehen, wird nur ein Schalter in den Kursdaten umgelegt.
- **Nicht in dieser Stufe:** Domain-Umzug. Er folgt erst nach Freigabe der Seite (Livegang-Plan oben).

### Seitenaufbau `/gutscheine`
```
Gutscheine-Seite
+-- Kopfbereich: „Verschenk Kilometer.“ + Gutschein-Vorschau im AUSDAUER-Design
|   (zeigt live den gewählten Betrag)
+-- Betragsauswahl: Kacheln aus den Shopify-Varianten (z. B. 10 / 25 / 50 / 75 / 100 … 300 €)
+-- Verschenken an … (aufklappbar, optional)
|   +-- Name der beschenkten Person
|   +-- E-Mail der beschenkten Person
|   +-- Persönliche Nachricht (max. 200 Zeichen, Zeichenzähler)
|   +-- Versanddatum (heute oder später)
+-- „Jetzt kaufen“ → Weiterleitung in die Shopify-Kasse
+-- So funktioniert's: per E-Mail · einlösbar in Betzdorf, Siegen und online · Restguthaben bleibt
+-- Hinweis bei Störung: „Shop gerade nicht erreichbar“ + Link direkt zur Shopify-Kasse
```
Danke-Seite `/bestellung-abgeschlossen`: kurze Bestätigung, Hinweis auf die Gutschein-Mail, Link zurück zur Startseite.

### Daten (was woher kommt)
- **Aus Shopify (nur lesen):** Gutschein-Produkt mit seinen Varianten (Betrag, verfügbar ja/nein). Abgefragt über die Storefront-Schnittstelle mit dem öffentlichen Token. Zwischengespeichert 5 Minuten.
- **Auf der Webseite gespeichert:** nichts. Es gibt keine Datenbank, kein Kundenkonto und kein Cookie.
- **Weitergabe an Shopify beim Kauf:** gewählte Variante, Menge 1, optionale Empfängerangaben. Die Empfängerangaben gehen als Felder an der Warenkorb-Position mit, so wie im Shopify-Theme.
- **Ausweichdaten:** Ist Shopify nicht erreichbar, zeigt die Seite die zuletzt bekannten Beträge aus einer kleinen Datei im Projekt und verlinkt direkt die Shopify-Produktseite.

### Ablauf beim Kauf
1. Betrag wählen, optional Empfänger eintragen.
2. „Jetzt kaufen“: Der Server der Webseite prüft die Eingaben (Betrag existiert, E-Mail gültig, Nachricht nicht zu lang). Dann legt er bei Shopify einen Warenkorb mit genau diesem Gutschein an.
3. Die Kundin landet in der Shopify-Kasse (heute unter der Shopify-Adresse, nach dem Umzug unter checkout.ausdauer.shop). Dort laufen Zahlung, AGB und Widerruf.
4. Shopify stellt den Gutschein aus und verschickt die Gutschein-Mail aus PROJ-11.

### Technische Entscheidungen (verständlich erklärt)
- **Server-Aktion statt Shopify-Skript im Browser:** Kein Shopify-Code und kein Cookie auf der Webseite. Sie bleibt schnell und datenschutzfreundlich, und der Token liegt nur auf dem Server.
- **Kein eigener Warenkorb:** Wer einen Gutschein kauft, kauft meist genau einen. Das spart Bauaufwand und Fehlerquellen.
- **Beträge live aus Shopify:** Ändert ihr Preise oder Varianten im Shopify-Admin, erscheinen sie spätestens nach 5 Minuten auf der Seite, ohne Entwickler.
- **Prüfung der Eingaben auf dem Server:** Niemand kann über manipulierte Anfragen fremde Produkte oder Preise in den Warenkorb legen.
- **Tests ohne echten Shop:** Automatische Tests verwenden nachgebaute Shopify-Antworten. So läuft die Entwicklung schon jetzt, der echte Testkauf folgt mit dem Token.

### Bausteine
- Vorhandene shadcn-Komponenten: Button, Card, Input, Textarea, Label, Form (react-hook-form + Zod), Collapsible, Alert.
- Vorhandene Marken-Bausteine: Gutschein-Vorschau aus den Print-Vorlagen, Startnummer, Pace-Lines.
- Neue Pakete: keine. Die Shopify-Anbindung läuft über einfache Web-Anfragen, react-hook-form und Zod sind schon im Projekt.

### Umstellungen auf der bestehenden Seite
- **Gutschein-Buttons:** Die Buttons in Kopfzeile, mobilem Menü, Startseite und Laufanalyse zeigen auf `/gutscheine` statt auf den alten Shopify-Shop.
- **Weiterleitungen:** Die alten Shopify-Adressen (`/products/geschenk-gutschein`, `/collections/*`, `/cart`) leiten erst ab dem Domain-Umzug weiter.
- **Konfiguration:** `SHOPIFY_STORE_DOMAIN` und `SHOPIFY_STOREFRONT_TOKEN` stehen als Umgebungsvariablen in Vercel, nie im Code. Die Werte sind in `.env.local.example` dokumentiert.

## Decision Log
### Technical Decisions
| Decision | Rationale | Date |
|---|---|---|
| Storefront API + Server Action `cartCreate` statt Buy-Button-Skript | Kein Fremd-Skript und kein Cookie auf der Seite, Token bleibt auf dem Server, volles AUSDAUER-Design | 2026-10-16 |
| Kein eigener Warenkorb, „Jetzt kaufen“ mit genau einer Position | Gutscheinkauf ist ein Einzelkauf, weniger Aufwand und weniger Fehler | 2026-10-16 |
| Varianten live aus Shopify, Revalidierung 5 Min. | Preise und Beträge pflegt das Team in Shopify, keine Doppelpflege | 2026-10-16 |
| Empfänger, Nachricht und Versanddatum als Felder an der Warenkorb-Position | So erzeugt Shopify auch beim Theme-Kauf Empfänger-Gutscheine. Übernahme im Headless-Fall per Testkauf prüfen | 2026-10-16 |
| Statische Ausweichdaten + Direktlink zur Shopify-Produktseite | Der Verkauf läuft weiter, auch wenn die Schnittstelle kurz ausfällt | 2026-10-16 |
| **Statischer Export auf STRATO statt Vercel** (ersetzt Server Action und Live-Varianten) | Kunde: Vercel Pro (~20 €/Monat) lohnt sich für ein Feature nicht. STRATO-Webspace ist vorhanden | 2026-10-16 |
| `cartCreate` direkt aus dem Browser mit dem öffentlichen Token | Der Storefront-Token ist für Browser gedacht (nur Lesen + Warenkorb), CORS von Shopify erlaubt | 2026-10-16 |
| Beträge als Datendatei statt live | Ohne Server keine Live-Abfrage beim Seitenaufbau. Neuer Betrag in Shopify → Varianten-ID in `voucher.ts` ergänzen, neu bauen | 2026-10-16 |
| Weiterleitungen + Sicherheits-Header per generierter `.htaccess` | Apache bei STRATO. Wird nach jedem Build aus `src/lib/static-hosting.ts` erzeugt, Unit-Test prüft die Regeln | 2026-10-16 |
| Kursbuchung vorbereitet, aber deaktiviert | Einsteigerkurs startet im Frühjahr, Termine und Preis noch offen (PROJ-5) | 2026-10-16 |
| Keine Datenbank, keine neuen Pakete | Die Seite speichert keine Daten. Zod und react-hook-form sind vorhanden | 2026-10-16 |

## Implementation Notes (2026-10-16, Gutscheinkauf)
- `src/lib/shopify.ts`:
  - Storefront-Client (API-Version 2025-07)
  - `getVoucherProduct` (Varianten live, 5 Min. Cache, Ausweichdaten)
  - `voucherOrderSchema` (Zod, serverseitig)
  - `recipientAttributes`
  - `createVoucherCheckout` (`cartCreate`, nur erlaubte Gutschein-Varianten)
  - 7 Unit-Tests mit gemockten Antworten
- `src/content/voucher.ts`: Ausweichbeträge 10–300 € mit Varianten-IDs, Stand 2026-10-16.
- Seiten:
  - `/gutscheine`: Vorschau, Betragskacheln, „Direkt verschenken“ (Name, E-Mail, Nachricht ≤ 200 Zeichen, Versanddatum), Server Action `buyVoucher` mit Weiterleitung zur Shopify-Kasse
  - `/bestellung-abgeschlossen`: noindex
- Ist Shopify nicht erreichbar, erscheint ein Hinweis und die Weiterleitung geht auf die Shopify-Produktseite mit der gewählten Variante.
- Alle Gutschein-Buttons (`COMPANY.voucher`) zeigen auf `/gutscheine`, Sitemap ergänzt, `.env.local.example` angelegt.
- Geprüft mit dem echten Token:
  - Der Gutschein ist ein nativer Geschenkgutschein (`isGiftCard`).
  - `cartCreate` übernimmt die Empfänger-Attribute.
  - Die Weiterleitung führt in die Shopify-Kasse.
  - Der Bezahlschritt wurde nicht ausgeführt.
- Offen: echter Testkauf (Kunde). Dabei prüfen, ob der Gutschein an die beschenkte Person geht, inklusive Nachricht und Versanddatum.
- Hinweis Entwicklungsumgebung (Cloud-Sitzung): Node greift hier nur mit `NODE_USE_ENV_PROXY=1 NODE_EXTRA_CA_CERTS=/root/.ccr/ca-bundle.crt` auf Shopify zu. Ohne diese Variablen greift der Ausweichweg. Vercel betrifft das nicht.
- Kurs-Einsteiger-Produkt `einsteiger-laufkurs` (130 €) existiert in Shopify, wird aber nicht verkauft, solange der Kurs „startet im Frühjahr“ ist.

## Update: Statische Variante für STRATO (2026-10-16)
**Entscheidung Kunde:** Kein Vercel. Die Seite wird statisch gebaut und auf dem STRATO-Webspace gehostet. Gutscheine werden im Store komplett eingelöst; ein Rest wird als Gutschrift ausgegeben (PROJ-11).

**Umbau:**
- `next.config.ts`: `output: "export"`, `trailingSlash: true`, `images.unoptimized: true`. `npm run build` erzeugt `out/` (ca. 39 MB).
- Weiterleitungen alter Contao-URLs und Sicherheits-Header: `src/lib/static-hosting.ts`. `postbuild` schreibt daraus `out/.htaccess` (`scripts/write-htaccess.mts`):
  - 301-Regeln, auch mit `.html` oder `/` am Ende, `NE` für Ziele mit `#`
  - HTTPS-Zwang, Sicherheits-Header, Langzeit-Cache für `/_next/static/`, Kompression, eigene 404-Seite
  - Mit einem echten Apache 2.4 getestet; Regeln zusätzlich per Unit-Test (`static-hosting.test.ts`)
- Gutscheinkauf (`src/components/site/voucher-form.tsx`, `src/lib/shopify.ts`):
  - Validierung mit Zod im Browser
  - `cartCreate` direkt bei Shopify, Weiterleitung zur Kasse
  - Bei Fehler: Shopify-Produktseite mit gewählter Variante
  - Server Action `gutscheine/actions.ts` und `getVoucherProduct` entfallen.
  - Ohne Server gibt es keine serverseitige Prüfung. Das ist unkritisch, weil die Shopify-Kasse Preis und Variante selbst festlegt.
- Datumsabhängige Anzeigen werden im Browser berechnet (`src/hooks/use-today.ts`, `src/components/site/cup-status.tsx`, `jubilee-banner.tsx`):
  - „x von 8 Läufen gelaufen“, „Nächster Termin“, Badge „Gelaufen“, 40-Jahre-Banner
  - Das HTML zeigt den Stand vom Build-Tag.
- `/api/gift-qr` entfällt (kein Server). In der Mail steht nur der Code, der QR-Code steht auf der Gutschein-Seite.
- E2E: Weiterleitungstest durch Unit-Test ersetzt; neuer Test für den Kauf aus dem Browser mit gemockter Shopify-Antwort. 27 E2E- und 28 Unit-Tests grün.

**Deployment:** `npm run build` → Inhalt von `out/` (inkl. `.htaccess`) per SFTP/FTP in das Webspace-Verzeichnis der (Sub-)Domain laden. Zum Testen eine Subdomain (z. B. `neu.ausdauer-shop.de`) auf einen eigenen Ordner zeigen lassen. Die Seite muss im Wurzelverzeichnis einer (Sub-)Domain liegen, nicht in einem Unterordner.
