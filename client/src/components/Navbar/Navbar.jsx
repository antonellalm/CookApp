import styles from "./NavBar.module.css";
import { NavLink } from "react-router-dom";
import image from "../img/image.png";
import SearchBar from "../SearchBar/Searchbar";
import React, { useEffect, useState } from "react";
import { Filter } from "../Filters/Filter";
import imageTenedor from "../img/tenedor.jpg";

export default function Navbar(props) {
  const [scroll, setScroll] = useState(false);
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 0) {
        setScroll(true);
      } else {
        setScroll(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    // Limpieza del evento al desmontar el componente
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [scroll, setScroll]);
  return (
    <div className={`${styles.contenedor} ${scroll ? styles.scroll : ""}`}>
      <div className={styles.nav1}>
        <div id="containerImagen" className={styles.contenedorimg}>
          <img src={image} className={styles.imgg} alt="toHome" />
        </div>

        <div id="ContainerFiltrosySearchbar" className={styles.filter}>
          <div className={styles.searchbar}>
            <SearchBar setPage={props.setPage} />
          </div>{" "}
          <Filter setPage={props.setPage} />
        </div>
        <div id="contenedorCREATRECIPE" className={styles.contenedorTenedor}>
          <div className={styles.tenedorContenedor}>
            <NavLink to="/createrecipe">
              <img
                src={imageTenedor}
                className={styles.imgtenedor}
                alt="tenedorYcuchara"
              />
            </NavLink>
          </div>
          <div>
            <NavLink to="/createrecipe">
              <button className={styles.buttonRecipe}>Create</button>
            </NavLink>
          </div>
        </div>
      </div>
    </div>
  );
}
