// imports sequelize and seeding functions
const sequelize = require('../config/connection');
const seedUser = require('./userSeedData');
const seedRecipe = require('./recipeSeedData');
const seedComment = require('./commentSeedData');

// async functions to seed database
const seedDatabase = async () => {

  await sequelize.sync();
  console.log("\n------ Databased synced -----\n");

  await seedUser();
  console.log("\n------ User Data Seeded -----\n");

  await seedRecipe();
  console.log("\n----- Recipe Data Seeded -----\n");

  await seedComment();
  console.log("\n----- Comment Data Seeded -----\n");

};

// calls the function
seedDatabase();
 