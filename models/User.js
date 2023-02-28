// sequelize packages
const { Model, DataTypes } = require('sequelize');
const bcrypt = require('bcryptjs');
const sequelize = require('../config/connection');

// sets up User Model with custom method to check user password with bcrypt
class User extends Model {

    checkUserPassword(userPassword) {

        return bcrypt.compareSync(userPassword, this.password)

    }

};

// initiates User Model
User.init(
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            allowNull: false,
            autoIncrement: true,
        },
        username: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                isEmail: true,
            },
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                isAlphanumeric: true,
                len: [6, 30],
            },
        },
    },
    {
        sequelize,
        timestamps: true,
        underscored: true,
        modelName: "user",
        freezeTableName: true,
    }
);

// exports User Model
module.exports = User;