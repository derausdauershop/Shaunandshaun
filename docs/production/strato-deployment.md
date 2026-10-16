# Deployment auf STRATO (statische Webseite)

Die Webseite ist ein statischer Export von Next.js. Sie braucht keinen Server und kein Vercel, nur den STRATO-Webspace (Apache).

## 1. Bauen
```bash
npm ci
npm run build        # → out/ (HTML, Bilder, .htaccess)
```
- `.env.local` muss die öffentlichen Shopify-Werte enthalten (siehe `.env.local.example`). Ohne Token führt „Jetzt kaufen“ auf die Shopify-Produktseite.
- Lokal ansehen: `npm run start` (liefert `out/` aus; Weiterleitungen aus der `.htaccess` greifen erst bei STRATO).

## 2. Testumgebung (Subdomain)
1. STRATO-Kundenlogin → Domains → Subdomain anlegen, z. B. `neu.ausdauer-shop.de`.
2. Als Ziel ein **eigenes Verzeichnis** im Webspace wählen, z. B. `/neu`.
3. SSL-Zertifikat für die Subdomain aktivieren.
4. Den **Inhalt** von `out/` (nicht den Ordner selbst) per SFTP in `/neu` hochladen, inklusive der versteckten Datei `.htaccess`.
   - SFTP-Zugang: STRATO → Hosting → SFTP/SSH. Programm z. B. FileZilla oder Cyberduck. Versteckte Dateien einblenden.
5. Die Seite muss im Wurzelverzeichnis einer (Sub-)Domain liegen. In einem Unterordner wie `ausdauer-shop.de/neu/` funktionieren Links und Bilder nicht.

## 3. Livegang auf ausdauer.shop
Erst wenn die Shopify-Kasse auf `checkout.ausdauer.shop` umgezogen ist (PROJ-10, Abschnitt „Domains“):
1. `ausdauer.shop` und `www.ausdauer.shop` bei STRATO auf das Webspace-Verzeichnis der neuen Seite zeigen lassen.
2. `ausdauer-shop.de` per 301 auf `https://ausdauer.shop` weiterleiten (STRATO-Domainverwaltung). Die alten Contao-Pfade fängt die `.htaccess` ab.

## 4. Updates
Bei jeder Änderung `npm run build` ausführen und `out/` erneut hochladen. Alte Dateien in `_next/` können liegen bleiben oder vorher gelöscht werden.

## Was die `.htaccess` macht (`src/lib/static-hosting.ts`)
- HTTPS-Zwang und Sicherheits-Header (X-Frame-Options, nosniff, Referrer-Policy, HSTS)
- 301-Weiterleitungen der alten Contao-URLs, z. B. `/events` → `/community/#app`
- Eigene 404-Seite, Cache für Build-Dateien, Kompression

Änderungen an Weiterleitungen nur in `src/lib/static-hosting.ts` vornehmen, nicht direkt in `out/.htaccess`.
