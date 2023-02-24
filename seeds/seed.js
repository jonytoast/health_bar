// imports sequelize and seeding functions
const sequelize = require('../config/connection');
const seedUser = require('./userSeedData');
const seedRecipe = require('./recipeSeedData.js');
const seedComment = require('./commentSeedData.js');

// async functions to seed database
const seedDatabase = async () => {

  await sequelize.sync({ force: true });

  await seedUser();
  console.log("\n------ User Data Seeded -----\n");

  await seedRecipe();
  console.log("\n----- Recipe Data Seeded -----\n");

  await seedComment();
  console.log("\n----- Comment Data Seeded -----\n");

  process.exit(0);
};

// calls the function
seedDatabase();
