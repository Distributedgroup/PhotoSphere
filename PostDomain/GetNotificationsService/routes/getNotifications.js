var express = require('express');
var getNotificationsController= require('../controller/getNotificationsController');
var auth = require('../middlewares/auth');
var multiparty = require('connect-multiparty');
var path = multiparty({uploadDir:'./uploads/posts'});

var app = express.Router();

app.get('/get_notifications',auth.auth,getNotificationsController.get_notifications);

module.exports = app;