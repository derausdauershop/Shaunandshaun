/**
 * E-mail signature. Table layout + inline styles on purpose: e-mail clients (Outlook, Gmail, Apple Mail)
 * ignore stylesheets and web fonts, so this is the one place where inline styles are required.
 */
/** Relative for the preview; the export script rewrites it to the absolute URL on ausdauer.shop. */
const LOGO_URL = "/brand/logos/ausdauer-rot.png";
const FONT = "'Barlow', Arial, Helvetica, sans-serif";

export function EmailSignature({ name = "Laura Stern-Bätzing", role = "Geschäftsführung" }: { name?: string; role?: string }) {
  return (
    <div className="w-[600px] bg-white p-[24px]">
      <table cellPadding={0} cellSpacing={0} role="presentation" style={{ fontFamily: FONT, color: "#222222", fontSize: 13, lineHeight: "18px" }}>
        <tbody>
          <tr>
            <td style={{ paddingBottom: 10 }}>
              <span style={{ fontSize: 16, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.02em" }}>{name}</span>
              <br />
              <span style={{ color: "#E30110", fontSize: 11, textTransform: "uppercase", letterSpacing: "0.15em" }}>{role}</span>
            </td>
          </tr>
          <tr>
            <td style={{ paddingBottom: 10 }}>
              {/* eslint-disable-next-line @next/next/no-img-element -- e-mail needs an absolute PNG */}
              <img src={LOGO_URL} alt="AUSDAUER" width={160} height={22} style={{ display: "block", border: 0 }} />
            </td>
          </tr>
          <tr>
            <td style={{ borderTop: "2px solid #E30110", paddingTop: 10, color: "#5E5C57", fontSize: 12 }}>
              Der Ausdauer-Shop GmbH &amp; Co. KG · Wilhelmstraße 16 · 57518 Betzdorf
              <br />
              T 02741 4372 ·{" "}
              <a href="mailto:info@ausdauer-shop.de" style={{ color: "#222222", textDecoration: "none" }}>
                info@ausdauer-shop.de
              </a>{" "}
              ·{" "}
              <a href="https://ausdauer.shop" style={{ color: "#E30110", textDecoration: "none", fontWeight: 700 }}>
                ausdauer.shop
              </a>
              <br />
              Store Siegen: Koblenzer Straße 40 · 57072 Siegen · T 0271 77005090
              <br />
              <span style={{ fontSize: 10 }}>Amtsgericht Montabaur HRA 21721 · GF: Daniel Bätzing, Bettina Stern</span>
            </td>
          </tr>
          <tr>
            <td style={{ paddingTop: 10, fontSize: 13, fontWeight: 700, fontStyle: "italic", textTransform: "uppercase" }}>Wir leben Sport.</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
