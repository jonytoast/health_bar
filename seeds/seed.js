require('dotenv').config();
const sequelize = require('../config/connection');
// imports sequelize Models
const { User, Recipe, Comment } = require('../models');

// imports required json modules for data seeding
const userData = require('./userSeedData.json');
const recipeData = require('./recipeSeedData.json');
const commentData = require('./commentSeedData.json');

// async function to seed database
const seedDatabase = async () => {
  await sequelize.sync({ force: true });

  const users = await User.bulkCreate(userData, {
    individualHooks: true,
    returning: true,
  });

  const recipes = await Recipe.bulkCreate(recipeData);

  const comments = await Comment.bulkCreate(commentData);

  process.exit(0);
};

// calls the function to seed database
seedDatabase();
