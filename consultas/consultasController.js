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
    
    var consultas = req.body.consultas;
    
   

    if (consultas != undefined) {

        Consulta.create({

            
            consultas:consultas,
          
           
           
        }).then(() => {
            res.redirect("/pacientes/listar");
        })

    } else {
        res.redirect("/pacientes/save");
    }
});

module.exports = router;