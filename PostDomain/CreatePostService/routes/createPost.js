var express = require('express');
var createPostController = require('../controller/createPostController');
var auth = require('../middlewares/auth');
var multiparty = require('connect-multiparty');
var path = multiparty({uploadDir:'../uploads/posts'});

var app = express.Router();

app.post('/create_post',[auth.auth,path],createPostController.create_post);

module.exports = app;