var express = require('express');
var usuarioController = require('../controllers/createUserController');
var auth = require('../middlewares/auth');
var multiparty = require('connect-multiparty');
var path = multiparty({uploadDir:'./uploads/portadas'});
var app = express.Router();

app.post('/create_user',createUserController.create_user);

module.exports = app;