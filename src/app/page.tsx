import Link from "next/link";
import { BrandLogo } from "@/components/brand/brand-logo";
import { PaceLines } from "@/components/brand/pace-lines";
import { TopoLines } from "@/components/brand/topo-lines";
import { Button } from "@/components/ui/button";

// Temporary start page until the website (PROJ-4) is built.
export default function Home() {
  return (
    <main className="surface-ink relative flex min-h-screen flex-col overflow-hidden px-4 py-8 sm:px-8">
      <TopoLines className="absolute inset-0 h-full w-full text-signal opacity-20" />
      <BrandLogo negative className="relative h-8 text-2xl" />
      <div className="relative my-auto max-w-4xl">
        <p className="font-mono text-xs uppercase tracking-[0.25em] text-signal">Rebranding 2026 · in Arbeit</p>
        <h1 className="mt-6 text-6xl sm:text-8xl">
          Dein nächster <span className="italic text-signal">Kilometer.</span>
        </h1>
        <PaceLines className="mt-8 h-10 w-40 text-signal" />
        <Button asChild variant="signal" size="lg" className="mt-10">
          <Link href="/brand">Zum Brand Guide</Link>
        </Button>
      </div>
    </main>
  );
}
