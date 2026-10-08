import type { Metadata, Viewport } from "next";
import { notFound } from "next/navigation";
import { THEME_COLORS, ThemeScript } from "@/components/theme/script";
import { SiteHeader } from "@/components/ui/SiteHeader";
import { site } from "@/data/site";
import { LOCALES, getDictionary, hasLocale } from "@/i18n";
import { SITE_URL, alternatesFor } from "@/i18n/metadata";
import { fontVariables } from "../fonts";
import "../globals.css";

// Export statique : une version par langue (/fr/…, /en/…), aucune autre.
export const dynamicParams = false;

export function generateStaticParams() {
  return LOCALES.map((lang) => ({ lang }));
}

export async function generateMetadata(props: LayoutProps<"/[lang]">): Promise<Metadata> {
  const { lang } = await props.params;
  if (!hasLocale(lang)) return {};
  const dict = getDictionary(lang);
  return {
    metadataBase: new URL(SITE_URL),
    title: {
      default: `${site.name} · ${dict.site.role}`,
      template: `%s · ${site.name}`,
    },
    description: dict.site.tagline,
    alternates: alternatesFor(lang),
  };
}

export const viewport: Viewport = {
  // Barre du navigateur : suit le thème du système (un thème forcé par le
  // bouton n'est pas reflété ici, voir le rapport du chantier).
  themeColor: [
    { media: "(prefers-color-scheme: dark)", color: THEME_COLORS.dark },
    { media: "(prefers-color-scheme: light)", color: THEME_COLORS.light },
  ],
  colorScheme: "dark light",
};

export default async function RootLayout({ children, params }: LayoutProps<"/[lang]">) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  const dict = getDictionary(lang);

  return (
    // suppressHydrationWarning : le script du <head> pose data-theme avant React.
    <html lang={lang} className={`${fontVariables} antialiased`} suppressHydrationWarning>
      <head>
        <ThemeScript />
      </head>
      <body className="min-h-dvh bg-bg font-sans text-fg">
        <a
          href="#contenu"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:rounded-full focus:bg-yellow focus:px-5 focus:py-3 focus:font-semibold focus:text-ink"
        >
          {dict.common.skipToContent}
        </a>
        {/* Sans JavaScript, les animations d'entrée ne partent jamais : on affiche tout. */}
        <noscript>
          <style>{`[style*="opacity:0"]{opacity:1!important;transform:none!important}`}</style>
        </noscript>
        <SiteHeader lang={lang} dict={dict} />
        {children}
      </body>
    </html>
  );
}
