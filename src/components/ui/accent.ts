import type { Accent, Shape } from "@/data/types";

/** Couleurs nommées disponibles pour les formes (variables CSS de globals.css). */
export type ColorName = "red" | "blue" | "yellow" | "cream" | "bg" | "fg" | "white";

export const colorVar = (c: ColorName) => `var(--${c})`;

/** Rayons CSS de chaque forme du contrat de données. */
export const shapeRadius: Record<Shape, string> = {
  circle: "50%",
  square: "0",
  quarter: "100% 0 0 0",
  half: "0 0 50% 50%",
};

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
    pill: "bg-yellow text-bg",
  },
  red: {
    surface: "bg-red text-white",
    soft: "text-[#FDEEEB]",
    cardShape: "bg",
    heroShapes: ["yellow", "bg"],
    pill: "bg-yellow text-bg",
  },
  yellow: {
    surface: "bg-yellow text-bg",
    soft: "text-[#36332B]",
    cardShape: "red",
    heroShapes: ["red", "blue"],
    pill: "bg-bg text-fg",
  },
  cream: {
    surface: "bg-cream text-bg",
    soft: "text-[#36332B]",
    cardShape: "blue",
    heroShapes: ["blue", "red"],
    pill: "bg-bg text-fg",
  },
};
