import type { CSSProperties } from "react";
import type { Shape as ShapeName } from "@/data/types";
import { colorVar, shapeRadius, type ColorName } from "./accent";

type ShapeProps = {
  shape: ShapeName;
  color: ColorName;
  /** Largeur : nombre (px) ou longueur CSS ("38%", "clamp(...)"). Hauteur = largeur. */
  size?: number | string;
  className?: string;
  style?: CSSProperties;
};

/** Forme géométrique décorative (cercle, carré, quart, demi-cercle). */
export function Shape({ shape, color, size, className = "", style }: ShapeProps) {
  return (
    <span
      aria-hidden="true"
      className={`block shrink-0 ${className}`}
      style={{
        width: size,
        aspectRatio: "1 / 1",
        borderRadius: shapeRadius[shape],
        background: colorVar(color),
        ...style,
      }}
    />
  );
}
