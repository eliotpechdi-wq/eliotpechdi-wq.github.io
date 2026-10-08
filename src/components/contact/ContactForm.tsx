"use client";

import { useEffect, useId, useRef, useState, type FormEvent } from "react";
import type { Locale } from "@/i18n/config";

/** Textes du formulaire (dict.contact.form), passés par la page serveur. */
export type ContactFormLabels = {
  label: string;
  subject: {
    legend: string;
    options: { job: string; freelance: string; other: string };
    fallback: string;
  };
  optional: string;
  name: string;
  email: string;
  message: string;
  honeypot: string;
  errors: { nameMissing: string; emailMissing: string; emailInvalid: string; messageMissing: string };
  submit: string;
  sending: string;
  promise: string;
  success: { title: string; body: string };
  error: { title: string; body: string };
};

type Field = "name" | "email" | "message";
type Status = "idle" | "sending" | "success" | "error";

const ENDPOINT = "https://api.web3forms.com/submit";
const SUBJECTS = ["job", "freelance", "other"] as const;

/** Remplace {email} par un lien mailto (le reste du texte reste tel quel). */
function WithEmail({ text, email }: { text: string; email: string }) {
  const [before, after = ""] = text.split("{email}");
  return (
    <>
      {before}
      <a href={`mailto:${email}`} className="font-semibold underline decoration-2 underline-offset-4">
        {email}
      </a>
      {after}
    </>
  );
}

/** Message d'erreur d'un champ, d'après son état de validité natif. */
function fieldError(el: HTMLInputElement | HTMLTextAreaElement, errors: ContactFormLabels["errors"]) {
  const v = el.validity;
  if (v.valid) return "";
  if (el.name === "email") return v.valueMissing ? errors.emailMissing : errors.emailInvalid;
  if (el.name === "name") return errors.nameMissing;
  return errors.messageMissing;
}

const inputClass =
  "w-full rounded-2xl border-2 border-line bg-surface px-4 py-3.5 text-[17px] text-fg transition-colors " +
  "hover:border-muted focus-visible:border-yellow aria-invalid:border-red md:text-lg";

/**
 * Formulaire de contact envoyé à Web3Forms (fetch JSON, rien n'est stocké sur le site).
 * Validation native (required, type="email") lue via l'API de contraintes, messages
 * traduits sous chaque champ ; succès → le formulaire est remplacé et reçoit le focus.
 */
export function ContactForm({
  labels,
  email,
  accessKey,
  lang,
}: {
  labels: ContactFormLabels;
  email: string;
  accessKey: string;
  lang: Locale;
}) {
  const id = useId();
  const successRef = useRef<HTMLDivElement>(null);
  const errorRef = useRef<HTMLDivElement>(null);
  const [status, setStatus] = useState<Status>("idle");
  const [errors, setErrors] = useState<Partial<Record<Field, string>>>({});
  const [sentTo, setSentTo] = useState("");

  useEffect(() => {
    if (status === "success") successRef.current?.focus();
    if (status === "error") errorRef.current?.focus();
  }, [status]);

  const fieldId = (f: string) => `${id}-${f}`;

  // Une erreur affichée disparaît dès que le champ devient valide.
  const revalidate = (el: HTMLInputElement | HTMLTextAreaElement) => {
    const name = el.name as Field;
    if (!errors[name]) return;
    setErrors((prev) => ({ ...prev, [name]: fieldError(el, labels.errors) }));
  };

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (status === "sending") return;
    const form = e.currentTarget;

    const next: Partial<Record<Field, string>> = {};
    let firstInvalid: HTMLElement | null = null;
    for (const name of ["name", "email", "message"] as Field[]) {
      const el = form.elements.namedItem(name) as HTMLInputElement | HTMLTextAreaElement;
      el.value = name === "message" ? el.value : el.value.trim();
      const msg = fieldError(el, labels.errors);
      if (msg) {
        next[name] = msg;
        firstInvalid ??= el;
      }
    }
    setErrors(next);
    if (firstInvalid) {
      firstInvalid.focus();
      return;
    }

    const data = new FormData(form);
    const name = String(data.get("name"));
    const from = String(data.get("email"));
    const choice = data.get("objet") as (typeof SUBJECTS)[number] | null;
    const subjectLabel = choice ? labels.subject.options[choice] : labels.subject.fallback;

    setStatus("sending");
    try {
      const res = await fetch(ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          access_key: accessKey,
          subject: `[Site] ${subjectLabel} — ${name}`,
          from_name: name,
          replyto: from,
          name,
          email: from,
          objet: choice ? subjectLabel : "—",
          message: String(data.get("message")),
          langue: lang,
          // Honeypot Web3Forms : coché par un robot → message rejeté.
          botcheck: data.get("botcheck") === "on",
        }),
      });
      const json = (await res.json().catch(() => null)) as { success?: boolean } | null;
      if (!res.ok || !json?.success) throw new Error(`Web3Forms: HTTP ${res.status}`);
      setSentTo(from);
      setStatus("success");
    } catch {
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <div
        ref={successRef}
        tabIndex={-1}
        role="status"
        className="flex min-h-[360px] flex-col justify-end gap-4 rounded-3xl bg-yellow p-7 text-ink md:min-h-[480px] md:p-12"
      >
        <span aria-hidden="true" className="mb-auto block size-16 rounded-full bg-red md:size-24" />
        <h2 className="m-0 font-display text-[34px] font-light leading-[1.05] tracking-[-0.02em] md:text-[52px]">
          {labels.success.title}
        </h2>
        <p className="m-0 text-lg md:text-xl">{labels.success.body.replace("{email}", sentTo)}</p>
      </div>
    );
  }

  const sending = status === "sending";
  const describedBy = (f: Field) => (errors[f] ? fieldId(`${f}-error`) : undefined);

  return (
    <form
      id="formulaire"
      aria-label={labels.label}
      noValidate
      onSubmit={onSubmit}
      className="flex flex-col gap-7"
    >
      <fieldset className="m-0 border-0 p-0">
        <legend className="mb-3 p-0 text-[15px] font-semibold md:text-base">
          {labels.subject.legend} <span className="font-normal text-muted">{labels.optional}</span>
        </legend>
        <div className="flex flex-wrap gap-2.5">
          {SUBJECTS.map((key) => (
            <label
              key={key}
              className="inline-flex min-h-11 cursor-pointer items-center rounded-full border-2 border-line px-5 text-[15px] font-semibold transition-colors hover:border-muted has-checked:border-yellow has-checked:bg-yellow has-checked:text-ink has-focus-visible:outline-3 has-focus-visible:outline-offset-3 has-focus-visible:outline-yellow light:has-focus-visible:outline-ink md:text-base"
            >
              <input type="radio" name="objet" value={key} className="sr-only" />
              {labels.subject.options[key]}
            </label>
          ))}
        </div>
      </fieldset>

      <div className="grid gap-7 md:grid-cols-2 md:gap-5">
        <div className="flex flex-col gap-2">
          <label htmlFor={fieldId("name")} className="text-[15px] font-semibold md:text-base">
            {labels.name}
          </label>
          <input
            id={fieldId("name")}
            name="name"
            type="text"
            required
            autoComplete="name"
            aria-invalid={errors.name ? true : undefined}
            aria-describedby={describedBy("name")}
            onChange={(e) => revalidate(e.currentTarget)}
            className={inputClass}
          />
          {errors.name && (
            <p id={fieldId("name-error")} className="m-0 flex items-start gap-2 text-[15px] font-semibold text-fg">
              <span aria-hidden="true" className="mt-[0.4em] inline-block size-2.5 shrink-0 bg-red" />
              {errors.name}
            </p>
          )}
        </div>

        <div className="flex flex-col gap-2">
          <label htmlFor={fieldId("email")} className="text-[15px] font-semibold md:text-base">
            {labels.email}
          </label>
          <input
            id={fieldId("email")}
            name="email"
            type="email"
            required
            autoComplete="email"
            spellCheck={false}
            aria-invalid={errors.email ? true : undefined}
            aria-describedby={describedBy("email")}
            onChange={(e) => revalidate(e.currentTarget)}
            className={inputClass}
          />
          {errors.email && (
            <p id={fieldId("email-error")} className="m-0 flex items-start gap-2 text-[15px] font-semibold text-fg">
              <span aria-hidden="true" className="mt-[0.4em] inline-block size-2.5 shrink-0 bg-red" />
              {errors.email}
            </p>
          )}
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <label htmlFor={fieldId("message")} className="text-[15px] font-semibold md:text-base">
          {labels.message}
        </label>
        <textarea
          id={fieldId("message")}
          name="message"
          required
          rows={7}
          aria-invalid={errors.message ? true : undefined}
          aria-describedby={describedBy("message")}
          onChange={(e) => revalidate(e.currentTarget)}
          className={`${inputClass} min-h-[180px] resize-y leading-relaxed`}
        />
        {errors.message && (
          <p id={fieldId("message-error")} className="m-0 flex items-start gap-2 text-[15px] font-semibold text-fg">
            <span aria-hidden="true" className="mt-[0.4em] inline-block size-2.5 shrink-0 bg-red" />
            {errors.message}
          </p>
        )}
      </div>

      {/* Honeypot Web3Forms : invisible et hors du parcours clavier. */}
      <div aria-hidden="true" className="absolute -left-[9999px] size-px overflow-hidden">
        <label>
          {labels.honeypot}
          <input type="checkbox" name="botcheck" tabIndex={-1} autoComplete="off" />
        </label>
      </div>

      {status === "error" && (
        <div
          ref={errorRef}
          tabIndex={-1}
          role="alert"
          className="flex flex-col gap-1.5 rounded-2xl border-2 border-red bg-surface px-5 py-4 text-[15px] md:text-base"
        >
          <p className="m-0 font-semibold text-fg">{labels.error.title}</p>
          <p className="m-0 text-soft">
            <WithEmail text={labels.error.body} email={email} />
          </p>
        </div>
      )}

      <div className="flex flex-wrap items-center gap-x-6 gap-y-3">
        <button
          type="submit"
          disabled={sending}
          className="inline-flex min-h-14 cursor-pointer items-center gap-4 rounded-full bg-yellow py-1.5 pl-7 pr-1.5 text-[17px] font-bold text-ink transition-opacity disabled:cursor-wait disabled:opacity-70 md:min-h-16 md:text-lg"
        >
          {sending ? labels.sending : labels.submit}
          <span
            aria-hidden="true"
            className={`flex size-11 shrink-0 items-center justify-center rounded-full bg-red text-xl text-white md:size-[52px] ${sending ? "animate-pulse" : ""}`}
          >
            →
          </span>
        </button>
        <p className="m-0 text-[15px] font-semibold text-muted md:text-base">{labels.promise}</p>
      </div>

      {/* Annonce de l'envoi en cours (le succès et l'erreur reçoivent le focus). */}
      <p role="status" className="sr-only">
        {sending ? labels.sending : ""}
      </p>
    </form>
  );
}
