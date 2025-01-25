var express = require('express');
var historiasController = require('../controllers/validateUserController');
var auth = require('../middlewares/auth');
var multiparty = require('connect-multiparty');
var path = multiparty({uploadDir:'./uploads/stories'});


var app = express.Router();

app.post('/validate_user',validateUserController.validate_user);

module.exports = app;