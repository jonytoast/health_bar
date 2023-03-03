const User = require('./User');
const Recipe = require('./Recipe');
const Comment = require('./Comment');

//Associations for models
User.hasMany(Recipe, {
  foreignKey: 'user_id',
  onDelete: 'CASCADE'
});

Recipe.belongsTo(User, {
  foreignKey: 'user_id'
});

Comment.belongsTo(User, {
  foreignKey: 'commenter_id'
});

Comment.belongsTo(Recipe, {
  foreignKey: 'recipe_id',
  onDelete: 'CASCADE'
});

User.hasMany(Comment, {
  foreignKey: 'commenter_id',
});

Recipe.hasMany(Comment, {
  foreignKey: 'recipe_id',
  onDelete: 'CASCADE'
});

// exports associated Models
module.exports = { User, Recipe, Comment };