/* eslint-disable @next/next/no-img-element -- static vector logos */
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Check, Mail, Phone } from "lucide-react";
import { KitViewer } from "@/components/site/kit-viewer";
import { PageHero } from "@/components/site/page-hero";
import { SiteSection } from "@/components/site/section";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { COMPANY } from "@/content/site";
import { AUDIENCES, CLUBS, FAQ, KITS, METHODS, STEPS, TEAMWEAR } from "@/content/teamwear";

export const metadata: Metadata = {
  title: "Teamwear – Textildruck für Vereine & Firmen",
  description:
    "AUSDAUER TEAMWEAR: Trikots, Trainingskleidung und Firmenkleidung von JAKO, bedruckt in Betzdorf mit Flex und DTF. Offizieller JAKO Teamwear Partner.",
};

export default function TeamwearPage() {
  return (
    <>
      <PageHero
        kicker="Teamwear · Bedruckt in Betzdorf"
        title={
          <>
            Euer Trikot. <span className="italic text-brand">Unser Druck.</span>
          </>
        }
        intro="Wir statten Vereine und Firmen mit JAKO aus und bedrucken alles selbst in unserer Werkstatt in Betzdorf – Wappen, Sponsoren, Namen und Nummern."
      >
        <div className="flex flex-wrap items-center gap-4">
          <Button asChild variant="brand" size="lg">
            <a href={COMPANY.phoneHref}>Anfrage: {COMPANY.phone}</a>
          </Button>
          <Badge variant="outline" className="border-paper/30 font-mono text-xs uppercase tracking-[0.15em] text-paper">
            {TEAMWEAR.partner}
          </Badge>
        </div>
      </PageHero>

      <SiteSection km={1} kicker="Für wen" title="Für Vereine. Für Firmen." tone="white">
        <div className="grid gap-6 md:grid-cols-2">
          {AUDIENCES.map((a) => (
            <article key={a.title} className="flex flex-col border-t-4 border-ink pt-6">
              <h3 className="font-display text-3xl font-black uppercase italic">{a.title}</h3>
              <p className="mt-3 max-w-xl text-lg text-muted-foreground">{a.text}</p>
              <ul className="mt-5 space-y-2">
                {a.points.map((p) => (
                  <li key={p} className="flex gap-3">
                    <Check className="mt-0.5 size-5 shrink-0 text-brand" aria-hidden />
                    {p}
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </SiteSection>

      <SiteSection
        km={2}
        kicker="Aus der Werkstatt"
        title="Echte Druckfreigaben."
        intro="So sieht eine Druckfreigabe bei uns aus. Tipp auf ein Trikot, um es umzudrehen."
      >
        <div className="grid gap-10 md:grid-cols-2">
          {KITS.map((k) => (
            <KitViewer key={k.club} kit={k} />
          ))}
        </div>
      </SiteSection>

      <SiteSection km={3} kicker="Verfahren" title="Flex oder DTF?" tone="white">
        <div className="grid gap-6 md:grid-cols-2">
          {METHODS.map((m) => (
            <article key={m.short} className="rounded-sm p-8 ring-1 ring-border">
              <p className="font-mono text-xs uppercase tracking-[0.2em] text-brand">{m.short}</p>
              <h3 className="mt-2 font-display text-3xl font-black uppercase">{m.name}</h3>
              <p className="mt-3 text-muted-foreground">{m.text}</p>
              <p className="mt-6 font-mono text-xs uppercase tracking-[0.2em] text-muted-foreground">Ideal für</p>
              <ul className="mt-2 space-y-1">
                {m.bestFor.map((b) => (
                  <li key={b} className="flex gap-3">
                    <Check className="mt-0.5 size-5 shrink-0 text-brand" aria-hidden />
                    {b}
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>
        <p className="mt-6 max-w-2xl text-sm text-muted-foreground">Oft kombinieren wir beides: das Wappen in DTF, Namen und Nummern in Flex.</p>
      </SiteSection>

      <SiteSection km={4} kicker="Referenzen" title="Diese Vereine tragen AUSDAUER TEAMWEAR.">
        <ul className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
          {CLUBS.map((c) => (
            <li key={c.name} className="flex flex-col items-center gap-4 rounded-sm bg-white p-6 text-center ring-1 ring-border">
              <div className="relative size-24 sm:size-28">
                <Image src={c.crest} alt={`Wappen ${c.name}`} fill sizes="112px" className="object-contain" />
              </div>
              <p className="font-display text-lg font-bold uppercase leading-tight">{c.name}</p>
            </li>
          ))}
        </ul>
      </SiteSection>

      <SiteSection km={5} kicker="Ausrüster" title="Offizieller JAKO Teamwear Partner." tone="ink">
        <div className="grid gap-8 lg:grid-cols-[1fr_1.2fr] lg:items-center">
          <div className="flex min-h-40 items-center justify-center rounded-sm bg-white p-10" data-slot="jako-logo">
            {/* JAKO logo: original file only, after approval by JAKO marketing (CI 2026). Until then the name as text. */}
            <p className="font-display text-4xl font-black uppercase text-ink">JAKO</p>
          </div>
          <div>
            <p className="max-w-xl text-lg text-paper/85">
              Als offizieller Partner bekommt ihr bei uns das komplette JAKO-Teamsortiment – vom Trikot bis zur Regenjacke, für Firmen auch die
              JAKO Corporate Teamwear. Muster und Größen könnt ihr im Store in Betzdorf anprobieren.
            </p>
          </div>
        </div>
      </SiteSection>

      <SiteSection km={6} kicker="Ablauf" title="In fünf Schritten zum Trikot." tone="white">
        <ol className="grid gap-6 md:grid-cols-5">
          {STEPS.map((s, i) => (
            <li key={s.title} className="border-t-4 border-brand pt-4">
              <p className="font-mono text-sm text-brand tabular">{String(i + 1).padStart(2, "0")}</p>
              <h3 className="mt-1 font-display text-2xl font-black uppercase">{s.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{s.text}</p>
            </li>
          ))}
        </ol>
      </SiteSection>

      <SiteSection km={7} kicker="Fragen" title="Gut zu wissen.">
        <div className="grid gap-10 lg:grid-cols-[1.4fr_1fr]">
          <Accordion type="single" collapsible className="max-w-3xl">
            {FAQ.map((f) => (
              <AccordionItem key={f.q} value={f.q}>
                <AccordionTrigger className="text-left font-display text-xl font-bold uppercase">{f.q}</AccordionTrigger>
                <AccordionContent className="text-base text-muted-foreground">{f.a}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
          <aside className="surface-ink h-fit rounded-sm bg-ink p-8 text-paper">
            <img src="/brand/teamwear/ausdauer-teamwear-gestapelt-negativ.svg" alt="AUSDAUER TEAMWEAR – Bedruckt in Betzdorf" className="h-28 w-auto max-w-full" />
            <p className="mt-6 text-paper/85">Wilhelmstraße 16, 57518 Betzdorf</p>
            <div className="mt-6 flex flex-col gap-3">
              <Button asChild variant="brand">
                <a href={COMPANY.phoneHref}>
                  <Phone aria-hidden /> {COMPANY.phone}
                </a>
              </Button>
              <Button asChild variant="secondary">
                <a href={`mailto:${COMPANY.email}?subject=Anfrage%20Teamwear`}>
                  <Mail aria-hidden /> {COMPANY.email}
                </a>
              </Button>
            </div>
            {!TEAMWEAR.clubShopLive && (
              <p className="mt-6 border-t border-paper/20 pt-4 text-sm text-paper/70">
                Bestellshop für Vereine: Der Vereinszugang folgt. Bis dahin bestellt ihr direkt bei uns.
              </p>
            )}
            <Link href="/stores/betzdorf" className="mt-4 inline-block text-sm underline underline-offset-4">
              Öffnungszeiten Betzdorf →
            </Link>
          </aside>
        </div>
      </SiteSection>
    </>
  );
}
