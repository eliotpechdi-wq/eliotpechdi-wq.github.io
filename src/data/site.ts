import type { Site } from "./types";

// Source : CV et profil (recherche-emploi/career-ops).
// Textes (rôle, école, tagline, à propos, citation…) : src/i18n/fr.json et en.json, clé `site`.
export const site: Site = {
  name: "Eliot Pechdimaldji",
  stats: { projects: "08", experience: "3" },
  links: {
    github: "https://github.com/eliotpechdi-wq",
    email: "eliot.pechdi@gmail.com",
    linkedin: "https://www.linkedin.com/in/eliot-pechdimaldji",
  },
  // Formulaire de contact (Web3Forms) : clé publique par conception, elle ne
  // permet que d'envoyer un message vers l'adresse associée au compte.
  web3formsKey: "c3f7a1f0-38ad-4f0d-85a1-6488343474b9",
};
