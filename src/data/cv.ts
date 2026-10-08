import { statSync } from "node:fs";
import { join } from "node:path";
import type { Locale } from "@/i18n/config";

/**
 * CV en PDF (public/cv/), un par langue. Module serveur uniquement : la taille
 * est lue sur le disque au build, elle suit donc toute mise à jour du fichier.
 */
const CV_FILES: Record<Locale, string> = {
  fr: "/cv/eliot-pechdimaldji-cv-fr.pdf",
  en: "/cv/eliot-pechdimaldji-cv-en.pdf",
};

export type CvFile = { lang: Locale; href: string; bytes: number };

export function getCv(lang: Locale): CvFile {
  const href = CV_FILES[lang];
  // Échoue au build si le PDF manque, plutôt que de publier un lien mort.
  const { size } = statSync(join(process.cwd(), "public", href));
  return { lang, href, bytes: size };
}

/** Taille lisible arrondie au kilo-octet : « 102 Ko » / « 102 KB ». */
export const formatSize = (bytes: number, unit: string, lang: Locale) =>
  `${new Intl.NumberFormat(lang).format(Math.max(1, Math.round(bytes / 1024)))} ${unit}`;
