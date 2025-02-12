var express = require('express');
var getUserController = require('../Controller/getUserController');
var auth = require('../middlewares/auth');
var multiparty = require('connect-multiparty');
var path = multiparty({uploadDir:'./uploads/stories'});


var app = express.Router();

app.get('/get_user/:id',auth.auth,getUserController.get_user);

module.exports = app;
