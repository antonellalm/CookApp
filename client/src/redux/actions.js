import {
  ADD_RECIPE,
  FILTER_BY_DIETS,
  FILTER_BY_ORIGIN,
  HEALTH_SCORE_ORDER,
  ALPHABETIC_ORDER,
  GET_ALL_RECIPES,
  GET_DETAIL_RECIPE,
  SET_LOADING,
  GET_DIETS,
  CLEAN_STATES,
  OPEN_MODAL,
  MODAL_MESSAGE,
  CLOSE_MODAL,
} from "../redux/actions.types";
import axios from "axios";

const API = process.env.API;

export const healthScoreOrder = (score) => {
  return {
    type: HEALTH_SCORE_ORDER,
    payload: score,
  };
};

export const setLoading = (isLoading) => {
  return {
    type: SET_LOADING,
    payload: isLoading,
  };
};

export const getDetail = (id) => {
  return async function (dispatch) {
    try {
      dispatch(setLoading(true));
      const response = await axios.get(`${API}/recipe/${id}`);
      dispatch({ type: GET_DETAIL_RECIPE, payload: response.data });
      dispatch(setLoading(false));
      console.log(response);
    } catch (error) {
      alert("No existe la receta con el ID indicado");
    }
  };
};

export const addRecipe = (recipe) => {
  return async function (dispatch) {
    try {
      const response = await axios.post(`${API}/recipe`, {
        title: recipe.title,
        image: recipe.image,
        summary: recipe.summary,
        healthScore: recipe.healthScore,
        diets: recipe.diets,
      });
      dispatch({ type: ADD_RECIPE, payload: response.data });
      dispatch(messageModal("Recipe created succesfully"));
      dispatch(openModal(true));
    } catch (error) {
      dispatch(messageModal("No se pudo crear receta"));
      dispatch(openModal(true));
    }
  };
};

export const closeModal = (isClose) => {
  return {
    type: CLOSE_MODAL,
    payload: isClose,
  };
};

export const messageModal = (message) => {
  return {
    type: MODAL_MESSAGE,
    payload: message,
  };
};

export const openModal = (isOpen) => {
  return {
    type: OPEN_MODAL,
    payload: isOpen,
  };
};

export const getAllRecipes = () => {
  return async function (dispatch) {
    try {
      console.log(`ESTA ES LA API: ${API}`);
      dispatch(setLoading(true));
      const response = await axios.get(`${API}/recipe`);
      dispatch({ type: GET_ALL_RECIPES, payload: response.data });
      dispatch(setLoading(false));
    } catch (error) {
      alert("No se encontraron recetas");
    }
  };
};

export const getQueryRecipe = (name) => {
  return async function (dispatch) {
    try {
      dispatch(setLoading(true));
      const response = await axios.get(`${API}/recipe?name=${name}`);
      dispatch({ type: GET_ALL_RECIPES, payload: response.data });
      dispatch(setLoading(false));
    } catch (error) {
      alert("No encontré la receta que estás buscando");
    }
  };
};

export const getDiets = () => {
  return async function (dispatch) {
    try {
      const response = await axios.get(`${API}/diets`);
      dispatch({ type: GET_DIETS, payload: response.data });
    } catch (error) {
      alert("Mi base de datos no tiene las dietas solicitadas");
    }
  };
};

export const orderRecipeAlphabetic = (option) => {
  return {
    type: ALPHABETIC_ORDER,
    payload: option,
  };
};

export const filterByOrigin = (origin) => {
  return {
    type: FILTER_BY_ORIGIN,
    payload: origin,
  };
};

export const filterRecipeByDiets = (dieta) => {
  return {
    type: FILTER_BY_DIETS,
    payload: dieta,
  };
};

export const deleteFilters = () => {
  return {
    type: "DELETE_FILTERS",
  };
};

export const cleanStates = () => {
  return {
    type: CLEAN_STATES,
  };
};

//cuando realizamos una peticion a alguien externo mi action returna una funcion, javascript por si solo no es capaz de hacer cosas asincronas, thunk este middleware que utilizmaos en la aplicacion le ayuda a realizar cosas asincrona, la funcion antes de llegar al reducer la agarra el thunk y despues se hace el dispatch al reducer
