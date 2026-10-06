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
  {
    slug: "gazon-racing-92",
    num: "04",
    title: "Un gazon sans microplastique",
    titleEm: "microplastique",
    field: "Matériaux & essais",
    year: "2024",
    summary:
      "Trouver, pour le Racing 92, un remplissage de terrain synthétique sans microplastique qui se comporte comme la solution actuelle.",
    role: "Chaîne d’analyse Matlab, écrite seul",
    team: "Projet de groupe",
    duration: "≈ 2 mois",
    tools: ["Essais de compression", "Matlab"],
    accent: "cream",
    shape: "half",
    cover: {
      src: "/projets/gazon-racing-92/courbes-force-deplacement.png",
      alt: "Courbes force–déplacement sur trois cycles de compression pour le substrat RC92 de référence, le Bio TK et le Pinefill.",
      caption:
        "Compression cyclique jusqu’à 2500 N : la référence RC92 face à deux alternatives (données d’essai retracées).",
    },
    steps: [
      {
        title: "Contexte",
        body: "Le Racing 92 exploite deux terrains synthétiques dont le remplissage ne sera plus autorisé en 2031, car il contient des microplastiques. Le club voulait identifier des remplissages alternatifs au comportement mécanique identique à sa solution actuelle (RC92), considérée comme la référence, tout en respectant les exigences de World Rugby.",
        image: {
          src: "/projets/gazon-racing-92/protocole-essai-compression.png",
          alt: "Schémas d’un échantillon au repos, comprimé puis décomprimé, photo de l’échantillon sous la presse et courbes effort–déplacement de trois cycles.",
          caption: "Principe de l’essai : échantillon au repos, comprimé, puis décomprimé, sur 3 cycles (figure du rapport de groupe).",
        },
      },
      {
        title: "Démarche",
        body: "Nous avons testé 17 substrats en compression confinée : 24 mm de matériau dans un tube de 7 cm de diamètre, 3 cycles à 40 mm/min jusqu’à 2500 N (0,65 MPa, la charge de la norme World Rugby). J’ai écrit seul la chaîne d’analyse Matlab : elle découpe chaque essai en cycles et calcule énergies dissipées, tassement, rigidités et raideurs, puis l’écart en % de chaque substrat par rapport au RC92.",
        image: {
          src: "/projets/gazon-racing-92/ecart-moyen-substrats.png",
          alt: "Diagramme en barres de l’écart moyen en pourcentage de chaque substrat testé par rapport à la référence RC92.",
          caption: "Écart moyen à la référence RC92 pour chaque substrat testé (sans pondération).",
        },
      },
      {
        title: "Résultat",
        body: "Aucun produit seul ne reproduit le RC92 : le Bio TK est le plus proche (≈ 20 % d’écart moyen), mais il est seulement compostable. J’ai alors mis en œuvre le modèle de mélange proposé par notre encadrant, sur deux granulats Limonta, par pas de 1 mm d’épaisseur, pour viser la raideur du RC92 en décompression à 2500 N. Les 8 mélanges retenus s’écartent en théorie de ≈ 0,4 % à ≈ 4,2 % de la raideur de référence ; reste à les valider par des essais.",
        image: {
          src: "/projets/gazon-racing-92/ecart-raideur-melanges.png",
          alt: "Diagramme en barres de l’écart théorique de raideur des huit mélanges proposés par rapport au RC92.",
          caption: "Écart théorique de raideur des mélanges proposés par rapport au RC92.",
        },
      },
    ],
  },
  {
    slug: "pied-prothetique",
    num: "05",
    title: "Un pied prothétique pédiatrique",
    titleEm: "prothétique",
    field: "Conception mécanique",
    year: "2023",
    summary:
      "Choisir le couple matériau–procédé, concevoir sous CATIA et confronter essais et simulation pour un pied prothétique.",
    role: "CAO complète sous CATIA",
    team: "Équipe de 3",
    duration: "≈ 3 mois",
    tools: ["CES EduPack (Granta)", "CATIA", "Abaqus", "Matlab", "Excel"],
    accent: "blue",
    shape: "circle",
    cover: {
      src: "/projets/pied-prothetique/pied-rendu.png",
      alt: "Rendu 3D du pied prothétique : platine de fixation carrée, lame évidée et avant-pied en forme de ressort.",
      caption: "Version finale du pied, rendue depuis le fichier STL.",
    },
    steps: [
      {
        title: "Contexte",
        body: "Bureau d’études de semestre 7, avec l’IBHGC des Arts et Métiers : concevoir un pied prothétique pour enfant, du choix du matériau jusqu’à la validation. Le cahier des charges croisait tenue mécanique, prix, empreinte carbone et faisabilité du procédé. L’enjeu : retrouver les courbes dynamiques mesurées sur des pieds en carbone.",
        image: {
          src: "/projets/pied-prothetique/pied-rendu-profil.png",
          alt: "Vue de profil du pied prothétique montrant la lame évidée et l’avant-pied.",
          caption: "Vue de profil : lame évidée et avant-pied, prototype imprimé en PLA.",
        },
      },
      {
        title: "Démarche",
        body: "Avec CES EduPack (Granta), nous avons comparé contreplaqué, aciers, titane, PLA et composite carbone sur la rigidité, la densité, le prix et l’impact carbone. Le composite carbone ressortait comme la piste la plus prometteuse, avec l’infusion de résine comme procédé. J’ai ensuite réalisé toute la CAO du pied sous CATIA, pour un prototype imprimé en PLA, et nous avons traité sous Matlab des acquisitions de marche (marqueurs et plateformes de force) pour estimer angles et moments à la cheville.\n\nLa simulation, sous Abaqus, montre où le pied travaille : les contraintes se concentrent dans la partie verticale et au talon.",
        image: {
          src: "/projets/pied-prothetique/simulation-von-mises.png",
          alt: "Maillage du pied prothétique sous Abaqus, coloré selon la contrainte de von Mises : bleu sur l’avant-pied, vert et jaune dans la lame et le talon.",
          caption: "Simulation sous Abaqus : contraintes de von Mises dans le pied chargé.",
        },
      },
      {
        title: "Résultat",
        body: "En groupe, nous avons validé le pied par simulation et par essais de compression. Les deux essais force–déplacement se superposent à la simulation jusqu’à environ 30 mm d’écrasement, et montent à environ 1300 N : bonne concordance.",
        image: {
          src: "/projets/pied-prothetique/essai-vs-simulation.png",
          alt: "Courbes force–déplacement de deux essais comparées à une courbe de simulation, très proches jusqu’à 30 mm.",
          caption: "Deux essais vs simulation du premier pied (données d’essai retracées).",
        },
      },
    ],
  },
  {
    slug: "san-lucia-off-grid",
    num: "06",
    title: "Une ville 100 % renouvelable",
    titleEm: "renouvelable",
    field: "Énergie · UQ",
    year: "2025",
    summary:
      "Dimensionner le mix éolien et solaire d’une ville isolée fictive pour qu’elle vive hors réseau, heure par heure.",
    role: "Analyse et dimensionnement, rapport individuel",
    team: "Seul",
    duration: "Quelques semaines",
    tools: ["Excel", "Tableaux croisés dynamiques", "Profils horaires (8 760 h)"],
    accent: "yellow",
    shape: "square",
    cover: {
      src: "/projets/san-lucia-off-grid/demande-production-janvier-fevrier.png",
      alt: "Courbes de demande et de production sur une journée moyenne de janvier-février : la production dépasse la demande le matin et passe en dessous le soir.",
      caption:
        "Janvier-février, journée moyenne : production dimensionnée (jaune) face à la demande (blanc). Valeurs de mon rapport, retracées.",
    },
    steps: [
      {
        title: "Contexte",
        body: "Cours de Sustainable Energy à l’University of Queensland. Le sujet : San Lucia, une ville fictive qui veut quitter le réseau et vivre à 100 % d’éolien et de solaire, stockage compris.\n\nJ’ai commencé par la demande. Sur l’année : 1,90 TWh, soit 216,6 MW en moyenne, avec des pics à 9 h et 19 h. Janvier et juin-juillet sont les mois les plus chargés.",
        image: {
          src: "/projets/san-lucia-off-grid/demande-mensuelle.png",
          alt: "Diagramme en barres de la demande mensuelle, entre 141 et 177 GWh ; janvier, juin et juillet sont les plus élevés.",
          caption: "Demande mensuelle de San Lucia, retracée depuis les données horaires du sujet.",
        },
      },
      {
        title: "Démarche",
        body: "Puis la production. Un site éolien de 5,6 MW tourne aussi la nuit ; un site solaire de 1 MW ne produit qu’en journée. La taille du stockage étant fixée, j’ai misé sur le plus régulier : environ 80 % d’éolien et 20 % de solaire.\n\nJ’ai compté un rendement aller-retour de 70 %, en supposant que toute l’énergie passe une fois par le stockage. Puis j’ai cherché le multiplicateur qui couvre les pires mois, janvier et février.",
        image: {
          src: "/projets/san-lucia-off-grid/profils-eolien-solaire.png",
          alt: "Profils de puissance sur une journée moyenne : le site éolien produit entre 1,6 et 3,1 MW toute la journée, le site solaire monte à 0,66 MW vers midi.",
          caption: "Journée moyenne d’un site éolien de 5,6 MW et d’un site solaire de 1 MW.",
        },
      },
      {
        title: "Résultat",
        body: "Il faut 57 éoliennes de 5,6 MW et 57 unités solaires de 1 MW : 376,2 MW installés, dont 319,2 MW d’éolien. En janvier-février, la production couvre 97 % de la demande, 5 535 MWh par jour pour 5 688 MWh demandés.\n\nLe reste de l’année, le surplus du matin est énorme. J’ai proposé de le revendre au réseau. Et j’ai pointé une limite : stocker par pompage d’eau, dans un pays aussi sec, est sans doute une mauvaise idée. L’air comprimé est une piste.",
        image: {
          src: "/projets/san-lucia-off-grid/demande-production-annee.png",
          alt: "Courbes de demande et de production sur une journée moyenne de l’année : large surplus de 6 h à 16 h, léger déficit en soirée.",
          caption: "Journée moyenne sur l’année : gros surplus le matin, léger déficit le soir. Valeurs de mon rapport, retracées.",
        },
      },
    ],
  },
  {
    slug: "casita",
    num: "07",
    title: "Casita, un incident réglé en 24 h",
    titleEm: "24 h",
    field: "Produit · Entrepreneuriat",
    year: "2025",
    summary:
      "Repenser le service client de la location courte durée en Australie, autour d’une promesse : 24 heures ouvrées entre le problème et sa résolution.",
    role: "Participation au développement du service",
    team: "Projet de groupe",
    duration: "Un semestre",
    tools: [
      "Value Proposition Canvas",
      "Parcours utilisateur",
      "Dimensionnement de marché",
      "Prototype d’application mobile",
    ],
    accent: "red",
    shape: "quarter",
    cover: {
      src: "/projets/casita/parcours-incident-24h.png",
      alt: "Logigramme du traitement d’un incident : tri entre incident mineur et majeur, intervention d’un artisan, relogement et remboursement si besoin, en 24 heures ouvrées au maximum.",
      caption: "Le parcours d’un incident chez Casita : 24 heures ouvrées au maximum.",
    },
    steps: [
      {
        title: "Contexte",
        body: "Projet d’innovation en groupe, pendant mon master à l’University of Queensland. Le sujet : l’expérience client dans la location courte durée.\n\nEn étudiant le marché australien et le parcours des voyageurs, nous avons vu où les plateformes existantes coincent : le service client et la gestion des incidents.",
        image: {
          src: "/projets/casita/dimensionnement-marche.png",
          alt: "Cercles imbriqués du dimensionnement de marché, de 8 794 000 visiteurs par an à 400 000 visiteurs de plus de 35 ans, avec les chiffres clés de Brisbane.",
          caption: "Dimensionnement du marché (sources citées sur la planche du projet).",
        },
      },
      {
        title: "Démarche",
        body: "D’abord, la taille du marché. 8 794 000 visiteurs par an selon Tourism Research Australia (2024), dont 879 400 qui louent un logement et 400 000 de plus de 35 ans. Notre cible : 80 000 clients par an, soit 220 par jour. À Brisbane, on compte 15 000 annonces Airbnb.\n\nPuis la proposition de valeur, construite avec un Value Proposition Canvas : annonces vérifiées, hotline 24/7, relogement garanti, partenariats avec des services locaux.",
        image: {
          src: "/projets/casita/value-proposition-canvas.png",
          alt: "Value Proposition Canvas complet : produits et services, créateurs de gains et réducteurs de peines face aux tâches, gains et peines du voyageur.",
          caption: "Notre Value Proposition Canvas.",
        },
      },
      {
        title: "Résultat",
        body: "Le cœur du service tient en une promesse : 24 heures ouvrées au maximum entre le problème et sa résolution. Un incident mineur déclenche l’envoi d’un artisan. Un incident majeur reçoit une réponse en moins de 4 h ; s’il ne peut pas être réglé en 24 h, le client est relogé et remboursé en partie.\n\nNous avons fini par un prototype intégré à une application mobile.",
        image: {
          src: "/projets/casita/traitement-incidents.png",
          alt: "Détail du logigramme : un incident mineur mène à l’envoi d’un artisan ; un incident majeur mène à une réparation en moins de 24 h, ou à un relogement avec remboursement partiel.",
          caption: "Incident mineur ou majeur : les deux chemins vers la résolution.",
        },
      },
    ],
  },
];

export function getProject(slug: string) {
  return projects.find((p) => p.slug === slug);
}
