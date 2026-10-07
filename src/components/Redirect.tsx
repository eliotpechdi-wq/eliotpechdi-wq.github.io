import { LOCALES, LOCALE_STORAGE_KEY, type Locale } from "@/i18n/config";
import { SITE_URL } from "@/i18n/metadata";

/**
 * Page de redirection statique (export GitHub Pages : ni Proxy ni redirects).
 * Sert aux anciennes URL sans langue (/projets/…, /profil/, /contact/), déjà
 * partagées : meta refresh + location.replace (garde le #fragment), lien de secours.
 * React 19 place <meta> et <link> dans le <head>.
 */
export function Redirect({ to }: { to: string }) {
  return (
    <>
      <meta httpEquiv="refresh" content={`0; url=${to}`} />
      <link rel="canonical" href={`${SITE_URL}${to}`} />
      <meta name="robots" content="noindex" />
      <script
        dangerouslySetInnerHTML={{
          __html: `location.replace(${JSON.stringify(to)}+location.search+location.hash)`,
        }}
      />
      <main className="mx-auto max-w-[1360px] px-5 py-10 md:px-10">
        <p>
          <a href={to} className="underline">
            {to}
          </a>
        </p>
      </main>
    </>
  );
}

/**
 * Script de la racine « / » : langue mémorisée (localStorage, sélecteur),
 * sinon première langue connue de navigator.languages, sinon le français.
 */
export function rootRedirectScript(fallback: Locale) {
  const locales = JSON.stringify(LOCALES);
  return `(function(){var L=${locales},l;try{l=localStorage.getItem(${JSON.stringify(LOCALE_STORAGE_KEY)})}catch(e){}if(L.indexOf(l)<0){l=${JSON.stringify(fallback)};var n=navigator.languages&&navigator.languages.length?navigator.languages:[navigator.language||""];for(var i=0;i<n.length;i++){var c=String(n[i]).slice(0,2).toLowerCase();if(L.indexOf(c)>=0){l=c;break}}}location.replace("/"+l+"/"+location.search+location.hash)})()`;
}
