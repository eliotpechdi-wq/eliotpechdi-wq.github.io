import { Reveal, ShapesIntro } from "@/components/motion";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getProject, projects } from "@/data/projects";
import type { Shape as ShapeName } from "@/data/types";
import { accentStyles, type ColorName } from "@/components/ui/accent";
import { Shape } from "@/components/ui/Shape";
import { SiteHeader } from "@/components/ui/SiteHeader";
import { TitleWithEm, paragraphs, romanStep, withGuillemets } from "@/components/ui/text";

export const dynamicParams = false;

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata(props: PageProps<"/projets/[slug]">): Promise<Metadata> {
  const project = getProject((await props.params).slug);
  if (!project) return {};
  return {
    title: project.title,
    description: project.summary,
    openGraph: project.cover ? { images: [{ url: project.cover.src, alt: project.cover.alt }] } : undefined,
  };
}

// Formes des étapes : i. cercle rouge, ii. carré jaune, iii. quart bleu (puis on boucle).
const STEP_SHAPES: { shape: ShapeName; color: ColorName }[] = [
  { shape: "circle", color: "red" },
  { shape: "square", color: "yellow" },
  { shape: "quarter", color: "blue" },
];

export default async function ProjectPage(props: PageProps<"/projets/[slug]">) {
  const { slug } = await props.params;
  const project = getProject(slug);
  if (!project) notFound();

  const index = projects.findIndex((p) => p.slug === project.slug);
  const total = String(projects.length).padStart(2, "0");
  const next = projects[(index + 1) % projects.length];
  const a = accentStyles[project.accent];
  const [bigColor, quarterColor] = a.heroShapes;

  const meta = [
    { label: "Rôle", value: project.role },
    { label: "Équipe", value: project.team },
    { label: "Durée", value: project.duration },
    { label: "Outils", value: project.tools.join(", ") },
  ].filter((m) => m.value);

  return (
    <>
      <SiteHeader homeHref="/">
        <nav aria-label="Navigation du projet" className="flex items-center gap-1 text-[15px] font-semibold md:gap-2">
          <Link href="/#projets" className="inline-flex min-h-11 items-center px-2 md:px-4">
            ←&nbsp;<span className="hidden sm:inline">Tous les projets</span>
            <span className="sm:hidden">Projets</span>
          </Link>
          <span className="inline-flex min-h-11 items-center px-2 text-muted md:px-4">
            <span className="sr-only">Projet </span>N°&nbsp;{project.num}&nbsp;/&nbsp;{total}
          </span>
        </nav>
      </SiteHeader>

      <main id="contenu">
        <article>
          {/* ——— Hero (couleur d'accent du projet) ——— */}
          <section className={`overflow-hidden ${a.surface}`}>
            <div className="mx-auto grid max-w-[1360px] items-end gap-8 px-5 pt-14 md:grid-cols-[repeat(auto-fit,minmax(min(100%,520px),1fr))] md:gap-12 md:px-10 md:pt-24">
              <Reveal className="flex flex-col gap-6 md:gap-7 md:pb-24">
                <span
                  className={`self-start rounded-full px-4 py-2 text-[13px] font-bold md:text-sm ${a.pill}`}
                >
                  {project.field} · {project.year}
                </span>
                <h1 className="m-0 break-words font-display text-[clamp(44px,13vw,56px)] font-light leading-[0.95] tracking-[-0.035em] md:text-[clamp(56px,7.5vw,120px)]">
                  <TitleWithEm title={project.title} em={project.titleEm} emClassName="font-semibold" />
                </h1>
                <p className={`m-0 max-w-[540px] text-lg leading-normal md:text-[21px] ${a.soft}`}>
                  {project.summary}
                </p>
                {(project.repo || project.demo) && (
                  <ul className="m-0 flex list-none flex-wrap gap-3 p-0 text-[15px] font-semibold">
                    {project.repo && (
                      <li>
                        <a
                          href={project.repo}
                          rel="noopener"
                          className="inline-flex min-h-11 items-center rounded-full border-[1.5px] border-current px-5"
                        >
                          Code source ↗
                        </a>
                      </li>
                    )}
                    {project.demo && (
                      <li>
                        <a
                          href={project.demo}
                          rel="noopener"
                          className="inline-flex min-h-11 items-center rounded-full border-[1.5px] border-current px-5"
                        >
                          Démo ↗
                        </a>
                      </li>
                    )}
                  </ul>
                )}
              </Reveal>

              <div
                aria-hidden="true"
                className="relative aspect-square w-full max-w-[240px] justify-self-end md:max-w-[560px]"
              >
                <ShapesIntro className="absolute inset-0" itemClassName="absolute inset-0" delay={0.15}>
                  <div data-shape="circle" className="absolute inset-0">
                    <Shape
                      shape={project.shape}
                      color={bigColor}
                      size="78%"
                      className="absolute -right-[6%] -bottom-[18%]"
                    />
                  </div>
                  <div data-shape="quarter" className="absolute inset-0">
                    <Shape
                      shape="quarter"
                      color={quarterColor}
                      size="36%"
                      className="absolute bottom-0 left-[6%]"
                    />
                  </div>
                </ShapesIntro>
              </div>
            </div>
          </section>

          {/* ——— Bandeau méta ——— */}
          <section aria-label="Fiche du projet" className="mx-auto max-w-[1360px] px-5 md:px-10">
            <Reveal>
            <dl className="m-0 grid grid-cols-1 border-b border-line sm:grid-cols-2 lg:grid-cols-4">
              {meta.map((m, i) => (
                <div
                  key={m.label}
                  className={[
                    "py-6 md:py-7",
                    // mobile : filets horizontaux
                    i > 0 ? "border-t border-line" : "",
                    // 2 colonnes : filet vertical sur la 2e colonne, horizontal sur la 2e ligne
                    i % 2 === 1 ? "sm:border-l sm:pl-6" : "sm:pr-6",
                    i < 2 ? "sm:border-t-0" : "",
                    // 4 colonnes : un seul rang, filets verticaux comme la maquette
                    "lg:border-t-0",
                    i > 0 ? "lg:border-l lg:px-6" : "lg:pl-0 lg:pr-6",
                  ].join(" ")}
                >
                  <dt className="text-[13px] font-semibold text-muted">{m.label}</dt>
                  <dd className="m-0 mt-2 break-words font-display text-[22px] md:text-2xl">{m.value}</dd>
                </div>
              ))}
            </dl>
            </Reveal>
          </section>

          {/* ——— Image principale (absente pour un projet confidentiel : texte seul) ——— */}
          {project.cover && (
            <section className="mx-auto max-w-[1360px] px-5 pb-8 pt-14 md:px-10 md:pb-12 md:pt-24">
              <Reveal>
                <figure className="m-0">
                  <div className="relative aspect-[4/3] overflow-hidden rounded-3xl bg-surface md:aspect-[16/8] md:rounded-[32px]">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={project.cover.src}
                      alt={project.cover.alt}
                      decoding="async"
                      className="absolute inset-0 h-full w-full object-cover"
                    />
                  </div>
                  <figcaption className="mt-3 flex justify-end gap-3 text-sm text-muted">
                    {project.cover.caption && <span>{project.cover.caption}</span>}
                    <span className="font-display text-lg italic">fig. 01</span>
                  </figcaption>
                </figure>
              </Reveal>
            </section>
          )}

          {/* ——— Étapes ——— */}
          <section
            aria-label="Le récit du projet"
            className={`mx-auto flex max-w-[1360px] flex-col gap-16 px-5 pb-20 md:gap-24 md:px-10 md:pb-[120px] ${
              project.cover ? "pt-8 md:pt-12" : "pt-14 md:pt-24"
            }`}
          >
            {project.steps.map((s, i) => {
              const deco = STEP_SHAPES[i % STEP_SHAPES.length];
              return (
                <Reveal
                  key={`${s.title}-${i}`}
                  className={
                    s.image
                      ? "grid items-center gap-8 md:grid-cols-[repeat(auto-fit,minmax(min(100%,440px),1fr))] md:gap-14"
                      : "grid gap-8"
                  }
                >
                  <div className={`flex flex-col gap-5 ${s.image ? "" : "max-w-[760px]"}`}>
                    <div className="flex items-center gap-4">
                      <Shape shape={deco.shape} color={deco.color} size={44} />
                      <span className="font-display text-[22px] italic text-muted">{romanStep(i)}</span>
                    </div>
                    <h2 className="m-0 font-display text-[40px] font-light leading-none tracking-[-0.025em] md:text-[56px]">
                      {s.title}
                    </h2>
                    <div className="flex flex-col gap-4 text-[17px] leading-relaxed text-soft md:text-[19px] md:leading-[1.6]">
                      {paragraphs(s.body).map((para, j) => (
                        <p key={j} className="m-0">
                          {para}
                        </p>
                      ))}
                    </div>
                  </div>

                  {s.image && (
                    <figure className="m-0">
                        <div className="relative aspect-[4/3] overflow-hidden rounded-3xl bg-surface md:rounded-[28px]">
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img
                            src={s.image.src}
                            alt={s.image.alt}
                            loading="lazy"
                            decoding="async"
                            className="absolute inset-0 h-full w-full object-cover"
                          />
                        </div>
                        {s.image.caption && (
                          <figcaption className="mt-3 text-right text-sm text-muted">{s.image.caption}</figcaption>
                        )}
                    </figure>
                  )}
                </Reveal>
              );
            })}
          </section>

          {/* ——— Citation ——— */}
          {project.quote && (
            <section aria-label="Ce que j'en retiens" className="mx-auto max-w-[1360px] px-5 pb-20 md:px-10 md:pb-[120px]">
              <Reveal>
              <blockquote className="m-0 rounded-3xl bg-yellow p-8 font-display text-[28px] font-light italic leading-[1.2] tracking-[-0.015em] text-bg md:rounded-[32px] md:p-16 md:text-[44px]">
                <p className="m-0">{withGuillemets(project.quote)}</p>
              </blockquote>
              </Reveal>
            </section>
          )}
        </article>

        {/* ——— Projet suivant ——— */}
        <Link
          href={`/projets/${next.slug}/`}
          className="block bg-red text-white focus-visible:outline-current focus-visible:-outline-offset-8"
        >
          <div className="mx-auto flex max-w-[1360px] flex-wrap items-end justify-between gap-6 px-5 py-14 md:px-10 md:py-20">
            <div className="flex min-w-0 flex-col gap-3">
              <span className="text-sm font-semibold">Projet suivant · N°&nbsp;{next.num}</span>
              <span className="break-words font-display text-[clamp(40px,11vw,44px)] font-light leading-[0.95] tracking-[-0.035em] md:text-[clamp(44px,6vw,96px)]">
                <TitleWithEm title={next.title} em={next.titleEm} />
              </span>
            </div>
            <span
              aria-hidden="true"
              className="flex size-16 shrink-0 items-center justify-center rounded-full bg-bg text-2xl text-fg md:size-[104px] md:text-4xl"
            >
              →
            </span>
          </div>
        </Link>
      </main>
    </>
  );
}
