import React from "react";
import styles from "./Modal.module.css";
import { useDispatch, useSelector } from "react-redux";
import { CgCloseO } from "react-icons/cg";
import { closeModal } from "../../redux/actions";
export const Modal = () => {
  const { modalMessage } = useSelector((state) => state);
  const dispatch = useDispatch();

  function cerrarModal() {
    dispatch(closeModal(false));
  }
  return (
    <div className={styles.modal}>
      <div className={styles.cerrar} onClick={cerrarModal}>
        <CgCloseO className={styles.icono} />
      </div>
      <p className={styles.pmodal}>{modalMessage}</p>
    </div>
  );
};

//se podria desde addRecipe
