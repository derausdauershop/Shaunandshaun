import { BrandLogo } from "@/components/brand/brand-logo";
import { PaceLines } from "@/components/brand/pace-lines";
import { TopoLines } from "@/components/brand/topo-lines";

const NAV = [
  ["idee", "Idee"],
  ["architektur", "Architektur"],
  ["logo", "Logo"],
  ["co-branding", "Siegen"],
  ["farben", "Farben"],
  ["typo", "Typo"],
  ["kit", "Grafik-Kit"],
  ["academy", "Run Academy"],
  ["tonalitaet", "Tonalität"],
  ["anwendung", "Anwendung"],
];

export function Hero() {
  return (
    <header className="surface-ink relative overflow-hidden">
      <TopoLines className="absolute inset-0 h-full w-full text-stone opacity-30" />
      <nav aria-label="Brand Guide" className="relative z-10 border-b border-paper/10 px-4 sm:px-8">
        <div className="mx-auto flex max-w-6xl items-center gap-6 overflow-x-auto py-3">
          <BrandLogo variant="white" className="h-6 shrink-0" />
          <ul className="flex gap-5 whitespace-nowrap font-mono text-[0.7rem] uppercase tracking-[0.15em]">
            {NAV.map(([id, label]) => (
              <li key={id}>
                <a href={`#${id}`} className="opacity-70 transition-opacity hover:opacity-100 focus-visible:opacity-100">
                  {label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </nav>
      <div className="relative z-10 mx-auto max-w-6xl px-4 pb-20 pt-20 sm:px-8 lg:pb-32 lg:pt-28">
        <p className="font-mono text-xs uppercase tracking-[0.25em] text-brand">Brand Guide · Rebranding 2026 · Entwurf</p>
        <h1 className="mt-6 text-balance text-6xl sm:text-8xl lg:text-[9rem]">
          Ausdauer ist
          <br />
          <span className="italic text-brand">eine Strecke.</span>
        </h1>
        <p className="mt-8 max-w-xl text-lg text-muted-foreground sm:text-xl">
          Seit 1986 begleiten wir Menschen auf ihrer Strecke – vom ersten Kilometer bis zur Bestzeit. Mit Fachwissen, das man
          spürt, und einer Community, die mitzieht.
        </p>
        <div className="mt-10 flex items-center gap-6">
          <PaceLines className="h-10 w-40 text-brand" />
          <span className="font-display text-2xl font-bold uppercase tracking-wide">Wir leben Sport.</span>
        </div>
      </div>
    </header>
  );
}
