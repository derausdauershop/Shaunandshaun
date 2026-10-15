import { COMPANY } from "@/content/site";
import type { Store } from "@/content/stores";
import { DAY_ORDER, type DayKey } from "@/lib/opening-hours";

const SCHEMA_DAY: Record<DayKey, string> = {
  mo: "Monday",
  di: "Tuesday",
  mi: "Wednesday",
  do: "Thursday",
  fr: "Friday",
  sa: "Saturday",
  so: "Sunday",
};

/** schema.org LocalBusiness data for search engines (one consistent NAP source). */
export function StoreJsonLd({ stores }: { stores: Store[] }) {
  const data = stores.map((s) => ({
    "@context": "https://schema.org",
    "@type": "SportingGoodsStore",
    name: s.name,
    brand: COMPANY.brand,
    parentOrganization: { "@type": "Organization", name: COMPANY.legalName, url: COMPANY.url },
    url: `${COMPANY.url}/stores/${s.slug}`,
    telephone: s.phone,
    email: COMPANY.email,
    image: `${COMPANY.url}${s.image}`,
    address: { "@type": "PostalAddress", streetAddress: s.street, postalCode: s.zip, addressLocality: s.city, addressCountry: "DE" },
    openingHoursSpecification: DAY_ORDER.flatMap((d) =>
      s.hours[d].map(([opens, closes]) => ({ "@type": "OpeningHoursSpecification", dayOfWeek: SCHEMA_DAY[d], opens, closes })),
    ),
  }));
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }} />;
}
