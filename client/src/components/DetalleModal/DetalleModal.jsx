import React from "react";
import styles from "./DetalleModal.module.css";
import { CgCloseO } from "react-icons/cg";
import { NavLink } from "react-router-dom";

export const DetalleModal = (props) => {
  const { cardValues, setModalActivado } = props;
  const rexExp = /<[^>]*>/g;
  function cerrarModal() {
    setModalActivado(false);
  }

  return (
    <div className={styles.contenedor} onClick={() => cerrarModal()}>
      <div className={styles.modal}>
        <div className={styles.cerrar} onClick={() => cerrarModal()}>
          {" "}
          <CgCloseO className={styles.iconocerrar} />
        </div>

        <div className={styles.containerr}>
          <div>
            <img src={cardValues.image} alt="" className={styles.image} />
          </div>
          <p className={styles.name}> {cardValues.name}</p>
          <div className={styles.containerHYD}>
            <div className={styles.containerHealthscore}>
              <p className={styles.ph}>HealthScore:</p>{" "}
              <p className={styles.ph2}>{cardValues.healthScore}</p>
            </div>
            <div className={styles.containerDiets}>
              <p className={styles.pd}>Diets:</p>
              <p className={styles.pd2}> {cardValues.diets}</p>
            </div>
          </div>
          <div className={styles.containerSummary}>
            <p className={styles.summary}>Summary</p>
            <p className={styles.textosummary}>
              {cardValues.summary.replace(rexExp, "")}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

//Generar la estructura htlm correctamente
