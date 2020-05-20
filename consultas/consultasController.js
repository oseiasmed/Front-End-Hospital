const express = require("express");
const router = express.Router();
const Hospital = require("../hospitais/Hospital");
const Consulta = require("./Consulta");
const Paciente = require("../pacientes/Paciente");
const Status = require("../status/Status");
const adminAuth = require("../middlewares/adminAuth");


router.get("/consultas/result", (req, res) => {

    Consulta.findAll({

        include: [{ model: Hospital }, { model: Paciente }, { model: Status }],

    }).then(hospitais => {

        // var contaminado = 0;
        // var obito = 0;
        // var curado = 0;
        // var naoContaminado = 0;

        //     consultas.Foreach(consultas){

        //     if (consulta.status.id == 1) {
        //         contaminado++;
        //     }

        //     else if (consulta.status.id == 2) {
        //         curado++;

        //     } else if (consulta.status.id == 3) {
        //         obito++;

        //     } else if (consulta.status.id == 4) {
        //         naoContaminado++;
        //     }
        // }

        return res.render("dashboard/result", { hospitais: hospitais,consultas:consultas});

    })
});

// Dashboard

router.get("/consultas/dashboard", (req, res) => {

    Consulta.findAll({


        include: [{ model: Hospital }, { model: Paciente }, { model: Status }],

    }).then(consultas => {

        res.render("dashboard/dashboard", { consultas: consultas });

    })
});

// Listar consultas 

router.get("/consultas/listar", adminAuth, (req, res) => {

    Consulta.findAll({
        include: [{ model: Hospital }, { model: Paciente }, { model: Status }]
    }).then(consultas => {

        res.render("consultas/list", { consultas: consultas });
    })
});

//Listar campos dentro do formulário para salvar consultas

router.get("/consultas/cadastrar", adminAuth, (req, res) => {

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

router.post("/consultas/save", adminAuth, (req, res) => {

    var hospitais = req.body.hospitais;
    var pacienteId = req.body.pacientes;
    var dtconsulta = req.body.dtconsulta;
    var statusId = req.body.status;

    if (hospitais != undefined) {

        Consulta.create({

            hospitalId: hospitais,
            pacienteId: pacienteId,
            statusId: statusId,
            dtconsulta: dtconsulta

        }).then(() => {

            res.redirect("/");
        })

    } else {
        res.redirect("/");
    }
});

// Excuir Consultas

router.post("/consultas/delete", adminAuth, (req, res) => {
    var id = req.body.id;
    if (id != undefined) {
        if (!isNaN(id)) {
            Consulta.destroy({
                where: {
                    id: id
                }
            }).then(() => {
                res.redirect("/consultas/listar");
            });
        } else {// NÃO FOR UM NÚMERO
            res.redirect("/consultas/listar");
        }
    } else { // NULL
        res.redirect("/consultas/index");
    }
});

module.exports = router;