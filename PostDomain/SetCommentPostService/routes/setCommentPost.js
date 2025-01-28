var express = require('express');
var setCommentPostController = require('../controller/setCommentPostController');
var auth = require('../middlewares/auth');
var multiparty = require('connect-multiparty');
var path = multiparty({uploadDir:'./uploads/posts'});

var app = express.Router();

app.post('/set_comment_post',auth.auth,setCommentPostController.set_comment_post);


module.exports = app;