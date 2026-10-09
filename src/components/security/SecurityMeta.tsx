/**
 * En-têtes de sécurité posés en <meta> : GitHub Pages ne permet pas d'envoyer
 * des en-têtes HTTP personnalisés, et next.config `headers()` ne s'applique
 * pas à l'export statique.
 *
 * CSP : seules les ressources du site lui-même sont chargées (polices
 * auto-hébergées par next/font), et le formulaire ne peut parler qu'à
 * Web3Forms. 'unsafe-inline' reste nécessaire pour les scripts : un export
 * statique ne peut pas recevoir de nonce, et Next injecte des scripts inline
 * propres à chaque page (données du routeur), en plus de nos scripts de thème
 * et de redirection, qui n'interpolent aucune donnée externe.
 *
 * Limites d'une CSP en <meta> : frame-ancestors, report-uri et sandbox y sont
 * ignorés par les navigateurs.
 */
const isDev = process.env.NODE_ENV === "development";

const CSP = [
  "default-src 'self'",
  // Le serveur de dev (HMR) a besoin d'eval ; jamais en production.
  `script-src 'self' 'unsafe-inline'${isDev ? " 'unsafe-eval'" : ""}`,
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' data: blob:",
  "font-src 'self'",
  `connect-src 'self' https://api.web3forms.com${isDev ? " ws: wss:" : ""}`,
  "form-action 'self' https://api.web3forms.com",
  "frame-src 'none'",
  "object-src 'none'",
  "base-uri 'self'",
  "manifest-src 'self'",
  "worker-src 'self'",
  "upgrade-insecure-requests",
].join("; ");

export function SecurityMeta() {
  return (
    <>
      <meta httpEquiv="Content-Security-Policy" content={CSP} />
      <meta name="referrer" content="strict-origin-when-cross-origin" />
    </>
  );
}
