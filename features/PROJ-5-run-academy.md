# PROJ-5: Run Academy (Web)

**Status:** In Progress · **Priorität:** P0 · **Erstellt:** 2026-10-15 · **Abhängigkeiten:** PROJ-3, PROJ-4

## User Stories
- Als Einsteiger:in möchte ich den passenden Kurs finden und mich direkt anmelden.

## Acceptance Criteria
- `/run-academy` mit Kursübersicht (Einsteiger-Laufkurs 130 €, 10 km/Halbmarathon, Lauf-ABC/Technik) und Detailseiten `/run-academy/[slug]`.
- **Angenommen** ein Kurs hat eine Shopify-URL, **dann** zeigt der CTA „Jetzt anmelden“; sonst „Interesse melden“ (Mail).
- **Angenommen** ein Kurs ist ausgebucht/ohne Termin, **dann** wird das sichtbar gekennzeichnet.

## Open Questions
- [ ] Preise/Termine für 10 km/HM und Lauf-ABC, Shopify-Produkt-URLs.

## Implementation Notes (2026-10-15)
- `/run-academy` + `/run-academy/[slug]`; Einsteiger-Laufkurs mit Originalinhalten aus Shopify, Anmeldung über Shopify-Produktlink.
- 10 km/HM und Lauf-ABC als „In Planung“ mit „Interesse melden“ (E-Mail); Inhalte dort sind Vorschläge.

## Änderungen 2026-10-16
- Einsteiger-Laufkurs: Status `demnaechst`, die Startnummer zeigt „Frühjahr / Kursstart“ statt des Preises. Das gilt für die Kursübersicht, die Kursseite und die Startseite.
- Anmelde-Link zu Shopify entfernt. Die Kursseite zeigt stattdessen die Eckdaten vom Flyer: Von 0 auf 5 km, 8 Wochen, 1× pro Woche mit Coach, Trainingsplan für zu Hause.
- Dazu der Hinweis „Der nächste Kurs startet im Frühjahr“ und „Interesse melden“ per Mail.
- Flyer (PROJ-8) und Social-Post (PROJ-9) zeigen noch 130 € und „Jetzt anmelden“. Sie werden angepasst, sobald Termine und Preis für das Frühjahr feststehen.
