const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const connection = require("./database/database");
const hospitaisController = require("./hospitais/hospitaisController");
const consultasController = require("./consultas/consultasController");
const pacientesController = require("./pacientes/pacientesController");
const Hospital = require("./hospitais/Hospital");
const Paciente = require("./pacientes/Paciente");
const Consulta = require("./consultas/Consulta");
const User = require("./users/User");

// View engine

app.set('view engine', 'ejs');

// Using Static Files 

app.use(express.static('public'));

//Body parser

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Database Authentication

connection
    .authenticate()
    .then(() => {
        console.log("Conexão feita com sucesso!");
    }).catch((error) => {
        console.log(error);
    })

app.use("/", hospitaisController);
app.use("/", pacientesController);
app.use("/", consultasController);

app.listen(3000, () => {
    console.log("O servidor está rodando!")
})