var express = require('express');
var getStoryImgController = require('../controller/getStoryImgController');
var auth = require('../middlewares/auth');
var multiparty = require('connect-multiparty');
var path = multiparty({uploadDir:'./uploads/stories'});


var app = express.Router();

app.get('/get_story_img/:img',getStoryImgController.get_story_img);

module.exports = app;