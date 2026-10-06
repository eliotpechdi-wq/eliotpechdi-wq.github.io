import type { Transition } from "motion/react";

/** Crisp ease-out (fast start, firm landing). */
export const EASE_OUT: [number, number, number, number] = [0.22, 1, 0.36, 1];

/** Default enter transition for reveals: short, no float. */
export const ENTER: Transition = { duration: 0.5, ease: EASE_OUT };

/** Snappy spring for hover/press feedback. */
export const SPRING_SNAP: Transition = { type: "spring", stiffness: 420, damping: 30, mass: 0.8 };

/** Slightly bouncier spring for intro shapes. */
export const SPRING_POP: Transition = { type: "spring", stiffness: 260, damping: 20, mass: 0.9 };

/** Used when the user prefers reduced motion: jump straight to the end state. */
export const INSTANT: Transition = { duration: 0 };
