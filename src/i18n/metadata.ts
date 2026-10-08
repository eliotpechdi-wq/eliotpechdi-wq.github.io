import type { Metadata } from "next";
import { DEFAULT_LOCALE, LOCALES, localePath, type Locale } from "./config";

/** URL publique du site (GitHub Pages) : base des liens canonical / hreflang. */
export const SITE_URL = "https://eliotpechdi-wq.github.io";

/**
 * canonical + hreflang d'une page présente dans toutes les langues.
 * `path` est le chemin sans la langue, ex. "/projets/" ; x-default → version française.
 */
export function alternatesFor(lang: Locale, path = "/"): Metadata["alternates"] {
  return {
    canonical: localePath(lang, path),
    languages: {
      ...Object.fromEntries(LOCALES.map((l) => [l, localePath(l, path)])),
      "x-default": localePath(DEFAULT_LOCALE, path),
    },
  };
}
