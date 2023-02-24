// imports comment Model
const { comment } = require('../models');

// array of comment seed data
const commentSeedData = [

    {
      comment_text: "Super tasty recipe",
      commenter_id: "1234567"
    },
    {
        comment_text: "I loved it! Low calorie and high in protein",
        commenter_id: "1234567"
    },
    {
        comment_text: "Could taste better but I'm content with the nutritional values",
        commenter_id: "1234567"
    },
    {
        comment_text: "It was soooo yummy and easy to cook!",
        commenter_id: "1234567"
    }

  ];

// function to seed comment data
const seedComment = () => {

  comment.bulkCreate(commentSeedData);

};

// exports comment seeding function
module.exports = seedComment;