var express = require('express');
var sendFriendshipInvitationController = require('../Controller/sendFriendshipInvitationController');
var auth = require('../middlewares/auth');
var multiparty = require('connect-multiparty');
var path = multiparty({uploadDir:'./uploads/stories'});


var app = express.Router();

app.post('/send_friendship_invitation',auth.auth,sendFriendshipInvitationController.send_friendship_invitation);

module.exports = app;
