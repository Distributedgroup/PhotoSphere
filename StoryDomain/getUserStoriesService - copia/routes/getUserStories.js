var express = require('express');
var getUserStoriesController = require('../controller/getUserStoriesController');
var auth = require('../middlewares/auth');
var multiparty = require('connect-multiparty');
var path = multiparty({uploadDir:'./uploads/stories'});


var app = express.Router();


app.get('/get_user_stories',auth.auth,getUserStoriesController.get_user_stories);


module.exports = app;