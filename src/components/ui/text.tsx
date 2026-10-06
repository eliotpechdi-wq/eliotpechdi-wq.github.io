import type { ReactNode } from "react";

/** Titre avec un mot mis en italique (si `em` figure dans `title`). */
export function TitleWithEm({
  title,
  em,
  emClassName,
}: {
  title: string;
  em?: string;
  emClassName?: string;
}): ReactNode {
  if (!em) return title;
  const i = title.indexOf(em);
  if (i < 0) return title;
  return (
    <>
      {title.slice(0, i)}
      <em className={emClassName}>{em}</em>
      {title.slice(i + em.length)}
    </>
  );
}

/** Entoure une citation de guillemets français (sauf s'ils y sont déjà). */
export function withGuillemets(text: string) {
  const t = text.trim();
  if (t.startsWith("«")) return t;
  return `« ${t} »`;
}

const ROMAN = ["i", "ii", "iii", "iv", "v", "vi", "vii", "viii", "ix", "x"];
/** 0 → "i.", 1 → "ii.", … */
export const romanStep = (index: number) => `${ROMAN[index] ?? index + 1}.`;

/** Paragraphes séparés par une ligne vide. */
export const paragraphs = (body: string) =>
  body
    .split(/\n\s*\n/)
    .map((p) => p.trim())
    .filter(Boolean);
