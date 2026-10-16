import { BrandLogo } from "@/components/brand/brand-logo";
import { CrownTownLogo, FirmenlaufLogo } from "@/components/brand/crown-town-logo";
import { CupLogo } from "@/components/brand/cup-logo";
import { InfinityMark } from "@/components/brand/infinity-mark";
import { PartnerLogo } from "@/components/brand/partner-logo";
import { RunAcademyLogo } from "@/components/brand/run-academy-logo";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { Section } from "./section";

function Node({ label, title, children, tone = "default" }: { label: string; title?: string; children?: React.ReactNode; tone?: "default" | "own-logo" }) {
  return (
    <div className={cn("rounded-sm bg-white p-5", tone === "own-logo" ? "border border-dashed border-ink/40" : "border")}>
      <Badge variant={tone === "own-logo" ? "outline" : "secondary"} className="font-mono text-[0.6rem] uppercase tracking-[0.15em]">
        {label}
      </Badge>
      {title && <p className="mt-3 font-display text-2xl font-extrabold uppercase">{title}</p>}
      {children && <div className="mt-3">{children}</div>}
    </div>
  );
}

export function Architecture() {
  return (
    <Section
      id="architektur"
      km={2}
      kicker="Markenarchitektur"
      title="Eine Dachmarke. Ein Zeichen. Klare Rollen."
      intro="AUSDAUER führt. Das ∞ aus dem Logo steckt bereits in Absolute Run Ausdauer und in der Run Academy – es wird zur Klammer der ganzen Familie. Marken mit eigenem Logo (Absolute Run, Crown Town Runners, Westerwälder Firmenlauf) werden gekennzeichnet, nie angepasst."
    >
      <div className="flex justify-center">
        <div className="rounded-sm bg-ink px-10 py-6">
          <BrandLogo variant="white" className="h-10" />
        </div>
      </div>
      <div aria-hidden className="mx-auto h-8 w-px bg-ink" />
      <div aria-hidden className="mx-auto hidden h-px w-2/3 bg-ink lg:block" />
      <div className="mt-0 grid gap-4 lg:mt-8 lg:grid-cols-3">
        <div className="space-y-4">
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-muted-foreground">Stores</p>
          <Node label="Flagship · Betzdorf">
            <BrandLogo className="h-6" />
            <p className="mt-3 text-sm text-muted-foreground">Wilhelmstraße 16 · Running, Laufanalyse, Einlagen, Outdoor</p>
          </Node>
          <Node label="Partner-Format Sport 2000 · Siegen" tone="own-logo">
            <PartnerLogo />
            <p className="mt-3 text-sm text-muted-foreground">Koblenzer Straße 40 · reines Running</p>
          </Node>
        </div>
        <div className="space-y-4">
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-muted-foreground">Untermarken · gleicher Bauplan</p>
          <Node label="Laufschule · neu gestaltet">
            <RunAcademyLogo />
            <p className="mt-3 text-sm text-muted-foreground">Einsteigerkurs, 10 km / Halbmarathon, Lauf-ABC & Technik</p>
          </Node>
          <Node label="Laufserie seit 1989 · erstmals einheitlich">
            <CupLogo className="h-12 max-w-full" />
            <p className="mt-3 text-sm text-muted-foreground">
              8–9 Vereinsläufe, AUSDAUER stellt den Cup. <a href="/brand/cup" className="underline underline-offset-4">Logo-System & Anwendungen →</a>
            </p>
          </Node>
          <Node label="Textildruck für Vereine & Firmen · neu">
            {/* eslint-disable-next-line @next/next/no-img-element -- static vector logo */}
            <img src="/brand/teamwear/ausdauer-teamwear-farbig.svg" alt="AUSDAUER TEAMWEAR" className="h-12 w-auto max-w-full" />
            <p className="mt-3 text-sm text-muted-foreground">
              Flex & DTF auf JAKO, erima und adidas. <a href="/brand/teamwear" className="underline underline-offset-4">Logo & Textil-Marken →</a>
            </p>
          </Node>
          <div className="flex items-center gap-3 rounded-sm bg-ink p-5 text-paper">
            <InfinityMark className="h-6 w-auto text-brand" />
            <p className="text-sm">Das ∞ verbindet AUSDAUER, Absolute Run Ausdauer, Run Academy, AUSDAUER CUP und AUSDAUER TEAMWEAR.</p>
          </div>
        </div>
        <div className="space-y-4">
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-muted-foreground">Community</p>
          <Node label="Run Club Siegen · eigenes Logo" tone="own-logo">
            <CrownTownLogo />
            <p className="mt-3 text-sm text-muted-foreground">Community Run · donnerstags 18:30 ab Store Siegen · Absender „powered by AUSDAUER“</p>
          </Node>
          <Node label="Event Betzdorf · eigenes Logo" tone="own-logo">
            <FirmenlaufLogo className="h-10" />
            <p className="mt-3 text-sm text-muted-foreground">Organisiert von AUSDAUER · Absender „präsentiert von AUSDAUER“</p>
          </Node>
        </div>
      </div>
    </Section>
  );
}
