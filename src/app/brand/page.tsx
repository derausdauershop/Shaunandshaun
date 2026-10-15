import type { Metadata } from "next";
import { SignalSwitcher } from "@/components/brand/signal-switcher";
import { Academy } from "./_sections/academy";
import { Applications } from "./_sections/applications";
import { Architecture } from "./_sections/architecture";
import { CoBranding } from "./_sections/co-branding";
import { Colors } from "./_sections/colors";
import { Hero } from "./_sections/hero";
import { Idea } from "./_sections/idea";
import { Kit } from "./_sections/kit";
import { Logo } from "./_sections/logo";
import { Tone } from "./_sections/tone";
import { Typography } from "./_sections/typography";

export const metadata: Metadata = {
  title: "Brand Guide",
  description: "AUSDAUER Brand Guide – Rebranding 2026 (Entwurf)",
  robots: { index: false, follow: false },
};

export default function BrandGuidePage() {
  return (
    <SignalSwitcher>
      <Hero />
      <main>
        <Idea />
        <Architecture />
        <Logo />
        <CoBranding />
        <Colors />
        <Typography />
        <Kit />
        <Academy />
        <Tone />
        <Applications />
      </main>
      <footer className="surface-ink px-4 py-10 sm:px-8">
        <div className="mx-auto flex max-w-6xl flex-col justify-between gap-4 font-mono text-xs uppercase tracking-[0.15em] text-muted-foreground sm:flex-row">
          <p>Der Ausdauer-Shop GmbH & Co. KG · Betzdorf & Siegen</p>
          <p>Brand Guide v0.1 · Entwurf zur Freigabe</p>
        </div>
      </footer>
    </SignalSwitcher>
  );
}
