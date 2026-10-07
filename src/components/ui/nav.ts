import { localePath, type Locale } from "@/i18n/config";

export type NavLink = { href: string; label: string; cta?: boolean };

/** Navigation principale, partagée par le header desktop et le menu mobile. */
export function navLinks(
  lang: Locale,
  labels: { projects: string; profile: string; contact: string },
): NavLink[] {
  return [
    { href: localePath(lang, "/projets/"), label: labels.projects },
    { href: localePath(lang, "/profil/"), label: labels.profile },
    { href: localePath(lang, "/contact/"), label: labels.contact, cta: true },
  ];
}

const trim = (path: string) => path.replace(/\/+$/, "");

/**
 * Valeur d'aria-current d'un lien : "page" sur la page elle-même, "true" dans
 * sa rubrique (ex. Projets sur /fr/projets/mon-projet/), sinon rien.
 */
export function currentFor(pathname: string, href: string): "page" | "true" | undefined {
  const p = trim(pathname);
  const h = trim(href);
  if (p === h) return "page";
  if (h && p.startsWith(`${h}/`)) return "true";
  return undefined;
}
