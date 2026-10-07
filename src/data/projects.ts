import { getDictionary, type Locale } from "@/i18n";
import type { Project, ProjectData, ProjectText } from "./types";

// Contenu réel : sources dans CONTENU.md (hors repo), le CV (recherche-emploi/career-ops/cv.md)
// et le portfolio PDF (~/portfolio/portfolio.pdf).
// Ici, uniquement les données non textuelles ; les textes sont dans src/i18n/<langue>.json
// sous projects.items.<slug> (même ordre d'étapes que `steps`).

const data: ProjectData[] = [
  {
    slug: "monaco-marine-refit",
    num: "01",
    year: "2025-2026",
    accent: "blue",
    shape: "circle",
    cover: "/projets/monaco-marine-refit/remotorisation-berceau-moteur.png",
    steps: [
      { image: "/projets/monaco-marine-refit/support-propulseur.png" },
      { image: "/projets/monaco-marine-refit/plan-chapeau-soude.png" },
      { image: "/projets/monaco-marine-refit/berceau-transport.png" },
    ],
  },
  {
    slug: "exail-prototypage",
    num: "02",
    year: "2026",
    accent: "yellow",
    shape: "square",
    steps: [{}, {}, {}], // projet confidentiel : texte seul
  },
  {
    slug: "iot-machine-learning",
    num: "03",
    year: "2024",
    accent: "red",
    shape: "quarter",
    cover: "/projets/iot-machine-learning/matrice-confusion.png",
    steps: [
      { image: "/projets/iot-machine-learning/mpu6050-acquisition.png" },
      { image: "/projets/iot-machine-learning/images-persistance-tda.png" },
      { image: "/projets/iot-machine-learning/arbre-foret-aleatoire.png" },
    ],
  },
  {
    slug: "gazon-racing-92",
    num: "04",
    year: "2024",
    accent: "cream",
    shape: "half",
    cover: "/projets/gazon-racing-92/courbes-force-deplacement.png",
    steps: [
      { image: "/projets/gazon-racing-92/protocole-essai-compression.png" },
      { image: "/projets/gazon-racing-92/ecart-moyen-substrats.png" },
      { image: "/projets/gazon-racing-92/ecart-raideur-melanges.png" },
    ],
  },
  {
    slug: "pied-prothetique",
    num: "05",
    year: "2023",
    accent: "blue",
    shape: "circle",
    cover: "/projets/pied-prothetique/pied-rendu.png",
    steps: [
      { image: "/projets/pied-prothetique/pied-rendu-profil.png" },
      { image: "/projets/pied-prothetique/simulation-von-mises.png" },
      { image: "/projets/pied-prothetique/essai-vs-simulation.png" },
    ],
  },
  {
    slug: "san-lucia-off-grid",
    num: "06",
    year: "2025",
    accent: "yellow",
    shape: "square",
    cover: "/projets/san-lucia-off-grid/demande-production-janvier-fevrier.png",
    steps: [
      { image: "/projets/san-lucia-off-grid/demande-mensuelle.png" },
      { image: "/projets/san-lucia-off-grid/profils-eolien-solaire.png" },
      { image: "/projets/san-lucia-off-grid/demande-production-annee.png" },
    ],
  },
  {
    slug: "casita",
    num: "07",
    year: "2025",
    accent: "red",
    shape: "quarter",
    cover: "/projets/casita/parcours-incident-24h.png",
    steps: [
      { image: "/projets/casita/dimensionnement-marche.png" },
      { image: "/projets/casita/value-proposition-canvas.png" },
      { image: "/projets/casita/traitement-incidents.png" },
    ],
  },
  {
    slug: "frein-avion",
    num: "08",
    year: "2024",
    accent: "cream",
    shape: "half",
    cover: "/projets/frein-avion/coupe-aa-disque.png",
    steps: [
      { image: "/projets/frein-avion/cahier-des-charges.png" },
      { image: "/projets/frein-avion/schemas-cinematiques-variantes.png" },
      { image: "/projets/frein-avion/coupe-roulements-montage-o.png" },
    ],
  },
];

/** Assemble un projet complet (données + textes de la langue). */
function localizeProject(p: ProjectData, text: ProjectText): Project {
  return {
    ...p,
    ...text,
    cover: p.cover && text.cover ? { src: p.cover, ...text.cover } : undefined,
    steps: text.steps.map((s, i) => {
      const src = p.steps[i]?.image;
      return { title: s.title, body: s.body, image: src && s.image ? { src, ...s.image } : undefined };
    }),
  };
}

const cache = new Map<Locale, Project[]>();

/** Projets dans la langue demandée (ordre du site). */
export function getProjects(lang: Locale): Project[] {
  let list = cache.get(lang);
  if (!list) {
    const items: Record<string, ProjectText> = getDictionary(lang).projects.items;
    list = data.map((p) => {
      const text = items[p.slug];
      if (!text) throw new Error(`Textes manquants pour le projet « ${p.slug} » (${lang}.json)`);
      return localizeProject(p, text);
    });
    cache.set(lang, list);
  }
  return list;
}

export function getProject(lang: Locale, slug: string) {
  return getProjects(lang).find((p) => p.slug === slug);
}

/** Slugs de tous les projets (generateStaticParams). */
export const projectSlugs = data.map((p) => p.slug);
