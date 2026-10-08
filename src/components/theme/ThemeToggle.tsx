"use client";

import { useLayoutEffect, useSyncExternalStore } from "react";
import { THEME_STORAGE_KEY, type Theme } from "./script";

export type ThemeLabels = {
  /** Nom accessible avant hydratation (thème encore inconnu côté serveur). */
  toggle: string;
  toLight: string;
  toDark: string;
  /** Libellés visibles (menu mobile) : le thème proposé par le bouton. */
  light: string;
  dark: string;
};

const EVENT = "themechange";
const media = () => window.matchMedia("(prefers-color-scheme: light)");
const systemTheme = (): Theme => (media().matches ? "light" : "dark");

function readStored(): Theme | null {
  try {
    const t = localStorage.getItem(THEME_STORAGE_KEY);
    return t === "light" || t === "dark" ? t : null;
  } catch {
    return null;
  }
}

/** Thème actif : celui forcé sur <html>, sinon celui du système. */
function activeTheme(): Theme {
  const attr = document.documentElement.getAttribute("data-theme");
  return attr === "light" || attr === "dark" ? attr : systemTheme();
}

function subscribe(onChange: () => void) {
  const mq = media();
  // Choix fait dans un autre onglet : on l'applique ici aussi.
  const onStorage = (e: StorageEvent) => {
    if (e.key !== THEME_STORAGE_KEY && e.key !== null) return;
    apply(readStored());
    onChange();
  };
  mq.addEventListener("change", onChange);
  window.addEventListener(EVENT, onChange);
  window.addEventListener("storage", onStorage);
  return () => {
    mq.removeEventListener("change", onChange);
    window.removeEventListener(EVENT, onChange);
    window.removeEventListener("storage", onStorage);
  };
}

function apply(theme: Theme | null) {
  const root = document.documentElement;
  if (theme) root.setAttribute("data-theme", theme);
  else root.removeAttribute("data-theme");
}

/** Bascule clair ↔ sombre ; choisir le thème du système efface la préférence. */
function toggleTheme() {
  const next: Theme = activeTheme() === "dark" ? "light" : "dark";
  const forced = next === systemTheme() ? null : next;
  try {
    if (forced) localStorage.setItem(THEME_STORAGE_KEY, forced);
    else localStorage.removeItem(THEME_STORAGE_KEY);
  } catch {
    // Stockage indisponible : le thème change quand même pour cette page.
  }
  apply(forced);
  window.dispatchEvent(new Event(EVENT));
}

function SunIcon() {
  return (
    <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" aria-hidden="true" focusable="false">
      <circle cx="12" cy="12" r="4.5" fill="currentColor" stroke="none" />
      <path d="M12 2.5v2.2M12 19.3v2.2M2.5 12h2.2M19.3 12h2.2M5.3 5.3l1.6 1.6M17.1 17.1l1.6 1.6M5.3 18.7l1.6-1.6M17.1 6.9l1.6-1.6" />
    </svg>
  );
}

function MoonIcon() {
  return (
    <svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true" focusable="false">
      <path d="M20.5 14.6A8.5 8.5 0 0 1 9.4 3.5a8.5 8.5 0 1 0 11.1 11.1Z" fill="currentColor" />
    </svg>
  );
}

/**
 * Bouton de thème (header et menu mobile). L'icône et le libellé visible
 * dépendent du thème actif par CSS (variantes light:/dark:) : aucun flash,
 * aucun écart d'hydratation. Seul l'aria-label vient de l'état client.
 */
export function ThemeToggle({
  labels,
  showLabel = false,
  className = "",
}: {
  labels: ThemeLabels;
  showLabel?: boolean;
  className?: string;
}) {
  const theme = useSyncExternalStore<Theme | null>(subscribe, activeTheme, () => null);

  // En développement, le remontage du Strict Mode efface l'attribut posé par
  // le script inline : on le réapplique avant le rendu (sans effet en prod).
  useLayoutEffect(() => {
    const stored = readStored();
    if (stored && document.documentElement.getAttribute("data-theme") !== stored) apply(stored);
  }, []);

  const label = theme === null ? labels.toggle : theme === "dark" ? labels.toLight : labels.toDark;

  return (
    <button
      type="button"
      data-theme-toggle=""
      aria-label={label}
      title={showLabel ? undefined : label}
      onClick={toggleTheme}
      className={`inline-flex min-h-11 min-w-11 cursor-pointer items-center justify-center gap-3 rounded-full ${className}`}
    >
      <span className="inline-flex light:hidden">
        <SunIcon />
      </span>
      <span className="hidden light:inline-flex">
        <MoonIcon />
      </span>
      {showLabel && (
        <>
          <span className="light:hidden">{labels.light}</span>
          <span className="hidden light:inline">{labels.dark}</span>
        </>
      )}
    </button>
  );
}
