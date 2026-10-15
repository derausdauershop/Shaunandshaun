export interface TeamMember {
  name: string;
  role: string;
  stores: Array<"betzdorf" | "siegen">;
}

export const LEADERSHIP: TeamMember[] = [
  { name: "Michael Stern", role: "Gründer & Inhaber", stores: [] },
  { name: "Bettina Stern", role: "Geschäftsführung", stores: [] },
  { name: "Laura Stern-Bätzing", role: "Geschäftsführung", stores: [] },
  { name: "Daniel Bätzing", role: "Geschäftsführung", stores: [] },
];

export const ADVISORS: TeamMember[] = [
  { name: "Doris Brenner", role: "Fachberaterin", stores: ["betzdorf"] },
  { name: "Sarah Hampe", role: "Fachberaterin", stores: ["betzdorf", "siegen"] },
  { name: "Sabine Hintze", role: "Fachberaterin", stores: ["betzdorf"] },
  { name: "Lea Jung", role: "Fachberaterin", stores: ["betzdorf"] },
  { name: "Jessica Schneider", role: "Fachberaterin", stores: ["betzdorf"] },
  { name: "Emily Renk", role: "Fachberaterin", stores: ["betzdorf"] },
  { name: "Pauline Stendenbach", role: "Fachberaterin", stores: ["betzdorf"] },
  { name: "Raúl Vallero Gallegos", role: "Fachberater", stores: ["siegen"] },
  { name: "Frank Steinseifer", role: "Fachberater", stores: ["siegen"] },
  { name: "Sabrina Franz", role: "Fachberaterin", stores: ["siegen"] },
  { name: "Julian Maletz", role: "Fachberater", stores: ["siegen"] },
  { name: "Mathilda Schneider", role: "Fachberaterin", stores: ["siegen"] },
  { name: "Tom Krumm", role: "Fachberater", stores: ["siegen"] },
];

export const advisorsFor = (store: "betzdorf" | "siegen") => ADVISORS.filter((m) => m.stores.includes(store));
