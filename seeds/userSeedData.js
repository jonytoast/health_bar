// imports User Model for seeding
const { User } = require('../models');

// array of user seed data
const userSeedData = [

  {
    username: "Janet",
    email: "janet@hotmail.com",
    password: "1234567"
  },
  {
    username: "Laura",
    email: "laura@gmail.com",
    password: "abcdefg"
  },
  {
    username: "Ben",
    email: "benki@yahoo.com",
    password: "1234xyz"
  },
  {
    username: "Devin",
    email: "devinc@gmail.com",
    password: "abc1234"
  }

];

// function to seed user data
const seedUser = () => {

  User.bulkCreate(userSeedData);

};

// exports user seeding function
module.exports = seedUser;