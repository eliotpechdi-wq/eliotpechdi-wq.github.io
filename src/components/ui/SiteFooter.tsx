import { Reveal } from "@/components/motion";
import { site } from "@/data/site";
import type { Dictionary } from "@/i18n";
import { TitleWithEm } from "./text";

/** Liens de contact renseignés (e-mail, GitHub, LinkedIn) ; les vides sont masqués. */
export function contactLinks(labels: Dictionary["footer"]["links"]) {
  const { email, github, linkedin } = site.links;
  return [
    email && { href: `mailto:${email}`, label: labels.email },
    github && { href: github, label: labels.github },
    linkedin && { href: linkedin, label: labels.linkedin },
  ].filter((l): l is { href: string; label: string } => Boolean(l));
}

/** Pied de page « Parlons-en. » */
export function SiteFooter({ dict }: { dict: Dictionary }) {
  const { email } = site.links;
  const links = contactLinks(dict.footer.links);

  // Le point final en italique jaune (footer.headlineEm), comme le titleEm des titres.
  const headline = (
    <TitleWithEm title={dict.footer.headline} em={dict.footer.headlineEm} emClassName="text-highlight" />
  );

  return (
    <footer id="contact" className="border-t border-line">
      <div className="mx-auto flex max-w-[1360px] flex-col gap-7 px-5 pb-7 pt-12 md:gap-[72px] md:px-10 md:pb-10 md:pt-[120px]">
        <Reveal className="flex flex-wrap items-center gap-4 md:gap-8">
          <h2 className="m-0 font-display text-[52px] font-light leading-[0.95] tracking-[-0.04em] md:text-[clamp(56px,9vw,140px)]">
            {email ? <a href={`mailto:${email}`}>{headline}</a> : headline}
          </h2>
          <span
            aria-hidden="true"
            className="inline-block size-12 shrink-0 rounded-full bg-red md:size-[110px]"
          />
        </Reveal>

        <div className="flex flex-wrap justify-between gap-x-6 gap-y-2 text-sm font-semibold text-muted md:text-[15px]">
          {links.length > 0 && (
            <ul className="flex flex-wrap gap-x-5 md:gap-x-7">
              {links.map((l) => (
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
          )}
          <p className="m-0 inline-flex min-h-11 items-center">
            © {new Date().getFullYear()} {site.name}
          </p>
        </div>
      </div>
    </footer>
  );
}
