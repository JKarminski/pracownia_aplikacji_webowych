import styles from './MainWeb.module.scss'

export default function MainWeb() {
  return <nav className={styles.MainWeb}>
    <ul>
      <li>
        <a href="#">Strona główna</a>
      </li>
      <li>
        <a href="#">Kategorie</a>
      </li>
      <li>
        <a href="#">Wpisy</a>
      </li>
    </ul>
  </nav>
    <main>
        <div><h1>Blog: Zycie w Australii</h1>
            <img src="./images/Australia.jpg" alt="Australia" />
        </div>
        <div><h1>Blog: Zycie w Afryce</h1>
            <img src="./images/Afryka.jpg" alt="Australia" />
        </div>
        <div><h1>Blog: Zycie w Ameryce Polnocnej</h1>
            <img src="./images/AmerykaPolnocna.jpg" alt="Australia" />
        </div>
        <div><h1>Blog: Zycie w Europie</h1>
            <img src="./images/Europa.jpg" alt="Australia" />
        </div>
        <div><h1>Blog: Zycie w Azjii</h1>
            <img src="./images/Azja.jpg" alt="Australia" />
        </div>
    </main>
}
