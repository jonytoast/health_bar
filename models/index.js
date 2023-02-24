// imports sequelize Models
const User = require('./User');
const Recipe = require('./Recipe');
const Comment = require('./Comment');

// Model associations
// a user has multiple recipes
User.hasMany(Recipe,{
    foreignKey: "recipe_owner",
    onDelete: "CASCADE"
});

// a recipe belongs to a user
Recipe.belongsTo(User,{
    foreignKey: "recipe_owner",
});

// a user has multiple comments
User.hasMany(Comment,{
    foreignKey: "commenter_id",
    onDelete: "CASCADE"
});

// a comment belongs to a user
Comment.belongsTo(User,{
    foreignKey: "commenter_id"
});

// a comment belongs to a recipe
Comment.belongsTo(Recipe,{
    foreignKey: "recipe_id"
});

// a recipe has multiple comments
Recipe.hasMany(Comment,{
    foreignKey: "recipe_id",
    onDelete: "CASCADE"
});

// exports associated Models
module.exports = { User, Recipe, Comment };

