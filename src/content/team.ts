export interface TeamMember {
  name: string;
  role: string;
  stores: Array<"betzdorf" | "siegen">;
  /** Portrait from the previous website (public/images/team/). Without a photo the card shows the initials. */
  photo?: string;
}

const photo = (slug: string) => `/images/team/${slug}.webp`;

export const LEADERSHIP: TeamMember[] = [
  { name: "Michael Stern", role: "Gründer & Inhaber", stores: [], photo: photo("michael-stern") },
  { name: "Bettina Stern", role: "Geschäftsführung", stores: ["betzdorf"], photo: photo("bettina-stern") },
  { name: "Laura Stern-Bätzing", role: "Geschäftsführung", stores: ["betzdorf"], photo: photo("laura-stern-baetzing") },
  { name: "Daniel Bätzing", role: "Geschäftsführung", stores: ["siegen"], photo: photo("daniel-baetzing") },
];

export const ADVISORS: TeamMember[] = [
  { name: "Doris Brenner", role: "Fachberaterin", stores: ["betzdorf"], photo: photo("doris-brenner") },
  { name: "Sarah Hampe", role: "Fachberaterin", stores: ["betzdorf", "siegen"], photo: photo("sarah-hampe") },
  { name: "Sabine Hintze", role: "Fachberaterin", stores: ["betzdorf"], photo: photo("sabine-hintze") },
  { name: "Lea Jung", role: "Fachberaterin", stores: ["betzdorf"], photo: photo("lea-jung") },
  { name: "Jessica Schneider", role: "Fachberaterin", stores: ["betzdorf"], photo: photo("jessica-schneider") },
  { name: "Emily Renk", role: "Fachberaterin", stores: ["betzdorf"], photo: photo("emily-renk") },
  { name: "Pauline Stendenbach", role: "Fachberaterin", stores: ["betzdorf"] },
  { name: "Frank Steinseifer", role: "Fachberater", stores: ["siegen"], photo: photo("frank-steinseifer") },
  { name: "Sabrina Franz", role: "Fachberaterin", stores: ["siegen"], photo: photo("sabrina-franz") },
  { name: "Julian Maletz", role: "Fachberater", stores: ["siegen"], photo: photo("julian-maletz") },
  { name: "Mathilda Schneider", role: "Fachberaterin", stores: ["siegen"] },
  { name: "Tom Krumm", role: "Fachberater", stores: ["siegen"] },
  { name: "Fabian Huesmann", role: "Fachberater", stores: ["siegen"] },
];

/** Store team: management working in this store first, then the advisors. */
export const teamFor = (store: "betzdorf" | "siegen") => [...LEADERSHIP, ...ADVISORS].filter((m) => m.stores.includes(store));
