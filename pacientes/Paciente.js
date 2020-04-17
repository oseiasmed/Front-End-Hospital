const Sequelize = require("sequelize");
const connection = require("../database/database");


const Paciente = connection.define('pacientes', {

    nome: {
        type: Sequelize.STRING,
        allowNull: false

    }, cpf: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    dtnascimento: {
        type: Sequelize.DATE,
        allowNull: false
    },
    numero: {
        type: Sequelize.INTEGER,
        allowNull: false
    },

    complemento: {
        type: Sequelize.STRING,
        allowNull: false
    },

    bairro: {
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

    endereco: {
        type: Sequelize.STRING,
        allowNull: false
    },
})

module.exports = Paciente;