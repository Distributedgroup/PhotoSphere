var express = require('express');
var historiasController = require('../controllers/getUsersController');
var auth = require('../middlewares/auth');
var multiparty = require('connect-multiparty');
var path = multiparty({uploadDir:'./uploads/stories'});


var app = express.Router();

app.get('/get_users/:filter',auth.auth,getUsersController.get_users);

module.exports = app;