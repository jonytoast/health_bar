require('dotenv').config();

//Seeding the database

const sequelize = require('../config/connection');
const { User, Recipe, Comment } = require('../models');

const userData = require('./userSeedData.json');
const recipeData = require('./recipeSeedData.json');
const commentData = require('./commentSeedData.json');

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

seedDatabase();
