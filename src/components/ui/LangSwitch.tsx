"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LOCALES, LOCALE_STORAGE_KEY, switchLocalePath, type Locale } from "@/i18n/config";

export type LangSwitchLabels = {
  /** Nom du groupe (« Langue »), dans la langue de la page. */
  label: string;
  /** Nom accessible du lien vers l'autre langue, rédigé dans CETTE autre langue. */
  switchLabel: string;
};

/**
 * Sélecteur « FR / EN » : la langue courante en texte, l'autre en lien vers
 * la même page dans cette langue. Le choix est mémorisé (redirection de la racine).
 */
export function LangSwitch({
  lang,
  labels,
  className = "",
}: {
  lang: Locale;
  labels: LangSwitchLabels;
  className?: string;
}) {
  const pathname = usePathname();

  const remember = (l: Locale) => {
    try {
      localStorage.setItem(LOCALE_STORAGE_KEY, l);
    } catch {
      // Stockage indisponible (navigation privée…) : le lien fonctionne quand même.
    }
  };

  return (
    <div role="group" aria-label={labels.label} className={`inline-flex min-h-11 items-center ${className}`}>
      {LOCALES.map((l, i) => (
        <span key={l} className="inline-flex items-center">
          {i > 0 && (
            <span aria-hidden="true" className="text-muted">
              /
            </span>
          )}
          {l === lang ? (
            <span lang={l} className="inline-flex min-h-11 items-center px-1.5">
              {l.toUpperCase()}
            </span>
          ) : (
            <Link
              href={switchLocalePath(pathname, l)}
              lang={l}
              hrefLang={l}
              aria-label={labels.switchLabel}
              onClick={() => remember(l)}
              className="inline-flex min-h-11 items-center px-1.5 text-muted transition-colors hover:text-fg"
            >
              {l.toUpperCase()}
            </Link>
          )}
        </span>
      ))}
    </div>
  );
}
