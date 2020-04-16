const express = require("express");
const router = express.Router();
const Hospital = require("../hospitais/Hospital");
const Consulta = require("./Consulta");
const Paciente = require("../pacientes/Paciente");

// Listar consultas

router.get("/consultas/listar", (req, res) => {

    Hospital.findAll().then(consultas => {

        res.render("consultas/list", { consultas: consultas });
    })
});

router.get("/consultas/cadastrar", (req, res) => {

    var hospitais;
    var pacientes;
    //var status;

    Hospital.findAll().then(h => {

        hospitais=h;

    })

    Paciente.findAll().then(p => {

        pacientes=p;
        
        console.log(hospitais)
        res.render("consultas/new", { hospitais:hospitais,pacientes:pacientes });
    })
})

module.exports = router;