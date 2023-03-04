// Sequelize database connection process
const Sequelize = require('sequelize');

let sequelize;

// when using JAWSDB for database hosting
if (process.env.JAWSDB_URL) {

    sequelize = new Sequelize(process.env.JAWSDB_URL);

} else {

// using local environment variables 
    sequelize = new Sequelize(
        "health_bar_db",
        "root",
        "rootpass", 
        {
        host: '127.0.0.1',
        dialect: 'mysql',
        port: 3306,
        }
    );
}

// exports sequelize connection
module.exports = sequelize;
