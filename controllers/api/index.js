const router = require('express').Router();
const userRoutes = require('./userRoutes');
const recipeRoutes = require('./recipeRoutes');
const nutritionRoutes = require('./nutritionRoutes');
const commentRoutes = require('./commentRoutes');

router.use('/users', userRoutes);
router.use('/recipes', recipeRoutes);
router.use('/nutrition',nutritionRoutes);
router.use('/comments', commentRoutes);

module.exports = router;
