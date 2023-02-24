const sequelize = require('../config/connection');
const { Recipe, User, Comment} = require('../models');
const recipeData = require('./recipeSeedData.json');
const commentSeedData = require('./commentSeedData.json');


const seedDatabase = async () => {
  await sequelize.sync({ force: true });

const recipes = await Recipe.bulkCreate(recipeData, {
    individualHooks: true,
    returning: true,
  });

  for (const { id } of recipes) {
    const newCard = await User.create({
      user_id: id,
    });
  }

  for (const Comment of commentSeedData) {
    const newComment = await Comment.create({
      ...comment,
      user_id: comment[Math.floor(Math.random() * readers.length)].id,
    });
  }
 
  process.exit(0);
};

seedDatabase();
