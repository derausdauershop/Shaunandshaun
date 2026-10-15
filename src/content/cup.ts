/**
 * AUSDAUER CUP – season 2026 (38th edition) as published on ausdauer-shop.de.
 * The 2027 dates are not final yet; races are expected to take place again.
 */

export const CUP = {
  season: 2026,
  edition: 38,
  nextSeason: 2027,
  since: 1989,
  resultsUrl: "https://www.ausdauer57.de/",
  photosUrl: "https://www.laufen57.de/",
  standingsUrl: "https://www.bike-tec.com/results/2026/05_zw26.pdf",
} as const;

export interface CupRaceStart {
  time: string;
  name: string;
  fee?: string;
}

export interface CupRace {
  slug: string;
  no: number;
  name: string;
  place: string;
  /** ISO date of the 2026 race */
  date: string;
  venue: string;
  registrationUrl?: string;
  registrationNote?: string;
  course: string;
  starts: CupRaceStart[];
  notes: string[];
  provisional?: boolean;
}

export const CUP_RACES: CupRace[] = [
  {
    slug: "asdorflauf-wehbach",
    no: 1,
    name: "Asdorflauf",
    place: "Wehbach",
    date: "2026-01-24",
    venue: "Turnhalle Wehbach",
    registrationUrl: "https://my.raceresult.com/376783/",
    registrationNote: "Online-Meldung bis Freitag, 23.01.2026, 16 Uhr. Nachmeldung am Lauftag gegen 2 € Aufpreis.",
    course: "DLV-vermessene, schnelle Rundkurse ausschließlich auf asphaltierten Straßen. 1.000 m und Bambini als Wendestrecken.",
    starts: [
      { time: "14:00", name: "300 m Bambini", fee: "kostenlos" },
      { time: "14:05", name: "1.000 m Schüler", fee: "3 €" },
      { time: "14:15", name: "1.000 m Schülerinnen", fee: "3 €" },
      { time: "14:35", name: "10 km Hauptlauf (Jg. 2012 und älter)", fee: "10 €" },
      { time: "14:35", name: "5 km Jedermann, Jugend A/B (Jg. 2015 und älter)", fee: "7 €" },
      { time: "14:35", name: "2,5 km Fun-Lauf (Jg. 2017 und älter)", fee: "3 €" },
    ],
    notes: [
      "Startnummernausgabe, Umkleiden, Duschen und Siegerehrung mit Kaffee und Kuchen in der Turnhalle Wehbach.",
      "Während der Läufe darf der Parkplatz an der Turnhalle nicht an- und abgefahren werden.",
    ],
  },
  {
    slug: "foeschber-radweglauf",
    no: 2,
    name: "Föschber Radweglauf",
    place: "Niederfischbach",
    date: "2026-02-21",
    venue: "Ehemalige Grundschule, Konrad-Adenauer-Straße, Fischbacherhütte (Niederfischbach)",
    registrationUrl: "https://my.raceresult.com/381078/",
    registrationNote: "Nachmeldungen am Veranstaltungstag bis 13:30 Uhr gegen 2 € Gebühr.",
    course: "Flache, schnelle Wendepunktstrecke auf dem Radweg von Niederfischbach nach Oberasdorf. DLV-vermessen und bestenlistenfähig.",
    starts: [
      { time: "14:00", name: "300 m Bambinilauf", fee: "kostenlos" },
      { time: "14:05", name: "1.000 m Schüler (M8–M15)", fee: "3 €" },
      { time: "14:15", name: "1.000 m Schülerinnen (W8–W15)", fee: "3 €" },
      { time: "14:30", name: "10 km Hauptlauf (alle Klassen)", fee: "10 €" },
      { time: "14:35", name: "5 km Jedermann", fee: "7 €" },
    ],
    notes: ["Kaffee und Kuchen in der Halle.", "Parken auf dem Penny-Parkplatz ist nicht gestattet."],
  },
  {
    slug: "flecker-tunnellauf",
    no: 3,
    name: "Flecker Tunnellauf",
    place: "Freudenberg",
    date: "2026-05-02",
    venue: "Freibad Freudenberg",
    registrationUrl: "https://my.raceresult.com/385432/info",
    registrationNote: "Voranmeldung bis Freitag, 01.05.2026, 16 Uhr. Nachmeldung bis 45 Minuten vor dem Lauf gegen 2 € Aufpreis.",
    course: "Wendepunktstrecke auf dem Radweg vom Freibad-Parkplatz durch den Tunnel zum ehemaligen Wildenburger Bahnhof (alte Bahntrasse).",
    starts: [
      { time: "13:00", name: "300 m Bambinilauf", fee: "kostenlos" },
      { time: "13:05", name: "1.000 m Schüler", fee: "3 €" },
      { time: "13:15", name: "1.000 m Schülerinnen", fee: "3 €" },
      { time: "13:30", name: "10 km Hauptlauf (alle Klassen)", fee: "10 €" },
      { time: "13:35", name: "5 km Jedermann, Jugend A/B", fee: "7 €" },
    ],
    notes: ["Startnummernausgabe direkt am Freibad Freudenberg."],
  },
  {
    slug: "deuzer-sparkassen-pfingst-lauf",
    no: 4,
    name: "Deuzer Sparkassen Pfingst-Lauf",
    place: "Deuz",
    date: "2026-05-23",
    venue: "Deuzer Naturfreibad",
    registrationUrl: "https://my.raceresult.com/396130/",
    registrationNote: "Voranmeldung über RaceResult bis Freitag, 22.05.2026, 17 Uhr. Nachmeldung bis 30 Minuten vor dem Start gegen 2 €.",
    course: "Landschaftslauf mit Blick auf die Täler von Werthe und Sieg – asphaltierte Wirtschaftswege und befestigte Waldwege. Cup-Wertung über 15 km.",
    starts: [
      { time: "14:15", name: "400 m Bambinilauf (ohne Zeitnahme)", fee: "kostenlos" },
      { time: "14:30", name: "1.000 m MK U10/U12", fee: "3 €" },
      { time: "14:45", name: "1.000 m WK U10/U12", fee: "3 €" },
      { time: "15:00", name: "15 km Hauptlauf und Walking ca. 8,5 km", fee: "10 €" },
      { time: "15:10", name: "5 km Jedermann mit Jugend U18/U20", fee: "7 €" },
      { time: "15:15", name: "3 km Jugend U14/U16", fee: "3 €" },
    ],
    notes: [
      "Die Zufahrt zum Naturfreibad ist gesperrt. Parken am alten Deuzer Bahnhof oder am Schulgelände (Beienbacher Weg, Nauholzer Weg).",
      "Duschen am Naturfreibad, Siegerehrung mit Kaffee und Kuchen in Zielnähe.",
    ],
  },
  {
    slug: "anzhaeuser-gueckellauf",
    no: 5,
    name: "Anzhäuser Gückellauf",
    place: "Anzhausen",
    date: "2026-06-13",
    venue: "Mehrzweckhalle Anzhausen, Deuzer Str. 6, 57234 Wilnsdorf-Anzhausen",
    registrationUrl: "https://my.raceresult.com/398470/info",
    course: "Durch das Dorf und über Wiesenwege. Start und Ziel unterhalb der Turnhalle.",
    starts: [
      { time: "15:00", name: "1.000 m Schüler U10/U12" },
      { time: "15:10", name: "1.000 m Schülerinnen U10/U12" },
      { time: "15:20", name: "1.500 m Jugend U14/U16" },
      { time: "15:40", name: "Bambinilauf" },
      { time: "16:15", name: "5 km Freizeitlauf · 7,5 km Walking · 10 km Hauptlauf" },
    ],
    notes: ["Anmeldung, Umkleide, Essen, Getränke und Siegerehrung in der Turnhalle Anzhausen.", "Parkplätze sind vor Ort ausgewiesen."],
  },
  {
    slug: "wilnsdorfer-bahnlauf",
    no: 6,
    name: "Wilnsdorfer Bahnlauf",
    place: "Wilnsdorf",
    date: "2026-09-04",
    venue: "Stadion am Höhwäldchen, Wilnsdorf",
    registrationNote: "Voranmeldung über RaceResult bis Mittwoch, 02.09.2026, 16 Uhr. Nachmeldung im Stadion bis eine Stunde vor dem Lauf.",
    course: "Bahnlauf auf der Laufbahn im Höhwäldchen-Stadion – fünf 5.000-m-Läufe, eingeteilt nach Zielzeit.",
    starts: [
      { time: "17:00", name: "400 m Bambinilauf" },
      { time: "17:10", name: "800 m Schülerinnen U10/U12", fee: "3 €" },
      { time: "17:20", name: "800 m Schüler U10/U12", fee: "3 €" },
      { time: "17:30", name: "800 m Schüler/innen U14/U16", fee: "3 €" },
      { time: "17:45", name: "1. 5.000 m (unter 45 Minuten)", fee: "10 €" },
      { time: "18:30", name: "2. 5.000 m (unter 35 Minuten)", fee: "10 €" },
      { time: "19:05", name: "3. 5.000 m (unter 30 Minuten)", fee: "10 €" },
      { time: "19:35", name: "4. 5.000 m (unter 25 Minuten)", fee: "10 €" },
      { time: "20:00", name: "5. 5.000 m (unter 20 Minuten)", fee: "10 €" },
    ],
    notes: [
      "Parken auf dem Schulhof des Gymnasiums Wilnsdorf (Navi: Hoheroth 94).",
      "Umkleiden im Vereinsheim des TuS Wilnsdorf/Wilgersdorf, Siegerehrung im Stadion.",
    ],
    provisional: true,
  },
  {
    slug: "herdorfer-goetzelauf",
    no: 7,
    name: "Herdorfer Götzelauf",
    place: "Herdorf",
    date: "2026-09-27",
    venue: "Großturnhalle in Herdorfs Neuer Mitte, Schneiderstr. 11, Herdorf",
    registrationUrl: "https://my.raceresult.com/421569/",
    registrationNote: "Voranmeldung über RaceResult bis Freitag, 25.09.2026, 18 Uhr. Nachmeldung bis eine Stunde vor dem Lauf gegen 2 €.",
    course: "Rundkurs durch die Herdorfer Innenstadt, mehrere Runden. Amtlich vermessen und bestenlistenfähig.",
    starts: [
      { time: "11:00", name: "300 m Bambinilauf", fee: "kostenlos" },
      { time: "11:15", name: "500 m Schülerlauf U8/U10", fee: "3 €" },
      { time: "11:30", name: "1.000 m Schülerlauf U12/U14/U16", fee: "3 €" },
      { time: "11:45", name: "5 km Jedermannlauf", fee: "7 €" },
      { time: "12:30", name: "10 km Hauptlauf", fee: "10 €" },
    ],
    notes: ["Startnummern in der Turnhalle.", "Siegerehrung ca. eine Stunde nach Laufende im Casino des Hüttenhauses."],
  },
  {
    slug: "suedsauerlandlauf-wenden",
    no: 8,
    name: "Südsauerlandlauf",
    place: "Wenden",
    date: "2026-11-07",
    venue: "Schul-, Sport- und Kulturzentrum Wenden, Peter-Dassis-Ring 47, 57482 Wenden",
    registrationNote: "Voranmeldung über RaceResult bis Freitag, 06.11.2026, 16 Uhr. Nachmeldung bis eine Stunde vor dem Lauf (2 € Aufpreis).",
    course: "Befestigte Waldwege durch das Südsauerland mit leichten und mittleren Steigungen.",
    starts: [
      { time: "13:10", name: "Kids Run 200 m (Jg. 2021 und jünger)", fee: "kostenlos" },
      { time: "13:20", name: "Kids Run 400 m (Jg. 2019–2020)", fee: "kostenlos" },
      { time: "13:30", name: "1.000 m Schülerinnen U10/U12", fee: "3 €" },
      { time: "13:40", name: "1.000 m Schüler U10/U12", fee: "3 €" },
      { time: "13:50", name: "1.000 m Schüler/innen U14/U16", fee: "3 €" },
      { time: "14:00", name: "5 km Hobbylauf / U18", fee: "7 €" },
      { time: "14:55", name: "10 km Hauptlauf", fee: "10 €" },
    ],
    notes: [
      "Ca. 4 km vom Autobahnkreuz Olpe-Süd (A4/A45), Abfahrt Wenden.",
      "Wegen einer Baustelle nur begrenzte Parkplätze an der Gesamtschule – weitere unterhalb des Rathauses (ca. 800 m Fußweg).",
      "Umkleiden und Duschen direkt an Start und Ziel in der Sporthalle.",
    ],
  },
];

export const CUP_FINAL = {
  name: "Abschlussfeier & Siegerehrung",
  date: "2026-11-19",
  time: "19:00 Uhr (Einlass ab 18:00 Uhr)",
  venue: "Krombacher Braustuben",
  text: "Eingeladen sind die Platzierten 1–7 jeder Klasse und alle, die mindestens 8 Läufe gefinisht haben. Weitere Karten gibt es für 5 € – wegen begrenzter Plätze nicht an der Abendkasse.",
  provisional: true,
};

export const CUP_RULES = [
  {
    title: "Wertung",
    items: [
      "In die Cup-Wertung kommt, wer mindestens 5 Läufe der Serie finisht.",
      "Gewertet werden die 5 besten Platzierungen plus Bonuspunkte. Pro Veranstaltung zählt ein Start.",
      "Punkte: Platz 1 = 20 Punkte, Platz 2 = 19 Punkte, Platz 3 = 18 Punkte usw.",
      "U18 wird über 4, 5 und 6 km gewertet. Alle anderen Klassen über 10 km, in Deuz über 15 km.",
      "Helferinnen und Helfer am Veranstaltungstag werden wie Läufer gewertet und bekommen die Bonuspunkte.",
    ],
  },
  {
    title: "Bonuspunkte",
    items: ["6 Läufe: 5 Punkte", "7 Läufe: 10 Punkte", "8 Läufe: 15 Punkte"],
  },
  {
    title: "Klassen",
    items: [
      "Männlich: U18, U20, MHK, M30 bis M65, M70 und älter",
      "Weiblich: U18, U20, WHK, W30 bis W55, W60 und älter",
      "Junior-Cup: U10, U12, U14, U16 – mit Vereinswertung der drei teilnehmerstärksten Vereine",
      "Walking-Wertung in Deuz und beim Gückellauf",
    ],
  },
  {
    title: "Preise",
    items: [
      "Warengutscheine für die Plätze 1–7: 100 / 80 / 50 / 40 / 30 / 25 / 25 € (U18/U20: 75 / 40 / 30 / 25 / 25 / 25 / 25 €)",
      "Junior-Cup: 40 / 30 / 25 € und 15 € für die Plätze 4–7",
      "Ab 6 Läufen: Finisher-Funktionsshirt",
      "Alle 8 Läufe: hochwertiges Finisher-Präsent und Einladung zur Abschlussfeier",
    ],
  },
];

export const raceBySlug = (slug: string) => CUP_RACES.find((r) => r.slug === slug);
