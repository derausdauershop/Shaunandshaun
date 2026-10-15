import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { TEMPLATES, templateById } from "@/components/templates/registry";

export const metadata: Metadata = { robots: { index: false, follow: false } };

export function generateStaticParams() {
  return TEMPLATES.map((t) => ({ id: t.id }));
}

/** A single template at its real size – this is what the export script prints/screenshots. */
export default async function TemplatePage({ params }: { params: Promise<{ id: string }> }) {
  const t = templateById((await params).id);
  if (!t) notFound();
  const page = `@page{size:${t.size.w}${t.size.unit} ${t.size.h}${t.size.unit};margin:0}html,body{margin:0!important;background:#fff!important}`;
  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: page }} />
      <div id="artboard" className="w-fit">
        <t.Component />
      </div>
    </>
  );
}
