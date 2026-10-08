import type { Accent, Shape } from "@/data/types";

/** Couleurs nommées disponibles pour les formes (variables CSS de globals.css). */
export type ColorName = "red" | "blue" | "yellow" | "cream" | "ink" | "bg" | "fg" | "white";

export const colorVar = (c: ColorName) => `var(--${c})`;

/** Rayons CSS de chaque forme du contrat de données. */
export const shapeRadius: Record<Shape, string> = {
  circle: "50%",
  square: "0",
  quarter: "100% 0 0 0",
  half: "0 0 50% 50%",
};

/*
 * Ratios WCAG mesurés, identiques dans les deux thèmes (les surfaces d'accent
 * ne changent pas avec le thème, sauf le crème : #EFEBE1 sombre, #E8DCC4 clair) :
 *   blue   : blanc 5.39 · soft #EEF1FD 4.78 · pastille --ink sur jaune 11.49
 *   red    : blanc 4.61 · soft blanc 4.61 (#FDEEEB ne faisait que 3.68 sur rouge)
 *   yellow : --ink 11.49 · soft #36332B 7.55 · pastille crème sur --ink 16.12 / 14.24
 *   cream  : --ink 16.12 / 14.24 · soft #36332B 10.59 / 9.36 · pastille idem
 * Les formes utilisent --ink plutôt que --bg : sur fond clair, --bg vaudrait
 * le papier et la forme noire sur rouge deviendrait une forme crème.
 */
type AccentStyle = {
  /** Classes fond + texte (rouge/bleu → texte blanc, jaune/crème → texte sombre). */
  surface: string;
  /** Texte secondaire lisible (≥ 4.5:1) sur ce fond. */
  soft: string;
  /** Couleur de la forme posée sur la carte. */
  cardShape: ColorName;
  /** Formes du hero de la page projet : [grande forme, quart]. */
  heroShapes: [ColorName, ColorName];
  /** Pastille « discipline · année » dans le hero projet. */
  pill: string;
};

export const accentStyles: Record<Accent, AccentStyle> = {
  blue: {
    surface: "bg-blue text-white",
    soft: "text-[#EEF1FD]",
    cardShape: "yellow",
    heroShapes: ["yellow", "red"],
    pill: "bg-yellow text-ink",
  },
  red: {
    surface: "bg-red text-white",
    soft: "text-white",
    cardShape: "ink",
    heroShapes: ["yellow", "ink"],
    pill: "bg-yellow text-ink",
  },
  yellow: {
    surface: "bg-yellow text-ink",
    soft: "text-[#36332B]",
    cardShape: "red",
    heroShapes: ["red", "blue"],
    pill: "bg-ink text-cream",
  },
  cream: {
    surface: "bg-cream text-ink",
    soft: "text-[#36332B]",
    cardShape: "blue",
    heroShapes: ["blue", "red"],
    pill: "bg-ink text-cream",
  },
};
