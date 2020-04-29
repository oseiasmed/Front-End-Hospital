const Sequelize = require("sequelize");
const connection = require("../database/database");
const Paciente = require("../pacientes/Paciente");
const Hospital = require("../hospitais/Hospital");
const Status = require("../status/Status");




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
Hospital.hasMany(Consulta);
Status.hasMany(Consulta);
Consulta.belongsTo(Paciente); 
Consulta.belongsTo(Hospital);
Consulta.belongsTo(Status);

module.exports = Consulta;