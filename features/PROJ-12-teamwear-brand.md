# PROJ-12: AUSDAUER TEAMWEAR – Logo & Textil-Marken

**Status:** In Progress · **Priorität:** P1 · **Erstellt:** 2026-10-16 · **Abhängigkeiten:** PROJ-1, PROJ-3

## Ausgangslage
- AUSDAUER betreibt eine kleine Textildruckerei für Firmen und Sportvereine (Flextransfer, DTF).
- Die Ausstattung läuft über JAKO. Referenzen: SG 06 Betzdorf, TuS Weitefeld, JSG Weitefeld-Neunkhausen, VfB Niederdreisbach.
- Vereine bestellen über einen eigenen Bestellshop (Beta).
- Arbeitstitel war „Ausdauer Custom Teamwear“.
- Problem: Das lange, flache AUSDAUER-Logo (ca. 7 : 1) ist auf dem Ärmel schlecht lesbar.

## Entscheidungen
- Name: **AUSDAUER TEAMWEAR** (Kunde, 2026-10-16).
- Untermarke nach dem Bauplan von Run Academy und CUP: rote ∞-Plakette, Name, Claim.
- Claim: **„Bedruckt in Betzdorf“** (Kunde, 2026-10-16). „Made in Betzdorf“ wurde verworfen: Die Ware kommt von JAKO, in Betzdorf wird veredelt. Eine Herkunftsangabe „Made in“ wäre irreführend.
- Auf Vereinskleidung steht **AUSDAUER** als Absender, nicht „Teamwear“. Dafür gibt es eigene Textil-Marken.
- **Das Original-Logo wird nie getrennt** (Kunde, 2026-10-16): Das ∞ bleibt vor dem Schriftzug. Die Variante „Ärmel vertikal“ (Plakette über dem Schriftzug ohne ∞) ist verworfen. Auf dem Ärmel steht die Plakette allein, das komplette Logo kommt dorthin, wo mindestens 60 mm Platz sind.
- JAKO: offizieller **JAKO Teamwear Partner**. Das Logo darf genannt werden, die Originaldatei kommt vom Kunden.

## Textil-Marken
| Marke | Mindestbreite | Ideal | Einsatz |
|---|---|---|---|
| Ärmel-Plakette | 25 mm | 30–40 mm | Ärmel, Hosenbein, Kappe, Stutzen |
| Original-Logo (unverändert) | 60 mm | 70–90 mm | Nacken, Rücken unten, längs am Langarm/Hosenbein |
| Innendruck (Logo + „TEAMWEAR · BETZDORF“) | 40 mm | 50 mm | innen statt Etikett, nur eigene Produktion |

Farbvarianten:
- Plakette 1-farbig (weiß/schwarz/rot) als plotterfertiger Knockout-Pfad für Flex.
- Plakette `farbig` für DTF.
- Logo und Innendruck 1-farbig.

## Acceptance Criteria
- [x] Untermarke horizontal und gestapelt in 4 Farbstellungen, Icon (SVG, Schrift in Pfaden).
- [x] Textil-Marken: Plakette (Flex 1-farbig als Knockout-Pfad, DTF farbig), Original-Logo und Innendruck 1-farbig.
- [x] Vektor-PDFs der Textil-Marken in empfohlener Breite.
- [x] Lesbarkeitstest A4 zum 1:1-Druck.
- [x] Brand-Guide-Seite `/brand/teamwear`, verlinkt in der Markenarchitektur.
- [x] Claim gewählt (A).
- [ ] Freigabe durch den Kunden nach Test am echten Shirt.

## Implementation Notes (2026-10-16)
- `scripts/generate-subbrand-logos.mts`: TEAMWEAR als dritte Untermarke.
  - Die Textil-Marken entstehen aus den Originalpfaden von `public/brand/logos/ausdauer.svg` (Pfad 0 = ∞, Pfade 1–8 = Buchstaben).
  - Transformation mit `svgpath`. Knockout über `fill-rule="evenodd"`.
- `scripts/export-teamwear-pdf.mts` (`npm run brand:teamwear-pdf`) erzeugt `public/brand/teamwear/pdf/*.pdf`.
- `src/lib/brand/teamwear.ts`: Dateipfade, Mindestgrößen, Vereinsfarben.
- `src/app/brand/teamwear/page.tsx`: Problem, Untermarke, Textil-Marken, Platzierung auf dem Trikot, Dateien.
- `src/components/templates/teamwear.tsx`: Lesbarkeitstest A4 (Registry-ID `teamwear-testbogen`), Export unter `public/brand/vorlagen-export/teamwear-testbogen.pdf`.
- Vereinswappen für PROJ-13 abgelegt unter `public/images/vereine/*.png` (aus den gelieferten PDF/SVG, freigestellt, 480 px).
- Änderung 2026-10-16: „Ärmel vertikal“ und die Claim-Alternative entfernt. Neu sind `textil-logo-*` (Original-Logo) und `textil-innendruck-*` (vorher „Nacken-Print“, jetzt nur innen).
