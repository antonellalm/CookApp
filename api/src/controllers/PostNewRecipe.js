const { Recipe, Diet } = require("../db");

const postNewRecipe = async (req, res) => {
  try {
    const { title, image, summary, healthScore, diets } = req.body;
    const post = await Recipe.create({
      title,
      image,
      summary,
      healthScore,
    });
    const idDiets = await Diet.findAll({
      where: { name: diets },
    });
    await post.addDiet(idDiets);
    res.status(201).json(post);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  postNewRecipe,
};
