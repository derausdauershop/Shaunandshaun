# Product Requirements Document – Rebranding AUSDAUER

## Vision
AUSDAUER (Marke der Der Ausdauer-Shop GmbH & Co. KG, Betzdorf & Siegen, seit 1986) bekommt ein einheitliches,
zeitgemäßes Markenbild: Expertise als Fundament, Community als sichtbare Energie. Leitidee: **„Ausdauer ist eine Strecke.“**
Das Rebranding umfasst Design-System (Schriften, Farben, Grafik-Kit), einen Live-Brand-Guide, die neue Webseite
(Next.js, Shop bleibt Shopify), die neu gestaltete Run Academy, Print- und Social-Vorlagen sowie die Geschäftsausstattung.

## Target Users
- **Einsteiger:innen** – wollen loslegen, brauchen Orientierung, Laufkurs, ersten richtigen Schuh.
- **Ambitionierte Läufer:innen** – Wettkampf, 10 km bis Marathon, Trail; erwarten Fachkompetenz (Laufanalyse, Einlagen).
- **Junge urbane Runner** – Run-Club-Kultur, Instagram, Crown Town Runners (Siegen).
- **Outdoor & Familien** – Wandern/Outdoor-Abteilung in Betzdorf.
- **Intern:** Team, Druckerei/Agentur, die mit Brand Guide und Vorlagen arbeiten.

## Brand Briefing (Interview Okt. 2026)
| Thema | Entscheidung |
|---|---|
| Name | **AUSDAUER** („Ausdauer-Shop“ nur Domain/Rechtliches) |
| Persönlichkeit | Expertise + Community |
| Logo | Ausdauer-Logo (∞ + AUSDAUER) bleibt unverändert; das ∞ wird zur Klammer der Markenfamilie |
| Farben | Logofarben Rot `#E30110` + Schwarz `#222222`; Signalfarbe Volt `#CAFF42` (aus dem bisherigen Academy-Logo) für Academy & Community; Cyan `#29B9D2` nur Siegen |
| Architektur | Dachmarke AUSDAUER; Untermarken Run Academy, AUSDAUER CUP und AUSDAUER TEAMWEAR (gleicher Bauplan); Absolute Run Ausdauer (Siegen), Crown Town Runners (Run Club Siegen) und Westerwälder Firmenlauf behalten ihr eigenes Logo und werden gekennzeichnet |
| Schriften | sportlich-kondensiert: Barlow Condensed / Barlow / JetBrains Mono ersetzen Proxima Nova |
| Run Academy | Logo neu gestalten |
| AUSDAUER CUP | Laufserie seit 1989 (8 Vereinsläufe + Abschlussfeier, Siegerland/Südsauerland), Claim „Seit 1989“; erstmals einheitliches Logo als Untermarke nach dem Bauplan der Run Academy (rote ∞-Plakette + Name + Claim), dazu Serienleiste und Siegel |
| Ansprache | Du |
| Print | Entwürfe/Previews; Reinzeichnung durch Druckerei/Agentur |

## Core Features (Roadmap)

| Priority | Feature | Status |
|----------|---------|--------|
| P0 | PROJ-1 Design-System & Tokens | In Progress (Basis freigegeben) |
| P0 | PROJ-2 Brand Guide (live) | In Progress |
| P0 | PROJ-3 Grafik-Kit & Run-Academy-Logo | In Progress |
| P0 | PROJ-4 Webseite Kernseiten | In Progress |
| P0 | PROJ-5 Run Academy (Web) | In Progress |
| P1 | PROJ-6 Community & Events | In Progress |
| P1 | PROJ-7 Magazin & Jobs | In Progress |
| P1 | PROJ-8 Print-Vorlagen (Flyer, Plakat, Geschäftsausstattung) | In Progress |
| P1 | PROJ-9 Social-Media-Vorlagen | In Progress |
| P0 | PROJ-10 Shop-Integration (Headless Shopify) & Domain ausdauer.shop | Architected |
| P0 | PROJ-11 Gutscheine mit QR – Shopify-Gutschein + POS, später WaWi-Kasse | In Progress |
| P1 | PROJ-12 AUSDAUER TEAMWEAR – Logo & Textil-Marken | In Progress |
| P1 | PROJ-13 Teamwear-Bereich Webseite & Wegfall Events (Events in der Absolute Run Community App) | In Progress |

## Success Metrics
- Einheitlicher Auftritt über alle Touchpoints (Brand-Guide-Abnahme durch GF).
- Run-Academy-Anmeldungen +30 % im ersten Halbjahr nach Launch.
- Webseite: Lighthouse ≥ 90 (Performance, A11y, SEO), mobile first.
- Konsistente NAP-Daten (Name, Adresse, Öffnungszeiten) auf Webseite, Google und Verzeichnissen.

## Constraints
- Ausdauer-Logo, Absolute-Run-Logo (Sport-2000-Format), Crown-Town-Runners- und Firmenlauf-Logo dürfen nicht verändert werden.
- Fonts müssen frei für Web + Print lizenziert sein (OFL) und DSGVO-konform selbst gehostet werden.
- Shopify bleibt Backend für Bezahlung von Gutscheinen/Kursen (Headless, Kasse unter checkout.ausdauer.shop); Hauptdomain wird ausdauer.shop. Domains liegen bei STRATO.
- Gutscheine bleiben vorerst native Shopify-Geschenkgutscheine, Einlösung in Shopify POS (iPads); Anbindung der eigenen WaWi-Kasse später (PROJ-11, Phase 2).
- Kleines Team → Inhalte als einfach pflegbare Datendateien.

## Non-Goals
- Kein neues Ausdauer-Logo, keine Änderung am Absolute-Run-Branding.
- Keine Shopify-Theme-Entwicklung, kein eigener Checkout (Bezahlung bleibt in der Shopify-Kasse).
- Keine druckfertige Reinzeichnung (nur Entwürfe/Previews).
- Kein Login/Kundenkonto in dieser Version.
