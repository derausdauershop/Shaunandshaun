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
- Claim zur Wahl:
  - A „Bedruckt in Betzdorf“ (Standard)
  - B „Für Vereine & Firmen“
- Auf Vereinskleidung steht **AUSDAUER** als Absender, nicht „Teamwear“. Dafür gibt es eigene Textil-Marken.
- Das Ausdauer-Logo bleibt unverändert. Die Textil-Marken verwenden nur seine Originalteile, also das ∞ in der Plakette und die Original-Buchstaben, neu angeordnet.

## Textil-Marken
| Marke | Mindestbreite | Ideal | Einsatz |
|---|---|---|---|
| Ärmel-Plakette | 25 mm | 30–40 mm | Ärmel, Hosenbein, Kappe, Stutzen |
| Ärmel vertikal (Plakette über Original-Schriftzug) | 40 mm | 50–60 mm | Ärmel, Hoodie, Jacke |
| Nacken-Print (Original-Logo + „TEAMWEAR · BETZDORF“) | 60 mm | 70–80 mm | Nacken, Rücken unten, Innendruck |

Farbvarianten:
- 1-farbig für Flex: weiß, schwarz, rot. Jeweils ein Pfad mit ausgespartem ∞, plotterfertig.
- `farbig` für DTF auf hellen Textilien.
- `negativ` für DTF auf dunklen Textilien.

## Acceptance Criteria
- [x] Untermarke horizontal und gestapelt in 4 Farbstellungen, Icon, Claim-Alternative (SVG, Schrift in Pfaden).
- [x] Textil-Marken in 5 Farbvarianten, 1-farbig als ein Knockout-Pfad.
- [x] Vektor-PDFs der Textil-Marken in empfohlener Breite.
- [x] Lesbarkeitstest A4 zum 1:1-Druck.
- [x] Brand-Guide-Seite `/brand/teamwear`, verlinkt in der Markenarchitektur.
- [ ] Freigabe durch den Kunden: Logo, Claim A oder B, Test am echten Shirt.

## Implementation Notes (2026-10-16)
- `scripts/generate-subbrand-logos.mts`: TEAMWEAR als dritte Untermarke.
  - Die Textil-Marken entstehen aus den Originalpfaden von `public/brand/logos/ausdauer.svg` (Pfad 0 = ∞, Pfade 1–8 = Buchstaben).
  - Transformation mit `svgpath`. Knockout über `fill-rule="evenodd"`.
- `scripts/export-teamwear-pdf.mts` (`npm run brand:teamwear-pdf`) erzeugt `public/brand/teamwear/pdf/*.pdf`.
- `src/lib/brand/teamwear.ts`: Dateipfade, Mindestgrößen, Vereinsfarben.
- `src/app/brand/teamwear/page.tsx`: Problem, Untermarke, Textil-Marken, Platzierung auf dem Trikot, Dateien.
- `src/components/templates/teamwear.tsx`: Lesbarkeitstest A4 (Registry-ID `teamwear-testbogen`), Export unter `public/brand/vorlagen-export/teamwear-testbogen.pdf`.
- Vereinswappen für PROJ-13 abgelegt unter `public/images/vereine/*.png` (aus den gelieferten PDF/SVG, freigestellt, 480 px).
