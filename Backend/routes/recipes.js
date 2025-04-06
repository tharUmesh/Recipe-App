const express = require("express");
const Recipe = require("../models/Recipe");
const auth = require("../middleware/auth");

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const recipes = await Recipe.find();
    res.json(recipes);
  } catch (error) {
    res.status(500).json({ error: "Error fetching recipes" });
  }
});

// Add this route to get a single recipe by ID
router.get("/:id", async (req, res) => {
  try {
    const recipe = await Recipe.findById(req.params.id);
    if (!recipe) {
      return res.status(404).json({ error: "Recipe not found" });
    }
    res.json(recipe);
  } catch (error) {
    res.status(500).json({ error: "Error fetching recipe" });
  }
});

router.post("/", auth, async (req, res) => {
  try {
    const { title, ingredients, instructions } = req.body;
    const recipe = new Recipe({
      title,
      ingredients,
      instructions,
      userId: req.userId,
    });
    await recipe.save();
    res.status(201).json(recipe);
  } catch (error) {
    res.status(500).json({ error: "Error creating recipe" });
  }
});

module.exports = router;
