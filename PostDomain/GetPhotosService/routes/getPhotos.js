var express = require('express');
var getPhotosController = require('../controller/getPhotosController');
var auth = require('../middlewares/auth');
var multiparty = require('connect-multiparty');
var path = multiparty({uploadDir:'./uploads/posts'});

var app = express.Router();

app.get('/get_photos/:username',auth.auth,getPhotosController.get_photos);

module.exports = app;