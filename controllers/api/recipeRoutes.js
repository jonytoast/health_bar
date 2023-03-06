const router = require('express').Router();
const { Recipe } = require('../../models');
const withAuth = require('../../utils/auth');

// Post a recipe
router.post('/', withAuth, async (req, res) => {
  try {

    const newRecipe = await Recipe.create({
      title: req.body.title,
      recipe_text: req.body.recipe_text,
      main_ingredient: req.body.main_ingredient,
      user_id: req.session.user_id
    });

    res.status(200).json(newRecipe);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Delete a recipe
router.delete('/:id', withAuth, async (req, res) => {
  try {
    const recipeData = await Recipe.destroy({
      where: {
        id: req.params.id
      },
    });

    if (!recipeData) {
      res.status(404).json({ message: 'No recipe found with this id!' });
      return;
    }

    res.status(200).json(recipeData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Update a recipe/post
router.put('/:id', withAuth, async (req, res) => {
  try {

    const updatedName = req.body.updatedName;
    const updatedBody = req.body.updatedBody;
    const mainIngredient = req.body.mainIngredient;

    const recipeData = await Recipe.update(
      {
        title: updatedName,
        recipe_text: updatedBody,
        main_ingredient: mainIngredient,
        user_id: req.session.user_id
      },
      {
        where: {
          id: req.params.id
        }
      }
    );

    if (!recipeData) {
      res.status(404).json({ message: 'No recipe found with this id!' });
      return;
    }

    res.status(200).json(recipeData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;