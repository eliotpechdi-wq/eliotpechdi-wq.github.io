// Configuration des langues, sans les dictionnaires : importable côté client.

/** Langues du site ; le français est la langue de référence. */
export const LOCALES = ["fr", "en"] as const;
export type Locale = (typeof LOCALES)[number];
export const DEFAULT_LOCALE: Locale = "fr";

/** Clé localStorage du choix de langue (sélecteur + redirection de la racine). */
export const LOCALE_STORAGE_KEY = "lang";

export const hasLocale = (value: string): value is Locale => (LOCALES as readonly string[]).includes(value);

/** Chemin localisé : localePath("en", "/projets/") → "/en/projets/". */
export const localePath = (lang: Locale, path = "/") => `/${lang}${path}`;

/** Remplace la langue en tête d'un chemin : "/fr/profil/" → "/en/profil/". */
export function switchLocalePath(pathname: string, lang: Locale) {
  const rest = pathname.replace(/^\/(fr|en)(?=\/|$)/, "");
  return localePath(lang, rest.startsWith("/") ? rest : `/${rest}`);
}

/** Autre langue que `lang` (deux langues seulement). */
export const otherLocale = (lang: Locale): Locale => (lang === "fr" ? "en" : "fr");
