require("dotenv").config();
const axios = require("axios");
const { Diet } = require("../db.js");
const { API_KEY, API_URL } = process.env;
const URL = `https://api.spoonacular.com/recipes/complexSearch?number=100&apiKey=222a646f83fe409c9f6ebf5d644e8037&addRecipeInformation=true`;

// const { getDiets } = require("../controllers");

module.exports = async (req, res) => {
  try {
    const allDiets = await getDiets();

    return res.status(200).json(allDiets);
  } catch (error) {
    return res.status(500).json({
      error,
    });
  }
};

const getDiets = async () => {
  let dietsList = [];

  const response = await axios(URL);
  const { results } = response.data;

  // Desestructuro diets de cada recipe traída de la API
  // y en cada iteración combino el contenido de dietsList con las diets que voy obteniendo
  results.forEach((recipe) => {
    const { diets } = recipe;

    // Para listar las dietas, y luego renderizarlas en el front
    // incluyo vegetarian de esta forma, pero a la hora de
    // renderizar las recipes la incluyo dinámicamente
    dietsList = [...dietsList, ...diets, "vegetarian"];
  });

  // Creo un set a partir de dietsList para eliminar duplicados
  // Con el spread operator vuelvo a convertir el resultado a un array
  // y lo ordeno con sort()
  const uniqueDietsList = [...new Set(dietsList)].sort();

  // Traigo todas las diets de la BDD
  const existingDiets = await Diet.findAll();

  // Filtro las diets de uniqueDietsList que no están presentes en existingDiets
  const dietsToCreate = uniqueDietsList.filter(
    (diet) => !existingDiets.some((existingDiet) => existingDiet.name === diet)
  );

  // Creo solo las diets que no existen en la BDD
  await Diet.bulkCreate(
    dietsToCreate.map((diet) => ({ name: diet })),
    {
      ignoreDuplicates: true,
      fields: ["name"], // Especifica las columnas que deseas insertar
    }
  );

  // Busco las diets de la BDD
  const foundDiets = await Diet.findAll({
    attributes: ["name"],
    order: [["name", "ASC"]],
  });

  // Retorno las diets en un array
  return foundDiets.map((diet) => diet.name);
};

// const { Diet } = require("../db");
// const axios = require("axios");
// require("dotenv").config();
// const { API_KEY } = process.env;

// const getDiet = async (req, res) => {
//   try {
//     const finalarraydiets = ["vegetarian"];
//     const response = await axios.get(
//       `https://api.spoonacular.com/recipes/complexSearch?number=100&apiKey=742ad99b7852444fa2e4f17d32400cbc&addRecipeInformation=true`
//     );

//     const diets = response?.data?.results?.map((element) => element.diets);

//     const dietsList = [...new Set([...finalarraydiets, ...diets])];

//     const existingDiets = await Diet.findAll();
//     const existingDietsNames = existingDiets.map((ele) => ele.name);

//     const newDiets = dietsList.filter(
//       (diet) => !existingDietsNames.includes(diet)
//     );

//     if (newDiets.length > 0) {
//       await Diet.bulkCreate(
//         newDiets.map((ele) => {
//           return {
//             name: ele,
//           };
//         }),
//         { ignoreDuplicates: true }
//       );

//       console.log("Base de datos cargada!!");
//     } else {
//       console.log("No hay nuevas dietas para agregar a la base de datos.");
//     }

//     const updatedDiets = await Diet.findAll();
//     const updatedDietsNames = updatedDiets.map((ele) => ele.name);
//     console.log(updatedDietsNames);

//     return res.status(200).json(updatedDietsNames);
//   } catch (error) {
//     return res.status(500).json({ error: error.message });
//   }
// };

// const getDiet = async () => {
//   try {
//     const finalarraydiets = ["vegetarian"];
//     const response = await axios.get(
//       `https://api.spoonacular.com/recipes/complexSearch?number=100&apiKey=742ad99b7852444fa2e4f17d32400cbc&addRecipeInformation=true`
//     );

//     const diets = response.data.results.map((element) => element.diets);

//     const dietsList = [...new Set([...finalarraydiets, ...diets])];

//     await Diet.bulkCreate(
//       dietsList.map((ele) => {
//         return {
//           name: ele,
//         };
//       }),
//       { ignoreDuplicates: true }
//     );
//     console.log("Base de datos cargada!!");

//     const dbRes = await Diet.findAll();
//     const estaes = dbRes.map((ele) => ele.name);
//     console.log(estaes);

//     return res.status(200).json(dietsList);
//   } catch (error) {
//     return error.message;
//   }
// };

// module.exports = { getDiet };

//El método bulkCreate en Sequelize es utilizado para crear múltiples registros en una sola consulta. Permite insertar una matriz de objetos en una tabla de la base de datos.
