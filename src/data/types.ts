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

export type Site = {
  name: string;
  school: string;
  city: string;
  role: string; // ex. "Élève ingénieur"
  tagline: string;
  lookingFor: string;
  quote: string;
  about: string;
  stats: { value: string; label: string }[];
  links: { github: string; email: string; linkedin: string };
};
