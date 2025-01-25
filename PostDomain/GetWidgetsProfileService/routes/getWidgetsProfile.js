var express = require('express');
var postController = require('../controllers/getWidgetsProfileController');
var auth = require('../middlewares/auth');
var multiparty = require('connect-multiparty');
var path = multiparty({uploadDir:'./uploads/posts'});

var app = express.Router();

app.get('/get_widgets_profile/:username',auth.auth,getWidgetsProfileController.get_widgets_profile);

module.exports = app;