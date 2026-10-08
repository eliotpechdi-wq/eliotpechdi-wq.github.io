import Link from "next/link";
import { site } from "@/data/site";
import { localePath, type Dictionary, type Locale } from "@/i18n";
import type { LangSwitchLabels } from "./LangSwitch";
import { MobileMenu } from "./MobileMenu";
import { navLinks } from "./nav";
import { SiteNav } from "./SiteNav";

/** Logo : cercle rouge + carré jaune + prénom en italique, ramène à l'accueil. */
function Logo({ href }: { href: string }) {
  return (
    <Link href={href} className="flex min-h-11 items-center gap-1.5 md:gap-2">
      <span aria-hidden="true" className="inline-block size-4 rounded-full bg-red md:size-5" />
      <span aria-hidden="true" className="inline-block size-4 bg-yellow md:size-5" />
      <span className="ml-1.5 font-display text-[22px] italic md:ml-2 md:text-2xl">
        {site.name}
      </span>
    </Link>
  );
}

/** Header sticky commun à toutes les pages (rendu par le layout racine). */
export function SiteHeader({ lang, dict }: { lang: Locale; dict: Dictionary }) {
  const links = navLinks(lang, dict.nav);
  const langLabels: LangSwitchLabels = { label: dict.lang.label, switchLabel: dict.lang.switchLabel };

  return (
    <header className="sticky top-0 z-10 border-b border-line bg-bg">
      <div className="mx-auto flex min-h-16 max-w-[1360px] items-center justify-between gap-4 px-5 md:min-h-[76px] md:gap-6 md:px-10">
        <Logo href={localePath(lang)} />
        <SiteNav links={links} label={dict.nav.label} lang={lang} langLabels={langLabels} />
        <MobileMenu links={links} labels={dict.nav.menu} lang={lang} langLabels={langLabels} />
      </div>
    </header>
  );
}
