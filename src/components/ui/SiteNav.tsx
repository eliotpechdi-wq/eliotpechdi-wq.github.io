"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { currentFor, type NavLink } from "./nav";

/** Liens du header (≥ 768px) ; seul composant client du header avec le menu mobile. */
export function SiteNav({ links }: { links: NavLink[] }) {
  const pathname = usePathname();

  return (
    <nav aria-label="Navigation principale" className="hidden gap-2 text-[15px] font-semibold md:flex">
      {links.map((l) => {
        const current = currentFor(pathname, l.href);
        return (
          <Link
            key={l.href}
            href={l.href}
            aria-current={current}
            className={
              l.cta
                ? `inline-flex min-h-11 items-center rounded-full bg-yellow px-5 text-bg ${
                    current ? "ring-2 ring-fg ring-offset-2 ring-offset-bg" : ""
                  }`
                : "inline-flex min-h-11 items-center gap-2 px-4"
            }
          >
            {!l.cta && current && (
              <span aria-hidden="true" className="inline-block size-2 rounded-full bg-red" />
            )}
            {l.label}
          </Link>
        );
      })}
    </nav>
  );
}
