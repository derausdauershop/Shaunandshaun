import type { Metadata } from "next";
import { COMPANY } from "@/content/site";

export const metadata: Metadata = { title: "Datenschutz", robots: { index: false } };

/**
 * DRAFT – must be completed and legally reviewed before go-live.
 * The previous policy mentions Adobe Fonts and the old hosting; the new site self-hosts its fonts,
 * runs on Vercel and sets no tracking cookies.
 */
export default function PrivacyPage() {
  return (
    <article className="px-4 py-14 sm:px-8 lg:py-20">
      <div className="mx-auto max-w-3xl space-y-8">
        <h1 className="text-5xl sm:text-7xl">Datenschutz</h1>
        <p className="rounded-sm border-l-4 border-brand bg-white p-4 font-medium">
          Entwurf: Diese Datenschutzerklärung wird vor dem Livegang der neuen Webseite vollständig überarbeitet und rechtlich geprüft.
        </p>
        <section>
          <h2 className="text-2xl">Verantwortlicher</h2>
          <p className="mt-2">
            {COMPANY.legalName}, Wilhelmstr. 16, 57518 Betzdorf
            <br />
            Telefon: {COMPANY.phone} · E-Mail: {COMPANY.email}
          </p>
        </section>
        <section>
          <h2 className="text-2xl">Was diese Webseite technisch tut</h2>
          <ul className="mt-2 list-disc space-y-1 pl-5">
            <li>Schriften werden von unserem eigenen Server geladen, nicht von Google oder Adobe.</li>
            <li>Es werden keine Tracking- oder Werbe-Cookies gesetzt.</li>
            <li>Beim Aufruf verarbeitet der Hosting-Anbieter technisch notwendige Server-Logdaten (z. B. IP-Adresse, Zeitpunkt, aufgerufene Seite).</li>
            <li>Links zu Instagram, Facebook, WhatsApp, RaceResult und unserem Gutschein-Shop (Shopify) führen auf Seiten der jeweiligen Anbieter.</li>
          </ul>
        </section>
      </div>
    </article>
  );
}
