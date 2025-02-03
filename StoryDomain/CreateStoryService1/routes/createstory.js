var express = require('express');
var createStoryController = require('../controller/createStoryController');
var auth = require('../middlewares/auth');
var multiparty = require('connect-multiparty');
var path = multiparty({uploadDir:'./uploads/stories'});


var app = express.Router();

app.post('/createStory',[auth.auth,path],createStoryController.createStory);

module.exports = app;