import KontynentImg from "../images/StronaGlowna/Kontynent.jpg";
import KrajImg from "../images/StronaGlowna/Kraj.jpg";

export type HomeTile = {
  id: string;
  title: string;
  excerpt: string;
  image: string;
  alt: string;
  path: string;
};

export const homeTiles: HomeTile[] = [
  {
    id: "home-continents",
    title: "Kontynenty",
    excerpt: "Przeglad kontynentow i kategorie",
    image: KontynentImg,
    alt: "Kontynenty",
    path: "/continents"
  },
  {
    id: "home-countries",
    title: "Kraje",
    excerpt: "Przeglad krajow i tematy",
    image: KrajImg,
    alt: "Kraje",
    path: "/countries"
  }
];
