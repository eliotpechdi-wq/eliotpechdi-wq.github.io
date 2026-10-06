import type { ReactNode } from "react";
import Link from "next/link";
import { site } from "@/data/site";

/** Logo : cercle rouge + carré jaune + prénom en italique. */
function Logo({ href }: { href: string }) {
  const className = "flex min-h-11 items-center gap-1.5 md:gap-2";
  const content = (
    <>
      <span aria-hidden="true" className="inline-block size-4 rounded-full bg-red md:size-5" />
      <span aria-hidden="true" className="inline-block size-4 bg-yellow md:size-5" />
      <span className="ml-1.5 font-display text-[22px] italic md:ml-2 md:text-2xl">
        {site.name}
      </span>
    </>
  );
  // Ancre interne (#top) : simple <a> ; sinon navigation Next.
  return href.startsWith("#") ? (
    <a href={href} className={className}>
      {content}
    </a>
  ) : (
    <Link href={href} className={className}>
      {content}
    </Link>
  );
}

/** Header sticky commun ; le contenu de droite (navigation) est passé en enfant. */
export function SiteHeader({ homeHref = "/", children }: { homeHref?: string; children: ReactNode }) {
  return (
    <header className="sticky top-0 z-10 border-b border-line bg-bg">
      <div className="mx-auto flex min-h-16 max-w-[1360px] items-center justify-between gap-4 px-5 md:min-h-[76px] md:gap-6 md:px-10">
        <Logo href={homeHref} />
        {children}
      </div>
    </header>
  );
}
