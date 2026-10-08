import { rootRedirectScript } from "@/components/Redirect";
import type { Metadata } from "next";
import Link from "next/link";
import { DEFAULT_LOCALE } from "@/i18n/config";

export const metadata: Metadata = {
  alternates: {
    canonical: "/",
    languages: { fr: "/fr/", en: "/en/", "x-default": "/" },
  },
};

// Racine « / » : redirige vers /fr/ ou /en/ (choix mémorisé, sinon langue du navigateur).
export default function RootRedirect() {
  return (
    <>
      <script dangerouslySetInnerHTML={{ __html: rootRedirectScript(DEFAULT_LOCALE) }} />
      <noscript>
        <main className="mx-auto max-w-[1360px] px-5 py-10 md:px-10">
          <p>
            <Link href="/fr/" hrefLang="fr" lang="fr" className="underline">
              Français
            </Link>
            {" · "}
            <Link href="/en/" hrefLang="en" lang="en" className="underline">
              English
            </Link>
          </p>
        </main>
      </noscript>
    </>
  );
}
