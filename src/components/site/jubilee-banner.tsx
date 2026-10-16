"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { COMPANY } from "@/content/site";
import { useToday } from "@/hooks/use-today";

/** 40-year banner, shown only in the anniversary year (checked in the browser). */
export function JubileeBanner({ buildDay }: { buildDay: string }) {
  if (Number(useToday(buildDay).slice(0, 4)) !== COMPANY.founded + 40) return null;
  return (
    <Link href="/magazin/40-jahre-ausdauer" className="group block bg-brand text-brand-foreground">
      <div className="mx-auto flex max-w-7xl items-center gap-4 px-4 py-4 sm:px-8">
        <span className="font-display text-3xl font-black italic tabular">40</span>
        <span className="font-display text-lg font-bold uppercase leading-tight">Jahre AUSDAUER · Eine Vision. Zwei Menschen. 40 Jahre Ausdauer.</span>
        <ArrowRight className="ml-auto size-5 shrink-0 transition-transform group-hover:translate-x-1" />
      </div>
    </Link>
  );
}
