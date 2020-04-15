const express = require("express");
const router = express.Router();
//const Category = require("./Category");
const Hospital = require("./Hospital");
//const adminAuth = require("../middlewares/adminAuth");

router.get("/", (req, res) => {

    res.render("hospitais/index")
})

router.get("/hospitais/listar", (req, res) => {

    Hospital.findAll().then(hospitais => {

        res.render("hospitais/list", { hospitais: hospitais });
    })
});

router.get("/hospitais/cadastrar", (req, res) => {

    res.render("hospitais/new")

})

// Salvar hospitais

router.post("/hospitais/save", (req, res) => {
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
        res.redirect("/hospitais/new");
    }
});


// Deletar hospitais

router.post("/hospitais/delete", (req, res) => {
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


router.get("/hospitais/editar/:id", (req, res) => {
    var id = req.params.id;

    if (isNaN(id)) {
        res.redirect("/hospitais");
    }

    Hospital.findByPk(id).then(hospital => {
        if (hospital != undefined) {
            res.render("admin/categories/edit", { hospital: hospital });
        } else {
            res.redirect("/hospitais/listar");
        }
    }).catch(erro => {
        res.redirect("/hospitais/listar");
    })
})

//Editar Hospitais

router.post("/hospitais/cadastrar/", (req, res) => {

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
        res.redirect("/hospitais/cadastrar/");
    })

});


module.exports = router;