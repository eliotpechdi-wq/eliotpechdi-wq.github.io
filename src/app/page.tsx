import { projects } from "@/data/projects";
import { Marquee, Reveal, ShapesIntro, Stagger, StaggerItem } from "@/components/motion";
import { site } from "@/data/site";
import { MobileMenu, type NavLink } from "@/components/ui/MobileMenu";
import { ProjectCard } from "@/components/ui/ProjectCard";
import { SiteFooter } from "@/components/ui/SiteFooter";
import { SiteHeader } from "@/components/ui/SiteHeader";
import { paragraphs, withGuillemets } from "@/components/ui/text";

// Phrase d'accroche sous le titre (non présente dans le contrat `Site`).
const INTRO =
  "Du prototype physique au SaaS IA. Chaque projet est raconté comme un récit : un problème, des essais, un résultat.";

const NAV: NavLink[] = [
  { href: "#projets", label: "Projets" },
  { href: "#profil", label: "Profil" },
  { href: "#contact", label: "Me contacter", cta: true },
];

/** Tagline : dernier mot en italique jaune, retour à la ligne (desktop) avant l'avant-dernier mot. */
function Tagline({ text }: { text: string }) {
  const m = text.trim().match(/^(.*?)(\S+?)([.!?…]*)$/u);
  if (!m) return <>{text}</>;
  const [, before, last, punct] = m;
  const words = before.trim().split(/\s+/).filter(Boolean);
  const head = words.length >= 3 ? words.slice(0, -1).join(" ") : "";
  const tail = words.length >= 3 ? words.at(-1) : words.join(" ");
  return (
    <>
      {head && (
        <>
          {head}
          <br className="hidden md:inline" />{" "}
        </>
      )}
      {tail && <>{tail} </>}
      <em className="font-semibold text-yellow">{last}</em>
      {punct}
    </>
  );
}

// Disciplines du bandeau défilant (dédoublonnées depuis les projets).
const BAND = [...new Set(projects.map((p) => p.field))];
const BAND_MARKS = ["rounded-full bg-red", "bg-yellow", "rounded-[100%_0_0_0] bg-blue", "rounded-full bg-cream"];

const TILE_COLORS = [
  "bg-red text-white",
  "bg-yellow text-bg",
  "bg-blue text-white",
  "bg-cream text-bg",
];

export default function Home() {
  const tiles = [
    ...site.stats.map((s) => ({ value: s.value, label: s.label, big: true })),
    { value: site.school, label: "formation", big: false },
    { value: site.lookingFor, label: "je recherche", big: false },
  ].filter((t) => t.value);

  return (
    <>
      <SiteHeader homeHref="#top">
        <nav aria-label="Navigation principale" className="hidden gap-2 text-[15px] font-semibold md:flex">
          {NAV.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className={
                l.cta
                  ? "inline-flex min-h-11 items-center rounded-full bg-yellow px-5 text-bg"
                  : "inline-flex min-h-11 items-center px-4"
              }
            >
              {l.label}
            </a>
          ))}
        </nav>
        <MobileMenu links={NAV} />
      </SiteHeader>

      <main id="contenu">
        {/* ——— Hero ——— */}
        <section
          id="top"
          className="mx-auto grid max-w-[1360px] items-center gap-6 px-5 pb-8 pt-10 md:grid-cols-[repeat(auto-fit,minmax(min(100%,520px),1fr))] md:gap-14 md:px-10 md:pb-[120px] md:pt-24"
        >
          <Reveal className="flex flex-col gap-6 md:gap-9">
            <p className="m-0 text-[13px] font-semibold text-muted md:text-sm">
              {[site.role, site.school].filter(Boolean).join(" · ")}
              {site.city && <span className="hidden md:inline"> · {site.city}</span>}
            </p>
            <h1 className="m-0 font-display text-[clamp(44px,15vw,58px)] font-light leading-[0.95] tracking-[-0.035em] md:text-[clamp(60px,8vw,132px)]">
              <Tagline text={site.tagline} />
            </h1>
            <p className="m-0 hidden max-w-[500px] text-xl leading-normal text-soft md:block">
              {INTRO}
            </p>

            {/* Bandeau de formes (mobile) */}
            <div aria-hidden="true" className="md:hidden">
              <ShapesIntro className="grid h-20 grid-cols-4 grid-rows-1 gap-2" itemClassName="h-full">
                <div data-shape="quarter" className="h-full w-full rounded-[100%_0_0_0] bg-blue" />
                <div data-shape="circle" className="h-full w-full rounded-full bg-red" />
                <div data-shape="bar" className="h-full w-full rounded-[0_0_0_100%] bg-cream" />
                <div data-shape="square" className="h-full w-full bg-yellow" />
              </ShapesIntro>
            </div>
            <a
              href="#projets"
              className="inline-flex min-h-12 items-center self-start rounded-full bg-yellow px-[22px] text-[15px] font-bold text-bg md:hidden"
            >
              Voir les projets ↓
            </a>
          </Reveal>

          {/* Composition 2×2 (desktop) */}
          <div aria-hidden="true" className="hidden w-full max-w-[640px] justify-self-center md:block">
            <ShapesIntro className="grid aspect-square grid-cols-2 grid-rows-2 gap-3.5" itemClassName="h-full">
              <div data-shape="quarter" className="h-full w-full rounded-[100%_0_0_0] bg-blue" />
              <div data-shape="circle" className="h-full w-full rounded-full bg-red" />
              <div data-shape="bar" className="flex h-full w-full items-end justify-end rounded-[0_0_0_100%] bg-cream p-5">
                <span className="font-display text-[22px] italic text-bg">vol. 01</span>
              </div>
              <div data-shape="square" className="h-full w-full bg-yellow" />
            </ShapesIntro>
          </div>
        </section>

        {/* ——— Bandeau des disciplines ——— */}
        <div aria-hidden="true" className="border-y border-line">
          <Marquee speed={40} className="py-5 md:py-7">
            {BAND.map((item, i) => (
              <span
                key={item}
                className="inline-flex items-center gap-8 pr-8 font-display text-[28px] font-light italic tracking-[-0.02em] md:gap-12 md:pr-12 md:text-[44px]"
              >
                {item}
                <span className={`inline-block size-4 md:size-6 ${BAND_MARKS[i % BAND_MARKS.length]}`} />
              </span>
            ))}
          </Marquee>
        </div>

        {/* ——— Projets ——— */}
        <section
          id="projets"
          aria-labelledby="projets-titre"
          className="mx-auto max-w-[1360px] border-t border-line px-5 py-8 md:border-t-0 md:px-10 md:pb-[120px] md:pt-10"
        >
          <Reveal className="mb-6 flex flex-wrap items-baseline justify-between gap-6 border-line md:mb-0 md:border-b md:pb-10">
            <h2
              id="projets-titre"
              className="m-0 font-display text-[44px] font-light tracking-[-0.03em] md:text-[80px]"
            >
              Les <em>projets</em>
            </h2>
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

        {/* ——— Profil ——— */}
        <section id="profil" aria-labelledby="profil-titre" className="border-t border-line">
          <h2 id="profil-titre" className="sr-only">
            Profil
          </h2>
          <div className="mx-auto grid max-w-[1360px] gap-10 px-5 py-16 md:grid-cols-[repeat(auto-fit,minmax(min(100%,440px),1fr))] md:gap-[72px] md:px-10 md:py-[120px]">
            <Reveal className="flex flex-col gap-8">
              <blockquote className="m-0 font-display text-[30px] font-light italic leading-[1.2] tracking-[-0.015em] md:text-[44px]">
                <p className="m-0">{withGuillemets(site.quote)}</p>
              </blockquote>
              {site.about && (
                <div className="flex max-w-[560px] flex-col gap-4 text-[17px] leading-relaxed text-soft md:text-[19px]">
                  {paragraphs(site.about).map((para, i) => (
                    <p key={i} className="m-0">
                      {para}
                    </p>
                  ))}
                </div>
              )}
            </Reveal>

            <Stagger>
              <dl className="m-0 grid grid-cols-2 content-start gap-3.5">
              {tiles.map((t, i) => (
                <StaggerItem
                  key={`${t.label}-${i}`}
                  className={`flex min-h-[140px] flex-col justify-between gap-4 rounded-3xl p-5 md:p-6 ${TILE_COLORS[i % TILE_COLORS.length]}`}
                >
                  <dt className="order-2 font-semibold">{t.label}</dt>
                  <dd
                    className={`order-1 m-0 break-words font-display leading-[1.05] ${
                      t.big ? "text-4xl md:text-[44px]" : "text-[22px] md:text-[28px]"
                    }`}
                  >
                    {t.value}
                  </dd>
                </StaggerItem>
              ))}
              </dl>
            </Stagger>
          </div>
        </section>
      </main>

      <SiteFooter />
    </>
  );
}
