import type { Metadata } from "next";
import { Reveal, Stagger, StaggerItem } from "@/components/motion";
import { site } from "@/data/site";
import { SiteFooter } from "@/components/ui/SiteFooter";
import { paragraphs, withGuillemets } from "@/components/ui/text";

export const metadata: Metadata = {
  title: "Profil",
  description: site.quote,
};

const TILE_COLORS = [
  "bg-red text-white",
  "bg-yellow text-bg",
  "bg-blue text-white",
  "bg-cream text-bg",
];

export default function ProfilePage() {
  const tiles = [
    ...site.stats.map((s) => ({ value: s.value, label: s.label, big: true })),
    { value: site.school, label: "formation", big: false },
    { value: site.lookingFor, label: "je recherche", big: false },
  ].filter((t) => t.value);

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
                Profil
              </h1>
            </Reveal>
          </div>
          <div className="mx-auto grid max-w-[1360px] gap-10 px-5 pb-16 pt-8 md:grid-cols-[repeat(auto-fit,minmax(min(100%,440px),1fr))] md:gap-[72px] md:px-10 md:pb-[120px] md:pt-20">
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
