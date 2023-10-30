// import React from "react";
// import styles from "../Filters/DropDownItem.module.css";
// import { useDispatch, useSelector } from "react-redux";

// import {
//   getAllRecipes,
//   filterByOrigin,
//   filterRecipeByDiets,
//   orderRecipeAlphabetic,
//   healthScoreOrder,
//   getDiets,
//   deleteFilters,
//   cleanStates,
// } from "../../redux/actions";

// const filterHandler = (event) => {
//   const { name, value } = event.target;
//   if (name === "Diets") {
//     dispatch(filterRecipeByDiets(value));
//     setPage(1);
//   } else {
//     dispatch(filterByOrigin(value));
//     setPage(1);
//   }
//   if (value === "All") {
//     dispatch(deleteFilters());
//     setPage(1);
//   }
// };
// export const DropDownItem = (props) => {
//   return (
//     <>
//       <li
//         name="Origin"
//         onChange={filterHandler}
//         defaultValue={"Filter By Origin"}
//         className={styles.dropdownItem}
//       ></li>
//     </>
//   );
// };
