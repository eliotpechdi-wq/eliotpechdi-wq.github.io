"use client";

import { useRef, type CSSProperties, type ReactNode } from "react";
import {
  motion,
  useAnimationFrame,
  useInView,
  useMotionValue,
  useReducedMotion,
  useTransform,
} from "motion/react";

export type MarqueeProps = {
  children: ReactNode;
  className?: string;
  style?: CSSProperties;
  /** Seconds for one full loop. Default 30. */
  speed?: number;
  /** Scroll direction. Default "left". */
  direction?: "left" | "right";
  /** Pause while a mouse is over the band. Default true. */
  pauseOnHover?: boolean;
};

/**
 * Infinite horizontal band. Children are rendered twice side by side (the
 * second copy is aria-hidden + inert) and the track is translated by -50% per loop,
 * so the seam is invisible as long as each copy carries its own trailing
 * spacing: put spacing on the items (e.g. `px-6`, or `pr-8`), not a `gap`
 * on the band itself.
 *
 * Only ticks while on screen. Reduced motion: static (first copy visible).
 */
export function Marquee({
  children,
  className,
  style,
  speed = 30,
  direction = "left",
  pauseOnHover = true,
}: MarqueeProps) {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref);
  const paused = useRef(false);
  const progress = useMotionValue(0); // 0 → 1 per loop
  const x = useTransform(progress, (p) =>
    direction === "left" ? `${-p * 50}%` : `${(p - 1) * 50}%`,
  );

  useAnimationFrame((_, delta) => {
    if (reduce || !inView || paused.current || speed <= 0) return;
    // Clamp delta so a backgrounded tab doesn't jump on return.
    const step = Math.min(delta, 64) / (speed * 1000);
    progress.set((progress.get() + step) % 1);
  });

  return (
    <div
      ref={ref}
      className={className}
      style={{ overflow: "hidden", ...style }}
      onPointerEnter={(e) => {
        if (pauseOnHover && e.pointerType === "mouse") paused.current = true;
      }}
      onPointerLeave={() => {
        paused.current = false;
      }}
    >
      <motion.div style={{ x, display: "flex", width: "max-content" }}>
        <div style={{ display: "flex", flexShrink: 0 }}>{children}</div>
        <div style={{ display: "flex", flexShrink: 0 }} aria-hidden="true" inert>
          {children}
        </div>
      </motion.div>
    </div>
  );
}
