# AUSDAUER TEAMWEAR – Logo- und Textil-Dateien

Textildruck für Vereine und Firmen (Flex, DTF), Ausstattung über JAKO. Untermarke nach dem Bauplan von Run Academy und AUSDAUER CUP: ∞-Plakette, Name und Claim. Erzeugt mit `npm run brand:subbrands`, PDFs mit `npm run brand:teamwear-pdf`. Alle Schriften sind in Pfade umgewandelt.

## Untermarke (Print, Web, Hangtag, Fahrzeug)
| Datei | Einsatz |
|---|---|
| `ausdauer-teamwear-*.svg` | Standard mit Claim „Bedruckt in Betzdorf“ |
| `ausdauer-teamwear-gestapelt-*.svg` | Hangtag, Verpackung, Hochformat |
| `ausdauer-teamwear-icon*.svg` | ∞-Plakette allein |

## Textil-Marken (auf Vereins- und Firmenkleidung)
**Grundregel:** Das Original-Logo bleibt immer komplett, das ∞ steht vor dem Schriftzug. Wo es zu klein würde, steht die Plakette allein.

| Datei | Mindestbreite | Ideal | Einsatz |
|---|---|---|---|
| `textil-aermel-plakette-*` | 25 mm | 30–40 mm | Ärmel, Hosenbein, Kappe, Stutzen |
| `textil-aermel-badge-*` | 30 mm | 35–45 mm | Ärmel: Plakette mit TEAMWEAR – zeigt, wer das Trikot gemacht hat |
| `textil-logo-*` | 60 mm | 70–90 mm | Original-Logo unverändert: Nacken, Rücken unten, längs am Langarm/Hosenbein |
| `textil-innendruck-*` | 40 mm | 50 mm | Innen im Nacken statt Etikett, nur eigene Produktion |

- `aermel-plakette-1c-weiss`, `-1c-schwarz`, `-1c-rot`: **Flex**. Ein einziger Pfad mit ausgespartem ∞, plotterfertig. Das Spiegeln übernimmt die Plottersoftware.
- `aermel-plakette-farbig`: **DTF**, rote Plakette mit weißem ∞, für helle und dunkle Textilien.
- `aermel-badge-1c-*`: Flex. `aermel-badge-farbig` / `-negativ`: DTF auf hellen bzw. dunklen Textilien.
- `logo-*`, `innendruck-*`: 1-farbig für Flex oder DTF.
- `pdf/`: alle Marken als Vektor-PDF in empfohlener Breite.

Regeln:
- Linien im Flex mind. 1 mm.
- Rote Plakette nie auf rotem Textil.
- Auf dem Vereinstrikot außen kein Claim und kein Innendruck. „TEAMWEAR“ nur im Ärmel-Badge.
- Das Logo nie auseinandernehmen.

Lesbarkeitstest zum Ausdrucken: `public/brand/vorlagen-export/teamwear-testbogen.pdf`.
