import { Bricolage_Grotesque, Fraunces } from "next/font/google";

// Titres : Fraunces variable (graisse + axe optique), romain et italique.
const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
  style: ["normal", "italic"],
  axes: ["opsz"],
  display: "swap",
});

// Texte courant / UI : Bricolage Grotesque variable.
const bricolage = Bricolage_Grotesque({
  variable: "--font-bricolage",
  subsets: ["latin"],
  axes: ["opsz"],
  display: "swap",
});

/** Classes à poser sur <html> pour exposer les deux familles en variables CSS. */
export const fontVariables = `${fraunces.variable} ${bricolage.variable}`;
