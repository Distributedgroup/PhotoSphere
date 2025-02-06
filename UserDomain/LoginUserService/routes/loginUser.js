var express = require('express');
var loginUserController = require('../Controller/loginUserController');
var auth = require('../middlewares/auth');
var multiparty = require('connect-multiparty');
var path = multiparty({uploadDir:'./uploads/stories'});

var app = express.Router();

app.post('/login_user', loginUserController.login_user)

module.exports = app;
