var express = require('express');
var resetPasswordController = require('../Controller/resetPasswordController');
var auth = require('../middlewares/auth');
var multiparty = require('connect-multiparty');
var path = multiparty({uploadDir:'./uploads/stories'});


var app = express.Router();

app.post('/reset_password/:email',resetPasswordController.reset_password);

module.exports = app;
