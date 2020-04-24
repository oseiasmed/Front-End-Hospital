const Sequelize = require("sequelize");
const connection = require("../database/database");
const Paciente= require("../pacientes/Paciente");


const Consulta = connection.define('consultas', {

    hospitalId: {
        type: Sequelize.INTEGER,
        allowNull: false
    },

    pacienteId: {
        type: Sequelize.INTEGER,
        allowNull: false
    },

    statusId: {
        type: Sequelize.INTEGER,
        allowNull: false
    },

    dtconsulta: {
        type: Sequelize.DATE,
        allowNull: false
    }
});

Paciente.hasMany(Consulta); 
Consulta.belongsTo(Paciente); 

//Consulta.sync({force:true});

module.exports = Consulta;