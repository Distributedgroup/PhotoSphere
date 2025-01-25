var express = require('express');
var historiasController = require('../controllers/udaptePasswordController');
var auth = require('../middlewares/auth');
var multiparty = require('connect-multiparty');
var path = multiparty({uploadDir:'./uploads/stories'});


var app = express.Router();

app.put('/update_password/:id',auth.auth,udaptePasswordController.update_password);

module.exports = app;