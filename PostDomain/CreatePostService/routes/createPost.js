var express = require('express');
var postController = require('../controllers/createPostController');
var auth = require('../middlewares/auth');
var multiparty = require('connect-multiparty');
var path = multiparty({uploadDir:'./uploads/posts'});

var app = express.Router();

app.post('/create_post',[auth.auth,path],createPostController.create_post);

module.exports = app;