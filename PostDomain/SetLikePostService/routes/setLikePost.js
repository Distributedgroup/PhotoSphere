var express = require('express');
var postController = require('../controllers/setLikePostController');
var auth = require('../middlewares/auth');
var multiparty = require('connect-multiparty');
var path = multiparty({uploadDir:'./uploads/posts'});

var app = express.Router();

app.post('/set_like_post',auth.auth,setLikePostController.set_like_post);

module.exports = app;