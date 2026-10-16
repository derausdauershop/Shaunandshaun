"use client";

import Link from "next/link";
import { useState } from "react";
import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { COMPANY, MAIN_NAV, SECONDARY_NAV } from "@/content/site";

export function MobileNav() {
  const [open, setOpen] = useState(false);
  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="ml-auto sm:ml-0 lg:hidden" aria-label="Menü öffnen">
          <Menu className="!size-6" />
        </Button>
      </SheetTrigger>
      <SheetContent side="right" className="flex w-full flex-col bg-ink text-paper sm:max-w-sm">
        <SheetTitle className="font-mono text-xs uppercase tracking-[0.2em] text-paper/60">Menü</SheetTitle>
        <nav aria-label="Mobile Navigation" className="mt-6">
          <ul className="space-y-1">
            {MAIN_NAV.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className="block py-1.5 font-display text-4xl font-black uppercase italic leading-none hover:text-brand"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
          <ul className="mt-8 space-y-2 border-t border-paper/15 pt-6">
            {SECONDARY_NAV.map((item) => (
              <li key={item.href}>
                <Link href={item.href} onClick={() => setOpen(false)} className="font-mono text-sm uppercase tracking-[0.15em] text-paper/80 hover:text-paper">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <Button asChild variant="brand" className="mt-auto">
          <Link href={COMPANY.voucher} onClick={() => setOpen(false)}>
            Gutschein verschenken
          </Link>
        </Button>
      </SheetContent>
    </Sheet>
  );
}
