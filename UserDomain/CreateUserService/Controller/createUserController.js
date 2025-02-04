var Usuario = require('../Model/User'); // Ensuring the model is imported correctly
var Usuario_invitacion = require('../Model/User_invitation');
var Usuario_amigo = require('../Model/User_friend');
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

    // Check if the user already exists
    let users = await Usuario.find({ email: data.email }); 

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
                    return res.status(500).send({ message: "Error encrypting password" });
                }
                data.password = hash;
                data.username = '@' + uniqueUsernameGenerator(config);

                let user = await Usuario.create(data); 
                res.status(200).send({ data: user });
            });
        });
    } else {
        res.status(400).send({ message: 'Email already exists' });
    }
};


// Successfully export the function
module.exports = {
    create_user
};





