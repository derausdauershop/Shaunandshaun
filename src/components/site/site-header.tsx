import Link from "next/link";
import { BrandLogo } from "@/components/brand/brand-logo";
import { Button } from "@/components/ui/button";
import { COMPANY, MAIN_NAV } from "@/content/site";
import { MobileNav } from "./mobile-nav";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 border-b border-ink/10 bg-paper/95 backdrop-blur supports-[backdrop-filter]:bg-paper/80">
      <div className="mx-auto flex h-16 max-w-7xl items-center gap-6 px-4 sm:px-8">
        <Link href="/" aria-label="AUSDAUER – zur Startseite" className="shrink-0">
          <BrandLogo variant="red" className="h-6 sm:h-7" />
        </Link>
        <nav aria-label="Hauptnavigation" className="ml-auto hidden lg:block">
          <ul className="flex items-center gap-6">
            {MAIN_NAV.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="font-display text-[1.05rem] font-bold uppercase tracking-wide text-ink/80 transition-colors hover:text-brand focus-visible:text-brand"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <Button asChild variant="brand" size="sm" className="ml-auto hidden sm:inline-flex lg:ml-0">
          <Link href={COMPANY.voucher}>
            Gutschein
          </Link>
        </Button>
        <MobileNav />
      </div>
    </header>
  );
}
