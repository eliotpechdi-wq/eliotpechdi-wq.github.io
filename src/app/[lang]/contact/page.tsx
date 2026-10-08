import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Reveal } from "@/components/motion";
import { ContactForm } from "@/components/contact/ContactForm";
import { CopyEmail } from "@/components/contact/CopyEmail";
import { accentStyles } from "@/components/ui/accent";
import { TitleWithEm } from "@/components/ui/text";
import { formatSize, getCv } from "@/data/cv";
import { site } from "@/data/site";
import { getDictionary, hasLocale, otherLocale, t } from "@/i18n";
import { alternatesFor } from "@/i18n/metadata";

export async function generateMetadata(props: PageProps<"/[lang]/contact">): Promise<Metadata> {
  const { lang } = await props.params;
  if (!hasLocale(lang)) return {};
  const dict = getDictionary(lang);
  return {
    title: dict.meta.contact.title,
    description: t(dict.meta.contact.description, { name: site.name }),
    alternates: alternatesFor(lang, "/contact/"),
  };
}

// Sans JavaScript : le formulaire et le bouton « Copier » sont masqués,
// le lien e-mail (dans <noscript>) prend la place du formulaire.
const NO_JS_CSS = "[data-requires-js]{display:none!important}";

export default async function ContactPage(props: PageProps<"/[lang]/contact">) {
  const { lang } = await props.params;
  if (!hasLocale(lang)) notFound();
  const dict = getDictionary(lang);
  const { contact } = dict;
  const { email, linkedin, github } = site.links;

  const availability = [contact.available, dict.site.lookingFor, dict.site.city].filter(Boolean).join(" · ");

  // CV : la langue de la page d'abord, l'autre en lien secondaire.
  const cv = getCv(lang);
  const otherCv = getCv(otherLocale(lang));
  const size = (bytes: number) => formatSize(bytes, contact.cv.sizeUnit, lang);
  const { blue, cream } = accentStyles;

  const elsewhere = [
    linkedin && { href: linkedin, label: dict.footer.links.linkedin },
    github && { href: github, label: dict.footer.links.github },
  ].filter((l): l is { href: string; label: string } => Boolean(l));

  return (
    <main id="contenu">
      <noscript>
        <style>{NO_JS_CSS}</style>
      </noscript>

      <section aria-labelledby="contact-titre" className="mx-auto max-w-[1360px] px-5 pb-16 pt-10 md:px-10 md:pb-[120px] md:pt-24">
        {/* ——— Titre + disponibilité ——— */}
        <Reveal className="relative flex items-end justify-between gap-6 border-line pb-8 md:border-b md:pb-10">
          <div className="flex flex-col gap-5 md:gap-7">
            <h1
              id="contact-titre"
              className="m-0 font-display text-[clamp(44px,13vw,56px)] font-light leading-[0.95] tracking-[-0.035em] md:text-[clamp(64px,8vw,120px)]"
            >
              <TitleWithEm title={contact.title} em={contact.titleEm} emClassName="text-highlight" />
            </h1>
            <p className="m-0 flex items-start gap-3 text-[15px] font-semibold leading-snug text-soft md:text-lg">
              <span aria-hidden="true" className="mt-[0.3em] inline-block size-3 shrink-0 rounded-full bg-yellow md:size-3.5" />
              {availability}
            </p>
          </div>

          {/* Composition de formes (décorative) */}
          <div aria-hidden="true" className="hidden shrink-0 grid-cols-2 gap-3 sm:grid">
            <span className="block size-14 rounded-[100%_0_0_0] bg-blue md:size-[104px]" />
            <span className="block size-14 rounded-full bg-red md:size-[104px]" />
            <span className="block size-14 bg-yellow md:size-[104px]" />
            <span className="block size-14 rounded-[0_0_50%_50%] shape-cream md:size-[104px]" />
          </div>
        </Reveal>

        <div className="grid gap-12 pt-4 md:grid-cols-[minmax(0,1.45fr)_minmax(320px,1fr)] md:gap-16 md:pt-14 lg:gap-24">
          {/* ——— Formulaire ——— */}
          <Reveal delay={0.05}>
            <div data-requires-js>
              <ContactForm labels={contact.form} email={email} accessKey={site.web3formsKey} lang={lang} />
            </div>
            <noscript>
              <div className="flex flex-col gap-4 rounded-3xl bg-yellow p-7 text-ink md:p-12">
                <p className="m-0 text-lg md:text-xl">{contact.form.noscript}</p>
                <a
                  href={`mailto:${email}`}
                  className="font-display text-[24px] font-light leading-tight underline decoration-2 underline-offset-4 [overflow-wrap:anywhere] sm:text-[32px] md:text-[44px]"
                >
                  {email}
                </a>
              </div>
            </noscript>
          </Reveal>

          {/* ——— En direct : e-mail, réseaux, CV ——— */}
          <Reveal delay={0.12}>
            <aside aria-label={contact.direct.title} className="flex flex-col gap-4">
              <div className={`flex flex-col gap-4 rounded-3xl p-6 md:p-7 ${cream.surface}`}>
                <h2 className={`m-0 text-[15px] font-semibold ${cream.soft}`}>{contact.direct.email}</h2>
                <a
                  href={`mailto:${email}`}
                  className="font-display text-[24px] [overflow-wrap:anywhere] leading-tight tracking-[-0.01em] md:text-[28px]"
                >
                  {email}
                </a>
                <div className="flex flex-wrap items-center gap-2">
                  <CopyEmail email={email} labels={contact.direct} />
                </div>
              </div>

              {elsewhere.length > 0 && (
                <ul className="m-0 flex list-none flex-col p-0">
                  {elsewhere.map((l) => (
                    <li key={l.label} className="border-b border-line">
                      <a
                        href={l.href}
                        rel="me noopener"
                        className="group flex min-h-16 items-center justify-between gap-4 text-xl font-semibold md:text-2xl"
                      >
                        {l.label}
                        <span
                          aria-hidden="true"
                          className="flex size-10 items-center justify-center rounded-full border-2 border-line text-base transition-colors group-hover:border-fg"
                        >
                          ↗
                        </span>
                      </a>
                    </li>
                  ))}
                </ul>
              )}

              <div className={`mt-2 flex flex-col gap-5 rounded-3xl p-6 md:p-7 ${blue.surface}`}>
                <h2 className={`m-0 text-[15px] font-semibold ${blue.soft}`}>{contact.cv.title}</h2>
                <a
                  href={cv.href}
                  download
                  type="application/pdf"
                  className="group flex items-center justify-between gap-4"
                >
                  <span className="flex flex-col gap-1">
                    <span className="font-display text-[26px] leading-tight tracking-[-0.01em] md:text-[32px]">
                      {contact.cv.download}
                    </span>
                    <span className={`text-[15px] font-semibold ${blue.soft}`}>
                      {t(contact.cv.file, { lang: contact.cv.lang, size: size(cv.bytes) })}
                    </span>
                  </span>
                  <span
                    aria-hidden="true"
                    className="flex size-12 shrink-0 items-center justify-center rounded-full bg-yellow text-xl text-ink transition-transform group-hover:translate-y-0.5 md:size-14"
                  >
                    ↓
                  </span>
                </a>
                <a
                  href={otherCv.href}
                  download
                  type="application/pdf"
                  hrefLang={otherCv.lang}
                  className="inline-flex min-h-11 items-center self-start text-[15px] font-semibold underline decoration-2 underline-offset-4"
                >
                  {contact.cv.other} · PDF · {size(otherCv.bytes)}
                </a>
              </div>
            </aside>
          </Reveal>
        </div>
      </section>
    </main>
  );
}
