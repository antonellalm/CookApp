import React from "react";
import styles from "./SearchBar.module.css";
import { useDispatch } from "react-redux";
import { getAllRecipes, getQueryRecipe } from "../../redux/actions";
import { useState } from "react";
import { AiOutlineSearch } from "react-icons/ai";

export default function SearchBar(props) {
  const [input, setInput] = useState("");
  const dispatch = useDispatch();

  const handleClick = (event) => {
    const { value } = event.target;
    if (value) {
      dispatch(getQueryRecipe(value));
      props.setPage(1);
    } else {
      dispatch(getAllRecipes());
    }
  };
  const handleChange = (event) => {
    if (!event.target.value) {
      dispatch(getAllRecipes());
      setInput("");
    } else {
      setInput(event.target.value);
    }
  };
  return (
    <div className={styles.searchbar}>
      <div className={styles.contenedorInput}>
        <input
          onChange={handleChange}
          type="text"
          name="search"
          value={input}
          placeholder="chicken,beef"
          className={styles.input}
        />
      </div>
      <div className={styles.contenedorBtn}>
        <button value={input} onClick={handleClick} className={styles.btn}>
          <AiOutlineSearch className={styles.icono} />
        </button>
      </div>
    </div>
  );
}
