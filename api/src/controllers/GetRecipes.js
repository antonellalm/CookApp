const axios = require("axios");
require("dotenv").config();
const { API_KEY } = process.env;
const { Recipe, Diet } = require("../db.js");

const getRecipe = async (req, res) => {
  try {
    const response = await axios(
      `https://api.spoonacular.com/recipes/complexSearch?number=500&apiKey=222a646f83fe409c9f6ebf5d644e8037&addRecipeInformation=true`
    );

    const { name } = req.query;
    const { results } = response.data;
    const apiRecipe = results.map((ele) => {
      return {
        id: ele.id,
        title: ele.title,
        image: ele.image,
        summary: ele.summary,
        healthScore: ele.healthScore,
        steps: ele.analyzedInstructions[0]
          ? ele.analyzedInstructions[0].steps.map((elem) => elem.step).join(" ")
          : "",
        diets: ele.diets,
      };
      //array, objeto y propiedad name
    });
    const dbRecipe = await Recipe.findAll({
      include: {
        model: Diet,
      },
    }).then((data) =>
      data.map((ele) => {
        return {
          id: ele.id,
          title: ele.title,
          image: ele.image,
          summary: ele.summary,
          healthScore: ele.healthScore,
          steps: ele.steps,
          diets: ele.diets.map((diet) => diet.name),
        };
      })
    );
    const allRecipies = apiRecipe.concat(dbRecipe);
    console.log(allRecipies);
    if (name) {
      const filteredByName = allRecipies.filter((e) =>
        e.title.toLowerCase().includes(name.toLowerCase())
      );
      res.status(200).json(filteredByName);
    } else {
      res.status(200).json(allRecipies);
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  getRecipe,
};
