# AUSDAUER Brand Guide

> Textfassung des Live-Brand-Guides (`/brand`, `/brand/cup`, `/brand/teamwear`), Stand 2026-10-16.
> Für andere Sessions, Agenturen und Druckereien. Maßgeblich bleiben die Quell-Dateien:
> Farben/Schriften `src/lib/brand/tokens.ts` + `src/app/globals.css`, Logos `public/brand/`, Abschnitte `src/app/brand/_sections/`.

---

## 1. Marke auf einen Blick
| | |
|---|---|
| **Name** | **AUSDAUER** (Versalien). „Ausdauer-Shop“ nur in Domain und Impressum. Rechtlich: Der Ausdauer-Shop GmbH & Co. KG |
| **Seit** | 1986 · Betzdorf (Flagship) & Siegen |
| **Leitidee** | „Ausdauer ist eine Strecke.“ – Expertise als Fundament, Community als Energie |
| **Signatur** | „Wir leben Sport.“ – Absender unter dem Logo oder am Ende |
| **Kampagnenzeile** | „Dein nächster Kilometer.“ – Aktionen, Academy, Social |
| **Ansprache** | Du |
| **Domain (künftig)** | ausdauer.shop |

### Werte
1. **Kompetent** – Laufanalyse, Einlagenbau, ehrliche Beratung. Wir wissen, wovon wir reden, und erklären es verständlich.
2. **Gemeinsam** – Run Clubs, Firmenlauf, Academy. Laufen ist allein gut und zusammen besser.
3. **Nahbar** – Familienunternehmen aus Westerwald und Siegerland. Wir kennen unsere Strecken und unsere Leute.
4. **In Bewegung** – neugierig auf neue Produkte, Formate und Ziele. Stillstand ist keine Disziplin.

---

## 2. Markenarchitektur
**Eine Dachmarke, ein Zeichen, klare Rollen.** AUSDAUER führt. Das ∞ aus dem Logo ist die Klammer der Familie.

```
                         AUSDAUER (Dachmarke, ∞ + Schriftzug)
        ┌──────────────────────┼───────────────────────────┐
     Stores              Untermarken (gleicher Bauplan)     Community (eigene Logos)
  Betzdorf – Flagship    Run Academy   (Volt)              Crown Town Runners – Run Club Siegen
  Siegen – Absolute Run  AUSDAUER CUP  (Rot)                 → „powered by AUSDAUER“
   Ausdauer (Sport-2000- AUSDAUER TEAMWEAR (Rot)           Westerwälder Firmenlauf – Betzdorf
   Format, eigenes Logo)                                     → „präsentiert von AUSDAUER“
```
- **Betzdorf:** Wilhelmstraße 16 · Tel. 02741 4372 · Running, Laufanalyse, Einlagen, Outdoor.
- **Siegen:** Koblenzer Straße 40 · Tel. 0271 77005090 · reines Running. Logo „Absolute Run Ausdauer“ (Sport-2000-Format).
- **Untermarken-Bauplan:** rote bzw. Volt-∞-Plakette (5° geneigt) + Name in Barlow Condensed 900 Italic + Claim in JetBrains Mono.
- **Marken mit eigenem Logo** (Absolute Run, Crown Town Runners, Westerwälder Firmenlauf) werden **gekennzeichnet, nie angepasst**.
- Events laufen in der **Absolute Run Community App**, nicht auf der Webseite.

---

## 3. Logo
**∞ + AUSDAUER, 5° geneigt, Rot oder Schwarz – unverändert aus dem bestehenden Logo-Manual.** Neu sind nur die Einsatzregeln.

| Variante | Einsatz | Datei |
|---|---|---|
| Rot auf Weiß | Standard | `public/brand/logos/ausdauer-rot.svg` (+ `.png`) |
| Schwarz auf Paper | ruhige Medien, Einfarbdruck | `ausdauer.svg` |
| Weiß auf Ink | dunkle Flächen | `ausdauer-negativ.svg` |
| Weiß auf Rot | Aktionen | `ausdauer-negativ.svg` |
| ∞ allein | Avatar, Stempel, Shirt-Detail, Kontur-Supergrafik – wenn der Absender schon klar ist | `ausdauer-symbol.svg` |

- **Schutzraum:** rundum mindestens die Höhe des ∞.
- **Mindestgröße:** 30 mm Breite im Druck, 140 px digital. (Auf Textil: mind. 60 mm, sonst Plakette – siehe TEAMWEAR.)
- **Position:** oben links oder unten links.
- ✅ Nur Original-Dateien aus `public/brand/logos/` verwenden.
- ✅ Auf Fotos nur auf ruhigen Bildbereichen oder mit Ink-Verlauf darunter.
- ❌ Rotes Logo auf Ink oder Volt (zu wenig Kontrast bzw. flimmert).
- ❌ Verzerren, Neigung ändern, umfärben, Effekte (Schatten, Kontur), auseinandernehmen.
- ❌ Logo auf Höhenlinien oder Pace-Lines legen.

---

## 4. Farben
**Rot & Schwarz. Plus Volt für Bewegung.** Die Logofarben bleiben das Fundament, Paper gibt Ruhe. Volt stammt aus dem bisherigen Run-Academy-Logo. Cyan gehört Siegen.

### Grundfarben
| Name | Rolle | HEX | RGB | CMYK | Pantone | CSS-Token |
|---|---|---|---|---|---|---|
| **AUSDAUER Rot** | Logofarbe · Marke, Aktion, CTA | `#E30110` | 227 1 16 | 0 100 100 0 | P 48-8 C | `brand` |
| **Ink** | Logofarbe · Text, Flächen | `#222222` | 34 34 34 | 0 0 0 100 | Neutral Black C | `ink` |
| **Paper** | Hintergrund, Ruhe | `#F4F2ED` | 244 242 237 | 3 3 6 0 | ≈ Warm Gray 1 C (20 %) | `paper` |
| **Stone** | Linien, Höhenlinien, Deko (nicht für Text) | `#8C8A84` | 140 138 132 | 0 2 8 52 | ≈ Warm Gray 8 C | `stone` |
| **Stone Dark** | Sekundärtext auf Paper | `#5E5C57` | 94 92 87 | 0 2 7 70 | ≈ 405 C | `stone-dark` |

### Akzente mit festem Revier (nie für die Dachmarke allein)
| Name | Rolle | HEX | RGB | CMYK | Pantone | CSS-Token |
|---|---|---|---|---|---|---|
| **Volt** | Signalfarbe · Run Academy, Community, Aktivierung | `#CAFF42` | 202 255 66 | 25 0 85 0 | ≈ 380 C · Neon 802 C | `signal` |
| **Siegen-Cyan** | nur Siegen-Kontext (Absolute Run, Crown Town Runners) | `#29B9D2` | 41 185 210 | 70 0 15 0 | ≈ 3125 C | `partner` |

CMYK/Pantone sind Näherungen – die Druckerei muss sie per Proof prüfen.

### Mengenverhältnis
**Paper 55 % · Ink 30 % · Rot 10 % · Volt 5 %**
- AUSDAUER-Medien: Rot ist der Akzent, Volt höchstens als kleiner Punkt.
- Run Academy & Community: Volt darf bis zu 50 % tragen, Rot nur im Logo.
- **Nie** Rot und Volt als gleich große Flächen nebeneinander (flimmert).

### Kontraste (WCAG 2.1)
| Kombination | Kontrast | Einsatz |
|---|---|---|
| Ink auf Paper / Paper auf Ink | 14.2:1 | Text AAA |
| Ink auf Volt / Volt auf Ink | 13.6:1 | Text AAA |
| Ink auf Cyan | 6.8:1 | Text AA |
| Stone Dark auf Paper | 6.0:1 | Text AA |
| Weiß auf Rot / Rot auf Weiß | 4.9:1 | Text AA |
| Rot auf Paper | 4.4:1 | nur große Schrift / Flächen |
| Rot auf Ink | 3.2:1 | nur große Schrift / Flächen |
| Volt auf Paper | 1.0:1 | **nicht für Text** |

---

## 5. Typografie
**Kondensiert, schnell, gut lesbar.** Ersetzt die bisherige Proxima Nova. Alle Schriften SIL OFL 1.1 (frei für Print & Web), im Web DSGVO-konform selbst gehostet.

| Rolle | Schrift | Schnitte |
|---|---|---|
| Headline | **Barlow Condensed** | 800 / 900, Versalien, optional kursiv |
| Fließtext | **Barlow** | 400 / 500 / 600 |
| Daten & Zahlen | **JetBrains Mono** | 400 / 600 |

### Skala
| Stufe | Spezifikation | Beispiel |
|---|---|---|
| Display | Barlow Condensed 900 italic · 96/82 | BESTZEIT. |
| H1 | Barlow Condensed 800 · 64/58 | DEIN NÄCHSTER KILOMETER |
| H2 | Barlow Condensed 800 · 40/38 | LAUFANALYSE IN 30 MINUTEN |
| H3 | Barlow Condensed 700 · 24/28 | EINSTEIGER-LAUFKURS |
| Lead | Barlow 400 · 20/30 | In acht Wochen von null auf fünf Kilometer … |
| Body | Barlow 400 · 16/24 | Wir schauen dir beim Laufen auf die Füße … |
| Daten | JetBrains Mono 600 · 14/20 · Laufweite +15 %, Versalien | PACE 5:12 /KM · KADENZ 172 · DO 18:30 |

**Regeln:** Headlines immer in Versalien, max. 3 Zeilen, Zeilenabstand eng (85–95 %). Kursiv nur für das eine Wort, das Tempo braucht (z. B. „Dein nächster *Kilometer.*“ – das Wort oft in Rot). Zahlen (Preise, Zeiten, Pace) immer tabellarisch in Mono oder Condensed.

---

## 6. Grafik-Kit
**Sechs Elemente. Maximal zwei pro Medium, mit Abstand zum Logo.** Alle erzählen von Strecke, Tempo und Wissen.

| Element | Beschreibung | Dateien |
|---|---|---|
| **∞-Strecke** | Das ∞ als Kontur – Endlos-Laufstrecke. Groß und angeschnitten als Supergrafik | `public/brand/elements/infinity-track-{red,volt,ink}.svg` |
| **Höhenlinien** | Topografie Westerwald & Siegerland. Ruhige Textur: Stone auf Paper/Ink, Volt nur in Academy-Medien (20–30 % Deckkraft) | `topo-{ink,volt}.svg` |
| **Pace-Lines** | Diagonale Tempo-Streifen an Bildkanten, hinter Headlines, im Video | `pace-lines-{ink,volt}.svg` |
| **Startnummer** | Badge für Preise, Kursstarts, Aktionen, Event-Daten. Immer mit vier Sicherheitsnadel-Punkten | Komponente `StartNumber` |
| **Kilometer-Marker** | Nummeriert Abschnitte/Schritte („KM 01“). Balken Rot (AUSDAUER), Volt (Academy), Cyan (Siegen) | Komponente `KmMarker` |
| **Daten-Overlay** | Laufanalyse-Look: Werte in Mono, Eckwinkel als Rahmen, auch über Fotos | Komponente `DataOverlay` |

Komponenten liegen in `src/components/brand/`.

---

## 7. Siegen & Co-Branding
**Absolute Run Ausdauer: eingebettet, nicht angepasst.** Das Siegener Logo folgt dem Sport-2000-Format (dünne Geometrie, Cyan), trägt aber unser ∞. Der Bruch wird durch Rahmen gelöst, nicht durch Anpassung.
- ✅ Partner-Logo immer auf eigenem weißen Feld (funktioniert nur auf hellem Grund).
- ✅ Immer mit Absenderzeile „ein AUSDAUER Store · Siegen“.
- ✅ Cyan nur im Siegen-Kontext: Store, Crown Town Runners, Siegen-Flyer.
- ❌ Umfärben, in AUSDAUER-Schriften nachbauen, auf Ink/Rot/Volt legen.
- ❌ Größer als das AUSDAUER-Logo auf gemeinsamen Medien.

**Standortleiste** (Medien für beide Stores: Flyer, Plakate, Gutscheine, Footer): gleich hohe weiße Felder, AUSDAUER links mit „Betzdorf · Wilhelmstraße 16 · 02741 4372“, das ∞ als Scharnier in der Mitte, rechts Absolute Run mit „Siegen · Koblenzer Straße 40 · 0271 77005090“.

**Crown Town Runners:** Community Run donnerstags 18:30 ab Store Siegen, Absender „powered by AUSDAUER“. **Westerwälder Firmenlauf:** Absender „präsentiert von AUSDAUER“ (Auflagennummer im Logo ändert sich jährlich).

---

## 8. Untermarke Run Academy (Volt)
**Gleiche Idee, neue Form.** Bleibt: das ∞, Volt, Claim **„Besser. Laufen. Lernen.“** Neu: ∞ in der 5° geneigten Startnummern-Plakette, Name „RUN ACADEMY“ in Barlow Condensed 900 Italic.
- Formen: horizontal, gestapelt, Icon (Plakette allein: Avatar, Favicon). Extern mit „by AUSDAUER“.
- Farbstellungen: `farbig` (auf Weiß/Paper), `negativ` (auf Ink), `schwarz` (Einfarbdruck), `weiss` (auf Ink/Fotos); zusätzlich auf Volt-Fläche.
- ✅ Academy-Medien tragen Volt – bis zu 50 % der Fläche.
- ✅ Unter 24 px nur die Plakette.
- ✅ „by AUSDAUER“ in externer Kommunikation (Presse, Partner, Vereine).
- ❌ Rot in Academy-Medien – Rot gehört dem CUP und dem Absender-Logo.
- Kurse: 01 Einsteiger-Laufkurs (0 → 5 km in 8 Wochen, 130 €, **Kursstart Frühjahr**), 02 10 km / Halbmarathon, 03 Lauf-ABC & Technik.
- Dateien: `public/brand/run-academy/run-academy[-gestapelt|-icon]-{farbig,negativ,schwarz,weiss}.svg`; altes Logo nur als Referenz: `logos/run-academy-alt.svg`.

---

## 9. Untermarke AUSDAUER CUP (Rot)
Laufserie seit 1989 (8 Vereinsläufe + Abschlussfeier, Siegerland/Südsauerland). Erstmals einheitliches Logo, **genau der Bauplan der Run Academy** – nur die Farbe unterscheidet: Volt fürs Lernen, Rot für den Wettkampf. Claim **„Seit 1989“**.

| Form | Einsatz | Mindestgröße |
|---|---|---|
| `ausdauer-cup-serie-*` | Serienlogo mit „Seit 1989 · Saison …“ + Serienleiste (8 Läufe + rotes Finale) – Urkunden, RaceResult, Web, Flyer | 60 mm |
| `ausdauer-cup-*` | Standard (Plakette + Name + Claim) – Banner, Startnummern, Web | 35 mm |
| `ausdauer-cup-gestapelt-*` | Shirt-Rücken, Hochformate, Beachflag | – |
| `ausdauer-cup-siegel-*` | Rundes Siegel mit den acht Orten und Auflage – Urkunde, Brust-Logo, Medaille | 35 mm (darunter `siegel-claim`) |
| `ausdauer-cup-icon*` | Plakette allein – Avatar, RaceResult-App-Icon, Favicon, Stempel | 8 mm |

- Farbstellungen: farbig auf Weiß, negativ auf Ink, Weiß auf Rot; Schwarz für Fax, Stempel, Einfarbdruck.
- ❌ Rote Plakette auf Rot, Logo auf unruhigen Fotos, Cup in Volt oder Academy in Rot.
- **Sponsoren:** nur in der Partnerleiste unten, max. 6, gleich große Felder; Cup-Logo mind. doppelt so breit wie ein Feld; Sponsorlogos dürfen farbig bleiben (zu bunt → alle schwarz). Nie neben/über dem Cup-Logo.
- **Urkunden einzelner Läufe:** links Logo des ausrichtenden Vereins, rechts das Cup-Siegel. Der Cup führt oben, das Siegel bestätigt unten rechts.
- **Die Serienleiste zählt mit** (gelaufene Läufe gefüllt). Shirt: Brust klein (Siegel 8 cm), Rücken laut (gestapelt + alle Läufe der Saison).
- Weitere Anwendungen: RaceResult-Header 1200 × 240 px, Saisonübersicht Web, Instagram 4:5, Flyer A5 Saisonkalender, Bauzaunbanner 340 × 85 cm (Weiß auf Rot), Start-/Zielbogen 300 × 50 cm (negativ).
- Generator: `npm run brand:subbrands -- <Saison> <Läufe> <Auflage>`. Dateien: `public/brand/cup/`.

---

## 10. Untermarke AUSDAUER TEAMWEAR (Rot)
Textildruck für Vereine und Firmen (Flex, DTF) auf Teamwear von JAKO, erima und adidas. Claim **„Bedruckt in Betzdorf“**.

**Problem:** Das AUSDAUER-Logo ist ~7 : 1. Auf 50–60 mm Ärmel sind die Buchstaben nur ~6 mm hoch. **Lösung:** Auf den Ärmel kommt die Plakette, das komplette Logo dorthin, wo Platz ist.

| Textil-Marke | Mindestbreite | Ideal | Einsatz |
|---|---|---|---|
| Ärmel-Plakette (`textil-aermel-plakette-*`) | 25 mm | 30–40 mm | Ärmel, Hosenbein, Kappe, Stutzen |
| Ärmel-Badge (`textil-aermel-badge-*`) | 30 mm | 35–45 mm | Ärmel: Plakette mit „TEAMWEAR“ darunter |
| Original-Logo (`textil-logo-*`) | 60 mm | 70–90 mm | Nacken, Rücken unten, längs am Langarm/Hosenbein |
| Innendruck (`textil-innendruck-*`) | 40 mm | 50 mm | innen im Nacken statt Etikett, nur eigene Produktion |

- **Verfahren:** `1c-weiss/-schwarz/-rot` = Flex, ein Pfad mit ausgespartem ∞, plotterfertig (Spiegeln macht die Plottersoftware). `farbig` = DTF auf hellen und dunklen Textilien; `negativ` = DTF auf dunklen. Linien im Flex mind. 1 mm.
- **Platzierung:** Vereinswappen und Sponsor vorn, Herstellerlogo wie geliefert, AUSDAUER am linken Ärmel (Plakette 3–4 cm unter der Schulternaht, mittig auf der Ärmelachse) oder im Nacken (2 cm unter dem Kragen).
- Auf Vereinsfarben 1-farbig Weiß oder Schwarz (mehr Kontrast gewinnt). Rot nur auf Weiß, Grau oder Schwarz. Beispiele: Weiß → 1c-rot, Schwarz/Rot/Royalblau/Grün → 1c-weiss, Gelb → 1c-schwarz.
- ❌ Original-Logo unter 60 mm, auseinandergenommen oder ohne ∞ vor dem Schriftzug.
- ❌ Vereinswappen, Hersteller- oder Sponsorlogos umfärben oder mit der Plakette verbinden.
- ❌ Rote Plakette auf rotem Trikot. Claim oder Innendruck außen auf dem Vereinstrikot. „TEAMWEAR“ nur im Ärmel-Badge, nie als lose Zeile.
- Untermarke (Angebote, Web, Hangtag, Fahrzeug): `ausdauer-teamwear[-gestapelt|-icon]-*.svg`. Alle Dateien SVG + PDF (`pdf/`), Schrift in Pfaden. Lesbarkeits-Testbogen: `public/brand/vorlagen-export/teamwear-testbogen.pdf`.

---

## 11. Tonalität
**Wir reden wie beim Lauftreff.** Duzen, direkt, freundlich. Expertise durch Klarheit, nicht durch Fremdwörter. Community durch Einladungen, nicht durch Superlative.

| Prinzip | ✅ So | ❌ Nicht so |
|---|---|---|
| Du, auf Augenhöhe | „Komm vorbei, wir schauen uns deinen Laufstil an.“ | „Vereinbaren Sie einen Termin für eine Laufanalyse.“ |
| Fachlich, nicht fachchinesisch | „Dein Fuß knickt beim Aufsetzen leicht nach innen – das gleichen wir aus.“ | „Überpronation mit erhöhtem Rückfußwinkel festgestellt.“ |
| Motivierend, nicht marktschreierisch | „Fünf Kilometer? Schaffst du. Wir zeigen dir wie.“ | „MEGA-SALE!!! Nur heute!!!“ |
| Kurz & mit Tempo | „Donnerstag. 18:30. Koblenzer Straße. Lauf mit.“ | „Unser Lauftreff findet regelmäßig donnerstags statt, Treffpunkt ist …“ |

**Headline-Bank:** Dein nächster Kilometer. · Erst laufen. Dann kaufen. · Gemeinsam ist das neue schnell. · Wir schauen dir auf die Füße. · Westerwald-Höhenmeter inklusive. · Verschenk Kilometer. · Acht Läufe. Ein Finale.

---

## 12. Anwendung – drei Welten, ein System
| Welt | Farbe | Typische Medien |
|---|---|---|
| AUSDAUER (Stores, Laufanalyse, Gutscheine) | Rot-Akzent auf Paper/Ink | Flyer DIN lang Laufanalyse, Plakat A2, Gutschein, Geschäftsausstattung |
| Run Academy & Community | Volt (bis 50 %) auf Ink | Flyer A5 Academy, Social |
| Siegen / Crown Town Runners | Cyan, Partner-Logo auf Weiß | Flyer A5 Crown Town, Instagram „Do. 18:30. Lauf mit.“ |

**Fertige Vorlagen (Entwürfe, Reinzeichnung durch Druckerei):** `public/brand/vorlagen-export/` – Academy A5, CUP A5, Crown Town A5, Laufanalyse DL + Plakat A2, Gutschein, Briefbogen A4, Visitenkarte, E-Mail-Signatur, Social-Posts/Stories/Cover/Profilbild, Teamwear-Testbogen (jeweils PDF + PNG). Live-Ansicht: `/brand/vorlagen`. Gutschein-Mail und Gutschein-Seite für Shopify: `shopify/`.

---

## 13. Technik-Hinweise
- Tailwind-Tokens (HSL-Variablen in `src/app/globals.css`): `bg-brand`, `bg-ink`, `bg-paper`, `bg-stone`, `text-stone-dark`, `bg-signal`, `bg-partner`; Fonts `font-display` (Barlow Condensed), `font-sans` (Barlow), `font-mono` (JetBrains Mono); `--radius: 0.25rem` (kantig).
- Logos und Untermarken als React-Komponenten: `BrandLogo`, `InfinityMark`, `RunAcademyLogo`, `CupLogo`, `PartnerLogo`, `CrownTownLogo`, `FirmenlaufLogo` in `src/components/brand/`.
- Untermarken-Generator: `npm run brand:subbrands`; Vorlagen-Export: `npm run brand:templates`.
- Nicht verändern: Ausdauer-Logo, Absolute-Run-Logo, Crown-Town-Runners-Logo, Firmenlauf-Logo.
