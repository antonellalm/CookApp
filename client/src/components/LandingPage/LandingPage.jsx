import styles from "./Landing.module.css";
import img from "../img/landing.png";
import { NavLink } from "react-router-dom";

export default function LandingPage() {
  return (
    <div className={styles.landing}>
      <div id="container" className={styles.container}>
        <div className={styles.container_words}>
          <div className={styles.titleprincipal}>
            <h1> CookApp</h1>
          </div>

          <p className={styles.pwords}>
            <span>Expándete</span>
            <span> en</span>
            <span>la</span>
            <span>cocina</span>
            <span>ahora</span>
            <span> en</span>
            <span className={styles.title}>CookApp</span> <br />
            <span>apreniendo </span>
            <span> a</span>
            <span>cocinar</span>
          </p>

          <NavLink to="/home">
            <div>
              <button className={styles.loginButton}>Comenzar Ahora</button>
            </div>
          </NavLink>
        </div>

        <div className={styles.image}>
          <img src={img} className={styles.img} />
        </div>
      </div>
    </div>
  );
}
