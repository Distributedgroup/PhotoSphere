var express = require('express');
var historiasController = require('../controllers/validateCodeController');
var auth = require('../middlewares/auth');
var multiparty = require('connect-multiparty');
var path = multiparty({uploadDir:'./uploads/stories'});


var app = express.Router();

app.get('/validate_code/:code/:email',validateCodeController.validate_code);

module.exports = app;