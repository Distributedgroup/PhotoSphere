var express = require('express');
var historiasController = require('../controllers/getCoverImgController');
var auth = require('../middlewares/auth');
var multiparty = require('connect-multiparty');
var path = multiparty({uploadDir:'./uploads/stories'});


var app = express.Router();

app.get('/get_cover_img/:img',getCoverImgController.get_cover_img);

module.exports = app;