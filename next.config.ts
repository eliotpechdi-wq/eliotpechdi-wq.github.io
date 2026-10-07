import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Export statique (dossier out/) pour GitHub Pages
  output: "export",
  trailingSlash: true,
  images: { unoptimized: true },
  // Plusieurs layouts racines ([lang] et les redirections) : 404 commun via app/global-not-found.tsx.
  experimental: { globalNotFound: true },
};

export default nextConfig;
