import fr from "./fr.json";
import en from "./en.json";
import type { Locale } from "./config";

export * from "./config";

/** Le type des traductions est dérivé de fr.json (langue de référence). */
export type Dictionary = typeof fr;

// en.json doit avoir EXACTEMENT les clés de fr.json : `satisfies` signale une
// clé manquante, l'égalité stricte des types une clé en trop. Le script
// scripts/check-i18n.mjs (lancé par `npm run build`) vérifie aussi les listes.
type Equal<A, B> = (<T>() => T extends A ? 1 : 2) extends <T>() => T extends B ? 1 : 2 ? true : false;
const sameKeys: Equal<Dictionary, typeof en> = true;
void sameKeys;

const dictionaries = { fr, en: en satisfies Dictionary } satisfies Record<Locale, Dictionary>;

/** Dictionnaire d'une langue (composants serveur uniquement : rien n'est envoyé au client). */
export const getDictionary = (lang: Locale): Dictionary => dictionaries[lang];

/** Remplace les variables {nom} d'un texte traduit. */
export function t(template: string, vars: Record<string, string | number> = {}) {
  return template.replace(/\{(\w+)\}/g, (all, name: string) => (name in vars ? String(vars[name]) : all));
}
