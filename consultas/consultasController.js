const express = require("express");
const router = express.Router();
const Hospital = require("../hospitais/Hospital");
const Consulta = require("./Consulta");
const Paciente = require("../pacientes/Paciente");
const Status = require("../status/Status");

// Cadastrar consultas listadas

router.get("/consultas/listar", (req, res) => {

    Hospital.findAll().then(consultas => {

        res.render("consultas/list", { consultas: consultas });
    })
});

router.get("/consultas/cadastrar", (req, res) => {

    var hospitais;
    var pacientes;
    var status;

    Hospital.findAll().then(h => {

        hospitais = h;

    })

    Paciente.findAll().then(p => {

        pacientes = p;
    })

    Status.findAll().then(st => {

        status = st;

        res.render("consultas/new", { hospitais: hospitais, pacientes: pacientes, status: status });

    })
})

// ==========================  Salvar / Cadastrar consultas ======================= // 

router.post("/consultas/save", (req, res) => {

    var hospitais = req.body.hospitais;
    var pacientes = req.body.pacientes;
    var dtconsulta = req.body.dtconsulta;
    
    if (hospitais != undefined) {

        Consulta.create({

            hospitalId: hospitais,
            pacienteId: pacientes,
            statusId: pacientes,
            dtconsulta:dtconsulta

        }).then(() => {

            res.redirect("/");
        })

    } else {
        res.redirect("/");
    }
});

module.exports = router;