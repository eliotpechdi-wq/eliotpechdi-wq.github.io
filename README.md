# eliotpechdi-wq.github.io

Portfolio personnel — Next.js (export statique) hébergé sur GitHub Pages : https://eliotpechdi-wq.github.io

## Développer en local

```bash
npm install
npm run dev
```

Puis ouvrir http://localhost:3000.

## Modifier le contenu

- `src/data/site.ts` — nom, accroche, présentation, liens de contact
- `src/data/projects.ts` — liste des projets (une page `/projets/<slug>/` par projet)

## Déploiement

Chaque push sur `main` déclenche `.github/workflows/deploy.yml`, qui construit le site (`out/`) et le publie sur GitHub Pages.
