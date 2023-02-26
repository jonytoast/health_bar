const router = require('express').Router();
const userRoutes = require('./userRoutes');
const recipeRoutes = require('./recipeRoutes');
const nutritionRoutes = require('./nutritionRoutes');
const ingredientRoutes = require('./ingredientRoutes');

router.use('/users', userRoutes);
router.use('/recipes', recipeRoutes);
router.use('/nutrition',nutritionRoutes);
router.use('/ingredients', ingredientRoutes);

module.exports = router;
