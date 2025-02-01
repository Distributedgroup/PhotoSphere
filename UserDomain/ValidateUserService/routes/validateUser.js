var express = require('express');
var validateUserController = require('../Controller/validateUserController');
var auth = require('../middlewares/auth');
var multiparty = require('connect-multiparty');


var app = express.Router();

app.post('/validate_user', validateUserController.validate_user);

module.exports = app;
