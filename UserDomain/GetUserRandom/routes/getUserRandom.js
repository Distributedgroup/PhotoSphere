var express = require('express');
var historiasController = require('../controllers/getUserRandomController');
var auth = require('../middlewares/auth');
var multiparty = require('connect-multiparty');
var path = multiparty({uploadDir:'./uploads/stories'});


var app = express.Router();

app.get('/get_user_random',auth.auth,getUserRandomController.get_user_random);

module.exports = app;