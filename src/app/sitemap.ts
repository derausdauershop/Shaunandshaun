import type { MetadataRoute } from "next";
import { COURSES } from "@/content/academy";
import { ARTICLES } from "@/content/articles";
import { CUP_RACES } from "@/content/cup";
import { COMPANY } from "@/content/site";
import { STORES } from "@/content/stores";

export default function sitemap(): MetadataRoute.Sitemap {
  const paths = [
    "/",
    "/laufanalyse",
    "/stores",
    ...STORES.map((s) => `/stores/${s.slug}`),
    "/run-academy",
    ...COURSES.map((c) => `/run-academy/${c.slug}`),
    "/ausdauer-cup",
    ...CUP_RACES.map((r) => `/ausdauer-cup/${r.slug}`),
    "/community",
    "/magazin",
    ...ARTICLES.map((a) => `/magazin/${a.slug}`),
    "/ueber-uns",
    "/jobs",
    "/kontakt",
  ];
  return paths.map((p) => ({ url: `${COMPANY.url}${p}` }));
}
