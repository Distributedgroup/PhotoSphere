var express = require('express');
var updateUserController = require('../Controller/updateUserController');

var multiparty = require('connect-multiparty');
var path = multiparty({uploadDir:'./uploads/stories'});


var app = express.Router();

app.put('/update_user/:id',updateUserController.update_user);

module.exports = app;
