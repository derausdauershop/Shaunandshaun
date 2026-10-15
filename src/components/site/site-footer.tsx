import Link from "next/link";
import { BrandLogo } from "@/components/brand/brand-logo";
import { PaceLines } from "@/components/brand/pace-lines";
import { PartnerLogo } from "@/components/brand/partner-logo";
import { COMPANY, LEGAL_NAV, MAIN_NAV, SECONDARY_NAV } from "@/content/site";
import { STORES } from "@/content/stores";
import { summarize } from "@/lib/opening-hours";
import { OpenStatus } from "./open-status";

export function SiteFooter() {
  return (
    <footer className="surface-ink">
      {/* Standortleiste */}
      <div className="border-b border-paper/10">
        <div className="mx-auto grid max-w-7xl gap-px bg-paper/10 sm:grid-cols-2">
          {STORES.map((s) => (
            <section key={s.slug} aria-label={s.name} className="bg-ink px-4 py-10 sm:px-8">
              <div className="flex h-20 items-center">
                {s.partner ? <PartnerLogo showSender={false} className="[&>div]:py-1" /> : <BrandLogo variant="white" className="h-8" />}
              </div>
              <p className="mt-4 font-display text-3xl font-black uppercase italic">{s.city}</p>
              <address className="mt-2 not-italic text-muted-foreground">
                {s.street}, {s.zip} {s.city}
                <br />
                <a href={s.phoneHref} className="hover:text-paper">
                  Tel. {s.phone}
                </a>
              </address>
              <dl className="mt-4 grid w-fit grid-cols-[auto_auto] gap-x-6 font-mono text-sm tabular">
                {summarize(s.hours).map((r) => (
                  <div key={r.days} className="contents">
                    <dt className="text-muted-foreground">{r.days}</dt>
                    <dd>{r.time}</dd>
                  </div>
                ))}
              </dl>
              <OpenStatus hours={s.hours} tone="dark" className="mt-4" />
            </section>
          ))}
        </div>
      </div>

      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-12 sm:px-8 md:grid-cols-[1.4fr_1fr_1fr_1fr]">
        <div>
          <BrandLogo variant="white" className="h-7" />
          <p className="mt-4 font-display text-2xl font-black uppercase italic">{COMPANY.claim}</p>
          <p className="mt-2 max-w-xs text-sm text-muted-foreground">Dein Laufsport-Spezialist in Betzdorf und Siegen. Familiengeführt seit {COMPANY.founded}.</p>
          <PaceLines className="mt-6 w-28 text-brand" count={3} />
        </div>
        <FooterNav title="Entdecken" items={MAIN_NAV} />
        <FooterNav title="AUSDAUER" items={SECONDARY_NAV} />
        <div>
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-muted-foreground">Folge uns</p>
          <ul className="mt-4 space-y-2">
            <li>
              <a href={COMPANY.instagram} target="_blank" rel="noreferrer" className="hover:text-brand">
                Instagram · @ausdauer.shop
              </a>
            </li>
            <li>
              <a href={COMPANY.facebook} target="_blank" rel="noreferrer" className="hover:text-brand">
                Facebook
              </a>
            </li>
            <li>
              <a href={COMPANY.whatsapp} target="_blank" rel="noreferrer" className="hover:text-brand">
                WhatsApp
              </a>
            </li>
            <li>
              <a href={`mailto:${COMPANY.email}`} className="hover:text-brand">
                {COMPANY.email}
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-paper/10">
        <div className="mx-auto flex max-w-7xl flex-col gap-3 px-4 py-6 text-xs text-muted-foreground sm:flex-row sm:items-center sm:justify-between sm:px-8">
          <p>
            © {new Date().getFullYear()} {COMPANY.legalName} · An Feiertagen gelten abweichende Öffnungszeiten.
          </p>
          <ul className="flex gap-4">
            {LEGAL_NAV.map((l) => (
              <li key={l.href}>
                <Link href={l.href} className="hover:text-paper">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  );
}

function FooterNav({ title, items }: { title: string; items: typeof MAIN_NAV }) {
  return (
    <nav aria-label={title}>
      <p className="font-mono text-xs uppercase tracking-[0.2em] text-muted-foreground">{title}</p>
      <ul className="mt-4 space-y-2">
        {items.map((i) => (
          <li key={i.href}>
            <Link href={i.href} className="hover:text-brand">
              {i.label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
