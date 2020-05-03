const express = require("express");
const router = express.Router();
const User = require("./User");
const bcrypt = require('bcryptjs');
const adminAuth = require("../middlewares/adminAuth");

router.get("/admin/users", (req, res) => {
    User.findAll().then(users => {
        res.render("admin/users/index", { users: users });
    });
});

router.get("/admin/users/create", (req, res) => {
    res.render("admin/users/create");
});

router.post("users/create", (req, res) => {
    
    var email = req.body.email;
    var password = req.body.password;
    
    User.findOne({where:{email: email}}).then( user => {
        if(user == undefined){

            var salt = bcrypt.genSaltSync(10);
            var hash = bcrypt.hashSync(password, salt);
            
            User.create({
                email: email,
                password: hash
                
            }).then(() => {
                res.redirect("/");
            }).catch((err) => {
                res.redirect("/");
            });


        }else{
            res.redirect("/admin/users/create");
        }
    });
});
router.get("/login", (req, res) => {

    res.render("admin/users/login");
    
    
});

router.get("/login/:path/:path2", (req, res) => {

     req.session.path = req.params.path + "/" + req.params.path2;
     res.render("admin/users/login");
 
});

router.post("/authenticate", (req, res) => {

    var email = req.body.email;
    var password = req.body.password;

    User.findOne({ where: { email: email } }).then(user => {
        if (user != undefined) { 

            var correct = bcrypt.compareSync(password, user.password);

            if (correct) {
                req.session.user = {
                    
                    id: user.id,
                    email: user.email
                }
                res.redirect(req.session.path);
            } else {
                res.redirect("/login");
            }

        } else {
            res.redirect("/login");
        }
    });

});

router.get("/logout", (req, res) => {
    req.session.user = undefined;
    res.redirect("/login");
})

//Delete Users

router.post("/users/delete", adminAuth,(req, res) => {
    var id = req.body.id;
    if (id != undefined) {
        if (!isNaN(id)) {
            User.destroy({
                where: {
                    id: id
                }
            }).then(() => {
                res.redirect("/admin/users");
            });
        } else {// NÃO FOR UM NÚMERO
            res.redirect("/admin/users");
        }
    } else { // NULL
        res.redirect("/");
    }
});

//Editar Usuarios

router.get("/users/editar/:id",(req, res) => {

    var id = req.params.id;

    if (isNaN(id)) {

        res.redirect("/admin/users");
    }

    User.findByPk(id).then(users => {

        if (users != undefined) {

            res.render("admin/users/edit", { users: users });

        } else {
            res.redirect("/admin/users");
        }

    }).catch(erro => {

        res.redirect("/admin/users");
    })
})

module.exports = router;