var express = require('express');
var historiasController = require('../controllers/getUserInvitationsController');
var auth = require('../middlewares/auth');
var multiparty = require('connect-multiparty');
var path = multiparty({uploadDir:'./uploads/stories'});


var app = express.Router();

app.get('/get_user_invitations/:type',auth.auth,getUserInvitationsController.get_user_invitations);

module.exports = app;