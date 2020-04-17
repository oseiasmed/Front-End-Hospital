const Sequelize = require("sequelize");
const connection = require("../database/database");
const Paciente= require("../pacientes/Paciente");

const Consulta = connection.define('consultas', {

    idhospital: {
        type: Sequelize.INTEGER,
        allowNull: false
    },

    idpaciente: {
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

Paciente.hasMany(Consulta); 
Consulta.belongsTo(Paciente); 

module.exports = Consulta;