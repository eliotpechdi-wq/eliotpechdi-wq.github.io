"use client";

import {
  useState,
  type CSSProperties,
  type FocusEvent,
  type PointerEvent,
  type ReactNode,
} from "react";
import Link from "next/link";
import { motion, useReducedMotion, type Variants } from "motion/react";
import { INSTANT, SPRING_SNAP } from "./shared";

const MotionLink = motion.create(Link);

export type HoverCardProps = {
  children: ReactNode;
  className?: string;
  style?: CSSProperties;
  /** When set, the card renders as a Next <Link>; otherwise a <div>. */
  href?: string;
  "aria-label"?: string;
};

/**
 * Card wrapper with a crisp lift on hover / keyboard focus.
 *
 * Exposes its state two ways:
 *  - CSS: `data-hovered` attribute on the card (Tailwind: `data-hovered:…`, or
 *    add `group` to the card and use `group-data-hovered:…` on descendants).
 *  - Motion variants "rest" / "hover", consumed by <HoverShape> and
 *    <HoverReveal> anywhere inside.
 *
 * Touch pointers are ignored for hover so the state never sticks after a tap.
 */
export function HoverCard({ children, className, style, href, "aria-label": ariaLabel }: HoverCardProps) {
  const reduce = useReducedMotion();
  const [hovered, setHovered] = useState(false);
  const [focused, setFocused] = useState(false);
  const active = hovered || focused;

  const variants: Variants = {
    rest: { y: 0, scale: 1, transition: SPRING_SNAP },
    hover: reduce ? { y: 0, scale: 1, transition: INSTANT } : { y: -6, scale: 1.01, transition: SPRING_SNAP },
  };

  const handlers = {
    onPointerEnter: (e: PointerEvent<HTMLElement>) => {
      if (e.pointerType !== "touch") setHovered(true);
    },
    onPointerLeave: () => setHovered(false),
    onFocus: (e: FocusEvent<HTMLElement>) => {
      // Only keyboard-style focus (not the focus a mouse click gives a link).
      if (e.target instanceof Element && e.target.matches(":focus-visible")) setFocused(true);
    },
    onBlur: (e: FocusEvent<HTMLElement>) => {
      if (!e.currentTarget.contains(e.relatedTarget as Node | null)) setFocused(false);
    },
  };

  const shared = {
    className,
    style,
    "aria-label": ariaLabel,
    "data-hovered": active ? "" : undefined,
    variants,
    initial: false as const,
    animate: active ? "hover" : "rest",
    ...handlers,
  };

  if (href) {
    return (
      <MotionLink href={href} {...shared}>
        {children}
      </MotionLink>
    );
  }
  return <motion.div {...shared}>{children}</motion.div>;
}

export type HoverShapeProps = {
  children?: ReactNode;
  className?: string;
  style?: CSSProperties;
  /** Degrees to rotate on card hover. Default 15. */
  rotate?: number;
  /** Scale on card hover. Default 1.12. */
  scale?: number;
};

/** Rotates/scales with the enclosing <HoverCard>'s hover state. */
export function HoverShape({ children, className, style, rotate = 15, scale = 1.12 }: HoverShapeProps) {
  const reduce = useReducedMotion();
  const variants: Variants = {
    rest: { rotate: 0, scale: 1, transition: SPRING_SNAP },
    hover: reduce ? { rotate: 0, scale: 1, transition: INSTANT } : { rotate, scale, transition: SPRING_SNAP },
  };
  return (
    <motion.div className={className} style={style} variants={variants}>
      {children}
    </motion.div>
  );
}

export type HoverRevealProps = {
  children?: ReactNode;
  className?: string;
  style?: CSSProperties;
  /** Scale the content zooms in from. Default 1.08. */
  from?: number;
};

/**
 * Hidden at rest, fades + zooms in while the enclosing <HoverCard> is
 * hovered/focused (e.g. a project image over the shape). Reduced motion:
 * opacity-only, no zoom. Typically positioned `absolute inset-0` by you.
 */
export function HoverReveal({ children, className, style, from = 1.08 }: HoverRevealProps) {
  const reduce = useReducedMotion();
  const variants: Variants = {
    rest: { opacity: 0, scale: from, transition: { duration: 0.2, ease: "easeOut" } },
    hover: reduce
      ? { opacity: 1, scale: from, transition: { duration: 0.15 } }
      : { opacity: 1, scale: 1, transition: { duration: 0.3, ease: [0.22, 1, 0.36, 1] } },
  };
  return (
    <motion.div className={className} style={style} variants={variants}>
      {children}
    </motion.div>
  );
}
