"use client";

import type { CSSProperties, ReactNode } from "react";
import { motion, useReducedMotion, type Variants } from "motion/react";
import { ENTER, INSTANT } from "./shared";

export type RevealProps = {
  children: ReactNode;
  className?: string;
  style?: CSSProperties;
  /** Delay in seconds before the reveal starts. */
  delay?: number;
  /** Vertical offset in px the content rises from. Default 24. */
  y?: number;
  /** Only animate the first time it enters the viewport. Default true. */
  once?: boolean;
};

/**
 * Fades + lifts its content when it enters the viewport.
 *
 * Reduced motion: the hidden state is kept identical to the server HTML (so
 * hydration matches), then the content snaps to visible on mount with a
 * zero-duration transition: no translate animation, no viewport wait.
 */
export function Reveal({ children, className, style, delay = 0, y = 24, once = true }: RevealProps) {
  const reduce = useReducedMotion();

  const variants: Variants = {
    hidden: { opacity: 0, y },
    show: { opacity: 1, y: 0, transition: reduce ? INSTANT : { ...ENTER, delay } },
  };

  return (
    <motion.div
      className={className}
      style={style}
      variants={variants}
      initial="hidden"
      {...(reduce
        ? { animate: "show" }
        : { whileInView: "show", viewport: { once, amount: 0.2 } })}
    >
      {children}
    </motion.div>
  );
}
