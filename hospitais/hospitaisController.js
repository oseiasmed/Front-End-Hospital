const express = require("express");
const router = express.Router();
//const Category = require("./Category");
const Hospital = require("./Hospital");
const adminAuth = require("../middlewares/adminAuth");


router.get("/", (req, res) => {

    Hospital.findAll().then(hospitais => {

        res.render("admin/hospitais/list", { hospitais: hospitais });

    })
});

router.get("/admin/hospitais/new", (req, res) => {
    res.render("admin/hospitais/new");
});


// Listar hospitais

router.get("/admin/hospitais", (req, res) => {

    Hospital.findAll().then(hospitais => {

        res.render("admin/hospitais/list", { hospitais: hospitais });

    })
})

// Salvar hospitais

router.post("/admin/hospitais/save", (req, res) => {
    var nome = req.body.nome;
    var cep = req.body.cep;
    var cnpj = req.body.cnpj;
    var endereco = req.body.endereco;
    var numero = req.body.numero;
    var complemento = req.body.complemento;
    var bairro = req.body.bairro;
    var cidade = req.body.cidade;
    var uf = req.body.uf;

    if (nome != undefined) {

        Hospital.create({
            nome: nome,
            cep: cep,
            cnpj: cnpj,
            endereco: endereco,
            numero: numero,
            complemento: complemento,
            bairro: bairro,
            cidade: cidade,
            uf: uf

        }).then(() => {
            res.redirect("/admin/hospitais/new");
        })

    } else {
        res.redirect("admin/hospitais/new");
    }
});

module.exports = router;