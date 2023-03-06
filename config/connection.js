// Sequelize database connection process
const Sequelize = require('sequelize');
require('dotenv').config();

let sequelize;

// When using JAWSDB for database hosting
if (process.env.JAWSDB_URL) {

    sequelize = new Sequelize(process.env.JAWSDB_URL);

} else {

// Using local environment variables 
    sequelize = new Sequelize(
        process.env.DB_NAME,
        process.env.DB_USER,
        process.env.DB_PASSWORD, 
        {
        host: 'localhost',
        dialect: 'mysql',
        port: 3306,
        }
    );
}

// Exports sequelize connection
module.exports = sequelize;
