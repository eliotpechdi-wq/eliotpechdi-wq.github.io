"use client";

import type { CSSProperties, ReactNode } from "react";
import { motion, stagger as staggerFn, useReducedMotion, type Variants } from "motion/react";
import { ENTER, INSTANT } from "./shared";

export type StaggerProps = {
  children: ReactNode;
  className?: string;
  style?: CSSProperties;
  /** Seconds between each child. Default 0.08. */
  stagger?: number;
  /** Seconds before the first child starts. Default 0. */
  delay?: number;
  /** Only animate the first time it enters the viewport. Default true. */
  once?: boolean;
};

/**
 * Parent that triggers its <StaggerItem> descendants in sequence when it
 * enters the viewport. Items can be nested at any depth (variant propagation),
 * as long as no motion component in between sets its own `animate`.
 */
export function Stagger({ children, className, style, stagger = 0.08, delay = 0, once = true }: StaggerProps) {
  const reduce = useReducedMotion();

  const variants: Variants = {
    hidden: {},
    show: {
      transition: reduce ? INSTANT : { delayChildren: staggerFn(stagger, { startDelay: delay }) },
    },
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

export type StaggerItemProps = {
  children: ReactNode;
  className?: string;
  style?: CSSProperties;
  /** Vertical offset in px each item rises from. Default 24. */
  y?: number;
};

export function StaggerItem({ children, className, style, y = 24 }: StaggerItemProps) {
  const reduce = useReducedMotion();

  const variants: Variants = {
    hidden: { opacity: 0, y },
    show: { opacity: 1, y: 0, transition: reduce ? INSTANT : ENTER },
  };

  return (
    <motion.div className={className} style={style} variants={variants}>
      {children}
    </motion.div>
  );
}
