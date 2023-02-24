// Sequelize database connection process
const Sequelize = require('sequelize');
require('dotenv').config();

let sequelize;

// when using JAWSDB for database hosting
if (process.env.JAWSDB_URL) {

    sequelize = new Sequelize(process.env.JAWSDB_URL);

} else {

// using local environment variables 
    sequelize = new Sequelize(
        "health_bar_db",
        "root",
        "FeddericoWayne",
        {
        host: 'localhost',
        dialect: 'mysql',
        port: 3306,
        }
    );
}



// exports sequelize connection
module.exports = sequelize;
