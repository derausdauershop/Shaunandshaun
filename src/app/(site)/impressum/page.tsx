import type { Metadata } from "next";
import { COMPANY } from "@/content/site";

export const metadata: Metadata = { title: "Impressum", robots: { index: false } };

// Taken over from the previous website; § 5 TMG was replaced by § 5 DDG in May 2024.
export default function ImprintPage() {
  return (
    <article className="px-4 py-14 sm:px-8 lg:py-20">
      <div className="mx-auto max-w-3xl space-y-8">
        <h1 className="text-5xl sm:text-7xl">Impressum</h1>
        <section>
          <h2 className="text-2xl">Angaben gemäß § 5 DDG</h2>
          <p className="mt-2">
            {COMPANY.legalName}
            <br />
            Wilhelmstr. 16
            <br />
            57518 Betzdorf
          </p>
          <p className="mt-4">
            Vertreten durch: Der Ausdauer-Shop Verwaltungs GmbH, vertreten durch die Geschäftsführer Daniel Bätzing & Bettina Stern
          </p>
        </section>
        <section>
          <h2 className="text-2xl">Kontakt</h2>
          <p className="mt-2">
            Telefon: {COMPANY.phone}
            <br />
            Telefax: {COMPANY.fax}
            <br />
            E-Mail: {COMPANY.email}
          </p>
        </section>
        <section>
          <h2 className="text-2xl">Registereintrag</h2>
          <p className="mt-2">
            Eintragung im Handelsregister
            <br />
            Registergericht: Amtsgericht Montabaur
            <br />
            Registernummer: HRA 21721
          </p>
        </section>
        <section>
          <h2 className="text-2xl">Umsatzsteuer</h2>
          <p className="mt-2">Umsatzsteuer-Identifikationsnummer gemäß § 27 a Umsatzsteuergesetz: DE 301 435 598</p>
        </section>
        <section>
          <h2 className="text-2xl">Streitschlichtung</h2>
          <p className="mt-2">Wir sind nicht bereit oder verpflichtet, an Streitbeilegungsverfahren vor einer Verbraucherschlichtungsstelle teilzunehmen.</p>
        </section>
        <section>
          <h2 className="text-2xl">Haftung für Inhalte</h2>
          <p className="mt-2">
            Als Diensteanbieter sind wir für eigene Inhalte auf diesen Seiten nach den allgemeinen Gesetzen verantwortlich. Wir sind jedoch nicht
            verpflichtet, übermittelte oder gespeicherte fremde Informationen zu überwachen oder nach Umständen zu forschen, die auf eine rechtswidrige
            Tätigkeit hinweisen. Verpflichtungen zur Entfernung oder Sperrung der Nutzung von Informationen nach den allgemeinen Gesetzen bleiben
            hiervon unberührt. Eine diesbezügliche Haftung ist jedoch erst ab dem Zeitpunkt der Kenntnis einer konkreten Rechtsverletzung möglich. Bei
            Bekanntwerden von entsprechenden Rechtsverletzungen werden wir diese Inhalte umgehend entfernen.
          </p>
        </section>
        <section>
          <h2 className="text-2xl">Haftung für Links</h2>
          <p className="mt-2">
            Unser Angebot enthält Links zu externen Websites Dritter, auf deren Inhalte wir keinen Einfluss haben. Deshalb können wir für diese fremden
            Inhalte auch keine Gewähr übernehmen. Für die Inhalte der verlinkten Seiten ist stets der jeweilige Anbieter oder Betreiber der Seiten
            verantwortlich. Die verlinkten Seiten wurden zum Zeitpunkt der Verlinkung auf mögliche Rechtsverstöße überprüft. Rechtswidrige Inhalte waren
            zum Zeitpunkt der Verlinkung nicht erkennbar. Eine permanente inhaltliche Kontrolle der verlinkten Seiten ist jedoch ohne konkrete
            Anhaltspunkte einer Rechtsverletzung nicht zumutbar. Bei Bekanntwerden von Rechtsverletzungen werden wir derartige Links umgehend entfernen.
          </p>
        </section>
        <section>
          <h2 className="text-2xl">Urheberrecht</h2>
          <p className="mt-2">
            Die durch die Seitenbetreiber erstellten Inhalte und Werke auf diesen Seiten unterliegen dem deutschen Urheberrecht. Die Vervielfältigung,
            Bearbeitung, Verbreitung und jede Art der Verwertung außerhalb der Grenzen des Urheberrechtes bedürfen der schriftlichen Zustimmung des
            jeweiligen Autors bzw. Erstellers. Downloads und Kopien dieser Seite sind nur für den privaten, nicht kommerziellen Gebrauch gestattet.
            Soweit die Inhalte auf dieser Seite nicht vom Betreiber erstellt wurden, werden die Urheberrechte Dritter beachtet. Sollten Sie trotzdem auf
            eine Urheberrechtsverletzung aufmerksam werden, bitten wir um einen entsprechenden Hinweis. Bei Bekanntwerden von Rechtsverletzungen werden wir
            derartige Inhalte umgehend entfernen.
          </p>
        </section>
      </div>
    </article>
  );
}
