import type { Metadata } from "next";
import { site } from "@/data/site";
import { SITE_URL } from "@/i18n/metadata";
import { ThemeScript } from "@/components/theme/script";
import "../globals.css";

// Layout racine minimal des pages de redirection (« / » et anciennes URL sans langue).
export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: site.name,
};

export default function RedirectLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="fr" suppressHydrationWarning>
      <head>
        <ThemeScript />
      </head>
      <body className="min-h-dvh bg-bg font-sans text-fg">{children}</body>
    </html>
  );
}
