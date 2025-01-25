var express = require('express');
var historiasController = require('../controllers/updateUserController');
var auth = require('../middlewares/auth');
var multiparty = require('connect-multiparty');
var path = multiparty({uploadDir:'./uploads/stories'});


var app = express.Router();

app.put('/update_user/:id',auth.auth,updateUserController.update_user);

module.exports = app;