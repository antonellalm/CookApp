import React from "react";
import { useDispatch, useSelector } from "react-redux";
import styles from "./Filter.module.css";
import { FaAngleDown } from "react-icons/fa";
import {
  getAllRecipes,
  filterByOrigin,
  filterRecipeByDiets,
  orderRecipeAlphabetic,
  healthScoreOrder,
  getDiets,
  deleteFilters,
  cleanStates,
} from "../../redux/actions";
import { useState } from "react";

export const Filter = ({ setPage }) => {
  const dispatch = useDispatch();
  const { diets } = useSelector((state) => state);

  const filterHandler = (event) => {
    const { name, value } = event.target;
    if (name === "Diets") {
      dispatch(filterRecipeByDiets(value));
      setPage(1);
    } else {
      dispatch(filterByOrigin(value));
      setPage(1);
    }
    if (value === "All") {
      dispatch(deleteFilters());
      setPage(1);
    }
  };

  const orderHandler = (event) => {
    const { name, value } = event.target;
    if (name === "Alphabetic") {
      dispatch(orderRecipeAlphabetic(value));
    } else {
      dispatch(healthScoreOrder(value));
    }
  };

  const reset = () => {
    dispatch(deleteFilters());
  };

  return (
    <div className={styles.container}>
      <select
        name="Origin"
        onChange={filterHandler}
        defaultValue={"Filter By Origin"}
      >
        <option disabled>Filster By</option>
        <option value="All">All</option>
        <option value="Api">Api</option>
        <option value="DataBase">DataBase</option>
      </select>
      <select
        name="Diets"
        onChange={filterHandler}
        defaultValue="Filter By Diets"
      >
        <option disabled>Filter By</option>
        <option value="All">Diets</option>
        {diets?.map((diet, index) => {
          return (
            <option value={diet} key={index}>
              {diet}
            </option>
          );
        })}
      </select>
      <select
        name="Alphabetic"
        onChange={orderHandler}
        defaultValue="Alphabetic Order"
      >
        <option disabled>Order By</option>
        <option disabled>Alphabetic</option>
        <option value="A-Z">A-Z</option>
        <option value="Z-A">Z-A</option>
      </select>
      <select
        name="HealthScore"
        onChange={orderHandler}
        defaultValue="HealthScore Order"
      >
        <option disabled> Order By</option>
        <option disabled>Healthscore</option>
        <option value="Ascendente">Ascendente</option>
        <option value="Descendente">Descendente</option>
      </select>
      <button onClick={reset} className={styles.reset}>
        Reset
      </button>
    </div>
  );
};
