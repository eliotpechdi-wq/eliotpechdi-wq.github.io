import type { Project } from "./types";

// Contenu réel : sources dans CONTENU.md (hors repo), le CV (recherche-emploi/career-ops/cv.md)
// et le portfolio PDF (~/portfolio/portfolio.pdf).

export const projects: Project[] = [
  {
    slug: "monaco-marine-refit",
    num: "01",
    title: "Des pièces sur mesure pour le refit de yachts",
    titleEm: "sur mesure",
    field: "Pro · Refit naval",
    year: "2025-2026",
    summary:
      "Sept mois en chantier naval : relevés, modélisation et suivi d’une vingtaine d’affaires de refit, de 30 k€ à 650 k€.",
    role: "Assistant chef de projet refit",
    team: "Avec l’atelier, l’architecte naval et le client",
    duration: "7 mois (stage)",
    tools: ["Fusion 360", "Relevés de cotes", "Mise en plan", "Sous-traitance", "Devis"],
    accent: "blue",
    shape: "circle",
    cover: {
      src: "/projets/monaco-marine-refit/remotorisation-berceau-moteur.png",
      alt: "Rendu 3D d’un moteur Scania six cylindres posé sur son berceau mécano-soudé, avec l’inverseur à l’arrière.",
      caption: "Remotorisation Scania : le moteur posé sur son berceau mécano-soudé, modélisé sous Fusion 360.",
    },
    steps: [
      {
        title: "Contexte",
        body: "Monaco Marine est un chantier naval spécialisé dans le refit et la maintenance lourde de yachts et de voiliers de performance. J’y ai suivi une vingtaine d’affaires, de 30 k€ à 650 k€, dont une remotorisation complète à 400 k€.\n\nMon rôle : études de faisabilité, relevés en atelier, modélisation 3D sous Fusion 360, consultation des sous-traitants et devis. Et faire le lien entre le client, l’atelier, l’architecte naval et la direction technique.",
        image: {
          src: "/projets/monaco-marine-refit/support-propulseur.png",
          alt: "À gauche, photo du tunnel du propulseur d’étrave sous la coque ; à droite, la pièce support modélisée en 3D.",
          caption: "Le tunnel du propulseur d’étrave sur le bateau, et la pièce support que j’ai modélisée.",
        },
      },
      {
        title: "Démarche",
        body: "Souvent, il n’y a aucun plan de départ. Pour le support du propulseur d’étrave, je suis parti de relevés de cotes pris sur le bateau. J’ai modélisé la pièce, vérifié les reprises d’efforts, puis elle a été fabriquée et soudée.\n\nMême méthode pour les berceaux moteurs mécano-soudés, l’adaptation des lignes d’arbres et l’ajout de prises de force hydrauliques : relever, modéliser, mettre en plan, faire fabriquer.",
        image: {
          src: "/projets/monaco-marine-refit/plan-chapeau-soude.png",
          alt: "Mise en plan cotée d’un chapeau soudé circulaire en inox 316 : trois vues, une coupe A-A et un cartouche.",
          caption: "Mise en plan d’un chapeau soudé en inox 316, tolérance générale ±0,1 mm.",
        },
      },
      {
        title: "Résultat",
        body: "Le berceau de transport et ses renforts : conçus en moins d’une semaine, puis fabriqués et mis en place sous la coque.\n\nJ’ai aussi préparé une remotorisation bimoteur et le remplacement d’une quille après sinistre. Là, tout se joue sur l’intégration à bord, avec l’architecte naval, l’installateur et les fondeurs.",
        image: {
          src: "/projets/monaco-marine-refit/berceau-transport.png",
          alt: "À gauche, photo d’un berceau métallique blanc sous la coque d’un voilier posé sur remorque ; à droite, sa modélisation 3D.",
          caption: "Le berceau de transport sous la coque, à côté de sa modélisation.",
        },
      },
    ],
  },
  {
    slug: "exail-prototypage",
    num: "02",
    title: "Débloquer des prototypes",
    titleEm: "prototypes",
    field: "Pro · Défense",
    year: "2026",
    summary:
      "Reprendre des projets en retard ou bloqués dans une cellule de prototypage, et aller vite quand il le faut.",
    role: "Ingénieur prototypage",
    team: "Cellule transverse de prototypage",
    duration: "6 mois",
    tools: ["Études mécaniques", "Hydraulique", "Électronique", "Sous-traitance", "Essais"],
    accent: "yellow",
    shape: "square",
    steps: [
      {
        title: "Contexte",
        body: "Chez Exail, j’ai rejoint une cellule transverse de prototypage, dans un environnement de défense. Son travail : reprendre les projets en retard ou bloqués.\n\nLes dossiers arrivaient souvent incomplets. Il fallait d’abord comprendre ce qui coinçait.",
      },
      {
        title: "Démarche",
        body: "En six mois, j’ai repris une vingtaine de projets, de quelques k€ à 100 k€. Pour chacun : diagnostic du dossier, études mécaniques, hydrauliques ou électroniques, choix de réalisation, sous-traitants, puis essais.",
      },
      {
        title: "Résultat",
        body: "Le cas le plus parlant : un support caméra maritime, compact et rapide à déployer. Une semaine entre le besoin et l’essai en mer.\n\nJe l’ai conçu et fabriqué moi-même, avec un petit budget et des matériaux de réemploi. Puis je l’ai amélioré après les essais.",
      },
    ],
  },
  {
    slug: "iot-machine-learning",
    num: "03",
    title: "Faire parler les capteurs",
    titleEm: "capteurs",
    field: "IoT & data",
    year: "2024",
    summary:
      "Maintenance prédictive : des données capteurs jusqu’à un modèle qui reconnaît le régime de fonctionnement d’une machine.",
    role: "Chaîne Python complète, écrite seul",
    team: "Projet de groupe",
    duration: "≈ 2 mois",
    tools: [
      "ESP32",
      "MPU6050",
      "Arduino",
      "MQTT (Mosquitto)",
      "Python",
      "scikit-learn",
      "Ripser / Persim",
    ],
    accent: "red",
    shape: "quarter",
    cover: {
      src: "/projets/iot-machine-learning/matrice-confusion.png",
      alt: "Matrice de confusion sur cinq classes de lowest à highest ; 69 fenêtres de test sur 72 sont sur la diagonale.",
      caption: "Matrice de confusion sur le jeu de test : 69 fenêtres sur 72 bien classées.",
    },
    steps: [
      {
        title: "Contexte",
        body: "Dans un module de data science pour l’industrie, nous avons d’abord monté une chaîne IoT complète. Un ESP32 lit l’accéléromètre et le gyroscope d’un MPU6050 et publie chaque axe en MQTT ; un broker Mosquitto et un client Python (paho-mqtt) enregistrent les mesures dans un CSV.",
        image: {
          src: "/projets/iot-machine-learning/mpu6050-acquisition.png",
          alt: "Signaux d’accélération x, y et z bruts du MPU6050 avec une phase d’agitation puis un retour au repos.",
          caption: "Accélérations brutes reçues via MQTT (≈ 2 580 échantillons par axe).",
        },
      },
      {
        title: "Démarche",
        body: "Le projet de maintenance prédictive portait sur les séries temporelles d’un boîtier multicapteur Bosch, à classer selon 5 états de fonctionnement simulés, de « lowest » à « highest ». J’ai écrit seul toute la chaîne Python : découpe des signaux en fenêtres de 300 points, puis transformation de chacune en image de persistance (analyse topologique des données, ripser + persim) sur 9 grandeurs. Ces images alimentent une forêt aléatoire de 20 arbres, entraînée sur 80 % des fenêtres.",
        image: {
          src: "/projets/iot-machine-learning/images-persistance-tda.png",
          alt: "Six images de persistance 20×20 calculées sur différentes grandeurs mesurées par le capteur.",
          caption: "Images de persistance calculées sur une fenêtre de signal, une par grandeur.",
        },
      },
      {
        title: "Résultat",
        body: "Sur les 20 % de fenêtres gardées pour le test, la forêt aléatoire classe correctement 69 fenêtres sur 72, soit environ 95 %. Les rares erreurs se font entre régimes voisins ; la classe « highest », avec très peu de données, reste la plus fragile.",
        image: {
          src: "/projets/iot-machine-learning/arbre-foret-aleatoire.png",
          alt: "Arbre de décision d’une dizaine de niveaux, exporté depuis scikit-learn.",
          caption: "Un des arbres de décision de la forêt aléatoire.",
        },
      },
    ],
  },
];

export function getProject(slug: string) {
  return projects.find((p) => p.slug === slug);
}
