import { accentStyles } from "@/components/ui/accent";
import { formatSize, getCv } from "@/data/cv";
import { otherLocale, t, type Dictionary, type Locale } from "@/i18n";

/**
 * Carte « Télécharger mon CV » (fond bleu) : le CV dans la langue de la page,
 * l'autre langue en lien secondaire. Utilisée sur les pages Contact et Profil.
 */
export function CvCard({ lang, labels, className = "" }: { lang: Locale; labels: Dictionary["contact"]["cv"]; className?: string }) {
  const cv = getCv(lang);
  const otherCv = getCv(otherLocale(lang));
  const size = (bytes: number) => formatSize(bytes, labels.sizeUnit, lang);
  const { blue } = accentStyles;

  return (
    <div className={`flex flex-col gap-5 rounded-3xl p-6 md:p-7 ${blue.surface} ${className}`}>
      <h2 className={`m-0 text-[15px] font-semibold ${blue.soft}`}>{labels.title}</h2>
      <a href={cv.href} download type="application/pdf" className="group flex items-center justify-between gap-4">
        <span className="flex flex-col gap-1">
          <span className="font-display text-[26px] leading-tight tracking-[-0.01em] md:text-[32px]">{labels.download}</span>
          <span className={`text-[15px] font-semibold ${blue.soft}`}>
            {t(labels.file, { lang: labels.lang, size: size(cv.bytes) })}
          </span>
        </span>
        <span
          aria-hidden="true"
          className="flex size-12 shrink-0 items-center justify-center rounded-full bg-yellow text-xl text-ink transition-transform group-hover:translate-y-0.5 md:size-14"
        >
          ↓
        </span>
      </a>
      <a
        href={otherCv.href}
        download
        type="application/pdf"
        hrefLang={otherCv.lang}
        className="inline-flex min-h-11 items-center self-start text-[15px] font-semibold underline decoration-2 underline-offset-4"
      >
        {labels.other} · PDF · {size(otherCv.bytes)}
      </a>
    </div>
  );
}
