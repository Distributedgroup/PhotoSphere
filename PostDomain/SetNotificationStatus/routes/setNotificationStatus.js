var express = require('express');
var setNotificationStatusController = require('../controller/setNotificationStatusController');
var auth = require('../middlewares/auth');
var multiparty = require('connect-multiparty');
var path = multiparty({uploadDir:'./uploads/posts'});

var app = express.Router();

app.get('/set_notification_status/:id',auth.auth,setNotificationStatusController.set_notification_status);

module.exports = app;