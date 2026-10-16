# PROJ-11: Gutscheine mit QR-Code – Ausgabe online, Einlösung über die WaWi-Kasse

**Status:** Planned · **Priorität:** P0 · **Erstellt:** 2026-10-16 · **Abhängigkeiten:** PROJ-10 (Shop-Integration), eigene Warenwirtschaft (WaWi, in Entwicklung)

## Ausgangslage
- Online-Gutscheine werden heute in Shopify verkauft und über **Shopify POS** eingelöst.
- Die neue WaWi mit eigener Kasse ist in Entwicklung. Künftig soll dort per **QR-Code** eingelöst werden.
- Gutscheine aus dem Laden und aus dem Online-Verkauf sollen gleich funktionieren.

## Entscheidung (Vorschlag)
**Die WaWi ist das einzige Gutschein-Konto.** Die WaWi erzeugt, verwaltet und löst alle Gutscheine ein, egal ob online oder im Laden gekauft. Shopify kassiert nur und meldet jeden Kauf an die WaWi.

Warum nicht Shopify-Geschenkgutscheine behalten?
- Sonst gäbe es zwei Gutscheinsysteme mit zwei Salden, eins in Shopify und eins in der WaWi.
- Die Kasse müsste bei jeder Einlösung live bei Shopify abbuchen und wäre von dessen API abhängig.
- Mit der WaWi als Konto bleibt Shopify austauschbar.

## Ablauf
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

## Gutschein-Code & QR
- **Code:** zufällig und nicht erratbar, mindestens 80 Bit. Beispiel: 16 Zeichen Crockford-Base32 mit Prüfzeichen, gedruckt in Vierergruppen: `AUSD-7K2M-QX9P-4TRV`. Keine fortlaufenden Nummern.
- **QR-Inhalt:** `https://ausdauer.shop/g/<CODE>`. Den gleichen QR-Code nutzen zwei Seiten:
  - **Kasse:** Der Scanner liest die URL, die WaWi nimmt den Code aus dem letzten Pfadteil.
  - **Kunde:** Mit der Handykamera öffnet sich eine Seite, die nur das Restguthaben und die Gültigkeit zeigt. Es werden keine Käuferdaten angezeigt.
- Der Code steht immer zusätzlich als Text unter dem QR-Code, falls der Scanner ausfällt.

## Schnittstelle WaWi (Vertrag, technologieneutral)
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

## Shopify-Einstellungen
- Der Gutschein wird in Shopify ein **normales digitales Produkt** mit Varianten von 10 € bis 300 €, **kein** Shopify-Geschenkgutschein. Sonst würde Shopify parallel eigene Codes erzeugen.
- Webhook `orders/paid` auf den WaWi-Endpunkt einrichten.
- Die Shopify-Bestellbestätigung bleibt. Den eigentlichen Gutschein mit QR-Code verschickt die WaWi als PDF im AUSDAUER-Design (Vorlage `gutschein-vorne/-hinten`, PROJ-8).

## Übergang von Shopify POS
1. Alle offenen Shopify-Geschenkgutscheine mit Restguthaben aus dem Shopify-Admin als CSV exportieren.
2. Die Codes und Salden in die WaWi importieren. Die alten Codes bleiben gültig, damit niemand einen neuen Gutschein braucht.
3. Ab dem Stichtag werden keine neuen Shopify-Geschenkgutscheine mehr verkauft. Shopify POS wird abgeschaltet.

## Rechtliches & Buchhaltung (mit Steuerberatung abstimmen)
- **Umsatzsteuer:** Wertgutscheine für das ganze Sortiment sind in der Regel **Mehrzweckgutscheine**. Die Umsatzsteuer fällt erst bei der Einlösung an. Der Verkauf wird als Verbindlichkeit gebucht.
- **Gültigkeit:** Ohne Befristung gilt die regelmäßige Verjährung von 3 Jahren zum Jahresende. Eine kürzere Befristung muss angemessen sein. Die Gültigkeit steht auf dem Gutschein.
- **Export:** Ausgabe und Einlösungen werden für die Buchhaltung exportiert, z. B. als DATEV-Export aus der WaWi.

## Auswirkungen auf andere Features
- **PROJ-10:** Ein Gutschein-Kauf löst jetzt den Webhook an die WaWi aus. Neu ist die Seite `ausdauer.shop/g/[code]` für die Restguthaben-Abfrage, die serverseitig die WaWi-API aufruft.
- **PROJ-8:** Gutschein-Vorlage
  - Die Rückseite bekommt ein QR-Feld und eine Code-Zeile.
  - Die WaWi füllt beides beim Ausdruck oder im PDF.

## Acceptance Criteria
- **Angenommen** jemand kauft online einen 50-€-Gutschein, **dann** existiert in der WaWi genau ein aktiver Gutschein über 50 € (auch wenn Shopify den Webhook doppelt sendet), **und** die kaufende Person bekommt ein PDF mit QR-Code.
- **Angenommen** an der Kasse wird der QR-Code gescannt und 30 € eingelöst, **dann** beträgt der Saldo 20 €, **und** die Buchung steht mit Store und Bon-Nr. im Journal.
- **Angenommen** der Saldo ist 20 € und es sollen 30 € eingelöst werden, **dann** lehnt die WaWi ab und zeigt den verfügbaren Betrag.
- **Angenommen** zwei Kassen buchen gleichzeitig vom selben Gutschein ab, **dann** wird höchstens der vorhandene Saldo abgebucht.
- **Angenommen** jemand ruft `ausdauer.shop/g/<CODE>` auf, **dann** sieht er Restguthaben und Gültigkeit, aber keine persönlichen Daten.
- **Angenommen** ein Code ist ungültig, **dann** zeigt die Seite „Gutschein nicht gefunden“, ohne zu verraten, ob es ihn gibt.

## Open Questions
- [ ] Technologie und Hosting der WaWi (Sprache, Datenbank, erreichbar aus dem Internet für den Webhook?) – und kann ich das Repository sehen?
- [ ] Welche Scanner und Kassen-Hardware kommen zum Einsatz (2D-Scanner für QR nötig)?
- [ ] Gültigkeitsdauer der Gutscheine festlegen (gesetzlich vs. eigene Frist).
- [ ] Soll die Restguthaben-Seite für Kundinnen und Kunden angeboten werden?
