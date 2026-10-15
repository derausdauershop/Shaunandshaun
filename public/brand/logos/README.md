# Original-Logos hier ablegen

Die Logos werden **nicht verändert**, nur referenziert. Bitte genau diese Dateinamen verwenden (SVG bevorzugt, sonst PNG/WebP mit transparentem Hintergrund, min. 2000 px breit):

| Datei | Inhalt |
|---|---|
| `ausdauer.svg` | AUSDAUER-Logo, Standardversion (für helle Hintergründe) |
| `ausdauer-negativ.svg` | AUSDAUER-Logo, Negativversion für dunkle Hintergründe (optional – sonst wird invertiert) |
| `absolute-run-ausdauer.svg` | Logo „Absolute Run Ausdauer“ (Siegen) |
| `run-academy-alt.svg` | Bisheriges Run-Academy-Logo (optional, nur zur Referenz) |

Sobald `ausdauer.svg` vorliegt, werden die Logofarben ausgelesen und als `--brand` in `src/app/globals.css` sowie in `brand/tokens.json` eingetragen. Danach wird die finale Signalfarbe festgelegt.
