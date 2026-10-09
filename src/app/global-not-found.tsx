import type { Metadata, Viewport } from "next";
import Link from "next/link";
import { LOCALES, getDictionary, localePath } from "@/i18n";
import { SecurityMeta } from "@/components/security/SecurityMeta";
import { THEME_COLORS, ThemeScript } from "@/components/theme/script";
import { fontVariables } from "./fonts";
import "./globals.css";

// 404 global (export statique → out/404.html) : aucune langue n'est connue
// pour une URL inexistante, on affiche donc les deux versions.
const fr = getDictionary("fr");
const en = getDictionary("en");

export const metadata: Metadata = {
  title: `${fr.notFound.title} · ${en.notFound.title}`,
  robots: { index: false },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: dark)", color: THEME_COLORS.dark },
    { media: "(prefers-color-scheme: light)", color: THEME_COLORS.light },
  ],
  colorScheme: "dark light",
};

export default function GlobalNotFound() {
  return (
    <html lang="fr" className={`${fontVariables} antialiased`} suppressHydrationWarning>
      <head>
        <SecurityMeta />
        <ThemeScript />
      </head>
      <body className="min-h-dvh bg-bg font-sans text-fg">
        <main
          id="contenu"
          className="mx-auto flex max-w-[1360px] flex-col gap-14 px-5 pb-16 pt-10 md:px-10 md:pb-[120px] md:pt-24"
        >
          {LOCALES.map((lang) => {
            const { notFound } = getDictionary(lang);
            const Heading = lang === "fr" ? "h1" : "h2";
            return (
              <section key={lang} lang={lang} className="flex flex-col gap-5">
                <Heading className="m-0 font-display text-[44px] font-light tracking-[-0.03em] md:text-[80px]">
                  {notFound.title}
                </Heading>
                <p className="m-0 text-[17px] text-soft md:text-[19px]">{notFound.body}</p>
                <Link
                  href={localePath(lang)}
                  hrefLang={lang}
                  className="inline-flex min-h-12 items-center self-start rounded-full bg-yellow px-[22px] text-[15px] font-bold text-ink"
                >
                  {notFound.back}
                </Link>
              </section>
            );
          })}
        </main>
      </body>
    </html>
  );
}
