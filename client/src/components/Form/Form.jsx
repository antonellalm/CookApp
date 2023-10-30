import React from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import validation from "./validation";
import { addRecipe, messageModal } from "../../redux/actions";
import { openModal } from "../../redux/actions";
import { useNavigate } from "react-router-dom";
import styles from "./Form.module.css";
import { NavLink } from "react-router-dom";
import { Modal } from "../modal/Modal";

export default function Form(props) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { diets, modalOpen, modalMessage } = useSelector((state) => state);

  const [recipe, setRecipe] = useState({
    title: "",
    image: "",
    summary: "",
    healthScore: 1,
    diets: [],
  });

  const [errors, setErrors] = useState({
    title: "",
    image: "",
    summary: "",
    healthScore: 1,
    diets: [],
  });

  const inputChange = (event) => {
    const { name, value } = event.target;
    setRecipe({
      ...recipe,
      [name]: value,
    });

    setErrors(
      validation({
        ...recipe,
        [name]: value,
      })
    );
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (Object.values(errors).length > 0 && recipe.diets.length === 0) {
      dispatch(openModal(true));
      dispatch(messageModal("Please complete required fields"));
    } else {
      dispatch(addRecipe(recipe));
      navigate("/home");
    }
  };

  const addDiet = (event) => {
    const { value } = event.target;
    if (!recipe.diets.includes(value)) {
      setRecipe({
        ...recipe,
        diets: [...recipe.diets, value],
      });
    }
  };

  const deleteDiet = (selectdiet) => {
    setRecipe({
      ...recipe,
      diets: recipe.diets.filter((diet) => diet !== selectdiet),
    });
  };

  return (
    <div className={styles.backContenedor}>
      <NavLink to="/home">
        <button className={styles.back}>Back</button>
      </NavLink>
      {modalOpen && (
        <div className={styles.modal}>
          <Modal />
        </div>
      )}

      <div className={styles.container}>
        <form className={styles.form} onSubmit={handleSubmit}>
          {/* {modalOpen && (
            <div className={`${styles.modal} ${modalOpen ? styles.show : ""}`}>
              <Modal />
            </div>
          )} */}
          <div className={styles.contenedor}>
            <label className={styles.title}>Title: </label>
            <input
              className={styles.inputTitle}
              onChange={inputChange}
              type="text"
              name="title"
              value={recipe.title}
            />
            {errors.title && <p className={styles.error}>{errors.title}</p>}

            <label className={styles.imagen}>Image: </label>
            <input
              className={styles.inputImage}
              type="text"
              name="image"
              value={recipe.image}
              onChange={inputChange}
            />
            {errors.image && <p className={styles.error}>{errors.image}</p>}

            <label className={styles.summary}>Summary: </label>
            <textarea
              className={styles.inputSummary}
              type="text"
              name="summary"
              value={recipe.summary}
              onChange={inputChange}
            />

            <label className={styles.healthScoreTitle}>HealthScore: </label>
            <input
              className={styles.inputHealthScore}
              id="range-input"
              name="healthScore"
              type="range"
              min="1"
              max="100"
              value={recipe.healthScore}
              onChange={inputChange}
            />

            <label className={styles.titleDiet}>Diets: </label>
            <select
              className={styles.select}
              name="dieta"
              defaultValue="Choose your diets "
              onChange={addDiet}
            >
              <option disabled value="Choose your diets ">
                Choose your diets
              </option>
              {diets?.map((diet, index) => {
                return (
                  <option key={index} value={diet}>
                    {diet}
                  </option>
                );
              })}
            </select>

            <button type="submit" className={styles.createButton}>
              Create
            </button>
          </div>
        </form>
        <div>
          <div className={styles.mainContainer}>
            <img src={recipe.image} alt="" className={styles.image} />

            <div key={props.id} className={styles.cardsContainer}>
              <h3 className={styles.name}>{recipe.name}</h3>

              <div className={styles.holis}>
                <p className={styles.healthScore}>
                  Healthscore:
                  <p>{recipe.healthScore}</p>
                </p>

                <p className={styles.tituloDiet}>Diets: </p>
              </div>

              <div className={styles.diet}>
                {recipe.diets?.map((diet, i) => {
                  return (
                    <div key={i} className={styles.diets}>
                      <p classNam={styles.dieta}>
                        {diet.charAt(0).toUpperCase() + diet.slice(1)}
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
