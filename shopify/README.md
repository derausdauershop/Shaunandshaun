# Shopify-Vorlagen (PROJ-11)

Gutschein-Mail und Gutschein-Seite im AUSDAUER-Design, für die Gutscheine aus Shopify.

| Datei | Wohin in Shopify |
|---|---|
| `notifications/geschenkgutschein-erstellt.liquid` | Einstellungen → Benachrichtigungen → Kundenbenachrichtigungen → **Geschenkgutschein erstellt** → Code bearbeiten |
| `theme/templates/gift_card.liquid` | Onlineshop → Themes → … → Code bearbeiten → `templates/gift_card.liquid` (Inhalt ersetzen) |
| `theme/assets/*` | Gleiches Theme → `assets/` → „Neues Asset hinzufügen“ (alle 8 Dateien) |
| `email/ausdauer-logo-email@2x.png` | Einstellungen → Benachrichtigungen → **E-Mail-Vorlagen anpassen** → Logo, Breite **200 px** |

Vorschau mit Beispieldaten: `npm run preview:shopify` → `shopify/preview/*.html`.

## Schritt für Schritt (ca. 20 Min.)
1. **Sicherung:** Vor dem Ändern den bisherigen Code der Mail und von `gift_card.liquid` in eine Textdatei kopieren.
2. **Logo** für E-Mails hochladen (siehe Tabelle). Akzentfarbe `#E30110`.
3. **Mail:** Den Inhalt von `geschenkgutschein-erstellt.liquid` komplett einfügen.
   - Betreff: `Dein AUSDAUER Gutschein über {{ gift_card.initial_value | money_without_trailing_zeros }}`
   - Mit „Vorschau“ prüfen, dann „Test-E-Mail senden“.
4. **Theme-Assets** hochladen, dann `gift_card.liquid` ersetzen und speichern.
5. **Echter Test:** Einen 10-€-Gutschein kaufen (oder im Admin unter Produkte → Geschenkgutscheine einen ausstellen und an dich senden), dann prüfen:
   - Mail kommt an, Code und QR-Code sind sichtbar, der Button öffnet die Gutschein-Seite.
   - **iPad mit Shopify POS:** QR-Code aus der Mail **und** von der Gutschein-Seite scannen. Wird der Gutschein erkannt?
   - 5 € einlösen, danach zeigt die Gutschein-Seite 5 € Restguthaben.
   - Die Gutschein-Seite drucken (eine A4-Seite).

## Gut zu wissen
- **QR-Code in der Mail:** E-Mails können keine Skripte ausführen. Das Bild kommt deshalb von `https://ausdauer.shop/api/gift-qr?id=…`. Die Adresse gibt nur QR-Bilder für Shopify-Gutschein-Kennungen aus. **Bis ausdauer.shop auf der neuen Seite live ist, erscheint dort kein Bild.** Für die Zeit davor in der Mail die Zeile `{%- assign qr_service = … -%}` auf `''` setzen. Dann entfällt der QR-Code in der Mail, Code und Button bleiben.
- **Inhalt des QR-Codes** ist `gift_card.qr_identifier` (`shopify-giftcard-v1-…`). Das ist die Kennung, die Shopify selbst auf der Gutschein-Seite verwendet. Ob Shopify POS sie scannt, klärt der Test in Schritt 5.
- **Schriften:** Auf der Gutschein-Seite werden Barlow Condensed, Barlow und JetBrains Mono aus dem Theme geladen, ohne Google. In der Mail werden Systemschriften verwendet (Arial Narrow/Helvetica), weil viele Mail-Programme keine Webschriften laden.
- **Domain:** Shopify liefert die Gutschein-Seite unter einer eigenen Shopify-Adresse aus (Pfad `/gift_cards/…`). Sie hängt nicht an ausdauer.shop. Das Theme muss aber veröffentlicht bleiben.
- **Variablen** (`gift_card.code`, `qr_identifier`, `message`, `customer.first_name`, `pass_url`, `expires_on`) sind alle mit `if` abgesichert. Fehlt ein Wert, entfällt der Block, statt kaputt auszusehen.
