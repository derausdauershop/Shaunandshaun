import { BrandLogo } from "@/components/brand/brand-logo";
import { PartnerLogo } from "@/components/brand/partner-logo";
import { RunAcademyLogo } from "@/components/brand/run-academy-logo";
import { Badge } from "@/components/ui/badge";
import { Section } from "./section";

function Node({ label, title, children, tone = "default" }: { label: string; title?: string; children?: React.ReactNode; tone?: "default" | "partner" }) {
  return (
    <div className={tone === "partner" ? "rounded-sm border border-dashed border-ink/40 bg-white p-5" : "rounded-sm border bg-white p-5"}>
      <Badge variant={tone === "partner" ? "outline" : "secondary"} className="font-mono text-[0.6rem] uppercase tracking-[0.15em]">
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
      title="Eine Dachmarke. Klare Rollen."
      intro="AUSDAUER führt. Run Academy und die Run Clubs sind Untermarken im selben System. Absolute Run Ausdauer in Siegen ist ein Partner-Format von Sport 2000 – es wird gekennzeichnet, nie angepasst."
    >
      <div className="flex justify-center">
        <div className="rounded-sm bg-ink px-10 py-6 text-paper">
          <BrandLogo negative className="h-12 text-4xl" />
        </div>
      </div>
      <div aria-hidden className="mx-auto h-8 w-px bg-ink" />
      <div aria-hidden className="mx-auto hidden h-px w-2/3 bg-ink lg:block" />
      <div className="mt-0 grid gap-4 lg:mt-8 lg:grid-cols-3">
        <div className="space-y-4">
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-muted-foreground">Stores</p>
          <Node label="Flagship" title="AUSDAUER Betzdorf">
            <p className="text-sm text-muted-foreground">Wilhelmstraße 16 · Running, Laufanalyse, Einlagen, Outdoor</p>
          </Node>
          <Node label="Partner-Format · Sport 2000" tone="partner">
            <PartnerLogo />
            <p className="mt-3 text-sm text-muted-foreground">Koblenzer Straße 40 · reines Running</p>
          </Node>
        </div>
        <div className="space-y-4">
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-muted-foreground">Untermarke · Lernen</p>
          <Node label="Laufschule">
            <RunAcademyLogo />
            <p className="mt-3 text-sm text-muted-foreground">Einsteigerkurs, 10 km / Halbmarathon, Lauf-ABC & Technik</p>
          </Node>
        </div>
        <div className="space-y-4">
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-muted-foreground">Untermarke · Community</p>
          <Node label="Run Club Siegen" title="Community Run">
            <p className="text-sm text-muted-foreground">Donnerstags 18:30 · ab Store Siegen</p>
          </Node>
          <Node label="Run Club Betzdorf" title="BTown Run Club">
            <p className="text-sm text-muted-foreground">Mittwochs 18:15 · Wilhelmsgasse</p>
          </Node>
          <Node label="Events" title="Firmenlauf · Ausdauer-Cup">
            <p className="text-sm text-muted-foreground">Absender immer „präsentiert von AUSDAUER“</p>
          </Node>
        </div>
      </div>
    </Section>
  );
}
