# PROJ-11: Gutscheine mit QR-Code – Ausgabe online, Einlösung in Shopify POS, später WaWi-Kasse

**Status:** In Progress · **Priorität:** P0 · **Erstellt:** 2026-10-16 · **Abhängigkeiten:** PROJ-10 (Shop-Integration), eigene Warenwirtschaft (WaWi, in Entwicklung)

## Ausgangslage
- Online-Gutscheine werden heute in Shopify verkauft und über **Shopify POS** eingelöst.
- Die neue WaWi mit eigener Kasse ist in Entwicklung. Künftig soll dort per **QR-Code** eingelöst werden.
- Gutscheine aus dem Laden und aus dem Online-Verkauf sollen gleich funktionieren.

## Entscheidung (Kunde, 2026-10-16)
Die WaWi ist noch in Entwicklung, im Laden wird mit Shopify POS auf iPads kassiert. Deshalb gilt:
**Shopify bleibt vorerst das Gutschein-Konto.** Die Gutscheine bleiben native Shopify-Geschenkgutscheine und werden weiter in Shopify POS eingelöst. Die WaWi-Anbindung kommt später als Phase 2.

## Phase 1 – jetzt: Headless-Verkauf, Shopify-Gutschein, Einlösung in Shopify POS
```
ausdauer.shop/gutscheine (Next.js) → Storefront API cartCreate → Kasse checkout.ausdauer.shop
        │ bezahlt
        ▼
Shopify erzeugt den Geschenkgutschein (Code) automatisch
        ├─ Bestellbestätigung (Shopify)
        └─ Gutschein-Mail (Shopify-Vorlage „Geschenkgutschein erstellt“, im AUSDAUER-Design)
              Code + Link „Gutschein ansehen“ (QR-Code dort) → checkout.ausdauer.shop/gift_cards/…
        ▼
Einlösung nur im Laden: Shopify POS (iPad) – Code scannen oder eintippen,
immer komplett; Rest als Gutschrift (Entscheidung 2026-10-16)
```
- Das Gutschein-Produkt bleibt ein **Shopify-Geschenkgutschein** (Produkttyp „Geschenkgutschein“, Varianten 10–300 €). Über die Storefront API wird er wie jedes Produkt in den Warenkorb gelegt; Shopify stellt den Code nach der Zahlung aus.
- **Zustellung:** Shopify verschickt die Gutschein-Mail automatisch. Die Mail-Vorlage gestalten wir im AUSDAUER-Design (Logo, Farben, Code groß in JetBrains Mono, Hinweis „Einlösbar in Betzdorf und Siegen“, „komplett einlösen, Rest als Gutschrift“).
- **Gutschein-Seite:** Der Link in der Mail führt auf die Gutschein-Seite von Shopify (QR-Code, Restguthaben, Apple Wallet). Shopify liefert sie unter einer eigenen Shopify-Adresse aus (`/gift_cards/…`), nicht unter ausdauer.shop. Deshalb gilt:
  - Das Theme bleibt veröffentlicht. Die Vorlage `gift_card.liquid` ist im AUSDAUER-Design gestaltet.
  - Vorsorglich werden `/gift_cards/*` nicht auf die neue Webseite umgeleitet (Ausnahme in PROJ-10).
- **QR-Inhalt:** `gift_card.qr_identifier` (`shopify-giftcard-v1-…`), dieselbe Kennung, die Shopify auf der Gutschein-Seite verwendet. Nur auf der Gutschein-Seite. In der Mail entfällt das QR-Bild, weil Mails kein JavaScript ausführen und die statische Webseite (STRATO) keine Bilder erzeugen kann.
- **Scannen in Shopify POS:** Ob der QR-Code aus Mail oder Gutschein-Seite direkt mit der iPad-Kamera bzw. dem Scanner gelesen wird, ist vor dem Livegang zu testen. Rückfall: Code eintippen (steht immer als Text daneben). Falls Scannen nicht klappt, gibt es POS-Apps zum Scannen (z. B. GiftCard Hero, Scan2Add) – erst prüfen, ob sie Gutscheine unterstützen.
- **Bestehende Gutscheine** bleiben unverändert gültig, es gibt keine Migration.

## Phase 2 – später: Einlösung an der WaWi-Kasse
Sobald die WaWi-Kasse die iPads ablöst. Zwei Wege, Entscheidung bei der Architektur von Phase 2:
- **A – Shopify bleibt Konto (bevorzugt für einen weichen Übergang):** Die WaWi-Kasse scannt den Code, fragt den Saldo über die Shopify Admin API ab und bucht mit der Mutation `giftCardDebit` ab (Scope `write_gift_card_transactions`). Vorteil: Shopify POS und WaWi können parallel laufen, keine Migration.
  - Achtung: Shopify beschreibt `giftCardDebit` als manuelle Korrektur. Vor dem Bau prüfen, ob das für Ladeneinlösungen vorgesehen ist (Shopify-Support), und Ausfallverhalten klären (Kasse ohne Internet bzw. Shopify-Störung).
- **B – WaWi wird das Konto:** Ursprünglicher Entwurf (siehe unten „Referenz: WaWi als Gutschein-Konto“), mit Import der offenen Shopify-Salden zum Stichtag.

## Referenz: WaWi als Gutschein-Konto (Variante B, Phase 2)
**Die WaWi ist das einzige Gutschein-Konto.** Die WaWi erzeugt, verwaltet und löst alle Gutscheine ein, egal ob online oder im Laden gekauft. Shopify kassiert nur und meldet jeden Kauf an die WaWi.

Warum nicht Shopify-Geschenkgutscheine behalten?
- Sonst gäbe es zwei Gutscheinsysteme mit zwei Salden, eins in Shopify und eins in der WaWi.
- Die Kasse müsste bei jeder Einlösung live bei Shopify abbuchen und wäre von dessen API abhängig.
- Mit der WaWi als Konto bleibt Shopify austauschbar.

### Ablauf
```
ONLINE                                                    LADEN (Betzdorf / Siegen)
ausdauer.shop/gutscheine → Shopify-Kasse                  Verkauf an der WaWi-Kasse
        │ bezahlt                                                │
        ▼                                                        ▼
Shopify-Webhook orders/paid ──(signiert)──▶  WaWi: Gutschein anlegen (Code, Betrag, Gültigkeit)
                                                │
                                ┌───────────────┴────────────────┐
                                ▼                                ▼
                 E-Mail mit PDF-Gutschein + QR       Ausdruck an der Kasse (gleiches Layout)
                                │
                                ▼
          Einlösung: QR scannen an der WaWi-Kasse → Saldo prüfen → (Teil-)Betrag abbuchen
          Optional: Kunde scannt QR mit dem Handy → ausdauer.shop/g/<CODE> zeigt Restguthaben
```

### Gutschein-Code & QR
- **Code:** zufällig und nicht erratbar, mindestens 80 Bit. Beispiel: 16 Zeichen Crockford-Base32 mit Prüfzeichen, gedruckt in Vierergruppen: `AUSD-7K2M-QX9P-4TRV`. Keine fortlaufenden Nummern.
- **QR-Inhalt:** `https://ausdauer.shop/g/<CODE>`. Den gleichen QR-Code nutzen zwei Seiten:
  - **Kasse:** Der Scanner liest die URL, die WaWi nimmt den Code aus dem letzten Pfadteil.
  - **Kunde:** Mit der Handykamera öffnet sich eine Seite, die nur das Restguthaben und die Gültigkeit zeigt. Es werden keine Käuferdaten angezeigt.
- Der Code steht immer zusätzlich als Text unter dem QR-Code, falls der Scanner ausfällt.

### Schnittstelle WaWi (Vertrag, technologieneutral)
| Methode & Pfad | Zweck | Wer ruft auf |
|---|---|---|
| `POST /api/vouchers` | Gutschein anlegen. Idempotent über `externalId`, z. B. Shopify-Order-Line-ID. | Webhook-Empfänger (Shopify) und Kasse |
| `GET /api/vouchers/{code}` | Saldo, Status, Gültigkeit | Kasse, Restguthaben-Seite (nur öffentliche Felder) |
| `POST /api/vouchers/{code}/redemptions` | Betrag abbuchen. Body: `amount`, `storeId`, `receiptId`. Antwort: neuer Saldo. | Kasse |
| `POST /api/vouchers/{code}/reversals` | Stornierung einer Einlösung, z. B. bei einem Bon-Storno | Kasse |

- **Datenmodell:**
  - Gutschein: `code`, `initialAmount`, `balance`, `currency`, `status` (aktiv/eingelöst/gesperrt), `issuedAt`, `validUntil`, `channel` (online/Betzdorf/Siegen), `externalId`.
  - Buchungen: unveränderliches Journal mit Ausgabe, Einlösung und Storno. Jede Buchung trägt Betrag, Store, Bon-Nr. und Zeitpunkt.
  - Der Saldo ist immer die Summe des Journals.
- **Gleichzeitigkeit:** Eine Einlösung läuft in einer DB-Transaktion mit Zeilensperre. Zwei Kassen können denselben Gutschein nicht gleichzeitig doppelt abbuchen.
- **Sicherheit:**
  - Der Shopify-Webhook wird per HMAC geprüft.
  - Kassen-Endpunkte sind nur mit Geräte- oder Benutzer-Authentifizierung erreichbar.
  - Die öffentliche Saldo-Abfrage ist rate-limitiert und zeigt nur Saldo, Gültigkeit und Status.

### Shopify-Einstellungen
- Der Gutschein wird in Shopify ein **normales digitales Produkt** mit Varianten von 10 € bis 300 €, **kein** Shopify-Geschenkgutschein. Sonst würde Shopify parallel eigene Codes erzeugen.
- Webhook `orders/paid` auf den WaWi-Endpunkt einrichten.
- Die Shopify-Bestellbestätigung bleibt. Den eigentlichen Gutschein mit QR-Code verschickt die WaWi als PDF im AUSDAUER-Design (Vorlage `gutschein-vorne/-hinten`, PROJ-8).

### Übergang von Shopify POS
1. Alle offenen Shopify-Geschenkgutscheine mit Restguthaben aus dem Shopify-Admin als CSV exportieren.
2. Die Codes und Salden in die WaWi importieren. Die alten Codes bleiben gültig, damit niemand einen neuen Gutschein braucht.
3. Ab dem Stichtag werden keine neuen Shopify-Geschenkgutscheine mehr verkauft. Shopify POS wird abgeschaltet.

## Rechtliches & Buchhaltung (mit Steuerberatung abstimmen)
- **Umsatzsteuer:** Wertgutscheine für das ganze Sortiment sind in der Regel **Mehrzweckgutscheine**. Die Umsatzsteuer fällt erst bei der Einlösung an. Der Verkauf wird als Verbindlichkeit gebucht.
- **Gültigkeit:** Ohne Befristung gilt die regelmäßige Verjährung von 3 Jahren zum Jahresende. Eine kürzere Befristung muss angemessen sein. Die Gültigkeit steht auf dem Gutschein.
- **Export:** Phase 1: Gutschein-Berichte aus Shopify für die Buchhaltung. Phase 2 (Variante B): DATEV-Export aus der WaWi.

## Auswirkungen auf andere Features
- **PROJ-10:**
  - `/gift_cards/*` bleibt auf checkout.ausdauer.shop erreichbar und wird nicht umgeleitet.
  - Der Onlineshop-Kanal bleibt ohne Passwort aktiv.
  - Gestaltet werden `gift_card.liquid` und die Gutschein-Mail.
- **PROJ-8:** Gutschein-Vorlage
  - Die Rückseite bekommt ein Feld für Code und QR-Code.
  - Phase 1: Im Laden verkaufte Karten bekommen den Code aus Shopify POS als Aufkleber oder handschriftlich.
  - Phase 2: Die WaWi druckt Code und QR-Code direkt mit.

## Acceptance Criteria (Phase 1)
- **Angenommen** jemand kauft auf ausdauer.shop einen 50-€-Gutschein, **dann** erstellt Shopify genau einen Geschenkgutschein über 50 €, **und** die kaufende Person bekommt die Gutschein-Mail im AUSDAUER-Design mit Code und Link zur Gutschein-Seite mit QR-Code.
- **Angenommen** der Link „Gutschein ansehen“ in der Mail wird geöffnet, **dann** erscheint die Gutschein-Seite unter checkout.ausdauer.shop im AUSDAUER-Design (keine Weiterleitung auf die Webseite).
- **Angenommen** ein 50-€-Gutschein wird im Laden für einen Einkauf über 30 € eingelöst, **dann** wird er komplett eingelöst (Guthaben 0 €) **und** die Kundin oder der Kunde bekommt 20 € als Gutschrift.
- Mail, Gutschein-Seite und Webseite nennen „komplett einlösen, Rest als Gutschrift“ und nur die beiden Stores.
- Vor dem Livegang gekaufte Gutscheine bleiben gültig.

## Acceptance Criteria (Phase 2, Entwurf)
- Siehe Referenz-Abschnitt; wird bei `/architecture` für Phase 2 neu gefasst.

## Open Questions
- [x] Wo wird eingelöst? → Vorerst Shopify POS (iPads); WaWi-Kasse in Phase 2 (2026-10-16).
- [ ] Liest Shopify POS den QR-Code von der Gutschein-Seite per Kamera/Scanner? (Test mit einem echten Gutschein)
- [x] Teilbeträge? → Nein: komplett einlösen, Rest als Gutschrift (2026-10-16). Kassen-Ablauf in POS legt das Team fest (POS zieht von sich aus nur den Kaufbetrag ab).
- [ ] Phase 2: Variante A (Shopify bleibt Konto, `giftCardDebit`) oder B (WaWi wird Konto)?
- [ ] Phase 2: Technologie und Repository der WaWi, Scanner-Hardware.
- [ ] Gültigkeit: Shopify-Einstellung prüfen (gesetzlich 3 Jahre zum Jahresende oder eigene Frist).

## Implementation Notes (Phase 1, 2026-10-16)
- `shopify/notifications/geschenkgutschein-erstellt.liquid`:
  - Gutschein-Mail im AUSDAUER-Design, tabellenbasiert und mobil getestet bei 375 px.
  - Inhalt: Betrag, persönliche Nachricht, Code, QR-Code, Buttons „Gutschein ansehen“ und Apple Wallet, „So löst du ein“, beide Stores.
- `shopify/theme/templates/gift_card.liquid` und `shopify/theme/assets/*`:
  - Gutschein-Seite mit Restguthaben, QR-Code über Shopifys `vendor/qrcode.js`, „Code kopieren“, Druckansicht auf einer A4-Seite.
  - Zustände abgelaufen und deaktiviert.
  - Schriften selbst gehostet.
- `shopify/email/ausdauer-logo-email@2x.png`: Logo für die Mail-Einstellungen.
- `src/app/api/gift-qr/route.ts`:
  - liefert ein PNG mit QR-Code für die Mail
  - akzeptiert nur `shopify-giftcard-v1-…` (`src/lib/gift-qr.ts`, mit Unit-Test)
  - `noindex`, kein CDN-Cache, `/api` in robots gesperrt
- `scripts/preview-shopify.mts` (`npm run preview:shopify`) rendert die Liquid-Vorlagen mit Beispieldaten per liquidjs nach `shopify/preview/`.
- Einbau-Anleitung: `shopify/README.md`.
- Offen: Einbau im Shopify-Admin, Test-Kauf, Scan-Test mit Shopify POS auf dem iPad.

## Update 2026-10-16: Statische Webseite, Einlösung komplett im Store
- **Entscheidung Kunde:** Der Gutschein wird im Store komplett eingelöst. Ein Rest wird als Gutschrift ausgegeben. Es gibt keine Online-Einlösung und kein Restguthaben auf dem Gutschein.
- Texte angepasst:
  - `src/content/voucher.ts` („In Betzdorf & Siegen“, „Rest als Gutschrift“), Seitenbeschreibung von `/gutscheine`
  - `gift_card.liquid` (kein „Restguthaben“, kein „Online“)
  - Mail-Vorlage (kein QR-Bild, Schritte 01–03 neu, Vorschautext)
  - `shopify/README.md` (Testablauf, Hinweis zum Kassen-Ablauf in POS)
- `/api/gift-qr`, `src/lib/gift-qr.ts` und der Test sind entfernt, weil die Webseite statisch auf STRATO läuft (PROJ-10).
