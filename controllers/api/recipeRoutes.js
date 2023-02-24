const router = require('express').Router();
const { Recipe } = require('../../models');
const withAuth = require('../../utils/auth');

//post a recipe
router.post('/', withAuth, async (req, res) => {
  try {
    const newRecipe = await Project.create({
      ...req.body,
      recipe_owner: req.session.user_id,
    });

    res.status(200).json(newRecipe);
  } catch (err) {
    res.status(400).json(err);
  }
});

module.exports = router;