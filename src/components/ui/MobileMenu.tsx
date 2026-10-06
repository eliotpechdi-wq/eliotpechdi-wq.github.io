"use client";

import { useEffect, useId, useRef, useState } from "react";

export type NavLink = { href: string; label: string; cta?: boolean };

/** Bouton burger + menu déroulant (< 768px). */
export function MobileMenu({ links }: { links: NavLink[] }) {
  const [open, setOpen] = useState(false);
  const id = useId();
  const panelId = `menu-mobile-${id.replace(/:/g, "")}`;
  const buttonRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        buttonRef.current?.focus();
      }
    };
    const onPointer = (e: PointerEvent) => {
      const t = e.target as Node;
      if (!panelRef.current?.contains(t) && !buttonRef.current?.contains(t)) {
        setOpen(false);
      }
    };
    const mq = window.matchMedia("(min-width: 768px)");
    const onMq = () => mq.matches && setOpen(false);
    document.addEventListener("keydown", onKey);
    document.addEventListener("pointerdown", onPointer);
    mq.addEventListener("change", onMq);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("pointerdown", onPointer);
      mq.removeEventListener("change", onMq);
    };
  }, [open]);

  return (
    <div className="md:hidden">
      <button
        ref={buttonRef}
        type="button"
        aria-expanded={open}
        aria-controls={panelId}
        aria-label={open ? "Fermer le menu" : "Ouvrir le menu"}
        onClick={() => setOpen((o) => !o)}
        className="flex h-11 w-11 cursor-pointer flex-col items-center justify-center gap-[5px] rounded-full border-[1.5px] border-fg bg-transparent"
      >
        <span
          aria-hidden="true"
          className={`block h-[1.5px] w-4 bg-fg transition-transform duration-200 motion-reduce:transition-none ${
            open ? "translate-y-[3.25px] rotate-45" : ""
          }`}
        />
        <span
          aria-hidden="true"
          className={`block h-[1.5px] w-4 bg-fg transition-transform duration-200 motion-reduce:transition-none ${
            open ? "-translate-y-[3.25px] -rotate-45" : ""
          }`}
        />
      </button>

      <div
        ref={panelRef}
        id={panelId}
        hidden={!open}
        className="absolute inset-x-0 top-full border-b border-line bg-bg px-5 pb-6"
      >
        <nav aria-label="Menu principal">
          <ul className="flex flex-col">
            {links.map((l) =>
              l.cta ? (
                <li key={l.href} className="pt-6">
                  <a
                    href={l.href}
                    onClick={() => setOpen(false)}
                    className="inline-flex min-h-12 items-center rounded-full bg-yellow px-[22px] text-[15px] font-bold text-bg"
                  >
                    {l.label}
                  </a>
                </li>
              ) : (
                <li key={l.href} className="border-b border-line">
                  <a
                    href={l.href}
                    onClick={() => setOpen(false)}
                    className="flex min-h-14 items-center font-display text-[32px] font-light tracking-[-0.02em]"
                  >
                    {l.label}
                  </a>
                </li>
              ),
            )}
          </ul>
        </nav>
      </div>
    </div>
  );
}
