import React from "react";
import { Link, NavLink } from "react-router-dom";
import styles from "./NavBar.module.scss";

export default function NavBar(): JSX.Element {
  return (
    <header className={styles.navbar}>
      <div className={styles.container}>
        <Link to="/" className={styles.brand}>Strona Glowna</Link>
        <nav className={styles.links}>
          <NavLink to="/continents" className={({isActive}) => isActive ? `${styles.link} ${styles.active}` : styles.link}>Kontynenty</NavLink>
          <NavLink to="/countries" className={({isActive}) => isActive ? `${styles.link} ${styles.active}` : styles.link}>Kraje</NavLink>
          <NavLink to="/categories" className={({isActive}) => isActive ? `${styles.link} ${styles.active}` : styles.link}>Kategorie</NavLink>
        </nav>
      </div>
    </header>
  );
}
