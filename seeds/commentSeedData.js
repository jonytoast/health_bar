// imports comment Model
const { Comment } = require('../models');

// array of comment seed data
const commentSeedData = [

    {
      comment_text: "Super tasty recipe",
      commenter_id: 2,
      recipe_id: 1
    },
    {
        comment_text: "I loved it! Low calorie and high in protein",
        commenter_id: 3,
        recipe_id: 2
    },
    {
        comment_text: "Could taste better but I'm content with the nutritional values",
        commenter_id: 1,
        recipe_id: 4
    },
    {
        comment_text: "It was soooo yummy and easy to cook!",
        commenter_id: 4,
        recipe_id: 3
    }

  ];

// function to seed comment data
const seedComment = () => {

  Comment.bulkCreate(commentSeedData);

};

// exports comment seeding function
module.exports = seedComment;