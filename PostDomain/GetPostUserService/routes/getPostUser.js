var express = require('express');
var postController = require('../controllers/getPostUserController');
var auth = require('../middlewares/auth');
var multiparty = require('connect-multiparty');
var path = multiparty({uploadDir:'./uploads/posts'});

var app = express.Router();

app.get('/get_post_user/:username',auth.auth,getPostUserController.get_post_user);

module.exports = app;