"use client";

import { useEffect, useRef, useState } from "react";

export type CopyEmailLabels = {
  copy: string;
  copyLabel: string;
  copied: string;
  copiedAnnounce: string;
  copyFailed: string;
};

/** Copie dans le presse-papiers, avec repli execCommand (contexte non sécurisé). */
async function copyText(text: string) {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch {
    const area = document.createElement("textarea");
    area.value = text;
    area.setAttribute("readonly", "");
    area.style.position = "fixed";
    area.style.opacity = "0";
    document.body.appendChild(area);
    area.select();
    const ok = document.execCommand("copy");
    area.remove();
    return ok;
  }
}

/** Bouton « Copier » de l'adresse e-mail, retour « Copié » pendant 2 s. */
export function CopyEmail({ email, labels }: { email: string; labels: CopyEmailLabels }) {
  const [state, setState] = useState<"idle" | "copied" | "failed">("idle");
  const timer = useRef<ReturnType<typeof setTimeout>>(undefined);

  useEffect(() => () => clearTimeout(timer.current), []);

  const onClick = async () => {
    const ok = await copyText(email);
    setState(ok ? "copied" : "failed");
    clearTimeout(timer.current);
    timer.current = setTimeout(() => setState("idle"), ok ? 2000 : 4000);
  };

  return (
    <>
      <button
        type="button"
        onClick={onClick}
        aria-label={labels.copyLabel}
        data-requires-js
        className={`inline-flex min-h-11 shrink-0 cursor-pointer items-center gap-2 rounded-full px-5 text-[15px] font-bold transition-colors ${
          state === "copied" ? "bg-yellow text-bg" : "bg-bg text-fg hover:bg-surface"
        }`}
      >
        <span aria-hidden="true">{state === "copied" ? "✓" : "⧉"}</span>
        <span aria-hidden="true">{state === "copied" ? labels.copied : labels.copy}</span>
      </button>
      <span role="status" className="sr-only">
        {state === "copied" ? labels.copiedAnnounce : state === "failed" ? labels.copyFailed : ""}
      </span>
      {state === "failed" && (
        <span aria-hidden="true" className="basis-full text-sm font-semibold">
          {labels.copyFailed}
        </span>
      )}
    </>
  );
}
