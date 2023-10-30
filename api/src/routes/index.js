const { Router } = require("express");
const { getRecipe } = require("../controllers/GetRecipes");
const { getRecipeById } = require("../controllers/GetRecipieById");
const { postNewRecipe } = require("../controllers/PostNewRecipe");
const { getDiet } = require("../controllers");
// const getDiet = require("../controllers/GetDiets");

const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

router.get("/recipe", getRecipe);
router.get("/diets", getDiet);
router.get("/recipe/:idRecipe", getRecipeById);
router.post("/recipe", postNewRecipe);

module.exports = router;
