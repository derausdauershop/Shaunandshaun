import { SiteFooter } from "@/components/site/site-footer";
import { SiteHeader } from "@/components/site/site-header";

export default function SiteLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <a href="#inhalt" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:bg-ink focus:px-4 focus:py-2 focus:text-paper">
        Zum Inhalt springen
      </a>
      <SiteHeader />
      <main id="inhalt">{children}</main>
      <SiteFooter />
    </>
  );
}
