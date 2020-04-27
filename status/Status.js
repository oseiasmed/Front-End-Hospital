const Sequelize = require("sequelize");
const connection = require("../database/database");


const Status = connection.define('status', {

    descricao: {
        type: Sequelize.STRING,
        allowNull: false
    }
});

module.exports = Status;