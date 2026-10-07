import type { Metadata } from "next";
import { projects } from "@/data/projects";
import { INTRO } from "@/data/site";
import { Reveal, Stagger, StaggerItem } from "@/components/motion";
import { ProjectCard } from "@/components/ui/ProjectCard";
import { SiteFooter } from "@/components/ui/SiteFooter";

export const metadata: Metadata = {
  title: "Projets",
  description: INTRO,
};

export default function ProjectsPage() {
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
              Les <em>projets</em>
            </h1>
            <span className="hidden text-sm font-semibold text-muted md:inline">
              {String(projects.length).padStart(2, "0")} récits
            </span>
          </Reveal>

          <Stagger stagger={0.1}>
            <ul className="m-0 grid list-none gap-4 p-0 md:grid-cols-[repeat(auto-fit,minmax(min(100%,560px),1fr))] md:gap-6 md:pt-10">
              {projects.map((p) => (
                <li key={p.slug}>
                  <StaggerItem className="h-full">
                    <ProjectCard project={p} />
                  </StaggerItem>
                </li>
              ))}
            </ul>
          </Stagger>
        </section>
      </main>

      <SiteFooter />
    </>
  );
}
