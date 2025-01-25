var Usuario = require('../models/User');
var Usuario_invitacion = require('../models/User_invitation');
var Usuario_amigo = require('../models/User_friend');
const bcrypt = require('bcrypt');
const saltRounds = 10;
var jwt = require('../helpers/jwt');
const { uniqueUsernameGenerator  } = require("unique-username-generator");

var path = require('path');
var fs = require('fs');
var handlebars = require('handlebars');
var ejs = require('ejs');
var nodemailer = require('nodemailer');
var smtp = require('nodemailer-smtp-transport');


const create_user = async function(req,res){
    console.log(req.body);
    let data = req.body;

    let users = await User.find({email:data.email});

    if(users.length == 0){
        let usersnames = [];
        usersnames.push(data.names+''+data.surnames);

        const config = {
            dictionaries: [usersnames],
            separator: '',
            style: 'capital',
            randomDigits: 3
        }

        bcrypt.genSalt(saltRounds, function(err, salt) {
            bcrypt.hash(data.password, salt, async function(err, hash) {
                // Store hash in your password DB.
                data.password = hash;
                data.username = '@'+uniqueUsernameGenerator(config);
                let user = await User.create(data);
                res.status(200).send({data:user});
            });
        });
    }else{
        res.status(200).send({data:undefined,message: 'El correo electrónico ya existe'});
    }
}


