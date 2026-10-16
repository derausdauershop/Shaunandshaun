# Shopify-Vorlagen (PROJ-11)

Gutschein-Mail und Gutschein-Seite im AUSDAUER-Design, für die Gutscheine aus Shopify.

| Datei | Wohin in Shopify |
|---|---|
| `notifications/geschenkgutschein-erstellt.liquid` | Einstellungen → Benachrichtigungen → Kundenbenachrichtigungen → **Geschenkgutschein erstellt** → Code bearbeiten |
| `theme/templates/gift_card.liquid` | Onlineshop → Themes → … → Code bearbeiten → `templates/gift_card.liquid` (Inhalt ersetzen) |
| `theme/assets/*` | Gleiches Theme → `assets/` → „Neues Asset hinzufügen“ (alle 8 Dateien) |
| `email/ausdauer-logo-email@2x.png` | Einstellungen → Benachrichtigungen → **E-Mail-Vorlagen anpassen** → Logo, Breite **200 px** |

**Unabhängig von der Domain:** Die Vorlagen können sofort im bestehenden Shop eingebaut werden. Der Gutschein-Verkauf unter ausdauer.shop läuft dabei unverändert weiter.

**Einlösung:** nur im Store (Betzdorf, Siegen) und immer komplett. Ist der Einkauf kleiner als der Gutschein, bekommt die Kundin oder der Kunde den Rest als Gutschrift. So steht es auf Mail, Gutschein-Seite und Webseite.

Vorschau mit Beispieldaten: `npm run preview:shopify` → `shopify/preview/*.html`.

## Schritt für Schritt (ca. 20 Min.)
1. **Sicherung:** Vor dem Ändern den bisherigen Code der Mail und von `gift_card.liquid` in eine Textdatei kopieren.
2. **Logo** für E-Mails hochladen (siehe Tabelle). Akzentfarbe `#E30110`.
3. **Mail:** Den Inhalt von `geschenkgutschein-erstellt.liquid` komplett einfügen.
   - Betreff: `Dein AUSDAUER Gutschein über {{ gift_card.initial_value | money_without_trailing_zeros }}`
   - Mit „Vorschau“ prüfen, dann „Test-E-Mail senden“.
4. **Theme-Assets** hochladen, dann `gift_card.liquid` ersetzen und speichern.
5. **Echter Test:** Einen 10-€-Gutschein kaufen (oder im Admin unter Produkte → Geschenkgutscheine einen ausstellen und an dich senden), dann prüfen:
   - Mail kommt an, der Code ist sichtbar, der Button öffnet die Gutschein-Seite mit QR-Code.
   - **iPad mit Shopify POS:** QR-Code von der Gutschein-Seite scannen bzw. Code eingeben. Wird der Gutschein erkannt?
   - Einlösen über den vollen Betrag, Rest als Gutschrift ausstellen. Danach zeigt die Gutschein-Seite 0 € bzw. „eingelöst“.
   - Die Gutschein-Seite drucken (eine A4-Seite).

## Gut zu wissen
- **Kein QR-Bild in der Mail:** E-Mails können keine Skripte ausführen, und die neue Webseite ist statisch (STRATO, ohne Server), kann also keine QR-Bilder erzeugen. Die Mail zeigt deshalb den Code, der QR-Code steht auf der Gutschein-Seite (Button „Gutschein ansehen“).
- **Komplett einlösen in Shopify POS:** POS zieht von Haus aus nur den Kaufbetrag ab. Damit der Gutschein danach leer ist, den Restbetrag an der Kasse mit einlösen bzw. im Admin unter Produkte → Geschenkgutscheine abziehen und den Rest als Gutschrift ausstellen. Den genauen Kassen-Ablauf legt ihr im Team fest.
- **Inhalt des QR-Codes** ist `gift_card.qr_identifier` (`shopify-giftcard-v1-…`). Das ist die Kennung, die Shopify selbst auf der Gutschein-Seite verwendet. Ob Shopify POS sie scannt, klärt der Test in Schritt 5.
- **Schriften:** Auf der Gutschein-Seite werden Barlow Condensed, Barlow und JetBrains Mono aus dem Theme geladen, ohne Google. In der Mail werden Systemschriften verwendet (Arial Narrow/Helvetica), weil viele Mail-Programme keine Webschriften laden.
- **Domain:** Shopify liefert die Gutschein-Seite unter einer eigenen Shopify-Adresse aus (Pfad `/gift_cards/…`). Sie hängt nicht an ausdauer.shop. Das Theme muss aber veröffentlicht bleiben.
- **Variablen** (`gift_card.code`, `qr_identifier`, `message`, `customer.first_name`, `pass_url`, `expires_on`) sind alle mit `if` abgesichert. Fehlt ein Wert, entfällt der Block, statt kaputt auszusehen.
