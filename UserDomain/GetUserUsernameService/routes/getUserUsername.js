var express = require('express');
var historiasController = require('../controllers/getUserUsernameController');
var auth = require('../middlewares/auth');
var multiparty = require('connect-multiparty');
var path = multiparty({uploadDir:'./uploads/stories'});


var app = express.Router();

app.get('/get_user_username/:username',auth.auth,getUserUsernameController.get_user_username);

module.exports = app;