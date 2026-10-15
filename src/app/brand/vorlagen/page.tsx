import type { Metadata } from "next";
import Link from "next/link";
import { KmMarker } from "@/components/brand/km-marker";
import { TopoLines } from "@/components/brand/topo-lines";
import { TEMPLATES } from "@/components/templates/registry";
import { Badge } from "@/components/ui/badge";

export const metadata: Metadata = {
  title: "Vorlagen",
  description: "Print- und Social-Media-Vorlagen im AUSDAUER-Design.",
  robots: { index: false, follow: false },
};

const GROUPS = [...new Set(TEMPLATES.map((t) => t.group))];

export default function TemplatesPage() {
  return (
    <>
      <header className="surface-ink relative overflow-hidden">
        <TopoLines className="absolute inset-0 h-full w-full text-stone opacity-25" />
        <div className="relative mx-auto max-w-7xl px-4 py-16 sm:px-8">
          <Link href="/brand" className="font-mono text-xs uppercase tracking-[0.2em] text-muted-foreground hover:text-foreground">
            ← Brand Guide
          </Link>
          <KmMarker km="00" label="Vorlagen · Entwurf" className="mt-10" />
          <h1 className="mt-6 text-6xl sm:text-8xl">
            Print & <span className="italic text-brand">Social.</span>
          </h1>
          <p className="mt-6 max-w-2xl text-lg text-muted-foreground">
            {TEMPLATES.length} Vorlagen in echter Größe. Druckvorlagen mit 3 mm Beschnitt als PDF, Social-Media-Vorlagen als PNG. Die Reinzeichnung
            (CMYK, Druckprofil) übernimmt die Druckerei.
          </p>
        </div>
      </header>
      <main className="mx-auto max-w-7xl space-y-16 px-4 py-16 sm:px-8">
        {GROUPS.map((g, gi) => (
          <section key={g}>
            <KmMarker km={gi + 1} label={g} />
            <ul className="mt-8 flex flex-wrap items-end gap-8">
              {TEMPLATES.filter((t) => t.group === g).map((t) => (
                <li key={t.id} className="max-w-full">
                  <div className="max-w-full overflow-hidden shadow-lg ring-1 ring-ink/10">
                    <div className={t.zoom}>
                      <t.Component />
                    </div>
                  </div>
                  <div className="mt-3 flex flex-wrap items-center gap-2">
                    <p className="font-display text-lg font-bold uppercase leading-tight">{t.title}</p>
                    <Badge variant="outline" className="font-mono text-[0.6rem] uppercase">
                      {t.format}
                    </Badge>
                  </div>
                  <p className="mt-1 flex gap-3 font-mono text-xs">
                    <Link href={`/brand/vorlagen/${t.id}`} className="underline underline-offset-4">
                      Originalgröße
                    </Link>
                    {t.kind === "print" && (
                      <a href={`/brand/vorlagen-export/${t.id}.pdf`} className="underline underline-offset-4">
                        PDF
                      </a>
                    )}
                    <a href={`/brand/vorlagen-export/${t.id}.${t.kind === "email" ? "html" : "png"}`} className="underline underline-offset-4">
                      {t.kind === "email" ? "HTML" : "PNG"}
                    </a>
                  </p>
                </li>
              ))}
            </ul>
          </section>
        ))}
      </main>
    </>
  );
}
