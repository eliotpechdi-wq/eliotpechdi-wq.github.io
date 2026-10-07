import type { Metadata, Viewport } from "next";
import { Bricolage_Grotesque, Fraunces } from "next/font/google";
import { SiteHeader } from "@/components/ui/SiteHeader";
import { site } from "@/data/site";
import "./globals.css";

// Titres : Fraunces variable (graisse + axe optique), romain et italique.
const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
  style: ["normal", "italic"],
  axes: ["opsz"],
  display: "swap",
});

// Texte courant / UI : Bricolage Grotesque variable.
const bricolage = Bricolage_Grotesque({
  variable: "--font-bricolage",
  subsets: ["latin"],
  axes: ["opsz"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: `${site.name} · ${site.role}`,
    template: `%s · ${site.name}`,
  },
  description: site.tagline,
};

export const viewport: Viewport = {
  themeColor: "#0F0F0D",
  colorScheme: "dark",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="fr" className={`${fraunces.variable} ${bricolage.variable} antialiased`}>
      <body className="min-h-dvh bg-bg font-sans text-fg">
        <a
          href="#contenu"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:rounded-full focus:bg-yellow focus:px-5 focus:py-3 focus:font-semibold focus:text-bg"
        >
          Aller au contenu
        </a>
        {/* Sans JavaScript, les animations d'entrée ne partent jamais : on affiche tout. */}
        <noscript>
          <style>{`[style*="opacity:0"]{opacity:1!important;transform:none!important}`}</style>
        </noscript>
        <SiteHeader />
        {children}
      </body>
    </html>
  );
}
