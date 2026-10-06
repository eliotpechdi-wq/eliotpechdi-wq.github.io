import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Export statique (dossier out/) pour GitHub Pages
  output: "export",
  trailingSlash: true,
  images: { unoptimized: true },
};

export default nextConfig;
