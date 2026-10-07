import { HoverCard, HoverReveal, HoverShape } from "@/components/motion";
import type { Project } from "@/data/types";
import { accentStyles } from "./accent";
import { Shape } from "./Shape";
import { TitleWithEm } from "./text";

/**
 * Carte projet (composant serveur) : <HoverCard> rend le lien, soulève la
 * carte au survol / focus clavier, fait tourner la forme et révèle la couverture.
 */
export function ProjectCard({ project: p }: { project: Project }) {
  const a = accentStyles[p.accent];

  return (
    <HoverCard
      href={`/projets/${p.slug}/`}
      className="group flex h-full flex-col overflow-hidden rounded-3xl bg-surface md:rounded-[32px]"
    >
      <div
        className={`relative flex h-[180px] items-center justify-center md:h-auto md:aspect-[16/10] ${a.surface}`}
      >
        {/* Composition géométrique (toujours présente) */}
        <HoverShape className="flex w-[90px] items-center justify-center md:w-[38%]">
          <Shape shape={p.shape} color={a.cardShape} className="w-full" />
        </HoverShape>

        {/* Image de couverture révélée au survol / focus si disponible */}
        {p.cover && (
          <HoverReveal className="absolute inset-0">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={p.cover.src}
              alt=""
              loading="lazy"
              decoding="async"
              className="h-full w-full object-cover"
            />
          </HoverReveal>
        )}

        <span className="absolute left-4 top-3.5 font-display text-[17px] italic md:left-5 md:top-5 md:text-xl">
          N°&nbsp;{p.num}
        </span>
      </div>

      <div className="flex flex-1 items-center justify-between gap-3 px-5 py-[18px] md:items-end md:gap-4 md:px-8 md:pb-8 md:pt-7">
        <div className="flex min-w-0 flex-col gap-1 md:gap-2">
          <span className="text-xs font-semibold text-muted md:text-[13px]">
            {p.field}
            <span className="hidden md:inline"> · {p.year}</span>
          </span>
          <h2 className="m-0 break-words font-display text-2xl font-normal leading-[1.1] md:text-4xl md:leading-[1.05] md:tracking-[-0.02em]">
            <TitleWithEm title={p.title} em={p.titleEm} />
          </h2>
        </div>
        <span
          aria-hidden="true"
          className="flex size-11 shrink-0 items-center justify-center rounded-full border-[1.5px] border-fg md:size-[52px] md:text-xl"
        >
          ↗
        </span>
      </div>
    </HoverCard>
  );
}
