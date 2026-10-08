import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Reveal, Stagger, StaggerItem } from "@/components/motion";
import { site } from "@/data/site";
import { SiteFooter } from "@/components/ui/SiteFooter";
import { paragraphs, withGuillemets } from "@/components/ui/text";
import { getDictionary, hasLocale } from "@/i18n";
import { alternatesFor } from "@/i18n/metadata";

export async function generateMetadata(props: PageProps<"/[lang]/profil">): Promise<Metadata> {
  const { lang } = await props.params;
  if (!hasLocale(lang)) return {};
  const dict = getDictionary(lang);
  return {
    title: dict.meta.profile.title,
    description: dict.site.quote,
    alternates: alternatesFor(lang, "/profil/"),
  };
}

const TILE_COLORS = [
  "bg-red text-white",
  "bg-yellow text-ink",
  "bg-blue text-white",
  "bg-cream text-ink",
];

export default async function ProfilePage(props: PageProps<"/[lang]/profil">) {
  const { lang } = await props.params;
  if (!hasLocale(lang)) notFound();
  const dict = getDictionary(lang);
  const { profile } = dict;

  const tiles = [
    { value: site.stats.projects, label: profile.stats.projects, big: true },
    { value: site.stats.experience, label: profile.stats.experience, big: true },
    { value: dict.site.school, label: profile.tiles.school, big: false },
    { value: dict.site.lookingFor, label: profile.tiles.lookingFor, big: false },
  ].filter((tile) => tile.value);

  return (
    <>
      <main id="contenu">
        <section aria-labelledby="profil-titre">
          <div className="mx-auto max-w-[1360px] px-5 pt-10 md:px-10 md:pt-24">
            <Reveal className="border-line md:border-b md:pb-10">
              <h1
                id="profil-titre"
                className="m-0 font-display text-[44px] font-light tracking-[-0.03em] md:text-[80px]"
              >
                {profile.title}
              </h1>
            </Reveal>
          </div>
          <div className="mx-auto grid max-w-[1360px] gap-10 px-5 pb-16 pt-8 md:grid-cols-[repeat(auto-fit,minmax(min(100%,440px),1fr))] md:gap-[72px] md:px-10 md:pb-[120px] md:pt-20">
            <Reveal className="flex flex-col gap-8">
              <blockquote className="m-0 font-display text-[30px] font-light italic leading-[1.2] tracking-[-0.015em] md:text-[44px]">
                <p className="m-0">{withGuillemets(dict.site.quote, dict.common.quote)}</p>
              </blockquote>
              {dict.site.about && (
                <div className="flex max-w-[560px] flex-col gap-4 text-[17px] leading-relaxed text-soft md:text-[19px]">
                  {paragraphs(dict.site.about).map((para, i) => (
                    <p key={i} className="m-0">
                      {para}
                    </p>
                  ))}
                </div>
              )}
            </Reveal>

            <Stagger>
              <dl className="m-0 grid grid-cols-2 content-start gap-3.5">
              {tiles.map((tile, i) => (
                <StaggerItem
                  key={`${tile.label}-${i}`}
                  className={`flex min-h-[140px] flex-col justify-between gap-4 rounded-3xl p-5 md:p-6 ${TILE_COLORS[i % TILE_COLORS.length]}`}
                >
                  <dt className="order-2 font-semibold">{tile.label}</dt>
                  <dd
                    className={`order-1 m-0 break-words font-display leading-[1.05] ${
                      tile.big ? "text-4xl md:text-[44px]" : "text-[22px] md:text-[28px]"
                    }`}
                  >
                    {tile.value}
                  </dd>
                </StaggerItem>
              ))}
              </dl>
            </Stagger>
          </div>
        </section>
      </main>

      <SiteFooter dict={dict} />
    </>
  );
}
