"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { Locale } from "@/i18n/config";
import { LangSwitch, type LangSwitchLabels } from "./LangSwitch";
import { currentFor, type NavLink } from "./nav";

/** Liens du header (≥ 768px) ; seul composant client du header avec le menu mobile. */
export function SiteNav({
  links,
  label,
  lang,
  langLabels,
}: {
  links: NavLink[];
  label: string;
  lang: Locale;
  langLabels: LangSwitchLabels;
}) {
  const pathname = usePathname();

  const renderLink = (l: NavLink) => {
    const current = currentFor(pathname, l.href);
    return (
      <Link
        key={l.href}
        href={l.href}
        aria-current={current}
        className={
          l.cta
            ? `inline-flex min-h-11 items-center rounded-full bg-yellow px-5 text-ink ${
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
  };

  return (
    <nav aria-label={label} className="hidden gap-2 text-[15px] font-semibold md:flex">
      {links.filter((l) => !l.cta).map(renderLink)}
      {/* Sélecteur de langue, juste avant le bouton « Me contacter » */}
      <LangSwitch lang={lang} labels={langLabels} className="px-2.5" />
      {links.filter((l) => l.cta).map(renderLink)}
    </nav>
  );
}
