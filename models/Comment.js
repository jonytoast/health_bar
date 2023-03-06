// required packages
const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

// sets up Comment Model
class Comment extends Model { };

// initiates Comment Model
Comment.init(
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            allowNull: false,
            autoIncrement: true,
        },
        comment_text: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
        commenter_id: {
            type: DataTypes.INTEGER,
            references: {
                model: "user",
                key: "id"
            },
        },
        recipe_id: {
            type: DataTypes.INTEGER,
            references: {
                model: "recipe",
                key: "id"
            },
        }
    },
    {
        sequelize,
        timestamps: true,
        underscored: true,
        modelName: "comment",
        freezeTableName: true,
    }
);

// exports Comment Model
module.exports = Comment;
