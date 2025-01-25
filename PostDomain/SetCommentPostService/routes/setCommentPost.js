var express = require('express');
var postController = require('../controllers/commentPostController');
var auth = require('../middlewares/auth');
var multiparty = require('connect-multiparty');
var path = multiparty({uploadDir:'./uploads/posts'});

var app = express.Router();

app.post('/set_comment_post',auth.auth,commentPostController.set_comment_post);


module.exports = app;