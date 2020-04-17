ed
/
Hospital-NodeJS
1
00
 Code Issues 0 Pull requests 0 Actions Projects 0 Wiki Security Insights Settings
Hospital-NodeJS/consultas/consultasController.js /
@oseiasmed oseiasmed Refatorando o código do projeto Node Hospital
b4a9535 5 hours ago
78 lines (44 sloc)  1.42 KB
  
Code navigation is available!
Navigate your code with ease. Click on function and method calls to jump to their definitions or references in the same repository. Learn more

const express = require("express");
const router = express.Router();
const Hospital = require("../hospitais/Hospital");
const Consulta = require("./Consulta");
const Paciente = require("../pacientes/Paciente");
const Status = require("../status/Status");

// Listar consultas

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


router.get("/pacientes/cadastrar", (req, res) => {

    res.render("pacientes/new")

})

module.exports = router;