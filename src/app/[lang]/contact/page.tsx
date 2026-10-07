import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { site } from "@/data/site";
import { contactLinks } from "@/components/ui/SiteFooter";
import { getDictionary, hasLocale, t } from "@/i18n";
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

// Page provisoire (sera refaite) : titre + liens de contact.
export default async function ContactPage(props: PageProps<"/[lang]/contact">) {
  const { lang } = await props.params;
  if (!hasLocale(lang)) notFound();
  const dict = getDictionary(lang);

  return (
    <main id="contenu" className="mx-auto max-w-[1360px] px-5 pb-16 pt-10 md:px-10 md:pb-[120px] md:pt-24">
      <h1 className="m-0 font-display text-[44px] font-light tracking-[-0.03em] md:text-[80px]">{dict.contact.title}</h1>
      <ul className="mt-8 flex flex-wrap gap-x-5 text-xl font-semibold md:gap-x-7 md:text-2xl">
        {contactLinks(dict.footer.links).map((l) => (
          <li key={l.label}>
            <a
              href={l.href}
              className="inline-flex min-h-11 items-center"
              {...(l.href.startsWith("http") ? { rel: "me noopener" } : {})}
            >
              {l.label}
            </a>
          </li>
        ))}
      </ul>
    </main>
  );
}
