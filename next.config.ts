import type { NextConfig } from "next";

/** Old ausdauer-shop.de URLs (Contao) → new pages, so search rankings and shared links keep working. */
const LEGACY_REDIRECTS: Array<[string, string]> = [
  ["/startseite", "/"],
  ["/team", "/ueber-uns#team"],
  ["/community-runs", "/community"],
  ["/blog", "/magazin"],
  ["/news", "/magazin"],
  ["/anmeldung", "/ausdauer-cup#modus"],
  ["/datenschutzerklaerung", "/datenschutz"],
  ["/blog/zeit-fuer-deinen-neuen-schuh", "/magazin/zeit-fuer-deinen-neuen-schuh"],
  ["/blog/das-tabu-laufschuhe-und-waschmaschine", "/magazin/laufschuhe-richtig-reinigen"],
  ["/blog/gruener-wald-graue-strasse-oder-roter-tartan", "/magazin/laufuntergruende-im-ueberblick"],
  ["/blog/stretch-it-out", "/magazin/dehnuebungen-fuer-laeufer"],
  ["/blog/effektive-erholung", "/magazin/effektive-erholung-blackroll"],
  ["/newsreader/40-jahre-ausdauer-shop", "/magazin/40-jahre-ausdauer"],
  ["/newsreader/westerwaelder-firmenlauf-2", "/magazin/westerwaelder-firmenlauf-2026"],
  ["/newsreader/zwischenstand-ausdauer-cup", "/ausdauer-cup"],
  ["/eventleser/asdorflauf-wehbach-2", "/ausdauer-cup/asdorflauf-wehbach"],
  ["/eventleser/foeschber-radweglauf-2", "/ausdauer-cup/foeschber-radweglauf"],
  ["/eventleser/flecker-tunnellauf-2", "/ausdauer-cup/flecker-tunnellauf"],
  ["/eventleser/deuzer-sparkassen-pfingst-lauf", "/ausdauer-cup/deuzer-sparkassen-pfingst-lauf"],
  ["/eventleser/anzhaeuser-gueckellauf-2", "/ausdauer-cup/anzhaeuser-gueckellauf"],
  ["/eventleser/wilnsdorfer-bahnlauf-2", "/ausdauer-cup/wilnsdorfer-bahnlauf"],
  ["/eventleser/herdorfer-goetzelauf-2", "/ausdauer-cup/herdorfer-goetzelauf"],
  ["/eventleser/suedsauerlandlauf-wenden-2", "/ausdauer-cup/suedsauerlandlauf-wenden"],
  ["/eventleser/abschlussfeier-ausdauer-cup-2026", "/ausdauer-cup#abschlussfeier"],
  ["/eventleser/:slug*", "/events"],
  ["/newsreader/:slug*", "/magazin"],
];

const nextConfig: NextConfig = {
  async redirects() {
    return LEGACY_REDIRECTS.map(([source, destination]) => ({ source, destination, permanent: true }));
  },
};

export default nextConfig;
