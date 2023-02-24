const router = require('express').Router();
const userRoutes = require('./userRoutes');
const recipeRoutes = require('./recipeRoutes');
// const nutritionRoutes = require('./nutritionRoutes');

router.use('/users', userRoutes);
router.use('/recipes', recipeRoutes);
// router.use('/nutrition',nutritionRoutes);

module.exports = router;
