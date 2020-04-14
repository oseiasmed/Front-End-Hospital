const Sequelize = require("sequelize");
const connection = require("../database/database");
const Category = require("../hospitais/Hospital");

const Paciente = connection.define('paciente', {

    nome: {
        type: Sequelize.STRING,
        allowNull: false
    }, cpf: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    dtanascimento: {
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

    rua: {
        type: Sequelize.STRING,
        allowNull: false
    },
})

Hosital.hasMany(Paciente); // Um hospital tem muitos pacientes
Paciente.belongsTo(Hospital); // UM paciente está internado em um hosital

module.exports = Paciente;