import React from "react";
import { Link } from "react-router-dom";
import styles from "./MainWeb.module.scss";
import { useQuery } from "@tanstack/react-query";
import { fetchHomeTiles, fetchPosts } from "../../api";

export default function MainWeb({ mode = "continents" }: { mode?: "home" | "continents" | "countries" }): React.JSX.Element {
  const { data: homeTilesData, isLoading: isLoadingHome } = useQuery({
    queryKey: ['homeTiles'],
    queryFn: fetchHomeTiles,
    enabled: mode === "home",
  });

  const { data: tilesData, isLoading: isLoadingTiles } = useQuery({
    queryKey: ['posts'],
    queryFn: fetchPosts,
    enabled: mode !== "home",
  });

  if ((mode === "home" && isLoadingHome) || (mode !== "home" && isLoadingTiles)) {
    return (
      <section className={`${styles.mainWeb} container`}>
        <header className={styles.header}>
          <h1 className={styles.title}>Ładowanie danych...</h1>
        </header>
      </section>
    );
  }

  if (mode === "home") {
    return (
      <section className={`${styles.mainWeb} container`}>
        <header className={styles.header}>
          <h1 className={styles.title}>Strona Glowna</h1>
          <p className={styles.subtitle}>Wybierz Kontynenty lub Kraje</p>
        </header>

        <div className={styles.grid}>
          {(homeTilesData || []).map((h) => (
            <article key={h.id} className={styles.card}>
              <Link to={h.path} className={styles.cardLink}>
                <div className={styles.imageWrap}>
                  <img src={h.image} alt={h.alt} />
                </div>
                <div className={styles.cardBody}>
                  <h3 className={styles.cardTitle}>{h.title}</h3>
                  <p className={styles.cardExcerpt}>{h.excerpt}</p>
                </div>
              </Link>
            </article>
          ))}
        </div>
      </section>
    );
  }

  const continents = (tilesData || []).filter((t) =>
    ["australia", "afryka", "ameryka-polnocna", "europa", "azja"].includes(t.id)
  );
  const countries = (tilesData || []).filter((t) => ["polska", "wlochy"].includes(t.id));

  const list = mode === "countries" ? countries : continents;

  return (
    <section className={`${styles.mainWeb} container`}>
      <header className={styles.header}>
        <h1 className={styles.title}>{mode === "countries" ? "Kraje" : "Kontynenty"}</h1>
        <p className={styles.subtitle}>Wybierz element aby zobaczyc szczegoly</p>
      </header>

      <div className={styles.grid}>
        {list.map((t) => (
          <article key={t.id} className={styles.card}>
            <Link to={`/post/${t.id}`} className={styles.cardLink}>
              <div className={styles.imageWrap}>
                <img src={t.image} alt={t.alt} />
              </div>
              <div className={styles.cardBody}>
                <h3 className={styles.cardTitle}>{t.title}</h3>
                <p className={styles.cardExcerpt}>{t.excerpt}</p>
              </div>
            </Link>
          </article>
        ))}
      </div>
    </section>
  );
}
