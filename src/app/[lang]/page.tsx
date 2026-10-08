import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getProjects } from "@/data/projects";
import { HoverCard, HoverShape, Marquee, Reveal, ShapesIntro } from "@/components/motion";
import { SiteFooter } from "@/components/ui/SiteFooter";
import { getDictionary, hasLocale, localePath } from "@/i18n";
import { alternatesFor } from "@/i18n/metadata";

export async function generateMetadata(props: PageProps<"/[lang]">): Promise<Metadata> {
  const { lang } = await props.params;
  if (!hasLocale(lang)) return {};
  return { alternates: alternatesFor(lang) };
}

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
      <em className="font-semibold text-highlight">{last}</em>
      {punct}
    </>
  );
}

const BAND_MARKS = ["rounded-full bg-red", "bg-yellow", "rounded-[100%_0_0_0] bg-blue", "rounded-full bg-cream"];

export default async function Home(props: PageProps<"/[lang]">) {
  const { lang } = await props.params;
  if (!hasLocale(lang)) notFound();
  const dict = getDictionary(lang);
  const { site } = dict;
  // Disciplines du bandeau défilant (dédoublonnées depuis les projets).
  const band = [...new Set(getProjects(lang).map((p) => p.field))];

  return (
    <>
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
              {site.intro}
            </p>

            {/* Bandeau de formes (mobile) */}
            <div aria-hidden="true" className="md:hidden">
              <ShapesIntro
                playOnceKey="home"
                className="grid h-20 grid-cols-4 grid-rows-1 gap-2"
                itemClassName="h-full"
              >
                <div data-shape="quarter" className="h-full w-full rounded-[100%_0_0_0] bg-blue" />
                <div data-shape="circle" className="h-full w-full rounded-full bg-red" />
                <div data-shape="bar" className="h-full w-full rounded-[0_0_0_100%] bg-cream" />
                <div data-shape="square" className="h-full w-full bg-yellow" />
              </ShapesIntro>
            </div>

            {/* Accès aux projets : pastille jaune + disque rouge dont la flèche pivote au survol */}
            <HoverCard
              href={localePath(lang, "/projets/")}
              className="inline-flex min-h-14 items-center gap-4 self-start rounded-full bg-yellow py-1.5 pl-6 pr-1.5 text-[17px] font-bold text-ink md:min-h-[72px] md:gap-6 md:py-2 md:pl-9 md:pr-2 md:text-xl"
            >
              {dict.home.hero.cta}
              <HoverShape
                rotate={-45}
                scale={1.06}
                className="flex size-11 shrink-0 items-center justify-center rounded-full bg-red text-xl text-white md:size-14 md:text-2xl"
              >
                <span aria-hidden="true">→</span>
              </HoverShape>
            </HoverCard>
          </Reveal>

          {/* Composition 2×2 (desktop) */}
          <div aria-hidden="true" className="hidden w-full max-w-[640px] justify-self-center md:block">
            <ShapesIntro
              playOnceKey="home"
              className="grid aspect-square grid-cols-2 grid-rows-2 gap-3.5"
              itemClassName="h-full"
            >
              <div data-shape="quarter" className="h-full w-full rounded-[100%_0_0_0] bg-blue" />
              <div data-shape="circle" className="h-full w-full rounded-full bg-red" />
              <div data-shape="bar" className="flex h-full w-full items-end justify-end rounded-[0_0_0_100%] bg-cream p-5">
                <span className="font-display text-[22px] italic text-ink">{dict.home.hero.volume}</span>
              </div>
              <div data-shape="square" className="h-full w-full bg-yellow" />
            </ShapesIntro>
          </div>
        </section>

        {/* ——— Bandeau des disciplines ——— */}
        <div aria-hidden="true" className="border-y border-line">
          <Marquee speed={40} className="py-5 md:py-7">
            {band.map((item, i) => (
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
      </main>

      <SiteFooter dict={dict} />
    </>
  );
}
