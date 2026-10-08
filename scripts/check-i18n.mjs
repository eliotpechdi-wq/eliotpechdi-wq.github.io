// Vérifie que src/i18n/en.json a exactement les mêmes clés que fr.json
// (langue de référence) : même arborescence, mêmes longueurs de listes,
// mêmes variables {x}. Lancé par `npm run build` ; échoue au moindre écart.
import { readFileSync } from "node:fs";

const load = (lang) =>
  JSON.parse(readFileSync(new URL(`../src/i18n/${lang}.json`, import.meta.url), "utf8"));

const ref = load("fr");
const errors = [];
const kind = (v) => (Array.isArray(v) ? "array" : v === null ? "null" : typeof v);
const vars = (s) => [...s.matchAll(/\{(\w+)\}/g)].map((m) => m[1]).sort().join(",");

function compare(a, b, path, lang) {
  const ka = kind(a);
  const kb = kind(b);
  if (ka !== kb) {
    errors.push(`${lang}: ${path || "(racine)"} devrait être ${ka}, trouvé ${kb}`);
    return;
  }
  if (ka === "array") {
    if (a.length !== b.length) errors.push(`${lang}: ${path} a ${b.length} éléments au lieu de ${a.length}`);
    a.forEach((v, i) => i < b.length && compare(v, b[i], `${path}[${i}]`, lang));
  } else if (ka === "object") {
    for (const k of Object.keys(a)) {
      const p = path ? `${path}.${k}` : k;
      if (!(k in b)) errors.push(`${lang}: clé manquante ${p}`);
      else compare(a[k], b[k], p, lang);
    }
    for (const k of Object.keys(b)) {
      if (!(k in a)) errors.push(`${lang}: clé en trop ${path ? `${path}.${k}` : k}`);
    }
  } else if (ka === "string") {
    if (vars(a) !== vars(b)) errors.push(`${lang}: ${path} n’a pas les mêmes variables {…} que fr`);
    if (!b.trim()) errors.push(`${lang}: ${path} est vide`);
  }
}

for (const lang of ["en"]) compare(ref, load(lang), "", lang);

if (errors.length) {
  console.error(`✗ Traductions incohérentes (${errors.length}) :\n  ${errors.join("\n  ")}`);
  process.exit(1);
}
console.log("✓ Traductions : en.json a les mêmes clés que fr.json");
