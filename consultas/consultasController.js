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


// ==========================  Salvar / Cadastrar Pacientes ======================= // 

router.post("/consultas/save", (req, res) => {
    
    var dtconsulta = req.body.dtconsulta;
    
    
    if (consultas != undefined) {

        Consulta.create({

            
            dtconsulta:dtconsulta,
           
          
         }).then(() => {
            res.redirect("/consultas/listar");
        })

    } else {
        res.redirect("/consultas/save");
    }
});

module.exports = router;