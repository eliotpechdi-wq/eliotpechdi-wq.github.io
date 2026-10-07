"use client";

import { Children, isValidElement, useEffect, useState, type CSSProperties, type ReactNode } from "react";
import { motion, stagger as staggerFn, useReducedMotion, type Variants } from "motion/react";
import { INSTANT, SPRING_POP } from "./shared";

export type ShapeKind = "circle" | "square" | "quarter" | "bar";

export type ShapesIntroProps = {
  /** Shape elements; each direct child gets its own entrance. */
  children: ReactNode;
  className?: string;
  style?: CSSProperties;
  /**
   * Classes applied to the motion wrapper around each child. The wrappers are
   * the actual grid/flex items, so put grid placement here (or size the
   * children with h-full/w-full). Default: none.
   */
  itemClassName?: string;
  /** Seconds between each shape. Default 0.07. */
  stagger?: number;
  /** Seconds before the first shape. Default 0.1. */
  delay?: number;
  /**
   * Play the entrance only once per visit: later mounts sharing this key
   * (e.g. coming back to the home page) show the shapes in place directly.
   * A full page reload plays it again.
   */
  playOnceKey?: string;
};

// Keys already played in this browser session (module scope survives client navigation).
const played = new Set<string>();

/*
 * Entrance per kind. A child can opt into a kind with `data-shape="circle"`
 * (or "square" | "quarter" | "bar"); otherwise kinds cycle by index.
 * The quarter-circle pivots on its corner, like a hand of a clock.
 */
const HIDDEN: Record<ShapeKind, Record<string, number | string>> = {
  circle: { opacity: 0, scale: 0 },
  quarter: { opacity: 0, rotate: 90, scale: 0.6 },
  square: { opacity: 0, x: -48 },
  bar: { opacity: 0, y: 48 },
};
const CYCLE: ShapeKind[] = ["circle", "quarter", "square", "bar"];
const SHOWN = { opacity: 1, scale: 1, rotate: 0, x: 0, y: 0 };

function kindOf(child: ReactNode, index: number): ShapeKind {
  if (isValidElement<{ "data-shape"?: string }>(child)) {
    const k = child.props["data-shape"];
    if (k && (CYCLE as string[]).includes(k)) return k as ShapeKind;
  }
  return CYCLE[index % CYCLE.length];
}

/**
 * Animates a grid of geometric shapes in on mount, each from a different
 * direction (scale / rotate / slide), staggered, on a spring.
 */
export function ShapesIntro({
  children,
  className,
  style,
  itemClassName,
  stagger = 0.07,
  delay = 0.1,
  playOnceKey,
}: ShapesIntroProps) {
  const reduce = useReducedMotion();
  // Decided once at mount: every instance sharing the key on the first visit still animates.
  const [skip] = useState(() => playOnceKey !== undefined && played.has(playOnceKey));
  useEffect(() => {
    if (playOnceKey) played.add(playOnceKey);
  }, [playOnceKey]);

  const parent: Variants = {
    hidden: {},
    show: { transition: reduce ? INSTANT : { delayChildren: staggerFn(stagger, { startDelay: delay }) } },
  };

  return (
    <motion.div className={className} style={style} variants={parent} initial={skip ? false : "hidden"} animate="show">
      {Children.map(children, (child, i) => {
        if (child == null || typeof child === "boolean") return child;
        const kind = kindOf(child, i);
        const variants: Variants = {
          hidden: HIDDEN[kind],
          show: { ...SHOWN, transition: reduce ? INSTANT : SPRING_POP },
        };
        return (
          <motion.div
            className={itemClassName}
            variants={variants}
            style={kind === "quarter" ? { originX: 0, originY: 1 } : undefined}
          >
            {child}
          </motion.div>
        );
      })}
    </motion.div>
  );
}
