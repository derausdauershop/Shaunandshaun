import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { KmMarker } from "@/components/brand/km-marker";
import { Button } from "@/components/ui/button";
import { ARTICLES, articleBySlug } from "@/content/articles";

export function generateStaticParams() {
  return ARTICLES.map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const a = articleBySlug((await params).slug);
  return a ? { title: a.title, description: a.teaser } : {};
}

export default async function ArticlePage({ params }: { params: Promise<{ slug: string }> }) {
  const a = articleBySlug((await params).slug);
  if (!a) notFound();

  return (
    <article className="px-4 py-14 sm:px-8 lg:py-20">
      <div className="mx-auto max-w-3xl">
        <KmMarker km="00" label={a.category} />
        <h1 className="mt-6 text-balance text-5xl sm:text-7xl">{a.title}</h1>
        <p className="mt-4 text-xl text-muted-foreground">{a.teaser}</p>
        {a.author && <p className="mt-4 font-mono text-xs uppercase tracking-[0.2em]">von {a.author}</p>}
        <div className="mt-10 space-y-5 border-t border-ink/10 pt-10 text-lg leading-relaxed">
          {a.blocks.map((b, i) =>
            b.type === "h" ? (
              <h2 key={i} className="pt-4 text-3xl">
                {b.text}
              </h2>
            ) : (
              <p key={i}>{b.text}</p>
            ),
          )}
        </div>
        <Button asChild variant="outline" className="mt-12">
          <Link href="/magazin">← Zum Magazin</Link>
        </Button>
      </div>
    </article>
  );
}
