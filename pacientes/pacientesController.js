const express = require("express");
const router = express.Router();
const Paciente = require("./Paciente");
const adminAuth = require("../middlewares/adminAuth");


//const adminAuth = require("../middlewares/adminAuth");

router.get("/pacientes/cadastar", (req, res) => {

    res.render("pacientes/new")
})


// ======================== Listar Pacientes =========================== //

router.get("/pacientes/listar", adminAuth ,(req, res) => {

    Paciente.findAll().then(pacientes => {

        res.render("pacientes/list", { pacientes: pacientes });
    })
});

router.get("/pacientes/cadastrar", (req, res) => {

    res.render("pacientes/new")

})


// ==========================  Salvar / Cadastrar Pacientes ======================= // 

router.post("/pacientes/save", adminAuth ,(req, res) => {
    var nome = req.body.nome;
    var cpf = req.body.cpf;
    var endereco = req.body.endereco;
    var numero = req.body.numero;
    var dtnascimento = req.body.dtnascimento;
    var complemento = req.body.complemento;
    var bairro = req.body.bairro;
    var cidade = req.body.cidade;
    var uf = req.body.uf;

    if (nome != undefined) {

        Paciente.create({
            nome: nome,
            cpf: cpf,
            endereco: endereco,
            numero: numero,
            dtnascimento: dtnascimento,
            complemento: complemento,
            bairro: bairro,
            cidade: cidade,
            uf: uf

        }).then(() => {
            res.redirect("/pacientes/listar");
        })

    } else {
        res.redirect("/pacientes/save");
    }
});

router.post("/pacientes/delete",adminAuth , (req, res) => {
    var id = req.body.id;

    if (id != undefined) {
        if (!isNaN(id)) {
            Paciente.destroy({
                where: {
                    id: id
                }
            }).then(() => {
                res.redirect("/pacientes/listar");
            });
        } else {// NÃO FOR UM NÚMERO
            res.redirect("/pacientes/listar");
        }
    } else { // NULL
        res.redirect("/pacientes/index");
    }
});


// ============= Editar Pacientes =============== //

router.get("/pacientes/editar/:id",adminAuth , (req, res) => {
    
    var id = req.params.id;

    if (isNaN(id)) {
        res.redirect("/pacientes/listar");
    }

    Paciente.findByPk(id).then(pacientes => {

        if (pacientes != undefined) {

            res.render("pacientes/edit", { pacientes: pacientes });

        } else {
            res.redirect("/pacientes/listar");
        }

    }).catch(erro => {

        res.redirect("/pacientes/listar");
    })
})

// ======= Persistir edição de Pacientes ========= //

router.post("/pacientes/atualizar",adminAuth , (req, res) => {
    id = req.body.id;
    var nome = req.body.nome;
    var cpf = req.body.cpf;
    var endereco = req.body.endereco;
    var numero = req.body.numero;
    var dtnascimento = req.body.dtnascimento;
    var complemento = req.body.complemento;
    var bairro = req.body.bairro;
    var cidade = req.body.cidade;
    var uf = req.body.uf;

    Paciente.update({

        nome: nome,
        cpf: cpf,
        endereco: endereco,
        numero: numero,
        dtnascimento: dtnascimento,
        complemento: complemento,
        bairro: bairro,
        cidade: cidade,
        uf: uf
    }, {
        where: {
            id: id
        }
    }).then(() => {
        res.redirect("/pacientes/listar/");
    })

});

module.exports = router;