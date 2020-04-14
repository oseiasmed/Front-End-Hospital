const Sequelize = require("sequelize");
const connection = require("../database/database");

const Hospital = connection.define('hospital', {

    nome: {
        type: Sequelize.STRING,
        allowNull: false
    },

    cep: {
        type: Sequelize.INTEGER,
        allowNull: false
    },

    endereco: {
        type: Sequelize.STRING,
        allowNull: false
    },

    numero: {
        type: Sequelize.INTEGER,
        allowNull: false
    },

    bairro: {
        type: Sequelize.STRING,
        allowNull: false
    },

    complemento: {
        type: Sequelize.STRING,
        allowNull: false
    },

    cidade: {
        type: Sequelize.STRING,
        allowNull: false
    },

    uf: {
        type: Sequelize.STRING,
        allowNull: false
    },

    cnpj: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
})

module.exports = Hospital;