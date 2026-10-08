import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getProjects } from "@/data/projects";
import { Reveal, Stagger, StaggerItem } from "@/components/motion";
import { ProjectCard } from "@/components/ui/ProjectCard";
import { SiteFooter } from "@/components/ui/SiteFooter";
import { TitleWithEm } from "@/components/ui/text";
import { getDictionary, hasLocale, t } from "@/i18n";
import { alternatesFor } from "@/i18n/metadata";

export async function generateMetadata(props: PageProps<"/[lang]/projets">): Promise<Metadata> {
  const { lang } = await props.params;
  if (!hasLocale(lang)) return {};
  const dict = getDictionary(lang);
  return {
    title: dict.meta.projects.title,
    description: dict.site.intro,
    alternates: alternatesFor(lang, "/projets/"),
  };
}

export default async function ProjectsPage(props: PageProps<"/[lang]/projets">) {
  const { lang } = await props.params;
  if (!hasLocale(lang)) notFound();
  const dict = getDictionary(lang);
  const projects = getProjects(lang);

  return (
    <>
      <main id="contenu">
        <section
          aria-labelledby="projets-titre"
          className="mx-auto max-w-[1360px] px-5 pb-16 pt-10 md:px-10 md:pb-[120px] md:pt-24"
        >
          <Reveal className="mb-6 flex flex-wrap items-baseline justify-between gap-6 border-line md:mb-0 md:border-b md:pb-10">
            <h1
              id="projets-titre"
              className="m-0 font-display text-[44px] font-light tracking-[-0.03em] md:text-[80px]"
            >
              <TitleWithEm title={dict.projects.title} em={dict.projects.titleEm} />
            </h1>
            <span className="hidden text-sm font-semibold text-muted md:inline">
              {t(dict.projects.count, { count: String(projects.length).padStart(2, "0") })}
            </span>
          </Reveal>

          <Stagger stagger={0.1}>
            <ul className="m-0 grid list-none gap-4 p-0 md:grid-cols-[repeat(auto-fit,minmax(min(100%,560px),1fr))] md:gap-6 md:pt-10">
              {projects.map((p) => (
                <li key={p.slug}>
                  <StaggerItem className="h-full">
                    <ProjectCard project={p} lang={lang} dict={dict} />
                  </StaggerItem>
                </li>
              ))}
            </ul>
          </Stagger>
        </section>
      </main>

      <SiteFooter dict={dict} lang={lang} />
    </>
  );
}
