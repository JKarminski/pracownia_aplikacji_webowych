import Australia from "../images/Kontynenty/Australia/Australia.jpg";
import Kangury from "../images/Kontynenty/Australia/Kangury.jpg";
import Sydney from "../images/Kontynenty/Australia/Sydney.jpg";

import Afryka from "../images/Kontynenty/Afryka/Afryka.jpg";
import Lwy from "../images/Kontynenty/Afryka/Lwy.jpg";
import Muzyka from "../images/Kontynenty/Afryka/Muzyka.jpg";

import AmerykaPolnocna from "../images/Kontynenty/AmerykaPolnocna/AmerykaPolnocna.jpg";
import NewYork from "../images/Kontynenty/AmerykaPolnocna/NewYork.jpg";
import Yellowstone from "../images/Kontynenty/AmerykaPolnocna/Yellowstone.jpg";

import Europa from "../images/Kontynenty/Europa/Europa.jpg";
import Pizza from "../images/Kontynenty/Europa/pizza.jpg";
import Grecja from "../images/Kontynenty/Europa/grecja.jpg";

import Azja from "../images/Kontynenty/Azja/Azja.jpg";
import Kobieta from "../images/Kontynenty/Azja/Kobieta.png";
import Kultura from "../images/Kontynenty/Azja/kultura.jpg";
import Sushi from "../images/Kontynenty/Azja/sushi.jpg";

import PolskaImg from "../images/Kraje/Polska/Polska.jpg";
import Mazury from "../images/Kraje/Polska/Mazury.jpg";
import Schab from "../images/Kraje/Polska/schabowyzziemniaczkami.jpg";

import WlochyImg from "../images/Kraje/Wlochy/Wlochy.jpg";
import Wenecja from "../images/Kraje/Wlochy/Wenecja.jpg";
import Garda from "../images/Kraje/Wlochy/Garda.jpg";

export type Subtopic = {
  id: string;
  title: string;
  excerpt: string;
  image?: string;
  facts: string[];
};

export type Tile = {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  image: string;
  alt: string;
  subtopics?: Subtopic[];
};

export const tiles: Tile[] = [
  {
    id: "australia",
    title: "Australia",
    excerpt: "Plaze i przyroda",
    content:
      "Australia to kontynent o rozleglych plazach, czerwonych pustyniach i unikalnej faunie. " +
      "Miasta takie jak Sydney i Melbourne lacza nowoczesnosc z lokalna kultura. " +
      "Bariera Koralowa to jedno z najwazniejszych miejsc dla nurkow.",
    image: Australia,
    alt: "Australia",
    subtopics: [
      {
        id: "australia-fauna",
        title: "Fauna Australii",
        excerpt: "Kangury i koale",
        image: Kangury,
        facts: [
          "W Australii wystepuje wiele gatunkow endemicznych, w tym kangury i koale.",
          "Kangury potrafia skakac na duze odleglosci i sa symbolem kraju."
        ]
      },
      {
        id: "australia-miasta",
        title: "Miasta Australii",
        excerpt: "Sydney i Melbourne",
        image: Sydney,
        facts: [
          "Sydney jest znane z opery i portu, a Melbourne z kultury kawiarnianej.",
          "Miasta oferuja bogate zycie kulturalne i wydarzenia artystyczne."
        ]
      }
    ]
  },
  {
    id: "afryka",
    title: "Afryka",
    excerpt: "Kultura i safari",
    content:
      "Afryka to kontynent kontrastow: sawanny, pustynie, gory i lasy rownikowe. " +
      "Bogactwo kultur i jezykow tworzy niezwykle zroznicowany krajobraz spoleczny i przyrodniczy.",
    image: Afryka,
    alt: "Afryka",
    subtopics: [
      {
        id: "afryka-safari",
        title: "Safari",
        excerpt: "Parki narodowe",
        image: Lwy,
        facts: [
          "Parki takie jak Serengeti i Kruger sa miejscem wielkich migracji.",
          "Safari to wazny element turystyki przyrodniczej i ochrony gatunkow."
        ]
      },
      {
        id: "afryka-muzyka",
        title: "Muzyka Afryki",
        excerpt: "Tradycyjne rytmy",
        image: Muzyka,
        facts: [
          "Muzyka afrykanska ma silne rytmy perkusyjne i bogata tradycje.",
          "Wplywy afrykanskie sa widoczne w muzyce popularnej na calym swiecie."
        ]
      }
    ]
  },
  {
    id: "ameryka-polnocna",
    title: "Ameryka Polnocna",
    excerpt: "Miasta i parki",
    content:
      "Ameryka Polnocna laczy tętniace zyciem metropolie z rozleglymi parkami narodowymi. " +
      "Od wiezowcow Nowego Jorku po gejzery Yellowstone, kontynent oferuje duze zroznicowanie.",
    image: AmerykaPolnocna,
    alt: "Ameryka Polnocna",
    subtopics: [
      {
        id: "ameryka-newyork",
        title: "New York",
        excerpt: "Miasto, ktore nigdy nie spi",
        image: NewYork,
        facts: [
          "New York to globalne centrum finansow, kultury i sztuki.",
          "Central Park to zielone serce miasta, popularne miejsce wypoczynku."
        ]
      },
      {
        id: "ameryka-przyroda",
        title: "Parki narodowe",
        excerpt: "Yellowstone i inne",
        image: Yellowstone,
        facts: [
          "Yellowstone byl pierwszym parkiem narodowym na swiecie.",
          "Parki narodowe chronia unikalne ekosystemy i krajobrazy."
        ]
      }
    ]
  },
  {
    id: "europa",
    title: "Europa",
    excerpt: "Historia i kuchnia",
    content:
      "Europa to mozaika historii, architektury i kulinarow. " +
      "Zabytkowe miasta i regionalne smaki przyciagaja turystow z calego swiata.",
    image: Europa,
    alt: "Europa",
    subtopics: [
      {
        id: "europa-kuchnia",
        title: "Kuchnia Europy",
        excerpt: "Smaki i tradycje",
        image: Pizza,
        facts: [
          "Pizza ma swoje korzenie w Neapolu we Wloszech.",
          "Francja jest znana z wielu rodzajow serow i pieknej tradycji kulinarnej."
        ]
      },
      {
        id: "europa-historia",
        title: "Historia Europy",
        excerpt: "Zabytki i muzea",
        image: Grecja,
        facts: [
          "Rzym byl centrum Imperium Rzymskiego i pozostawil wiele zabytkow.",
          "Wiele europejskich miast zachowalo sredniowieczna zabudowe."
        ]
      }
    ]
  },
  {
    id: "azja",
    title: "Azja",
    excerpt: "Roznorodnosc kultur",
    content:
      "Azja to najwiekszy kontynent pod wzgledem powierzchni i ludnosci. " +
      "Znajduja sie tu starozytne cywilizacje, nowoczesne metropolie i bogate tradycje kulinarne.",
    image: Azja,
    alt: "Azja",
    subtopics: [
      {
        id: "azja-kultura",
        title: "Kultura Azji",
        excerpt: "Tradycje i sztuka",
        image: Kultura,
        facts: [
          "Azja ma bogate tradycje teatralne, muzyczne i rzemieslnicze.",
          "Wiele zwyczajow ma korzenie siegajace setek lat."
        ]
      },
      {
        id: "azja-kuchnia",
        title: "Kuchnia Azji",
        excerpt: "Smaki i potrawy",
        image: Sushi,
        facts: [
          "Sushi pochodzi z Japonii i ma dluga historie.",
          "Przyprawy i herbata odgrywaja kluczowa role w kuchniach Azji."
        ]
      },
      {
        id: "azja-obrazy",
        title: "Portrety i fotografia",
        excerpt: "Wspolczesna fotografia",
        image: Kobieta,
        facts: [
          "Fotografia portretowa w Azji laczy tradycje z nowoczesnymi trendami.",
          "Wielu fotografow dokumentuje zycie codzienne i festiwale."
        ]
      }
    ]
  },
  {
    id: "polska",
    title: "Polska",
    excerpt: "Mazury i kuchnia",
    content:
      "Polska laczy bogata historie z malowniczymi krajobrazami. " +
      "Mazury oferuja tysiące jezior, a miasta takie jak Krakow i Gdansk przyciagaja zabytkami i kultura.",
    image: PolskaImg,
    alt: "Polska",
    subtopics: [
      {
        id: "polska-kuchnia",
        title: "Kuchnia polska",
        excerpt: "Tradycyjne potrawy",
        image: Schab,
        facts: [
          "Schabowy i pierogi to ikony kuchni polskiej.",
          "Regionalne potrawy odzwierciedlaja lokalne produkty i tradycje."
        ]
      },
      {
        id: "polska-przyroda",
        title: "Przyroda Polski",
        excerpt: "Mazury i parki",
        image: Mazury,
        facts: [
          "Mazury to rozlegly region jezior i lasow.",
          "Bialowieza to jedno z ostatnich pierwotnych lasow Europy."
        ]
      }
    ]
  },
  {
    id: "wlochy",
    title: "Wlochy",
    excerpt: "Wenecja i kuchnia",
    content:
      "Wlochy to kolebka sztuki, architektury i kuchni. " +
      "Wenecja, Rzym i Florencja przyciagaja miliony turystow rocznie.",
    image: WlochyImg,
    alt: "Wlochy",
    subtopics: [
      {
        id: "wlochy-kuchnia",
        title: "Kuchnia wloska",
        excerpt: "Pizza i pasta",
        image: Pizza,
        facts: [
          "Wlochy maja bogata tradycje w produkcji wina.",
          "Pasta wystepuje w setkach regionalnych odmian."
        ]
      },
      {
        id: "wlochy-miasta",
        title: "Miasta Wloch",
        excerpt: "Wenecja i Garda",
        image: Wenecja,
        facts: [
          "Wenecja zbudowana jest na wielu wyspach polaczonych mostami.",
          "Jezioro Garda oferuje malownicze widoki i turystyke."
        ]
      }
    ]
  }
];
