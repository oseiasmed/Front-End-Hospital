const Sequelize = require("sequelize");

const connection = new Sequelize('hospital_db', 'root', '', {
    host: 'localhost',
    dialect: 'mysql',
    timezone: "+03:00"
});

module.exports = connection;