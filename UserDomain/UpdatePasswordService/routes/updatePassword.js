var express = require('express');
var updatePasswordController = require('../Controller/updatePasswordController');
var auth = require('../middlewares/auth');
var multiparty = require('connect-multiparty');
var path = multiparty({uploadDir:'./uploads/stories'});


var app = express.Router();

app.put('/update_password/:id', auth.auth, updatePasswordController.update_password);


module.exports = app;
