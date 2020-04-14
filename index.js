const express = require("express");
const app = express();
const bodyParser = require("body-parser");
//const session = require("express-session");
const connection = require("./database/database");

// Utilização dos Controllers

const hospitaisController = require("./hospitais/hospitaisController");
const usersController = require("./users/UsersController");

// Utilização das Models

const Hospital = require("./hospitais/Hospital");
const User = require("./users/User");

// View engine

app.set('view engine', 'ejs');

// Sessions

/*app.use(session({
    secret: "hospital_session", cookie: { maxAge: 30000000000000000000000 }
}))*/

// Static

app.use(express.static('public'));

//Body parser

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Database

connection
    .authenticate()
    .then(() => {
        console.log("Conexão feita com sucesso!");
    }).catch((error) => {
        console.log(error);
    })

app.use("/", hospitaisController);
//app.use("/", usersController);


app.listen(3000, () => {
    console.log("O servidor está rodando!")
})