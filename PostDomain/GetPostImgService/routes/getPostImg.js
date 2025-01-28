var express = require('express');
var getPostImgController = require('../controller/getPostImgController');
var auth = require('../middlewares/auth');
var multiparty = require('connect-multiparty');
var path = multiparty({uploadDir:'./uploads/posts'});

var app = express.Router();

app.get('/get_post_img/:img',getPostImgController.get_post_img);

module.exports = app;