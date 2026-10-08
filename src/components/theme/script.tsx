// Thème clair/sombre : constantes et script anti-flash (sans "use client" :
// importable par les layouts serveur comme par le bouton client).

export type Theme = "light" | "dark";

/** Clé localStorage du thème forcé ; absente = le site suit le système. */
export const THEME_STORAGE_KEY = "theme";

/** Couleurs de la barre du navigateur (theme-color), = --bg de chaque thème. */
export const THEME_COLORS: Record<Theme, string> = { dark: "#0F0F0D", light: "#F5F0E6" };

/**
 * Lu dans le <head> avant le premier rendu : pose data-theme si le visiteur a
 * forcé un thème. localStorage peut être indisponible (navigation privée,
 * stockage bloqué) : try/catch, et le CSS retombe sur prefers-color-scheme.
 */
const SCRIPT = `(function(){try{var t=localStorage.getItem(${JSON.stringify(THEME_STORAGE_KEY)});if(t==="light"||t==="dark")document.documentElement.setAttribute("data-theme",t)}catch(e){}})()`;

/** <script> inline à placer dans le <head> des layouts racines. */
export function ThemeScript() {
  return <script dangerouslySetInnerHTML={{ __html: SCRIPT }} />;
}
