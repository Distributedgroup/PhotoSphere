var express = require('express');
var getPostController = require('../controller/getPostController');
var auth = require('../middlewares/auth');
var multiparty = require('connect-multiparty');
var path = multiparty({uploadDir:'./uploads/posts'});

var app = express.Router();

app.get('/get_post/:id',auth.auth,getPostController.get_post);


module.exports = app;