const { Recipe, Diet } = require("../db");
require("dotenv").config();
const { API_KEY } = process.env;
const axios = require("axios");

const getRecipeById = async (req, res) => {
  try {
    const { idRecipe } = req.params;
    const regEx = /^[0-9]+$/; //Esto me sirve para ver si el ID que me llega por params es numérico
    let data; //Simplemente declaro una variable para guardarme las respuestas de la api o de la base de datos y no clararla en cada condicional
    if (regEx.test(idRecipe)) {
      //Si es numérico, busca la receta solicitada en la API
      const response = await axios(
        `https://api.spoonacular.com/recipes/${idRecipe}/information?apiKey=57987b0687fe43da9c430b3212496a32`
      );
      const api = response.data;
      data = {
        id: api.id,
        title: api.title,
        image: api.image,
        summary: api.summary,
        healthScore: api.healthScore,
        steps: api.instructions,
        diets: api.diets.map((diet) => {
          return {
            name: diet,
          };
        }),
      };
    } else {
      //Si es alfanumérico (UUID), busca en la DB
      data = await Recipe.findOne({
        where: {
          id: idRecipe,
        },

        include: {
          model: Diet,
          attributes: ["name"],

          through: {
            attributes: [],
          },
        },
      });
    }

    res.status(200).json(data);
  } catch (error) {
    res.status(500).json(error.message);
  }
};

module.exports = { getRecipeById };
