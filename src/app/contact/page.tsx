import type { Metadata } from "next";
import { site } from "@/data/site";
import { contactLinks } from "@/components/ui/SiteFooter";

export const metadata: Metadata = {
  title: "Contact",
  description: `Contacter ${site.name} : e-mail, GitHub, LinkedIn.`,
};

// Page provisoire (sera refaite) : titre + liens de contact.
export default function ContactPage() {
  return (
    <main id="contenu" className="mx-auto max-w-[1360px] px-5 pb-16 pt-10 md:px-10 md:pb-[120px] md:pt-24">
      <h1 className="m-0 font-display text-[44px] font-light tracking-[-0.03em] md:text-[80px]">Me contacter</h1>
      <ul className="mt-8 flex flex-wrap gap-x-5 text-xl font-semibold md:gap-x-7 md:text-2xl">
        {contactLinks().map((l) => (
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
