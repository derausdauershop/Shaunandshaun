import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { CrownTownLogo, FirmenlaufLogo } from "@/components/brand/crown-town-logo";
import { CupLogo } from "@/components/brand/cup-logo";
import { PageHero } from "@/components/site/page-hero";
import { SiteSection } from "@/components/site/section";
import { Button } from "@/components/ui/button";
import { COMPANY } from "@/content/site";

export const metadata: Metadata = {
  title: "Community",
  description: "Crown Town Runners – der Lauftreff in Siegen jeden Donnerstag um 18:30 Uhr. Dazu Test & Try Events, der Westerwälder Firmenlauf und der AUSDAUER CUP.",
};

export default function CommunityPage() {
  return (
    <>
      <PageHero
        kicker="Community"
        accent="partner"
        title={
          <>
            Laufen ist allein gut. <span className="italic text-partner">Zusammen besser.</span>
          </>
        }
        intro="Lauftreff, Testläufe, Firmenlauf und Laufserie: Bei AUSDAUER läufst du nicht allein."
        image="/images/crown-town-runners.webp"
        imageAlt="Die Crown Town Runners vor dem Store in Siegen"
      />

      <SiteSection km={1} kicker="Lauftreff Siegen" title="Crown Town Runners" accent="partner">
        <div className="grid gap-10 lg:grid-cols-[1fr_1.2fr] lg:items-center">
          <div className="rounded-sm bg-white p-8 ring-1 ring-border">
            <CrownTownLogo className="h-20" />
            <dl className="mt-8 grid grid-cols-[auto_1fr] gap-x-6 gap-y-3">
              <dt className="font-mono text-xs uppercase tracking-[0.2em] text-muted-foreground">Wann</dt>
              <dd className="font-display text-2xl font-bold uppercase">Jeden Donnerstag, 18:30 Uhr</dd>
              <dt className="font-mono text-xs uppercase tracking-[0.2em] text-muted-foreground">Wo</dt>
              <dd>Absolute Run Ausdauer, Koblenzer Straße 40, Siegen</dd>
              <dt className="font-mono text-xs uppercase tracking-[0.2em] text-muted-foreground">Was</dt>
              <dd>Ca. eine Stunde: 5–7 km laufen plus Übungen für Rumpfstabilität und Oberkörper</dd>
            </dl>
          </div>
          <div className="space-y-4 text-lg">
            <p>Du hast Lust auf 5–7 km und willst dabei auch etwas für deine Rumpfstabilität und den Oberkörper tun? Dann bist du bei uns richtig.</p>
            <p>Komm einfach vorbei, eine Anmeldung brauchst du nicht. Jedes Tempo ist willkommen.</p>
            <p className="font-display text-xl font-bold uppercase">Test & Try</p>
            <p>Einmal im Monat kannst du bei unseren Test & Try Events neue Schuhe direkt beim Lauftreff ausprobieren. Die Termine findest du auf Instagram.</p>
            <Button asChild variant="default">
              <a href={COMPANY.instagram} target="_blank" rel="noreferrer">
                @ausdauer.shop auf Instagram
              </a>
            </Button>
          </div>
        </div>
      </SiteSection>

      <SiteSection km={2} kicker="Events" title="Mitlaufen, anfeuern, feiern." tone="white">
        <div className="grid gap-6 md:grid-cols-2">
          <article className="rounded-sm border border-dashed border-ink/30 p-8">
            <FirmenlaufLogo className="h-12" />
            <p className="mt-6 text-lg">
              Der Westerwälder Firmenlauf in Betzdorf – organisiert von AUSDAUER. 2026 ging der 13. Firmenlauf mit neuer Strecke durch die Betzdorfer
              Innenstadt, danach wurde bei der After Run Party gefeiert. Wir sehen uns 2027!
            </p>
            <Button asChild variant="link" className="mt-4 px-0 font-display text-lg font-bold uppercase">
              <Link href="/magazin/westerwaelder-firmenlauf-2026">Rückblick 2026 →</Link>
            </Button>
          </article>
          <article className="rounded-sm border border-ink/10 p-8">
            <CupLogo className="h-12" />
            <p className="mt-6 text-lg">Acht Vereinsläufe in Siegerland und Südsauerland, eine Wertung und eine Abschlussfeier. Seit 1989.</p>
            <Button asChild variant="link" className="mt-4 px-0 font-display text-lg font-bold uppercase">
              <Link href="/ausdauer-cup">Termine & Modus →</Link>
            </Button>
          </article>
        </div>
      </SiteSection>

      <section className="relative h-72 overflow-hidden sm:h-96">
        <Image src="/images/trail.webp" alt="Gruppenlauf im Wald" fill sizes="100vw" className="object-cover" />
      </section>
    </>
  );
}
