var express = require('express');
var getPostFriendsController = require('../controller/getPostFriendsController');
var auth = require('../middlewares/auth');
var multiparty = require('connect-multiparty');
var path = multiparty({uploadDir:'./uploads/posts'});


var app = express.Router();

app.get('/get_post_friends/:limit',auth.auth,getPostFriendsController.get_post_friends);

module.exports = app;