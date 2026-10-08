// Contrat de données partagé entre l'intégration (UI) et le contenu.
export type Shape = "circle" | "square" | "quarter" | "half";
export type Accent = "red" | "blue" | "yellow" | "cream";

export type Img = { src: string; alt: string; caption?: string };

export type Step = { title: string; body: string; image?: Img };

export type Project = {
  slug: string;
  num: string; // "01"
  title: string;
  titleEm?: string; // mot du titre mis en italique
  field: string; // discipline, ex. "Matériaux & essais"
  year: string;
  summary: string; // une phrase
  role: string;
  team: string; // ex. "Équipe de 3"
  duration: string;
  tools: string[];
  accent: Accent; // couleur de la carte
  shape: Shape; // forme dessinée sur la carte
  cover?: Img;
  steps: Step[]; // Contexte, Démarche, Résultat
  quote?: string;
  repo?: string;
  demo?: string;
};

/**
 * Données non textuelles d'un projet (src/data/projects.ts). Les textes
 * (titre, récit, légendes…) sont dans src/i18n/<langue>.json sous
 * projects.items.<slug> ; localizeProject() assemble le `Project` complet.
 */
export type ProjectData = Pick<Project, "slug" | "num" | "year" | "accent" | "shape" | "repo" | "demo"> & {
  cover?: string; // chemin de l'image de couverture
  steps: { image?: string }[]; // une entrée par étape du récit (dans l'ordre du JSON)
};

/** Textes d'un projet dans le dictionnaire (projects.items.<slug>). */
export type ProjectText = Pick<Project, "title" | "titleEm" | "field" | "summary" | "role" | "team" | "duration" | "tools" | "quote"> & {
  cover?: { alt: string; caption?: string };
  steps: { title: string; body: string; image?: { alt: string; caption?: string } }[];
};

/** Données non textuelles du site ; les textes (tagline, about…) sont dans src/i18n/. */
export type Site = {
  name: string;
  stats: { projects: string; experience: string }; // valeurs des tuiles du profil
  links: { github: string; email: string; linkedin: string };
  /** Clé d'accès Web3Forms du formulaire de contact (publique par conception). */
  web3formsKey: string;
};
