const express = require("express");
const router = express.Router();
const Hospital = require("../hospitais/Hospital");
const Consulta = require("./Consulta");
const Paciente = require("../pacientes/Paciente");
const Status = require("../status/Status");

// Cadastrar consultas listadas
router.get("/consultas/listar", (req, res) => {

    Consulta.findAll({ include: [{ model: Hospital }, { model: Paciente }, { model: Status }] }).then(consultas => {

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

router.post("/consultas/delete", (req, res) => {
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


//Editar Consultas

// ============= Editar Pacientes =============== //

router.get("/consultas/editar/:id", (req, res) => {
    var id = req.params.id;
    var hospitais = req.body.hospitais;
    var pacientes = req.body.pacientes;
    var dtconsulta = req.body.dtconsulta;

    if (isNaN(id)) {
        res.redirect("/consultas/listar");
    }

    Consulta.findByPk(id).then(consultas => {

        if (pacientes != undefined) {

            res.render("consultas/edit", { consultas: consultas });

        } else {
            res.redirect("/consultas/listar");
        }

    }).catch(erro => {

        res.redirect("/consultas/listar");
    })
})

// ======= Persistir edição de Consultas ========= //

router.post("/consultas/atualizar", (req, res) => {
    id = req.body.id;
    var hospitais = req.body.hospitais;
    var pacientes = req.body.pacientes;
    var dtconsulta = req.body.dtconsulta;


    Consulta.update({

        hospitalId: hospitais,
        pacienteId: pacientes,
        statusId: pacientes,
        dtconsulta: dtconsulta

    }, {
        where: {
            id: id
        }
    }).then(() => {
        res.redirect("/consultas/listar/");
    })
});

module.exports = router;