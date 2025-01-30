var Usuario = require('../model/User'); // Asegurar que el modelo se importa correctamente
var Usuario_invitacion = require('../model/User_invitation');
var Usuario_amigo = require('../model/User_friend');
const bcrypt = require('bcrypt');
const saltRounds = 10;
var jwt = require('../helpers/jwt');
const { uniqueUsernameGenerator } = require("unique-username-generator");

var path = require('path');
var fs = require('fs');
var handlebars = require('handlebars');
var ejs = require('ejs');
var nodemailer = require('nodemailer');
var smtp = require('nodemailer-smtp-transport');

const create_user = async function (req, res) {
    console.log(req.body);
    let data = req.body;

    // Verificar si el usuario ya existe
    let users = await Usuario.find({ email: data.email }); // ✅ Corrección aquí

    if (users.length == 0) {
        let usersnames = [];
        usersnames.push(data.nombres + '' + data.apellidos);

        const config = {
            dictionaries: [usersnames],
            separator: '',
            style: 'capital',
            randomDigits: 3
        };

        bcrypt.genSalt(saltRounds, function (err, salt) {
            bcrypt.hash(data.password, salt, async function (err, hash) {
                if (err) {
                    return res.status(500).send({ message: "Error al encriptar la contraseña" });
                }
                data.password = hash;
                data.username = '@' + uniqueUsernameGenerator(config);

                let user = await Usuario.create(data); // ✅ Corrección aquí
                res.status(200).send({ data: user });
            });
        });
    } else {
        res.status(400).send({ message: 'El correo electrónico ya existe' });
    }
};

// Exportar correctamente la función
module.exports = {
    create_user
};
