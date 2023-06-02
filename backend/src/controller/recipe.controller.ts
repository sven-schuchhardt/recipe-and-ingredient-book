import { Router } from "express";
import { Loaded, wrap } from "@mikro-orm/core";
import { DI } from "../";
import {
  CreateRecipeDTO,
  CreateRecipeSchema,
  RecipeEntity,
  CreateRecipeIngredientDTO,
  CreateRecipeIngredientSchema,
  RecipeIngredientEntity,
} from "../entities";

/**
 * mergeParams true?
 *
 * show all Recipes with certain ingredient
 * implicityType false,true
 * populate?
 * findAll()?
 */

const router = Router({ mergeParams: true });
const request = require("request");
const apiNutritionUrl = "https://api.calorieninjas.com/v1/nutrition?query=";

//get all recipes
router.get("/find", async (req, res) => {
  try{
  const recipes = await DI.recipeRepository.find({});
  if (!recipes.length) {
    return res.status(400).send({message: "No Recipes found"});
  }
  await DI.recipeRepository.populate(recipes, ["ingredients"]);
  res.status(200).send(recipes);
}catch(e: any){
  res.status(400).send({message: "No Recipes found"});
}
});

//get specific recipe
router.get("/findByName/:name", async (req, res) => {
  const recipeEntries = await DI.recipeRepository.find({
    recipeName: req.params.name,
  });

  if (!recipeEntries) {
    return res.status(400).send(`Recipe ${req.params.name} not found`);
  }

  await DI.recipeRepository.populate(recipeEntries, ["ingredients"]);
  res.status(200).send(recipeEntries);
});

router.get("/findRecipeFromIngredient/:ingredientId", async (req, res) => {
  const ingredient = await DI.ingredientRepository.findOne({
    id: req.params.ingredientId,
  });
  if (!ingredient) {
    return res.status(404).send({ message: "Ingredient not found" });
  }

  const ingredientId = ingredient.id;

  // find ingredient in pivot table
  const allRecipeAndIngredients = await DI.recipeAndIngredientRepository.find({
    ingredient: ingredientId,
  });

  if (!allRecipeAndIngredients.length) {
    return res.status(404).send({ message: "Ingredient in pivot not found" });
  }
  let recipeEntries: RecipeEntity[] = [];
  //search and get all recipes from entries of pivot table
  for (let entry of allRecipeAndIngredients) {
    const recipeEntry = await DI.recipeRepository.find({ id: entry.recipe.id });
    if (!recipeEntry.length) {
      return res.status(400).send("RecipeEntry not found");
    }
    recipeEntries.push(recipeEntry[0]);
  }
  res.status(200).send(recipeEntries);
});

//get available nutrition informations from provided ingredients via calorieninjasApi
router.get("/nutritionInfo/:nutrition", async (req, res) => {
  const query = req.params.nutrition;
  if (!query) {
    return res.status(400).send("Query not found");
  }
  //request to calorieninjasAPI
  request.get(
    {
      url: apiNutritionUrl + query,
      headers: {
        "X-Api-Key": "qordDu2q8YY4Ozmi7lsfUQ==ST6l4Rt21hEECNdh",
      },
    },
    function (error, response, body) {
      if (error) return console.error("Request failed:", error);
      else if (response.statusCode != 200)
        return console.error(
          "Error:",
          response.statusCode,
          body.toString("utf8")
        );
      else {
        res.send({message: sumNutritionInfo(body)});
      }
    }
  );
});

/**
 * middleware
 * name?
 * function to sum nutrition infos from body
 * and returning output string
 */
function sumNutritionInfo(body) {
 
  let proteinList: number[] = [];
  let carbohydrateList: number[] = [];
  let caloriesList: number[] = [];
  JSON.parse(body, function (key, value) {
    switch (key) {
      case "protein_g":
        proteinList.push(value);
        break;
      case "carbohydrates_total_g":
        carbohydrateList.push(value);
        break;
      case "calories":
        caloriesList.push(value);
        break;
      default:
        break;
    }
  });

  const resultProtein = proteinList.reduce((accumulator, current) => {
    return accumulator + current;
  }, 0);
  const resultCarbohydrates = carbohydrateList.reduce(
    (accumulator, current) => {
      return accumulator + current;
    },
    0
  );
  const resultCalories = caloriesList.reduce((accumulator, current) => {
    return accumulator + current;
  }, 0);
  const nutritionStats = `Protein: ${resultProtein} Carbs: ${resultCarbohydrates} Calories: ${resultCalories}`;
  return nutritionStats;
}

// route to create a new recipe
router.post("/create", async (req, res) => {
  const validateRecipeData = await CreateRecipeSchema.validate(req.body).catch(
    (e) => {
      res.status(400).json({ errors: e.errors });
    }
  );
  if (!validateRecipeData) {
    return;
  }

  const createRecipeDTO: CreateRecipeDTO = {
    ...validateRecipeData,
    recipeName: validateRecipeData.recipeName,
    recipeDescription: validateRecipeData.recipeDescription,
    recipePictureLink: validateRecipeData.recipePictureLink,
    recipeSteps: validateRecipeData.recipeSteps,
    recipeRaiting: validateRecipeData.recipeRating!,
  };
  const newRecipe = new RecipeEntity(createRecipeDTO);

  //get ingredients from body
  if (req.body.ingredients) {
    const recipeIngredients: RecipeIngredientEntity[] = [];
    for (let ingredient of req.body.ingredients) {
      const { ingredientId, ...args } = ingredient;
      const loadedIngredient = await DI.ingredientRepository.findOne({
        id: ingredientId,
      });
      if (!!loadedIngredient) {
        const validateRecipeIngredientData =
          await CreateRecipeIngredientSchema.validate(args).catch((e) => {
            res.status(400).json({ errors: e.errors });
          });
        if (!validateRecipeIngredientData) return;

        const createRecipeIngredientDTO: CreateRecipeIngredientDTO = {
          recipe: newRecipe,
          ingredient: loadedIngredient,
          ...validateRecipeIngredientData,
        };

        const newRecipeIngredient = new RecipeIngredientEntity(
          createRecipeIngredientDTO
        );
        recipeIngredients.push(newRecipeIngredient);
      } else {
        res.status(400).send("failed loading Ingredient");
      }
    }
    DI.recipeAndIngredientRepository.persist(recipeIngredients);
    wrap(newRecipe).assign({ ingredients: recipeIngredients }, { em: DI.em });
    DI.recipeRepository.persistAndFlush(newRecipe);

    await DI.recipeRepository.populate(newRecipe, ["ingredients"]);
    res.status(200).send(newRecipe);
  } else {
    res.send(400).send("Ingredients in a Recipe are required");
  }
});

//update recipe informations except ingredients
router.put("/recipeUpdate/:id", async (req, res) => {
  try {
    const recipe = await DI.recipeRepository.findOne(req.params.id, {});
    if (!recipe) {
      return res.status(404).send({ message: "Recipe not found" });
    }

    wrap(recipe).assign(req.body);
    await DI.recipeRepository.flush();

    res.status(200).json(recipe);
  } catch (e: any) {
    return res.status(400).send({ errors: [e.message] });
  }
});

//route to only update ingredients values in a recipe
router.put("/ingredientUpdate/:id", async (req, res) => {
  try {
    const outputIngredients: RecipeIngredientEntity[] = [];
    if (req.body.ingredients) {
      for (let ingredient of req.body.ingredients) {
        let recipeAndIngredient = await DI.recipeAndIngredientRepository.find({
          recipe: req.params.id,
          ingredient: ingredient.ingredientId,
        });
        if (!recipeAndIngredient) {
          res.status(400).send("Ingredient not found");
        }

        for (let entry of recipeAndIngredient) {
          outputIngredients.push(entry),
            wrap(entry).assign({ ...ingredient }, { em: DI.em });
          await DI.recipeAndIngredientRepository.flush();
        }
      }
      res.status(200).send(outputIngredients);
    } else {
      return res.status(400).send("no ingredient information found");
    }
  } catch (e: any) {
    return res.status(400).send({ errors: [e.message] });
  }
});

//route to add one or more ingredients to an existing recipe
router.put("/ingredientAdd/:id", async (req, res) => {
  try {
    const recipe = await DI.recipeRepository.findOne(req.params.id);
    if (!recipe) {
      res.status(400).send("Recipe not found");
    }
    if (req.body.ingredients) {
      const recipeIngredients: RecipeIngredientEntity[] = [];
      //get all ingredients from body
      for (let ingredient of req.body.ingredients) {
        const { ingredientId, ...unitAndAmount } = ingredient;
        const loadedIngredient = await DI.ingredientRepository.findOne({
          id: ingredientId,
        });
        if (loadedIngredient) {
          const validateRecipeIngredientData =
            await CreateRecipeIngredientSchema.validate(unitAndAmount).catch(
              (e) => {
                res.status(400).json({ errors: e.errors });
              }
            );
          if (!validateRecipeIngredientData) return;

          const createRecipeIngredientDTO: CreateRecipeIngredientDTO = {
            recipe: recipe![0],
            ingredient: loadedIngredient!,
            ...validateRecipeIngredientData,
          };
          const newRecipeIngredient = new RecipeIngredientEntity(
            createRecipeIngredientDTO
          );
          recipeIngredients.push(newRecipeIngredient);
        }
      }
      DI.recipeAndIngredientRepository.persist(recipeIngredients);
      wrap(recipe).assign({ ingredients: recipeIngredients }, { em: DI.em });
      DI.recipeRepository.persistAndFlush(recipe!);

      await DI.recipeRepository.populate(recipe!, ["ingredients"]);
      res.status(200).send(recipe);
    } else {
      return res.status(400).send("Ingredients information are requiered");
    }
  } catch (e: any) {
    return res.status(400).send({ errors: [e.message] });
  }
});
// delete specific ingredients from recipe
router.put("/ingredientDelete/:id", async (req, res) => {
  try {
    if (req.body.ingredients) {
      for (let ingredient of req.body.ingredients) {
        const recipeAndIngredient = await DI.recipeAndIngredientRepository.find(
          {
            ingredient: ingredient.ingredientId,
            recipe: req.params.id,
          }
        );
        if (!recipeAndIngredient) {
          res.status(400).send("Ingredient not found");
        }
        for (let entry of recipeAndIngredient) {
          DI.recipeAndIngredientRepository.remove(entry);
          DI.recipeAndIngredientRepository.flush();
        }
      }
      res.status(200).send({message: "Ingredients have been deleted"});
    } else {
      res.status(400).send("Ingredient information not found");
    }
  } catch (e: any) {
    return res.status(400).send({ errors: [e.message] });
  }
});

//delete a complete recipe
router.delete("/:id", async (req, res) => {
  try {
    const existingRecipe = await DI.recipeRepository.findOne({
      id: req.params.id,
    });

    if (!existingRecipe) {
      return res.status(403).json({ errors: ["You cant delete this id"] });
    }

    const recipeAndIngredient = await DI.recipeAndIngredientRepository.find({
      recipe: req.params.id,
    });
    if (!recipeAndIngredient) {
      return res.status(403).json({ errors: ["You cant delete this id"] });
    }
    await DI.recipeAndIngredientRepository.remove(recipeAndIngredient).flush();
    await DI.recipeRepository.remove(existingRecipe).flush();
    return res.status(204).send({message: "recipe deleted"});
  } catch (e: any) {
    return res.status(400).send({ errors: [e.message] });
  }
});

export const RecipeController = router;
