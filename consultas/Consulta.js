const Sequelize = require("sequelize");
const connection = require("../database/database");

const Consulta = connection.define('status_pacientes', {

    descricao: {
        type: Sequelize.STRING,
        allowNull: false
    },

    id_hospital: {
        type: Sequelize.INTEGER,
        allowNull: false
    },

    id_paciente: {
        type: Sequelize.INTEGER,
        allowNull: false
    },

    idstatus_paciente: {
        type: Sequelize.INTEGER,
        allowNull: false
    },

    dt_consulta: {
        type: Sequelize.DATE,
        allowNull: false
    }
});

module.exports = Consulta;