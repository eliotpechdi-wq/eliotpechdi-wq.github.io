export type NavLink = { href: string; label: string; cta?: boolean };

/** Navigation principale, partagée par le header desktop et le menu mobile. */
export const NAV: NavLink[] = [
  { href: "/projets/", label: "Projets" },
  { href: "/profil/", label: "Profil" },
  { href: "/contact/", label: "Me contacter", cta: true },
];

const trim = (path: string) => path.replace(/\/+$/, "");

/**
 * Valeur d'aria-current d'un lien : "page" sur la page elle-même, "true" dans
 * sa rubrique (ex. Projets sur /projets/mon-projet/), sinon rien.
 */
export function currentFor(pathname: string, href: string): "page" | "true" | undefined {
  const p = trim(pathname);
  const h = trim(href);
  if (p === h) return "page";
  if (h && p.startsWith(`${h}/`)) return "true";
  return undefined;
}
