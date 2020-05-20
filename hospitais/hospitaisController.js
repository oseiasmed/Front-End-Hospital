const express = require("express");
const router = express.Router();
const Hospital = require("./Hospital");
const adminAuth = require("../middlewares/adminAuth");

router.get("/", (req, res) => {

    res.render("hospitais/index")
})

router.get("/hospitais/listar", adminAuth,(req, res) => {

    Hospital.findAll().then(hospitais => {

        res.render("hospitais/list", { hospitais: hospitais });
    })
});


router.get("/hospitais/cadastrar", (req, res) => {

    res.render("hospitais/new")

})

// Salvar / Cadastrar Hospitais

router.post("/hospitais/save",adminAuth, (req, res) => {
    var nome = req.body.nome;
    var cnpj = req.body.cnpj;
    var endereco = req.body.endereco;
    var numero = req.body.numero;
    var cep = req.body.cep;
    var complemento = req.body.complemento;
    var bairro = req.body.bairro;
    var cidade = req.body.cidade;
    var uf = req.body.uf;

    if (nome != undefined) {

        Hospital.create({
            nome: nome,
            cnpj: cnpj,
            endereco: endereco,
            numero: numero,
            cep: cep,
            complemento: complemento,
            bairro: bairro,
            cidade: cidade,
            uf: uf

        }).then(() => {
            res.redirect("/hospitais/listar");
        })

    } else {
        res.redirect("/hospitais/save");
    }
});

// Deletar hospitais

router.post("/hospitais/delete", adminAuth,(req, res) => {
    var id = req.body.id;
    if (id != undefined) {
        if (!isNaN(id)) {
            Hospital.destroy({
                where: {
                    id: id
                }
            }).then(() => {
                res.redirect("/hospitais/listar");
            });
        } else {// NÃO FOR UM NÚMERO
            res.redirect("/hospitais/listar");
        }
    } else { // NULL
        res.redirect("/hospitais/index");
    }
});

//Editar Hospital

router.get("/hospitais/editar/:id",adminAuth, (req, res) => {
    var id = req.params.id;

    if (isNaN(id)) {
        res.redirect("/hospitais/listar");
    }

    Hospital.findByPk(id).then(hospitals => {

        if (hospitals != undefined) {

            res.render("hospitais/edit", { hospitals: hospitals });

        } else {
            res.redirect("/hospitais/listar");
        }

    }).catch(erro => {

        res.redirect("/hospitais/listar");
    })
})

router.post("/hospitais/atualizar", adminAuth,(req, res) => {
    id = req.body.id;
    var nome = req.body.nome;
    var cnpj = req.body.cnpj;
    var endereco = req.body.endereco;
    var numero = req.body.numero;
    var cep = req.body.cep;
    var complemento = req.body.complemento;
    var bairro = req.body.bairro;
    var cidade = req.body.cidade;
    var uf = req.body.uf;

    Hospital.update({

        nome: nome,
        cnpj: cnpj,
        endereco: endereco,
        numero: numero,
        cep: cep,
        complemento: complemento,
        bairro: bairro,
        cidade: cidade,
        uf: uf


    }, {
        where: {
            id: id
        }
    }).then(() => {
        res.redirect("/hospitais/listar/");
    })

});

module.exports = router;